<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */


// auth login
Route::post('login',[AuthController::class,'login']);

// auth middleware
Route::group(['middleware' => ['auth:api']], function() {
    Route::post('subject/create',[SubjectController::class,'create']);
    Route::get('subject/list/{id}',[SubjectController::class,'getSubjectListByUserId']);
    
    Route::get('auth/user',[AuthController::class,'getAuthUser']);
    Route::post('logout',[AuthController::class,'logout']);
});