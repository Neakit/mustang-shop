<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'model' => 'OM905LA',
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category' => 1,
                'currency' => 1,
                'status' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'model' => 'OM905LA',
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category' => 1,
                'currency' => 1,
                'status' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'model' => 'OM905LA',
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category' => 1,
                'currency' => 1,
                'status' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'model' => 'OM905LA',
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category' => 1,
                'currency' => 1,
                'status' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
        ];

        DB::table('products')->insert($products);
    }
}
