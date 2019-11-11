<?php
    //群控——————执行按钮
    include_once ("common.php");
    $result = array("result"=>0,"msg"=>"");
    session_start();
    if(isset($_SESSION["uid"])){
        $id = empty($_GET["id"]) ? "":$_GET["id"];
        $id = str_replace("10000","",$id);
        $state = empty($_GET["state"]) ? "":$_GET["state"];
        if(!empty($id) && !empty($state)){
            $query = "update PLCDevState set FState='".$state."',FDT=GETDATE() where FPLCDevID='".$id."' ";
            $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>"static"));
            if($sql){
                $result["result"] = 1;
            }
        }
    }else{
        $result["msg"] = "未登录不能操作";
    }
    echo json_encode($result);