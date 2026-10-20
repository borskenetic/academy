<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class InstitutionAccountController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $admin = $this->admin($request);
        $search = trim((string) $request->query('search', ''));
        $perPage = in_array((int) $request->query('per_page', 20), [20, 50, 100], true)
            ? (int) $request->query('per_page', 20)
            : 20;

        $accounts = User::query()
            ->where('institution_code', $admin->institution_code)
            ->when($search !== '', function ($query) use ($search) {
                $term = '%'.$search.'%';
                $query->where(function ($query) use ($term) {
                    $query->where('name', 'like', $term)->orWhere('email', 'like', $term);
                });
            })
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();

        return response()->json([
            'accounts' => collect($accounts->items())->map(fn (User $user) => $this->present($user))->values()->all(),
            'pagination' => [
                'current_page' => $accounts->currentPage(),
                'last_page' => $accounts->lastPage(),
                'per_page' => $accounts->perPage(),
                'total' => $accounts->total(),
                'from' => $accounts->firstItem(),
                'to' => $accounts->lastItem(),
            ],
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $admin = $this->admin($request);
        $data = $this->validateAccount($request);

        $account = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => 'admin',
            'institution_code' => $admin->institution_code,
            'password' => $data['password'],
        ]);

        return response()->json(['account' => $this->present($account)], 201);
    }

    public function update(Request $request, User $account): JsonResponse
    {
        $admin = $this->admin($request);
        $this->ensureOwnInstitution($admin, $account);
        $data = $this->validateAccount($request, $account, passwordRequired: false);

        $account->fill([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => 'admin',
            'institution_code' => $admin->institution_code,
        ]);
        if (! empty($data['password'])) {
            $account->password = $data['password'];
        }
        $account->save();

        return response()->json(['account' => $this->present($account)]);
    }

    public function destroy(Request $request, User $account): JsonResponse
    {
        $admin = $this->admin($request);
        $this->ensureOwnInstitution($admin, $account);

        if ($admin->is($account)) {
            return response()->json([
                'message' => 'You cannot delete the account you are signed in with.',
            ], 422);
        }

        $account->delete();

        return response()->json(['ok' => true]);
    }

    private function admin(Request $request): User
    {
        /** @var User $user */
        $user = $request->attributes->get('institution_admin');

        return $user;
    }

    private function ensureOwnInstitution(User $admin, User $account): void
    {
        abort_unless($account->institution_code === $admin->institution_code, 404);
    }

    /**
     * @return array{name: string, email: string, password: ?string}
     */
    private function validateAccount(Request $request, ?User $account = null, bool $passwordRequired = true): array
    {
        $passwordRules = $passwordRequired
            ? ['required', 'string', Password::default(), 'confirmed']
            : ['nullable', 'string', Password::default(), 'confirmed'];

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($account?->id)],
            'password' => $passwordRules,
        ]);
        $data['email'] = strtolower($data['email']);

        return $data;
    }

    /**
     * @return array<string, mixed>
     */
    private function present(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'institution_code' => $user->institution_code,
            'platform' => AccountController::PLATFORMS[$user->institution_code] ?? strtoupper((string) $user->institution_code),
            'created_at' => $user->created_at?->toFormattedDateString(),
        ];
    }
}
