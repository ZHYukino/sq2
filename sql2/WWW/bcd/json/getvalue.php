<?php
include_once ('common.php');
$itype=isset($_GET['itype'])?$_GET['itype']:"";
if($itype == 1){
    $query = "Select CONVERT(varchar(19),DT,120) as DTime,* from devvalue where 1=1";
    $params = array(
      'id'=>"DevID",
        'dt'=>"DTime",
        'i1'=>"i1",
        'i2'=> "i2",
        'n1'=> "n1",
        'n2'=>"n2",
        'v1'=> "v1",
        'v2'=>"v2"
    );
    getrows($query,$params,$conn2);
}