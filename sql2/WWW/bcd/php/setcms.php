    <?php
    //情报板 cms 的发送 和 cms 的读取 Tree 页面
    require_once("common.php");
    session_start();
    $nowid = isset($_GET["nowid"])?str_replace("10000","",$_GET["nowid"]) : "";
    $rejsondata = array(
        "code" => "0",
        "data" => "",
        "msg"  => "未登录不可操作",
    );
    if (!isset($_SESSION["uid"])) {
        echo json_encode($rejsondata);
        die();
    }
    $userid = $_SESSION["uid"];
    //设置一个随机时间
    $marknum = time();

    //上传文件方法
    function upcmsfile($filename, $id, $marknum)
    {
        $userid = $_SESSION["uid"];
        //上传播放动作
        $file_name = $filename;
        $furl      = "@" . dirname(dirname(__FILE__)) . "\localcms\/" . $id . "\/" . $file_name . "";
        $url       = "http://127.0.0.1:8855/CMSOperation0.html?FID=" . $id . "&FUserID=" . $userid . "&FMark=" . $marknum . "";
        $p1        = CurlCalss::usecmsupload($furl, $url);
        return json_decode($p1, true);
    }

    //获得设备操作
    $actnum = empty($_GET["actnum"]) ? "" : $_GET["actnum"];
    if ($itype == 1) {
        //上传图片
        $file_tmp  = $_FILES['file']["tmp_name"];
        $file_size = $_FILES['file']["size"];
        $file_name = $_FILES['file']["name"];
        $file_name = iconv("UTF-8", "GBK", $file_name);

        //检查
        $ifname = explode(".", $file_name);

        if (end($ifname) != "bmp") {
            die('{"code":-1,"msg":"图片格式错误","count":0,"data":[]}');
        }

        if ($file_size > 10 * 1024 * 1024) return $result["msg"] = "文件太大,超过10M。";

        //是否存在文件
        $file_father_path = '../localcms/' . $id . '';
        if (!file_exists($file_father_path)) {
            mkdir($file_father_path);
        }
        $file = move_uploaded_file($file_tmp, '../localcms/' . $id . '/' . $file_name . '');
        if($file){
            echo '{"code":0,"msg":"上传成功","count":0,"data":[],"picname":"'.$file_name.'"}';
        }
    }
    //cms和tcm获取tree数据
    elseif ($itype == 2) {
        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);
        // $play["playlist"]["item0"] = iconv("GBK","UTF-8", $play["playlist"]["item0"]);
        // print_r($play);
        $data = array(
            "0" => array(
                "id"   => 1,
                "pid"  => 0,
                "name" => "play"
            ),
        );
        $num  = 1;
        $pid  = 1;
        $rule = "/^[f]/";
        foreach ($play["playlist"] as $k => $v) {
            if ("item_no" == $k) {
                continue;
            }
            $data[$num]["id"]       = $pid + 1;
            $data[$num]["name"]     = $k;
            $data[$num]["pid"]      = 1;
            $data[$num]["isParent"] = true;
            $num                    = $num + 1;
            $pid                    = $pid + 1;
            $newv                   = explode(",", $v);
            $shonw                  = explode("\\", $newv[3]);
            $picnums                = 0;
            foreach ($shonw as $key => $value) {
                if (strpos($value, 'B') !== false && strlen($value) === 4) {
                    $picnums            += 1;
                    $data[$num]["id"]   = $num + 1;
                    $data[$num]["name"] = "图片" . $picnums;
                    $data[$num]["pid"]  = $pid;
                    $num                = $num + 1;
                } else if (preg_match($rule, $value)) {
                    $data[$num]["id"]   = $num + 1;
                    $data[$num]["name"] = "文字";
                    $data[$num]["pid"]  = $pid;
                    $num                = $num + 1;
                }
            }

        }
        echo json_encode($data);
    } //取亮度
    elseif ($itype == 3) {
        $idarr = explode(",",$id);
        array_pop($idarr);
        $idarr = implode("|",$idarr);
        $path  = "CMSOperation2Ex";
        $sign  = "FID=" . $idarr . "&FUserID=" . $userid . "&FMark=" . $marknum . "";
        $light = CurlCalss::curl(5, $sign, $path);
        $light = json_decode($light, true);
        $light["seedtime"] = date("H:i:s",  $marknum);

        echo json_encode($light);

    } //设置亮度
    elseif ($itype == 4) {
        $auto     = $_GET["auto"];
        $value    = $_GET["value"];
        $idarr = explode(",",$id);
        array_pop($idarr);
        $idarr = implode("|",$idarr);
        $path  = "CMSOperation3Ex";
        $sign  = "FID=" . $idarr . "&FUserID=" . $userid . "&FMark=" . $marknum .  "&FValueAuto=" . $auto . "&FValue=" . $value . "";
        $light = CurlCalss::curl(5, $sign, $path);
        $light = json_decode($light, true);
        $light["seedtime"] = date("H:i:s",  $marknum);

        echo json_encode($light);
    }

    // 播放获取
    elseif ($itype == 5) {
//        $idarr = explode(",",$id);
//        array_pop($idarr);
//        $idarr = implode("|",$idarr);
//        $path  = "CMSOperation1Ex";
//        $sign  = "FID=" . $idarr . "&FUserID=" . $userid . "&FMark=" . $marknum . "";
//        $light = CurlCalss::curl(5, $sign, $path);
//        $light = json_decode($light, true);
//        $light["seedtime"] = date("H:i:s",  $marknum);
//
//        echo json_encode($light);
    }

    //全选中发送情报板
    else if ($itype == 6){
//        echo "{\"num\":6,\"data\":[{\"iid\":1,\"iresult\":1,\"sinfo\":\"\u6b63\u5728\u4e0a\u4f20\u81f3\u8bbe\u5907\"},{\"iid\":2,\"iresult\":1,\"sinfo\":\"\u6b63\u5728\u4e0a\u4f20\u81f3\u8bbe\u5907\"},{\"iid\":3,\"iresult\":1,\"sinfo\":\"\u6b63\u5728\u4e0a\u4f20\u81f3\u8bbe\u5907\"},{\"iid\":4,\"iresult\":1,\"sinfo\":\"\u6b63\u5728\u4e0a\u4f20\u81f3\u8bbe\u5907\"},{\"iid\":5,\"iresult\":1,\"sinfo\":\"\u6b63\u5728\u4e0a\u4f20\u81f3\u8bbe\u5907\"},{\"iid\":6,\"iresult\":1,\"sinfo\":\"\u6b63\u5728\u4e0a\u4f20\u81f3\u8bbe\u5907\"}],\"seedtime\":\"17:13:40\"}";die();
        $idarr = explode(",",$id);
        array_pop($idarr);
        $idarr = implode("|",$idarr);

        $userid = $_SESSION["uid"];

        //取出图片
        $path = "../localcms/" . $nowid . "/";
        $num  = 0;
        for ($i = 0; $i < 50; $i++) {
            $numbi   = substr("00" . $i, (strlen("00" . $i) - 3));
            $picname = $numbi . ".bmp";
            if (file_exists($path . $picname)) {
                $uploadpics["upload".$num] = "@" . dirname(dirname(__FILE__)) . "\localcms\/" . $nowid . "\/" . $picname;
                $num          += 1;
            }
        }

        //全部上传
         function cmsupload($furl, $url,$arr_header){
            //  初始化
            $ch = curl_init();
            $post_data = $furl;
            curl_setopt($ch, CURLOPT_URL, $url);
            if(!empty($arr_header)){
                curl_setopt($ch, CURLOPT_HTTPHEADER, $arr_header);
            }
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//执行结果是否被返回，0是返回，1是不返回
            curl_setopt($ch, CURLOPT_HEADER, 0);//参数设置，是否显示头部信息，1为显示，0为不显示
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);//设置curl执行超时时间最大是多少
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
            $output = curl_exec($ch);
            //转码
            $output = mb_convert_encoding($output, 'utf-8', 'GBK,UTF-8,ASCII');
            if (curl_exec($ch) === FALSE) {
                echo "<br/>", " curl 错误:" . curl_error($ch);
            }
            curl_close($ch);
            return $output;
        }


        //上传播放动作
        $file_name = "play.lst";
        $uploadpics["upload".$num] = "@" . dirname(dirname(__FILE__)) . "\localcms\/" .  $nowid . "\/" . $file_name . "";

        $url       = "http://127.0.0.1:8855/CMSOperation0Ex.html?FID=" . $idarr . "&FUserID=" . $userid . "&FMark=" . $marknum . "";

        $arr_header[] = "Content-Type:application/json";
        $arr_header[] = "Authorization: Basic ".base64_encode("root:web12345"); //添加头，在data处填写对应账号密码
        $res = cmsupload($uploadpics, $url,$arr_header);
        $res = json_decode($res,true);
        $res["seedtime"] = date("H:i:s",  $marknum);

        echo json_encode($res);
    }


    //获取结果
    else if($itype == 7){
        $time = strtotime($_GET["time"]);
        $curl = new CurlCalss();
        $res = $_GET["res"];
        //播放获取结果
        if($res==6) {
            $data = $curl::curl(5, "FID=" . $_GET["fid"] . "&FMark=" . $time . "", "CMSHow0Ex");
            echo $data;
        }
        //获取亮度结果
        else if($res==3){
            $data = $curl::curl(5, "FID=" . $_GET["fid"] . "&FMark=" . $time . "", "CMSHow2Ex");
            echo $data;
        }
        //设置亮度结果
        else if($res==4){
            $data = $curl::curl(5, "FID=" . $_GET["fid"] . "&FMark=" . $time . "", "CMSHow3Ex");
            echo $data;
        }
        //播放获取
        else if($res==5){
            $data = $curl::curl(5, "FID=" . $_GET["fid"] . "&FMark=" . $time . "", "CMSHow1Ex");
            echo $data;
        }
    }

    ?>