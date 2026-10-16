<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AspireJourney extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'journey_group',
        'description',
        'image',
        'track_id',
        'sort',
    ];

    public function track(): BelongsTo
    {
        return $this->belongsTo(SkillsoftTrack::class, 'track_id');
    }

    public function outcomes(): HasMany
    {
        return $this->hasMany(AspireJourneyOutcome::class)->orderBy('sort');
    }
}