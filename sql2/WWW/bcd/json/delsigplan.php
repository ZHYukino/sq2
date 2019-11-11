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
            $result["msg"] ="删除成功";
            $result["result"] = 1;
        }
    }else{
        $result["msg"] = "未登录不能操作";
    }
    echo json_encode($result);