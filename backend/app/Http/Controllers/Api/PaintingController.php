<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Painting;
use Illuminate\Http\Request;

class PaintingController extends Controller
{
    public function index(Request $request)
    {
        $query = Painting::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('artist', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->latest()->paginate(6));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('paintings', 'public');
        }

        $painting = Painting::create($validated);

        return response()->json([
            'message' => 'Painting created successfully',
            'data' => $painting,
        ], 201);
    }

    public function show(Painting $painting)
    {
        return response()->json($painting);
    }

    
    public function update(Request $request, Painting $painting)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'artist' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'sometimes|required|string|max:255',
            'stock' => 'sometimes|required|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('paintings', 'public');
        }

        $painting->update($validated);

        return response()->json([
            'message' => 'Painting updated successfully',
            'data' => $painting->fresh(),
        ]);
    }

    public function destroy(Painting $painting)
    {
        $painting->delete();

        return response()->json([
            'message' => 'Painting deleted successfully',
        ]);
    }
}
