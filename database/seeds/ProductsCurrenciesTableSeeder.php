<?php

use Illuminate\Database\Seeder;

class ProductsCurrenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $currencies = [
            [
                'symbol' => 'P',
                'currency_id' => 1,
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'symbol' => '$',
                'currency_id' => 2,
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('currencies')->insert($currencies);
    }
}
