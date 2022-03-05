<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $inputData['name'] = "Imran Hossain";
        $inputData['email'] = "imrancse94@gmail.com";
        $inputData['password'] = bcrypt("123456");
        $inputData['email_verified_at'] = now();
        $user_data = \App\Models\User::create($inputData);

        $subjectData['name'] = "Algorithm";
        $subject_data = \App\Models\Subject::create($subjectData);
        
        $subjectRelationalData['user_id'] = $user_data['id'];
        $subjectRelationalData['subject_id'] = $subject_data['id'];
        \App\Models\UserSubject::create($subjectRelationalData);

        $subjectData['name'] = "Data Structure";
        $subject_data = \App\Models\Subject::create($subjectData);

        $subjectRelationalData['user_id'] = $user_data['id'];
        $subjectRelationalData['subject_id'] = $subject_data['id'];
        \App\Models\UserSubject::create($subjectRelationalData);
    }
}
