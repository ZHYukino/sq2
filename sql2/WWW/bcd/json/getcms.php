<?php
require_once ('common.php');
$itype=!empty($_GET['itype'])?$_GET['itype']:"";
if($itype == 1){
    $query = "Select devid,devno,updown,tuindex,devtype,devaddr from devpara where Enabled=1 and devtype in(9,11,12,13) and tuindex is not null";
    $params = array(
        "id"=>"DevID",
        "devno"=>"DevNo",
        "updown"=>"UpDown",
        "tuindex"=>"TuIndex",
        "devtype"=>"DevType",
        "devaddr"=>"DevAddr"

    );
    getrows($query,$params,$conn);
}