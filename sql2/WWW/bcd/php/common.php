<?php
	include_once('conn.php');//数据库
    // 制定允许其他域名访问
    header("Access-Control-Allow-Origin:*");
    // 响应类型
    header('Access-Control-Allow-Methods:POST');
    // 响应头设置
    header('Access-Control-Allow-Headers:x-requested-with, content-type');

    $error4 =  '{"code":-1,"msg":"数据库添加失败","count":0,"data":[]}';
    $error12 = '{"code":-1,"msg":"日期格式错误","count":0,"data":[]}';
    $error10 = '{"code":-1,"msg":"账号密码不可为空","count":0,"data":[]}';
    $error2 = '{"code":-1,"msg":"查询数据的数目为零","count":0,"data":[]}';
    $error3 = '{"code":-1,"msg":"参数错误","count":0,"data":[]}';
    // $error1 = '{"code":-1,"msg":"请求失败，请先登录","count":0,"data":[]}';

	$error12 = '{"code":-1,"msg":"日期格式错误","count":0,"data":[]}';
	$error1 = '{"code":-1,"msg":"请求失败，请先登录","count":0,"data":[]}';
    $error7 = '{"code":-1,"msg":"请求失败，需要ajax请求","count":0,"data":[]}';
    $error6 = '{"code":-1,"msg":"密码错误","count":0,"data":[]}';
	$success1 = '{"code":0,"msg":"添加成功","count":0,"data":[]}';
	$success2 = '{"code":0,"msg":"报废成功","count":0,"data":[]}';
	$success3 = '{"code":0,"msg":"删除成功","count":0,"data":[]}';
	$success4 = '{"code":0,"msg":"审核成功","count":0,"data":[]}';
	$success5 = '{"code":0,"msg":"修改成功","count":0,"data":[]}';
	$success6 = '{"code":0,"msg":"生成成功","count":0,"data":[]}';
	$success7 = '{"code":0,"msg":"批准成功","count":0,"data":[]}';
    $success9 = '{"code":0,"msg":"上传成功","count":0,"data":[]}';
    $success8 = '{"code":0,"msg":"日志添加成功","count":0,"data":[]}';
    //自动加载
//    function __autoload($className){
//        $filename = "./". $className .".php";
//      if(file_exists($filename)) {
//          include_once($filename);
//      }
//    }
    function loadprint( $class ) {
        $file = $class . '.php';
        if (is_file($file)) {
             require_once($file);
         }
    }
    spl_autoload_register( 'loadprint');


    function checkint($id){
            return filter_var($id,FILTER_VALIDATE_INT,array('options'=>array('min_range'=>1)));
        }
        //过滤html标签
        function checkstr($var){
            return filter_var($var,FILTER_SANITIZE_STRING);
        }

	function checkday($date){
		if(empty($date)) return true;
		$formats = array('Y-m-d','Y/m/d');
		$unixTime = strtotime($date);
		if(!$unixTime) return false;
		foreach($formats as $format){
			if(date($format,$unixTime)==$date) return true;
		}
		return false;
	}

	function checkurl($url,$flag){
		if($flag) return true;
		if(empty($url)) return false;
		return filter_var($url,FILTER_VALIDATE_URL);
	}

	function checkbit($bit){
		if($bit==1) return 1;
		return 0;
	}


