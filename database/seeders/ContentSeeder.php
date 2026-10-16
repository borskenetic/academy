<?php

namespace Database\Seeders;

use App\Models\AspireJourney;
use App\Models\LearningDomain;
use App\Models\Program;
use App\Models\SkillsoftTrack;
use Illuminate\Database\Seeder;

/**
 * Seeds the Skillsoft partner content from the JSON exported by
 * `node scripts/export-content.mjs`, which reads the original front-end
 * data modules so the database matches the previously hard-coded content.
 */
class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedPrograms();
        $this->seedCatalog();
        $this->seedJourneys();
        $this->seedDomains();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function read(string $name): array
    {
        $path = database_path("data/{$name}.json");

        if (! is_file($path)) {
            $this->command?->warn("Missing {$path} — run `node scripts/export-content.mjs` first.");

            return [];
        }

        return json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
    }

    private function seedPrograms(): void
    {
        foreach ($this->read('programs') as $row) {
            $program = Program::updateOrCreate(
                ['key' => $row['key']],
                [
                    'name' => $row['name'],
                    'short' => $row['short'],
                    'tagline' => $row['tagline'],
                    'detail_title' => $row['detail_title'],
                    'detail_note' => $row['detail_note'],
                    'is_cse' => $row['is_cse'],
                    'sort' => $row['sort'],
                ]
            );

            $program->courses()->delete();
            $program->featured()->delete();
            $program->details()->delete();

            foreach ($row['courses'] as $i => $course) {
                $program->courses()->create([...$course, 'sort' => $i]);
            }

            foreach ($row['featured'] as $i => $featured) {
                $program->featured()->create([...$featured, 'sort' => $i]);
            }

            foreach ($row['details'] as $i => $detail) {
                $program->details()->create([...$detail, 'sort' => $i]);
            }
        }
    }

    private function seedCatalog(): void
    {
        foreach ($this->read('tracks') as $row) {
            $track = SkillsoftTrack::updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'title' => $row['title'],
                    'category' => $row['category'],
                    'catalog_group' => 'legacy',
                    'duration' => $row['duration'],
                    'page_url' => $row['page_url'],
                    'apply_url' => $row['apply_url'],
                    'overview' => $row['overview'],
                    'image' => $row['image'],
                    'sort' => $row['sort'],
                ]
            );

            $track->outcomes()->delete();

            foreach ($row['outcomes'] as $i => $outcome) {
                $track->outcomes()->create(['body' => $outcome, 'sort' => $i]);
            }
        }
    }

    private function seedJourneys(): void
    {
        $trackIds = SkillsoftTrack::query()->pluck('id', 'slug');

        foreach ($this->read('journeys') as $row) {
            AspireJourney::updateOrCreate(
                ['title' => $row['title'], 'category' => $row['category']],
                [
                    'description' => $row['description'],
                    'journey_group' => 'legacy',
                    'image' => $row['image'],
                    'track_id' => $row['track_slug'] ? $trackIds[$row['track_slug']] ?? null : null,
                    'sort' => $row['sort'],
                ]
            );
        }
    }

    private function seedDomains(): void
    {
        foreach ($this->read('domains') as $row) {
            LearningDomain::updateOrCreate(['name' => $row['name']], ['sort' => $row['sort']]);
        }
    }
}
