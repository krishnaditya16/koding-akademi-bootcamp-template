<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/categories/index', [
            'categoriesData' => Category::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/categories/form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:3|max:255|unique:categories',
            'description' => 'nullable|string|max:255',
        ]);

        Category::create($data);

        return redirect()->route('categories.index')->with('toast', [
            'type' => 'success',
            'message' => 'Category created successfully.',
        ]);
    }

    public function show(Category $category)
    {
        return Inertia::render('admin/categories/show', [
            'category' => $category,
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('admin/categories/form', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'required|string|min:3|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string|max:255',
        ]);

        $category->update($data);

        return redirect()->route('categories.index')->with('toast', [
            'type' => 'success',
            'message' => 'Category updated successfully.',
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('toast', [
            'type' => 'success',
            'message' => 'Category deleted successfully.',
        ]);
    }
}
