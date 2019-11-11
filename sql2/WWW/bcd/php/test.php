<?php



    define("DIR", "/");
    function __autoload($classname) {
        require DIR.$classname.'.php';
    }

   $p2 = new CurlCalss();
