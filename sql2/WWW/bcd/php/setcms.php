<?php

    require_once ("common.php");
    session_start();
    $userid = $_SESSION["uid"];
    //获得设备id
    $id = str_replace("10000",'',$_GET["id"]);
    //获得设备操作
    $actnum = empty($_GET["actnum"]) ? "": $_GET["actnum"] ;

    $itype = $_GET["itype"];
    //上传cms
    if(isset($_SESSION["uid"])) {
        if ($itype == 1) {
            $file_tmp = $_FILES['file']["tmp_name"];
            $file_size = $_FILES['file']["size"];
            $file_name = $_FILES['file']["name"];
            $file_name = iconv("UTF-8", "GBK", $file_name);
            if ($file_size > 10 * 1024 * 1024) return $result["sinfo"] = "文件太大,超过10M。";
            //是否存在
            $file_father_path = '../localcms/' . $id . '';
            if (!file_exists($file_father_path)) {
                mkdir($file_father_path);
            }
            $file = move_uploaded_file($file_tmp, '../localcms/' . $id . '/' . $file_name . '');
            $furl = "@".dirname(dirname(__FILE__))."\localcms\/" . $id ."\/".$file_name."";
            $url = "http://127.0.0.1:8855/CMSOperation0.html?FID=" . $id . "&FUserID=" . $userid . "&FMark=012345";
            $p1 = CurlCalss::usecmsupload($furl,$url);
            echo $p1;
        } elseif ($itype == 2) {

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
    }


?>