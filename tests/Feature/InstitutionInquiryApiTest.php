<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InstitutionInquiryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_sjit_registration_is_stored_for_academy_and_the_sjit_dashboard(): void
    {
        $this->postJson('/api/skillsoft-leads', [
            'institution' => 'sjit',
            'institution_name' => 'Saint Joseph Institute of Technology',
            'first_name' => 'Jose',
            'last_name' => 'Cruz',
            'name' => 'Jose Cruz',
            'email' => 'jose@gmail.com',
            'mobile_number' => '09170000000',
            'course_title' => 'AI for Data Science',
            'roll_no' => 'SJIT-100',
            'course_program' => 'BS Information Technology',
        ])->assertCreated();

        Application::create([
            'name' => 'Other School',
            'email' => 'other@earist.test',
            'institution_code' => 'earist',
            'institution_name' => 'EARIST',
            'mobile_number' => '09171111111',
            'course_title' => 'Python Programming',
            'status' => 'submitted',
        ]);

        $admin = User::query()->create([
            'name' => 'SJIT Admin',
            'email' => 'admin@sjit.edu.ph',
            'password' => 'password',
            'role' => 'admin',
            'institution_code' => 'sjit',
        ]);

        $this->postJson('/api/institution/login', [
            'email' => 'admin@area51.ph',
            'password' => 'password',
            'institution' => 'sjit',
        ])->assertUnprocessable();

        User::query()->create([
            'name' => 'Area 51 Admin',
            'email' => 'admin@area51.ph',
            'password' => 'password',
            'role' => 'admin',
        ]);

        $this->postJson('/api/institution/login', [
            'email' => $admin->email,
            'password' => 'password',
            'institution' => 'earist',
        ])->assertUnprocessable();

        $token = $this->postJson('/api/institution/login', [
            'email' => $admin->email,
            'password' => 'password',
            'institution' => 'sjit',
        ])->assertOk()->json('token');

        $this->withToken($token)
            ->getJson('/api/institution/inquiries')
            ->assertOk()
            ->assertJsonPath('pagination.total', 1)
            ->assertJsonPath('inquiries.0.email', 'jose@gmail.com')
            ->assertJsonPath('inquiries.0.institution_code', 'sjit')
            ->assertJsonPath('inquiries.0.roll_no', 'SJIT-100')
            ->assertJsonPath('stats.total', 1);

        $export = $this->withToken($token)->get('/api/institution/inquiries/export');
        $export->assertOk();
        $csv = $export->streamedContent();
        $this->assertStringContainsString('jose@gmail.com', $csv);
        $this->assertStringNotContainsString('other@earist.test', $csv);

        $this->withToken('not-a-real-token')
            ->getJson('/api/institution/inquiries')
            ->assertUnauthorized();
    }

    public function test_inquiries_require_a_token(): void
    {
        $this->getJson('/api/institution/inquiries')->assertUnauthorized();
    }
}
