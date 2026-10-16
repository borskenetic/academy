<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'title',
        'group_code',
        'semester',
        'duration',
        'credits',
        'code',
        'sort',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}