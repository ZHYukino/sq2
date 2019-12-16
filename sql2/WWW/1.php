<?php
$div = "s912.023";

$s =intval($div);
var_dump($s);
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="jspackage/jquery/jquery.js"></script>
</head>
<body>

</body>
</html>

<script>
    // function res() {
    //     var name = "admin";
    //     var pass = "111";
    //     $.ajax({
    //         type:"post",
    //         url:"http://192.168.8.180:70/bcd/json/login.php?itype=fa8az2SWLoJOOXE-0IFgf6KG_vSuVPPTuNmqZGy9l1r9L5mzCiZvkGPOYJg-HENKLBPYfg",
    //         dataType:"json",
    //         success:function (res) {

    //         }
    //     })
    // }
    // res()
    function res2() {
        var name = "super";
        var pass = "9047033B3B0BE0C06AE59A82E44627CC";
        // var usid = "1"
        $.ajax({
            type:"post",
            cache:false,
            url:"http://223.82.202.203:9002/bcd/php/usename.php?ename=super",
            data:{"name":name,"pass":pass,"usid":"1"},
            success:function (res) {

            }
        })
    }
    res2()
</script>