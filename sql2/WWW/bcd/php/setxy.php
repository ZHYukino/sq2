
<?php

    // setxy 页面的拖动修改

    include_once ('common.php');
    session_start();
    $result = array("result"=>0,"msg"=>"","type"=>"");
    $x = checkstr($_GET["xvalue"]);
    $y = checkstr($_GET["yvalue"]);

    if(strpos($id,"play") !== false || strpos($id,"affichetcms") !== false || strpos($id,"affiche") !== false  || strpos($id,"tunnel") !== false){
        if(strpos($id,"play") !== false){
            $id = str_replace("play","",$id);
        }else if(strpos($id,"affichetcms") !== false){
            $id = str_replace("affichetcms","",$id);
            $id = str_replace("10000","",$id);
        }else if(strpos($id,"affiche") !== false){
            $id = str_replace("affiche","",$id);
            $id = str_replace("10000","",$id);
        }
        $path = "../../playxy.ini";
        $play = parse_ini_file($path,true);
        $play[$id]["x"] = round($x, 2);
        $play[$id]["y"] = round($y, 2);
        $result = write_ini_file($play, $path, true);
        die();
    }


    if(isset($_SESSION["uid"])){
        //公路页面设置xy
        if($itype == 0){
            $query = "update DevInfo set FPointX='" . round($x, 2) . "' ,  FPointY='" . round($y, 2) . "' where FID='" . $id . "'    ";
            $sql = sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
            if($sql){
                $result["msg"] = "修改设备位置成功";
            }
        }
        //隧道设置xy
        else if($_GET["itype"] == 1){
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