<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('first_name')->nullable()->after('name');
            $table->string('last_name')->nullable()->after('first_name');
            $table->string('institution_name')->nullable()->after('email');
            $table->text('address')->nullable()->after('institution_name');
            $table->string('roll_no')->nullable()->after('address');
            $table->string('year_of_study')->nullable()->after('roll_no');
            $table->string('mobile_number')->nullable()->after('year_of_study');
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn([
                'first_name',
                'last_name',
                'institution_name',
                'address',
                'roll_no',
                'year_of_study',
                'mobile_number',
            ]);
        });
    }
};