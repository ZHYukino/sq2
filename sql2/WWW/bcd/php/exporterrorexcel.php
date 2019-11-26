<?php
//故障设备列表------------------导出excel 文件
    include_once ("common.php");
// 查出类型名字
    $path = "DevType";
    $json = CurlCalss::curl(6,'',$path);
    $type = json_decode($json,true) ["data"];       //直接取出数据
    $q = $_GET["devtype"];
    $result = array();
    $opt = parse_ini_file("../../opt.ini",true);
    if($_GET["devtype"] == "0"){                    //零  为 全部数据
        //plc 故障设备
        $path = "PLCDevInfo";
        $json = CurlCalss::curl(6,'',$path);
        $state = json_decode($json,true);
        $num = 0;
        foreach( $state["data"] as $k =>$v){
            if($v["istate"]  != 0){
                break;
            }else{
                $result[$num]["state"] = $v["istate"];
                $result[$num]["typename"] = $type[ $v["itypeid"] ]["sename"];
                $result[$num]["scname"] = $v["scname"];
                $result[$num]["devaddr"] = $v["saddr"];
                $result[$num]["tunnel"] = $opt["TuName"] ["Tu".($v["itunnelid"]-1)];
                $num = $num +1;
            }
        }
        // 设备
        $path = "DevInfo";
        $jsons= CurlCalss::curl(5,'',$path);
        $states = json_decode($jsons,true);
        // print_r($states);
        foreach( $states["data"] as $k =>$v ){
            if($v["istate"] !=0 ){
                break;
            }else{
                $result[$num]["state"] = $v["istate"];
                $result[$num]["typename"] = $type[ $v["itypeid"] ]["sename"];
                $result[$num]["scname"] = $v["scname"];
                $result[$num]["devaddr"] = $v["saddr"];
                $result[$num]["tunnel"] = isset($opt["TuName"] ["Tu".($v["itunnelid"]-1)]) ?$opt["TuName"] ["Tu".($v["itunnelid"]-1)] :"";
                $num = $num + 1;
            }
        }
    }elseif ($_GET["devtype"] != "0"){   //不为零为部分数据  plc设备
        if($q < 17){
            $q ="FTypeID=".$q;
            $opt = parse_ini_file("../../opt.ini",true);
            $path = "PLCDevInfo";
            $json = CurlCalss::curl(6,$q,$path);
            $state = json_decode($json,true);
            $num = 0;
            foreach( $state["data"] as $k =>$v){
                if($v["istate"]  != 0){
                    break;
                }else{
                    $result[$num]["typename"] = $type[ $v["itypeid"] ]["sename"];
                    $result[$num]["cname"] = $v["scname"];
                    $result[$num]["devaddr"] = $v["saddr"];
                    $result[$num]["tunnel"] = $opt["TuName"] ["Tu".($v["itunnelid"]-1)];
                    $num = $num +1;
                }
            }
        }else {
            $q ="FTypeID=".$q;
            $num = 0;
            $path = "DevInfo";
            $jsons = CurlCalss::curl(5, $q, $path);
            $states = json_decode($jsons, true);
            foreach ($states["data"] as $k => $v) {
                if ($v["istate"] != 0) {
                    break;
                } else {
                    $result[$num]["typename"] = $type[$v["itypeid"]]["sename"];
                    $result[$num]["cname"] = $v["scname"];
                    $result[$num]["devaddr"] = $v["saddr"];
                    $tu = intval($v["itunnelid"]) - 1;
                    $result[$num]["tunnel"] = isset($opt["TuName"] ["Tu" .$tu]) ?  $opt["TuName"] ["Tu" .$tu] :"" ;
                    $num = $num + 1;
                }
            }
        }
    }
    if(count($result) == 0){
        echo json_encode(array("code"=>-1));
        die();
    }
    $data["rows"] = $result;
    $data["results"] = count($result);
//    print_r($data);die();
    $xls_name = "../../uploadfile/".$_GET['tablename'].".xls";           //存入的文件名
    $file = fopen($xls_name, 'w');
    fwrite($file, iconv('UTF-8','GBK','隧道号')."\t".iconv('UTF-8','GBK','设备名称')."\t".iconv('UTF-8','GBK','设备桩号')."\t".iconv('UTF-8','GBK','设备类别')."\t\n");
    if(count($data["results"]) > 0) {
        for($i=0;$i<$data["results"];$i++){
            fwrite($file, iconv('UTF-8','GBK',$data["rows"][$i]['tunnel'])."\t".iconv('UTF-8','GBK',$data["rows"][$i]['scname'])."\t".iconv('UTF-8','GBK',$data["rows"][$i]['devaddr'])."\t".iconv('UTF-8','GBK',$data["rows"][$i]['typename'])."\n");
        }
    }
    fclose($file);
    $res = array(
        "code"=>1,
        "msg"=>"./uploadfile/".$_GET["tablename"].".xls",
    );
    echo  json_encode($res);
?>


