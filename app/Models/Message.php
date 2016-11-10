<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'messages';

    protected $fillable = ['id', 'user_id', 'chat_id', 'text'];

    protected $casts = [
        'id'      => 'integer',
        'user_id' => 'integer',
        'chat_id' => 'integer',
        'text'    => 'string',
    ];

    public function chat ()
    {
        return $this->hasOne(Chat::class, 'id', 'chat_id');
    }

    public function user ()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
