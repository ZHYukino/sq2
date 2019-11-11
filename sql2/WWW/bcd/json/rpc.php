<?php

//print_r($_REQUEST); // []
//print_r($_POST); // []
//print_r($_GET); // []
$a = $_GET["ip"];
$b = file_get_contents("php://input");   // empty($json) 为 0
