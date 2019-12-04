    <?php
    require("common.php");
    $type = $_GET["itype"];
    $id = str_replace("10000","",$_GET["id"]);
    $path = "../localcms/".$id."/play2.lst";
    $path_img = "bcd/localcms/".$id."/";
    if($type == 1){
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
	}elseif ($type == 2) {
		$font_styles = array(
	            "h" => "SimHei ",                   //黑体
	            "k" => "KaiTi ",                  //楷体
	            "s" => "SimSun",                  //宋体
	            "f" => "FangSong",                //仿宋
	        );
        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);
        // $play["playlist"]["item0"] = iconv("GBK","UTF-8", $play["playlist"]["item0"]);
        
        $major = 0;
        foreach ($play["playlist"] as $key => $value) {
        	 $nump = 0;
        	 $numc = 1;
        	if($key == "item_no"){
        		continue;
        	}
        	$item = explode("/", $value);
        	
        	foreach ($item as $k => $v) {
        		if(strpos($item[$k],'C') !== false && strlen($v) === 4){
	        		$cx[$nump] = substr($item[$k], 1,3);
	        		
	        		// $cy[$nump] = substr($item[$k], 4,6);
        		}else if(strpos($v,'B') !== false && strlen($v) === 4 ){ 
        			$picname[$nump] = $path_img.str_replace("B", "", $v).".bmp";
        			$uppicpath[$nump] = str_replace("B", "", $v).".bmp";
        			$nump += 1;
        		}else if(strpos($v, "f") !== false && strlen($v) === 7){
        			$fonf[$numc] = $font_styles[substr($v, 1,1)];

        			$content[$numc] = $item[$k+1];
        			// $result[$major]["content".$numc] = $content[$numc]; 
					preg_match_all('/\d+/',$v,$arr);
					$font_style[$numc] = join('',$arr[0]);
					$numc += 1;
        		}else if(strpos($v, "c") !== false && strlen($v) === 13){
        			$color = $v;
        		} 	
        	}

        	$base = explode(",", $item[0]);
        	
        	$result[$major] = array(
				"place" => 1,               					//上下的停止位置
	            "rate" => 10,                              		 //频率
	            "check" =>  isset($base[1]) ? intval($base[1]) :"",             			 //"左右上下"  运动轨迹
	            "content" => isset($content[1]) ? $content[1] :"",                   //内容1
	            "content2" => isset($content[2]) ? $content[2] :"",                           //内容2
	            "size" =>isset($font_style[1]) ? substr(intval($font_style[1]), 0,2)  : "",                      //字体大小
	            "fontx" =>isset($font_style[1]) ? substr(intval($font_style[1]), 2,4)  : "",                      //字体大小
	            "speed" => $base[2] / 100,         				//字体速度
	            "stoptime" => $base[0]*10,            				//停止时间
	            "stopplace" => 1,              //左右的停止位置    1 居中
	            "picpath" =>  $picname,                  //图片地址
	            "picx"=> $cx,
	            "font_color" =>"red",//$color,                		 //字体颜色
	            "font_style" =>$fonf[1],  					 //字体样式
	            "uppicpath" =>$uppicpath

        	);

        	$major += 1;
        	$base = "";
        	$picname ="";
        	$color = "";
        	$font_style="";
        	$content="";
        }

        // print_r($result);die();

       $arr = array('count' => $play["playlist"]["item_no"],"data"=>$result);
       echo json_encode($arr);
	}
	
    ?>