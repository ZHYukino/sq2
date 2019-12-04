<?php
	require("common.php");

	$usid = isset($_POST["usid"]) ? $_POST["usid"] : "";

	
	$query = "insert into SysLog(FUserID,FDT,FInfo,FType,FMemo) values ('".$usid."',GETDATE(),'登录监控报表软件','1','')";
	$sql = sqlsrv_query($conn2,$query,array(), array( "Scrollable" => 'static' ));              //放入sql
  	

    if($sql)  {//查询名字出现的条数为零
         $success7 = '{"code":1,"msg":"日志添加成功","count":0,"data":[]}';
         echo $success7;
    }else{
    	$success7 = '{"code":-1,"msg":"日志添加失败","count":0,"data":[]}';
        echo $success7;
    }

