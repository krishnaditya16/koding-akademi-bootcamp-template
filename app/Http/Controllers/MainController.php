<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;

class MainController extends Controller
{
    public function login()
    {
        return Inertia::render('main/auth/login');
    }

    public function register()
    {
        return Inertia::render('main/auth/register');
    }

    public function home()
    {
        $products =  Product::with('category', 'variants')->get();

        return Inertia::render('main/home', [
            'products' => $products
        ]);
    }

    public function productDetail(Product $product)
    {
        return Inertia::render('main/product/detail', [
            'product' => $product->load('category', 'variants')
        ]);
    }

    public function orderForm()
    {
        return Inertia::render('main/order/form');
    }

    public function orderList()
    {
        $user = auth('sanctum')->user();
        $orders = Order::where('user_id', $user->id)->get();

        return Inertia::render('main/order/list', [
            'orders' => $orders,
        ]);
    }
}
