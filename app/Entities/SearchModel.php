<?php

namespace App\Entities;

use Symfony\Component\VarDumper\VarDumper;
use App\Entities\ExportModel;


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

	public static function parse(array $cities, string $phrase): array
	{
		$items = [];
		$step  = 500;
		$data  = null;
		$count = 1;

		foreach ($cities as $city) {

			$cityItems = [];
			$skip  = 0;

			do {

				$json = file_get_contents('https://search-maps.yandex.ru/v1/?text=' . $phrase . '&lang=ru_RU&ll=' . $city . '&spn=0.400,0.360&type=biz&results=500&skip=' . $skip . '&apikey=' . self::YANDEX_APIKEY);
				$temp = json_decode($json, true);
				$results = $temp['properties']['ResponseMetaData']['SearchResponse']['found'];
				foreach($temp['features'] as $item) {
					$cityItems[] = $item;
					echo 'Item #' . $count . ' parsed' . PHP_EOL;
					$count++;
				}

				$skip += $step;
				echo 'Data blob parsed' . PHP_EOL;
				sleep(4);

			} while (count($cityItems) < ((int) $results));

			$data = self::prepareForExport($cityItems);

			foreach($data as $item) {
				$items[] = $item;
			}
			
			$memory = (memory_get_usage() / 1000) / 1000;

			echo '---City parsed---' . PHP_EOL;
			echo "--- Now used $memory mb of memory ----" . PHP_EOL;
		}

		$memory = (memory_get_usage() / 1000) / 1000;
		echo "--- Now used $memory mb of memory ----" . PHP_EOL;

		return $items;
	}

	public static function prepareForExport(array $items):array 
	{
		$data = [];

		foreach ($items as $item) {

			$props = $item['properties']['CompanyMetaData'];
			$entity = [
				'name'    => $props['name'],
				'url'     => isset($props['url']) ? $props['url'] : 'нет сайта',
				'address' => isset($props['address']) ? $props['address'] : '',
				'hours'   => isset($props['Hours']) ? $props['Hours']['text'] : '',
				'phones'  => '',
				'links'   => ''
			];

			if (isset($props['Links']) && count($props['Links']) > 0) {
				$links = '';
				foreach($props['Links'] as $item) {
					$links = $links . $item['href'] . ',' . PHP_EOL;
				}

				$entity['links'] = $links;
			}

			if (isset($props['Phones']) && count($props['Phones']) > 0) {
				$phones = '';
				foreach($props['Phones'] as $item) {
					$phones = $phones . $item['formatted'] . ',' . PHP_EOL;
				}

				$entity['phones'] = $phones;
			}

			$data[] = $entity;
		}

		return $data;
	}

}