<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSkillsoftLeadRequest;
use App\Models\Application;
use App\Models\Program;
use Illuminate\Http\JsonResponse;

class SkillsoftLeadController extends Controller
{
    public function store(StoreSkillsoftLeadRequest $request): JsonResponse
    {
        $data = $request->validated();
        $program = Program::findByKey($data['program_key'] ?? null);
        $referer = (string) $request->headers->get('referer', '');

        $application = Application::create([
            'name' => $data['name'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'institution_code' => $data['institution'],
            'institution_name' => $data['institution_name'],
            'gender' => $data['gender'] ?? null,
            'applicant_category' => $data['applicant_category'] ?? null,
            'education_level' => $data['education_level'] ?? null,
            'address' => $data['address'] ?? null,
            'roll_no' => $data['roll_no'] ?? null,
            'course_program' => $data['course_program'] ?? null,
            'year_of_study' => $data['year_of_study'] ?? null,
            'mobile_number' => $data['mobile_number'],
            'course_title' => $data['course_title'],
            'course_slug' => $data['course_slug'] ?? null,
            'course_url' => $data['course_url'] ?? null,
            'program_id' => $program?->id,
            'source_page' => $data['source_page']
                ?? ($referer !== '' ? parse_url($referer, PHP_URL_PATH) : null),
            'source_origin' => $data['source_origin'] ?? $request->headers->get('origin'),
            'status' => 'submitted',
        ]);

        return response()->json([
            'ok' => true,
            'id' => $application->id,
            'message' => 'Registration submitted. Our team will contact you soon.',
        ], 201);
    }
}
