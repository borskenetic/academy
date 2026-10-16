<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('aspire_journeys', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('track_id')->nullable()->constrained('skillsoft_tracks')->nullOnDelete();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aspire_journeys');
    }
};
