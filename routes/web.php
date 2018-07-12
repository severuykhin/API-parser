<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Common Routes
$router->get('/', function () use ($router) {
    return view('index');
});
$router->get('yandexorg', function () use ($router) {
    return view('index');
});
$router->get('googleplaces', function () use ($router) {
    return view('index');
});


// APi Routes
$router->get('api/search', 'ApiController@search');
$router->get('api/google', 'ApiController@google');
$router->get('api/googleplace', 'ApiController@googleplace');
$router->post('api/export', 'ApiController@export');


// Remetrika routes
$router->get('remetrika/index', 'RemetrikaController@index');
$router->get('remetrika/counters', 'RemetrikaController@counters');
$router->get('remetrika/summary', 'RemetrikaController@summary');
