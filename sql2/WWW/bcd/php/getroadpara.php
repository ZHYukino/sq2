<?php

    require_once ("common.php");
    $path = "DevInfo";
    $para = CurlCalss::curl(5,'',$path);
    $para = json_decode($para,true);
    $num = 0;
    foreach ($para["data"] as $k => $v){
        if($v["iroadid"] != 1){
            unset($para["data"][$k]);
        }
    }

    if($itype == 2){
        $data = array(
            "code" => "1",
            "count"=>count($para["data"]),
            "data" => $para["data"]
        );
        echo json_encode($data);
    }

    $paratype = 1;
    $nums = 0;
    foreach ($para["data"] as $k=>$v){
        if($v["itypeid"] !=  $paratype){
            $typename[$nums] = $v["itypeid"];
            $paratype = $v["itypeid"];
            $nums = $nums + 1;
        }
    }

    if($itype == 1) {
        $typepic = array(
            "23"=>"cms.PNG",
            "25"=>"tcms.PNG",
            "17"=>"cam_0_1_2_1.png",
            "18"=>"ETHOST.png",
            "19"=>"ET_1_5.png",
            "20"=>"vd_1_-1.PNG",
            "22"=>"wd_1_-1.PNG",
        );
        $path = "DevType";
        $type = CurlCalss::curl(5, '', $path);
        $type = json_decode($type, true);
        $nnum = 0;
        foreach ($typename as $k => $v) {
            $result[$nnum]["scname"] = $type["data"][$v]["scname"];
            $result[$nnum]["sename"] = $type["data"][$v]["sename"];
            $result[$nnum]["iid"] = $type["data"][$v]["iid"];
            $result[$nnum]["pic"] = "./pic2/".$typepic[$type["data"][$v]["iid"]];
            $nnum = $nnum + 1;
        }

        $data = array(
            "code" => "1",
            "count"=>count($result),
            "data" => $result
        );
        echo json_encode($data);
    }
