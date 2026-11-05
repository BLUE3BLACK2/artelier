
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PaintingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReviewController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/paintings', [PaintingController::class, 'index']);
Route::get('/paintings/{painting}', [PaintingController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/paintings', [PaintingController::class, 'store']);
    Route::put('/paintings/{painting}', [PaintingController::class, 'update']);
    Route::patch('/paintings/{painting}', [PaintingController::class, 'update']);
    Route::delete('/paintings/{painting}', [PaintingController::class, 'destroy']);
});

Route::get('/paintings/{painting}/reviews', [ReviewController::class, 'index']);
Route::post('/paintings/{painting}/reviews', [ReviewController::class, 'store']);
