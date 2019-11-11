<?php
    include_once ("common.php");
    session_start();
    $result = array("result" => 0,"msg"=>"");
    if(isset($_SESSION["uid"])){
       $itype = $_GET["itype"];
       $state = $_GET["state"];
       $id = $_GET["id"];
        $id = str_replace("10000","",$id);
       $tip = $_GET["tip"];
       $changetype = $_GET["changetype"];
       $cname = $_GET["cname"];
       if($itype == 1 && !empty($state) && !empty($id) ){

           $query3 = "select FTypeID from PLCDevInfo where FID = '".$id."'";
           $sqldata = sqlsrv_query($conn,$query3,array(),array("Scrollable"=>"static"));
           if($sqldata) {
               while ($row = sqlsrv_fetch_array($sqldata)) {
                   $typeid = $row["FTypeID"];
               }
           }
           $query  = "update PLCDevState set FState='".$state."',FDT=GETDATE() where FPLCDevID='".$id."' ";
           $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>"static"));
           $query2 = "insert into SysLog(FUserID,FDT,FInfo,FType,FMemo) values ('" .$_SESSION["uid"]. "',GETDATE(),'" .$changetype.$cname.$tip."','". $typeid."','')" ;
           $sql2 = sqlsrv_query($conn2,$query2,array(),array("Scrollable"=>"static"));
           if($sql ){
               $result["msg"] = "发送成功";
               $result["result"] =1;
           }
       }
    }else{
        $result["msg"] = "未登录不可操作";
    }
    echo json_encode($result);

