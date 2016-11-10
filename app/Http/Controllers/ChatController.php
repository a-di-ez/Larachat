<?php

namespace App\Http\Controllers;


use App\Models\Chat;

use App\Models\Message;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;


class ChatController extends Controller
{
    /**
     * @var user
     */
    protected $user = null;

    public function __construct()
    {
        $this->middleware('auth:customer');

        $this->user = Auth::guard('customer')->user();
    }

    public function getChatsList ()
    {
        $chats = Chat::whereUserId($this->user->id)->get()->toJson();

        return view('customer.pages.chats_list', compact("chats"));
    }

    public function getChat ($access_code)
    {
        $chat = Chat::whereAccessCode($access_code)->with('messages', 'messages.user')->first();
        $chats = Chat::whereUserId($this->user->id)->with('messages')->get();

        $left_time = ceil(($chat->lifetime - date('U')) / 60);

//        if ($left_time <= 0) {
//            return response(['status' => 'Chat lifetime end'], 410);
//        }

        $user_name = 'Anonymous' . rand(1, 100);
        $user_id = 0;
        $user_email = 'anonim@mail.com';

        if (isset($this->user)) {
            $user_name = $this->user->name;
            $user_id = $this->user->id;
            $user_email = $this->user->email;
        }

        Cookie::queue('chat_id', encrypt($chat->id), $left_time);
        Cookie::queue('user_id', encrypt($user_id), $left_time);

        return view('customer.pages.chats', compact("user_name", "chat", "user_email", "chats"));
    }

    public function postCreateChat (Request $request)
    {
        $chat = new Chat();

        $chat->access_code = rand(1, 99999);
        $chat->user_id     = $this->user->id;
        $chat->title       = $request->input('chat_name');
        $chat->lifetime    = date('U') + $request->input('chat_lifetime') * 60;

        $chat->saveOrFail();

        return $chat->access_code;
    }

    public function getTest ()
    {   $chat2 = Crypt::encrypt('21dadsdad');
        return Crypt::decrypt($chat2);
        $chat = Chat::whereAccessCode(45326)->with('messages', 'messages.user')->first();

        if (isset($this->user)) {
            $user_name = $this->user->name;
            $user_email = $this->user->email;
        }

    }
}
