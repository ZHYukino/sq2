<?php
    include_once ("common.php");
    session_start();
    $result = array("result" => 0,"msg"=>"");
    if(isset($_SESSION["uid"])){
       $value = $_GET["fvalue"];
       $devtype = $_GET["devtype"];
       $id = $_GET["id"];
       $id = str_replace("10000","",$id);
       $tunnel = $_GET["tunnel"] - 1;
       $changetype = $_GET["changetype"];
       $cname = $_GET["cname"];
       if($itype == 1 && !empty($value) && !empty($id) ){
           $userid = $_SESSION["uid"];
           $marknum = time().round(0,9);
           $path = "PLCDevControl";
           $sign = "FID=".$id."&FUserID=".$userid."&FMark=".$marknum ."&FIndex=".$tunnel."&FValue=".$value."&FTypeID=".$devtype."";
           $light = CurlCalss::curl(6,$sign,$path);
           $newdata =  json_decode($light,true);
           if($newdata["iresult"] === 1){
                $data = array(
                    "msg"=>"发送成功",
                    "data"=>$marknum,
                    "code"=>"",
                    "time"=>""
                );
           }else{
               $data = array(
                   "msg"=>"发送失败",
                   "data"=>$marknum,
                   "code"=>-1,
               );
           }
           echo json_encode($data);
           die();
       }
    }else{
        $result["msg"] = "未登录不可操作";
    }
  echo json_encode($result);

