<?php

    require_once ("CurlCalss.php");

    function getselect($nums,$q,$path)
    {
        $para = CurlCalss::curl($nums, 'Ftypeid=' . $q, $path);
        $data = json_decode($para, true);
        return $data;
    }