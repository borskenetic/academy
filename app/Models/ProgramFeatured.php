<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramFeatured extends Model
{
    use HasFactory;

    protected $table = 'program_featured';

    protected $fillable = [
        'program_id',
        'title',
        'tag',
        'image',
        'sort',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}