<?php
    include_once ("common.php");

    if($itype == "1"){
        $data = parse_ini_file("../../opt.ini",true);
        $res = $data["config"]["FJMode".$tunnel];
        echo  $res;
    }else if($itype == "2"){
        $data = parse_ini_file("../../opt.ini",true);
        $res = $data["config"]["ZMMode".$tunnel];
        echo  $res;
    }
