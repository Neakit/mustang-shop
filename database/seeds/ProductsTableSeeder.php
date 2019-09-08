<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $products = [
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'product_model_id' => 1,
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category_id' => 1,
                'currency_id' => 1,
                'status_id' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'product_model_id' => 1,
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category_id' => 1,
                'currency_id' => 1,
                'status_id' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'product_model_id' => 1,
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category_id' => 1,
                'currency_id' => 1,
                'status_id' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Двигатель MERSEDES OM 904 LA 2-я комплектация",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'product_model_id' => 1,
                'price' => 200.10,
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'category_id' => 1,
                'currency_id' => 1,
                'status_id' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
        ];

        DB::table('products')->insert($products);
    }
}
