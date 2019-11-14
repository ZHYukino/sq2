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
    </style>
    <!-- layui组件 -->
    <link href="jspackage/layui/css/layui.css" media="all" rel="stylesheet">
    <!-- 表格 -->
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
<!--        <div class="layui-logo">layui 后台布局</div>-->
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-bg-cyan">
            <li class="layui-nav-item">
                <a style="cursor:pointer;" >用户管理</a>
                <dl  class="layui-nav-child">
                    <dd><a href="">用户管理</a></dd>
                    <dd><a href="">角色管理</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a style="cursor:pointer;">系统信息</a>
                <dl class="layui-nav-child">
                    <dd><a href="">系统设置</a></dd>
                </dl>
            </li>
<!--            <li class="layui-nav-item"  id="dev-nav-7"><a style="cursor:pointer;"  onclick="devclick()"  id="dev_iphone"><img src="./pic2/plc.png"  style="width: 25px;height: 25px;"  id="useimg1"></a></li>-->
            <li class="layui-nav-item"   id="dev-nav-1"></li>
            <li class="layui-nav-item"   id="dev-nav-2"></li>
            <li class="layui-nav-item"   id="dev-nav-3"></li>
            <li class="layui-nav-item"   id="dev-nav-4"></li>
            <li class="layui-nav-item"   id="dev-nav-5"></li>
            <li class="layui-nav-item"   id="dev-nav-6"></li>
            <li class="layui-nav-item"   id="dev-nav-0"></li>

        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;"    class="useid"></a>
                <dl class="layui-nav-child">
                    <dd><a href="">基本资料</a></dd>
                    <dd><a href="">安全设置</a></dd>
                    <dd><a href="">修改密码</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item"><a onclick="logout()"  style="cursor:pointer;">退出</a></li>
        </ul>
    </div>


    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
            <div class="layui-fluid">
                <div class="layui-row" style="margin-top: 18%">
                    <div class="layui-col-sm9">
                        <div class="grid-demo">&nbsp;</div>
                    </div>
                    <div class="layui-col-sm3">
                        <img id="3" src="./pic2/tunnel3.png" onclick="use3()" style="cursor:pointer;width: 40px;height: 40px; "  title="<?php $opt_ini["TuName"]["Tu1"] ;?>">
                        <img id="bt3" src="./pic2/tunnel3.png"  style="cursor:pointer;display:none ;width: 40px;height: 40px;"  title="<?php $opt_ini["TuName"]["Tu1"] ;?>"  >
                        <div style="color: red">C隧道</div>
                    </div>
                    <div class="layui-col-sm6">
                        <div class="grid-demo">&nbsp;</div>
                    </div>
                    <div class="layui-col-sm6">
                        <img id="2" src="./pic2/tunnel2.png" onclick="use2() " style="cursor:pointer;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu2"] ;?>">
                        <img id="bt2" src="./pic2/tunnel2.png"  style="cursor:pointer; display:none ;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu2"] ;?>">
                        <div style="color: red">B隧道</div>
                    </div>
                    <div class="layui-col-sm3">
                        <div class="grid-demo">&nbsp;</div>
                    </div>
                    <div class="layui-col-sm9">
                        <img id="1" src="./pic2/tunnel1.png" onclick="use1()"  style="cursor:pointer;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu0"] ;?>">
                        <img id="bt1" src="./pic2/tunnel1.png"   style="cursor:pointer; display:none ;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu0"] ;?>"  >
                        <div style="color: red">A隧道</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>
<script src="./jspackage/layui/layui.js"></script>

<script>
    // JavaScript代码区域
    layui.use('element', function(){
        var element = layui.element;

    });
</script>
</body>
</html>
<script src="jspackage/jquery/jquery-1.10.2.min.js"></script>
<script src="js/tunnel.js"></script>

<script src="js/default.js"></script>
