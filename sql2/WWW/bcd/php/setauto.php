<?php
  //系统信息 ------------照明控制参数设置               ----风机控制参数设置
    include_once ("common.php");
    $itype = empty($_GET["itype"]) ? "":$_GET["itype"];
    session_start();
    $result = array("result"=>0 ,"msg"=>"");
    if(isset($_SESSION["uid"] )){
        if($itype == 1){                        //1 风机   2 光照
            $path = "../../FJ.ini";
            $fj = parse_ini_file($path,true);      //把配置文件读取出来 放入$fj
            $name = $_GET["name"];
            foreach ($fj["COVI1"] as  $key => $value){                //单独更改 $fj[name] 里的数据
                $fj[$name][$key] = isset($_GET[strtolower($key)]) ? $_GET[strtolower($key)] : "" ;
            }

            $fj["Config"]["FJintal"] = intval($_GET["fjintal"]);
            $wres = write_ini_file($fj, $path, $has_sections = true);
            if($wres){
                $query = "insert into SysLog(FUserID,FDT,FInfo,FType,FMemo) values ('".$_SESSION["uid"]."',GETDATE(),'修改通风控制方案判断阀值','7','')";
                $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
            }

        }elseif ($itype == 2){                 //2 光照

           $path = "../../ZM1.ini";
           $fj = parse_ini_file($path,true);                 //把配置文件读取出来 放入$fj
           $name = $_GET["name"];
           foreach ($fj["光强1"] as  $key => $value){                         //单独更改 $fj[name] 里的数据
              $fj[$name][$key] = isset($_GET[strtolower($key)]) ? $_GET[strtolower($key)] : 0 ;
           }
           $time = array("晴天","阴天","晚上","夜间");
           for($i=0;$i<count($time);$i++){
              $fj[$name.$time[$i]]["Use"] = $_GET["use".($i+1)];
              $fj[$name.$time[$i]]["Hint"] = $_GET["hint".($i+1)];
           }
           if(!empty($_GET["zmintal"]) && $_GET["zmintal"] >0){                   //更改fj【config】
               $fj["Config"]["ZMintal"] = $_GET["zmintal"];
           }
            $wres = write_ini_file($fj, $path, $has_sections = true);                       //写入配置文件
            if($wres){
                //写入日志
                $query = "insert into SysLog(FUserID,FDT,FInfo,FType,FMemo) values ('".$_SESSION["uid"]."',GETDATE(),'修改照明控制方案判断阀值','4','')";
                $sql = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static'));
            }
        }
        if($wres) {
            $result["result"] = 1;
            $result["msg"] = "修改成功";
            echo json_encode($result);
        }else if(!$sql) {
            $result["result"] = 1;
            $result["msg"] = "修改成功,写入日志失败";
            echo json_encode($result);
        }
    }else{
        $result["msg"] = "未登录不可操作";
        echo json_encode($result);
    }