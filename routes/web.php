<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin Routes
Route::middleware(['auth', 'verified', 'checkAdmin'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('variants', ProductVariantController::class);
});

// Customer Routes
Route::get('/', [MainController::class, 'home'])->name('home');
Route::get('/product/{product}', [MainController::class, 'productDetail'])->name('product.detail');

Route::middleware(['auth'])->group(function () {
    Route::get('/order', [MainController::class, 'orderForm'])->name('order.form');
    Route::post('/order', [OrderController::class, 'createOrder'])->name('order.create');
    Route::post('/order/{order}/pay', [OrderController::class, 'payOrder'])->name('order.pay');
    Route::get('/order/list', [MainController::class, 'orderList'])->name('order.list');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
