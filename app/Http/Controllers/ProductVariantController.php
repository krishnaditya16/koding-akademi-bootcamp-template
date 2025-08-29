<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $variantsData = ProductVariant::with('product')->get();

        return Inertia::render('admin/variants/index', [
            'variantsData' => $variantsData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::select('id', 'name')->get();

        return Inertia::render('admin/variants/form', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_name' => 'required|string|max:255',
            'stock' => 'required|numeric|min:0',
            'color' => 'required|string|max:255',
        ]);

        DB::beginTransaction();

        try {
            ProductVariant::create($data);

            DB::commit();

            return redirect()->route('variants.index')->with('toast', [
                'type' => 'success',
                'message' => 'Variant created successfully.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('toast', [
                'type' => 'error',
                'message' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariant $variant)
    {
        return Inertia::render('admin/variants/show', [
            'productVariant' => $variant,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductVariant $variant)
    {
        $products = Product::select('id', 'name')->get();

        return Inertia::render('admin/variants/form', [
            'products' => $products,
            'variant' => $variant->load('product'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductVariant $variant)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_name' => 'required|string|max:255',
            'stock' => 'required|numeric|min:0',
            'color' => 'required|string|max:255',
        ]);

        DB::beginTransaction();

        try {
            $variant->update($data);

            DB::commit();

            return redirect()->route('variants.index')->with('toast', [
                'type' => 'success',
                'message' => 'Variant updated successfully.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('toast', [
                'type' => 'error',
                'message' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariant $variant)
    {
        DB::beginTransaction();

        try {
            $variant->delete();

            DB::commit();

            return redirect()->route('variants.index')->with('toast', [
                'type' => 'success',
                'message' => 'Variant deleted successfully.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('toast', [
                'type' => 'error',
                'message' => 'Something went wrong. Please try again.',
            ]);
        }
    }
}
