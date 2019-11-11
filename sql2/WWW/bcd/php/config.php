<?php
    header("Content-Type: text/html; charset=utf-8");
    $opt_ini=parse_ini_file("opt.ini",true);

    function get_ini_file($file_name = "bcd/db.ini"){
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
    $ini = get_ini_file();//取出ini中的配置信息

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


    //普通查询
    function get_sql($query,$params,$conn)     //$conn2 或者 $conn  直接调用
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
                    if($row[$value]===null) $row[$value]="";
                    $result['rows'][$num][$key] = $row[$value];
                }
                $num = $num + 1;
            }
            $result['results'] = $num;
           return $result["rows"];
        }
    }

    //获得cms 的数量和id

    require_once ("CurlCalss.php");
    $qs = 23;
    $paths = "DevInfo";
    $paras = CurlCalss::curl(5, 'Ftypeid=' . $qs, $paths);
    $paras = json_decode($paras, true);
    $num = 0;
    foreach ($paras["data"] as $k => $v) {           //消除ienable 不为 1的数组
        if ($v["ienable"] != 1) {
            unset($paras["data"][$k]);
        }else{
            $cms[$num]["id"] = "10000" . $v["iid"];
            $cms[$num]["name"] =  $v["scname"];
            $num +=1;
        }
    }
    unset($paras);


    $qs = 25;
    $paths = "DevInfo";
    $paras = CurlCalss::curl(5, 'Ftypeid=' . $qs, $paths);
    $paras = json_decode($paras, true);
    $num = 0;
    foreach ($paras["data"] as $k => $v) {           //消除ienable 不为 1的数组
        if ($v["ienable"] != 1) {
            unset($paras["data"][$k]);
        }
        elseif($v["itunnelid"] <1 || $v["itunnelid"] >3 ){
            unset($paras["data"][$k]);
        }else{
            $tcms[$num]["id"] = "10000" . $v["iid"];
            $tcms[$num]["name"] =  $v["scname"];
            $num += 1;
        }
    }
    unset($paras);
?>