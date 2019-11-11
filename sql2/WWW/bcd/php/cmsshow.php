    <?php

    $type = $_GET["itype"];
    $id = str_replace("10000","",$_GET["id"]);
    $path = "../localcms/".$id."/play.lst";
    $path_img = "bcd/localcms/".$id."/";
    if(!file_exists($path)){
        $res=array(
          "msg"=> 0,
           "code"=>"暂无文件"
        );
        echo  json_encode($res);
    }else {
        $play_data = parse_ini_file($path, true);
        $cms_run = explode(',', $play_data["cms"]["item0"]);
        $font_style = array(
            "h" => "SimHei ",                   //黑体
            "k" => "KaiTi ",            //楷体
            "s" => "SimSun",                  //宋体
            "f" => "FangSong",                //仿宋
        );
        $pic = trim($cms_run[8]);                 //图片全程  为0的话就不搞图片了
        if ($cms_run[2] <= 2) {
            $cms_run[7] = str_replace("<br>", "&nbsp;&nbsp;&nbsp;&nbsp;", $cms_run[7]);
        }

        if ($type !== null) {
            $arr = array(
                'msg' => "1",
                "data" => array(
                    "place" => intval($cms_run[1]),               //上下的停止位置
                    "rate" => 10,                               //频率
                    "check" => intval($cms_run[2]),              //"左右上下"  运动轨迹
                    "content" => $cms_run[7],                   //内容1
                    "content2" => "",                           //内容2
                    "size" => intval($cms_run[5]),                      //字体大小
                    "speed" => intval($cms_run[3]) / 100,         //字体速度
                    "stoptime" => $cms_run[0] * 10,            //停止时间
                    "stopplace" => intval($cms_run[1]),                  //左右的停止位置    1 居中
                    "picpath" => $path_img. $pic,                  //图片地址
                    "font_color" => $cms_run[6],                 //字体颜色
                    "font_style" => $font_style[$cms_run[4]],   //字体样式
                ),
            );

        }

        if ($pic == "0" || $pic = "") {
            //如果为零，则没有图片，向前台表示无图片
            $arr["data"]["picpath"] = 0;
        }
        echo json_encode($arr);

    }
    ?>