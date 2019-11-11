<?php

    $itype = isset($_GET['itype'])?$_GET['itype']:"";
    if($itype == 1){
        require_once ("CurlCalss.php");
        $path = "PLCInfo";
        $plc = CurlCalss::curl(6,'',$path);
        $plc = json_decode($plc,true);
        $result["results"] = $plc["num"];
        foreach ($plc["data"] as $k=>$v){
            $result["rows"][$k]["runmode"] = $v["irunmode"];
            $result["rows"][$k]["state"] = $v["istate"];
            $result["rows"][$k]["name"] = $v["sname"];
            $result["rows"][$k]["id"] = $v["iid"];
        }
        echo json_encode($result);
    }