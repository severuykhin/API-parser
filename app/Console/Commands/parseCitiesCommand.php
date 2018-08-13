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
      $cities = ['44.68187,43.02055','40.406635,56.129057','44.51693,48.707073'];
      $phrase = 'мебель';
      $data = SearchModel::parse($cities, $phrase);
		  $export = new ExportModel($data);
		  $file = $export->build('export-cities-' . time() .'.xls');
        
    }
}