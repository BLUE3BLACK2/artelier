<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Painting extends Model
{
    protected $fillable = [
        'title',
        'artist',
        'description',
        'price',
        'image',
        'category',
        'stock',
    ];
}