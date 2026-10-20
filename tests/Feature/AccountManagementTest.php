<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AccountManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_add_edit_and_delete_accounts_across_platforms(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
            'institution_code' => null,
            'email' => 'admin@area51.ph',
        ]);
        User::factory()->create([
            'name' => 'SJIT Admin',
            'email' => 'admin@sjit.edu.ph',
            'role' => 'admin',
            'institution_code' => 'sjit',
        ]);
        User::factory()->create([
            'name' => 'EARIST Learner',
            'email' => 'learner@earist.edu.ph',
            'role' => 'student',
            'institution_code' => 'earist',
        ]);

        $this->actingAs($admin)->get('/dashboard/accounts')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('pages/Accounts')
                ->has('accounts', 3)
                ->where('accounts', function ($accounts) {
                    $platforms = collect($accounts)->pluck('institution_code')->all();

                    return in_array('sjit', $platforms, true) && in_array('earist', $platforms, true);
                })
            );

        $this->actingAs($admin)->post('/dashboard/accounts', [
            'name' => 'JMC Admin',
            'email' => 'admin@jmc.edu.ph',
            'role' => 'admin',
            'institution_code' => 'jmc',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertRedirect('/dashboard/accounts');

        $created = User::query()->where('email', 'admin@jmc.edu.ph')->firstOrFail();
        $this->assertSame('jmc', $created->institution_code);
        $this->assertTrue($created->role === 'admin');

        $this->actingAs($admin)->put("/dashboard/accounts/{$created->id}", [
            'name' => 'JMC Lead',
            'email' => 'lead@jmc.edu.ph',
            'role' => 'faculty',
            'institution_code' => 'jmc',
            'password' => '',
            'password_confirmation' => '',
        ])->assertRedirect();

        $this->assertDatabaseHas('users', [
            'id' => $created->id,
            'email' => 'lead@jmc.edu.ph',
            'role' => 'faculty',
        ]);

        $this->actingAs($admin)->delete("/dashboard/accounts/{$created->id}")
            ->assertRedirect();
        $this->assertDatabaseMissing('users', ['id' => $created->id]);

        $this->actingAs($admin)->delete("/dashboard/accounts/{$admin->id}")
            ->assertRedirect()
            ->assertSessionHas('error');
        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_non_admin_cannot_manage_accounts(): void
    {
        $student = User::factory()->create(['role' => 'student']);

        $this->actingAs($student)->get('/dashboard/accounts')->assertForbidden();

        auth()->logout();
        $this->get('/dashboard/accounts')->assertRedirect('/login');
    }
}
