<?php
    //系统参数——————风机控制参数
    include_once ('common.php');
    $itype=isset($_GET['itype'])?$_GET['itype']:"";
    $name=isset($_GET['name'])?$_GET['name']:"";   //$name 为COVI1 或COVI2    或洞内
    if($itype == 1 && !empty($name) ){
        $file=parse_ini_file("../../FJ.ini",true);
        if(isset($file[$name]))          //如果配置文件中含有这个控制
        {
            $result=$file[$name];
        }else
        {
            $result = array();
            foreach ($file["COVI1"] as  $key => $value){
                if($key == "c1hint") $result[strtolower($key)]= "1";  //特殊的值为1
                elseif($key == "c2hint") $result[$key]= "1";
                elseif($key == "c3hint") $result[$key]= "1";
                else $result[strtolower($key)]= "0";  //空的为0 返回
            }
        }
        $result['fjintal']=$file['Config']['FJintal'];
        echo json_encode($result);
    }
    //系统参数——————照明控制参数
    if($itype == 2 && !empty($name)){
        $file=parse_ini_file("../../ZM1.ini",true);
        $result = array();
        foreach ($file[$name] as $key => $value ){
            if($value == "") $result[strtolower($key)] = "0";
            else $result[strtolower($key)]=$value;
        }
        $result["use1"] = empty($file[$name."晴天"]["Use"])?"0":$file[$name."晴天"]["Use"];
        $result["hint1"] = empty($file[$name."晴天"]["Hint"])?"0":$file[$name."晴天"]["Hint"];
        $result["use2"] = empty($file[$name."阴天"]["Use"])?"0":$file[$name."阴天"]["Use"];
        $result["hint2"] = empty($file[$name."阴天"]["Hint"])?"0":$file[$name."阴天"]["Hint"];
        $result["use3"] = empty($file[$name."晚上"]["Use"])?"0":$file[$name."晚上"]["Use"];
        $result["hint3"] = empty($file[$name."晚上"]["Hint"])?"0":$file[$name."晚上"]["Hint"];
        $result["use4"] = empty($file[$name."夜间"]["Use"])?"0":$file[$name."夜间"]["Use"];
        $result["hint4"] = empty($file[$name."夜间"]["Hint"])?"0":$file[$name."夜间"]["Hint"];
        $result["zmintal"] = empty($file["Config"]["ZMintal"])?"1":$file["Config"]["ZMintal"];
        echo json_encode($result);
    }

?>