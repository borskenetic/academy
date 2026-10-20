<?php

use App\Http\Controllers\Api\InstitutionInquiryController;
use App\Http\Controllers\Api\SkillsoftLeadController;
use Illuminate\Support\Facades\Route;

Route::post('/skillsoft-leads', [SkillsoftLeadController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('api.skillsoft-leads.store');

Route::post('/institution/login', [InstitutionInquiryController::class, 'login'])
    ->middleware('throttle:5,1')
    ->name('api.institution.login');

Route::middleware('institution.token')->group(function () {
    Route::post('/institution/logout', [InstitutionInquiryController::class, 'logout'])
        ->name('api.institution.logout');
    Route::get('/institution/inquiries', [InstitutionInquiryController::class, 'index'])
        ->name('api.institution.inquiries');
    Route::get('/institution/inquiries/export', [InstitutionInquiryController::class, 'export'])
        ->name('api.institution.inquiries.export');
});
