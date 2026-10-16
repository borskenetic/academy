<?php

namespace App\Http\Controllers;

use App\Models\AspireJourney;
use App\Models\SkillsoftTrack;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseDetailsController extends Controller
{
    public function __invoke(string $type, string $slug): Response
    {
        if ($type === 'core') {
            $track = SkillsoftTrack::query()
                ->where('catalog_group', 'core')
                ->with('outcomes')
                ->where('slug', $slug)
                ->firstOrFail();

            $course = [
                'type' => 'core',
                'slug' => $track->slug,
                'title' => $track->title,
                'category' => $track->category,
                'duration' => $track->duration,
                'image' => $track->image,
                'overview' => $track->overview,
                'outcomes' => $track->outcomes->pluck('body')->all(),
            ];
        } elseif ($type === 'aspire') {
            $journey = AspireJourney::query()
                ->where('journey_group', 'aspire')
                ->with('outcomes')
                ->get()
                ->first(fn (AspireJourney $item): bool => Str::slug($item->title) === $slug);

            abort_unless($journey, 404);

            $course = [
                'type' => 'aspire',
                'slug' => Str::slug($journey->title),
                'title' => $journey->title,
                'category' => $journey->category,
                'image' => $journey->image,
                'overview' => $journey->description,
                'outcomes' => $journey->outcomes->pluck('body')->all(),
            ];
        } else {
            abort(404);
        }

        return Inertia::render('pages/CourseDetails', ['course' => $course]);
    }
}