<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\XenditPaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class XenditWebhookController extends Controller
{
    public function handle(Request $request, XenditPaymentService $payments): JsonResponse
    {
        if (! $payments->isValidCallbackToken($request->header('x-callback-token'))) {
            return response()->json(['ok' => false, 'message' => 'Invalid callback token.'], 401);
        }

        $payments->handleSessionEvent(
            (string) $request->input('event', ''),
            (array) $request->input('data', [])
        );

        // Respond 2xx for authenticated events so Xendit does not retry unknown references.
        return response()->json(['ok' => true]);
    }
}
