<?php
//  系统信息  ————————  设置
    include_once ("common.php");
    $total = empty($_GET['total']) ? "" :$_GET['total'];
    $tunnel = empty($_GET["tunnel"]) ? "" : $_GET["tunnel"];
    session_start();
    if(isset($_SESSION["uid"])){
        if($itype == "1" && $total >0 ){                                //-----  设置风机控制参数
            $ini_name = "../../Fj.ini";                                 //配置文件
            $fj_ini=parse_ini_file($ini_name,true);    //获取配置文件内容
            $name = $_GET["name"];
            $fj_ini[$name]["fxid"]=$_GET["fxid"];                                            //修改成前台获取的数据
            $fj_ini[$name]["fx"]=$_GET["fx"];
            for($i=0;$i<$total;$i++){
                 $id = str_replace("10000","",$_GET["id".$i]);
                $fj_ini[$name]["fj".$id]=($_GET["isselect".$i] == "0") ? "":$_GET["isselect".$i];
            }
            $write = write_ini_file($fj_ini, $ini_name, true);      //改好的数据写入文件中
            if($write){   //数据库插入日志

                $query = "insert into SysLog(FUserID,FDT,FInfo,FType,FMemo) values ('".$_SESSION["uid"]."',GETDATE(),'修改通风设备关系','3','')";
                $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
                if($sql != false){
                    echo  '{"result":1,"msg":"修改成功"}';
                }
            }
        }
        //照明控制参数----环境----设备关系---设置
        elseif($itype == 2 && $total > 0){                              //照明控制参数修改
            $ini_name = "../../ZM".$tunnel.".ini";                                 //配置文件
            $fj_ini = parse_ini_file($ini_name,true);    //获取配置文件内容
            $name = $_GET["name"].$_GET["name2"];
            for($i=0;$i<$total;$i++){
                $id = str_replace("10000","",$_GET["id".$i]);
                $fj_ini[$name]["zm".$id]=($_GET["isselect".$i] == "0") ? "":$_GET["isselect".$i];
                $fj_ini[$name]["dj".$id]=($_GET["isopen".$i] == "0") ? "":$_GET["isopen".$i];
            }
            $write = write_ini_file($fj_ini, $ini_name, true);      //改好的数据写入文件中
            if($write){   //数据库插入日志
                $query = "insert into SysLog(FUserID,FDT,FInfo,FType,FMemo) values ('".$_SESSION["uid"]."',GETDATE(),'修改照明环境控制方案配','3','')";
                $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
                if($sql != false){
                    echo  '{"result":1,"msg":"修改成功"}';
                }
            }
        }
        elseif($itype == 3 && $total > 0){                               //时间控制参数修改
            $ini_name = "../../ZM".$tunnel.".ini";                                 //配置文件
            $fj_ini = parse_ini_file($ini_name,true);    //获取配置文件内容
            $name = $_GET["name"];
            $fj_ini[$name]["StartTime"] = $_GET['time'];
            $fj_ini[$name]["UseShowHint"] = $_GET['hint'];
            $fj_ini[$name]["UseTime"] = $_GET['use'];
            for($i=0;$i<$total;$i++){
                $id = str_replace("10000","",$_GET["id".$i]);
                $fj_ini[$name]["dj".$id]=!isset($_GET["isopen".$i] ) ? "0":$_GET["isopen".$i];
            }
            $write = write_ini_file($fj_ini, $ini_name, true);      //改好的数据写入文件中
            //数据库插入日志
            if($write){
                $query = "insert into SysLog(FUserID,FDT,FInfo,FType,FMemo) values ('".$_SESSION["uid"]."',GETDATE(),'修改照明时间控制方案配','3','')";
                $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
                if($sql != false){
                    echo  '{"result":1,"msg":"修改成功"}';
                }
            }
        }
    }

    else{
        echo  '{"result":"0","msg":"未登录不可进行操作"}';
    }