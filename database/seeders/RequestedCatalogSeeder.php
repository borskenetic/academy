<?php

namespace Database\Seeders;

use App\Models\AspireJourney;
use App\Models\SkillsoftTrack;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RequestedCatalogSeeder extends Seeder
{
    public function run(): void
    {
        $path = base_path('docs/skillsoft-course-catalog-requested.md');

        if (! is_file($path)) {
            $this->command?->warn("Missing {$path}; requested catalog was not seeded.");

            return;
        }

        $markdown = (string) file_get_contents($path);
        $this->seedTracks($this->sections($markdown, 3));
        $this->seedJourneys($this->sections($markdown, 4));
    }

    /** @return array<int, array{number: int, title: string, body: string}> */
    private function sections(string $markdown, int $level): array
    {
        $heading = str_repeat('#', $level);
        $pattern = '/^'.preg_quote($heading, '/').' (\d+)\. (.+?)\R(.*?)(?=^'.preg_quote($heading, '/').' |\z)/ms';

        preg_match_all($pattern, $markdown, $matches, PREG_SET_ORDER);

        return array_map(fn (array $match): array => [
            'number' => (int) $match[1],
            'title' => trim($match[2]),
            'body' => trim($match[3]),
        ], $matches);
    }

    /** @param array<int, array{number: int, title: string, body: string}> $sections */
    private function seedTracks(array $sections): void
    {
        foreach ($sections as $section) {
            $duration = $this->field($section['body'], 'Duration');
            $track = $this->findTrack($section['title']) ?? new SkillsoftTrack(['slug' => $this->uniqueTrackSlug($section['title'])]);
            $image = '/course-images/'.$this->courseImageName($section['title']).'.jpg';
            $track->fill(
                [
                    'title' => $section['title'],
                    'category' => $this->trackCategory($section['title']),
                    'catalog_group' => 'core',
                    'duration' => $duration === 'Not specified' ? null : $duration,
                    'overview' => $this->field($section['body'], 'Course description'),
                    'image' => $image,
                    'sort' => $section['number'] - 1,
                ]
            );
            $track->save();

            $track->outcomes()->delete();
            foreach ($this->outcomes($section['body']) as $sort => $outcome) {
                $track->outcomes()->create(['body' => $outcome, 'sort' => $sort]);
            }
        }
    }

    /** @param array<int, array{number: int, title: string, body: string}> $sections */
    private function seedJourneys(array $sections): void
    {
        foreach ($sections as $section) {
            $journey = $this->findJourney($section['title']) ?? new AspireJourney(['title' => $section['title']]);
            $journey->fill([
                'category' => $this->journeyCategory($section['number']),
                'journey_group' => 'aspire',
                'description' => $this->field($section['body'], 'Course description'),
                'image' => '/course-images/journey-IMG'.$section['number'].'.jpg',
                'sort' => $section['number'] - 1,
            ]);
            $journey->save();

            $journey->outcomes()->delete();
            foreach ($this->outcomes($section['body']) as $sort => $outcome) {
                $journey->outcomes()->create(['body' => $outcome, 'sort' => $sort]);
            }
        }
    }

    private function field(string $body, string $label): ?string
    {
        preg_match('/\*\*'.preg_quote($label, '/').'\:\*\*\s*(.+?)(?=\R\R\*\*|\z)/s', $body, $match);

        return isset($match[1]) ? trim(preg_replace('/\s+/', ' ', $match[1])) : null;
    }

    /** @return array<int, string> */
    private function outcomes(string $body): array
    {
        preg_match('/\*\*Learning outcomes:\*\*\s*(.*?)(?=\z)/s', $body, $match);
        if (! isset($match[1])) {
            return [];
        }

        preg_match_all('/^- (.+)$/m', $match[1], $outcomes);
        return array_map(fn (string $outcome): string => trim($outcome), $outcomes[1]);
    }

    private function trackCategory(string $title): string
    {
        return match (true) {
            Str::contains($title, ['AI', 'Machine Learning', 'NLP', 'Deep Learning', 'Generative AI', 'Prompt Engineering']) => 'AI',
            Str::contains($title, ['Cloud', 'DevOps', 'Networking']) => 'DevOps & Cloud',
            Str::contains($title, ['Business', 'Corporate', 'Customer', 'Selling', 'Marketing', 'Leadership', 'Management', 'Project', 'Ethics', 'Human Resource', 'FinTech']) => 'Business & Leadership',
            Str::contains($title, ['Cyber', 'Security', 'Hacking']) => 'Cybersecurity',
            Str::contains($title, ['Data', 'Power BI', ' R']) => 'Data & Analytics',
            default => 'Development',
        };
    }

    private function courseImageName(string $title): string
    {
        $aliases = [
            'C++ Programming' => 'c-plus-plus-programming',
            'Customer Service: Core Concepts & Methods' => 'customer-servicecore-concepts-methods',
            'Offensive Security / Ethical Hacking' => 'offensive-securityethical-hacking',
        ];

        return $aliases[$title] ?? Str::slug($title);
    }

    private function findTrack(string $title): ?SkillsoftTrack
    {
        $aliases = [
            'AI for Data Analytics & Business Intelligence' => ['title' => 'AI for Data Analytics and BI', 'slug' => 'ai-data-analytics-bi'],
            'AI for Data Science' => ['title' => 'AI for Data Science', 'slug' => 'ai-data-science'],
            'AI for DevOps' => ['title' => 'AI for DevOps', 'slug' => 'ai-devops'],
            'AI for Programmers' => ['title' => 'AI for Programmers', 'slug' => 'ai-programmers'],
            'AI for Software Engineers' => ['title' => 'AI for Software Engineers', 'slug' => 'ai-software-engineers'],
            'Data Analysis with R' => ['title' => 'Data Analysis with R', 'slug' => 'data-analysis-r'],
            'Introduction to Cybersecurity' => ['title' => 'CyberSecurity', 'slug' => 'cybersecurity'],
            'Introduction to Machine Learning' => ['title' => 'Machine Learning', 'slug' => 'machine-learning'],
            'NLP & LLMs' => ['title' => 'NLP and LLMs', 'slug' => 'nlp-llms'],
        ];

        $alias = $aliases[$title] ?? null;
        $titles = array_values(array_filter([$title, $alias['title'] ?? null]));
        $slugs = $alias ? [$alias['slug']] : [];
        $matches = SkillsoftTrack::query()
            ->where(function ($query) use ($titles, $slugs): void {
                $query->whereIn('title', $titles)->orWhereIn('slug', $slugs);
            })
            ->get()
            ->unique('id')
            ->values();
        $existing = $matches->first();

        foreach ($matches->skip(1) as $duplicate) {
            $duplicate->delete();
        }

        return $existing;
    }

    private function uniqueTrackSlug(string $title): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $suffix = 2;

        while (SkillsoftTrack::query()->where('slug', $slug)->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }

    private function findJourney(string $title): ?AspireJourney
    {
        $aliases = [
            'Enterprise Developer to Full Stack Developer' => 'Enterprise Dev to Full Stack Dev',
            'Enterprise Developer to DevOps Engineer' => 'Enterprise Dev to DevOps Engineer',
            'Software Project Analyst to Senior Software Project Manager' => 'Software Project Analyst to Sr. Software Project Manager',
            'First-Time Manager Journey' => 'First-time Manager Journey',
            'Mid-Level Leader Journey' => 'Mid-level Leader Journey',
        ];

        $alias = $aliases[$title] ?? null;
        $matches = AspireJourney::query()
            ->whereIn('title', array_values(array_filter([$title, $alias])))
            ->get();
        $existing = $matches->first();

        foreach ($matches->skip(1) as $duplicate) {
            $duplicate->delete();
        }

        return $existing;
    }

    private function journeyCategory(int $number): string
    {
        return $number <= 16 ? 'Technology & Developer Journeys' : 'Innovation, Digital & Leadership Journeys';
    }
}