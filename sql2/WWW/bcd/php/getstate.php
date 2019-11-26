<?php
    
    require_once ('./common.php');
    $itype = isset($_GET["itype"]) ? $_GET["itype"] : "";

    //设置缓存
    $cache = new CacheClass ;
    $filename = "../cache/statecache.php";
    $cache_result = $cache-> usecache($filename,5);
    //存在缓存
    if($cache_result){
        echo $cache_result;
        die();
    }else{
        if($itype == 1){                                
            //plc状态
            $path = "PLCDevInfo";
            $json = CurlCalss::curl(6,'',$path);
            $state = json_decode($json,true);
            $num = 0;
            foreach ($state["data"] as $k=>$v){
                $result["rows"][$num]["state"] = $v["istate"];
                $result["rows"][$num]["dt"] = "";
                $result["rows"][$num]["id"] = $v["iid"];
                $result["rows"][$num]["shape"] = $v["ishape"];
                $result["rows"][$num]["value"] = isset($v["ivalue"]) ? $v["ivalue"] :$v["fnvalue"];
                $num = $num + 1;
            }
        }

             //设备状态
            $path = "DevInfo";
            $json = CurlCalss::curl(5,'',$path);
            $state = json_decode($json,true);
            foreach ($state["data"] as $k=>$v){
                $result["rows"][$num]["state"] = $v["istate"];
                $result["rows"][$num]["dt"] = "";
                $result["rows"][$num]["id"] = "10000".$v["iid"];
                $result["rows"][$num]["Contents"] = "";
                $result["rows"][$num]["shape"] = $v["ishape"];
                $result["rows"][$num]["value"] = isset($v["ivalue"])? $v["ivalue"] :"";
                $num = $num +1 ;
            }
        $result["results"] = $num;
        $cache->create_made($filename,json_encode($result));
        echo json_encode($result);
    }