<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'first_name',
        'last_name',
        'email',
        'institution_code',
        'institution_name',
        'gender',
        'applicant_category',
        'education_level',
        'address',
        'pincode',
        'roll_no',
        'eligibility_prn',
        'year_of_study',
        'mobile_number',
        'course_title',
        'course_slug',
        'course_url',
        'program_id',
        'source_page',
        'source_origin',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}
