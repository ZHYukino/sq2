<?php
//火灾应急方案 ------  执行按钮
    include_once ("common.php");
    session_start();
    $result = array("result" => 0,"msg" => "");
    if (isset($_SESSION["Acc"])){
        $itype = $_GET["itype"];
        if($itype == 1 ){
            $total = $_GET["tstotal"];
            if($total > 0 && !empty($total)){
                $state = $_GET["tsstate"];
                if(!empty($state)){
                    for ($i=0;$i<$total;$i++){
                        $deid = $_GET["tsid".$i];
                        $query = "update Devsend set i1 = '".$state."',State='-1',SendTime=GETDATE()  where DevID='".$deid."' ";
                        $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>'static'));
                    }
                }
            }
            $total = $_GET["lstotal"];
            if($total >0 && !empty($total)){
                $state = $_GET["lsstate"];
                if(!empty($state)){
                    for ($i=0; $i<$total;$i++){
                        $deid = $_GET["lsid".$i];
                        $query = "update Devsend set i1 = '".$state."',State='-1',SendTime=GETDATE()  where DevID='".$deid."' ";
                        $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>'static'));
                    }
                }
            }
            $total = $_GET["fbtotal"];
            if($total >0 && !empty($total)){
                $state = $_GET["fbstate"];
                if(!empty($state)){
                    for ($i=0; $i<$total;$i++){
                        $deid = $_GET["fbid".$i];
                        $query = "update Devsend set i1 = '".$state."',State='-1',SendTime=GETDATE()  where DevID='".$deid."' ";
                        $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>'static'));
                    }
                }
            }
            $total = $_GET["ledtotal"];
            if($total >0 && !empty($total)){
                $state = $_GET["ledstate"];
                if(!empty($state)){
                    for ($i=0; $i<$total;$i++){
                        $deid = $_GET["ledid".$i];
                        $query = "update Devsend set i1 = '".$state."',State='-1',SendTime=GETDATE()  where DevID='".$deid."' ";
                        $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>'static'));
                    }
                }
            }
            $total = $_GET["doortotal"];
            if($total >0 && !empty($total)){
                $state = $_GET["doorstate"];
                if(!empty($state)){
                    for ($i=0; $i<$total;$i++){
                        $deid = $_GET["doorid".$i];
                        $query = "update Devsend set i1 = '".$state."',State='-1',SendTime=GETDATE()  where DevID='".$deid."' ";
                        $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>'static'));
                    }
                }
            }
        }
        $result["result"] = 1;
        $result["msg"] = "应用成功";
        $query = "insert into LogSys(logman,LogTime,Logdesc,LogMemo,logtype) values ('".$_SESSION['Acc']. "',GETDATE(),'火灾手动控制','更改联动设备状态',3)";
        $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable"=>'static'));
        echo json_encode($result);
    }else{
        $result["msg"]="未登录不能操作";
        echo json_encode($result);
    }