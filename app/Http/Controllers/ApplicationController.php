<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Models\Application;
use App\Models\Program;
use Illuminate\Http\RedirectResponse;

class ApplicationController extends Controller
{
    /**
     * Store a course application submitted from the program catalog.
     */
    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $program = Program::findByKey($data['program_key'] ?? null);

        Application::create([
            'user_id' => $request->user()?->id,
            'first_name' => $data['first_name'] ?? null,
            'last_name' => $data['last_name'] ?? null,
            'name' => $data['name'],
            'email' => $data['email'],
            'institution_name' => $data['institution_name'] ?? null,
            'address' => $data['address'] ?? null,
            'roll_no' => $data['roll_no'] ?? null,
            'year_of_study' => $data['year_of_study'] ?? null,
            'mobile_number' => $data['mobile_number'] ?? null,
            'course_title' => $data['course_title'],
            'program_id' => $program?->id,
            'source_page' => $request->headers->has('referer')
                ? (string) parse_url((string) $request->headers->get('referer'), PHP_URL_PATH)
                : null,
            'status' => 'submitted',
        ]);

        return back()->with('success', 'Application submitted! Our team will contact you by email.');
    }
}