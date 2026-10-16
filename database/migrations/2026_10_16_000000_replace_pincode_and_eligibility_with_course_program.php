<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('applications', 'course_program')) {
            Schema::table('applications', function (Blueprint $table) {
                $table->string('course_program')->nullable()->after('roll_no');
            });
        }

        $drop = array_values(array_filter(
            ['pincode', 'eligibility_prn'],
            fn (string $column) => Schema::hasColumn('applications', $column)
        ));

        if ($drop !== []) {
            Schema::table('applications', function (Blueprint $table) use ($drop) {
                $table->dropColumn($drop);
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('applications', 'pincode')) {
            Schema::table('applications', function (Blueprint $table) {
                $table->string('pincode', 20)->nullable()->after('address');
            });
        }

        if (! Schema::hasColumn('applications', 'eligibility_prn')) {
            Schema::table('applications', function (Blueprint $table) {
                $table->string('eligibility_prn', 100)->nullable()->after('roll_no');
            });
        }

        if (Schema::hasColumn('applications', 'course_program')) {
            Schema::table('applications', function (Blueprint $table) {
                $table->dropColumn('course_program');
            });
        }
    }
};
