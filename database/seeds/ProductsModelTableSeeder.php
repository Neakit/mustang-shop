<?php

use Illuminate\Database\Seeder;

class ProductsModelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $models = [
            [
                'title' => 'Actros',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Axor',
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('product_models')->insert($models);
    }
}
