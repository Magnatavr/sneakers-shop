<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['title' => 'Nike Air Max', 'price' => 1205, 'image_url' => '/images/sneakers/sneakers-1.jpg'],
            ['title' => 'Adidas Superstar', 'price' => 980, 'image_url' => '/images/sneakers/sneakers-2.jpg'],
            ['title' => 'Puma RS-X', 'price' => 1100, 'image_url' => '/images/sneakers/sneakers-3.jpg'],
            ['title' => 'New Balance 530', 'price' => 1150, 'image_url' => '/images/sneakers/sneakers-4.jpg'],
            ['title' => 'Converse Chuck 70', 'price' => 950, 'image_url' => '/images/sneakers/sneakers-5.jpg'],
            ['title' => 'Vans Old Skool', 'price' => 900, 'image_url' => '/images/sneakers/sneakers-6.jpg'],
            ['title' => 'Reebok Club C', 'price' => 1020, 'image_url' => '/images/sneakers/sneakers-7.jpg'],
            ['title' => 'Jordan 1 Mid', 'price' => 1400, 'image_url' => '/images/sneakers/sneakers-8.jpg'],
            ['title' => 'Asics Gel-Lyte', 'price' => 1100, 'image_url' => '/images/sneakers/sneakers-9.jpg'],
            ['title' => 'Saucony Jazz', 'price' => 1000, 'image_url' => '/images/sneakers/sneakers-10.jpg'],
            ['title' => 'Puma Suede', 'price' => 950, 'image_url' => '/images/sneakers/sneakers-11.jpg'],
            ['title' => 'Nike Blazer', 'price' => 1200, 'image_url' => '/images/sneakers/sneakers-12.jpg'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
