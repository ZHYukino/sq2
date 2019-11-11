<?php
    include_once ("common.php");
    $itype = empty($_GET['itype']) ? "":$_GET['itype'];
    if(!isset($_COOKIE["AutoConfig"])){
        $goods["FJMode"] = "0";
        $goods["ZMMode"]= "0";
        $AutoConfig = serialize($goods);
        setcookie('AutoConfig',$AutoConfig);
        echo 0;die();
    }else{
        if($itype == "1"){
            $arr = unserialize($_COOKIE['AutoConfig']);
            if(empty($arr["FJMode"])) echo 0;
            else  echo $arr["FJMode"];
        }else if($itype == "2"){
            $arr = unserialize($_COOKIE['AutoConfig']);
            if(empty($arr["FJMode"])) echo 0;
            else  echo $arr["ZMMode"];
        }
    }