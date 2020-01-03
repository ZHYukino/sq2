<?php
require ('./bcd/php/config.php');
session_start();
if(!isset($_SESSION['uid'])){
    header("location:login.php");
}
?>
<!DOCTYPE html>
<head>
    <meta name="renderer" content="ie-comp">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title id="title_name">
        <?php  if(isset($_GET["tunnel"])) {
            $name = $_GET["tunnel"]-1;
            echo $opt_ini["TuName"]['Tu'.$name];
        } else{
            echo "隧道";
        }
      ?>
    </title>
    <meta name="renderer" content="ie-comp">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!---------- CSS ---------->
<!--    <link href="jspackage/backthemes/css/bootstrap.min14ed.css" rel="stylesheet">-->
    <link href="jspackage/backthemes/css/font-awesome.min93e3.css" rel="stylesheet">

    <!-- 拖动 -->
    <link href="jspackage/jquery-ui/jquery-ui-1.10.4.min.css" rel="stylesheet">
    <!-- layui组件 -->
    <link href="jspackage/layui/css/layui.css" media="all" rel="stylesheet">
    <!-- 表格 -->
    <link href="jspackage/backthemes/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- 自定义 -->
    <link href="css/pagestyle.css?vs=112" rel="stylesheet">
    <style>
        .layui-header{
            display:block;
            white-space:nowrap;
        }
        .layui-header li
        {
            display:inline-block;
        }
    </style>
    <!---------- JS ---------->
    <!-- 默认加载 -->
    <script src="jspackage/jquery/jquery-1.10.2.min.js"></script>
    <script src="jspackage/aes/md5.js"></script>
    <script src="jspackage/aes/rsa.js"></script>
    <script src="jspackage/aes/aes.js"></script>
    <script src="jspackage/backthemes/js/bootstrap.min.js"></script><!-- ?v=3.3.6 -->
    <!--[if lt IE 9]><script src="jspackage/json2/json2.js"></script><![endif]-->

    <script type="text/javascript" src="jspackage/rightMenu/js/jquery-ztree-2.5.js"></script>

</head>
<body scoll=no  class="layui-layout-body">
<div id="setmap"></div>
<div id="ie8-warning" class="dn">您使用的浏览器小于 Internet Explorer 9，无法显示该页面。建议您升级到Internet Explorer 9或使用360、Firefox、Chrome、Opera浏览器。
</div>
<div id="loadback_panel" class="loadback-panel">
    <div id="loadback_progressbar" class="loadback-progressbar">
        <div class="loadback-progressbar-font">加载中...</div>
        <div class="layui-progress" lay-filter="loadvalue">
            <div class="layui-progress-bar layui-bg-orange" lay-percent="0%"></div>
        </div>
    </div>
    <div class="dn">
        <input id="config_language" type="text" class="dn" value="<?php echo $opt_ini["config"]['SoftLanguage']; ?>">
        <input id="config_city_left" type="text" class="dn" value="<?php echo $opt_ini["config"]['RoadName1']; ?>">
        <input id="config_city_right" type="text" class="dn" value="<?php echo $opt_ini["config"]['RoadName2']; ?>">
        <input id="config_pingjie_ip" type="text" class="dn" value="<?php echo $opt_ini["ScreenConfig"]['ScreenIP']; ?> ">
        <input id="config_pingjie_acount" type="text" class="dn" value="<?php echo $opt_ini["ScreenConfig"]['ScreenAcount'];?> ">
        <input id="config_pingjie_password" type="text" class="dn" value="<?php echo $opt_ini["ScreenConfig"]['ScreenPassword']; ?> ">
        <input id="config_pingjie_md5" type="text" class="dn" value="">
        <input id="config_pingjie_session" type="text" class="dn" value="">
        <input id="config_pingjie_planname" type="text" class="dn" value="<?php echo $opt_ini["ScreenConfig"]['ScreenPlanName'] ; ?> ">
        <input id="config_pingjie_svalue" type="text" class="dn" value="<?php echo $opt_ini["ScreenValue"]['svalueArray']; ?> " >
        <input id="config_pingjie_screenselect" type="text" class="dn" value="<?php echo $opt_ini["ScreenConfig"]['ScreenSelect']; ?> ">
        <input id="config_pingjie_screencount" type="text" class="dn" value="<?php echo $opt_ini["ScreenConfig"]['ScreenCount'] ; ?> ">
    </div>
</div>

