<?php
	require("common.php");

	$name = $_GET["ename"];

	

    $query="select fcname from S_UserInfo where FEName = '".$name."' and FEnable = 1 ";
    $sql = sqlsrv_query($conn2,$query,array(), array( "Scrollable" => 'static' ));              //放入sql
    $num = sqlsrv_num_rows ($sql);//查询的数量
    if($num==0)  {//查询名字出现的条数为零
        $result = array(
        "code"=>0,
        "data"=>""
         );
        $data = json_encode($result);
        die( $data);
    }
    if($sql && $num >0){
        while($row = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)){
           $res["cname"] = $row["fcname"];
       }
    }
    $result = array(
    	"code"=>1,
    	"data"=>$res["cname"]
    );
    
    echo json_encode($result);