<?php

Route::group(['prefix' => 'auth'], function() {
    Route::get('login', ['as' => 'auth.getLogin', 'uses' => 'Auth\AuthController@getLogin']);
    Route::post('login', ['as' => 'auth.postLogin', 'uses' => 'Auth\AuthController@postLogin']);
    Route::get('logout', ['as' => 'auth.getLogout', 'uses' => 'Auth\AuthController@getLogout']);
});

Route::get('/', ['as' => 'customer.getChatsList', 'uses' => 'ChatController@getChatsList']);
Route::get('/chat/{access_code}', ['as' => 'getChat', 'uses' => 'ChatController@getChat']);
Route::post('create/chat', ['as' => 'chat.postCreateChat', 'uses' => 'ChatController@postCreateChat']);

Route::get('/test', ['as' => 'getTest', 'uses' => 'ChatController@getTest']);
