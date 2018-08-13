<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use App\Entities\SearchModel;
use App\Entities\ExportModel;

use Symfony\Component\VarDumper\VarDumper;

class ApiController extends Controller
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
	 * Handles yandex api organization search request
	*/
	public function search(Request $request): string 
	{
		return SearchModel::getResults($_SERVER['QUERY_STRING']);
	}


	public function google(Request $request): string 
	{
		return  SearchModel::getGooglePlaces($_SERVER['QUERY_STRING']);
	}

	public function googleplace(Request $request): string 
	{
		return  SearchModel::getGooglePlace($_SERVER['QUERY_STRING']);
	}


	public function export(Request $request): string
	{
		$data = json_decode($request->all()['data'], true);

		$export = new ExportModel($data);
		$file = $export->build('export.xls');

		return json_encode([
			'result' => 'ok',
			'filePath' => $file  
		]);
	}

	public function parse(Request $request) {

		$cities = $request->input('cities');
		$phrase = $request->input('text');

		$exitCode = Artisan::call('parse:cities');

		$data = SearchModel::parse($cities, $phrase);
		$export = new ExportModel($data);
		$file = $export->build('export-cities-' . time() .'.xls');

		// TO DO - Build export 


		return json_encode([
			'result' => 'ok',
			'exitCode' => $exitCode
		]);
	}
}