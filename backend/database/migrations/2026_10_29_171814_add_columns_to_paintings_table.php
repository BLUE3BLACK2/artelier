<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    
    public function up(): void
    {
        Schema::table('paintings', function (Blueprint $table) {
            $table->string('title');
            $table->string('artist');
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2);
            $table->string('image')->nullable();
            $table->string('category')->index();
            $table->unsignedInteger('stock')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('paintings', function (Blueprint $table) {
            $table->dropIndex(['category']);
            $table->dropColumn([
                'title',
                'artist',
                'description',
                'price',
                'image',
                'category',
                'stock',
            ]);
        });
    }
};
