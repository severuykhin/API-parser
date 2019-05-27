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
        // BIG cities
        // $cities = ['91.442387,53.721152','52.297113,54.901383','103.88824,52.544358','41.129644,44.997655','40.516939,64.539393','48.033574,46.347869','47.782818,52.022331','37.938199,55.796339','83.769948,53.355084','36.587223,50.59566','56.804015,59.407922','85.21382,52.539297','127.527173,50.290658','101.63408,56.151362','34.363731,53.243325','31.269915,58.52281','131.885485,43.115536','44.68187,43.02055','40.406635,56.129057','44.51693,48.707073'];
        // $cities = ['42.198423,47.516545','44.751867,48.786293','39.891523,59.220496','39.200404,51.66082','45.694909,43.317776','43.461625,56.238377','60.597465,56.838011','59.671841,55.172871','40.973921,57.000348','53.204843,56.852593','104.28066,52.286387','47.895638,56.632729','49.106324,55.798551','20.507307,54.70739','36.261215,54.513845','61.918708,56.414927','86.087314,55.354968','36.467378,45.356219','49.667978,58.603581','38.752917,55.103152'];
        // $cities = ['137.007948,50.549923','61.61797,55.116732','37.854629,55.922212','40.926858,57.767961','37.330192,55.831099','38.975313,45.03547','92.852572,56.010563','65.344316,55.441606','36.192647,51.730361','39.599346,52.608782','37.898116,55.676494','58.979204,53.407184','40.098548,44.608865','47.504682,42.98306','60.107731,55.045635','37.622504,55.753215','33.074981,68.970682','37.73633,55.910503','52.395874,55.743583','43.607072,43.485259'];
        // $cities = ['132.892811,42.824037','76.569628,60.939716','51.809112,55.63407','44.005986,56.326887','59.972211,57.907605','87.136044,53.757547','37.768974,44.723912','82.92043,55.030199','40.093213,47.422552','88.201176,69.349033','73.368212,54.989342','55.096955,51.768199','58.475196,51.229362','36.063837,52.970371','45.018316,53.195063','56.229398,58.010374','34.354325,61.787374','158.643566,53.024075','37.544737,55.431177','86.750055,53.884487'];
        // $cities = ['28.334625,57.816915','43.07084,44.03929','39.718732,47.222543','81.2078,51.501207','38.858406,58.048454','39.734928,54.629148','55.924672,53.361651','50.101783,53.195538','30.311405,59.931773','45.183642,54.187211','46.034158,51.533103','33.525495,44.616841','39.818175,64.562501','34.100318,44.948237','32.045134,54.78264','39.723062,43.585525','41.969083,45.044521','37.833447,51.298075','55.930825,53.630403','73.396221,61.254035'];
        // $cities = ['48.474485,53.155782','50.836461,61.668831','38.9173,47.220983','41.452274,52.721219','35.911896,56.859611','49.419207,53.508816','84.947649,56.48464','37.617348,54.193122','65.534328,57.153033','107.584574,51.834464','48.402557,54.316855','131.95178,43.797273','55.958727,54.735147','135.071917,48.480223','37.43039,55.88874','47.250153,56.146247','61.40259,55.160026','37.906929,59.127415','113.499432,52.033973','40.215958,47.708485'];
        // $cities = ['38.444849,55.784445','46.126783,51.485489','142.738023,46.959155','129.732663,62.028103','39.893787,57.626569'];
        $cities = ['26.017609,53.132368','29.224702,53.145889','28.511755,54.224069','23.685681,52.093555','30.204791,55.183672','31.014272,52.42416','23.829529,53.677834','27.561481,53.902496','30.330654,53.894548','38.444849,55.784445','46.126783,51.485489','142.738023,46.959155','129.732663,62.028103','39.893787,57.626569'];
        $phrase = 'пиломатериалы';

        // SMALL cities
        // $cities = ['38.151163,44.866256','53.074533,54.859808','39.423581,47.112442','61.702672,57.853038','46.572195,54.839816','38.727621,56.397774','38.688095,50.629961','37.066034,54.502429','52.297113,54.901383','136.910607,50.226797','37.31617,44.894965','86.018216,56.083175','33.407115,67.568041','39.736707,44.468327','43.815687,55.386666','133.269726,44.162084','132.18563,43.354804','61.894651,57.338402','61.458114,57.005274','46.164413,48.284884','90.495231,56.269496','57.278469,54.990628','43.534613,43.681939','43.602005,56.504556','43.146469,51.554601','19.892177,54.644072','78.341923,55.350412','39.744469,47.138333','40.802388,48.177644','54.111279,54.103441'];
        // $cities = ['86.303692,54.422114','128.473917,50.921287','58.410023,53.967621','39.87114,44.761141','83.107135,54.758288','86.274514,55.669361','44.533792,43.19376','132.921754,48.794668','55.530707,55.417531','127.527173,50.29064','43.440021,45.095649','62.046295,56.776502','38.131687,53.770694','132.347991,43.111199','44.064575,56.356517','116.523485,50.387629','42.074977,51.367725','33.914025,58.388219','52.789489,54.536413','52.432606,53.6523','44.165024,44.781528','52.262438,52.788116','47.115927,42.821749','38.099914,50.211194','30.521969,56.342316','46.305485,60.760356','60.23195,56.048721','60.579194,56.966958','60.555999,58.046644','37.708644,55.557174','41.918149,57.217138','48.372041,55.862267','32.331544,59.916744','47.38729,52.045978','64.061091,67.49741','38.673353,55.322978','53.987392,57.051806','30.654084,60.021317','28.749404,60.710232','42.167961,55.320683'];
        // $cities = ['34.560336,57.589051','42.158862,56.247021','34.298037,55.205944','51.074919,56.222896','34.996845,55.553299','58.443719,51.465019','30.124473,59.568456','38.076809,44.561141','43.473896,44.148599','52.674235,58.14081','85.960373,51.958182','43.472351,56.644822','39.136426,44.634246','39.95533,52.496186','37.534748,51.283644','46.103535,43.35188','39.940274,48.058442','40.695227,45.360342','40.657902,55.619818','48.193914,42.115189','135.566179,44.554018','48.288776,42.057669','37.849616,55.630939','49.621984,54.217715','37.520348,56.343942','56.403986,58.468063','37.514104,55.933564','37.768004,55.437102','37.80285,48.015877','38.337222,53.96787','37.173176,56.744002','54.873463,55.48529','39.035833,55.38305',];
        // $cities = ['38.276451,46.711524','52.05446,55.75667','38.503653,52.62419','158.388355,53.183053','61.317223,54.752147','42.85891,44.044526','38.117673,53.137598','35.351743,52.337971','49.494657,53.401714','38.119802,55.597475','43.387164,56.640441','52.006391,55.298984','45.169071,53.19611','84.931488,53.706332','94.589006,56.113246','48.500617,55.846906','43.884148,44.403288','102.049065,53.92072','37.924338,55.971718','47.871078,42.565141','41.708644,45.368536','63.057664,57.683819','83.306382,54.642582','36.860284,55.914287','69.479639,56.11055','56.04395,53.454621','28.698074,48.031642','40.268923,48.320515','81.354558,53.791486','45.407367,50.083698','47.491764,55.506943','32.412823,67.151252','95.705055,56.205045','44.909404,43.305594','41.391368,54.937288','47.635674,42.890833','59.483959,58.70511','38.15154,54.834589','46.866878,43.204637','46.711685,43.84738'];
        // $cities = ['37.355678,56.873338','28.611297,59.374028','50.634394,53.221004','42.168923,57.442544','38.872052,56.161709','32.008707,59.449695','49.668014,58.603591','50.043932,58.556581','86.636679,54.006025','42.716796,43.905225','36.728716,56.331693','32.233852,52.753143','41.31122,56.363628','74.482761,62.264069','38.752917,55.103152','30.597607,59.749012','39.376042,56.293901','36.779309,56.713217','34.272758,62.20475','61.61797,55.116732','39.448033,45.462742','61.393049,54.892493','142.78257,46.63498','47.159855,61.315335','37.863199,55.65984','46.633217,61.25297','41.50575,52.59292','37.330192,55.831099','30.087804,59.73306','37.042489,55.600506','118.033256,50.09372','55.736376,58.078357','60.193493,59.763761','57.770692,56.617744','40.05799,47.894709','29.773627,59.988694','40.575994,45.434686','37.986196,44.934986','44.206751,56.15067','46.601165,53.119335'];
        // $cities = ['78.311111,55.445972','42.512483,55.429716','55.796976,52.756523','56.944206,57.42881','40.591364,44.887641','78.544826,50.7549','59.764682,58.282566','94.437757,51.719086','60.538949,55.707877','40.724459,44.635387','75.180725,61.253701','52.442667,54.599028','86.162243,54.663609','59.79863,58.635513','133.418594,45.477955','92.503657,58.221728','37.608041,52.426549','38.957742,55.707786','39.497099,50.987298','37.474821,56.012269','29.776466,59.91074','57.811655,58.100413','37.908986,55.579297','34.447678,53.864607','72.155352,61.620663','150.808541,59.568164','40.098548,44.608865','44.590188,43.509645','36.462555,55.011897','87.742263,56.206952','46.740009,51.713333','76.102612,61.03289','88.070372,53.686596','55.92831,52.958964','60.108081,55.046414','40.394849,48.92173','43.13834,44.208799','91.687268,53.710564','113.978692,62.541028','43.239723,50.070847'];
        // $cities = ['42.028803,45.129667','40.498011,52.893913','36.017358,55.506714','52.213839,56.442802','44.653878,43.735413','32.937116,67.938931','41.811627,53.443611','74.494448,63.795285','42.052411,55.579169','36.575006,53.278939','87.805747,53.712509','72.531341,65.535924','90.417688,56.012345','44.764641,43.225727','36.734493,55.38616','43.862022,43.556734','41.936061,44.638287','124.720315,56.659948','54.248236,56.088408','72.616331,61.088212','99.026387,54.901233','83.93107,53.412021','39.216277,51.309213','40.820821,64.413683','31.933222,52.536717','41.047493,45.103812','49.947767,53.099469','38.290896,54.010993','58.301767,51.196417','60.095604,57.247235','47.479125,56.109551','39.934696,47.754315','76.680974,66.083963','38.441831,55.854522','75.450938,63.201801','50.804958,54.428117','65.433654,62.145759','36.586531,55.11201','37.263986,55.678859','60.707599,55.763184'];
        // $cities = ['53.46557,54.481448','38.981592,55.805837','87.337069,53.598748','39.082365,50.860139','51.348851,53.376555','43.06457,55.964629','38.651318,55.779393','133.123246,43.119813','59.943249,56.905839','38.85298,56.739613','29.908617,59.884013','45.389931,52.314023','57.223977,65.148602','60.177072,56.446499','38.177645,46.043502','37.218316,54.870621','44.010083,43.758962','48.795588,52.014871','30.416947,59.722463','37.847047,56.011182','72.836526,60.758589','43.07084,44.03929','77.458439,62.134265','38.22584,55.567326','41.874302,52.653842','59.908718,56.800079','61.391639,57.373772','37.855141,55.760515','34.329065,56.262877','32.85678,53.947309','39.57652,50.192899','39.414526,57.185866','43.785657,52.257455','81.2078,51.501207','44.94911,54.058268','66.614399,66.529844','41.541665,46.475332','53.803678,56.461621','43.344844,54.922788','59.028881,55.040492'];
        // $cities = ['33.237917,55.106304','91.412195,53.100762','102.180139,54.11081','42.856628,45.328573','128.134147,51.375889','33.416215,69.076153','84.880913,56.603185','38.135999,56.315291','44.202735,52.455683','60.573588,59.605391','37.416763,54.913536','30.211879,60.141613','29.956066,60.092411','58.666429,52.72051','39.549328,53.82359','78.64594,52.999375','38.12822,45.260325','28.088136,59.11779','50.183674,58.731886','60.732536,56.085209','21.888647,55.081029','40.099977,59.460968','56.771029,59.648333','36.977631,56.185102','93.335434,56.120211','29.09221,59.90422','132.817559,44.597641','31.355452,57.990715','77.604002,60.732862','38.07839,54.88688','62.035542,56.905431','65.272595,58.041871','98.002982,55.940502','40.535471,56.85436','37.370194,45.27841','38.935069,45.615877','33.542096,59.644209','40.125929,45.85468','68.253762,58.201698','34.96014,57.041338'];
        // $cities = ['30.877719,59.540664','37.305561,55.484842','58.446423,54.817842','39.073553,44.09564','53.695008,54.599988','100.578038,54.55712','39.530759,57.8688','124.729236,55.154656','38.319372,57.526592','35.00511,57.876779','38.160299,53.97844','64.803944,60.129632','45.540614,43.127617','41.995844,50.794522','57.55701,65.994144','103.638769,52.756648','41.971042,44.083895','102.741523,57.943039','105.775699,56.792838','39.691216,45.21365','53.684022,63.562626','59.378631,54.319176','43.649292,49.765861','38.052339,55.957938','69.018902,61.00318','46.590044,43.246265','142.041622,47.040905','54.147759,56.778061','49.710217,52.981709','60.37012,54.977785','103.090096,53.136911','42.04677,44.226863','91.306005,53.827013','56.076361,56.51601','21.819503,54.630706','37.466997,55.149851','50.643575,55.372334','57.819318,58.297548','63.629747,56.087042','45.900991,43.1488','89.18016,55.53909','39.544566,55.577577','36.887916,50.400498','104.097395,52.210209','46.417846,55.497934','41.385556,56.852037','37.563287,55.508738','37.517626,54.002146','37.991622,55.920875','44.269759,46.307743','63.331964,61.314917','61.268229,54.442455','84.933869,55.713557','66.312206,56.654689','32.689675,55.068705','53.021901,51.165499','60.115367,66.03682','-16.213962,15.604341','41.106189,57.252601','38.009049,55.746436','37.538979,55.37501','30.365338,53.903562'];
        echo "Start parsing!";

        $fileName = 'pilomat' . time() .'.xls';
        $data   = SearchModel::parse($cities, $phrase);
        $export = new ExportModel($data);
        $file   = $export->build($fileName);

        echo 'City parsed and saved as --' . $file . '--' . PHP_EOL;

    }
}
