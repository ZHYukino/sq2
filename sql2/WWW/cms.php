
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

<!--    下拉-->
    <link rel="stylesheet" href="jspackage/jiaoben2206/css/style.css" />
</head>
<body>

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
    <div style="width: 300px;height: 400px;position: absolute;top: 65px;background-color: #00b7ee">123</div>
    <div class="cms_three" style="margin-left: 300px">
        <div id="cmsshowlist" ></div>
        <div  style="position:absolute; ">
            <div style="overflow:scroll;height:240px;">
            <ul id='tree' class="tree" >
            </div>
        </div>
        <div id="cmsshowlists">
            <table class="layui-table" lay-size="sm"  >
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
            <div >
                <?php
                echo "<div class=" . $_GET["cms"] . "affiche   ;  style=' width: 96%; height: 30px;margin: 0 auto;position: relative;  overflow: hidden;background: #000000;   width: 320px;   height: 32px; position: absolute; border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'>";
                echo "<div class=" . $_GET["cms"] . "affiche_text0  ;  style='position: absolute; height:32px;width:320px;' >";
                echo "<span class=" .$_GET["cms"] . "test_content0  ; style=' position:absolute ;margin-top:3px '></span>";
                echo "</div>";
                echo "</div>";
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

<script type="js/timer-master/timer.js"></script>
<script src="js/opencms.js"></script>


<script>

    id =<?php  echo $_GET["cms"]; ?>;
    trees(id,"cms");
    varname="var"+id+"";                  //这是防止重复cms重复的变量
    window[varname] = 100;

    //获得门架的数据
    function getcmsshow(id,type=0,cid) {
        $.ajax({
            type: "GET",
            url: "bcd/php/cmsshow.php?itype=2&id="+id+"",
            dataType: "json",
            async: false,
            success:function (res) {
               window.rescount = res.count;
                cmssetdota(id,res,res.count,type,cid);
            }
        })
    }
    
    day(<?php  echo $_GET["cms"]; ?>)
    function day(id) {
    //防止执行两次 运动
       if (!window["var" + id + ""]) return false;
        //如果通过setxy移动过限速标志情报板就不再修改位置
        $("#" + id + "affiche").show();
        getcmsshow(id);
    }

    //上传情报板
    $("#cms_upload").click(function(){
        id =<?php  echo $_GET["cms"]; ?>;
         $.ajax({
            type: "GET",
            url: "bcd/php/setcms.php?itype=5&id="+id+"",
            dataType: "json",
            success:function (res) {
               if(res.iresult == 1){
                 layer.msg(res.sinfo);
               }else{
                 layer.msg(res.sinfo);
               }
            }
        })
    })

    window.id = <?php  echo $_GET["cms"]; ?>;
    //更改情报版
   function ajaxup(i,check,act,name=null){
         $.ajax({
            type: "GET",
            url: "bcd/php/cmsshow.php?itype=1&id="+id+"&item="+i+"&check="+check+"&act="+act+"&picname="+name+"",
            dataType: "json",
            anync:false,
            cache:false,
            success:function (res) {
               if(res.code == 0 ){
                    getcmsshow(id,i+1,name);
               }
            }
        })
   }

checkpicid = "";
//选中的图片方法
function checkthispic(id){
    if( id == checkpicid){
        return false;
    }
    $("#"+id+"").css('border',"4px solid #0088cc");
    var $this= $("#"+id+"");
    var path = $this[0].src;
    filename = "";
    if(path.indexOf("/") != -1)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
    {
        filename=path.substring(path.lastIndexOf("/")+1,path.length);
    }
    $("#"+checkpicid+"").css('border',"");
    $("#"+checkpicid+"").animate({
        //获得当前元素的宽度并*2
        width:50,
        height:50,
        padding:0
    },300);
    $("#"+checkpicid+"i").children().remove();
    checkpicid = id;
}


