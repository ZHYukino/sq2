<?php
    $itype = isset($_GET['itype'])?$_GET['itype']:"";
    //在配置文件 opt.ini 中获取隧道的信息
    require_once ("./common.php");

    //设置缓存
    $cache = new CacheClass ;
    $filename = "../cache/typecache.php";
    $cache_result = $cache-> usecache($filename,1);
    //存在缓存
    if($cache_result){
        echo $cache_result;
    }
    else
    {
        $path = "DevType";
        $result = CurlCalss::curl(6,'',$path);
        $arr = json_decode($result,true);
       // print_r($arr);die();
        //消除 null的 设备

        foreach ($arr["data"] as $k => $v){
            if(strpos($v["scname"],"NULL") !== false){
                unset($arr["data"][$k]);
            }
        }

        //消除 不用的设备
        unset($arr["data"][14]);
        unset($arr["data"][12]);
        unset($arr["data"][13]);
        unset($arr["data"][16]);
        unset($arr["data"][21]);
        unset($arr["data"][24]);
        unset($arr["data"][26]);
        unset($arr["data"][29]);
        unset($arr["data"][30]);
        unset($arr["data"][31]);

        $typepic = array(
            "1"=>"ts.png",
            "2"=>"ls.png",
            "4"=>"light.PNG",
            "5"=>"tw.PNG",
            "6"=>"led.png",
            "7"=>"covi.png",
            "8"=>"fancm.png",
            "11"=>"fb.PNG",
            "15"=>"gt_0.PNG",
            "23"=>"cms.PNG",
            "25"=>"tcms.PNG",
            "17"=>"cam.png",
            "18"=>"ETHOST.png",
            "19"=>"ET.png",
            "20"=>"vd.PNG",
            "22"=>"wd.PNG",
        );

        $num =0;
        foreach ($arr["data"] as $k=>$v){
            foreach ($typepic as $key =>$value){
                if($v["iid"] == $key  ){
                    $finish["rows"][$num]["pic"] = "./pic2/".$value;
                }
            }
            $finish["rows"][$num]["fid"] =  $v["iid"];//$num;
            $finish["rows"][$num]["fcname"] =  ($v["sename"] == "防火门" ?"车横":($v["sename"] == "车横"?"防火门":$v["sename"]));
            $finish["rows"][$num]["fename"] = ($v["scname"] == "TW"?"FSFX" :$v["scname"]);
            $num=$num+1;
        }
        $finish["results"] = count($arr["data"]);

        $cache->create_made($filename,json_encode($finish));
        echo json_encode($finish);
    }

?>