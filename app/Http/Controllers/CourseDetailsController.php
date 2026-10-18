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
        abort_unless(in_array($type, ['core', 'aspire', 'skillsoft'], true), 404);

        $course = match ($type) {
            'core' => $this->coreCourse($slug),
            'aspire' => $this->aspireCourse($slug),
            default => null,
        };

        return Inertia::render('pages/CourseDetails', [
            'course' => $course,
            'type' => $type,
            'slug' => $slug,
        ]);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function coreCourse(string $slug): ?array
    {
        $track = SkillsoftTrack::query()
            ->where('catalog_group', 'core')
            ->with('outcomes')
            ->where('slug', $slug)
            ->first();

        if (! $track) {
            return null;
        }

        return [
            'type' => 'core',
            'slug' => $track->slug,
            'title' => $track->title,
            'category' => $track->category,
            'duration' => $track->duration,
            'image' => $track->image,
            'overview' => $track->overview,
            'outcomes' => $track->outcomes->pluck('body')->all(),
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    private function aspireCourse(string $slug): ?array
    {
        $journey = AspireJourney::query()
            ->where('journey_group', 'aspire')
            ->with('outcomes')
            ->get()
            ->first(fn (AspireJourney $item): bool => Str::slug($item->title) === $slug);

        if (! $journey) {
            return null;
        }

        return [
            'type' => 'aspire',
            'slug' => Str::slug($journey->title),
            'title' => $journey->title,
            'category' => $journey->category,
            'image' => $journey->image,
            'overview' => $journey->description,
            'outcomes' => $journey->outcomes->pluck('body')->all(),
        ];
    }
}
