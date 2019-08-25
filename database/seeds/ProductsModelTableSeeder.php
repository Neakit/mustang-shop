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
                'model_id' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Axor',
                'model_id' => 2,
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('product_models')->insert($models);
    }
}
