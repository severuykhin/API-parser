<?php

namespace App\Entities;

class SearchModel {

	const YANDEX_APIKEY = 'bd79323b-1a36-4c01-94ac-ebe0c862825f';
	const GOOGLE_APIKEY = 'AIzaSyDC5epn4hDgXq5zWLw6Mnwj9uNLNgzDICw';

	/**
	 * Make and return GET Yandex api request
	 */

	public static function getResults($queryString): string 
	{	
		return file_get_contents('https://search-maps.yandex.ru/v1/?' . $queryString . '&apikey=' . self::YANDEX_APIKEY);
	}

	/**
	 * Make and return GET Google places api request
	 */
	public static function getGooglePlaces(string $queryString): string 
	{
		return file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?' . $queryString . '&key=' . self::GOOGLE_APIKEY);
	}

	/**
	 * Make and return GET Google places api request
	 */
	public static function getGooglePlace(string $queryString): string 
	{
		return file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?' . $queryString . '&key=' . self::GOOGLE_APIKEY);
	}

}