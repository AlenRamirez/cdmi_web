<?php

use Illuminate\Support\Facades\Route;

Route::view('/{any?}', 'welcome')->where('any', '.*');

{/*Route::get('/login', function () {
    return response()->json(['message' => 'No autenticado.'], 401);
})->name('login');*/}