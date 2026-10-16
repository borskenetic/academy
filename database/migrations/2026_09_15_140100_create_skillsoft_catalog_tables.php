<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skillsoft_tracks', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category');
            $table->string('duration')->nullable();
            $table->string('page_url')->nullable();
            $table->string('apply_url')->nullable();
            $table->text('overview')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('skillsoft_track_outcomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('track_id')->constrained('skillsoft_tracks')->cascadeOnDelete();
            $table->string('body', 500);
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('learning_domains', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learning_domains');
        Schema::dropIfExists('skillsoft_track_outcomes');
        Schema::dropIfExists('skillsoft_tracks');
    }
};
