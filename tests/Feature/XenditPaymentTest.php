<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Services\XenditPaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class XenditPaymentTest extends TestCase
{
    use RefreshDatabase;

    private const WEBHOOK_TOKEN = 'test-callback-token';

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.xendit.secret_key' => 'xnd_development_test_key',
            'services.xendit.webhook_token' => self::WEBHOOK_TOKEN,
            'payments.institutions.earist.amount' => 850,
            'payments.institutions.earist.currency' => 'PHP',
            'payments.institutions.earist.return_origin' => 'https://earist.example',
        ]);
    }

    private function earistLead(array $overrides = []): array
    {
        return array_merge([
            'institution' => 'earist',
            'institution_name' => 'Eulogio Amang Rodriguez Institute of Science and Technology',
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'email' => 'juan@earist.edu.ph',
            'mobile_number' => '09171234567',
            'course_title' => 'Introduction to Generative AI',
            'course_slug' => 'introduction-to-generative-ai',
            'source_origin' => 'http://localhost:5176',
            'website' => '',
        ], $overrides);
    }

    private function fakeXenditSession(): void
    {
        Http::fake([
            'api.xendit.co/sessions' => Http::response([
                'payment_session_id' => 'ps-661f87c614802d6c402cd82d',
                'payment_link_url' => 'https://xen.to/kGxPCi60',
                'status' => 'ACTIVE',
            ], 200),
        ]);
    }

    public function test_earist_registration_creates_a_hosted_checkout_session(): void
    {
        $this->fakeXenditSession();

        $response = $this->postJson('/api/skillsoft-leads', $this->earistLead())
            ->assertCreated()
            ->assertJsonPath('payment_url', 'https://xen.to/kGxPCi60');

        $this->assertNotNull($response->json('id'));

        Http::assertSent(function ($request) {
            return $request->url() === 'https://api.xendit.co/sessions'
                && $request->hasHeader('Authorization')
                && $request['mode'] === 'PAYMENT_LINK'
                && $request['session_type'] === 'PAY'
                && $request['amount'] == 850
                && $request['currency'] === 'PHP'
                && $request['country'] === 'PH'
                && $request['success_return_url'] === 'https://earist.example/?payment=success'
                && $request['cancel_return_url'] === 'https://earist.example/?payment=cancelled'
                && $request['customer']['mobile_number'] === '+639171234567'
                && $request['customer']['individual_detail']['given_names'] === 'Juan'
                && $request['customer']['individual_detail']['surname'] === 'Dela Cruz'
                && $request['items'][0]['net_unit_amount'] == 850;
        });

        $this->assertDatabaseHas('applications', [
            'institution_code' => 'earist',
            'payment_status' => XenditPaymentService::STATUS_PENDING,
            'xendit_session_id' => 'ps-661f87c614802d6c402cd82d',
            'payment_url' => 'https://xen.to/kGxPCi60',
        ]);
    }

    public function test_client_cannot_override_the_price_or_return_origin(): void
    {
        $this->fakeXenditSession();

        $this->postJson('/api/skillsoft-leads', $this->earistLead([
            'amount' => 1,
            'success_return_url' => 'https://evil.example',
            'source_origin' => 'https://evil.example',
        ]))->assertCreated();

        Http::assertSent(fn ($request) => $request['amount'] == 850
            && str_starts_with($request['success_return_url'], 'https://earist.example/'));
    }

    public function test_other_institutions_stay_free_and_never_call_xendit(): void
    {
        Http::fake();

        $this->postJson('/api/skillsoft-leads', $this->earistLead([
            'institution' => 'lcc',
            'institution_name' => 'Legacy College of Compostela',
            'email' => 'ada@legacycollege.edu.ph',
        ]))->assertCreated()
            ->assertJsonPath('payment_url', null);

        Http::assertNothingSent();
        $this->assertDatabaseHas('applications', [
            'institution_code' => 'lcc',
            'payment_status' => null,
        ]);
    }

    public function test_xendit_failure_keeps_the_registration_and_returns_an_error(): void
    {
        Http::fake(['api.xendit.co/sessions' => Http::response(['error_code' => 'API_VALIDATION_ERROR'], 400)]);

        $this->postJson('/api/skillsoft-leads', $this->earistLead())
            ->assertStatus(502)
            ->assertJsonPath('ok', false);

        $this->assertDatabaseHas('applications', [
            'institution_code' => 'earist',
            'email' => 'juan@earist.edu.ph',
            'payment_status' => XenditPaymentService::STATUS_FAILED,
        ]);
    }

    public function test_missing_return_origin_fails_safely_without_calling_xendit(): void
    {
        config(['payments.institutions.earist.return_origin' => null]);
        Http::fake();

        $this->postJson('/api/skillsoft-leads', $this->earistLead())->assertStatus(502);

        Http::assertNothingSent();
    }

    public function test_webhook_rejects_requests_without_the_callback_token(): void
    {
        $this->postJson('/api/xendit/webhook', [
            'event' => 'payment_session.completed',
            'data' => ['reference_id' => 'earist_1_abc'],
        ])->assertUnauthorized();

        $this->postJson('/api/xendit/webhook', [
            'event' => 'payment_session.completed',
            'data' => ['reference_id' => 'earist_1_abc'],
        ], ['x-callback-token' => 'wrong-token'])->assertUnauthorized();
    }

    public function test_completed_webhook_marks_the_application_paid_once(): void
    {
        $application = $this->pendingEaristApplication();

        $payload = [
            'event' => 'payment_session.completed',
            'business_id' => 'biz_1',
            'data' => [
                'payment_session_id' => 'ps-661f87c614802d6c402cd82d',
                'reference_id' => 'earist_'.$application->id.'_abc123',
                'status' => 'COMPLETED',
                'amount' => 850,
                'currency' => 'PHP',
                'payment_id' => 'py-661f87c614802d6c402cd82d',
            ],
        ];

        $this->postJson('/api/xendit/webhook', $payload, ['x-callback-token' => self::WEBHOOK_TOKEN])
            ->assertOk();

        $application->refresh();
        $this->assertSame(XenditPaymentService::STATUS_PAID, $application->payment_status);
        $this->assertSame('py-661f87c614802d6c402cd82d', $application->xendit_payment_id);
        $this->assertNotNull($application->paid_at);
        $firstPaidAt = $application->paid_at;

        // A duplicate delivery must not change the record.
        $this->postJson('/api/xendit/webhook', $payload, ['x-callback-token' => self::WEBHOOK_TOKEN])
            ->assertOk();

        $application->refresh();
        $this->assertSame(XenditPaymentService::STATUS_PAID, $application->payment_status);
        $this->assertEquals($firstPaidAt, $application->paid_at);
    }

    public function test_completion_with_a_wrong_amount_is_not_marked_paid(): void
    {
        $application = $this->pendingEaristApplication();

        $this->postJson('/api/xendit/webhook', [
            'event' => 'payment_session.completed',
            'data' => [
                'reference_id' => 'earist_'.$application->id.'_abc123',
                'status' => 'COMPLETED',
                'amount' => 1,
                'currency' => 'PHP',
            ],
        ], ['x-callback-token' => self::WEBHOOK_TOKEN])->assertOk();

        $this->assertSame(XenditPaymentService::STATUS_PENDING, $application->refresh()->payment_status);
        $this->assertNull($application->paid_at);
    }

    public function test_expired_session_does_not_override_a_paid_application(): void
    {
        $application = $this->pendingEaristApplication();
        $application->forceFill(['payment_status' => XenditPaymentService::STATUS_PAID])->save();

        $this->postJson('/api/xendit/webhook', [
            'event' => 'payment_session.expired',
            'data' => ['reference_id' => 'earist_'.$application->id.'_abc123', 'status' => 'EXPIRED'],
        ], ['x-callback-token' => self::WEBHOOK_TOKEN])->assertOk();

        $this->assertSame(XenditPaymentService::STATUS_PAID, $application->refresh()->payment_status);
    }

    public function test_expired_session_marks_an_unpaid_application_expired(): void
    {
        $application = $this->pendingEaristApplication();

        $this->postJson('/api/xendit/webhook', [
            'event' => 'payment_session.expired',
            'data' => ['reference_id' => 'earist_'.$application->id.'_abc123', 'status' => 'EXPIRED'],
        ], ['x-callback-token' => self::WEBHOOK_TOKEN])->assertOk();

        $this->assertSame(XenditPaymentService::STATUS_EXPIRED, $application->refresh()->payment_status);
    }

    private function pendingEaristApplication(): Application
    {
        $application = Application::create([
            'name' => 'Juan Dela Cruz',
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'email' => 'juan@earist.edu.ph',
            'institution_code' => 'earist',
            'institution_name' => 'Eulogio Amang Rodriguez Institute of Science and Technology',
            'mobile_number' => '09171234567',
            'course_title' => 'Introduction to Generative AI',
            'status' => 'submitted',
            'payment_status' => XenditPaymentService::STATUS_PENDING,
            'payment_amount' => 850,
            'payment_currency' => 'PHP',
        ]);

        // Reference includes the row id, so it is set after the insert.
        $application->forceFill(['payment_reference' => 'earist_'.$application->id.'_abc123'])->save();

        return $application;
    }
}
