<?php
include_once ('common.php');
$itype=isset($_GET['itype'])?$_GET['itype']:"";
if($itype==1){
    $query = "select * from SigPlan where Enabled=1";
    $params = array(
        "id"=>"FID",
        "name"=>"Name",
        "tunnel"=>"Tunnel"
    );
    getrows($query,$params,$conn2);
}
if($itype == 2)
{

}