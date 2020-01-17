<?php 
    header('Content-Type: text/html; charset=utf-8');

    function get_ini_file($file_name = "../db.ini"){
            $str=file_get_contents($file_name);
            $ini_list = explode("\r\n",$str);
            $ini_items = array();
            foreach($ini_list as $item){
                $one_item = explode("=",$item);
                if(isset($one_item[0])&&isset($one_item[1]))
                    $ini_items[trim($one_item[0])] = trim($one_item[1]);
            }
            return $ini_items;
        }

    // $ini = get_ini_file();//取出ini中的配置信息
    $ini = parse_ini_file("../db.ini");
    
    $server = $ini['servername']; //服务器名称，在 sql server management studio 的登录界面查看
    $uid = $ini['username']; //数据库用户名
    $pwd = $ini['password']; //数据库密码
    $db  = $ini['dbname']; // 数据库名 GS
    $db2 = $ini['dbname2'];//第二个数据库 SD
    $connectionInfo = array("UID"=>$uid, "PWD"=>$pwd, "Database"=>$db,"CharacterSet"=>"utf-8");
    $conn = sqlsrv_connect( $server, $connectionInfo);
    if( $conn == false) {
        echo "连接失败！";
        die( var_dump( sqlsrv_errors(), true));
    };


    //第二个数据库
    $connectionInfo2 = array("UID"=>$uid, "PWD"=>$pwd, "Database"=>$db2,"CharacterSet"=>"utf-8");
    $conn2 = sqlsrv_connect( $server, $connectionInfo2);
    if( $conn2 == false) {
        echo "连接失败！";
        die( var_dump( sqlsrv_errors(), true));
    };



 ?>