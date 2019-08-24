<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
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
                'category_id' => 1,
                'description' => 'Система охлаждения автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Карданные валы',
                'category_id' => 2,
                'description' => 'Карданные валы автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Рулевое управление',
                'category_id' => 3,
                'description' => 'Рулевое управление автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Система отопления',
                'category_id' => 4,
                'description' => 'Система отопления автомобиля',
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('$categories')->insert($categories);
    }
}
