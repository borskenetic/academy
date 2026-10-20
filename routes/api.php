<?php

use App\Http\Controllers\Api\InstitutionAccountController;
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
    Route::get('/institution/accounts', [InstitutionAccountController::class, 'index'])
        ->name('api.institution.accounts');
    Route::post('/institution/accounts', [InstitutionAccountController::class, 'store'])
        ->name('api.institution.accounts.store');
    Route::put('/institution/accounts/{account}', [InstitutionAccountController::class, 'update'])
        ->name('api.institution.accounts.update');
    Route::delete('/institution/accounts/{account}', [InstitutionAccountController::class, 'destroy'])
        ->name('api.institution.accounts.destroy');
});
