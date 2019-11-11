<?php
///火灾应急方案  --------  新增
    include_once ("common.php");
    $itype = isset($_GET["itype"])?$_GET["itype"] : "";
    session_start();
    if(isset($_SESSION["Acc"])) {
        $result = array("result"=>0,"msg"=>"");
        if ($itype == "1") {
            $tunnel = $_GET["Tunnel"];           //获取前台数据
            $name = $_GET["name"];
            $updown = $_GET["updown"];
            $ts = $_GET["ts"];
            $ls = $_GET["ls"];
            $fan = $_GET["fan"];
            $door = $_GET['door'];
            $led = $_GET["led"];
            $fb = $_GET["fb"];
            $sendtext = $_GET["sendtext"];
            $textformat = $_GET["textformat"];
            if (!empty($name)) {
                $query = "select * from FirePlan where name='" . $name . "'";                  //先查询后添加
                $sql = sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
                $rowsnum = sqlsrv_num_rows($sql);//查询的数量
                if ($rowsnum > 0) {                               //查出重复名字的
                    echo json_encode(array("result" => 0, "msg" => "该方案名已存在"));
                    die();
                } else {
                    $query = "insert into FirePlan(Name,Tunnel,UpDown,LED,FAN,DOOR,FB,LS,TS,SendText,TextFormat,Enabled)  values ('" . $name . "','" . $tunnel . "','" . $updown . "','" . $led . "','" . $fan . "', '" . $door . "','" . $fb . "','" . $ls . "','" . $ts . "','" . $sendtext . "','" . $textformat . "', 'True')";
                    $sql = sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
                    if ($sql) {
                        $result["result"] = 1;
                        $result["msg"] = "保存成功";
                    }
                    else {
                        $result["msg"] = "插入数据库失败";
                    }
                }
            }
        }
    }else{
        $result["msg"] = "请先登录";
    }
    echo json_encode($result);

?>