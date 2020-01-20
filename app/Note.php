<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['title', 'body', 'date'];
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
