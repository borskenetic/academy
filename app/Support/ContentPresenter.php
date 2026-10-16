<?php

namespace App\Support;

use App\Models\AspireJourney;
use App\Models\Program;
use App\Models\SkillsoftTrack;
use Illuminate\Support\Str;

/**
 * Shapes Eloquent content into the exact payloads the React views consumed
 * before the data moved into the database. Keeping these shapes means the
 * view components did not need to change when the backend was introduced.
 */
class ContentPresenter
{
    /**
     * Category filter order used across the catalog and journeys sections.
     *
     * @var list<string>
     */
    private const CATEGORY_ORDER = [
        'AI',
        'Data & Analytics',
        'Development',
        'DevOps & Cloud',
        'Cybersecurity',
        'Business & Finance',
        'Design & Innovation',
    ];

    /**
     * @return array<string, mixed>
     */
    public static function program(Program $program): array
    {
        $program->loadMissing(['courses', 'featured', 'details']);

        return [
            'name' => $program->name,
            'short' => $program->short,
            'tagline' => $program->tagline,
            'detailTitle' => $program->detail_title,
            'detailNote' => $program->detail_note,
            'featured' => $program->featured
                ->map(fn ($f) => $f->image
                    ? "{$f->title}|{$f->tag}|{$f->image}"
                    : "{$f->title}|{$f->tag}")
                ->all(),
            'detailRows' => $program->details
                ->map(fn ($d) => [$d->title, $d->duration, $d->credits, $d->code ?? '-'])
                ->all(),
            'courses' => $program->courses
                ->map(fn ($c) => [$c->title, $c->group_code, $c->semester, $c->duration, $c->credits, $c->code ?? ''])
                ->all(),
        ];
    }

    /**
     * Full catalog payload (matches the old SKILLSOFT_COURSES shape).
     *
     * @return array<int, array<string, mixed>>
     */
    public static function tracks(): array
    {
        return self::presentTracks(SkillsoftTrack::query());
    }

    /**
     * Core Skillsoft courses shown on the landing page.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function coreTracks(): array
    {
        return self::presentTracks(SkillsoftTrack::query()->where('catalog_group', 'core'));
    }

    private static function presentTracks($query): array
    {
        return $query
            ->with('outcomes')
            ->orderBy('sort')
            ->get()
            ->map(fn (SkillsoftTrack $track) => [
                'slug' => $track->slug,
                'title' => $track->title,
                'category' => $track->category,
                'duration' => $track->duration,
                'page' => $track->page_url,
                'apply' => $track->apply_url,
                'overview' => $track->overview,
                'image' => $track->image,
                'outcomes' => $track->outcomes->pluck('body')->all(),
            ])
            ->all();
    }

    /**
     * Compact catalog used by the global search dialog (no outcome lists).
     *
     * @return array<int, array<string, mixed>>
     */
    public static function searchIndex(): array
    {
        return SkillsoftTrack::query()
            ->orderBy('sort')
            ->get(['slug', 'title', 'category', 'overview'])
            ->map(fn (SkillsoftTrack $track) => [
                'slug' => $track->slug,
                'title' => $track->title,
                'category' => $track->category,
                'overview' => $track->overview,
            ])
            ->all();
    }

    /**
     * Journey cards (matches the old PATHS shape, including resolved href).
     *
     * @return array<int, array<string, mixed>>
     */
    public static function journeys(): array
    {
        return self::presentJourneys(AspireJourney::query());
    }

    /**
     * Requested Aspire journeys shown on the landing page.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function aspireJourneys(): array
    {
        return self::presentJourneys(AspireJourney::query()->where('journey_group', 'aspire'));
    }

    private static function presentJourneys($query): array
    {
        return $query
            ->with(['track', 'outcomes'])
            ->orderBy('sort')
            ->get()
            ->map(fn (AspireJourney $journey) => [
                'title' => $journey->title,
                'slug' => Str::slug($journey->title),
                'category' => $journey->category,
                'desc' => $journey->description,
                'overview' => $journey->description,
                'outcomes' => $journey->outcomes->pluck('body')->all(),
                'image' => $journey->image,
                'href' => $journey->track
                    ? "/skillsoft-catalog#{$journey->track->slug}"
                    : '/skillsoft-catalog',
            ])
            ->all();
    }

    /**
     * @return list<string>
     */
    public static function categories(): array
    {
        $present = SkillsoftTrack::query()->distinct()->pluck('category')->all();

        $ordered = array_values(array_filter(
            self::CATEGORY_ORDER,
            fn (string $category) => in_array($category, $present, true)
        ));

        foreach (array_diff($present, $ordered) as $extra) {
            $ordered[] = $extra;
        }

        return array_merge(['All'], $ordered);
    }

    /**
     * @return array<string, mixed>
     */
    public static function cseProgram(): array
    {
        return self::program(Program::query()->where('is_cse', true)->firstOrFail());
    }
}
