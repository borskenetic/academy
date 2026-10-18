<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\AspireJourney;
use App\Models\SkillsoftTrack;
use App\Models\User;
use Database\Seeders\ContentSeeder;
use Database\Seeders\RequestedCatalogSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Covers the Inertia pages and the two public form submissions after the
 * content moved from JavaScript modules into the database.
 */
class ContentPagesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(ContentSeeder::class);
    }

    public function test_home_page_renders_database_backed_content(): void
    {
        $this->seed(RequestedCatalogSeeder::class);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/Home')
                ->has('journeys', 21)
                ->has('coreTracks', 67)
            );
    }

    public function test_program_page_uses_the_requested_program_key(): void
    {
        $this->get('/program?p=civil')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/ProgramPage')
                ->where('programKey', 'civil')
                ->where('program.name', 'Civil Engineering')
                ->has('program.courses')
            );
    }

    public function test_unknown_program_key_falls_back_to_the_default_program(): void
    {
        $this->get('/program?p=does-not-exist')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->where('programKey', 'aiml'));
    }

    public function test_cse_courses_page_renders_the_cse_program(): void
    {
        $this->get('/cse-courses')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/CseCourses')
                ->where('program.name', 'Computer Science Engineering')
                ->has('journeys', 52)
            );
    }

    public function test_catalog_page_honours_the_category_query_parameter(): void
    {
        $this->get('/skillsoft-catalog?cat=AI')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/SkillsoftCatalog')
                ->where('cat', 'AI')
                ->has('tracks', 27)
                ->has('domains', 38)
            );

        $this->get('/skillsoft-catalog?cat=NotACategory')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->where('cat', 'All'));
    }

    public function test_application_is_stored_against_the_program(): void
    {
        $this->post('/applications', [
            'name' => 'Test Learner',
            'email' => 'learner@area51.ph',
            'course_title' => 'Machine Learning',
            'program_key' => 'aiml',
        ])
            ->assertRedirect()
            ->assertSessionHas('success');

        $application = Application::query()->firstOrFail();

        $this->assertSame('Machine Learning', $application->course_title);
        $this->assertSame('aiml', $application->program->key);
        $this->assertSame('submitted', $application->status);
    }

    public function test_application_requires_name_email_and_course(): void
    {
        $this->post('/applications', ['email' => 'not-an-email'])
            ->assertSessionHasErrors(['name', 'email', 'course_title']);

        $this->assertSame(0, Application::query()->count());
    }

    public function test_dashboard_requires_authentication(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_admin_sees_all_inquiries(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@area51.ph',
            'role' => 'admin',
        ]);

        $learner = User::factory()->create(['email' => 'learner@area51.ph']);

        Application::create([
            'user_id' => $learner->id,
            'name' => $learner->name,
            'email' => $learner->email,
            'course_title' => 'DevOps',
            'status' => 'submitted',
        ]);

        $this->actingAs($admin)
            ->get('/dashboard')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/Dashboard')
                ->has('inquiries', 1)
                ->where('inquiries.0.course_title', 'DevOps')
                ->where('stats.total', 1)
                ->where('stats.submitted', 1)
            );
    }

    public function test_dashboard_is_forbidden_for_non_admin_users(): void
    {
        $student = User::factory()->create(['role' => 'student']);

        $this->actingAs($student)
            ->get('/dashboard')
            ->assertForbidden();
    }

    public function test_admin_can_log_in_and_is_sent_to_the_dashboard(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@area51.ph',
            'password' => 'password',
            'role' => 'admin',
        ]);

        $this->post('/login', [
            'email' => 'admin@area51.ph',
            'password' => 'password',
        ])->assertRedirect('/dashboard');

        $this->assertAuthenticatedAs($admin);
    }

    public function test_non_admin_users_cannot_log_in(): void
    {
        User::factory()->create([
            'email' => 'student@area51.ph',
            'password' => 'password',
            'role' => 'student',
        ]);

        $this->post('/login', [
            'email' => 'student@area51.ph',
            'password' => 'password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_registration_creates_a_learner_with_a_role(): void
    {
        $this->post('/register', [
            'name' => 'New Learner',
            'email' => 'new@area51.ph',
            'role' => 'faculty',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertRedirect();

        $user = User::query()->where('email', 'new@area51.ph')->firstOrFail();

        $this->assertSame('faculty', $user->role);
        $this->assertAuthenticatedAs($user);
    }

    public function test_core_course_details_page_renders_the_track(): void
    {
        $this->seed(RequestedCatalogSeeder::class);

        $track = SkillsoftTrack::query()
            ->where('catalog_group', 'core')
            ->with('outcomes')
            ->firstOrFail();

        $this->get("/courses/core/{$track->slug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/CourseDetails')
                ->where('course.type', 'core')
                ->where('course.slug', $track->slug)
                ->where('course.title', $track->title)
                ->has('course.outcomes', $track->outcomes->count())
            );
    }

    public function test_aspire_course_details_page_renders_the_journey(): void
    {
        $this->seed(RequestedCatalogSeeder::class);

        $journey = AspireJourney::query()
            ->where('journey_group', 'aspire')
            ->with('outcomes')
            ->firstOrFail();

        $slug = Str::slug($journey->title);

        $this->get("/courses/aspire/{$slug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/CourseDetails')
                ->where('course.type', 'aspire')
                ->where('course.slug', $slug)
                ->where('course.title', $journey->title)
                ->has('course.outcomes', $journey->outcomes->count())
            );
    }

    public function test_course_details_page_404s_for_unknown_type_or_slug(): void
    {
        $this->seed(RequestedCatalogSeeder::class);

        $this->get('/courses/bogus/anything')->assertNotFound();
        $this->get('/courses/core/not-a-real-course')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/CourseDetails')
                ->where('course', null)
                ->where('type', 'core')
                ->where('slug', 'not-a-real-course')
            );
        $this->get('/courses/skillsoft/introduction-to-criminology')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/CourseDetails')
                ->where('type', 'skillsoft')
                ->where('slug', 'introduction-to-criminology')
            );
    }
}
