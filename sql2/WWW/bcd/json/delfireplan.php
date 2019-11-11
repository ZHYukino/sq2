
<?php
  //火灾应急方案 ----- 删除按钮
    include_once ("common.php");
    $itype = isset($_GET["itype"])?$_GET["itype"] : "";
    session_start();
    $result = array(
        "result"=>0,
        "msg"=>""
    );
    if(isset($_SESSION["Acc"])) {
        $name = $_GET["name"];
       if($itype == 1 && !empty($name)) {
            $query = "delete from FirePlan where Name = '".$name."'";
            $sql = sqlsrv_query($conn2,$query,array(),array("Scrollable" => 'static'));
            if($sql){
                $result["result"] = 1;
                $result["msg"] = "删除成功";
            }else {
                $result["msg"] = "删除失败";
            }
       }
    }else{
        $result["msg"] = "请先登录";
    }
    echo json_encode($result);



