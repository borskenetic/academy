<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('aspire_journeys', function (Blueprint $table) {
            $table->string('journey_group')->default('legacy')->after('category');
        });
    }

    public function down(): void
    {
        Schema::table('aspire_journeys', function (Blueprint $table) {
            $table->dropColumn('journey_group');
        });
    }
};