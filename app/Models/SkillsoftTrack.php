<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SkillsoftTrack extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'category',
        'catalog_group',
        'duration',
        'page_url',
        'apply_url',
        'overview',
        'image',
        'sort',
    ];

    public function outcomes(): HasMany
    {
        return $this->hasMany(SkillsoftTrackOutcome::class, 'track_id')->orderBy('sort');
    }

    public function journeys(): HasMany
    {
        return $this->hasMany(AspireJourney::class, 'track_id');
    }
}