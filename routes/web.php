<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CourseDetailsController;
use App\Http\Controllers\CseCoursesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProgramController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public pages (rendered as Inertia views)
|--------------------------------------------------------------------------
*/

Route::get('/', HomeController::class)->name('home');

Route::get('/program', [ProgramController::class, 'show'])->name('program');

Route::get('/cse-courses', CseCoursesController::class)->name('cse-courses');

Route::get('/skillsoft-catalog', CatalogController::class)->name('skillsoft-catalog');

Route::get('/courses/{type}/{slug}', CourseDetailsController::class)->name('courses.details');

/*
|--------------------------------------------------------------------------
| Public submissions
|--------------------------------------------------------------------------
*/

Route::post('/applications', [ApplicationController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('applications.store');

/*
|--------------------------------------------------------------------------
| Authenticated learner area (login / register / logout come from Fortify)
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/dashboard/export', [DashboardController::class, 'export'])->name('dashboard.export');
    Route::get('/dashboard/accounts', [AccountController::class, 'index'])->name('dashboard.accounts');
    Route::post('/dashboard/accounts', [AccountController::class, 'store'])->name('dashboard.accounts.store');
    Route::put('/dashboard/accounts/{account}', [AccountController::class, 'update'])->name('dashboard.accounts.update');
    Route::delete('/dashboard/accounts/{account}', [AccountController::class, 'destroy'])->name('dashboard.accounts.destroy');
});
