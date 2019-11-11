<?php

    //火灾应急方案 ------ 下发情报板
  include_once ("common.php");
  session_start();
  $result = array("result"=>0, "msg"=>"");
  if(isset($_SESSION["Acc"])){
      $itype =$_GET["itype"];
      $rowcount = $_GET["rowcount"];
      $tunnel = $_GET["tunnel"];
      $updown = $_GET["updown"];
        if($itype == 1 && !empty($rowcount) && $rowcount>0 && $tunnel !="" && $updown !="" ){
            $query = "Select devid,devno,devname from devpara where Enabled=1 and devtype in(9,11,12,13) and TuIndex='".$tunnel."' and UpDown='".$updown."' ";
            $sql = sqlsrv_query($conn,$query,array(),array("Scrollable"=>"static"));
            $num = sqlsrv_num_rows($sql);
            if(!empty($num)){
                $params = array(
                    "devid"=>"devid",
                    "devno"=>"devno",
                    "devname"=>"devname"
                );
                $result = re_rows($query,$params,$conn);
                $data = $result["rows"];
                $ssql = "insert into sendcms (devid,devno,sendtype,sendtime,state) values ('".$data[0]["devid"]."','".$data[0]["devno"]."',0,GETDATE(),'-1')";
                $sql = sqlsrv_query($conn2,$ssql,array(),array("Scrollable"=>"static"));
                $cid = sqlsrv_query($conn2,"SELECT max(jobNo) newIDValue from sendcms",array(),array("Scrollable"=>"static"));
                while ($row = sqlsrv_fetch_array($cid, SQLSRV_FETCH_ASSOC)) {
                    $result["cid"] =  $row["newIDValue"];
                }
               for($i=0;$i<$rowcount;$i++){
                   $ssql = "insert into SendCmsDet (JobNo,RowOrder,SendText,TextFormat) values ('".$result["cid"]."','".$i."','" .str_replace($_GET["sendtext".$i],",","\r\n") . "','" .$_GET["textformat".$i].  "') ";
                   $sql = sqlsrv_query($conn2,$ssql,array(),array("Scrollable"=>"static"));
               }
               $ssql = "insert into syslog(useracc,dt,logtype,joinid,logmemo,userip) values ('".$_SESSION["Acc"]."',GETDATE(),2,'".$result["cid"]."','下发情报板信息','".$_SESSION["userip"]."')"   ;
               $sql = sqlsrv_query($conn2,$ssql,array(),array("Scrollable"=>"static"));
               $result["result"] = 1;
               $result["msg"] = "情报板发送成功";
            }
        }else{
            $result["msg"] = "情报板参数错误";
        }
  }else{
      $result["msg"] ="请先登录";
  }
  echo json_encode($result);
