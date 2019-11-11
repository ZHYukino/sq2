<?php
   // 风速 /风向采集数据   ----- 数据导出execl
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
    $getdata = re_rows($query,$parmas,$conn2);    //结果
    if($getdata["results"] === 0){
        echo json_encode(array("code"=>-1));
        die();
    }

    $xls_name = "../../uploadfile/".$_GET['tablename'].".xls";           //存入的文件名
    $file = fopen($xls_name, 'w');
    fwrite($file, "设备编号\t设备名称\t检测时间\t洞内\t洞外\t\n");

    if(count($getdata["results"]) > 0) {
        for($i=0;$i<$getdata["results"];$i++){
            fwrite($file, iconv('UTF-8','GBK',$getdata["rows"][$i]['ename'])."\t".iconv('UTF-8','GBK',$getdata["rows"][$i]['cname'])."\t".iconv('UTF-8','GBK',$getdata["rows"][$i]['colltime'])."\t".iconv('UTF-8','GBK',$getdata["rows"][$i]['inval'])."\t".iconv('UTF-8','GBK',$getdata["rows"][$i]['outval'])."\t\n");
        }
    }
    fclose($file);
    $res = array(
        "code"=>1,
        "msg"=>"./uploadfile/".$_GET["tablename"].".xls",
    );
    echo  json_encode($res);

