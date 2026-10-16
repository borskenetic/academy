<?php

namespace App\Http\Controllers;

use App\Models\LearningDomain;
use App\Support\ContentPresenter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    /**
     * Skillsoft catalog page: /skillsoft-catalog?cat=AI
     */
    public function __invoke(Request $request): Response
    {
        $categories = ContentPresenter::categories();
        $requested = (string) $request->query('cat', 'All');

        return Inertia::render('pages/SkillsoftCatalog', [
            'tracks' => ContentPresenter::tracks(),
            'categories' => $categories,
            'domains' => LearningDomain::query()->orderBy('sort')->pluck('name')->all(),
            // Only honour a category that actually exists in the catalog.
            'cat' => in_array($requested, $categories, true) ? $requested : 'All',
        ]);
    }
}
