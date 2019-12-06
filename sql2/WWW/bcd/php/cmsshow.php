    <?php
    require("common.php");
    $type = $_GET["itype"];
    $id = str_replace("10000","",$_GET["id"]);
    $path = "../localcms/".$id."/play2.lst";
    $path_img = "bcd/localcms/".$id."/";
   	$picname = isset($_GET["picname"])  ? str_replace("图片", "", $_GET["picname"]) : "";
   	$font_styles = array(
            "h" => "SimHei",                  //黑体
            "k" => "KaiTi",                  //楷体
            "s" => "SimSun",                  //宋体
            "f" => "FangSong",                //仿宋
	     	);
   
    //修改
    if($itype == 1){

        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);
        $check = $_GET["check"];
        $item = $_GET["item"];
        $act = $_GET["act"];
        $check = $_GET["check"];
        $upfile = $play ["playlist"]["item".$item];
        $upfile = explode(",", $upfile);
   
        //act 值 0=stoptime,1=check,2=speed,3=pic name,4picx,5=fontcolor,6font style,7font content,8fontx,9fontsize

        if($act == 0){
        	$upfile[0] = intval($check/10);
        }elseif ($act == 1) {
        	$upfile[1] = $check;
        }elseif ($act == 2) {
        	$upfile[2] = $check;
        }elseif ($act == 3) {
        	# code...
        	$check = explode(".", $check);
        	$upfile["3"];
        	$update = explode("/",  $upfile["3"]);
        	$practise = 1;
        	foreach ($update as $key => $value) {
        		if(strpos($value,'B') !== false && strlen($value) === 4 ){
        			$num1 = substr($value, 0,1);
        			$num2 = substr($value, 1,4);
        			if($picname == $practise ){
        				$update[$key] = $num1.$check[0];
        			}
        			$practise += 1;
        		}
        	}
        	$upfile["3"]= implode($update, "/");
        }elseif ($act == 4){
        	//pic x
        	$upfile["3"];
        	$update = explode("/",  $upfile["3"]);
        	$practise = 1;
        	foreach ($update as $key => $value) {
        		if(strpos($value,'C') !== false && strlen($value) === 4 ){
        			$num1 = substr($value, 0,1);
        			$num2 = substr($value, 1,4);
        			if(strlen($check)==3 && $picname == $practise){
        			 	 $update[$key] = $num1.$check;
        			}else if(strlen($check)==2 && $picname == $practise){
        			 	$update[$key] = $num1."0".$check;
        			}else if(strlen($check)==1 && $picname == $practise) {
        			 	$update[$key] = $num1."00".$check;
        			}
        			$practise += 1;
        		}
        	}
        	$upfile["3"]= implode($update, "/");

        }elseif ($act == 5){
        	//fontcolor
        	$upfile["3"];
        	$update = explode("/",  $upfile["3"]);
        	foreach ($update as $key => $value) {
        		if(strpos($value, "f") !== false && strlen($value) === 7){
       				$update[$key-1] = $check;
        		}
        	}
        	$upfile["3"]= implode($update, "/");
        }elseif ($act == 6){
        	//fontstyle
        	$upfile["3"];
        	$update = explode("/",  $upfile["3"]);
        	foreach ($update as $key => $value) {
        		if(strpos($value, "f") !== false && strlen($value) === 7){
        			$finsh = substr($value, 2,7);
        			$star = substr($value, 0,1);
        			$between =  array_search($check,$font_styles);
        			$update[$key] = $star. $between . $finsh;
        		}
        	}
        	$upfile["3"]= implode($update, "/");
        }elseif ($act == 7){
        	//内容
        	$upfile["3"];
        	$update = explode("/",  $upfile["3"]);
        	foreach ($update as $key => $value) {
        		if(strpos($value, "f") !== false && strlen($value) === 7){
        			 $update[$key+1] =  $check ;
        		}
        	}
        	$upfile["3"]= implode($update, "/");
        }elseif ($act == 8){
        	//fontx
        	$upfile["3"];
        	$update = explode("/",  $upfile["3"]);
        	foreach ($update as $key => $value) {
        		if(strpos($value, "f") !== false && strlen($value) === 7){
        			 $num1 = substr($value, 0,4);
        			 $num2 = substr($value, 4,7);
        			 if(strlen($check)==3){
        			 	 $update[$key] = $num1.$check;
        			 }else if(strlen($check)==2){
        			 	$update[$key] = $num1."0".$check;
        			 }else if(strlen($check)==1){
        			 	$update[$key] = $num1."00".$check;
        			 }else{
        			 	echo  $error3;
        			 }
        		}
        	}
        	$upfile["3"]= implode($update, "/");
        }elseif ($act == 9){
        	//fontsize
        	$upfile["3"];
        	$update = explode("/",  $upfile["3"]);
        	foreach ($update as $key => $value) {
        		if(strpos($value, "f") !== false && strlen($value) === 7){
        			 $num1 = substr($value, 0,2);
        			 $num2 = substr($value, 4,7);
        			 $update[$key] = $num1.$check.$num2;
        		}
        	}
        	$upfile["3"]= implode($update, "/");
        }
       $upfiles = implode($upfile, ",");
       $play ["playlist"]["item".$item] = $upfiles;
       $wres = write_ini_file($play, $path, $has_sections = true);
    	if($wres){
    		echo $success5;
    	}
    }




    //读取
    elseif ($type == 2) {
        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);
        // $play["playlist"]["item0"] = iconv("GBK","UTF-8", $play["playlist"]["item0"]);
        
        //动作数量
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
        		}
        		else if(strpos($v,'B') !== false && strlen($v) === 4 ){ 
        			$picname[$nump] = $path_img.str_replace("B", "", $v).".bmp";
        			$uppicpath[$nump] = str_replace("B", "", $v).".bmp";
        			$nump += 1;
        		}
        		else if(strpos($v, "f") !== false && strlen($v) === 7){
        			$fonf[$numc] = $font_styles[substr($v, 1,1)];
        			$content[$numc] = $item[$k+1];
					preg_match_all('/\d+/',$v,$arr);
					$font_style[$numc] = join('',$arr[0]);
					$font_color = $item[$k-1];
					$numc += 1;
        		}
        		else if(strpos($v, "c") !== false && strlen($v) === 13){
        			$color = $v;
        		} 	
        	}

        	$base = explode(",", $item[0]);
        	
        	$result[$major] = array(
				"place" => 1,               													//上下的停止位置
	            "rate" => 10,                              		 								//频率
	            "check" =>  isset($base[1]) ? intval($base[1]) :"",             				 //"左右上下"  运动轨迹
	            "content" => isset($content[1]) ? $content[1] :"",                  			 //内容1
	            "content2" => isset($content[2]) ? $content[2] :"",                           						//内容2
	            "size" =>isset($font_style[1]) ? substr(intval($font_style[1]), 0,2)  : "",                     	 //字体大小
	            "fontx" =>isset($font_style[1]) ? substr(intval($font_style[1]), 2,4)  : "",                     	 //字体大小
	            "speed" => $base[2] / 100,         				//字体速度
	            "stoptime" => $base[0]*10,            			//停止时间
	            "stopplace" => 1,              					//左右的停止位置    1 居中
	            "picpath" =>  $picname,                 	 	//图片地址
	            "picx"=> $cx,									//图片位置
	            "font_color" =>$font_color,		         			 //字体颜色
	            "font_style" =>$fonf[1],  						 //字体样式
	            "uppicpath" =>$uppicpath

        	);

        	$major += 1;
        	$base = "";
        	$picname ="";
        	$color = "";
        	$font_style="";
        	$content="";
        }

       $arr = array('count' => $play["playlist"]["item_no"],"data"=>$result);
       echo json_encode($arr);
	}
	

    //增加
    else if($type == 3){
        $item = $_GET["item"];
        $act = $_GET["act"];
        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);
        $item_no = explode(",",$play["playlist"]["item".$item] );
        $str = explode("/", $item_no[3]);
        foreach ($str as $key => $value) {
           if(strpos($value, "f") !== false && strlen($value) === 7){
                echo $value;
           }
        }

    }

    ?>