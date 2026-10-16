<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required_without:name', 'nullable', 'string', 'max:100'],
            'last_name' => ['required_without:name', 'nullable', 'string', 'max:100'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'institution_name' => ['required_with:first_name', 'nullable', 'string', 'max:255'],
            'address' => ['required_with:first_name', 'nullable', 'string', 'max:1000'],
            'roll_no' => ['required_with:first_name', 'nullable', 'string', 'max:100'],
            'year_of_study' => ['required_with:first_name', 'nullable', 'string', 'max:50'],
            'mobile_number' => ['required_with:first_name', 'nullable', 'string', 'max:30'],
            'course_title' => ['required', 'string', 'max:255'],
            'program_key' => ['nullable', 'string', 'max:64'],
        ];
    }
}