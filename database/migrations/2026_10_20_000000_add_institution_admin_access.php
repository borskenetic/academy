<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'institution_code')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('institution_code', 32)->nullable()->after('role');
            });
        }

        if (! Schema::hasTable('institution_api_tokens')) {
            Schema::create('institution_api_tokens', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->string('token_hash', 64)->unique();
                $table->timestamp('expires_at')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('institution_api_tokens');

        if (Schema::hasColumn('users', 'institution_code')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('institution_code');
            });
        }
    }
};
