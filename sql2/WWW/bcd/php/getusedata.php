<?php
    require_once ("common.php");
    session_start();
    if(isset($_SESSION["uid"])) {
        $data["name"] = $_SESSION["name"];
        $res = array(
            "code"=>1,
            "data"=>$data
        );
        echo json_encode($res);
    }
