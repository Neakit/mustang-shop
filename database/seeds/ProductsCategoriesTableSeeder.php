<?php

use Illuminate\Database\Seeder;

class ProductsCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $categories = [
            [
                'title' => 'Система охлаждения',
                'description' => 'Система охлаждения автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Карданные валы',
                'description' => 'Карданные валы автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Рулевое управление',
                'description' => 'Рулевое управление автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Система отопления',
                'description' => 'Система отопления автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('categories')->insert($categories);
    }
}
