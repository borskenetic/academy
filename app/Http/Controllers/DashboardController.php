<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends Controller
{
    /**
     * Admin dashboard behind "Admin Login": lists course inquiries with
     * the marketing/contact details collected by the public apply form.
     */
    public function __invoke(Request $request): Response
    {
        $this->ensureAdmin($request);

        $filters = $this->filters($request);
        $perPage = $this->perPage($request);
        $applications = $this->filteredQuery($filters)
            ->with('program')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('pages/Dashboard', [
            'inquiries' => collect($applications->items())
                ->map(fn (Application $application) => $this->present($application))
                ->values()
                ->all(),
            'pagination' => [
                'current_page' => $applications->currentPage(),
                'last_page' => $applications->lastPage(),
                'per_page' => $applications->perPage(),
                'total' => $applications->total(),
                'from' => $applications->firstItem(),
                'to' => $applications->lastItem(),
            ],
            'filters' => $filters,
            'institutions' => Application::query()
                ->whereNotNull('institution_code')
                ->where('institution_code', '!=', '')
                ->distinct()
                ->orderBy('institution_code')
                ->pluck('institution_code')
                ->values()
                ->all(),
            'statuses' => Application::query()
                ->whereNotNull('status')
                ->where('status', '!=', '')
                ->distinct()
                ->orderBy('status')
                ->pluck('status')
                ->values()
                ->all(),
            'stats' => [
                'total' => Application::query()->count(),
                'submitted' => Application::query()->where('status', 'submitted')->count(),
                'new_today' => Application::query()->whereDate('created_at', today())->count(),
            ],
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $this->ensureAdmin($request);

        $filters = $this->filters($request);
        $filename = 'inquiries-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($filters) {
            $handle = fopen('php://output', 'w');
            fwrite($handle, "\xEF\xBB\xBF");
            fputcsv($handle, [
                'ID',
                'First name',
                'Last name',
                'Name',
                'Email',
                'Mobile number',
                'Institution code',
                'Institution',
                'Applicant category',
                'Gender',
                'Education level',
                'ID No.',
                'Course/Program',
                'Year of study',
                'Address',
                'Course',
                'Program',
                'Status',
                'Submitted at',
                'Course slug',
                'Course URL',
                'Source page',
                'Source origin',
            ]);

            $this->filteredQuery($filters)
                ->with('program')
                ->latest()
                ->lazy(200)
                ->each(function (Application $application) use ($handle) {
                    fputcsv($handle, [
                        $application->id,
                        $this->csvCell($application->first_name),
                        $this->csvCell($application->last_name),
                        $this->csvCell($application->name),
                        $this->csvCell($application->email),
                        $this->csvCell($application->mobile_number),
                        $this->csvCell($application->institution_code),
                        $this->csvCell($application->institution_name),
                        $this->csvCell($application->applicant_category),
                        $this->csvCell($application->gender),
                        $this->csvCell($application->education_level),
                        $this->csvCell($application->roll_no),
                        $this->csvCell($application->course_program),
                        $this->csvCell($application->year_of_study),
                        $this->csvCell($application->address),
                        $this->csvCell($application->course_title),
                        $this->csvCell($application->program?->name),
                        $this->csvCell($application->status),
                        $application->created_at?->format('Y-m-d H:i'),
                        $this->csvCell($application->course_slug),
                        $this->csvCell($application->course_url),
                        $this->csvCell($application->source_page),
                        $this->csvCell($application->source_origin),
                    ]);
                });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    private function ensureAdmin(Request $request): void
    {
        abort_unless($request->user()?->role === 'admin', 403);
    }

    /**
     * @return array{search: string, institution: string, status: string, from: string, to: string}
     */
    private function filters(Request $request): array
    {
        return [
            'search' => trim((string) $request->query('search', '')),
            'institution' => trim((string) $request->query('institution', '')),
            'status' => trim((string) $request->query('status', '')),
            'from' => $this->dateQuery($request, 'from'),
            'to' => $this->dateQuery($request, 'to'),
        ];
    }

    private function dateQuery(Request $request, string $key): string
    {
        $value = trim((string) $request->query($key, ''));

        return preg_match('/^\d{4}-\d{2}-\d{2}$/', $value) === 1 ? $value : '';
    }

    private function perPage(Request $request): int
    {
        $perPage = (int) $request->query('per_page', 20);

        return in_array($perPage, [20, 50, 100], true) ? $perPage : 20;
    }

    /**
     * @param  array{search: string, institution: string, status: string, from: string, to: string}  $filters
     */
    private function filteredQuery(array $filters): Builder
    {
        return Application::query()
            ->when($filters['search'] !== '', function (Builder $query) use ($filters) {
                $term = '%'.$filters['search'].'%';
                $query->where(function (Builder $query) use ($term) {
                    $query->where('name', 'like', $term)
                        ->orWhere('first_name', 'like', $term)
                        ->orWhere('last_name', 'like', $term)
                        ->orWhere('email', 'like', $term)
                        ->orWhere('course_title', 'like', $term)
                        ->orWhere('roll_no', 'like', $term)
                        ->orWhere('course_program', 'like', $term)
                        ->orWhere('institution_name', 'like', $term);
                });
            })
            ->when($filters['institution'] !== '', fn (Builder $query) => $query->where('institution_code', $filters['institution']))
            ->when($filters['status'] !== '', fn (Builder $query) => $query->where('status', $filters['status']))
            ->when($filters['from'] !== '', fn (Builder $query) => $query->whereDate('created_at', '>=', $filters['from']))
            ->when($filters['to'] !== '', fn (Builder $query) => $query->whereDate('created_at', '<=', $filters['to']));
    }

    /**
     * @return array<string, mixed>
     */
    private function present(Application $application): array
    {
        return [
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
            'roll_no' => $application->roll_no,
            'course_program' => $application->course_program,
            'year_of_study' => $application->year_of_study,
            'course_title' => $application->course_title,
            'course_slug' => $application->course_slug,
            'course_url' => $application->course_url,
            'program' => $application->program?->name,
            'source_page' => $application->source_page,
            'source_origin' => $application->source_origin,
            'status' => $application->status,
            'submitted_at' => $application->created_at?->toFormattedDateString(),
        ];
    }

    private function csvCell(mixed $value): string
    {
        $value = (string) ($value ?? '');

        return preg_match('/^[=+\-@]/', $value) === 1 ? "'".$value : $value;
    }
}
