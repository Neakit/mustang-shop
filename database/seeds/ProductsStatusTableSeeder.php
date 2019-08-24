<?php

use Illuminate\Database\Seeder;

class ProductsStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $statuses = [
            [
                'title' => 'Б/У',
                'status_id' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => 'Новый',
                'status_id' => 2,
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('product_status')->insert($statuses);
    }
}
