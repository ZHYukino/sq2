<?php
require ('./bcd/php/config.php');
session_start();
if(!isset($_SESSION['uid'])){
    header("location:login.php");
}
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
    <link href="jspackage/jquery-ui/jquery-ui-1.10.4.min.css" rel="stylesheet">
    <!-- layui组件 -->
    <link href="jspackage/layui/css/layui.css" media="all" rel="stylesheet">
    <!-- 表格 -->
    <script src="jspackage/jquery/jquery-1.10.2.min.js"></script>
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin" >
    <div class="layui-header">
        <ul class="layui-nav layui-bg-cyan">
            <li class="layui-nav-item">
                <a style="cursor:pointer;" >用户管理</a>
                <dl  class="layui-nav-child">
                    <dd><a  style="cursor:pointer;"  id="adminlist">用户管理</a></dd>
                    <dd><a href="">角色管理</a></dd>
                </dl>
            </li>

            <li class="layui-nav-item"   id="dev-nav-1"></li>
            <li class="layui-nav-item"   id="dev-nav-2"></li>
            <li class="layui-nav-item"   id="dev-nav-3"></li>
            <li class="layui-nav-item"   id="dev-nav-4"></li>
            <li class="layui-nav-item"   id="dev-nav-5"></li>
            <li class="layui-nav-item"   id="dev-nav-6"></li>
            <li class="layui-nav-item"   id="dev-nav-0"></li>

        </ul>
        <ul class="layui-nav layui-layout-right" id="usehead_nav" style="display: none">
            <li class="layui-nav-item">
                <a href="javascript:;"    class="useid"></a>
                <dl class="layui-nav-child">
<!--                    <dd><a href="">安全设置</a></dd>-->
                    <dd><a id="updatepass" style="cursor:pointer;" >修改密码</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item"><a onclick="logout()"  style="cursor:pointer;">退出</a></li>
        </ul>
    </div>
<!-- 
    <div id="dev_div_body"   >
    </div>
 -->
        <!-- 内容主体区域 -->
    <div style="padding: 15px;">
        <div      style="position: absolute;  top: 55%; left: 66%;">
            <img id="one3" src="./pic2/tunnel3.png" onclick="use3()" style="cursor:pointer;width: 40px;height: 40px; "  title="<?php $opt_ini["TuName"]["Tu1"] ;?>">
            <img id="bt3" src="./pic2/tunnel3.png"  style="cursor:pointer;display:none ;width: 40px;height: 40px;"  title="<?php $opt_ini["TuName"]["Tu1"] ;?>"  >
            <div style="color: red">C隧道</div>
        </div>
        <div style="position: absolute;  top: 28%;  left: 30%;">
            <img id="one2" src="./pic2/tunnel2.png" onclick="use2() " style="cursor:pointer;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu2"] ;?>">
            <img id="bt2" src="./pic2/tunnel2.png"  style="cursor:pointer; display:none ;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu2"] ;?>">
            <div style="color: red">B隧道</div>
        </div>
        <div style="position: absolute;left: 45%;top: 40%;">
            <img id="one1" src="./pic2/tunnel1.png" onclick="use1()"  style="cursor:pointer;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu0"] ;?>">
            <img id="bt1" src="./pic2/tunnel1.png"   style="cursor:pointer; display:none ;width: 40px;height: 40px;" title="<?php $opt_ini["TuName"]["Tu0"] ;?>"  >
            <div style="color: red">A隧道</div>
        </div>
        </div>

    <div class="admintable" style="display: none">
        <table class="layui-hide" id="table1"  lay-filter="admintable"></table>
    </div>

    <div class="updateadmin" style="display: none;">
        <form class="layui-form" action="">
            <div class="layui-form-item"  style="margin-top: 10px;width: 480px">
                <label class="layui-form-label">编号</label>
                <div class="layui-input-block">
                  <input type="text" name="FCode" id="FCode" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item"  style="margin-top: 10px;width: 480px">
                <label class="layui-form-label">账号</label>
                <div class="layui-input-block">
                  <input type="text" name="FEName" id="FEName" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item"  style="margin-top: 10px;width: 480px">
                <label class="layui-form-label">名称</label>
                <div class="layui-input-block">
                  <input type="text" name="FCName" id="FCName" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                </div>
            </div>

           <div id="radio1"  style="margin-left: 120px;margin-bottom: 15px;display: none">
            <input type="checkbox" id="enable"  name="" title="是否启用" lay-skin="primary" checked >
            <input type="checkbox" id="remarkpass" name=""  title="重置密码" lay-skin="primary"> 
           </div>

           <div id="radio2" style="margin-left: 120px;margin-bottom: 15px;display: none">
            <input type="checkbox" id="newenable"  name="" title="是否启用" lay-skin="primary" checked >
           </div>

          <div class="layui-form-item layui-form-text" style="width: 480px">
            <label class="layui-form-label">备注</label>
            <div class="layui-input-block">
              <textarea name="FRemark" id="FRemark" placeholder="请输入内容" class="layui-textarea"></textarea>
            </div>
          </div>
        </form>
    </div>

    <div id="dev_div_body"   >

    </div>

</div>

<script src="jspackage/jquery-ui/jquery-ui-1.10.4.min.js"></script>
<script src="./jspackage/layui/layui.js"></script>
<script type="text/javascript" src="js/opencms.js"></script>
<script type = "text/javascript"   src="js/Des.js"></script>
<script src="js/default.js"></script>
<script src="js/tunnel.js"></script>

<script>
    // JavaScript代码区域
    layui.use('element', function(){
        var element = layui.element;

    });
   
</script>
<script type="text/html" id="barDemo">
<!--   <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a> -->
   {{#  if(d.FCode != "00000" ){ }}
  <a class="layui-btn layui-btn-xs" lay-event="edit">修改</a>
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    {{#  } }} 
    {{#  if(d.FCode == "00000" ){ }}  
  <a  class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">添加用户</a>
     {{#  } }} 
</script>
</body>
</html>