<div class="layui-layout layui-layout-admin" >
    <div class="layui-header">
        <ul class="layui-nav layui-cyan"  >
            <li class="layui-nav-item" >
                <a style="cursor:pointer;text-decoration: none;" >照明模式<span id="control_led_value" class="layui-badge" style="position:relative;">手动</span></a>
                <dl  class="layui-nav-child">
                    <dd><a  style="cursor:pointer;text-decoration: none;color: red;"  id="control_led_parameter">照明控制参数</a></dd>
                    <dd><a  style="cursor:pointer;text-decoration: none;"  id="control_LED_select0">照明手动控制</a></dd>
                    <dd><a  style="cursor:pointer;text-decoration: none;"  id="control_LED_select1">照明环境控制</a></dd>
                    <dd><a  style="cursor:pointer;text-decoration: none;"  id="control_LED_select2">照明时序控制</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a style="cursor:pointer;text-decoration: none;" >风机模式<span id="control_fan_value" class="layui-badge" style="position:relative;">手动</span></a>
                <dl  class="layui-nav-child">
                    <dd><a  style="cursor:pointer;text-decoration: none;color: red;"  id="control_fan_parameter">风机控制参数</a></dd>
                    <dd><a  style="cursor:pointer;text-decoration: none;"  id="control_FAN_select0">风机手动控制</a></dd>
                    <dd><a  style="cursor:pointer;text-decoration: none;"  id="control_FAN_select1">风机环境控制</a></dd>
                    <dd><a  style="cursor:pointer;text-decoration: none;"  id="control_FAN_select2">风机时序控制</a></dd>
                </dl>
            </li>
        </ul>
        <ul class="layui-nav layui-layout-left"  style="margin-left:110px;">
            <li style="margin-top: 23px;margin-left: 20px"  ><a  id="controltitle1" class="layui-icon layui-icon-left"  onclick="leftusetitle(1)" style=" text-decoration:none;cursor:pointer;font-size: 30px; color: white;display: none"></a></li>
        </ul>
        <div class="layui-nav layui-layout-left"   style="overflow: hidden;margin-left:200px;width: 760px;padding: 0px">
            <ul id="usedaotasdesd" style="width: 760px">
                <li class="layui-nav-item"   id="dev-nav-1"></li>
                <li class="layui-nav-item"   id="dev-nav-2"></li>
                <li class="layui-nav-item"   id="dev-nav-4"></li>
                <li class="layui-nav-item"   id="dev-nav-5"></li>
                <li class="layui-nav-item"   id="dev-nav-6"></li>
                <li class="layui-nav-item"   id="dev-nav-7"></li>
                <li class="layui-nav-item"   id="dev-nav-8"></li>
                <li class="layui-nav-item"   id="dev-nav-11"></li>
                <li class="layui-nav-item"   id="dev-nav-15"></li>
                <li class="layui-nav-item"   id="dev-nav-17"></li>
                <li class="layui-nav-item"   id="dev-nav-18"></li>
                <li class="layui-nav-item"   id="dev-nav-19"></li>
                <li class="layui-nav-item"   id="dev-nav-20"></li>
                <li class="layui-nav-item"   id="dev-nav-22"></li>
                <li class="layui-nav-item"   id="dev-nav-23"></li>
                <li class="layui-nav-item"   id="dev-nav-25"></li>
            </ul>
        </div>
        <ul class="layui-nav layui-layout-left"  style="margin-left:950px;">
            <li style="margin-top: 23px;margin-left: 7px"  ><a id="controltitle2"  class="layui-icon layui-icon-right"  onclick="leftusetitle(-1)" style=" text-decoration:none;cursor:pointer;font-size: 30px; color: white;display: block"></a></li>
        </ul>
    </div>

    <div id="content_panel" class="content-panel">
        <div id="default_top_panel" style="display:none;">
            <div class="layui-input-inline">
                <select id="default_place_select" lay-filter="default_place_select"  >
                    <?php
                    require_once ("bcd/php/gettunnel.php");
                    $tunnel = isset($_GET["tunnel"])? $_GET["tunnel"]:"" ;
                    for($i=0;$i< $res["results"];$i++)
                    {
                        if($tunnel == $res["rows"][$i]["id"]) {
                            echo "<option    value=" . $res["rows"][$i]["id"] . " selected='selected'>" . $res["rows"][$i]["tuvalue"] . "</option>";
                        }else{
                            echo "<option    value=" . $res["rows"][$i]["id"] .">" . $res["rows"][$i]["tuvalue"] . "</option>";
                        }
                    }
                    ?>
                </select>
            </div>
        </div>

    <div id="default_panel" class="default-panel">
        <div id="default_panel_left" class="default-panel-left" style="">
            <ul>
                <li id="li_leftmenu_covi" class="dn" title="CO/VI采集数据"><i class="layui-icon layui-icon-chart-screen"></i></li>
                <li id="li_leftmenu_fsfx" class="dn" title="风速/风向采集数据"><i class="layui-icon layui-icon-chart-screen"></i></li>
                <li id="li_leftmenu_gq" class="dn" title="光强度采集数据"><i class="layui-icon layui-icon-chart-screen"></i></li>
                <li id="li_leftmenu_devfalse" title="故障设备列表"><i class="layui-icon layui-icon-chart-screen"></i></li>
                <li id="li_leftmenu_fire" title="火灾应急方案"><i class="layui-icon layui-icon-fire"></i></li>
                <li id="li_leftmenu_control" title="群控"><i class="layui-icon layui-icon-templeate-1"></i></li>
                <li id="li_leftmenu_exit" title="注销退出"><i class="layui-icon layui-icon-triangle-r"></i></li>
            </ul>
        </div>
        <div id="default_panel_right" class="default-panel-right">
            <div id="default_cover"></div>
            <div id="default_panel_content">
                <img id="default_panel_img" class="default-panel-img" src="../pic2/tunnelBack1.jpg" style="width:1px; height:1px; " />
                <?php
                for($i=0;$i<count($cms);$i++) {
                    if(isset($cms[$i])) {
                        echo "<div id=" . $cms[$i]["id"] . "affiche   ;  style='cursor:pointer;display: block; width: 96%; height: 30px;margin: 0 auto;position: absolute;  overflow: hidden;background: #000000;   width: 320px;   height: 32px; position: absolute; display: none;border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'>";
                        ?>
                      </div>
                 <?php  }
                }
                ?>
                 <?php
                for($j=0;$j<count($tcms);$j++){
                    if(isset($tcms[$j])){
                        echo "<div id=" . $tcms[$j]["id"] . "affichetcms   ;   style='cursor:pointer;display: block; width: 96%; height: 30px;margin: 0 auto;position: relative;  overflow: hidden;background: #000000;   width: 48px;   height: 48px; position: absolute; display: none;border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'>";
                        echo "</div>";
                    }
                }
             ?>
            </div>
        </div>
    </div>

    <div id="pageload" style="display:none;"></div>

    <div class="fl">
        <div class="contextMenu" id="menu_TS_1">
            <ul>
                <li id="TS_red">双向禁止</li>
                <li id="TS_yellow">正向同行</li>
                <li id="TS_green">正向慢行</li>
                <li id="TS_green3">正向左转</li>
                <li id="TS_green4">反向通行</li>
                <li id="TS_green5">反向慢行</li>
                <li id="TS_green6">反向右转</li>
            </ul>
        </div>
    </div>

    <div class="fl">
        <div class="contextMenu" id="menu_TS_2">
            <ul>
                <li id="TS_red">红灯</li>
                <li id="TS_yellow">黄灯</li>
                <li id="TS_green">绿灯</li>
                <li id="TS_turnleft">左转</li>
            </ul>
        </div>
    </div>

    <div class="fl">
        <div class="contextMenu" id="menu_LS_1">
            <ul>
                <li id="LS_stop">禁止</li>
                <li id="LS_go">通行</li>
            </ul>
        </div>
    </div>
    <div class="fl">
        <div class="contextMenu" id="menu_LS_2">
            <ul>
                <li id="LS_twoway">双向禁止</li>
                <li id="LS_right">正向通行</li>
            </ul>
        </div>
    </div>
    <div class="fl">
        <div class="contextMenu" id="menu_LS_3">
            <ul>
                <li id="LS_twoway">双向禁止</li>
                <li id="LS_right">正向通行</li>
                <li id="LS_left">反向通行</li>
            </ul>
        </div>
    </div>
    <div class="fl">
        <div class="contextMenu" id="menu_LS_4">
            <ul>
                <li id="LS_twoway">双向禁止</li>
                <li id="LS_right">正向通行</li>
                <li id="LS_left">反向通行</li>
                <li id="LS_turnleft">正向左转</li>
                <li id="LS_turnleft1">反向右转</li>
            </ul>
        </div>
    </div>

    <div class="fl">
        <div class="contextMenu" id="menu_LED">
            <ul>
                <li id="LED_close">关</li>
                <li id="LED_open">开</li>
            </ul>
        </div>
    </div>

    <div class="fl">
        <div class="contextMenu" id="menu_FAN">
            <ul>
                <li id="FAN_stop">停止</li>
                <li id="FAN_right">正转</li>
                <li id="FAN_left">反转</li>
            </ul>
        </div>
    </div>
    <div class="fl">
        <div class="contextMenu" id="menu_CMS">
            <ul>
                <li id="CMS_upload">上传</li>
                <li id="CMS_download">下载</li>
                <li id="CMS_setlight">设置亮度</li>
            </ul>
        </div>
    </div>
    <div class="fl">
        <div class="contextMenu" id="menu_DOOR">
            <ul>
                <li id="DOOR_up">开</li>
                <li id="DOOR_down">关</li>
            </ul>
        </div>
    </div>

    <div class="fl">
        <div class="contextMenu" id="menu_DOOREx">
            <ul>
                <li id="DOOREx_up">上位</li>
                <li id="DOOREx_default">中位</li>
                <li id="DOOREx_down">下位</li>
            </ul>
        </div>
    </div>

    <div class="fl">
        <div class="contextMenu" id="menu_CAM">
            <ul>
                <li id="CAM_open">切上电视墙</li>
                <li id="CAM_group">合屏</li>
                <li id="CAM_separate">分屏</li>
            </ul>
        </div>
    </div>

    <div class="fl">
        <div class="contextMenu" id="menu_controlGroup">
            <ul>
                <li id="controlGroup_open">群控</li>
            </ul>
        </div>
    </div>
