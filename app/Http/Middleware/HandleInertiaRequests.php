<?php

namespace App\Http\Middleware;

use App\Support\ContentPresenter;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root Blade template that Inertia renders into.
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version so Inertia can detect deploys.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Props shared with every Inertia page (auth user + flash messages).
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                ] : null,
            ],
            // Catalog categories drive the shared nav/filter chips.
            'categories' => fn () => ContentPresenter::categories(),
            // Compact course index so the global search dialog works on any page.
            'catalog' => fn () => ContentPresenter::searchIndex(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
