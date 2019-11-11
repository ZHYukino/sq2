<?php

    $itype = isset($_GET['itype'])?$_GET['itype']:"";
    //在配置文件 opt.ini 中获取隧道的信息
    require_once ("CurlCalss.php");
    $path = "TunnelInfo";
    $result = CurlCalss::curl(6,'',$path);
    $data = json_decode($result,true);
    $res["results"] = $data["num"];
    foreach ($data["data"] as $k =>$v){
         $res["rows"][$k]["tuvalue"] = $data["data"][$k]["sname"];
         $res["rows"][$k]["id"] = $data["data"][$k]["iid"];
    }
    if($itype == 1){
        echo json_encode($res);
    }


?>