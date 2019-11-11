<?php
require ('./bcd/php/config.php');
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php echo $opt_ini["config"]['SoftName']; ?></title>
    <style>
        html{
            height: 100%;
        }
        body{
            background: url(./pic2/mainBack.jpg) no-repeat;
            background-size: 100% 100%;
        }
        #bg{width:100%;height:100%;position:absolute;z-index:-1;}

    </style>
    <!-- layui组件 -->
    <link href="jspackage/layui/css/layui.css" media="all" rel="stylesheet">
    <!-- 表格 -->
    <link href="jspackage/backthemes/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
</head>

<body >
<div >

    <div class="layui-fluid">
        <div class="layui-row" style="margin-top: 18%">
            <div class="layui-col-sm9">
                <div class="grid-demo">&nbsp;</div>
            </div>
            <div class="layui-col-sm3">
                <img id="3" src="./pic2/tunnel3.png" onclick="use3()" style="cursor:pointer; "  title="<?php $opt_ini["TuName"]["Tu1"] ;?>">
                <img id="bt3" src="./pic2/tunnel3.png"  style="cursor:pointer;display:none "  title="<?php $opt_ini["TuName"]["Tu1"] ;?>"  >
            </div>
            <div class="layui-col-sm6">
                <div class="grid-demo">&nbsp;</div>
            </div>
            <div class="layui-col-sm6">
                <img id="2" src="./pic2/tunnel2.png" onclick="use2() " style="cursor:pointer;" title="<?php $opt_ini["TuName"]["Tu2"] ;?>">
                <img id="bt2" src="./pic2/tunnel2.png"  style="cursor:pointer; display:none " title="<?php $opt_ini["TuName"]["Tu2"] ;?>">
            </div>
            <div class="layui-col-sm3">
                <div class="grid-demo">&nbsp;</div>
            </div>
            <div class="layui-col-sm9">
                <img id="1" src="./pic2/tunnel1.png" onclick="use1()"  style="cursor:pointer;" title="<?php $opt_ini["TuName"]["Tu0"] ;?>">
                <img id="bt1" src="./pic2/tunnel1.png"   style="cursor:pointer; display:none " title="<?php $opt_ini["TuName"]["Tu0"] ;?>"  >
            </div>
        </div>
    </div>
</div>

</body>
</html>
<script src="jspackage/jquery/jquery-1.10.2.min.js"></script>
<script src="js/tunnel.js">
</script>
<script>
