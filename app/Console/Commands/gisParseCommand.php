<?php
/**
 *
 * PHP version >= 7.0
 *
 * @category Console_Command
 * @package  App\Console\Commands
 */

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;

use App\Entities\GisModel;


/**
 * Class gisParseCommand
 *
 * @category Console_Command
 * @package  App\Console\Commands
 */
class gisParseCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = "gis:parse";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Parse 2gis api data base with provided query";


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $cities = json_decode(file_get_contents(__DIR__ . '/../../../client/src/cities.json'));
        $gisParser = new GisModel();
        $gisParser->parse($cities->cities);
    }
}