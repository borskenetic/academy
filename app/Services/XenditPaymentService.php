<?php

namespace App\Services;

use App\Models\Application;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * Xendit Payment Sessions (hosted checkout) for paid institutions.
 *
 * Flow: lead saved -> session created (PAYMENT_LINK) -> customer pays on
 * Xendit -> Xendit calls our webhook -> application marked paid.
 * The browser redirect back to the school site is informational only; the
 * webhook is the source of truth.
 */
class XenditPaymentService
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_PAID = 'paid';
    public const STATUS_EXPIRED = 'expired';
    public const STATUS_FAILED = 'failed';

    public function requiresPayment(?string $institutionCode): bool
    {
        return $institutionCode !== null
            && config("payments.institutions.{$institutionCode}") !== null;
    }

    /**
     * Create a hosted checkout session for the application and return its URL.
     *
     * @throws RuntimeException when configuration is missing or Xendit rejects the request.
     */
    public function createCheckout(Application $application): string
    {
        $settings = $this->settingsFor((string) $application->institution_code);
        $secretKey = (string) config('services.xendit.secret_key');
        $origin = rtrim((string) $settings['return_origin'], '/');

        if ($secretKey === '' || $origin === '') {
            throw new RuntimeException('Xendit is not configured for this institution.');
        }

        $amount = (float) $settings['amount'];
        $currency = (string) $settings['currency'];
        $reference = Str::lower($application->institution_code).'_'.$application->id.'_'.Str::lower(Str::random(10));

        $response = Http::withBasicAuth($secretKey, '')
            ->acceptJson()
            ->timeout(20)
            ->post(rtrim((string) config('services.xendit.base_url'), '/').'/sessions', [
                'reference_id' => $reference,
                'session_type' => 'PAY',
                'mode' => 'PAYMENT_LINK',
                'amount' => $amount,
                'currency' => $currency,
                'country' => 'PH',
                'description' => Str::limit("Course enrollment: {$application->course_title}", 250, ''),
                'expires_at' => now()->addDay()->toIso8601String(),
                'customer' => $this->customerPayload($application),
                'items' => [[
                    'reference_id' => 'course_'.$application->id,
                    'type' => 'DIGITAL_SERVICE',
                    'name' => Str::limit((string) $application->course_title, 250, ''),
                    'net_unit_amount' => $amount,
                    'quantity' => 1,
                    'category' => 'Education',
                ]],
                'success_return_url' => $origin.'/?payment=success',
                'cancel_return_url' => $origin.'/?payment=cancelled',
            ]);

        if ($response->failed()) {
            Log::error('Xendit session creation failed', [
                'application_id' => $application->id,
                'status' => $response->status(),
                'body' => $response->json(),
            ]);

            throw new RuntimeException('Payment provider rejected the checkout request.');
        }

        $sessionId = $response->json('payment_session_id');
        $paymentUrl = $response->json('payment_link_url');

        if (! is_string($sessionId) || $sessionId === '' || ! is_string($paymentUrl) || $paymentUrl === '') {
            throw new RuntimeException('Payment provider returned an incomplete checkout session.');
        }

        $application->forceFill([
            'payment_status' => self::STATUS_PENDING,
            'payment_amount' => $amount,
            'payment_currency' => $currency,
            'payment_reference' => $reference,
            'xendit_session_id' => $sessionId,
            'payment_url' => $paymentUrl,
        ])->save();

        return $paymentUrl;
    }

    public function isValidCallbackToken(?string $token): bool
    {
        $expected = (string) config('services.xendit.webhook_token');

        return $expected !== '' && is_string($token) && hash_equals($expected, $token);
    }

    /**
     * Apply a Xendit payment session event. Unknown events and unknown references are ignored.
     */
    public function handleSessionEvent(string $event, array $data): void
    {
        $reference = $data['reference_id'] ?? null;

        if (! is_string($reference) || $reference === '') {
            return;
        }

        $application = Application::query()->where('payment_reference', $reference)->first();

        if (! $application) {
            Log::warning('Xendit event received for unknown reference', [
                'event' => $event,
                'reference_id' => $reference,
            ]);

            return;
        }

        match ($event) {
            'payment_session.completed' => $this->markPaid($application, $data),
            'payment_session.expired' => $this->markExpired($application),
            default => null,
        };
    }

    private function markPaid(Application $application, array $data): void
    {
        if ($application->payment_status === self::STATUS_PAID) {
            return; // Webhooks can be delivered more than once.
        }

        $amountMatches = isset($data['amount'])
            && (float) $data['amount'] === (float) $application->payment_amount;
        $currencyMatches = ($data['currency'] ?? $application->payment_currency) === $application->payment_currency;

        if (($data['status'] ?? null) !== 'COMPLETED' || ! $amountMatches || ! $currencyMatches) {
            Log::warning('Xendit completion ignored: status, amount, or currency mismatch', [
                'application_id' => $application->id,
                'status' => $data['status'] ?? null,
                'amount' => $data['amount'] ?? null,
                'currency' => $data['currency'] ?? null,
            ]);

            return;
        }

        $application->forceFill([
            'payment_status' => self::STATUS_PAID,
            'xendit_payment_id' => $data['payment_id'] ?? $application->xendit_payment_id,
            'paid_at' => now(),
        ])->save();
    }

    private function markExpired(Application $application): void
    {
        if ($application->payment_status === self::STATUS_PAID) {
            return;
        }

        $application->forceFill(['payment_status' => self::STATUS_EXPIRED])->save();
    }

    /**
     * @return array{amount: float|int|string, currency: string, return_origin: ?string}
     */
    private function settingsFor(string $institutionCode): array
    {
        $settings = config("payments.institutions.{$institutionCode}");

        if (! is_array($settings)) {
            throw new RuntimeException("No payment settings for institution [{$institutionCode}].");
        }

        return $settings;
    }

    /**
     * Xendit rejects names with special characters and needs E.164 phone numbers.
     * Optional fields are omitted when they cannot be sent in a valid form.
     *
     * @return array<string, mixed>
     */
    private function customerPayload(Application $application): array
    {
        $customer = [
            'type' => 'INDIVIDUAL',
            'reference_id' => Str::lower($application->institution_code).$application->id,
            'individual_detail' => array_filter([
                'given_names' => $this->sanitizeName((string) $application->first_name) ?: 'Learner',
                'surname' => $this->sanitizeName((string) $application->last_name) ?: null,
            ]),
        ];

        $email = (string) $application->email;
        if ($email !== '' && strlen($email) <= 50) {
            $customer['email'] = $email;
        }

        $mobile = $this->toE164((string) $application->mobile_number);
        if ($mobile !== null) {
            $customer['mobile_number'] = $mobile;
        }

        return $customer;
    }

    private function sanitizeName(string $name): string
    {
        $clean = preg_replace('/[^A-Za-z0-9 ]+/', '', Str::ascii($name)) ?? '';

        return Str::limit(trim(preg_replace('/\s+/', ' ', $clean) ?? ''), 100, '');
    }

    /**
     * Convert Philippine mobile formats (09XXXXXXXXX, 639XXXXXXXXX, +639XXXXXXXXX) to E.164.
     */
    private function toE164(string $raw): ?string
    {
        $digits = preg_replace('/\D+/', '', $raw) ?? '';

        if (preg_match('/^09\d{9}$/', $digits)) {
            return '+63'.substr($digits, 1);
        }

        if (preg_match('/^639\d{9}$/', $digits)) {
            return '+'.$digits;
        }

        return null;
    }
}
