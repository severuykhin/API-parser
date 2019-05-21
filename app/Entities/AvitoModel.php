<?php

namespace app\entities;

use GuzzleHttp\Client;

class AvitoModel {

    public $pageSize = 50;

    public $query = 'кухни+на+заказ';

    public $queryTranslit = 'kuhni';

    public $type = 'avito';

    public $file;

    public $pq; // PHP query instance

    public $cities;

    public $client;
    
    public $fileDescriptor;

    private $options = [
		'version' => '1.0',
		'verify'  => false,
		'debug'   => true,
		'headers' => [
			'Accept'     => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng',
			'Upgrade-Insecure-Requests' => '1',
			'accept-encoding' => 'gzip, deflate, br',
			'accept-language' => 'en-US,en;q=0.9,ru;q=0.8',
			'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
		]
	];

    private $head = [
        'Город', 
        'Назание', 
        'Телефон 1', 
        'Телефон 2', 
        'Телефон 3', 
        'Телефон 4', 
        'Email 1', 
        'Email 2', 
        'Email 3', 
        'Email 4', 
        'Сайт 1', 
        'Сайт 2', 
        'Сайт 3', 
        'Сайт 4',
        'VK',
        'OK',
        'INST',
        'FB' 
    ];

	public function __construct(array $config) 
	{
        $this->file = __DIR__ . '/../../' . $this->type . $this->queryTranslit . date('Ymdmhs', time()) .'.csv';
        $this->query = $config['query'];
        $this->cities = $config['cities'];
        $this->client = new Client([
            'timeout' => 10.0,
            'cookie' => true,
            'debug' => true,
            'curl'  => [
                CURLOPT_PROXY => '77.34.4.235',
                CURLOPT_PROXYPORT => '8080',
                CURLOPT_PROXYUSERPWD => '',
           ],
        ]);
    }   
    
    public function parse()
    {
        $this->createFile();

        $this->fileDescriptor = fopen($this->file, 'w');
        
        fputcsv($this->fileDescriptor, $this->head, ';'); // Вставляем в файл шапку

        foreach($this->cities as $index => $city) 
        {
            $this->parseCity($city);
        }
        
        fclose($this->fileDescriptor);
    }
    
    private function parseCity(\stdClass $city)
    {
        $page = 1;
        $parse = true;

        while($parse)
        {
            $offers = $this->getOffers($page, $city);
            $page++;

            $this->processOffers($offers);

            break;

            if (count($offers <= 0)) // Пришла пустая страница - окончание пагинации
            {
                $parse = false;
                break;
            }
        }
    }

    // Получение всех объявлений на странице
    private function getOffers(int $page, \stdClass $city): \phpQueryObject
    {
        $url = 'https://www.avito.ru/'. $city->slug .'?p=' . $page . '&q='. $this->query .'';

        echo $url . PHP_EOL;

        $res = $this->client->request('GET', $url, $this->options);
        $page = $res->getBody(true)->getContents();

        $document = \phpQuery::newDocumentHTML($page);
		$offers = $document->find("a.item-description-title-link");    
        return $offers; 
    }

    // Обработка всех объявлений
    private function processOffers(\phpQueryObject $offers)
    {
        foreach($offers as $index => $offer)
        {
            $offerObj = pq($offer);
            dd($offerObj->attr('href'));
            
        }
    }

    private function createFile()
    {
        // Создаем пустой csv файл при каждой новой сессии парсинга
        file_put_contents($this->file, '');

    }
}