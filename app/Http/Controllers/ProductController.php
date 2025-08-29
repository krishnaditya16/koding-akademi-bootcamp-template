<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/products/index', [
            'productsData' => Product::with('category')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('admin/products/form', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255|unique:products',
            'description' => 'nullable|string|max:255',
            'company' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('products', 'public');
            }

            Product::create($data);

            DB::commit();

            return redirect()->route('products.index')->with('toast', [
                'type' => 'success',
                'message' => 'Product created successfully.',
            ]);
        } catch (\Exception $e) {
            if ($request->hasFile('image')) {
                Storage::disk('public')->delete($data['image']);
            }

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
    public function show(Product $product)
    {
        return Inertia::render('admin/products/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('admin/products/form', [
            'categories' => $categories,
            'product' => $product->load('category'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255|unique:products,name,'.$product->id,
            'description' => 'nullable|string|max:255',
            'company' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('products', 'public');
            } else {
                unset($data['image']);
            }

            $product->update($data);

            DB::commit();

            return redirect()->route('products.index')->with('toast', [
                'type' => 'success',
                'message' => 'Product updated successfully.',
            ]);
        } catch (\Exception $e) {
            if ($request->hasFile('image')) {
                Storage::disk('public')->delete($data['image']);
            }

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
    public function destroy(Product $product)
    {
        DB::beginTransaction();

        try {
            if ($product->image) {
                Storage::disk('public')->delete($product->getRawOriginal('image'));
            }

            $product->delete();

            DB::commit();

            return redirect()->route('products.index')->with('toast', [
                'type' => 'success',
                'message' => 'Product deleted successfully.',
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

