<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AspireJourneyOutcome extends Model
{
    use HasFactory;

    protected $fillable = [
        'aspire_journey_id',
        'body',
        'sort',
    ];

    public function journey(): BelongsTo
    {
        return $this->belongsTo(AspireJourney::class, 'aspire_journey_id');
    }
}