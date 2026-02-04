<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'image_url',
        'price',
    ];
    public function favorites() {
        return $this->hasMany(Favorite::class);
    }

    public function cartItems() {
        return $this->hasMany(CartItem::class);
    }
}
