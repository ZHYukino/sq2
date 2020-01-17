<?php
    header("Content-Type: text/html; charset=utf-8");
    $opt_ini=parse_ini_file("opt.ini",true);


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
        $cms[$num]["id"] = "10000" . $v["iid"];
        $cms[$num]["name"] =  $v["scname"];
        $num +=1;
    }
    unset($paras);


    $qs = 25;
    $paths = "DevInfo";
    $paras = CurlCalss::curl(5, 'Ftypeid=' . $qs, $paths);
    $paras = json_decode($paras, true);
    $num = 0;
    foreach ($paras["data"] as $k => $v) {           //消除ienable 不为 1的数组
        $tcms[$num]["id"] = "10000" . $v["iid"];
        $tcms[$num]["name"] =  $v["scname"];
        $num += 1;
    }
    unset($paras);
?>