<?php

    require_once ("common.php");
    $path = "DevInfo";
    $para = CurlCalss::curl(5,'',$path);
    $para = json_decode($para,true);
    $num = 0;
    foreach ($para["data"] as $k => $v){
        if($v["iroadid"] != 1){
            unset($para["data"][$k]);
        }
    }

    if($itype == 2){
        $devpathes = "DevState";
        $devstate= CurlCalss::curl(5,'',$devpathes);
        $devstate = json_decode($devstate,true);

        //把状态插入数组中
        foreach ($para["data"] as $k=>$v){
            $para["data"][$k]["state"] = $devstate["data"][$k]["istate"];
            $para["data"][$k]["ivalue"] = isset($devstate["data"][$k]["ivalue"]) ? $devstate["data"][$k]["ivalue"] :"";
        }

        //插入图片
        foreach ($para["data"] as $k=>$v){
            $ivalue = empty($v["ivalue"]) ? 1: $v["ivalue"];
            //cam
            if($v["itypeid"] == 17){
                if( $para["data"][$k]["state"] == 0) {
                     $para["data"][$k]["picpath"] = "cam_0_" . $v["ishape"] . "_".$v["iupdown"]."_-1.png";
                }else{
                     $para["data"][$k]["picpath"] = "cam_0_" . $v["ishape"] . "_".$v["iupdown"]."_".$ivalue .".png";
                }
            }
            elseif ($v["itypeid"] == 18){
                $para["data"][$k]["picpath"] ="ETHOST.png";
            } //ET
            elseif ($v["itypeid"] == 19){
                if($para["data"][$k]["state"] == 0)      $para["data"][$k]["picpath"] = "ET_".$v["iupdown"]." _-1.png";
                else         $para["data"][$k]["picpath"] = "ET_".$v["iupdown"]."_".$ivalue.".png";
            }//VD
            elseif ($v["itypeid"] == 20){
                if($para["data"][$k]["state"] == 0)      $para["data"][$k]["picpath"] = "vd_".$v["iupdown"]."_-1.PNG";
                else         $para["data"][$k]["picpath"] = "vd_".$v["iupdown"]."_".$ivalue.".PNG";
            }//WD
            elseif ($v["itypeid"] == 22){
                if($para["data"][$k]["state"] == 0)      $para["data"][$k]["picpath"] = "wd_".$v["iupdown"]."_-1.PNG";
                else         $para["data"][$k]["picpath"] = "wd_".$v["iupdown"]."_".$ivalue.".PNG";
            }//CMS
            elseif ($v["itypeid"] == 23){
                if($para["data"][$k]["state"] == 0)      $para["data"][$k]["picpath"] = "cms_".$v["iupdown"]."_-1.PNG";
                else         $para["data"][$k]["picpath"] = "cms_".$v["iupdown"]."_".$ivalue.".PNG";
            }
            elseif ($v["itypeid"] == 25){
                if($para["data"][$k]["state"] == 0)      $para["data"][$k]["picpath"] = "tcms_".$v["iupdown"]."_-1.PNG";
                else         $para["data"][$k]["picpath"] = "tcms_".$v["iupdown"]."_".$ivalue.".PNG";
            }
        }
        //返回图片和状态
        $data = array(
            "code" => "1",
            "count"=>count($para["data"]),
            "data" => $para["data"]
        );
        echo json_encode($data);
    }

    $paratype = 1;
    $nums = 0;
    foreach ($para["data"] as $k=>$v){
        if($v["itypeid"] !=  $paratype){
            $typename[$nums] = $v["itypeid"];
            $paratype = $v["itypeid"];
            $nums = $nums + 1;
        }
    }

    if($itype == 1) {
        $typepic = array(
            "23"=>"cms.PNG",
            "25"=>"tcms.PNG",
            "17"=>"cam_0_1_2_1.png",
            "18"=>"ETHOST.png",
            "19"=>"ET_1_5.png",
            "20"=>"vd_1_-1.PNG",
            "22"=>"wd_1_-1.PNG",
        );
        $path = "DevType";
        $type = CurlCalss::curl(5, '', $path);
        $type = json_decode($type, true);
        $nnum = 0;
        foreach ($typename as $k => $v) {
            $result[$nnum]["scname"] = $type["data"][$v]["scname"];
            $result[$nnum]["sename"] = $type["data"][$v]["sename"];
            $result[$nnum]["iid"] = $type["data"][$v]["iid"];
            $result[$nnum]["pic"] = "./pic2/".$typepic[$type["data"][$v]["iid"]];
            $nnum = $nnum + 1;
        }

        $data = array(
            "code" => "1",
            "count"=>count($result),
            "data" => $result
        );
        echo json_encode($data);
    }
