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
        $cities = ['91.442387,53.721152','52.297113,54.901383','103.88824,52.544358','44.03873,40.15541','40.516939,64.539393','48.033574,46.347869','47.782818,52.022331'];
        $phrase = 'кухни';
        echo "Start parsing!";
        $exitCode = SearchModel::parse($cities, $phrase);
        if ($exitCode === 0) {
            echo "Job is done!";
        }
        
    }
}