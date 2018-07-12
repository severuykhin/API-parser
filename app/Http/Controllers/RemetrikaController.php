<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entities\RemetrikaModel;

class RemetrikaController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
	}
	
	/**
	 * Handles base yandex metrika api search request
	*/
	public function index(Request $request): string 
	{
		return RemetrikaModel::getIndex($_SERVER['QUERY_STRING']);
	}

	/**
	 * Handles yandex yandex api counters search request
	*/
	public function counters(Request $request): string 
	{
		return RemetrikaModel::getCounters();
	}

	public function summary(Request $request): string 
	{
		return RemetrikaModel::getSummary($_SERVER['QUERY_STRING']);
	}
}