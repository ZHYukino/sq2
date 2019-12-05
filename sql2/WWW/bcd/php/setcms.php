<?php

    require_once ("common.php");
    session_start();

    $rejsondata = array(
      "code"=>"0",
      "data"=>"",
      "msg"=>"未登录不可操作",
    );
    if (!isset($_SESSION["uid"])) {
        echo json_encode($rejsondata);
        die();
    }

    //发送文件方法
     function upcmsfile($filename,$id,$result){
        $userid = "012345";
        //上传播放动作
        $file_name = $filename;
        $furl = "@" . dirname(dirname(__FILE__)) . "\localcms\/" . $id . "\/" . $file_name . "";
        $url = "http://127.0.0.1:8855/CMSOperation0.html?FID=" . $id . "&FUserID=" . $userid . "&FMark=012345";
        $p1 = CurlCalss::usecmsupload($furl, $url);
        if($result){
            echo $p1;
         }else{
            return json_decode($p1,true);
         }
    }

    //获得设备操作
    $actnum = empty($_GET["actnum"]) ? "": $_GET["actnum"] ;
     if ($itype == 1) {
            //上传图片
           $file_tmp = $_FILES['file']["tmp_name"];
           $file_size = $_FILES['file']["size"];
           $file_name = $_FILES['file']["name"];
           $file_name = iconv("UTF-8", "GBK", $file_name);

           //检查
           $ifname = explode(".", $file_name);
           if($ifname != "bmp"){
                die('{"code":-1,"msg":"图片格式错误","count":0,"data":[]}');
           }
           if ($file_size > 10 * 1024 * 1024) return $result["sinfo"] = "文件太大,超过10M。";
         
            //是否存在
            $file_father_path = '../localcms/' . $id . '';
            if (!file_exists($file_father_path)) {
                mkdir($file_father_path);
            }
            $file = move_uploaded_file($file_tmp, '../localcms/' . $id . '/' . $file_name . '');
            if($file){
                //直接发送
                $result = upcmsfile($file_name,$id,false);
                $result["picname"] = $file_name;
                echo json_encode($result);
            }

        }
        //获取数据
        elseif ($itype == 2) {

            $path = "../localcms/" . $id . "/play.lst";
            $play = parse_ini_file($path, true);
            // $play["playlist"]["item0"] = iconv("GBK","UTF-8", $play["playlist"]["item0"]);
            // print_r($play);
            $data = array(
                "0"=>array(
                    "id"=>1,
                    "pid"=>0,
                    "name"=>"play"
                ),
            );
            $num = 1;
            $pid = 1;
           $rule = "/^[f]/";
            foreach ($play["playlist"] as $k=>$v){
                if("item_no" == $k){
                    continue;
                }
               $data[$num]["id"] = $pid + 1;
               $data[$num]["name"] = $k;
               $data[$num]["pid"] = 1;
               $data[$num]["isParent"] = true;
               $num = $num+1;
               $pid = $pid+1;
               $newv = explode(",",$v);
               $shonw = explode("/", $newv[3]);
                // print_r($shonw);
                $picnums = 0;
               foreach ($shonw as $key => $value) {
                    if(strpos($value,'B') !== false && strlen($value) === 4 ){
                        $picnums += 1; 
                        $data[$num]["id"] = $num+1;
                       $data[$num]["name"] ="图片".$picnums;
                       $data[$num]["pid"] = $pid;
                       $num = $num + 1;
                    }else if ( preg_match($rule,$value) ) {
                        $data[$num]["id"] = $num+1;
                       $data[$num]["name"] = "文字";
                       $data[$num]["pid"] = $pid;
                       $num = $num + 1;
                    }
                }
               
            }
        
            echo json_encode($data);

        } //取亮度
        elseif ($itype == 3) {

        } //设置亮度
        elseif ($itype == 4) {
            $result = array(
                'code' => "",
                'light' => '',
                'msg' => "",
            );
            echo json_encode($result);
        }
        // 发送情报板
        elseif ($itype == 5) {
            upcmsfile("play.lst",$id,true);
        }



?>