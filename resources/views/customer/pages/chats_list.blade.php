@extends('customer.layout')

@section('head.title', 'Chats list')

@section('body.class', '')

@section('content')
    <style xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml"
           xmlns:v-on="http://www.w3.org/1999/xhtml">
        #chatMessages{ width: 100%; border: 1px solid #ddd; min-height: 400px; list-style: none; padding-left: 0px;}

        #chatMessages li {
            background-color: #f6faff;
            border-radius: 5px;
            padding: 10px;
            margin: 10px;
        }
        #chatMessages li:hover {
            background-color: #eff4ff;
        }

        #chatMessages button {
            float: right;
            margin-top: 25px;
        }

        .left {
            float: left;
        }
    </style>

    <div class="container" id="chats">
        <div class="row">
            <div>
                <div class="panel panel-default">

                    <div class="panel-heading">Chats List</div>

                    <div class="panel-body">
                        <ul id="chatMessages">
                            <li v-for="chat in chats" class="" :class="message.class">
                                <div class="left">
                                    <p class="">Name chat: <i>@{{ chat.title }}</i> </p>
                                    <p class="">Access code: <i>@{{ chat.access_code }}</i> </p>
                                    <p class="">Chat lifetime: <i>@{{ chat.lifetime }}</i> </p>
                                </div>
                                <a href="/chat/@{{ chat.access_code }}">
                                    <button type="button" class="btn btn-success">Open chat</button>
                                </a>
                                <div class="clearfix"></div>
                            </li>
                        </ul>

                        <button type="button" class="btn btn-info" data-target="#create_chat" data-toggle="modal">Create chat</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="create_chat" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">×</button>
                        <h4 class="modal-title">Create New Chat</h4>
                    </div>
                    <form id="createChatForm" v-on:submit.prevent="createChat">
                        {!! csrf_field() !!}
                        <div class="padding-top-0 modal-body">
                            <div class="form-group">
                                <label class="control-label">Name</label>
                                <input type="text" name="chat_name" class="form-control" placeholder="Enter chat name..." autocomplete="off">
                            </div>

                            <div class="form-group">
                                <label class="control-label">Lifetime (min)</label>
                                <input type="text" name="chat_lifetime" class="form-control" placeholder="Enter chat lifetime..." autocomplete="off">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-info">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Latest Vue JS CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.min.js"></script>

    <script>

        var vue = new Vue({
            el: '#chats',
            data : {
                chats: {!! $chats or [] !!}
            },
            ready : function(){
                var me = this;
            },
            methods : {
                createChat : function (event) {
                    event.preventDefault();

                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '{{ route('chat.postCreateChat') }}',
                        data: $('#createChatForm').serialize(),
                        success: function(data) {
                            alert('Your access code' + data);

                            setTimeout(function()
                            {
                                $('#create_chat').modal('hide');
                                location.reload(true);
                            }, 3000);
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    })
                }
            }
        });
    </script>
@endsection
