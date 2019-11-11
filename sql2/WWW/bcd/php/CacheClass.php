<?php
	/**
	 * 
	 */
	class CacheClass	
	{
		//文件名
		public $filename;
		//创建或修改时间
		public $filetime  ;
		//过期时间
		public $ex_time = 3600;

		public function __construct()
		{
			# code...
		}

		public function create_made($filename,$data){
			if(file_exists($filename)){
				unlink($filename);
			}
			$file = fopen($filename, 'w');
			fwrite($file,$data);
		}
		public function usecache($filename,$exprie_time = 0){
			if(!$exprie_time){
				$exprie_time = $this->ex_time;
			}
			if(!file_exists($filename) || filemtime($filename) + $exprie_time <time()){
				return false;
			}else{
				return file_get_contents($filename);
			}
		}

	}


	// $p1 = new cache;
	// $result = $p1->usecache("../cache.php",3600*24);
	// var_dump($result);
	//$return = $p1 ->create_made("../cache.php","123");