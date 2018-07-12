<?php

namespace app\entities;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ExportModel {

	public $data;

	public function __construct(array $data) 
	{
		$this->data = $data;
		$this->columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
	}

	public function build(string $filename): string 
	{
		$spreadsheet = new Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();

		foreach($this->data as $key => $items) {
			$index = $key + 1;
			$count = 0;
			foreach($items as $i => $value) {
				$sheet->setCellValue($this->columnNames[$count] . $index, $value);
				$count++;	
			}	
		}

		$writer = new Xlsx($spreadsheet);
		$writer->save($filename);

		return $filename;
	}
}