<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequest;
use Exception;

class SubjectController extends Controller
{
    private $subject;

    public function __construct(\App\Models\Subject $subject)
    {
        $this->subject = $subject;
    }

    public function create(SubjectRequest $request)
    {
        $inputData = $request->all();
        $subject = [];
        try {
            $subject = $this->subject->add($inputData);
        } catch (Exception $e) {
            return $this->sendError(__('Could not create subject.'), [], config('constant.SUBJECT_CREATE_FAILED'));
        }

        return $this->sendResponse($subject, __('Subject created successfully'), config('constant.SUBJECT_CREATE_SUCCESS'));
    }


    public function getSubjectListByUserId($user_id){

        $user = \App\Models\User::find($user_id)->subject;	
        return $this->sendResponse($user, __('Subject get successfully'), config('constant.SUBJECT_CREATE_SUCCESS'));
    }
}
