<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// CONTROLLERS
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\AyudaController;
use App\Http\Controllers\DonacionController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AutomovilController;
use App\Http\Controllers\CartShopController;
use App\Http\Controllers\InventarioController;

// AUTH NEEDED ROUTES

//Route::middleware('auth:sanctum')->post('/eventos/{evento}/registrarse', [EventoController::class, 'registrarse']);

//Route::middleware('auth:sanctum')->post('/donaciones', [DonacionController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('donaciones', DonacionController::class);
    Route::get('/donaciones', [DonacionController::class, 'index']);  // Para ver todas las donaciones
    Route::post('/donaciones', [DonacionController::class, 'store']);  // Para agregar una donación
    Route::delete('/donaciones/{id}', [DonacionController::class, 'destroy']);  // Para eliminar una donación
});

Route::middleware('auth:sanctum')->post('/pago/{}/registrarse', [OrderController::class, 'registrarUsuario']);

Route::middleware('auth:sanctum')->post('/eventos/{evento}/registrarse', [EventoController::class, 'registrarUsuario']);

Route::middleware('auth:sanctum')->post('/ayudas/{ayuda}/registrarse', [AyudaController::class, 'registrarUsuario']);

Route::middleware('auth:sanctum')->post('/mercancias/{automovil}/registrarse', [AutomovilController::class, 'registrarUsuario']);

Route::middleware('auth:sanctum')->post('/compras', [CompraController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/perfil', [UsuariosController::class, 'perfil']);

    Route::put('/perfil', [UsuariosController::class, 'actualizarPerfil']);

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete(); // Cierra solo la sesión actual
    return response()->json(['message' => 'Sesión cerrada correctamente']);
});

    //Route::post("/logout", [AuthController::class, 'logout']);

    Route::get("/verify", [AuthController::class, 'verifySession']);
});

Route::middleware('auth:sanctum')->post('/pago', [OrderController::class, 'store']);

Route::post('/checkout', [OrderController::class, 'store']);

Route::get('/eventos', [EventoController::class, 'index']);

Route::post('/eventos', [EventoController::class, 'store']); // 👈 Nueva ruta para crear eventos

Route::post("/login", [AuthController::class, 'login']);

Route::get('/ayudas', [AyudaController::class, 'index']);

Route::post('/ayudas', [AyudaController::class, 'store']); // 👈 Nueva ruta para crear eventos

Route::post("/login", [AuthController::class, 'login']);

Route::get('/mercancias', [AutomovilController::class, 'index']);

Route::post('/mercancias', [AutomovilController::class, 'store']); // 👈 Nueva ruta para crear eventos

Route::post("/login", [AuthController::class, 'login']);

// USERS ROUTES
Route::get('/usuarios', [UsuariosController::class, 'index']);

Route::get('/usuarios/{id}', [UsuariosController::class, 'show']);

Route::post('/usuarios', [UsuariosController::class, 'store']);

Route::put('/usuarios/{id}', [UsuariosController::class, 'update']);

Route::patch('/usuarios/{id}', [UsuariosController::class, 'updatePartial']);

Route::delete('/usuarios/{id}', [UsuariosController::class, 'destroy']);

// CART ROUTES

Route::post('/compras', [compraController::class, 'store']);

Route::get('/carrito', [CarritoController::class, 'index']);

Route::get('/carrito/{id}', [CarritoController::class, 'show']);

Route::post('/carrito', [CarritoController::class, 'store']);

Route::put('/carrito/{id}', [CarritoController::class, 'update']);

Route::patch('/carrito/{id}', [CarritoController::class, 'updatePartial']);

Route::delete('/carrito/{id}', [CarritoController::class, 'destroy']);


Route::get('/test', function (Request $request) {
    return response()->json([
        'message' => '¡API Laravel funcionando correctamente!'
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cartshop/{inventario_id}/add', [CartShopController::class, 'addToCart']);
    Route::get('/inventarios', [InventarioController::class, 'index']);
    Route::get('/cartshop', [CartShopController::class, 'getCart']);
    Route::put('/cartshop/{item_id}/update-quantity', [CartShopController::class, 'updateQuantity']);
    Route::delete('/cartshop/{item_id}/remove', [CartShopController::class, 'removeItem']);
    Route::post('/cartshop/checkout', [CartShopController::class, 'checkout']);
    
});


    Route::middleware('auth:sanctum')->post('/inventarios', [InventarioController::class, 'store']);
    Route::middleware('auth:sanctum')->get('/inventarios', [InventarioController::class, 'index']);


    Route::middleware(['auth:sanctum', 'administrador'])->get('/administrador/orders', [OrderController::class, 'index']);

    Route::middleware('auth:sanctum')->get('/historial', [CartShopController::class, 'historial']);
    Route::get('/orders/history', [OrderController::class, 'history'])->middleware('auth:sanctum');

    Route::get('/ordenes-finalizadas', [App\Http\Controllers\OrdenController::class, 'index']);
