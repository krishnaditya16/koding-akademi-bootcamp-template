<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'verified', 'checkAdmin'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('variants', ProductVariantController::class);
});

Route::get('/', [MainController::class, 'home'])->name('home');
Route::get('/product/{product}', [MainController::class, 'productDetail'])->name('product.detail');
Route::get('/order', [MainController::class, 'orderForm'])->name('order.form');

Route::middleware(['auth'])->group(function () {
    Route::get('/order/list', [MainController::class, 'orderList'])->name('order.list');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
