<?php
//  系统信息  ————————  控制模式
    include_once ("common.php");
    $itype = empty($_GET['itype']) ? "":$_GET['itype'];
    session_start();
    if(isset($_SESSION["uid"])){
        $state =$_GET['state'];
        if($itype == "1" && $state !=""){
            $arr = unserialize($_COOKIE['AutoConfig']);
            $arr["FJMode"] = $state;
            $arr = serialize($arr);
            setcookie("AutoConfig",$arr);
            echo  '{"result":1,"msg":"修改成功"}';
        }
        if($itype == "2" && $state !=""){
            $arr = unserialize($_COOKIE['AutoConfig']);
            $arr["ZMMode"] = $state;
            $arr = serialize($arr);
            setcookie("AutoConfig",$arr);
            echo  '{"result":1,"msg":"修改成功"}';
        }
    }else{
      echo  '{"result":"0","msg":"请先登录"}';
}