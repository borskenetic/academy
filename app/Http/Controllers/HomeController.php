<?php

namespace App\Http\Controllers;

use App\Support\ContentPresenter;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('pages/Home', [
            'coreTracks' => ContentPresenter::coreTracks(),
            'journeys' => ContentPresenter::aspireJourneys(),
        ]);
    }
}
