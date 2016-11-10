<?php namespace App;

use App\Models\Message;
use App\Models\Chat as ChatModel;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;


class Chat implements MessageComponentInterface {

    protected $chats = [];

    public function onOpen(ConnectionInterface $conn) {
        echo $conn->WebSocket->request->getCookie('chat_id') . " - CHAT IDencrpt on open\n";

        $chat_id = decrypt($conn->WebSocket->request->getCookie('chat_id'));
        echo $chat_id . " - CHAT ID on open\n";

        $chat = ChatModel::find($chat_id);

        if (!isset($this->chats[$chat_id])) {
            $this->chats[$chat_id] = [
                "socket" => new \SplObjectStorage,
                "lifetime" => $chat->lifetime
            ];
        }

        $this->chats[$chat_id]['socket']->attach($conn);

        echo "New connection! ({$conn->resourceId}) Room ID: {$chat_id}\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo $from->WebSocket->request->getCookie('chat_id') . " - CHAT IDcrypt on msg\n\n\n";
        $chat_id = decrypt($from->WebSocket->request->getCookie('chat_id'));
        echo $chat_id . " - CHAT ID on msg\n";

        echo $from->WebSocket->request->getCookie('user_id') . " - USER ID on msg\n";
        $user_id = decrypt($from->WebSocket->request->getCookie('user_id'));
        echo $user_id . " - USER ID on msg\n";


        if ($this->chats[$chat_id]['lifetime'] < date('U')) {
            foreach ($this->chats[$chat_id]['socket'] as $client) {
                $client->send('Chat lifetime is end...');
                $client->close();
            }

            unset($this->chats[$chat_id]);

            echo "Connection {$chat_id} has disconnected: lifetime end\n";
        } else {
            if ($user_id != 0) {
                $message = new Message();
                $message->user_id = $user_id;
                $message->chat_id = $chat_id;
                $message->text = json_decode($msg)->text;
                $message->save();
            }

            foreach ($this->chats[$chat_id]['socket'] as $client) {
                if ($from !== $client) {
                    $client->send($msg);
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $chat_id = decrypt($conn->WebSocket->request->getCookie('chat_id'));
        $this->chats[$chat_id]['socket']->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

}