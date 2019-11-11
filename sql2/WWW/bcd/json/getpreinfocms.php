<?php
    require_once  ('common.php');
    $itype=isset($_GET['itype'])?$_GET['itype']:"";
    if($itype==1){
        $query = "Select * from preinfocms where enable=1 order by preinfoid desc";
        $params = array(
            "preinfoid" =>"PreinfoID",
            "preinfocontent" => "PreinfoContent"
        );
        getrows($query,$params,$conn);
    }
    elseif ($itype ==2){
        $index = $_GET["start"];
        $pageSize = $_GET["limit"];
        $query = "Select preinfoid,preinfocontent from preinfocms where enable=1";
        $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
        $rowsnum = sqlsrv_num_rows($sql);//查询的数量
        if($rowsnum == 0){
            $result = array("results" =>"0","rows"=>"");
            echo json_encode($result);
        }
    }
