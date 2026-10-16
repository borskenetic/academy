<?php

use App\Http\Controllers\Api\SkillsoftLeadController;
use Illuminate\Support\Facades\Route;

Route::post('/skillsoft-leads', [SkillsoftLeadController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('api.skillsoft-leads.store');
