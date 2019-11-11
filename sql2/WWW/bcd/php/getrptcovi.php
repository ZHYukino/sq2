<?php
    //CO/VI 采集数据  ------- COVI检测历史记录

    include_once ("common.php");
    $itype = empty($_GET["itype"]) ? "": $_GET["itype"] ;
    $date1 = empty($_GET["date1"]) ? "": $_GET["date1"];  //初始日期
    if(empty($date1)){
        die("参数错误");
    }
    $date2 = empty($_GET["date2"]) ? "": $_GET["date2"];   //结束日期
    $devid = empty($_GET["devid"]) ? "": $_GET["devid"];   //设备id
    if($devid == "") $devid="";
    else $devid="a.FPLCDevID=".$devid."and";
    //按年月日查询
    if ($itype == 1 && $date1 !="" && $date2!= "") {
        if(!checkday($date1) || !checkday($date2)  ) {       //检查日期
            echo  $error12;
            die();
        }
        $query = "select top 1000 a.FnValue,a.FnValue1,b.FCName,b.FEName,a.FID,CONVERT(varchar(19),a.FDT,120) as DTime from PLCDevStateLog as a left join PLCDevInfo as b on a.FPLCDevID=b.FID  where b.FTypeID='7' and $devid  a.FDT>='".date("Y-m-d H:i:s",strtotime($date1))."' and a.FDT<='".date("Y-m-d H:i:s",strtotime("+1 day",strtotime($date2)))."'order by a.FDT desc";

    //按年月查询
    }elseif ($itype == 2 && $date1 !=""){
        $start = $date1."-01";
        $finish = $date1."-31";
        $query = "select top 1000 a.FnValue,a.FnValue1,b.FCName,b.FEName,a.FID,CONVERT(varchar(19),a.FDT,120) as DTime from PLCDevStateLog as a left join PLCDevInfo as b on a.FPLCDevID=b.FID  where b.FTypeID='7' and $devid  a.FDT>='".date("Y-m-d H:i:s",strtotime($start))."' and a.FDT<='".date("Y-m-d H:i:s",strtotime("+1 day",strtotime($finish)))."'order by a.FDT desc";

        //按年查询
    }elseif ($itype == 3 && $date1 !="") {
        $start = $date1 . "-01-01";
        $finish = $date1 . "-12-31";
        if (!checkday($start)) {//检查日期
            echo $error12;
            die();
        }
        $query = "select top 1000 a.FnValue,a.FnValue1,b.FCName,b.FEName,a.FID,CONVERT(varchar(19),a.FDT,120) as DTime from PLCDevStateLog as a left join PLCDevInfo as b on a.FPLCDevID=b.FID  where b.FTypeID='7' and $devid  a.FDT>='" . date("Y-m-d H:i:s", strtotime($start)) . "' and a.FDT<='" . date("Y-m-d H:i:s", strtotime("+1 day", strtotime($finish))) . "'order by a.FDT desc";
    }elseif ($itype == 4 ){
            ///图标的   没盖好
        $start = date("Y-m-d H:i:s",strtotime("now"));
        $finish = date("Y-m-d H:i:s",strtotime("-1 hours"));
        $query = "select top 1000 a.FnValue,a.FnValue1,b.FCName,b.FEName,a.FID,CONVERT(varchar(19),a.FDT,120) as DTime from PLCDevStateLog as a left join PLCDevInfo as b on a.FPLCDevID=b.FID  where b.FTypeID='7' and $devid  a.FDT>='" . $start . "' and a.FDT<='" . $finish . "'order by a.FDT desc";
        echo $query;
    }else{
        echo  "参数错误";
        die();
    }
    $params = array(
        "colltime"=>"DTime",
        "coval"=>"FnValue",
        "vival"=>"FnValue1",
        "cname"=>"FCName",
        "ename"=>"FEName"
    );
    getrow_use($query,$params,$conn2) ;