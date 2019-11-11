<?php
    //登录
    $result = array("code" =>0 ,"msg"=>"") ;

    if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"])=="xmlhttprequest"){
        // ajax 请求的处理方式
        require_once('common.php');
        $name=trim($_POST['name']);
        $pass=trim($_POST['pass']);
        $name=checkstr($name);
        $pass=checkstr($pass);

        $query="select * from S_UserInfo where FEName = '".$name."' and FEnable = 1 ";

        $sql = sqlsrv_query($conn2,$query,array(), array( "Scrollable" => 'static' ));              //放入sql
        $num = sqlsrv_num_rows ($sql);//查询的数量
        if($num==0)  {//查询名字出现的条数为零
            $result['msg']="密码错误";
            echo json_encode($result);
            die();
        }

        if($sql && $num >0){
            while($row = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)){
                $sql_pass = $row["FPassWord"];
                $uid = $row["FID"];
            }
            if($pass == $sql_pass){
                $result["code"] = 1;
                $result["msg"] = "登录成功";
                session_start();
                $_SESSION["uid"] = $uid;
                $_SESSION["name"] = $name  ;
                $_SESSION["ip"]=$_SERVER["REMOTE_ADDR"];
            }else{
                $result["msg"] = "密码错误";
            }
            echo json_encode($result);
        }

    }

?>