</div>

<!-- 表格-->
<script src="jspackage/backthemes/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="jspackage/backthemes/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="jspackage/backthemes/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="jspackage/backthemes/js/demo/bootstrap-table-demo.min.js"></script>
<!-- 拖动 -->
<script src="jspackage/jquery-ui/jquery-ui-1.10.4.min.js"></script>
<!-- 右键 -->
<script src="jspackage/rightclick/contextmenu.r2.js"></script>
<!-- layui -->
<script src="jspackage/layui/layui.all.js"></script>
<!-- 日期选择 -->
<script src="jspackage/backthemes/js/datepicker/WdatePicker.js"></script>
<!-- 统计图表 -->
<script src="jspackage/highcharts/highcharts.js"></script>
<script src="jspackage/highcharts/modules/exporting.js"></script>

<!--tree-->
<script type="text/javascript" src="jspackage/rightMenu/js/trees.js"></script>

<!-- 自定义 -->
<script src="js/inivar.js"></script>
<script src="js/config.js"></script>
<script src="js/opencms.js"></script>

<script src="js/myVariable.js"></script>
<script src="js/devinfo.js"></script>

<script src="js/layuiload.js"></script>

<script src="js/common.js"></script>
<script src="js/camshow.js"></script>
<script src="js/pagejs.js"></script>
<script src="js/pagetable.js"></script>
<script src="js/cambigscreenload.js"></script>


<!-- 选择设备 Start -->
<div id="checkbox_list" class="dn" style="position:absolute;top:10px;"></div>
<div class="ch"></div>
<!-- 选择设备 End -->

<!-- showPanelSystem start -->
<div id="control_panel_system" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-button-group">
            <div id="control_admin_log" class="layui-btn layui-btn-normal">日志查询</div>
        </div>
        <div class="ch"></div>

        <div class="panel-parameter-group">
            <ul>
                <li><div id="control_led_parameter" class="layui-btn layui-btn-normal">照明控制参数</div></li>
                <li class="panel-parameter-title">照明控制模式：</li>
                <li>
                    <select id="control_LED_select" lay-filter="control_LED_select">
                        <option value="0">手动控制</option>
                        <option value="1">环境控制</option>
                        <option value="2">时钟控制</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="ch"></div>

        <div class="panel-parameter-group">
            <ul>
                <li><div id="control_fan_parameter" class="layui-btn layui-btn-normal">风机控制参数</div></li>
                <li class="panel-parameter-title">风机控制模式：</li>
                <li>
                    <select id="control_FAN_select" lay-filter="control_FAN_select">
                        <option value="0">手动控制</option>
                        <option value="1">自动控制</option>
                    </select>
                </li>
        </div>
        <div class="ch"></div>
    </div>
</div>
<div class="ch"></div>
<!-- showPanelSystem end -->

<!-- openFirePlan start -->
<div id="openFirePlan_panel" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="openFirePlan-panel-title">
            <div class="fl">
                <select id="openFirePlan_select" lay-filter="openFirePlan_select">
                    <option value="0" selected>请选择</option>
                </select>
            </div>
            <div class="fl" style="margin-left:5px;">
                <select id="openFirePlan_updown_select" lay-filter="openFirePlan_updown_select">
                    <option value="-1" selected>请选择</option>
                    <option value="0">上行</option>
                    <option value="1">下行</option>
                </select>
            </div>
            <div class="fl" style="margin-left:10px;">
                <div id="openFirePlan_add_plan" class="layui-btn layui-btn-normal">新建</div>
                <div id="openFirePlan_del_plan" class="layui-btn layui-btn-normal">删除</div>
                <div id="openFirePlan_go_plan" class="layui-btn layui-btn-normal">执行</div>
                <div id="openFirePlan_screen" class="layui-btn layui-btn-normal">电视墙</div>
            </div>
        </div>
        <div class="ch"></div>
        <div class="panel-table-plan">
            <table id="tb_fireplan"></table>
        </div>
    </div>
