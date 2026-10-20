<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InstitutionAccountApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_sjit_admin_manages_only_sjit_accounts_and_academy_can_see_them(): void
    {
        $sjit = User::query()->create([
            'name' => 'SJIT Admin',
            'email' => 'admin@sjit.edu.ph',
            'password' => 'password',
            'role' => 'admin',
            'institution_code' => 'sjit',
        ]);
        $earist = User::query()->create([
            'name' => 'EARIST Admin',
            'email' => 'admin@earist.edu.ph',
            'password' => 'password',
            'role' => 'admin',
            'institution_code' => 'earist',
        ]);
        $academy = User::factory()->create([
            'role' => 'admin',
            'institution_code' => null,
            'email' => 'admin@area51.ph',
        ]);

        $token = $this->postJson('/api/institution/login', [
            'email' => $sjit->email,
            'password' => 'password',
            'institution' => 'sjit',
        ])->assertOk()->json('token');

        $this->withToken($token)->getJson('/api/institution/accounts')
            ->assertOk()
            ->assertJsonPath('pagination.total', 1)
            ->assertJsonPath('accounts.0.email', 'admin@sjit.edu.ph');

        $created = $this->withToken($token)->postJson('/api/institution/accounts', [
            'name' => 'SJIT Registrar',
            'email' => 'registrar@sjit.edu.ph',
            'password' => 'password',
            'password_confirmation' => 'password',
            'institution_code' => 'earist',
        ])->assertCreated()->json('account');

        $this->assertSame('sjit', $created['institution_code']);
        $this->assertSame('admin', $created['role']);

        $this->actingAs($academy)->get('/dashboard/accounts')
            ->assertOk()
            ->assertSee('registrar@sjit.edu.ph');

        $this->withToken($token)->putJson("/api/institution/accounts/{$created['id']}", [
            'name' => 'SJIT Records',
            'email' => 'records@sjit.edu.ph',
        ])->assertOk()->assertJsonPath('account.email', 'records@sjit.edu.ph');

        $this->withToken($token)->deleteJson("/api/institution/accounts/{$earist->id}")
            ->assertNotFound();
        $this->withToken($token)->deleteJson("/api/institution/accounts/{$sjit->id}")
            ->assertUnprocessable();
        $this->withToken($token)->deleteJson("/api/institution/accounts/{$created['id']}")
            ->assertOk();

        $this->assertDatabaseMissing('users', ['id' => $created['id']]);
        $this->assertDatabaseHas('users', ['id' => $earist->id]);
    }
}
