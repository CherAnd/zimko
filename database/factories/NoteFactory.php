<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Note;
use Faker\Generator as Faker;

$factory->define(Note::class, function (Faker $faker) {
    return [
        'title'=>$faker->company,
        'body'=>$faker->paragraph(20),
        'user_id'=>'1'
    ];
});
