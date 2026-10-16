<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Admin dashboard behind "Admin Login": lists every course inquiry with
     * the marketing/contact details collected by the public apply form.
     */
    public function __invoke(Request $request): Response
    {
        abort_unless($request->user()->role === 'admin', 403);

        $applications = Application::query()->with('program')->latest()->get();

        return Inertia::render('pages/Dashboard', [
            'inquiries' => $applications
                ->map(fn (Application $application) => [
                    'id' => $application->id,
                    'name' => $application->name,
                    'first_name' => $application->first_name,
                    'last_name' => $application->last_name,
                    'email' => $application->email,
                    'institution_code' => $application->institution_code,
                    'mobile_number' => $application->mobile_number,
                    'institution_name' => $application->institution_name,
                    'gender' => $application->gender,
                    'applicant_category' => $application->applicant_category,
                    'education_level' => $application->education_level,
                    'address' => $application->address,
                    'pincode' => $application->pincode,
                    'roll_no' => $application->roll_no,
                    'eligibility_prn' => $application->eligibility_prn,
                    'year_of_study' => $application->year_of_study,
                    'course_title' => $application->course_title,
                    'course_slug' => $application->course_slug,
                    'course_url' => $application->course_url,
                    'program' => $application->program?->name,
                    'source_page' => $application->source_page,
                    'source_origin' => $application->source_origin,
                    'status' => $application->status,
                    'submitted_at' => $application->created_at?->toFormattedDateString(),
                ])
                ->all(),
            'stats' => [
                'total' => Application::query()->count(),
                'submitted' => Application::query()->where('status', 'submitted')->count(),
                'new_today' => Application::query()->whereDate('created_at', today())->count(),
            ],
        ]);
    }
}
