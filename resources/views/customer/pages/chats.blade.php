@extends('customer.layout')

@section('head.title', 'Chat '. $chat->access_code)

@push('head.stylesheets')
<link rel="stylesheet" href="{{ asset('assets/css/pages/chat.css') }}">
@endpush

@section('body.class', 'app-message page-aside-scroll site-navbar-small')

@section('content')
    <div class="page animsition" style="animation-duration: 800ms; opacity: 1;">
        <!-- Message Sidebar -->
        <div class="page-aside">
            <div class="page-aside-switch">
                <i class="icon wb-chevron-left" aria-hidden="true"></i>
                <i class="icon wb-chevron-right" aria-hidden="true"></i>
            </div>
            <div class="page-aside-inner">
                <div class="input-search">
                    <button class="input-search-btn" type="submit">
                        <i class="icon wb-search" aria-hidden="true"></i>
                    </button>
                    <form>
                        <input class="form-control" placeholder="Search Keyword" name="" type="text">
                    </form>
                </div>

                <div class="app-message-list scrollable is-enabled scrollable-vertical" data-plugin="pageAsideScroll" style="position: relative;">
                    <div data-role="container" class="scrollable-container" style="height: 386px; width: 269px;">
                        <div data-role="content" class="scrollable-content" style="width: 259px;">
                            <ul class="list-group">
                                @foreach ($chats as $chat_item)
                                    <li class="list-group-item @if ($chat_item->id == $chat->id) active @endif">
                                        <div class="media">
                                            <div class="media-left">
                                                <a class="avatar avatar-online" href="javascript:void(0)">
                                                    <img class="img-responsive" src="{{ asset('assets/images/5.jpg') }}" alt="..."><i></i>
                                                </a>
                                            </div>
                                            <div class="media-body">
                                                <h4 class="media-heading">{{ $chat_item->title }}</h4>
                                                <span class="media-time">{{ (ceil(($chat_item->lifetime - date('U')) / 60) < 0) ? 'Time left.' : ceil(($chat_item->lifetime - date('U')) / 60) . ' min left' }} </span>
                                            </div>
                                            <div class="media-right">
                                                <span class="badge badge-info">{{ count($chat_item->messages) }}</span>
                                            </div>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="scrollable-bar scrollable-bar-vertical scrollable-bar-hide" draggable="false"><div class="scrollable-bar-handle" style="height: 176.005px; transform: translate3d(0px, 0px, 0px);"></div></div></div>
            </div>
        </div>
        <!-- End Message Sidebar -->
        <div class="page-main" id="chat">
            <!-- Chat Box -->
            <div class="app-message-chats">
                {{--<button type="button" id="historyBtn" class="btn btn-round btn-outline btn-default">History Messages</button>--}}
                <div class="chats">
                    @foreach ($chat->messages as $message)
                        <div class="chat margin-bottom-30 @if ($message->user->email != $user_email) chat-left @endif">
                            <div class="chat-avatar">
                                <a class="avatar" data-toggle="tooltip" href="#" data-placement="right" title="" data-original-title="">
                                    <img src="@if ($message->user->email == $user_email) {{ asset('assets/images/5.jpg') }} @else http://placehold.it/50x50  @endif" alt="June Lane">
                                    {{--<p>dadasdsa @if ($message->user->email == $user_email) Me @else {{ $message->user->name }} @endif</p>--}}
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-content">
                                    <p>
                                        {{ $message->text }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    @endforeach

                        <div class="chat margin-bottom-30" v-for="message in messages" :class="message.class" >
                            <div class="chat-avatar">
                                <a class="avatar" data-toggle="tooltip" href="#" data-placement="right" title="" data-original-title="">
                                    <img src="http://placehold.it/50x50" alt="June Lane">
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-content">
                                    <p>
                                        @{{ message.msg }}
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>

            </div>
            <!-- End Chat Box -->

            <!-- Message Input-->
            <form class="app-message-input">
                <div class="message-input">
                    <textarea class="form-control" rows="1" v-model="newMessage" @keyup.enter="sendMessage"></textarea>
                    <div class="message-input-actions btn-group">
                        <button class="btn btn-pure btn-icon btn-default" type="button">
                            <i class="icon wb-emoticon" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-pure btn-icon btn-default" type="button">
                            <i class="icon wb-image" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-pure btn-icon btn-default" type="button">
                            <i class="icon wb-paperclip" aria-hidden="true"></i>
                        </button>
                        <input id="messageImage" name="messageImage" type="file">
                        <input id="messageFile" name="messageFile" type="file">
                    </div>
                </div>
                <button class="message-input-btn btn btn-primary" type="button" v-on:click="sendMessage">SEND</button>
            </form>
            <!-- End Message Input-->
        </div>
    </div>
@endsection

@push('footer.scripts')
<script src="{{ asset('assets/js/autosize.min.js') }}"></script>
<script src="{{ asset('assets/js/pages/chat-app.js') }}"></script>
<script src="{{ asset('assets/js/pages/chat.js') }}"></script>

<!-- Latest Vue JS CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.min.js"></script>

<script>

    var vue = new Vue({
        el: '#chat',
        data : {
            messages: [],
            newMessage: "",
            userName: "{{ $user_name }}",
            uri: "{{ explode(':', str_replace('http://', '', str_replace('https://', '', App::make('url')->to('/'))))[0] }}",
            conn: false
        },
        ready : function(){

            // default port
            this.port = '9090';

            // init connection
            this.conn = new WebSocket('ws://'+this.uri+':'+this.port);

            var me = this;

            this.conn.onclose = function (event) {

                var reason;

                if (event.code == 1000)
                    reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";

                else if(event.code == 1001)
                    reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";

                else if(event.code == 1002)
                    reason = "An endpoint is terminating the connection due to a protocol error";

                else if(event.code == 1003)
                    reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";

                else if(event.code == 1004)
                    reason = "Reserved. The specific meaning might be defined in the future.";

                else if(event.code == 1005)
                    reason = "No status code was actually present.";

                else if(event.code == 1006)
                    reason = "Abnormal error, e.g., without sending or receiving a Close control frame";

                else if(event.code == 1007)
                    reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";

                else if(event.code == 1008)
                    reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";

                else if(event.code == 1009)
                    reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";

                else if(event.code == 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
                    reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;

                else if(event.code == 1011)
                    reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";

                else if(event.code == 1015)
                    reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
                else
                    reason = "Unknown reason";

                me.addSystemMessage("Connection closed: " + reason);
            };

            this.conn.onopen = function(event) {
                me.addSystemMessage("Connection established! Be cool...");
//                    this.conn.send(this.userName+":Hi! I'm now connected");
            }.bind(this);

            this.conn.onmessage = function(event) {
                me.addServerMessage(event.data);
            };
        },
        methods : {
            addSystemMessage : function(message){
                this.addMessage({
                    "msg" 	: message,
                    "class"	: "system",
                    "who"	: "System"
                });
            },
            addServerMessage : function(message){
                message = JSON.parse(message);
                this.addMessage({
                    "msg" 	: message.text,
                    "class"	: "chat-left",
                    "who"	: message.name
                });
            },
            addMeAmessage : function(message){
                this.addMessage({
                    "msg" 	: message,
                    "class"	: "",
                    "who"	: "Me"
                });
            },
            addMessage : function(message) {

                this.messages.push(message);

                // allow the DOM to get updated
                Vue.nextTick(function () {
                    this.scrollMessagesDown();
                }.bind(this));
            },
            scrollMessagesDown : function(){
                var chatMessages = document.getElementById('chatMessages');
                chatMessages.scrollTop = 1000000;
            },
            sendMessage : function() {

                if (!this.newMessage.length)
                    return;

                var msgToSend = {
                    'name' : this.userName,
                    'text' : this.newMessage
                };

                msgToSend = JSON.stringify(msgToSend);

                this.conn.send(msgToSend);

                this.addMeAmessage(this.newMessage);

                this.newMessage = "";
            },
            focusMe : function(event) {
                event.target.select();
            }
        }
    });
</script>
@endpush