//查询
	function getrows($query,$params,$conn)     //$conn2 或者 $conn  直接调用
    {
        $result = array("results" => "", "rows" => "");
        $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
        $rowsnum = sqlsrv_num_rows($sql);//查询的数量
        $num = 0;
        if ($rowsnum == 0) {
            $result = array("results" => 0);
            echo  json_encode($result, JSON_UNESCAPED_UNICODE);
            return false;
        }
        if ($sql == true) {
            while ($row = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                foreach ($params as $key => $value) {
                    if( $row[$value]=="0.00") $row[$value]="0";       //表里有些数据格式为0.00 取出的格式不对
                   if($row[$value]===null) $row[$value]="";
                    $result['rows'][$num][$key] = $row[$value];
                }
                $num = $num + 1;
            }
            $result['results'] = $num;
            //var_dump($result);
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }
    //   用来查询时间
    function getrow_use($query,$params,$conn)     //$conn2 或者 $conn  直接调用
    {
        $result = array("results" => "", "rows" => "");
        $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
        $rowsnum = sqlsrv_num_rows($sql);//查询的数量
        $num = 0;
        if ($rowsnum == 0) {
            $result = array("results" => 0,"rows"=>[]);
            echo  json_encode($result);
            return false;
        }
        if ($sql == true) {
            while ($row = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                foreach ($params as $key => $value) {
                    if($row[$value]===null) $row[$value]="";
                    if($row[$value]=="0.0") $row[$value]="0";
                    $result['rows'][$num][$key] = $row[$value];
                    $result['rows'][$num]["formatSpace"] = "";
                }
                $num = $num + 1;       //执行的次数
            }
            $result['total'] = $num;
            echo json_encode($result);
        }
    }

    //返回查询数据
        function re_rows($query,$params,$conn)     //$conn2 或者 $conn  直接调用
        {
            $result = array("results" => "", "rows" => "");
            $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
            $rowsnum = sqlsrv_num_rows($sql);//查询的数量
            $num = 0;
            if ($rowsnum == 0) {
                $result = array("results" => 0);
               return  $result;
            }
            if ($sql == true) {
                while ($row = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                    foreach ($params as $key => $value) {
                        if($row[$value]===null) $row[$value]="";
                        if($row[$value]=="0.0") $row[$value]="0";
                        $result['rows'][$num][$key] = $row[$value];
                    }
                    $num = $num + 1;
                }
                $result['results'] = $num;
               return $result;
            }
        }

        //result  风格 
        function re_codes($query,$params,$conn)     //$conn2 或者 $conn  直接调用
        {
            $result = array("msg"=>"","code" => "", "data" => "","count"=>"");
            $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
            $rowsnum = sqlsrv_num_rows($sql);//查询的数量
            $num = 0;
            if ($rowsnum == 0) {
                $result = array("count" => 0,"data"=>"","code"=>-2,"msg"=>"数据为空");
               return  $result;
            }
            if ($sql == true) {
                while ($row = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                    foreach ($params as $key => $value) {
                        if($row[$value]===null) $row[$value]="";
                        // if($row[$value]=="0.0") $row[$value]="0";
                        $result['data'][$num][$key] = $row[$value];
                    }
                    $num = $num + 1;
                }
                $result["msg"] = "导出成功";
                $result['count'] = $num;
                $result['code'] = 0;
               return $result;
            }
        } 


            function get_ini_one_file($file_name = "../../opt.ini")//获取配置文件
            {
                $str = file_get_contents($file_name);
                $ini_list = explode("\r\n", $str);
                $ini_items = array();
                foreach ($ini_list as $item) {
                    $one_item = explode("=", $item);
                    if (isset($one_item[0]) && isset($one_item[1]))
                        $ini_items[trim($one_item[0])] = trim($one_item[1]);
                }
                return $ini_items;
            }

            //定义一个写入 ini文件
        function write_ini_file($assoc_arr, $path, $has_sections = FALSE) {
            $content = "";
            if ($has_sections) {
                foreach ($assoc_arr as $key => $elem) {
                    $content .= "\r[" . $key . "]\r\n";
                    foreach ($elem as $key2 => $elem2) {
                        if (is_array($elem2)) {
                            for ($i = 0; $i < count($elem2); $i++) {
                                $content .= $key2 . "[]=" . $elem2[$i] . "\r\n";
                            }
                        } else if ($elem2 == "")
                            $content .= $key2 . "=\r\n";
                        else
                            $content .= $key2 . "=" . $elem2 . "\r\n";
                    }
                }
            } else {
                foreach ($assoc_arr as $key2 => $elem) {
                    if (is_array($elem)) {
                        for ($i = 0; $i < count($elem); $i++) {
                            $content .= $key2 . "[] = \"" . $elem[$i] . "\"\n";
                        }
                    } else if ($elem == "")
                        $content .= $key2 . " = \n";
                    else
                        $content .= $key2 . " = \"" . $elem . "\"\n";
                }
            }

            if (!$handle = fopen($path, 'w')) {   //写入方式打开
                $error = '{"code":-1,"msg":"修改失败，文件无法打开","count":0,"data":[]}';
                echo $error;
                return false;
            }
            if (!fwrite($handle, $content)) {
                $error = '{"code":-1,"msg":"修改失败，文件无法写入","count":0,"data":[]}';
                echo $error;
                return false;
            }
            fclose($handle);
            return true;
        }
        //设置获取id
        $id= isset($_GET["id"])?$_GET["id"]:"";
        $id = str_replace("10000",'',$id);
        $itype=isset($_GET['itype'])?$_GET['itype']:"";



   ?>
