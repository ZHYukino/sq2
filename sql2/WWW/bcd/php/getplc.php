<?php

    $itype = isset($_GET['itype'])?$_GET['itype']:"";
    if($itype == 1){
        require_once ("CurlCalss.php");
        $path = "PLCInfo";
        $plc = CurlCalss::curl(6,'',$path);
        $plc = json_decode($plc,true);
        $result["results"] = $plc["num"];
        $tunnel_star = 0;
        for ($i=0;$i<3;$i++) {
            $plctunnel = CurlCalss::curl(6, 'FIndex='.$i, $path);
            $plctunnel = json_decode($plctunnel,true);
            foreach ($plctunnel["data"]  as $k =>$v){
                $result["rows"][$tunnel_star+$k]["runmode"] = $v["irunmode"];
                $result["rows"][$tunnel_star+$k]["state"] = $v["istate"];
                $result["rows"][$tunnel_star+$k]["name"] = $v["sname"];
                $result["rows"][$tunnel_star+$k]["id"] = $v["iid"];
                $result["rows"][$tunnel_star+$k]["tunnel"] = $i+1;
            }
            $tunnel_star += $plctunnel["num"] ;
        }

        echo json_encode($result);
    }