<?php

use Illuminate\Database\Seeder;

class GuaranteeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $posts = [
            [
                'body' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat',
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('guarantees')->insert($posts);
    }
}
