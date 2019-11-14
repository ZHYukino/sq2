<?php
    //用cookie 获取设备
    require_once ("common.php");
    if($itype==1){
        if(empty($_COOKIE["CheckList"])){
            $arr = array();
            $arr["CAM"]=1;
            $arr["COVI"]=1;
            $arr["DOOR"]=1;
            $arr["FAN"]=1;
            $arr["FB"]=1;
            $arr["FGR"]=1;
            $arr["FGS"]=1;
            $arr["FGW"]=1;
            $arr["FSFX"]=1;
            $arr["LED"]=1;
            $arr["LIGHT"]=1;
            $arr["LS"]=1;
            $arr["CMS"]=1;
            $arr["TS"]=1;
            $arr["VD"]=1;
            $arr["DEC"]=1;
            $arr["ET"]=1;
            $arr["WD"]=1;
            $arr["TCMS"]=1;
            $arr["ETHOST"]=1;
            $result = $arr;
            $arr = serialize($arr);
            setcookie("CheckList",$arr,time()+3600*24*30);
            
        }
       else{
           $result = unserialize($_COOKIE["CheckList"]);
       }
       echo json_encode($result);
    }
    $name = !empty($_GET['name']) ? $_GET['name'] : "";
    if($itype==0 && $name !="") {
        $result = unserialize($_COOKIE["CheckList"]);
        if(array_key_exists($name,$result)) {               //如果请求的设备名在 cookie 中才开始执行
            if ($result[$name] == 1) {
                $result[$name] = 0;
                $result = serialize($result);
                setcookie("CheckList", $result, time() + 3600 * 24 * 30);
            } else if ($result[$name] == 0) {
                $result[$name] = 1;
                $result = serialize($result);
                setcookie("CheckList", $result, time() + 3600 * 24 * 30);
            }
        }
        $res["msg"] =1;
        $res["code"]=$name;
        echo json_encode($res);
    }
    //公路设备
    $devtype = array(
        "23"=>"cms",
        "25"=>"tcms",
        "17"=>"cam",
        "19"=>"et",
        "20"=>"vd",
        "22"=>"wd",
    );
    if($itype == 2){
        if(!isset($_COOKIE["road"])) {
            $num = 0;
            foreach ($devtype as $k => $v) {
                $res[$num][$k] = 1;
                $num = $num+1;
            }
            $cookies = serialize($res);
            setcookie("road", $cookies, time() + 3600 * 24 * 30);
        }else{
            $res = unserialize($_COOKIE["road"]);
        }
        $road["data"] = $res;
        $road["count"] = count($res);
        $road["code"] = 1;
       echo json_encode($road);
    }
    elseif($itype == 3 && $id !=""){

    }
