<?php
    include_once ('common.php');
    $itype=isset($_GET['itype'])?$_GET['itype']:"";
    if($itype == 1) {
        $path = "PLCDevInfo";
        $para = CurlCalss::curl(6, 'Ftypeid=' . '', $path);
        $para = json_decode($para, true);
        $num = 0;
        foreach ($para["data"] as $k =>$v){
            $result["rows"][$num]["state"] = $v["istate"];
            $result["rows"][$num]["value"] = isset($v["ivalue"]) ? $v["ivalue"] : "";
            $result["rows"][$num]["value1"] = isset($v["ivalue1"]) ? $v["ivalue1"] : "";
            $result["rows"][$num]["shape"] = $v["ishape"];
            $result["rows"][$num]["fnvalue"] = isset($v["fnvalue"]) ? $v["fnvalue"] : "";
            $result["rows"][$num]["fnvalue1"] = isset($v["fnvalue1"]) ? $v["fnvalue1"] : "";
            $result["rows"][$num]["id"] = $v["iid"];
            $num = $num+1;
        }
        $path = "DevInfo";
        $para = CurlCalss::curl(5, 'Ftypeid=' . '', $path);
        $para = json_decode($para, true);
        foreach ($para["data"] as $k =>$v){
            $result["rows"][$num]["state"] = $v["istate"];
            $result["rows"][$num]["value"] = isset($v["ivalue"]) ? $v["ivalue"] :"";
            $result["rows"][$num]["value1"] = isset($v["ivalue1"]) ? $v["ivalue1"] :"";
            $result["rows"][$num]["shape"] = $v["ishape"];
            $result["rows"][$num]["fnvalue"] = isset($v["fnvalue"]) ? $v["fnvalue"] : "";
            $result["rows"][$num]["fnvalue1"] = isset($v["fnvalue1"]) ? $v["fnvalue1"] : "";
            $result["rows"][$num]["id"] = "10000".$v["iid"];
            $num = $num+1;
        }
        //车检
        $vdstate = CurlCalss::curl(5,"","DevRealVDData");
        $vdpara = json_decode($vdstate,true)["data"];
        foreach ($vdpara as $k=>$v){
            for($i=1;$i<=4;$i++) {
                $vd[$v["iid"]]["icount".$i] = $v["icount".$i];
                $vd[$v["iid"]]["focc".$i]  = $v["focc".$i] ;
                $vd[$v["iid"]]["fspeed".$i]  = $v["fspeed".$i] ;
            }
        }
        foreach ($result["rows"] as $k =>$v){
            foreach ($vd as $key=>$value){
                if($v["id"] == "10000".$key) {
                    for ($i = 1; $i <= 4; $i++){
                        $result["rows"][$k]["icount" . $i] = $value["icount" . $i];
                        $result["rows"][$k]["focc" . $i] = $value["focc" . $i];
                        $result["rows"][$k]["fspeed" . $i] = $value["fspeed" . $i];
                    }
                }
            }
        }

        //气象
        $wdstate = CurlCalss::curl(5,"","DevRealWDData");
        $wdpara = json_decode($wdstate,true)["data"];
        foreach ($wdpara as $k=>$v){
            $wd[$v["iid"]]["fengsu"] = $v["fengsu"];
            $wd[$v["iid"]]["nengjiandu"] = $v["nengjiandu"];
        }
        foreach ($result["rows"] as $k=>$v){
            foreach ($wd as $key => $value) {
                if ($v["id"] == "10000".$key) {
                    $result["rows"][$k]["fengsu"] = $value["fengsu"];
                    $result["rows"][$k]["nengjiandu"] = $value["nengjiandu"];
                }
            }
        }
        $result["results"] = $num;
        echo json_encode($result);
    }