//修改情报板参数

 function updatecmsini(i,cid=null){
    var stoptime = new Array();
    var check = new Array();
    var speed = new Array();
    var picx = new Array();
    var fontcolor = new Array();
    var content = new Array();
    var fontstyle = new Array();
    var fontx = new Array();
    var fontsize = new Array();

      //上传
    layui.use('upload', function(){
        id = <?php  echo $_GET["cms"]; ?>;
      var upload = layui.upload;
      //执行实例
      var uploadInst = upload.render({
        elem: "#filepic"+i+"" //绑定元素
        ,url: 'bcd/php/setcms.php?itype=1&id='+id+'&picnum='+cid+'' //上传接口
        ,accept: 'file' //允许上传的文件类型
          ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
              layer.load(); //上传loading
           }
        ,done: function(res){
          //上传完毕回调
          if(res.iresult == 1){
              layer.closeAll('loading'); //关闭loading
            ajaxup(i,res.picname,act = 3,"图片"+cid+"");
            layer.msg(res.sinfo);
              layer.closeAll('loading'); //关闭loading
          }
          if(res.code == -1){
              layer.closeAll('loading'); //关闭loading
             layer.msg(res.msg);
              layer.closeAll('loading'); //关闭loading
          }
        }
        ,error: function(){
          //请求异常回调
        }
      });
    });



    //stoptime
    stoptime[i] = $(".stoptime"+i+"").val();
    $(".stoptime"+i+"").blur(function () {
        //跟原值不同触发ajax请求修改后台
        if($(this).val() != stoptime[i]){
            ajaxup(i,$(this).val(),act = 0);
            stoptime[i] = $(this).val();
        }
    })

    //check
    check[i] = $(".check"+i+"").val();
    $(".check"+i+"").change(function(){
        if($(this).val() != check[i]){
            ajaxup(i,$(this).val(),act = 1);
            check[i] = $(this).val();
        }
    })

     //speed
    speed[i] = $(".speed"+i+"").val();
    $(".speed"+i+"").blur(function () {
        //跟原值不同触发ajax请求修改后台
        if($(this).val() != speed[i]){
            ajaxup(i,$(this).val(),act = 2);
            speed[i] = $(this).val();
        }
    });



     //picx
     picx[i] = $(".picx"+i+"").val();
    $(".picx"+i+"").blur(function () {
        //跟原值不同触发ajax请求修改后台
        if($(this).val() != picx[i]){
            ajaxup(i,$(this).val(),act = 4,"图片"+cid+"");
            picx[i] = $(this).val();
        }
    });


     //allpic
     $("#selectpic"+i+"").click(function () {
         //  console.log(cid);//图片 1 2
         //  console.log(i);//动作id
         $("#allpicture").children().remove();
         $.ajax({
             type:"get",
             url:"bcd/php/cmsshow.php?itype=7&id="+id+"&item="+i+"&cid="+cid+"",
             cache:false,
             dataType:"json",
             success(res){
                 var img ="<ul >";
                 var num = 0;
                 for (var key in res.data){
                    //图片名字
                     var pciname=res.data[key].substring(res.data[key].lastIndexOf("/")+1,res.data[key].length);
                     num +=1;
                     img += "<a  href=\"javascript:;\"  style='height: 100px;width: 100px' ><span style='position: absolute;margin-left: 30px;margin-top: 105px;font-family: KaiTi;'>"+pciname+"</span><img id=\"allpic"+key+"\" src=\""+res.data[key]+"\"  onclick='checkthispic(this.id);'  style=\"width:50px;height: 50px;margin: 30px\"></a>"
                     if(num%5 == 0){
                        img += "<br>";
                     }
                  }
                 img +="</ur>"
                 $("#allpicture").append(img);
             }
         })
         layer.open({
             type: 1
             ,area: ['670px', '480px']
             ,title:'图片选择'
             ,content:$("#allpicture")
             ,btn: ['提交','关闭']
             ,id:"selectpic"
             ,btn1: function(index, layero){
                 $("#allpicture").children().remove();
                  ajaxup(i,filename,act = 3,"图片"+cid+"");
                 checkpicid = "";
                 layer.close(index);
             },btn2: function(index, layero){
                 $("#allpicture").children().remove();
                 checkpicid = "";
                 layer.close(index);
             }
         })
     })


    //fontcolor
     fontcolor[i] = $(".fontcolor"+i+"").val();
    $(".fontcolor"+i+"").change(function () {
        if($(this).val() != fontcolor[i]){
            ajaxup(i,$(this).val(),act = 5,"文字");
            fontcolor[i] = $(this).val();
        }
    })



    //fontstyle
   fontstyle[i] = $(".fontstyle"+i+"").val();
    $(".fontstyle"+i+"").change(function () {
        if($(this).val() != fontstyle[i]){
            ajaxup(i,$(this).val(),act = 6,"文字");
            fontstyle[i] = $(this).val();
        }
    })

     //更改内容
    content[i] = $(".content"+i+"").val();
    $(".content"+i+"").blur(function () {
        if($(this).val() != content[i]){
            ajaxup(i,$(this).val(),act = 7,"文字");
            content[i] = $(this).val();
        }
    })
    //fontx
    fontx[i] = $(".fontx"+i+"").val();
    $(".fontx"+i+"").blur(function () {
        //更改内容 x值
        if($(this).val() != fontx[i]){
            ajaxup(i,$(this).val(),act = 8,"文字");
            fontx[i] = $(this).val();
        }
    })
    //fontsize
   fontsize[i] = $(".fontsize"+i+"").val();
    $(".fontsize"+i+"").change(function() {  
        if($(this).val() !=  fontsize[i]){
            ajaxup(i,$(this).val(),act = 9,"文字");
             fontsize[i] = $(this).val();
        }
    }); 
}

</script>
