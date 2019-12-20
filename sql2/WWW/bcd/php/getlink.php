<?php
    //$zm  $FJ 都是配置文件信息

    include_once ('common.php');
    $itype = empty($_GET['itype'])?"":$_GET['itype'];   //前台数据
    $name = empty($_GET['name'])?"" :$_GET['name'];
    $total = empty($_GET['total']) ? "":$_GET['total'];
    $tunnel = empty($_GET["tunnel"]) ? "" : $_GET["tunnel"];
    if($itype == 1 && $name !="" ){
        $FJ = parse_ini_file("../../FJ.ini",true);
        $fx = isset($FJ[$name]['fx'])?$FJ[$name]['fx']:"";
        $fxid = isset($FJ[$name]['fxid'])?$FJ[$name]['fxid']:"";  //取不到配置文件中的值 就为空
        $result = array(
            "fx"=>$fx,
            "fxid"=>$fxid,
            "data"=>array()
        );
        if($total>0) {
            for ($i = 0; $i < $total; $i++) {
                $result['data'][$i]['devid'] = $_GET["id" . $i];    //devid = 取到的id值
                if (!isset($FJ[$name]['fj' . $_GET["id" . $i]]) || empty($FJ[$name]['fj' . $_GET["id" . $i]])) {
                    $result['data'][$i]['isselect'] = "0";             //娶不到值为0
                } else {
                    $num = trim($FJ[$name]['fj' . $_GET["id" . $i]]);  //取出配置文件中的参数
                    $result['data'][$i]['isselect'] = $num;
                    }
                }
            }
            echo json_encode($result);
    }

    if($itype == 2 && $name != ""){
        $zm=parse_ini_file("../../ZM".$tunnel.".ini",true);
        $name2 = array( "晴天","阴天","晚上","夜间");
        $result = array();
        for ($i=0;$i<count($name2);$i++){        // $i<count($name2)
            $name3[$i] = $name.$name2[$i];
            for ($u=0;$u<$total;$u++){
               $id_num = $_GET['id'.$u];                       //取出前台传的 id数
               $result[$i][$u]["devid"] = $id_num;
               if(isset($zm[$name3[$i]]["dj".$id_num]))  $result[$i][$u]["isopen"] = $zm[$name3[$i]]["dj".$id_num];
               else $result[$i][$u]["isopen"] = "0";
               if(isset($zm[$name3[$i]]["zm".$id_num]))  $result[$i][$u]["isselect"] = $zm[$name3[$i]]["zm".$id_num];
               else $result[$i][$u]["isselect"] = "0";
            }
        }
        echo json_encode($result);
    }

    if($itype == 3){
        $zm=parse_ini_file("../../ZM".$tunnel.".ini",true);
        $result = array();
        for($i=0;$i<8;$i++){           //ZM.ini文件中八个时间取出来放在$time   循环8次
            $time[$i]="时间".($i+1);
            $result[$i]=array( "use"=>$zm[$time[$i]]["UseTime"] , "hint"=>$zm[$time[$i]]["UseShowHint"]  ,  "time"=>$zm[$time[$i]]["StartTime"] );
           for($u=0;$u<$total;$u++){
               $id_num = $_GET["id".$u];    // 获得的 id 数
               $result[$i]["data"][$u]["devid"] = $id_num;
               $result[$i]["data"][$u]["isopen"] = isset($zm[$time[$i]]["dj".$id_num]) ? $zm[$time[$i]]["dj".$id_num] : "0";
           }
        }
        echo json_encode($result);
    }