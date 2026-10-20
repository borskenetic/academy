<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\InstitutionApiToken;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InstitutionInquiryController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'institution' => ['required', 'string', 'max:32'],
        ]);

        $user = User::query()->where('email', strtolower($data['email']))->first();
        $matches = $user
            && Hash::check($data['password'], $user->password)
            && $user->role === 'admin'
            && $user->institution_code === $data['institution'];

        if (! $matches) {
            return response()->json([
                'message' => 'These credentials do not match our records.',
            ], 422);
        }

        $plain = Str::random(64);
        InstitutionApiToken::query()->create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $plain),
            'expires_at' => now()->addDays(30),
        ]);

        return response()->json([
            'token' => $plain,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'institution_code' => $user->institution_code,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->attributes->get('institution_token')?->delete();

        return response()->json(['ok' => true]);
    }

    public function index(Request $request): JsonResponse
    {
        $user = $this->admin($request);
        $filters = $this->filters($request);
        $perPage = $this->perPage($request);
        $applications = $this->query($user, $filters)
            ->with('program')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return response()->json([
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
            'statuses' => Application::query()
                ->where('institution_code', $user->institution_code)
                ->whereNotNull('status')
                ->where('status', '!=', '')
                ->distinct()
                ->orderBy('status')
                ->pluck('status')
                ->values()
                ->all(),
            'stats' => [
                'total' => Application::query()->where('institution_code', $user->institution_code)->count(),
                'submitted' => Application::query()->where('institution_code', $user->institution_code)->where('status', 'submitted')->count(),
                'new_today' => Application::query()->where('institution_code', $user->institution_code)->whereDate('created_at', today())->count(),
            ],
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $user = $this->admin($request);
        $filters = $this->filters($request);
        $filename = $user->institution_code.'-inquiries-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($user, $filters) {
            $handle = fopen('php://output', 'w');
            fwrite($handle, "\xEF\xBB\xBF");
            fputcsv($handle, [
                'ID', 'First name', 'Last name', 'Name', 'Email', 'Mobile number',
                'Institution code', 'Institution', 'Applicant category', 'Gender',
                'Education level', 'ID No.', 'Course/Program', 'Year of study', 'Address',
                'Course', 'Program', 'Status', 'Submitted at', 'Course slug', 'Course URL',
                'Source page', 'Source origin',
            ]);

            $this->query($user, $filters)
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
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    private function admin(Request $request): User
    {
        /** @var User $user */
        $user = $request->attributes->get('institution_admin');

        return $user;
    }

    /**
     * @return array{search: string, status: string, from: string, to: string}
     */
    private function filters(Request $request): array
    {
        return [
            'search' => trim((string) $request->query('search', '')),
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
     * @param  array{search: string, status: string, from: string, to: string}  $filters
     */
    private function query(User $user, array $filters): Builder
    {
        return Application::query()
            ->where('institution_code', $user->institution_code)
            ->when($filters['search'] !== '', function (Builder $query) use ($filters) {
                $term = '%'.$filters['search'].'%';
                $query->where(function (Builder $query) use ($term) {
                    $query->where('name', 'like', $term)
                        ->orWhere('first_name', 'like', $term)
                        ->orWhere('last_name', 'like', $term)
                        ->orWhere('email', 'like', $term)
                        ->orWhere('course_title', 'like', $term)
                        ->orWhere('roll_no', 'like', $term)
                        ->orWhere('course_program', 'like', $term);
                });
            })
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
            'mobile_number' => $application->mobile_number,
            'institution_code' => $application->institution_code,
            'institution_name' => $application->institution_name,
            'gender' => $application->gender,
            'applicant_category' => $application->applicant_category,
            'education_level' => $application->education_level,
            'address' => $application->address,
            'roll_no' => $application->roll_no,
            'course_program' => $application->course_program,
            'year_of_study' => $application->year_of_study,
            'course_title' => $application->course_title,
            'program' => $application->program?->name,
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
