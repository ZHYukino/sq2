<?php
    include_once ("common.php");
    session_start();
    $result["result"] = 0;
    if(isset($_SESSION["uid"])) {
        $count = $_GET["count"];
        $opt = parse_ini_file("../../opt.ini",true);
        $opt["ScreenConfig"]["ScreenSelect"] = $count;
        $res = write_ini_file($opt,"../../opt.ini",true);
        if($res){
            $result["result"] = 1;
            $result["msg"] = "设置成功";
        }else{
            $result["msg"] = "设置失败";
        }
    }
    else{
        $result["msg"] = "请先登录";
    }
    echo json_encode($result);