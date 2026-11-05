<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Painting;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Painting $painting)
    {
        $reviews = $painting->reviews()->latest()->get();

        return response()->json([
            'data' => $reviews,
            'average_rating' => round($reviews->avg('rating') ?? 0, 1),
            'total_reviews' => $reviews->count(),
        ]);
    }

    public function store(Request $request, Painting $painting)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        $review = $painting->reviews()->create($validated);

        return response()->json([
            'message' => 'Review berhasil ditambahkan.',
            'data' => $review,
        ], 201);
    }
}