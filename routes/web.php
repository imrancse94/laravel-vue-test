<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function () {
    return view('welcome');
});
 */

Route::get('test', function(){
    \DB::connection()->enableQueryLog();
    $user = \App\Models\User::find(1)->subject;	
    //$user = \App\Models\User::find(1)->subjects;
    
    foreach($user as $u){
        echo($u->pivot->pivotParent->name);
    }
    $queries = \DB::getQueryLog();
    dd($queries);
});

Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');