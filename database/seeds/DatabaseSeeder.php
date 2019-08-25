<?php

use Illuminate\Database\Seeder;
// use App\database\BuyingTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
            UsersTableSeeder::class,
            BuyingTableSeeder::class,
            DeliveryTableSeeder::class,
            GuaranteeTableSeeder::class,
            PostTableSeeder::class,
            ProductsCategoriesTableSeeder::class,
            ProductsCurrenciesTableSeeder::class,
            ProductsModelsTableSeeder::class,
            ProductsStatusTableSeeder::class,
            ProductsTableSeeder::class,
          ]);
    }
}


