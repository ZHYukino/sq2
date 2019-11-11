
<?php

    include_once ('common.php');
    session_start();
    $result = array("result" =>0,"msg"=>"");
    if(isset($_SESSION["Acc"])){
        $name = $_GET["name"];
        $total = $_GET["total"];
        $tunnel = $_GET["Tunnel"];
        if($total>0 && $name !="" && $tunnel !=""){
            $query = "select 1 from SigPlan where Enabled=1 and Name='".$name."' ";
            $sql =  sqlsrv_query($conn2,$query,array(), array( "Scrollable" => 'static' ));
            $rowsnum = sqlsrv_num_rows($sql);//查询的数量
            if($rowsnum >0){
                $result["msg"] = "该方案名已存在";
            }else {
                $query2 = "insert into SigPlan(Name,Tunnel,Enabled) values('".$name."','".$tunnel."',1)" ;
                $sql2 =  sqlsrv_query($conn2,$query2,array(), array( "Scrollable" => 'static' ));
                if($sql2){
                    $cache = parse_ini_file("../../cache.ini",true);
                    for($i=0;$i<$total;$i++){
                        $ename = $_GET["ename".$i];
                        if($ename !=""){
                            $tip = $_GET['tip'.$i];
                            $cache[$name][$ename] = $tip;
                        }
                    }
                    $result["msg"] ="保存成功";
                    $result["result"] = 1;
                }
            }
        }
    }else{
        $result["msg"] = "未登录不可操作";
    }
    echo json_encode($result);