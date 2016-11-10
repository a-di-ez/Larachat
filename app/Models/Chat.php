<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = 'chats';

    protected $fillable = ['id', 'user_id', 'title', 'access_code', 'lifetime'];

    protected $casts = [
        'id'          => 'integer',
        'user_id'     => 'integer',
        'title'       => 'string',
        'access_code' => 'integer',
        'lifetime'    => 'integer',
    ];

    public function messages ()
    {
        return $this->hasMany(Message::class);
    }
}
