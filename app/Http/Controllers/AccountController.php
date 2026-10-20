<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Platforms that can own a login. An empty platform is an Academy-wide admin.
     *
     * @var array<string, string>
     */
    public const PLATFORMS = [
        'area51' => 'Area 51',
        'earist' => 'EARIST',
        'hsc' => 'HSC',
        'jmc' => 'JMC',
        'lcc' => 'LCC',
        'ndmc' => 'NDMC',
        'psite-caraga' => 'PSITE Caraga',
        'sec' => 'SEC',
        'siit' => 'SIIT',
        'sjit' => 'SJIT',
        'unep' => 'UNEP',
        'zppsu' => 'ZPPSU',
    ];

    /** @var list<string> */
    public const ROLES = ['admin', 'student', 'faculty', 'professional', 'institution'];

    public function index(Request $request): Response
    {
        $this->ensureAdmin($request);

        $filters = [
            'search' => trim((string) $request->query('search', '')),
            'platform' => trim((string) $request->query('platform', '')),
            'role' => trim((string) $request->query('role', '')),
        ];
        $perPage = in_array((int) $request->query('per_page', 20), [20, 50, 100], true)
            ? (int) $request->query('per_page', 20)
            : 20;

        $accounts = User::query()
            ->when($filters['search'] !== '', function ($query) use ($filters) {
                $term = '%'.$filters['search'].'%';
                $query->where(function ($query) use ($term) {
                    $query->where('name', 'like', $term)
                        ->orWhere('email', 'like', $term);
                });
            })
            ->when($filters['platform'] === 'academy', function ($query) {
                $query->where(function ($query) {
                    $query->whereNull('institution_code')->orWhere('institution_code', '');
                });
            })
            ->when($filters['platform'] !== '' && $filters['platform'] !== 'academy', function ($query) use ($filters) {
                $query->where('institution_code', $filters['platform']);
            })
            ->when($filters['role'] !== '', fn ($query) => $query->where('role', $filters['role']))
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('pages/Accounts', [
            'accounts' => collect($accounts->items())->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'institution_code' => $user->institution_code,
                'platform' => self::PLATFORMS[$user->institution_code] ?? ($user->institution_code ?: 'Academy'),
                'created_at' => $user->created_at?->toFormattedDateString(),
            ])->values()->all(),
            'pagination' => [
                'current_page' => $accounts->currentPage(),
                'last_page' => $accounts->lastPage(),
                'per_page' => $accounts->perPage(),
                'total' => $accounts->total(),
                'from' => $accounts->firstItem(),
                'to' => $accounts->lastItem(),
            ],
            'filters' => $filters,
            'platforms' => self::PLATFORMS,
            'roles' => self::ROLES,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->ensureAdmin($request);
        $data = $this->validateAccount($request);

        User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'institution_code' => $data['institution_code'],
            'password' => $data['password'],
        ]);

        return redirect()->route('dashboard.accounts')->with('success', 'Account added.');
    }

    public function update(Request $request, User $account): RedirectResponse
    {
        $this->ensureAdmin($request);
        $data = $this->validateAccount($request, $account, passwordRequired: false);

        $account->fill([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'institution_code' => $data['institution_code'],
        ]);
        if (! empty($data['password'])) {
            $account->password = $data['password'];
        }
        $account->save();

        return back()->with('success', 'Account updated.');
    }

    public function destroy(Request $request, User $account): RedirectResponse
    {
        $this->ensureAdmin($request);
        if ($request->user()->is($account)) {
            return back()->with('error', 'You cannot delete the account you are signed in with.');
        }

        $account->delete();

        return back()->with('success', 'Account deleted.');
    }

    private function ensureAdmin(Request $request): void
    {
        abort_unless($request->user()?->role === 'admin', 403);
    }

    /**
     * @return array{name: string, email: string, role: string, institution_code: ?string, password: ?string}
     */
    private function validateAccount(Request $request, ?User $account = null, bool $passwordRequired = true): array
    {
        $passwordRules = $passwordRequired
            ? ['required', 'string', Password::default(), 'confirmed']
            : ['nullable', 'string', Password::default(), 'confirmed'];

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($account?->id)],
            'role' => ['required', 'string', Rule::in(self::ROLES)],
            'institution_code' => ['nullable', 'string', Rule::in(array_keys(self::PLATFORMS))],
            'password' => $passwordRules,
        ]);

        $data['email'] = strtolower($data['email']);
        $data['institution_code'] = $data['institution_code'] ?: null;

        return $data;
    }
}
