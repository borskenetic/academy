<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('payment_status', 32)->nullable()->index()->after('status');
            $table->decimal('payment_amount', 10, 2)->nullable()->after('payment_status');
            $table->string('payment_currency', 3)->nullable()->after('payment_amount');
            $table->string('payment_reference', 64)->nullable()->unique()->after('payment_currency');
            $table->string('xendit_session_id', 64)->nullable()->unique()->after('payment_reference');
            $table->string('xendit_payment_id', 64)->nullable()->after('xendit_session_id');
            $table->text('payment_url')->nullable()->after('xendit_payment_id');
            $table->timestamp('paid_at')->nullable()->after('payment_url');
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropUnique(['payment_reference']);
            $table->dropUnique(['xendit_session_id']);
            $table->dropIndex(['payment_status']);
            $table->dropColumn([
                'payment_status',
                'payment_amount',
                'payment_currency',
                'payment_reference',
                'xendit_session_id',
                'xendit_payment_id',
                'payment_url',
                'paid_at',
            ]);
        });
    }
};
