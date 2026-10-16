<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'name',
        'short',
        'tagline',
        'detail_title',
        'detail_note',
        'is_cse',
        'sort',
    ];

    protected function casts(): array
    {
        return [
            'is_cse' => 'boolean',
        ];
    }

    public function courses(): HasMany
    {
        return $this->hasMany(ProgramCourse::class)->orderBy('sort');
    }

    public function featured(): HasMany
    {
        return $this->hasMany(ProgramFeatured::class)->orderBy('sort');
    }

    public function details(): HasMany
    {
        return $this->hasMany(ProgramDetail::class)->orderBy('sort');
    }

    /**
     * Resolve a program by its public key (e.g. "aiml", "cs", "cse").
     */
    public static function findByKey(?string $key): ?self
    {
        if (! $key) {
            return null;
        }

        return static::query()->where('key', strtolower($key))->first();
    }
}