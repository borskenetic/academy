<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('name');
            $table->string('short');
            $table->text('tagline')->nullable();
            $table->string('detail_title')->nullable();
            $table->text('detail_note')->nullable();
            $table->boolean('is_cse')->default(false);
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('program_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('group_code', 32);
            $table->string('semester');
            $table->string('duration');
            $table->string('credits');
            $table->string('code')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('program_featured', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('tag')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('program_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('duration');
            $table->string('credits');
            $table->string('code')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_details');
        Schema::dropIfExists('program_featured');
        Schema::dropIfExists('program_courses');
        Schema::dropIfExists('programs');
    }
};
