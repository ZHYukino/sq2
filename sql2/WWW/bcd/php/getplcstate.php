<?php

//plc 状态
    $itype = isset($_GET['itype'])?$_GET['itype']:"";
    if($itype == 1){
        require_once ("CurlCalss.php");
        $path = "PLCState";
        $plc = CurlCalss::curl(6,'',$path);
        $plc = json_decode($plc,true);
        $result["result"] = $plc["num"];
        foreach ($plc["data"] as $k=>$v){
            $result["rows"][$k]["runmode"] = $v["irunmode"];
            $result["rows"][$k]["state"] = $v["istate"];
            $result["rows"][$k]["dt"] = $v["iindex"];
            $result["rows"][$k]["id"] = $v["iid"];
        }
       echo json_encode($result);
    }