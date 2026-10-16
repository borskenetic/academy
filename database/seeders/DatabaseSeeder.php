<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Skillsoft partner content (programs, catalog tracks, journeys, domains).
        $this->call(ContentSeeder::class);
        $this->call(RequestedCatalogSeeder::class);

        // Demo learner account so the login flow can be tried immediately.
        User::query()->updateOrCreate(
            ['email' => 'student@area51.ph'],
            [
                'name' => 'Area 51 Student',
                'password' => 'password',
                'role' => 'student',
                'student_roll_no' => 'A51-DEMO-001',
            ]
        );

        // Demo admin account. Login is admin-only for now, so this is the only
        // account that can sign in and reach the /dashboard admin interface.
        User::query()->updateOrCreate(
            ['email' => 'admin@area51.ph'],
            [
                'name' => 'Area 51 Admin',
                'password' => 'password',
                'role' => 'admin',
            ]
        );
    }
}
