<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login'])->name('api.login');
Route::post('register', [AuthController::class, 'register'])->name('api.register');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('api.logout');
    Route::get('profile', [AuthController::class, 'profile'])->name('api.profile');
    Route::post('order', [OrderController::class, 'createOrder'])->name('api.order.create');
    Route::post('order/{order}/pay', [OrderController::class, 'payOrder'])->name('api.order.pay');
});

Route::post('webhook/order', [OrderController::class, 'webhookPayment'])->name('order.webhook');

Route::get('test-cors', function () {
    return response()->json(['message' => 'CORS working']);
});
