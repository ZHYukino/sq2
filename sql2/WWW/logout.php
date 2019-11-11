<?php
    include_once ("./bcd/json/config.php");
    session_start();
    if($_SESSION["Acc"] !=""){
        $query = "insert into LogSys(logman,LogTime,Logdesc,LogMemo,logtype) values ('" .$_SESSION["Acc"]. "',GETDATE(),'退出隧道监控','',1)";
        sqlsrv_query($conn2, $query, array(), array("Scrollable" => 'static'));
    }

    $_SESSION["Acc"] ="";
    $_SESSION["name"] = "";
    $_SESSION["userip"] = "";
    $result = array("result" =>1);
   echo json_encode($result);
?>