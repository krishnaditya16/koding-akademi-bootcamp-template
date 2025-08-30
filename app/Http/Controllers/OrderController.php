<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        DB::beginTransaction();

        try {
            $request->validate([
                'address' => ['required', 'string'],
                'phone' => ['required', 'string'],
                'postal_code' => ['required', 'string'],
                'products.*.id' => ['required', 'exists:product_variants,id'],
                'products.*.quantity' => ['required', 'integer', 'min:1'],
            ]);

            $order = Order::create([
                'user_id' => $request->user()->id,
                'address' => $request->address,
                'phone' => $request->phone,
                'postal_code' => $request->postal_code,
            ]);

            $total = 0;

            foreach ($request->products as $variantData) {
                $variant = ProductVariant::find($variantData['id']);

                if ($variant->stock < $variantData['quantity']) {
                    throw new Exception("Product variant with id {$variant->id} is out of stock");
                }

                $variant->decrement('stock', $variantData['quantity']);

                $price = $variant->product->price * $variantData['quantity'];

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $variantData['quantity'],
                    'price' => $price,
                ]);

                $total += $price;
            }

            $order->update([
                'total' => $total
            ]);

            DB::commit();

            return response()->json([
                'data' => $order,
                'message' => 'Order created successfully',
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'data' => null,
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
