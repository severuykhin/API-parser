<?php

namespace app\entities;

use GuzzleHttp\Client;

class GisModel {

    public $pageSize = 12;

    public $query = 'офисная мебель';

    public $queryTranslit = 'office-mebel';

    public $file;
    
    public $fileDescriptor;

    private $head = [
        'Город', 
        'Название', 
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

    private $options = [
		'verify'  => false,
        'debug'   => false,
        'decode_content' => false,
		'headers' => [
			'Accept'     => 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,image/apng',
			'Upgrade-Insecure-Requests' => '1',
			'accept-encoding' => 'gzip, deflate, br',
			'accept-language' => 'en-US,en;q=0.9,ru;q=0.8',
			'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
		]
	];

	public function __construct() 
	{
        $this->file = __DIR__ . '/../../' . '2gis-' . $this->queryTranslit . date('Ymdmhs', time()) .'.csv';
        $this->client = new Client([
            'curl'  => [
                CURLOPT_PROXY => '178.128.119.37',
                CURLOPT_PROXYPORT => '8080',
                CURLOPT_PROXYUSERPWD => '',
           ]
        ]);
    }   
    
    public function parse(array $cities)
    {
        $this->createFile();

        $this->fileDescriptor = fopen($this->file, 'w');
        
        fputcsv($this->fileDescriptor, $this->head, ';'); // Вставляем в файл шапку

        foreach($cities as $index => $city)
        {   
            // if ($index >= 4) break;

            $this->parseCity($city);
        }

        fclose($this->fileDescriptor);
    }

    private function parseCity($cityData)
    {
        $page = 1;
        $count = 0;
        $content = '';
        $totalCount = 0;

        echo PHP_EOL;
        echo 'Start parsing city: ' . $cityData->name;
        echo PHP_EOL;

        do
        {
            // $url = 'https://catalog.api.2gis.ru/3.0/items?viewpoint1=' . $cityData->vp1 . '&viewpoint2=' . $cityData->vp2 . '&type=street%2Cadm_div.city%2Ccrossroad%2Cadm_div.settlement%2Cstation%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.region%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div.district_area%2Cbranch%2Cparking%2Cgate%2Croute&page=' . $page . '&page_size=' . $this->pageSize . '&q=' . $this->query .'&locale=ru_RU&fields=request_type%2Citems.adm_div%2Citems.context%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.segment_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.timezone_offset%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&stat%5Bsid%5D=e2e64ba0-d906-4a6f-b6cb-02122ba33db5&stat%5Buser%5D=fab1ba76-9aa3-4266-876f-a668c41edaa3&key=ruoedw9225&r=132913387';
            // $url = 'https://catalog.api.2gis.ru/3.0/items?viewpoint1=' . $cityData->vp1 . '&viewpoint2=' . $cityData->vp2 . '&type=street%2Cadm_div.city%2Ccrossroad%2Cadm_div.settlement%2Cstation%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.region%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div.district_area%2Cbranch%2Cparking%2Cgate%2Croute&page=' . $page . '&page_size=' . $this->pageSize . '&q=' . $this->query .'&locale=ru_RU&fields=request_type%2Citems.adm_div%2Citems.context%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.segment_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.timezone_offset%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&stat%5Bsid%5D=458a6e12-409b-480e-87ef-d5356050a371&stat%5Buser%5D=fab1ba76-9aa3-4266-876f-a668c41edaa3&key=ruoedw9225&r=374544849';
            // $url = 'https://catalog.api.2gis.ru/3.0/items?viewpoint1=' . $cityData->vp1 . '&viewpoint2=' . $cityData->vp2 . '&type=street%2Cadm_div.city%2Ccrossroad%2Cadm_div.settlement%2Cstation%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.region%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div.district_area%2Cbranch%2Cparking%2Cgate%2Croute&page=' . $page . '&page_size=' . $this->pageSize . '&q=' . $this->query .'&locale=ru_RU&fields=request_type%2Citems.adm_div%2Citems.context%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.segment_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.timezone_offset%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&stat%5Bsid%5D=5c7830f9-49d2-4ff5-a85e-a617d3778c66&stat%5Buser%5D=f5eb204d-cd82-4adc-a428-10d8f713d7f8&key=ruoedw9225&r=3890378824';
           $url = 'https://catalog.api.2gis.ru/3.0/items?viewpoint1=49.46800199316406%2C58.75573742896227&viewpoint2=49.878616006835934%2C58.44342132493938&type=street%2Cadm_div.city%2Ccrossroad%2Cadm_div.settlement%2Cstation%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.region%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div.district_area%2Cbranch%2Cparking%2Cgate%2Croute&page='.$page.'&page_size=12&q=%D0%90%D0%BF%D1%82%D0%B5%D0%BA%D0%B8&locale=ru_RU&fields=request_type%2Citems.adm_div%2Citems.context%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.segment_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.timezone_offset%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&stat%5Bsid%5D=5c7830f9-49d2-4ff5-a85e-a617d3778c66&stat%5Buser%5D=f5eb204d-cd82-4adc-a428-10d8f713d7f8&key=ruoedw9225&r=3890378824';
            $content = file_get_contents($url);

            // $res = $this->client->request('GET', $url, $this->options);
            // $page = $res->getBody(true)->getContents();

            $data = json_decode($content);

            if (!isset($data->result)) {
                echo PHP_EOL;
                echo 'No data in city: ' . $cityData->name . PHP_EOL;
                var_dump($cityData);
                echo $this->query . PHP_EOL;
                echo PHP_EOL;
                break;
            }

            $totalCount = $data->result->total; // Сколько всего позиций нашлось по запросу
            $responseItemsAmount = count($data->result->items); // Сколько позиций пришло в запросе

            if ($page === 1) {
                echo 'TOTAL COUNT ITEMS - ' . $totalCount . PHP_EOL;
            }

            $this->parseAndSaveItems($data->result->items, $cityData->name);

            $page++;
            $count += $responseItemsAmount;

            echo 'Items recieved in response - ' . $responseItemsAmount . PHP_EOL;
            echo 'Current count - ' . $count;
            echo PHP_EOL;

            sleep(5); // Request timeout

        } while ($count < $totalCount);


        echo PHP_EOL;
        echo 'END parsing city: ' . $cityData->name;
        echo PHP_EOL;
    }

    private function createFile()
    {
        // Создаем пустой csv файл при каждой новой сессии парсинга
        file_put_contents($this->file, '');

    }

    // Обходит массив полученных организаций, получает информацию и сохраняет в файл
    private function parseAndSaveItems(array $items, string $cityName)
    {
        foreach($items as $item)
        {

            $meta = [$cityName, $item->name];

            // Контакты получаем циклом по массиву contact_groups
            // Так как там может быть несколько массивов с контактами и разные индексы полей
            $phones = [];
            $phones = array_fill(0, 4, null);
            $phCount = 0;            
            
            $emails = [];
            $emails = array_fill(0, 4, null);
            $eCount = 0;

            $sites = [];
            $sites = array_fill(0, 4, null);
            $sCount = 0;

            $vk = '';
            $ok = '';
            $inst = '';
            $fb = '';

            $fileds = [];

            if (isset($item->contact_groups)) 
            {
                foreach ($item->contact_groups as $group)
                {
                    foreach($group->contacts as $contact)
                    {
                        switch($contact->type)
                        {
                            case 'phone':
                                if ($phCount < 4) {
                                    $phones[$phCount] = $contact->value;
                                    $phCount++;
                                }
                                break;
                            case 'email':
                                if ($eCount < 4) {
                                    $emails[$eCount] = $contact->value;
                                    $eCount++;
                                }
                                break;
                            case 'website':
                                if ($sCount < 4) {
                                    $sites[$sCount] = $contact->url;
                                    $sCount++;
                                }
                                break;
                            case 'instagram':
                                $inst = $contact->value;
                                break;
                            case 'vkontakte':
                                $vk = $contact->value;
                                break;
                            case 'facebook':
                                $fb = $contact->value;
                                break;
                            case 'odnoklassniki':
                                $ok = $contact->value;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            $fields = array_merge($meta, $phones, $emails, $sites);
            $fields[] = $vk;
            $fields[] = $ok;
            $fields[] = $inst;
            $fields[] = $fb;

            fputcsv($this->fileDescriptor, $fields, ';');
        }
    } 
}