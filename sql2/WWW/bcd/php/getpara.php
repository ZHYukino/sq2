<?php
    header("Content-type:text/html;charset=utf-8");
    $itype=!empty($_GET['itype'])?$_GET['itype']:"";
    $q=!empty($_GET['q'])?$_GET['q']:"";
    require_once ("common.php");
    if($itype == 1){
        $path = "PLCDevInfo";
        $para = CurlCalss::curl(6,'Ftypeid='.$q,$path);
        $para = json_decode($para,true);
        $path = "DevType";
        $tunnel = json_decode(CurlCalss::curl(6,'',$path),true);
        foreach ($para["data"] as $k=>$v){           //消除ienable 不为 1的数组
            if($v["ienable"] !=1) {
                unset($para["data"][$k]);
            }
        }
        $nus = 1;
        $result["results"] = count($para["data"]);
        foreach ($para["data"] as $k=>$v){
            $result["rows"][$k]["id"] = $v["iid"];
            $result["rows"][$k]["pointx"] = $v["ipointx"];
            $result["rows"][$k]["pointy"] = $v["ipointy"];
            $result["rows"][$k]["shape"] = $v["ishape"];
            $result["rows"][$k]["groupid"] = $v["igroup"];
            $result["rows"][$k]["tunnel"] = $v["itunnelid"];                    //隧道选择
            $result["rows"][$k]["updown"] =    $v["iupdown"]  ;      // 0=上  1=下行             //-1变电所
            $result["rows"][$k]["devcode"] = $v["scode"];
            $result["rows"][$k]["devaddr"] = $v["saddr"];
            $result["rows"][$k]["devcname"] = $v["scname"];
            $result["rows"][$k]["devename"] = $v["sename"];
            $result["rows"][$k]["istate"] = $v["istate"];
            $result["rows"][$k]["channel"] = "";
            $result["rows"][$k]["ipaddr"] = "127.0.0.1";
            $result["rows"][$k]["ipport"] = "";
            $result["rows"][$k]["plcid"] = $q;
            $result["rows"][$k]["outword"] = "";
            $result["rows"][$k]["value"] = isset($v["ivalue"])? $v["ivalue"] :$v["fnvalue"];
            $result["rows"][$k]["fnvalue"] = isset($v["fnvalue"])? $v["fnvalue"] :"";
            $result["rows"][$k]["fnvalue1"] = isset($v["fnvalue1"])? $v["fnvalue1"] :"";
            $nus = $nus + 10;
        }

        echo json_encode($result);
    }

    if($itype == 2){
        $path = "DevInfo";
        $para = CurlCalss::curl(5,'Ftypeid='.$q,$path);
        $para = json_decode($para,true);
        $path = "DevType";
        $tunnel = json_decode(CurlCalss::curl(6,'',$path),true);
        foreach ($para["data"] as $k=>$v){           //消除ienable 不为 1的数组
            if($v["ienable"] !=1) {
                unset($para["data"][$k]);
            }
        }
        $result["results"] = count($para["data"]);
        $num = 0;
        foreach ($para["data"] as $k=>$v){
            $result["rows"][$k]["id"] = "10000".$v["iid"];
            $result["rows"][$k]["pointx"] = $v["ipointx"];
            $result["rows"][$k]["pointy"] = $v["ipointy"];
            $result["rows"][$k]["shape"] = $v["ishape"];
            $result["rows"][$k]["ipaddr"] = $v["sipaddr"];
            $result["rows"][$k]["ipport"] = $v["iipport"];
            $result["rows"][$k]["tunnel"] = $v["itunnelid"];
            $result["rows"][$k]["updown"] = ($v["iupdown"] == 1)? 0:($v["iupdown"] == 2 ? 1:-1) ;//上下行             //-1变电所
            $result["rows"][$k]["devcode"] = $v["scode"];
            $result["rows"][$k]["devaddr"] = $v["saddr"];
            $result["rows"][$k]["devcname"] = $v["scname"];
            $result["rows"][$k]["devename"] = $v["sename"];
            $result["rows"][$k]["istate"] = $v["istate"];
            $result["rows"][$k]["channel"] = "";
            $result["rows"][$k]["plcid"] = $q;
            $result["rows"][$k]["outword"] = "";
            $result["rows"][$k]["value"] = isset($v["ivalue"])? $v["ivalue"] :"";
        }
        echo json_encode($result);
    }