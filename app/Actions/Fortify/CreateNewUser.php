<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Roles offered by the "Register for Skillsoft Access" dialog.
     *
     * @var list<string>
     */
    public const ROLES = ['student', 'faculty', 'professional', 'institution'];

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     *
     * @throws ValidationException
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'role' => ['required', 'string', Rule::in(self::ROLES)],
            'student_roll_no' => ['nullable', 'string', 'max:64'],
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'role' => $input['role'],
            'student_roll_no' => $input['student_roll_no'] ?? null,
            'password' => Hash::make($input['password']),
        ]);
    }
}
