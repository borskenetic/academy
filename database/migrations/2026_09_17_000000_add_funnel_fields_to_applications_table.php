<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('institution_code', 32)->nullable()->index()->after('email');
            $table->string('gender', 32)->nullable()->after('institution_name');
            $table->string('applicant_category', 64)->nullable()->after('gender');
            $table->string('education_level', 64)->nullable()->after('applicant_category');
            $table->string('pincode', 20)->nullable()->after('address');
            $table->string('eligibility_prn', 100)->nullable()->after('roll_no');
            $table->string('course_slug')->nullable()->index()->after('course_title');
            $table->text('course_url')->nullable()->after('course_slug');
            $table->string('source_origin')->nullable()->after('source_page');
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropIndex(['institution_code']);
            $table->dropIndex(['course_slug']);
            $table->dropColumn([
                'institution_code',
                'gender',
                'applicant_category',
                'education_level',
                'pincode',
                'eligibility_prn',
                'course_slug',
                'course_url',
                'source_origin',
            ]);
        });
    }
};
