
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
    <meta name="renderer" content="ie-comp">

    <title id="title_name"></title>

    <meta name="renderer" content="ie-comp">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!---------- CSS ---------->
    <link href="jspackage/backthemes/css/bootstrap.min14ed.css" rel="stylesheet">
    <link href="jspackage/backthemes/css/font-awesome.min93e3.css" rel="stylesheet">

    <!-- 拖动 -->
    <link href="jspackage/jquery-ui/jquery-ui-1.10.4.min.css" rel="stylesheet">
    <!-- layui组件 -->
    <link href="jspackage/layui/css/layui.css" media="all" rel="stylesheet">
    <!-- 表格 -->
    <link href="jspackage/backthemes/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- 自定义 -->
    <link href="css/pagestyle.css?vs=112" rel="stylesheet">
    <link href="css/tunnel.css"  rel="stylesheet">
    <!--    tree-->
    <link type="text/css" rel="stylesheet" href="jspackage/rightMenu/zTreeStyle/zTreeStyle.css" />
    <link type="text/css" rel="stylesheet" href="jspackage/rightMenu/zTreeStyle/zTreeIcons.css" />
    <link type="text/css" rel="stylesheet" href="jspackage/rightMenu/css/trees.css" />
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
<body>

<!-- 拖动 -->
<script src="jspackage/jquery-ui/jquery-ui-1.10.4.min.js"></script>
<!-- 右键 -->
<script src="jspackage/rightclick/contextmenu.r2.js"></script>
<!-- layui -->
<script src="jspackage/layui/layui.all.js"></script>


<!--tree-->
<script type="text/javascript" src="jspackage/rightMenu/js/trees.js"></script>


<!-- ptz_objid start -->
<div id="ptz_objid" class="dn" style="position:absolute;top:10px;"></div>
<div class="ch"></div>
<!-- ptz_objid end-->

<div id="cms_one"  style="position:absolute;top:10px;margin: 10px 10px;">
    <div class="cms_three">
        <div id="devcms_show"></div>
        <div class="layui-upload" style="width: 1500px;height: 38px">

        </div>
        <div id="cmsshowlist" >

        </div>
        <div  style="position:absolute;width: 350px; ">
            <ul id='tree' class="tree" style="width: 350px;">
        </div>

        <div id="cmsshowlists">
            <table class="layui-table" lay-size="sm" style="margin-top: 45px" >
              <colgroup>
                <col width="70">
                <col width="200">
                <col>
              </colgroup>
              <thead id="updatecms">
                <tr>
                  <th>名称</th>
                  <th>信息</th>
                </tr>
              <!--   <tr>
                  <td>sentsin</td>
                  <td>2016-11-27</td>
                </tr>  -->
              </thead>
            </table>
        </div>

        <div id="rMenu" style="position: absolute">
            <li>
                <ul id="r_addFolder"><li>增加文件夹</li></ul>
                <ul id="r_addNode"><li>增加节点</li></ul>
                <ul id="r_updateNode"><li>修改名称</li></ul>
                <ul id="r_deleteNode"><li>删除节点</li></ul>
            </li>
        </div>
        <div id="dev_cms_run" style="border: 1px solid #a5a5a5!important;padding:14px;border-radius: 16px!important;">
            <div style="width: 500px;height: 100px">
                <?php
                echo "<div class=" . $_GET["cms"] . "affiche   ;  style=' width: 96%; height: 30px;margin: 0 auto;position: relative;  overflow: hidden;background: #000000;   width: 320px;   height: 32px; position: absolute; border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'>";
                echo "<div class=" . $_GET["cms"] . "affiche_text0  ;  style='position: absolute; height:32px;width:320px;' >";
                echo "<span class=" .$_GET["cms"] . "test_content0  ; style=' position:absolute ;margin-top:3px '></span>";
                echo "</div>";
                echo "</div>";
                ?>
            </div>
            <div id="cms_bigdiv" style="margin-top: 200px;margin-left: 0px;position: absolute;">
            <?php
            for($i=0;$i<count($cms);$i++) {
                if(isset($cms[$i])) {
                    echo "<div id=" . $cms[$i]["id"] . "affiche   ;  style='display: block; width: 96%; height: 30px;margin: 0 auto;position: absolute;  overflow: hidden;background: #000000;   width: 320px;   height: 32px; position: absolute; display: none;border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'>";
                    ?>
                  </div>
             <?php  }
            }
            ?>
            </div>
        </div>
    </div>


</body>
</html>
<script>
    var cmsbtn = " <button id=\"cms_upload\" type=\"button\" class=\"layui-btn layui-btn-normal\">播放发送</button>\n" +
        " <button id=\"cms_down\" type=\"button\" class=\"layui-btn layui-btn-normal\">播放获取</button>\n" +
        " <button id=\"cms_getlight\" type=\"button\" class=\"layui-btn layui-btn-primary\">获取亮度</button>\n" +
        "              <button id=\"cms_setlight\" type=\"button\" class=\"layui-btn layui-btn-primary\">设置亮度</button>\n" +
        "              <div class=\"layui-input-inline\">\n" +
        "                  <input type=\"tel\" name=\"phone\" lay-verify=\"required|phone\" autocomplete=\"off\" class=\"layui-input\" style=\"width: 80px; height: 26px;background: #d0c0cf\">\n" +
        "              </div>";
    $(".layui-upload").append(cmsbtn);
    $("#cmsshowlist").text("播放列表");
</script>

<script src="js/opencms.js"></script>

<script>
     trees(<?php  echo $_GET["cms"]; ?>)

    varname="var<?php  echo $_GET["cms"]; ?>";                  //这是防止重复cms重复的变量
    window[varname] = 100;
    varcmsbtn="cms<?php  echo $_GET["cms"]; ?>";                  //这是关闭cms的变量
    window[varcmsbtn] = true;
    //获得门架的数据
    function getcmsshow(id,type=0,cid) {
        $.ajax({
            type: "GET",
            url: "bcd/php/cmsshow.php?itype=2&id="+id+"",
            dataType: "json",
            async: false,
            success:function (res) {
               
                cmssetdota(id,res,res.count,type,cid);
               
            }
        })
    }
    day(<?php  echo $_GET["cms"]; ?>)
    function day(id) {
        //如果为true 就是第一次打开cms ，false 为第二点击cms ，也就是关闭
        if (window["cms" + id + ""]) {
            window["cms" + id + ""] = false;
            $("#" + id + "affiche").show();
            //防止执行两次 运动
            console.log(window["var" + id + ""]);
            if (!window["var" + id + ""]) return false;
            //如果通过setxy移动过限速标志情报板就不再修改位置
            getcmsshow(id);
        } else {
            window["cms" + id + ""] = true;
            $("#" + id + "affiche").hide();
        }
    }
  

</script>

