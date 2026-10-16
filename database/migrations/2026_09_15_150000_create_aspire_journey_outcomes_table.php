<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('aspire_journey_outcomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('aspire_journey_id')->constrained()->cascadeOnDelete();
            $table->string('body', 500);
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aspire_journey_outcomes');
    }
};