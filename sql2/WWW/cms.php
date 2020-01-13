
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

<!---->
<!--    <link href="jspackage/backthemes/css/bootstrap.min14ed.css" rel="stylesheet">-->
<!--    <link href="jspackage/backthemes/css/font-awesome.min93e3.css" rel="stylesheet">-->

    <!-- 拖动 -->
    <link href="jspackage/jquery-ui/jquery-ui-1.10.4.min.css" rel="stylesheet">
    <!-- layui组件 -->
    <link href="jspackage/layui/css/layui.css" media="all" rel="stylesheet">
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
    <script type="text/javascript" src="jspackage/rightMenu/js/jquery-ztree-2.5.js"></script>

<!--    下拉-->
    <link rel="stylesheet" href="jspackage/jiaoben2206/css/style.css" />
</head>
<body >

<!-- 拖动 -->
<script src="jspackage/jquery-ui/jquery-ui-1.10.4.min.js"></script>
<!-- 右键 -->
<script src="jspackage/rightclick/contextmenu.r2.js"></script>
<!-- layui -->
<script src="jspackage/layui/layui.all.js"></script>
<script>
    //三级菜单
    $(document).ready(function() {
        $( '.dropdown' ).hover(
            function(){
                $(this).children('.sub-menu').slideDown(200);
            },
            function(){
                $(this).children('.sub-menu').slideUp(200);
            }
        );
    });
</script>
<!--tree-->
<script type="text/javascript" src="jspackage/rightMenu/js/trees.js"></script>
<!-- ptz_objid start -->
<div id="ptz_objid" class="dn" style="position:absolute;top:10px;"></div>
<div class="ch"></div>
<!-- ptz_objid end-->

<div id="cms_one"  >
    <div id="devcms_show_upload" class="layui-upload" ></div>
    <div style="width: 300px;height: 400px;position: absolute;top: 65px;background-color: ">
        <div id="seedcmsplay"></div>
    </div>
    <div class="cms_three" style="overflow:scroll;height: 1000px">
        <div id="cmsshowlist"  ></div>
        <div  style="position:absolute; ">
            <div style="overflow:scroll;height:200px;width: 350px">
                <ul id='tree' class="tree" style="height: 250px;margin-bottom: 200px" >
            </div>
        </div>
        <div id="cmsshowlists" style="overflow:scroll;height:250px;">
            <table class="layui-table" lay-size="sm" style="margin-bottom: 100px">
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
                 <tr>
                  <td>动作序号</td>
                  <td></td>
                </tr>
                <tr>
                  <td>出现方式</td>
                  <td></td>
                </tr>
                 <tr>
                  <td>出现速度</td>
                  <td></td>
                </tr>
              </thead>
            </table>
        </div>
        <div id="allpicture" style=""></div>
        <div id="rMenu">
            <li>
                <ul id="r_addFolder"><li>添加动作</li></ul>
                <ul id="r_addNode"><li>增加图片</li></ul>
                <ul id="r_deleteNode"><li>删除</li></ul>
            </li>
        </div>
        <div id="dev_cms_run" >
            <div style="margin-top: 50px">
                <?php
                for($i=0;$i<count($cms);$i++) {
                    echo "<div class=" . $cms[$i]["id"] . "affiche   ;  style='display:none; width: 96%; height: 30px;margin: 0 auto;position: relative;  overflow: hidden;background: #000000;   width: 320px;   height: 32px; position: absolute; border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'>";
                    echo "<div class=" . $cms[$i]["id"] . "affiche_text0  ;  style='position: absolute; height:32px;width:320px;' >";
                    echo "<span class=" . $cms[$i]["id"] . "test_content0  ; style=' position:absolute ;margin-top:3px '></span>";
                    echo "</div>";
                    echo "</div>";
                }
                ?>
            </div>
            <div id="cms_bigdiv" >
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

<script src="js/opencms.js"></script>

<script>
    id = <?php  echo $_GET["cms"]; ?>;
    trees(id,"cms");
    firstdevstars = new Array();
    starsplaycms(id);
    function starsplaycms(id) {
        //如果通过setxy移动过限速标志情报板就不再修改位置
        $("#" + id + "affiche").show();
        $("." + id + "affiche").show();
        if(firstdevstars[id] === false) return false;
        getcmsshow(id);
        firstdevstars[id] = false;
    }
    function checkcmsplay(playcmsdevid){
        $("#" + id + "affiche").hide();
        $("." + id + "affiche").hide();
        id = playcmsdevid;
        trees(id,"cms");
        starsplaycms(id);
    }


</script>
<script src="js/checkcms.js"></script>