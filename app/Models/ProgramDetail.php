<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramDetail extends Model
{
    use HasFactory;

    protected $table = 'program_details';

    protected $fillable = [
        'program_id',
        'title',
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