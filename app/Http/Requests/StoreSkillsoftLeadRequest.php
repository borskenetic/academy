<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSkillsoftLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $firstName = trim((string) $this->input('first_name'));
        $lastName = trim((string) $this->input('last_name'));

        $this->merge([
            'name' => trim((string) ($this->input('name') ?: $this->input('full_name') ?: "{$firstName} {$lastName}")),
            'email' => strtolower(trim((string) $this->input('email'))),
            'mobile_number' => $this->input('mobile_number') ?: $this->input('phone'),
            'institution_name' => $this->input('institution_name') ?: $this->input('college_name'),
            'applicant_category' => $this->input('applicant_category') ?: $this->input('category'),
        ]);
    }

    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return [
            'institution' => ['required', 'string', 'in:lcc,ndmc,earist,zppsu,jmc,area51'],
            'institution_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:30'],
            'course_title' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:32'],
            'applicant_category' => ['nullable', 'string', 'max:64'],
            'education_level' => ['nullable', 'string', 'max:64'],
            'address' => ['nullable', 'string', 'max:1000'],
            'college_name' => ['nullable', 'string', 'max:255'],
            'roll_no' => ['nullable', 'string', 'max:100'],
            'course_program' => ['nullable', 'string', 'max:255'],
            'year_of_study' => ['nullable', 'string', 'max:50'],
            'course_slug' => ['nullable', 'string', 'max:255'],
            'course_url' => ['nullable', 'url', 'max:2048'],
            'program_key' => ['nullable', 'string', 'max:64'],
            'source_page' => ['nullable', 'string', 'max:255'],
            'source_origin' => ['nullable', 'url', 'max:255'],
            'website' => ['nullable', 'string', 'max:0'],
        ];
    }
}
