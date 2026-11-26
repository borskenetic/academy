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
        'roll_no',
        'course_program',
        'year_of_study',
        'mobile_number',
        'course_title',
        'course_slug',
        'course_url',
        'program_id',
        'source_page',
        'source_origin',
        'status',
        'payment_status',
        'payment_amount',
        'payment_currency',
        'payment_reference',
        'xendit_session_id',
        'xendit_payment_id',
        'payment_url',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'payment_amount' => 'decimal:2',
            'paid_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}
