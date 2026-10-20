<?php

namespace App\Http\Middleware;

use App\Models\InstitutionApiToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateInstitutionToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $plain = $request->bearerToken();
        $token = $plain
            ? InstitutionApiToken::query()
                ->with('user')
                ->where('token_hash', hash('sha256', $plain))
                ->first()
            : null;

        $user = $token?->user;
        $valid = $token
            && ($token->expires_at === null || $token->expires_at->isFuture())
            && $user?->role === 'admin'
            && is_string($user->institution_code)
            && $user->institution_code !== '';

        if (! $valid) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->attributes->set('institution_admin', $user);
        $request->attributes->set('institution_token', $token);

        return $next($request);
    }
}
