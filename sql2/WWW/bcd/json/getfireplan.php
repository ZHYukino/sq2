<?php
//火灾计划
include_once ('common.php');
$itype=isset($_GET['itype'])?$_GET['itype']:"";
if($itype == 1)
{
    $query = "select * from  FirePlan where Enabled = 1";
    $params = array(
        'id'=>"FID",
        'tunnel'=> "Tunnel",
        'updown'=> "UpDown",
        'led'=> "LED",
        'fan'=>"FAN",
        'door'=>"DOOR",
        'fb'=> "FB",
        'ls'=> "LS",
        'ts'=>"TS",
        'name'=>"Name",
        'sendtext'=>"SendText",
        'textformat'=>"TextFormat"
    );
   getrows($query,$params,$conn2);
}