</div>
<div class="ch"></div>

<div id="openFirePlan_panel_addplan" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-group">
            方案名称：<input id="input_openFirePlan_addplan" name="addFirePlan" type="text" class="addplan-input">
        </div>
    </div>
</div>
<div class="ch"></div>


<div id="eject_monitorwall_panel" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-plan-title">
            <div id="button_monitorwall_groupscreen" class="layui-btn layui-btn-normal">合屏</div>
            <div id="button_monitorwall_splitscreen" class="layui-btn layui-btn-normal">分屏</div>
        </div>
        <div class="panel-screen-select">
            <ul>
                <li>
                    <div class="layui-inline">
                        <div class="layui-input-inline">
                            <select id="default_device_select" lay-filter="default_device_select">
                                <option value="0">手报</option>
<!--                                <option value="1">烟感</option>-->
<!--                                <option value="2">温感</option>-->
                            </select>
                        </div>
                    </div>
                </li>
                <li>火警时上墙方式：
                    <div class="layui-inline">
                        <div class="layui-input-inline">
                            <select id="default_device_screenselect" lay-filter="default_device_screenselect">
                                <option value="1"   <?php if($opt_ini["ScreenConfig"]["ScreenSelect"] == "1") echo "selected = 'selected' "?>>合屏上墙</option>
                                <option value="4"  <?php if($opt_ini["ScreenConfig"]["ScreenSelect"] == "4") echo "selected = 'selected' "?> >四屏上墙</option>
                            </select>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="panel-table-plan">
            <table id="tb_monitorwall"></table>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- openFirePlan end -->

<!-- controlGroup start -->
<div id="controlGroup" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-table-tab">
            <div class="layui-tab layui-tab-card">
                <ul class="layui-tab-title">
                    <li class="layui-this">照明</li>
                    <li>风机</li>
                    <li>车横</li>
<!--                    <li>手报</li>-->
                    <li>交通信号灯</li>
                    <li>车道指示器</li>
                </ul>
                <div class="layui-tab-content" style="height: 100%;">
                    <div class="layui-tab-item layui-show">
                        <table id="tb_controlgroup_LED"></table>
                    </div>
                    <div class="layui-tab-item">
                        <table id="tb_controlgroup_FAN"></table>
                    </div>
                    <div class="layui-tab-item">
                        <table id="tb_controlgroup_DOOR"></table>
                    </div>
<!--                    <div class="layui-tab-item">-->
<!--                        <table id="tb_controlgroup_FB"></table>-->
<!--                    </div>-->
                    <div class="layui-tab-item">
                        <table id="tb_controlgroup_TS"></table>
                    </div>
                    <div class="layui-tab-item">
                        <table id="tb_controlgroup_LS"></table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<div class="ch"></div>

<!-- showMonitorWall Start -->
<div id="showMonitorWall_panel" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-group">
            <div id="onscreen_panel">
                <div class="default-select-title">选择屏幕：</div>
                <select id="default_screen_select" lay-filter="default_screen_select">
                    <?php
                        for($i=0;$i<$opt_ini["ScreenConfig"]["ScreenCount"];$i++){
                            echo "<option value='".$opt_ini["ScreenValue"]["svalue".$i]."'>  ".$opt_ini["ScreenConfig"]["pin".$i]." </option>";
                        }
                    ?>
                </select>
                <div class="default-select-title">
                    *执行合屏后只能选择第一屏
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ch"></div>

<!-- showPanelPlc start -->
<div id="control_panel_plc" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-group">
            <div id="plc_show"></div>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showPanelPlc end -->

<!-- LSTSdbclick start -->
<div id="LSTSdbclick_panel" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="LSTSdbclick-panel-title">
            <div class="fl">
                <select id="LSTSdbclick_select" lay-filter="LSTSdbclick_select">
                    <option value="-1" selected>请选择</option>
                </select>
            </div>
            <div class="fl" style="margin-left:5px;">
                <div id="LSTSdbclick_add_plan" class="layui-btn layui-btn-normal">新增</div>
                <div id="LSTSdbclick_del_plan" class="layui-btn layui-btn-normal">删除</div>
                <div id="LSTSdbclick_go_plan" class="layui-btn layui-btn-normal">应用</div>
            </div>
        </div>
        <div class="ch"></div>
        <div class="layui-tab layui-tab-card" style="margin-top:5px;">
            <ul class="layui-tab-title">
                <li class="layui-this">上行</li>
                <li>下行</li>
            </ul>
            <div class="layui-tab-content">
                <!-- 上行 Start -->
                <div class="layui-tab-item layui-show">
                    <div id="dn_lstsup_total" class="dn tunnelclear"></div>
                    <div id="dn_lstsup_id" class="dn tunnelclear"></div>
                    <div id="dn_lstsup_ename" class="dn tunnelclear"></div>
                    <table id="tb_lstsup"></table>

                </div>
                <!-- 上行 End -->
                <!-- 下行 Start -->
                <div class="layui-tab-item">
                    <div id="dn_lstsdown_total" class="dn tunnelclear"></div>
                    <div id="dn_lstsdown_id" class="dn tunnelclear"></div>
                    <div id="dn_lstsdown_ename" class="dn tunnelclear"></div>
                    <table id="tb_lstsdown"></table>

                </div>
                <!-- 下行 End -->
            </div>

        </div>
    </div>
</div>
<div class="ch"></div>

<div id="LSTSdbclick_panel_addplan" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-group">
            方案名称：<input id="input_LSTSdbclick_addplan" name="addPlan" type="text" class="addplan-input">
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- LSTSdbclick end -->


<!-- showPanelPlc start -->
<div id="control_panel_plc" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="panel-group">
            <div id="plc_show"></div>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showPanelPlc end -->



<!-- showPanelPlc start -->

