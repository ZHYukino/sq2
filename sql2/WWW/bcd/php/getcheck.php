<?php
    //用cookie 获取设备
    require_once ("common.php");
    $path = "../../check.ini";
    $tunnel = isset($_GET["tunnel"]) ? $_GET["tunnel"] :"";
    $name = isset($_GET["name"]) ? $_GET["name"] :"" ;
    $data = parse_ini_file($path,true);
    if($itype == 1 ) {
        echo json_encode($data[$tunnel]) ;
    }
    if($itype==0 && $name !="") {
        if($data[$tunnel][$name] == 1)  $data[$tunnel][$name] = 0;
        else if($data[$tunnel][$name] == 0)  $data[$tunnel][$name] = 1;
        $res = write_ini_file($data, $path, true);
        $codes = array(
            "msg" =>"修改成功",
            "code" => 0,
            "data"=>$data[$tunnel][$name],
        );
        echo json_encode($codes);
    }
    //公路设备
    $devtype = array(
        "23"=>"CMS",
        "25"=>"TCMS",
        "17"=>"CAM",
        "19"=>"ET",
        "20"=>"VD",
        "22"=>"WD",
    );
    if($itype == 2){
        foreach ($devtype as $k => $v) {
            $res[$k] = $data[0][$v];
        }
        $road["data"] = $res;
        $road["count"] = count($res);
        $road["code"] = 1;
        echo json_encode($road);
    }
    elseif($itype == 3 && $id !=""){
        if( $data[0][$devtype[$id]] == 1)   $data[0][$devtype[$id]] = "0";
        else if( $data[0][$devtype[$id]] == 0)   $data[0][$devtype[$id]] = "1";
        echo $data[0][$devtype[$id]];
        $res = write_ini_file($data, $path, true);
        echo $success5;
    }