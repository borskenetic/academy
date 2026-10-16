<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SkillsoftTrackOutcome extends Model
{
    use HasFactory;

    protected $fillable = [
        'track_id',
        'body',
        'sort',
    ];

    public function track(): BelongsTo
    {
        return $this->belongsTo(SkillsoftTrack::class, 'track_id');
    }
}