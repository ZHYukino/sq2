<?php
//  系统信息  ————————  控制模式
    include_once ("common.php");
//    echo $tunnel;die();
    session_start();
    $path = "../../opt.ini";
    if(isset($_SESSION["uid"])){
        $state =$_GET['state'];
        if($itype == "1" && $state !=""){
            $data = parse_ini_file($path,true);
            $data["config"]["FJMode".$tunnel] = $state;
            write_ini_file($data, $path, true);
            echo  '{"result":1,"msg":"修改成功"}';
        }
        if($itype == "2" && $state !=""){
            $data = parse_ini_file($path,true);
            $data["config"]["ZMMode".$tunnel] = $state;
            write_ini_file($data, $path, true);
            echo  '{"result":1,"msg":"修改成功"}';
        }
    }else{
      echo  '{"result":"0","msg":"请先登录"}';
}