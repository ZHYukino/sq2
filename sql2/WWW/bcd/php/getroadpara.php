    <?php

    require_once("common.php");
    $path = "DevInfo";
    $para = CurlCalss::curl(5, '', $path);
    $para = json_decode($para, true);
    $num  = 0;
    foreach ($para["data"] as $k => $v) {
        if ($v["iroadid"] != 1) {
            unset($para["data"][$k]);
        }
    }

    if ($itype == 2) {

        $devstate = CurlCalss::curl(5, '', "DevState");
        $devstate = json_decode($devstate, true);

        //取出气象状态
        $wdstate = CurlCalss::curl(5, "", "DevRealWDData");
        $wdpara  = json_decode($wdstate, true)["data"];
        foreach ($wdpara as $k => $v) {
            $wd[$v["iid"]]["fengsu"]     = $v["fengsu"];
            $wd[$v["iid"]]["fengxiang"]  = $v["fengxiang"];
            $wd[$v["iid"]]["KQwendu"]    = $v["KQwendu"];
            $wd[$v["iid"]]["nengjiandu"] = $v["nengjiandu"];
        }

        //取出车检状态
        $vdstate = CurlCalss::curl(5, "", "DevRealVDData");
        $vdpara  = json_decode($vdstate, true)["data"];
        foreach ($vdpara as $k => $v) {
            for ($i = 1; $i <= 4; $i++) {
                $vd[$v["iid"]]["icount" . $i] = $v["icount" . $i];
                $vd[$v["iid"]]["focc" . $i]   = $v["focc" . $i];
                $vd[$v["iid"]]["fspeed" . $i] = $v["fspeed" . $i];
            }
        }

        //把状态插入数组中
        foreach ($para["data"] as $k => $v) {
            if ($v["itypeid"] == 22) {
                foreach ($wd as $key => $value) {
                    if ($v["iid"] == $key) {
                        $para["data"][$k]["fengsu"]     = $value["fengsu"];
                        $para["data"][$k]["fengxiang"]  = $value["fengxiang"];
                        $para["data"][$k]["KQwendu"]    = $value["KQwendu"];
                        $para["data"][$k]["nengjiandu"] = $value["nengjiandu"];
                    }
                }
            }
            if ($v["itypeid"] == 20) {
                foreach ($vd as $key => $value) {
                    if ($v["iid"] == $key) {
                        for ($i = 1; $i <= 4; $i++) {
                            $para["data"][$k]["icount" . $i] = $value["icount" . $i];
                            $para["data"][$k]["focc" . $i]   = $value["focc" . $i];
                            $para["data"][$k]["fspeed" . $i] = $value["fspeed" . $i];
                        }
                    }
                }
            }
            $para["data"][$k]["state"]  = $devstate["data"][$k]["istate"];
            $para["data"][$k]["ivalue"] = isset($devstate["data"][$k]["ivalue"]) ? $devstate["data"][$k]["ivalue"] : "";
        }

        //插入情报版的xy位置
        $path   = "../../playxy.ini";
        $playxy = parse_ini_file($path, true);


        //插入图片
        foreach ($para["data"] as $k => $v) {
            foreach ($playxy as $key => $value) {
                if ($v["iid"] == $key) {
                    $para["data"][$k]["playx"] = $value["x"];
                    $para["data"][$k]["playy"] = $value["y"];
                }
            }
            $ivalue = empty($v["ivalue"]) ? 1 : $v["ivalue"];
            //cam
            if ($v["itypeid"] == 17) {
                if ($para["data"][$k]["state"] == 0) {
                    $para["data"][$k]["picpath"] = "cam_0_" . $v["ishape"] . "_" . $v["iupdown"] . "_-1.png";
                } else {
                    $para["data"][$k]["picpath"] = "cam_0_" . $v["ishape"] . "_" . $v["iupdown"] . "_" . $ivalue . ".png";
                }
            } elseif ($v["itypeid"] == 18) {
                $para["data"][$k]["picpath"] = "ETHOST2.png";
            } //ET
            elseif ($v["itypeid"] == 19) {
                if ($para["data"][$k]["state"] == 0) $para["data"][$k]["picpath"] = "ET_" . $v["iupdown"] . " _-1.png";
                else         $para["data"][$k]["picpath"] = "ET_" . $v["iupdown"] . "_" . $ivalue . ".png";
            }//VD
            elseif ($v["itypeid"] == 20) {
                if ($para["data"][$k]["state"] == 0) $para["data"][$k]["picpath"] = "vd_" . $v["iupdown"] . "_-1.PNG";
                else         $para["data"][$k]["picpath"] = "vd_" . $v["iupdown"] . "_" . $ivalue . ".PNG";
            }//WD
            elseif ($v["itypeid"] == 22) {
                if ($para["data"][$k]["state"] == 0) $para["data"][$k]["picpath"] = "wd_" . $v["iupdown"] . "_-1.PNG";
                else         $para["data"][$k]["picpath"] = "wd_" . $v["iupdown"] . "_" . $ivalue . ".PNG";
            }//CMS
            elseif ($v["itypeid"] == 23) {
                if ($para["data"][$k]["state"] == 0) $para["data"][$k]["picpath"] = "cms_" . $v["iupdown"] . "_-1.PNG";
                else         $para["data"][$k]["picpath"] = "cms_" . $v["iupdown"] . "_" . $ivalue . ".PNG";
            } elseif ($v["itypeid"] == 25) {
                if ($para["data"][$k]["state"] == 0) $para["data"][$k]["picpath"] = "tcms_" . $v["iupdown"] . "_-1.PNG";
                else         $para["data"][$k]["picpath"] = "tcms_" . $v["iupdown"] . "_" . $ivalue . ".PNG";
            }
        }


        //返回图片和状态
        $data = array(
            "code"  => "1",
            "count" => count($para["data"]),
            "data"  => $para["data"]
        );
        echo json_encode($data);
    }

    $paratype = 1;
    $nums     = 0;
    foreach ($para["data"] as $k => $v) {
        if ($v["itypeid"] != $paratype) {
            $typename[$nums] = $v["itypeid"];
            $paratype        = $v["itypeid"];
            $nums            = $nums + 1;
        }
    }

    if ($itype == 1) {
        $typepic = array(
            "23" => "cms.PNG",
            "25" => "tcms.PNG",
            "17" => "cam.png",
            "18" => "ETHOST.png",
            "19" => "ET.png",
            "20" => "vd.PNG",
            "22" => "wd.PNG",
        );
        $path    = "DevType";
        $type    = CurlCalss::curl(5, '', $path);
        $type    = json_decode($type, true);
        $nnum    = 0;
        foreach ($typename as $k => $v) {
            $result[$nnum]["scname"] = $type["data"][$v]["scname"];
            $result[$nnum]["sename"] = $type["data"][$v]["sename"];
            $result[$nnum]["iid"]    = $type["data"][$v]["iid"];
            $result[$nnum]["pic"]    = "./pic2/" . $typepic[$type["data"][$v]["iid"]];
            $nnum                    = $nnum + 1;
        }

        $data = array(
            "code"  => "1",
            "count" => count($result),
            "data"  => $result
        );
        echo json_encode($data);
    }
