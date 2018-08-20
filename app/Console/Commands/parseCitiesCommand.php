<?php
/**
 *
 * PHP version >= 7.0
 *
 * @category Console_Command
 * @package  App\Console\Commands
 */

namespace App\Console\Commands;

use App\Entities\SearchModel;
use App\Entities\ExportModel;
use Exception;
use Illuminate\Console\Command;



/**
 * Class deletePostsCommand
 *
 * @category Console_Command
 * @package  App\Console\Commands
 */
class ParseCitiesCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = "parse:cities";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Parse given cities";


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $cities = ['84.947649,56.48464','37.617348,54.193122','65.534328,57.153033','107.584574,51.834464','48.402557,54.316855','131.95178,43.797273','55.958727,54.735147','135.071917,48.480223','37.43039,55.88874','37.906929,59.127415','113.499432,52.033973','40.215958,47.708485','38.444849,55.784445','46.126783,51.485489','142.738023,46.959155','129.732663,62.028103','39.893787,57.626569'];
        $phrase = 'шкаф-купе';

        echo "Start parsing!";

        $fileName = 'export-cities-' . time() .'.xls';
        $data   = SearchModel::parse($cities, $phrase);
        $export = new ExportModel($data);
        $file   = $export->build($fileName);

        echo 'City parsed and saved as --' . $file . '--' . PHP_EOL;
        
    }
}