<?php

    include_once ("common.php");
    session_start();
    $result = array("result" =>0,"msg"=>"");
    if(isset($_SESSION["Acc"])){
        $itype = $_GET["itype"];
        if($itype == 1){
            $total = $_GET["total"];
            for($i=0;$i<$total;$i++){
                $devid = $_GET["id".$i];
                $state = $_GET["state".$i];
                if($devid!="" && $state>0){
                    $query = "update Devsend set i1='".$state."',State='-1',SendTime=GETDATE() where DevID='".$devid."' ";
                    $sql = sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
                }
            }
            $result["msg"] = "Ӧ�óɹ�";
            $result["result"] = 1;
        }
    }else{
        $result["msg"]  = "δ��¼���ɲ���";
    }

    echo json_encode($result);