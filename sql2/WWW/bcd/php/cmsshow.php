    <?php
    require("common.php");
    $type        = $_GET["itype"];
    $id          = str_replace("10000", "", $_GET["id"]);
    $path        = "../localcms/" . $id . "/play2.lst";
    $path_img    = "bcd/localcms/" . $id . "/";
    $picname     = isset($_GET["picname"]) ? str_replace("图片", "", $_GET["picname"]) : "";
    $font_styles = array(
        "h" => "SimHei",                  //黑体
        "k" => "KaiTi",                  //楷体
        "s" => "SimSun",                  //宋体
        "f" => "FangSong",                //仿宋
    );

    //修改
    if ($itype == 1) {

        $path   = "../localcms/" . $id . "/play.lst";
        $play   = parse_ini_file($path, true);
        $item   = $_GET["item"];
        $act    = $_GET["act"];
        $check  = isset($_GET["check"]) ? $_GET["check"] : "";
        $upfile = $play ["playlist"]["item" . $item];
        $upfile = explode(",", $upfile);

        //act 值 0=stoptime,1=check,2=speed,3=pic name,4picx,5=fontcolor,6font style,7font content,8fontx,9fontsize

        if ($act == 0) {
            $upfile[0] = intval($check / 10);
        } elseif ($act == 1) {
            $upfile[1] = $check;
        } elseif ($act == 2) {
            $upfile[2] = $check;
        } elseif ($act == 3) {
            # code...
            $check = explode(".", $check);
            $upfile["3"];
            $update   = explode("\\", $upfile["3"]);
            $practise = 1;
            foreach ($update as $key => $value) {
                if (strpos($value, 'B') !== false && strlen($value) === 4) {
                    $num1 = substr($value, 0, 1);
                    $num2 = substr($value, 1, 4);
                    if ($picname == $practise) {
                        $update[$key] = $num1 . $check[0];
                    }
                    $practise += 1;
                }
            }
            $upfile["3"] = implode($update, "\\");
        } elseif ($act == 4) {
            //pic x
            $upfile["3"];
            $update   = explode("\\", $upfile["3"]);
            $practise = 1;
            foreach ($update as $key => $value) {
                if (strpos($value, 'C') !== false && strlen($value) === 7) {
                    $num1 = substr($value, 0, 1);
                    $num2 = substr($value, 1, 4);
                    $num3 = substr($value, 4, 6);
                    if (strlen($check) == 3 && $picname == $practise) {
                        $update[$key] = $num1 . $check . $num3;
                    } else if (strlen($check) == 2 && $picname == $practise) {
                        $update[$key] = $num1 . "0" . $check . $num3;
                    } else if (strlen($check) == 1 && $picname == $practise) {
                        $update[$key] = $num1 . "00" . $check . $num3;
                    }
                    $practise += 1;
                }
            }
            $upfile["3"] = implode($update, "\\");

        } elseif ($act == 10) {
            //pic y
            $upfile["3"];
            $update   = explode("\\", $upfile["3"]);
            $practise = 1;
            foreach ($update as $key => $value) {
                if (strpos($value, 'C') !== false && strlen($value) === 7) {
                    $num1 = substr($value, 0, 1);
                    $num2 = substr($value, 1, 3);
                    $num3 = substr($value, 4, 6);
                    if (strlen($check) == 2 && $picname == $practise) {
                        $update[$key] = $num1 . $num2 . "0" . $check;
                    } else if (strlen($check) == 1 && $picname == $practise) {
                        $update[$key] = $num1 . $num2 . "00" . $check;
                    } else if (strlen($check) == 3 && $picname == $practise) {
                        $update[$key] = $num1 . $num2 . $check;
                    }
                    $practise += 1;
                }
            }
            $upfile["3"] = implode($update, "\\");

        } elseif ($act == 5) {
            //fontcolor
            $upfile["3"];
            $update = explode("\\", $upfile["3"]);
            foreach ($update as $key => $value) {
                if (strpos($value, "f") !== false && strlen($value) === 10) {
                    $update[$key - 1] = $check;
                }
            }
            $upfile["3"] = implode($update, "\\");
        } elseif ($act == 12) {
            //backcolor
            $upfile["3"];
            $update = explode("\\", $upfile["3"]);
            foreach ($update as $key => $value) {
                if (strpos($value, "f") !== false && strlen($value) === 10) {
                    $update[$key - 2] = $check;
                }
            }
            $upfile["3"] = implode($update, "\\");
        } elseif ($act == 6) {
            //fontstyle
            $upfile["3"];
            $update = explode("\\", $upfile["3"]);
            foreach ($update as $key => $value) {
                if (strpos($value, "f") !== false && strlen($value) === 10) {
                    $finsh        = substr($value, 2, 8);
                    $star         = substr($value, 0, 1);
                    $between      = array_search($check, $font_styles);
                    $update[$key] = $star . $between . $finsh;
                }
            }
            $upfile["3"] = implode($update, "\\");
        } elseif ($act == 7) {
            //内容
            $upfile["3"];
            $update = explode("\\", $upfile["3"]);
            $check  = $_POST["check"];
            $check  = str_replace("\r", "<br>", $check);
            $check  = str_replace("\n", "<br>", $check);
            foreach ($update as $key => $value) {
                if (strpos($value, "f") !== false && strlen($value) === 10) {
                    $update[$key + 1] = $check;
                }
            }
            $upfile["3"] = implode($update, "\\");
        } elseif ($act == 8) {
            //fontx
            $upfile["3"];
            $update = explode("\\", $upfile["3"]);
            foreach ($update as $key => $value) {
                if (strpos($value, "f") !== false && strlen($value) === 10) {
                    $num1 = substr($value, 0, 4);
                    $num2 = substr($value, 4, 3);
                    $num3 = substr($value, 7, 3);
                    if (strlen($check) == 3) {
                        $update[$key] = $num1 . $check . $num3;
                    } else if (strlen($check) == 2) {
                        $update[$key] = $num1 . "0" . $check . $num3;
                    } else if (strlen($check) == 1) {
                        $update[$key] = $num1 . "00" . $check . $num3;
                    } else {
                        echo $error3;
                    }
                }
            }
            $upfile["3"] = implode($update, "\\");
        } else if ($act == 9) {
            //fontsize
            $upfile["3"];
            $update = explode("\\", $upfile["3"]);
            foreach ($update as $key => $value) {
                if (strpos($value, "f") !== false && strlen($value) === 10) {
                    $num1         = substr($value, 0, 2);
                    $num2         = substr($value, 4, 6);
                    $update[$key] = $num1 . $check . $num2;
                }
            }
            $upfile["3"] = implode($update, "\\");
        } elseif ($act == 11) {
            //fonty
            $upfile["3"];
            $update = explode("\\", $upfile["3"]);
            foreach ($update as $key => $value) {
                if (strpos($value, "f") !== false && strlen($value) === 10) {
                    $num1 = substr($value, 0, 4);
                    $num2 = substr($value, 4, 3);
                    $num3 = substr($value, 7, 3);
                    if (strlen($check) == 3) {
                        $update[$key] = $num1 . $num2 . $check;
                    } else if (strlen($check) == 2) {
                        if (preg_match_all('/[-]/', $check)) {
                            $check1       = substr($check, 0, 1);
                            $check2       = substr($check, 1, 1);
                            $update[$key] = $num1 . $num2 . $check1 . "0" . $check2;
                        } else {
                            $update[$key] = $num1 . $num2 . "0" . $check;
                        }
                    } else if (strlen($check) == 1) {
                        $update[$key] = $num1 . $num2 . "00" . $check;
                    } else {
                        echo $error3;
                    }
                }
            }
            $upfile["3"] = implode($update, "\\");
        }
        $upfiles                           = implode($upfile, ",");
        $play ["playlist"]["item" . $item] = $upfiles;
        $wres                              = write_ini_file($play, $path, $has_sections = true);
        if ($wres) {
            echo $success5;
        }
    } //读取
    elseif ($type == 2) {
        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);
        // $play["playlist"]["item0"] = iconv("GBK","UTF-8", $play["playlist"]["item0"]);
        $fonf[1]    = "";
        $font_color = "";
        //动作数量
        $major = 0;
        $back_color = "";
        foreach ($play["playlist"] as $key => $value) {
            $nump = 0;
            $numc = 1;
            if ($key == "item_no") {
                continue;
            }
            $item = explode("\\", $value);

            foreach ($item as $k => $v) {
                if (strpos($item[$k], 'C') !== false && strlen($v) === 7) {
                    $cx[$nump] = substr($item[$k], 1, 3);
                    $cy[$nump] = substr($item[$k], 4, 6);
                } else if (strpos($v, 'B') !== false && strlen($v) === 4) {
                    $picname[$nump]   = $path_img . str_replace("B", "", $v) . ".bmp";
                    $uppicpath[$nump] = str_replace("B", "", $v) . ".bmp";
                    $nump             += 1;
                } else if (strpos($v, "f") !== false && strlen($v) === 10) {
                    $fonf[$numc]    = $font_styles[substr($v, 1, 1)];
                    $content[$numc] = $item[$k + 1];
                    preg_match_all('/[-]?\d+/', $v, $arr);
                    $font_style[$numc] = join('', $arr[0]);
                    $font_color        = $item[$k - 1];
                    $back_color        = $item[$k - 2];
                    $numc              += 1;
                } else if (strpos($v, "c") !== false && strlen($v) === 13) {
                    $color = $v;
                }
            }
            $base = explode(",", $item[0]);

            $result[$major] = array(
                "place"      => 1,                                                                     //上下的停止位置
                "rate"       => 10,                                                                    //频率
                "check"      => isset($base[1]) ? intval($base[1]) : "",                               //"左右上下"  运动轨迹
                "content"    => isset($content[1]) ? $content[1] : "",                                 //内容1
                "content2"   => isset($content[2]) ? $content[2] : "",                                                           //内容2
                "size"       => isset($font_style[1]) ? substr($font_style[1], 0, 2) : "",                         //字体大小
                "fontx"      => isset($font_style[1]) ? substr($font_style[1], 2, 3) : "",                         //字体x
                "fonty"      => isset($font_style[1]) ? substr($font_style[1], 5, 3) : "",                         //字体y
                "speed"      => $base[2] / 100,                        //字体速度
                "stoptime"   => $base[0] * 10,                          //停止时间
                "stopplace"  => 1,                                       //左右的停止位置    1 居中
                "picpath"    => $picname,                                //图片地址
                "picx"       => $cx,                                    //图片位置
                "picy"       => $cy,                                    //图片位置
                "font_color" => $font_color,                             //字体颜色
                "back_color" => $back_color,                             //背景颜色
                "font_style" => $fonf[1],                                //字体样式
                "uppicpath"  => $uppicpath                               //图片的位置

            );

            $major      += 1;
            $base       = "";
            $picname    = "";
            $color      = "";
            $font_style = "";
            $content    = "";
        }

        $arr = array('count' => $play["playlist"]["item_no"], "data" => $result);
        echo json_encode($arr);
    } //增加
    else if ($type == 3) {
        //图片内容
        $item = $_GET["item"];
        $act  = $_GET["act"];
        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);
        //添加图片
        if ($act == "addpic") {
            $picx    = "C000000";
            $picname = "B000";

            $item_no = explode(",", $play["playlist"]["item" . $item]);
            $str     = explode("\\", $item_no[3]);

            array_push($str, $picx);
            array_push($str, $picname);

            $res                               = implode($str, "\\");
            $item_no[3]                        = $res;
            $upfiles                           = implode($item_no, ",");
            $play ["playlist"]["item" . $item] = $upfiles;
            $wres                              = write_ini_file($play, $path, $has_sections = true);
        } //删除图片
        else if ($act == "delpic") {
            $picname = isset($_GET["picname"]) ? str_replace("图片", "", $_GET["picname"]) : "";

            $item_no = explode(",", $play["playlist"][$item]);

            $str    = explode("\\", $item_no[3]);
            $picnum = 1;

            foreach ($str as $key => $value) {
                if (strpos($str[$key], 'C') !== false && strlen($value) === 7) {
                    if ($picnum == $picname) {
                        $keyvalue = $key;
                        unset($str[$key]);
                    }
                    $picnum += 1;
                }
            }
            unset($str[$keyvalue + 1]);
            $res                      = implode($str, "\\");
            $item_no[3]               = $res;
            $upfiles                  = implode($item_no, ",");
            $play ["playlist"][$item] = $upfiles;
            $wres                     = write_ini_file($play, $path, $has_sections = true);
        }
        if ($wres) {
            echo $success5;
        }
    } //整个动作的删除或添加
    else if ($type == 4) {

        $item = $_GET["item"];

        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);

        unset($play["playlist"][$item]);
        $play["playlist"]["item_no"] = count($play["playlist"]) - 1;
        $wres                        = write_ini_file($play, $path, $has_sections = true);

        if ($wres) {
            echo $success5;
        }
    } else if ($type == 5) {
        $item = $_GET["item"];

        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);

        $play["playlist"][$item]     = "190,4,40,\\C000000\\B002\\C100000\\B003\\#000000\\#ba3128\\fk30040000\\测试";
        $play["playlist"]["item_no"] = count($play["playlist"]) - 1;
        $wres                        = write_ini_file($play, $path, $has_sections = true);

        if ($wres) {
            echo $success5;
        }
    } else if ($type == 6) {
        $item = $_GET["item"];

        $path = "../localcms/" . $id . "/play.lst";
        $play = parse_ini_file($path, true);

        $play["playlist"][$item]     = "190,4,40,\\C000000\\B002";
        $play["playlist"]["item_no"] = count($play["playlist"]) - 1;
        $wres                        = write_ini_file($play, $path, $has_sections = true);

        if ($wres) {
            echo $success5;
        }
    } //取出所有图片
    else if ($type == 7) {
        $item = $_GET["item"];
        $cid  = $_GET["cid"];
        $path = "../localcms/" . $id . "/";
        $num  = 0;
        for ($i = 0; $i < 30; $i++) {
            $numbi   = substr("00" . $i, (strlen("00" . $i) - 3));
            $picname = $numbi . ".bmp";
            if (file_exists($path . $picname)) {
                $result[$num] = "bcd/localcms/" . $id . "/" . $picname;
                $num          += 1;
            }
        }
        success($result, $num);
    }

    ?>