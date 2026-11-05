<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'painting_id',
        'name',
        'rating',
        'comment',
    ];

    public function painting()
    {
        return $this->belongsTo(Painting::class);
    }
}