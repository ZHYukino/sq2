<?php
    //查询光强             时间

    include_once ("common.php");
    $itype = empty($_GET["itype"]) ? "": $_GET["itype"] ;
    $date1 = empty($_GET["date1"]) ? "": $_GET["date1"];  //初始日期
    $date2 = empty($_GET["date2"]) ? "": $_GET["date2"];   //结束日期
    $devid = empty($_GET["devid"]) ? "": $_GET["devid"];   //设备id
    if(!empty($devid))   $devid="a.FPLCDevID=".$devid."and";

    if($itype == 1 && !empty($date1) && !empty($date2)){
        if( !checkday($date2) ) {       //检查日期
            echo  $error12;
            die();
        }
    }
    else if($itype == 2 && !empty($date1)){
        $date2 = $date1."-31";
        $date1 = $date1."-01";
    }else if($itype == 3 && !empty($date1)){
        $date2 = $date1."-12-31";
        $date1 = $date1."-01-01";
    }else {
        echo  "参数错误";
        die();
    }

    if( !checkday($date1)  ) {       //检查日期
        echo  $error12;
        die();
    }
    $query = "select top 1000 a.FnValue,a.FnValue1,b.FCName,b.FEName,a.FID,CONVERT(varchar(19),a.FDT,120) as DTime from  PLCDevStateLog  as a left join   PLCDevInfo as b  on a.FPLCDevID=b.FID where  FTypeID='4' and  $devid a.FDT>='".date("Y-m-d H:i:s",strtotime($date1))."' and a.FDT<='".date("Y-m-d H:i:s",strtotime("+1 day",strtotime($date2)))."'order by a.FDT desc";

    $parmas = array(
        'colltime'=>"DTime",
        'outval'=>"FnValue1",
        'inval'=>"FnValue",
        'cname'=>"FCName",
        'ename'=>"FEName"
    );
    getrow_use($query,$parmas,$conn2);