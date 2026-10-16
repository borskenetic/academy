<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SkillsoftLeadApiTest extends TestCase
{
    use RefreshDatabase;

    private function validLead(array $overrides = []): array
    {
        return array_merge([
            'institution' => 'lcc',
            'institution_name' => 'Legacy College of Compostela',
            'first_name' => 'Ada',
            'last_name' => 'Lovelace',
            'email' => 'ada@legacycollege.edu.ph',
            'mobile_number' => '09171234567',
            'course_title' => 'Introduction to Generative AI',
            'course_slug' => 'introduction-to-generative-ai',
            'source_origin' => 'http://localhost:5173',
            'website' => '',
        ], $overrides);
    }

    public function test_lcc_and_ndmc_leads_are_persisted_as_json_submissions(): void
    {
        $this->postJson('/api/skillsoft-leads', $this->validLead())
            ->assertCreated()
            ->assertJsonPath('ok', true);

        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'institution' => 'ndmc',
            'institution_name' => 'Notre Dame of Midsayap College, Inc.',
            'email' => 'grace@ndmc.edu.ph',
        ]))->assertCreated();

        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'institution' => 'earist',
            'institution_name' => 'Eulogio Amang Rodriguez Institute of Science and Technology',
            'email' => 'learner@earist.edu.ph',
        ]))->assertCreated();

        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'institution' => 'zppsu',
            'institution_name' => 'Zamboanga Peninsula Polytechnic State University',
            'email' => 'learner@zppsu.edu.ph',
        ]))->assertCreated();

        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'institution' => 'jmc',
            'institution_name' => 'Jose Maria College Foundation, Inc.',
            'email' => 'learner@jmc.edu.ph',
        ]))->assertCreated();

        $this->assertDatabaseHas('applications', [
            'name' => 'Ada Lovelace',
            'institution_code' => 'lcc',
            'course_slug' => 'introduction-to-generative-ai',
        ]);
        $this->assertDatabaseHas('applications', [
            'institution_code' => 'ndmc',
            'email' => 'grace@ndmc.edu.ph',
        ]);
        $this->assertDatabaseHas('applications', [
            'institution_code' => 'earist',
            'email' => 'learner@earist.edu.ph',
        ]);
        $this->assertDatabaseHas('applications', [
            'institution_code' => 'zppsu',
            'email' => 'learner@zppsu.edu.ph',
        ]);
        $this->assertDatabaseHas('applications', [
            'institution_code' => 'jmc',
            'email' => 'learner@jmc.edu.ph',
        ]);
    }

    public function test_invalid_and_honeypot_submissions_are_rejected(): void
    {
        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'institution' => 'unknown',
            'email' => 'not-an-email',
        ]))->assertUnprocessable()->assertJsonValidationErrors(['institution', 'email']);

        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'website' => 'spam.example',
        ]))->assertUnprocessable()->assertJsonValidationErrors('website');

        $this->assertDatabaseCount('applications', 0);
    }

    public function test_email_domain_must_match_the_selected_institution(): void
    {
        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'email' => 'ada@gmail.com',
        ]))->assertUnprocessable()->assertJsonValidationErrors('email');

        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'institution' => 'ndmc',
            'institution_name' => 'Notre Dame of Midsayap College, Inc.',
            'email' => 'grace@legacycollege.edu.ph',
        ]))->assertUnprocessable()->assertJsonValidationErrors('email');

        $this->assertDatabaseCount('applications', 0);
    }

    public function test_api_cors_allows_a_configured_origin_without_csrf(): void
    {
        $this->withHeader('Origin', 'http://localhost:5173')
            ->postJson('/api/skillsoft-leads', $this->validLead())
            ->assertCreated()
            ->assertHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

        $this->withHeaders([
            'Origin' => 'http://localhost:5173',
            'Access-Control-Request-Method' => 'POST',
            'Access-Control-Request-Headers' => 'Content-Type, Accept',
        ])->options('/api/skillsoft-leads')
            ->assertNoContent()
            ->assertHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

        $this->withHeader('Origin', 'https://untrusted.example')
            ->postJson('/api/skillsoft-leads', $this->validLead([
                'email' => 'other@legacycollege.edu.ph',
            ]))
            ->assertCreated()
            ->assertHeaderMissing('Access-Control-Allow-Origin');
    }

    public function test_api_is_rate_limited(): void
    {
        foreach (range(1, 10) as $attempt) {
            $this->postJson('/api/skillsoft-leads', $this->validLead([
                'email' => "learner{$attempt}@legacycollege.edu.ph",
            ]))->assertCreated();
        }

        $this->postJson('/api/skillsoft-leads', $this->validLead([
            'email' => 'blocked@legacycollege.edu.ph',
        ]))->assertTooManyRequests();
    }

    public function test_dashboard_exposes_funnel_fields_only_to_an_admin(): void
    {
        $lead = Application::create([
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.test',
            'institution_code' => 'lcc',
            'institution_name' => 'Legacy College of Compostela',
            'mobile_number' => '09171234567',
            'course_title' => 'Introduction to Generative AI',
            'course_slug' => 'introduction-to-generative-ai',
            'status' => 'submitted',
        ]);
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->get('/dashboard')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('inquiries.0.id', $lead->id)
                ->where('inquiries.0.institution_code', 'lcc')
                ->where('inquiries.0.course_slug', 'introduction-to-generative-ai')
            );

        $this->actingAs(User::factory()->create(['role' => 'student']))
            ->get('/dashboard')
            ->assertForbidden();
    }
}
