<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Support\ContentPresenter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    /**
     * Program catalog page: /program?p=aiml
     */
    public function show(Request $request): Response
    {
        $key = strtolower((string) $request->query('p', 'aiml'));
        $program = Program::findByKey($key);

        // Unknown keys previously fell back to the default program; keep the
        // visitor on a valid page rather than showing an error.
        if (! $program || $program->is_cse) {
            $program = Program::findByKey('aiml');
        }

        return Inertia::render('pages/ProgramPage', [
            'program' => ContentPresenter::program($program),
            'programKey' => $program->key,
            'programKeys' => Program::query()->where('is_cse', false)->orderBy('sort')->pluck('key')->all(),
        ]);
    }
}
