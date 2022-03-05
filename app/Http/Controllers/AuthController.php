<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // user login
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $data = [];
        //Crean token
        try {

            if (!$token = auth()->attempt($credentials)) {
                return $this->sendError(__('Login credentials are invalid.'), [], config('constant.LOGIN_FAILED'));
            }

            $data['access_token'] = $token;
            $data['user'] = Auth::user();
        } catch (\Exception $e) {
            return $this->sendError(__('Could not create token.'), [], config('constant.LOGIN_FAILED'));
        }

        return $this->sendResponse($data, __('Login successfully'), config('constant.LOGIN_SUCCESS'));
    }

    public function getAuthUser(){
        $message = "Successfully get data.";
        $data['user'] = auth()->user();
        $data['access_token'] = request()->bearerToken();
        return $this->sendResponse($data,$message,config('constant.AUTH_USER_SUCCESS'));
    }

    public function logout()
    {
        auth()->logout();
        $message = "Successfully logged out.";
        return $this->sendResponse([],$message,config('constant.USER_LOGOUT_SUCCESS'));
    }

    
}
