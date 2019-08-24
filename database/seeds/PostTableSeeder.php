<?php

use Illuminate\Database\Seeder;

class PostTableSeeder extends Seeder
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
                'title' => "Тягач Volvo",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'body' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat',
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Тягач Volvo",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'body' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat',
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Тягач Volvo",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'body' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat',
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'created_at' => new DateTime,
                'updated_at' => null,
            ],
            [
                'title' => "Тягач Volvo",
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat.',
                'body' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consequat',
                'image' => 'http://auto-mustang.ru/images/1566155535_Cat.jpg',
                'created_at' => new DateTime,
                'updated_at' => null,
            ]
        ];

        DB::table('posts')->insert($posts);
    }
}
