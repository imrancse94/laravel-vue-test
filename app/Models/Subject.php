<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function add($inputData){
        return self::create($inputData);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_subjects');
    }
    
}
