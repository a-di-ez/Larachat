<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $fillable = ['id', 'name', 'email', 'password', 'remember_token'];

    protected $casts = [
        'id'             => 'integer',
        'name'           => 'string',
        'email'          => 'string',
        'password'       => 'string',
        'remember_token' => 'string',
    ];

    public function messages ()
    {
        return $this->hasMany(Message::class);
    }

    public function chats ()
    {
        return $this->hasMany(Chat::class);
    }
}
