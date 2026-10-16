<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('course_title');
            $table->foreignId('program_id')->nullable()->constrained()->nullOnDelete();
            $table->string('source_page')->nullable();
            $table->string('status', 32)->default('submitted');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
