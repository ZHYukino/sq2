<?php
    //  修改密码
    require_once ("common.php");
    session_start();
    if(isset($_SESSION["uid"])){
        if($_POST["newpass"] === $_POST["renewpass"]){
            $name = checkstr($_POST["name"]);
            $pass = checkstr($_POST["pass"]);
            $query = "Select * from S_UserInfo where FEName = '".$name."' and FPassWord = '".$pass."' " ;
            $sql = sqlsrv_query($conn,$query,array(), array( "Scrollable" => 'static' ));              //放入sql
            $num = sqlsrv_num_rows ($sql);//查询的数量
            if($num >0 ){
               $query = "update  S_UserInfo set  FPassWord = '".$_POST["newpass"]."'   where FEName = '".$name."'";
                $sql = sqlsrv_query($conn,$query,array(), array( "Scrollable" => 'static' ));              //放入sql
                if($sql){
                    $res=array(
                        "msg"=>"修改成功",
                        "code"=>"1",
                    );
                }
            }else{
                $res=array(
                    "msg"=>"密码错误",
                    "code"=>"0",
                );
            }
        }
    }else{
        $res=array(
            "msg"=>"请先登录",
            "code"=>"0",
        );
    }
    echo json_encode($res);