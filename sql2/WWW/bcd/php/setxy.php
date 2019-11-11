
<?php

    // setxy 页面的拖动修改

    include_once ('common.php');
    session_start();
    $result = array("result"=>0,"msg"=>"","type"=>"");
    if(isset($_SESSION["uid"])){
        if($_GET["itype"] == 1){
            $x = checkstr($_GET["xvalue"]);
            $y = checkstr($_GET["yvalue"]);
            $id = $_GET["id"];
            if(empty($x) || empty($y) ) {
                $result["msg"] = "参数异常";
            }else{
                //判断   plc 或者 设备
                $name = $_GET["cname"];


                //查询id 是否含有7564 ，存在则是移动设备表中
                $devrule = "/^(10000)/";
                $num = preg_match($devrule, $id);

                
                if(!$num){
                    $query = "update PLCDevInfo set FPointX='".round($x,2)."' ,  FPointY='".round($y,2)."' where FID='".$id."' and FCName = '".$name."'  ";
                    $sql = sqlsrv_query($conn2,$query,array(), array( "Scrollable" => 'static' ));
                    $result["msg"] = "修改PLC设备位置成功";
                }else {
                    $id = str_replace("10000","",$id);
                    $query = "update DevInfo set FPointX='" . round($x, 2) . "' ,  FPointY='" . round($y, 2) . "' where FID='" . $id . "'    ";
                    $sql = sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
                    $query = "Select FTypeID  from DevInfo where FID='" . $id . "'   ";
                    $sqltype = sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
                    if($sqltype){
                        while ($row = sqlsrv_fetch_array($sqltype,SQLSRV_FETCH_ASSOC)) {
                            $result["type"] = $row["FTypeID"];
                        }
                    }
                    $result["msg"] = "修改设备位置成功";
                }
            }
        }
          $result["result"]=1;
    }else{
        $result["msg"] = "未登录不可操作";
    }
    echo json_encode($result,FILTER_SANITIZE_STRING);