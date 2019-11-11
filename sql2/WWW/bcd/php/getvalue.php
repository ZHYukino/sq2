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
        $result["results"] = $num;
        echo json_encode($result);
    }