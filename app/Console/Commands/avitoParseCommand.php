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
use App\Entities\AvitoModel;


/**
 * Class gisParseCommand
 *
 * @category Console_Command
 * @package  App\Console\Commands
 */
class avitoParseCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = "avito:parse {query}";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Parse avito";


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        exec("powershell -c (New-Object Media.SoundPlayer 'c:\sss.wav').PlaySync();");
        die;
        $cities = json_decode(file_get_contents(__DIR__ . '/../../../client/src/avito.json'));
        $query = $this->argument('query');
        $avitoParser = new avitoModel([
            'cities' => $cities->cities,
            'query' => $query
        ]);
        $avitoParser->parse();
    }
}