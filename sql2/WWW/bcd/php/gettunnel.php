<?php

    $itype = isset($_GET['itype'])?$_GET['itype']:"";
    //在配置文件 opt.ini 中获取隧道的信息
    require_once ("CurlCalss.php");
    $path = "TunnelInfo";
    $result = CurlCalss::curl(6,'',$path);
    $data = json_decode($result,true);
    $res["results"] = $data["num"];

    $playxy = parse_ini_file("../../playxy.ini",true);
    foreach ($data["data"] as $k =>$v){
         $res["rows"][$k]["x"] = $playxy["tunnel".$v["iid"]]["x"];
         $res["rows"][$k]["y"] = $playxy["tunnel".$v["iid"]]["y"];
         $res["rows"][$k]["tuvalue"] = $data["data"][$k]["sname"];
         $res["rows"][$k]["id"] = $data["data"][$k]["iid"];
    }
    if($itype == 1){
        echo json_encode($res);
    }


?>