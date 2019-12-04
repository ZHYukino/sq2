<?php
 //系统日期  ------- 日志查询

    include_once ("common.php");
    $itype = empty($_GET["itype"]) ? "": $_GET["itype"] ;
    $date1 = empty($_GET["date1"]) ? "": $_GET["date1"];  //初始日期
    if(empty($date1)){
        echo  "参数错误";
        exit();
    }
    $date2 = empty($_GET["date2"]) ? "": $_GET["date2"];   //结束日期
    //按年月日查询
    if ($itype == 1 && $date1 !="" && $date2!= "") {
        if( !checkday($date1) || !checkday($date2)  ) {       //检查日期
            echo  $error12;
            die();
        }
        $query = "select  top 1000 a.*,CONVERT(varchar(19),a.FDT,120) as DTime,b.FEName from SysLog as a left join S_UserInfo as b on a.FUserID = b.FID where 1=1 and a.FDT>='".date("Y-m-d H:i:s",strtotime($date1 ))."' and a.FDT<='".date("Y-m-d H:i:s",strtotime( "+1 day", strtotime($date2)))."'order by a.FDT desc";

    //按年月查询
    }else if ($itype == 2 && $date1 !=""){
        $start = $date1."-01";
        $finish = $date1."-31";
        if( !checkday($start)  ) {          //检查日期
            echo  $error12;
            die();
        }
        $query = "select  top 1000 a.*,CONVERT(varchar(19),a.FDT,120) as DTime,b.FEName from SysLog as a left join S_UserInfo as b on a.FUserID = b.FID where 1=1 and a.FDT>='".date("Y-m-d H:i:s",strtotime($start))."' and a.FDT<='".date("Y-m-d H:i:s",strtotime("+1 day", strtotime($finish)))."'order by a.FDT desc";

            //按年查询
    }elseif ($itype == 3 && $date1 !=""){
        $start = $date1."-01-01";
        $finish = $date1."-12-31";
        if( !checkday($start) ) {           //检查日期
            echo  $error12;
            die();
        }
        $query = "select  top 1000 a.*,CONVERT(varchar(19),a.FDT,120) as DTime,b.FEName from SysLog as a left join S_UserInfo as b on a.FUserID = b.FID where 1=1 and a.FDT>='".date("Y-m-d H:i:s",strtotime($start))."' and a.FDT<='".date("Y-m-d H:i:s",strtotime("+1 day", strtotime($finish)))."'order by a.FDT desc";

    }else{
       echo  "参数错误";
       die();
    }
   
    $params = array(
        "logAccounts"=>"FEName",
        "logTime"=>"DTime",
        "logContent"=>"FInfo",
        "logRemarks"=>"FMemo"
    );
    getrow_use($query,$params,$conn);
?>