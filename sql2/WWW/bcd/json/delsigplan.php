<?php

    require_once  ('common.php');
    $itype=isset($_GET['itype'])?$_GET['itype']:"";
    session_start();
    $result = array("result"=>0,"msg"=>"");
    if(isset($_SESSION["Acc"])) {
        $name = $_GET["name"];
        if ($itype == 1 && $name !="") {
            $query  = "update SigPlan set Enabled=0 where Name='".$name. "'";
            $sql = sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
            $result["msg"] ="ɾ���ɹ�";
            $result["result"] = 1;
        }
    }else{
        $result["msg"] = "δ��¼���ܲ���";
    }
    echo json_encode($result);