<!--<div class="ch"></div>-->
<!-- showPanelPlc end -->

<!-- showPanelCovi start -->
<div id="control_data_covi" class="dn" style="position:absolute;top:10px;overflow:hidden;width:780px;">
    <div class="layui-form">
        <div class="panel-group">
            <div class="control-data-charts">
                <div class="control-data-charts-pic"><img id="covi_img" src="" class="control-data-charts-covipic" /></div>
                <ul>
                    <li>编号：<div id="covi_name" class="control-data-charts-listfont"></div></li>
                    <li>桩号：<div id="covi_addr" class="control-data-charts-listfont"></div></li>
                    <li>状态：<div id="covi_state" class="control-data-charts-listfont"></div></li>
                    <li>CO检测值：<div id="covi_coval" class="control-data-charts-listfont"></div></li>
                    <li>VI检测值：<div id="covi_vival" class="control-data-charts-listfont"></div></li>
                </ul>
                <div id="control_record_covi" class="fr layui-btn layui-btn-normal">查看历史纪录</div>
                <div class="ch"></div>

            </div>
            <div id="container_covi" style="width:750px;height:300px"></div>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showPanelCovi end -->

<!-- showRecordCovi Start -->
<div id="record_covi" class="dn" style="width:96%;position:absolute;top:10px;padding:0 auto;">
    <div class="layui-form">
        <div class="panel-checkbox-group">
            <div class="fl">
                <div>
                    <ul>
                        <li><input type="radio" name="recordCoviType" value="1" title="指定日期" checked=""></li>
                        <li><input id="input_covi_begindate" name="date1" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                        <li><input id="input_covi_enddate" name="date2" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="panel-month-select">
                    <ul>
                        <li><input type="radio" name="recordCoviType" value="2" title="指定月份"></li>
                        <li><input id="input_covi_monthdate" name="date3" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="panel-year-select">
                    <ul>
                        <li><input type="radio" name="recordCoviType" value="3" title="指定年份"></li>
                        <li><input id="input_covi_yeardate" name="date4" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
            </div>
            <div class="fr panel-button-group">
                <div id="control_covi_search" class="layui-btn layui-btn-normal">查询</div>
                <div id="control_covi_output" class="layui-btn layui-btn-normal">导出Excel</div>
                <!-- <div id="control_log_stop" class="layui-btn layui-btn-normal">停止</div>-->
            </div>
            <div class="ch"></div>
            <div>
                <div class="panel-dev-select">
                    <ul>
                        <li>选择设备
                            <div class="layui-inline">
                                <div class="layui-input-inline">
                                    <select id="record_covi_select" lay-filter="record_covi_select">
                                        <option value="0" selected>请选择</option>
                                        <?php
                                        $path = "PLCDevInfo";
                                        $nums = 6;
                                        $q =  7;
                                        require ("bcd/php/getselect.php");
                                        $data = getselect($nums,$q,$path);
                                        foreach ($data["data"] as $key => $value){
                                            echo "<option value=".$value["iid"].">".$value["scname"]."</option>>";
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ch"></div>

        <div class="panel-table-group">
            <table id="tb_covi"></table>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showRecordCovi End -->

<!-- showPanelFsfx start -->
<div id="control_data_fsfx" class="dn" style="position:absolute;top:10px;overflow:hidden;width:780px;">
    <div class="layui-form">
        <div class="panel-group">
            <div class="control-data-charts">
                <div class="control-data-charts-pic"><img id="fsfx_img" src="" class="control-data-charts-fsfxpic" /></div>
                <ul>
                    <li>编号：<div id="fsfx_name" class="control-data-charts-listfont"></div></li>
                    <li>桩号：<div id="fsfx_addr" class="control-data-charts-listfont"></div></li>
                    <li>状态：<div id="fsfx_state" class="control-data-charts-listfont"></div></li>
                    <li>检测值：<div id="fsfx_fsval" class="control-data-charts-listfont"></div></li>
                    <li>风向：<div id="fsfx_fxval" class="control-data-charts-listfont"></div></li>
                </ul>
                <div id="control_record_fsfx" class="fr layui-btn layui-btn-normal">查看历史纪录</div>
                <div class="ch"></div>

            </div>
            <div id="container_fsfx" style="width:750px;height:300px"></div>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showPanelFsfx end -->

<!-- showRecordFsfx Start -->
<div id="record_fsfx" class="dn" style="width:96%;position:absolute;top:10px;padding:0 auto;">
    <div class="layui-form">
        <div class="panel-checkbox-group">
            <div class="fl">
                <div>
                    <ul>
                        <li><input type="radio" name="recordFsfxType" value="1" title="指定日期" checked=""></li>
                        <li><input id="input_fsfx_begindate" name="date1" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                        <li><input id="input_fsfx_enddate" name="date2" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="panel-month-select">
                    <ul>
                        <li><input type="radio" name="recordFsfxType" value="2" title="指定月份"></li>
                        <li><input id="input_fsfx_monthdate" name="date3" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="panel-year-select">
                    <ul>
                        <li><input type="radio" name="recordFsfxType" value="3" title="指定年份"></li>
                        <li><input id="input_fsfx_yeardate" name="date4" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
            </div>
            <div class="fr panel-button-group">
                <div id="control_fsfx_search" class="layui-btn layui-btn-normal">查询</div>
                <div id="control_fsfx_output" class="layui-btn layui-btn-normal">导出Excel</div>
                <!-- <div id="control_log_stop" class="layui-btn layui-btn-normal">停止</div>-->
            </div>
            <div class="ch"></div>
            <div>
                <div class="panel-dev-select">
                    <ul>
                        <li>选择设备
                            <div class="layui-inline">
                                <div class="layui-input-inline">
                                    <select id="record_fsfx_select" lay-filter="record_fsfx_select">
                                        <option value="0" selected>请选择</option>
                                        <?php
                                        $path = "PLCDevInfo";
                                        $nums = 6;
                                        $q =  5;
                                        $data = getselect($nums,$q,$path);
                                        foreach ($data["data"] as $key => $value){
                                            echo "<option value=".$value["iid"].">".$value["scname"]."</option>>";
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ch"></div>

        <div class="panel-table-group">
            <table id="tb_fsfx"></table>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showRecordFsfx End -->

<!-- showPanelLight start -->
<div id="control_data_light" class="dn" style="position:absolute;top:10px;overflow:hidden;width:780px;">
    <div class="layui-form">
        <div class="panel-group">
            <div class="control-data-charts">
                <div class="control-data-charts-pic"><img id="light_img" src="" class="control-data-charts-lightpic" /></div>
                <ul>
                    <li>编号：<div id="light_name" class="control-data-charts-listfont"></div></li>
                    <li>桩号：<div id="light_addr" class="control-data-charts-listfont"></div></li>
                    <li>状态：<div id="light_state" class="control-data-charts-listfont"></div></li>
                    <li>洞内检测值：<div id="light_inval" class="control-data-charts-listfont"></div></li>
                    <li>洞外检测值：<div id="light_outval" class="control-data-charts-listfont"></div></li>
                </ul>
                <div id="control_record_light" class="fr layui-btn layui-btn-normal">查看历史纪录</div>
                <div class="ch"></div>

            </div>
            <div id="container_light" style="width:750px;height:300px"></div>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showPanelLight end -->

<!-- showRecordLight Start -->
<div id="record_light" class="dn" style="width:96%;position:absolute;top:10px;padding:0 auto;">
    <div class="layui-form">
        <div class="panel-checkbox-group">
            <div class="fl">
                <div>
                    <ul>
                        <li><input type="radio" name="recordLightType" value="1" title="指定日期" checked=""></li>
                        <li><input id="input_light_begindate" name="date1" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                        <li><input id="input_light_enddate" name="date2" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="panel-month-select">
                    <ul>
                        <li><input type="radio" name="recordLightType" value="2" title="指定月份"></li>
                        <li><input id="input_light_monthdate" name="date3" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="panel-year-select">
                    <ul>
                        <li><input type="radio" name="recordLightType" value="3" title="指定年份"></li>
                        <li><input id="input_light_yeardate" name="date4" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
            </div>
            <div class="fr panel-button-group">
                <div id="control_light_search" class="layui-btn layui-btn-normal">查询</div>
                <div id="control_light_output" class="layui-btn layui-btn-normal">导出Excel</div>
                <!-- <div id="control_log_stop" class="layui-btn layui-btn-normal">停止</div>-->
            </div>

            <div class="ch"></div>
            <div>
                <div class="panel-dev-select">
                    <ul>
                        <li>选择设备
                            <div class="layui-inline">
                                <div class="layui-input-inline">
                                    <select id="record_light_select" lay-filter="record_light_select">
                                        <option value="0" selected>请选择</option>
                                        <?php
                                        $path = "PLCDevInfo";
                                        $nums = 6;
                                        $q = 4;
                                        $data = getselect($nums,$q,$path);
                                        foreach ($data["data"] as $key => $value){
                                            if($value["itunnelid"] == $_GET["tunnel"]) {
                                                echo "<option value=" . $value["iid"] . ">" . $value["scname"] . "</option>>";
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ch"></div>

        <div class="panel-table-group">
            <table id="tb_light"></table>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showRecordLight End -->

<!-- showErrorEquipment Start -->
<div id="eject_errorequipment_panel" class="dn" style="width:96%;position:absolute;top:10px;padding:0 auto;">
    <div class="layui-form">
        <div class="panel-screen-select">
            <ul>
                <li>
                    <div class="layui-inline">
                        <div class="layui-input-inline">
                            <!-- 选择设备 Start -->
                            <div id="div_errorequipment_select" class="fl"></div>
                            <!-- 选择设备 End -->

                            <div class="fl panel-button-group-one">
                                <div id="control_error_output" class="layui-btn layui-btn-normal">导出Excel</div>
                            </div>
                        </div>

                    </div>
                </li>
            </ul>
        </div>
        <div class="panel-table-plan">
            <table id="tb_errorequipment"></table>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- showErrorEquipment End -->

<!-- logAdmin Start -->
<div id="admin_panel_log" class="dn" style="width:96%;position:absolute;top:10px;padding:0 auto;">
    <div class="layui-form">
        <div class="panel-checkbox-group">
            <div class="fl">
                <div>
                    <ul>
                        <li><input type="radio" name="logType" value="1" title="指定日期" checked=""></li>
                        <li><input id="input_begindate" name="date1" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                        <li><input id="input_enddate" name="date2" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"></li>
                    </ul>
                </div>

                <div class="ch"></div>
                <div class="panel-month-select">
                    <ul>
                        <li><input type="radio" name="logType" value="2" title="指定月份"></li>
                        <li><input id="input_monthdate" name="date3" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy-MM'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="panel-year-select">
                    <ul>
                        <li><input type="radio" name="logType" value="3" title="指定年份"></li>
                        <li><input id="input_yeardate" name="date4" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'yyyy'})"></li>
                    </ul>
                </div>
                <div class="ch"></div>
            </div>

            <div class="fr panel-button-group">
                <div id="control_log_search" class="layui-btn layui-btn-normal">查询</div>
                <div id="control_log_output" class="layui-btn layui-btn-normal">导出Excel</div>
                <!-- <div id="control_log_stop" class="layui-btn layui-btn-normal">停止</div>-->
            </div>
            <div class="ch"></div>
        </div>

        <div class="panel-table-group">
            <table id="tb_log"></table>
        </div>
    </div>
</div>
<div class="ch"></div>
<!-- logAdmin End -->


<!-- controlLED Start -->
<div id="controlLED_panel" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="layui-tab layui-tab-card">
            <ul class="layui-tab-title">
                <li class="layui-this">环境控制方案</li>
                <li>时钟控制方案</li>
            </ul>
            <div class="layui-tab-content">
                <!-- 环境控制方案 Start -->
                <div class="layui-tab-item layui-show">
                    <div class="tab_select" onClick="changeTab(this,1);">控制方案判断阙值</div>
                    <div class="tab_noselect" onClick="changeTab(this,2);">设备关系表</div>
                    <div class="panel-dev-select">
                        <ul>
                            <li>亮度检测:
                                <div class="layui-inline">
                                    <div class="layui-input-inline">
                                        <select id="controlLED_select" lay-filter="controlLED_select">
                                            <option value="0" selected>请选择</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="ch"></div>

                    <div id="tabinfo1" class="tab_show">

                        <!-- 控制方案判断阙值 Start -->
                        <div class="layui-tab-item layui-show">
                            <div class="fl control-panel-title">晴天方案：</div>
                            <div class="fl">
                                <div class="control-panel-line"><input id="input_outvala2" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div> <=洞外光强度<=<input id="input_outvala1" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div></div>
                                <div class="control-panel-line"><input id="input_invala2" name="date4" type="text" class="control-input"><div class="control-span">lux</div> <=洞内光强度<=<input id="input_invala1" name="date4" type="text" class="control-input"><div class="control-span">lux</div></div>
                            </div>
                            <div class="fl relation_webrow">
                                <div class="fl"><input id="qin_use" type="checkbox" name="qinUse" title="是否启用"></div>
                                <div class="fl"><input id="qin_hint" type="checkbox" name="qinHint" title="控制时是否提示"></div>
                            </div>
                            <div class="ch"></div>

                            <div class="fl control-panel-title">阴天方案：</div>
                            <div class="fl">
                                <div class="control-panel-line"><input id="input_outvalb2" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div> <=洞外光强度<=<input id="input_outvalb1" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div></div>
                                <div class="control-panel-line"><input id="input_invalb2" name="date4" type="text" class="control-input"><div class="control-span">lux</div> <=洞内光强度<=<input id="input_invalb1" name="date4" type="text" class="control-input"><div class="control-span">lux</div></div>
                            </div>
                            <div class="fl relation_webrow">
                                <div class="fl"><input id="yin_use" type="checkbox" name="yinUse" title="是否启用"></div>
                                <div class="fl"><input id="yin_hint" type="checkbox" name="yinHint" title="控制时是否提示"></div>
                            </div>
                            <div class="ch"></div>

                            <div class="fl control-panel-title">晚上方案：</div>
                            <div class="fl">
                                <div class="control-panel-line"><input id="input_outvalc2" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div> <=洞外光强度<=<input id="input_outvalc1" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div></div>
                                <div class="control-panel-line"><input id="input_invalc2" name="date4" type="text" class="control-input"><div class="control-span">lux</div> <=洞内光强度<=<input id="input_invalc1" name="date4" type="text" class="control-input"><div class="control-span">lux</div></div>
                            </div>
                            <div class="fl relation_webrow">
                                <div class="fl"><input id="wan_use" type="checkbox" name="wanUse" title="是否启用"></div>
                                <div class="fl"><input id="wan_hint" type="checkbox" name="wanHint" title="控制时是否提示"></div>
                            </div>
                            <div class="ch"></div>

                            <div class="fl control-panel-title">夜间方案：</div>
                            <div class="fl">
                                <div class="control-panel-line"><input id="input_outvald2" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div> <=洞外光强度<=<input id="input_outvald1" name="date4" type="text" class="control-input"><div class="control-span">cd/m2</div></div>
                                <div class="control-panel-line"><input id="input_invald2" name="date4" type="text" class="control-input"><div class="control-span">lux</div> <=洞内光强度<=<input id="input_invald1" name="date4" type="text" class="control-input"><div class="control-span">lux</div></div>
                            </div>
                            <div class="fl relation_webrow">
                                <div class="fl"><input id="ye_use" type="checkbox" name="yeUse" title="是否启用"></div>
                                <div class="fl"><input id="ye_hint" type="checkbox" name="yeHint" title="控制时是否提示"></div>
                            </div>
                            <div class="ch"></div>

                            <div class="control-panel-title">方案切换间隔时间：<input id="input_zmintal" name="date4" type="text" class="control-input">分钟   <div id="control_LED_plan_save" class="fr layui-btn layui-btn-normal">设置</div> </div>
                        </div>
                        <!-- 控制方案判断阙值 End -->
                    </div>
                    <div id="tabinfo2" class="tab_noshow">
                        <!-- 设备关系表 Start -->
                        <div class="panel-dev-select">
                            <ul>
                                <li>方案配置：
                                    <div class="layui-inline">
                                        <div class="layui-input-inline">
                                            <select id="led_plan_select" lay-filter="led_plan_select">
                                                <option value="0" selected>请选择</option>
                                                <option value="1" arrnum="0">晴天</option>
                                                <option value="2" arrnum="1">阴天</option>
                                                <option value="3" arrnum="2">晚上</option>
                                                <option value="4" arrnum="3">夜间</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="ch"></div>
                        <div id="dn_ledrelation_checkbox"></div>
                        <div id="control_LED_relation_save" class="layui-btn layui-btn-normal">设置</div>
                        <div class="panel-table-group-small">
                            <table id="tb_ledrelation"></table>
                            <div id="dn_ledrelation_total" class="dn"></div>
                            <div id="dn_ledrelation_id" class="dn"></div>
                        </div>
                        <!-- 设备关系表 End -->
                    </div>
                </div>
                <!-- 环境控制方案 End -->
                <!-- 时钟控制方案 Start -->
                <div class="layui-tab-item">
                    <div class="fl panel-dev-select2">
                        <ul>
                            <li>方案配置：
                                <div class="layui-inline">
                                    <div class="layui-input-inline">
                                        <select id="ledtime_plan_select" lay-filter="ledtime_plan_select">
                                            <option value="0" arrnum="-1" tunnel="-1" selected>请选择</option>
                                            <option value="1" arrnum="0" tunnel="-1">时间1</option>
                                            <option value="2" arrnum="1" tunnel="-1">时间2</option>
                                            <option value="3" arrnum="2" tunnel="-1">时间3</option>
                                            <option value="4" arrnum="3" tunnel="-1">时间4</option>
                                            <option value="5" arrnum="4" tunnel="-1">时间5</option>
                                            <option value="6" arrnum="5" tunnel="-1">时间6</option>
                                            <option value="7" arrnum="6" tunnel="-1">时间7</option>
                                            <option value="8" arrnum="7" tunnel="-1">时间8</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="ch"></div>
                    <div class="fl panel-dev-select2">
                        <ul>
                            <li>动作时间：
                                <div class="layui-inline">
                                    <div class="layui-input-inline">
                                        <input id="input_led_actiontime" name="actionTime" type="text" class="search-input" onFocus="WdatePicker({dateFmt:'HH:mm',isShowToday:false})">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="fr relation_webrow">
                        <div class="fl"><input id="ledtime_use" type="checkbox" name="ledTimeUser" title="是否启用"></div>
                        <div class="fl"><input id="ledtime_hint" type="checkbox" name="ledTimeHint" title="控制时是否提示"></div>
                    </div>
                    <div class="ch"></div>
                    <div id="control_LED_time_save" class="layui-btn layui-btn-normal">设置</div>
                    <div class="panel-table-group-small">
                        <table id="tb_ledtime"></table>
                        <div id="dn_ledtime_total" class="dn"></div>
                        <div id="dn_ledtime_id" class="dn"></div>
                    </div>
                </div>
                <!-- 时钟控制方案 End -->
            </div>

        </div>
    </div>
</div>
<div class="ch"></div>
<!-- controlLED End -->

<!-- controlFAN Start -->
<div id="controlFAN_panel" class="dn" style="position:absolute;top:10px;">
    <div class="layui-form">
        <div class="layui-tab layui-tab-card">
            <ul class="layui-tab-title">
                <li class="layui-this">控制方案判断阙值</li>
                <li>设备关系表</li>
            </ul>
            <div class="layui-tab-content">
                <div class="panel-dev-select">
                    <ul>
                        <li>COVI检测：
                            <div class="layui-inline">
                                <div class="layui-input-inline">
                                    <select id="controlFAN_select" lay-filter="controlFAN_select">
                                        <option value="0" tunnel="-1" selected>请选择</option>
                                    </select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="ch"></div>
                <div class="layui-tab-item layui-show">
                    <!-- 控制方案判断阙值 Start -->
                    <div class="control-panel-title-checkrow"><input id="fan_useFan" type="checkbox" name="useFan" lay-skin="primary" title="是否启用"></div>
                    <div class="layui-tab-item layui-show">
                        <div class="fl control-panel-title control-panel-title-width">隧道正常参数范围：<div class="control-panel-title-check"><input id="fan_hintFan1" type="checkbox" name="hintFan1" lay-skin="primary" title="控制时是否提示"></div></div>
                        <div class="fl">
                            <div class="control-panel-line"><input id="input_c1cmin" name="date4" type="text" class="control-input"><div class="control-span">ppm</div><div class="control-span2"><=CO值<=</div><input id="input_c1cmax" name="date4" type="text" class="control-input"><div class="control-span">ppm</div></div>
                            <div class="control-panel-line"><input id="input_c1vmin" name="date4" type="text" class="control-input"><div class="control-span">m</div><div class="control-span2"><=VI值<=</div><input id="input_c1vmax" name="date4" type="text" class="control-input"><div class="control-span">m</div></div>
                        </div>
                        <div class="ch"></div>

                        <div class="fl control-panel-title control-panel-title-width">隧道预警参数范围：<div class="control-panel-title-check"><input id="fan_hintFan2" type="checkbox" name="hintFan2" lay-skin="primary" title="控制时是否提示"></div></div>
                        <div class="fl">
                            <div class="control-panel-line"><input id="input_c2cmin" name="date4" type="text" class="control-input"><div class="control-span">ppm</div><div class="control-span2"><=CO值<=</div><input id="input_c2cmax" name="date4" type="text" class="control-input"><div class="control-span">ppm</div></div>
                            <div class="control-panel-line"><input id="input_c2vmin" name="date4" type="text" class="control-input"><div class="control-span">m</div><div class="control-span2"><=VI值<=</div><input id="input_c2vmax" name="date4" type="text" class="control-input"><div class="control-span">m</div></div>
                        </div>
                        <div class="ch"></div>

                        <div class="fl control-panel-title control-panel-title-width">隧道关闭参数范围：<div class="control-panel-title-check"><input id="fan_hintFan3" type="checkbox" name="hintFan3" lay-skin="primary" title="控制时是否提示"></div></div>
                        <div class="fl">
                            <div class="control-panel-line"><input id="input_c3cmin" name="date4" type="text" class="control-input"><div class="control-span">ppm</div><div class="control-span2"><=CO值<=</div><input id="input_c3cmax" name="date4" type="text" class="control-input"><div class="control-span">ppm</div></div>
                            <div class="control-panel-line"><input id="input_c3vmin" name="date4" type="text" class="control-input"><div class="control-span">m</div><div class="control-span2"><=VI值<=</div><input id="input_c3vmax" name="date4" type="text" class="control-input"><div class="control-span">m</div></div>
                        </div>
                        <div class="ch"></div>

                        <div class="control-panel-title">方案切换间隔时间：<input id="input_fjintal" name="date4" type="text" class="control-input">分钟   <div id="control_FAN_plan_save" class="fr layui-btn layui-btn-normal">设置</div> </div>
                    </div>
                    <!-- 控制方案判断阙值 End -->
                </div>
                <div class="layui-tab-item">
                    <!-- 设备关系表 Start -->
                    <div class="fl panel-dev-select2">
                        <ul>
                            <li>对应方向：
                                <div class="layui-inline">
                                    <div class="layui-input-inline">
                                        <select id="fan_plan_select" lay-filter="fan_plan_select">
                                            <option value="0" selected>请选择</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="ch"></div>
                    <div id="control_FAN_relation_save" class="layui-btn layui-btn-normal">设置</div>
                    <div class="panel-table-group-small">
                        <table id="tb_fanrelation"></table>
                        <div id="dn_fanrelation_total" class="dn"></div>
                        <div id="dn_fanrelation_id" class="dn"></div>
                    </div>
                    <!-- 设备关系表 End -->
                </div>

            </div>

        </div>
    </div>
</div>
<div class="ch"></div>
<!-- controlFAN End -->



<!-- ptz_objid start -->
<div id="ptz_objid" class="dn" style="position:absolute;top:10px;"></div>
<div class="ch"></div>
<!-- ptz_objid end-->


</body>
</html>
<script src="js/opencms.js"></script>

