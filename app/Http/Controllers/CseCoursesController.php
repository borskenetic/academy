<?php

namespace App\Http\Controllers;

use App\Support\ContentPresenter;
use Inertia\Inertia;
use Inertia\Response;

class CseCoursesController extends Controller
{
    /**
     * Dedicated Computer Science Engineering guide (/cse-courses).
     */
    public function __invoke(): Response
    {
        return Inertia::render('pages/CseCourses', [
            'program' => ContentPresenter::cseProgram(),
            'journeys' => ContentPresenter::journeys(),
        ]);
    }
}
