<?php

    include_once ("common.php");
    $itype = isset($_GET["itype"]) ? $_GET["itype"] :"";
    if($itype == 1 && !empty($_GET["total"])){
        $total = $_GET["total"];
        $name = $_GET["name"];
        $cache = parse_ini_file("../../cache.ini",true);
        $result = array();
        echo "[";
        for($i=0;$i<$total;$i++){
            $ename = $_GET["ename".$i];
            if(!empty($ename)){
               $result["ename"] = $ename;
               $result["tip"] =  $cache[$name][$ename];
               echo json_encode($result);
            }
            echo ",";
        }
        echo "]";
    }