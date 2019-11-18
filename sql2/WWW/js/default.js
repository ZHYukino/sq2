


$(document).bind("contextmenu", function () {
    console.log("用户点击鼠标右键....." + new Date().getTime());
    return false;
});


function getusedata() {
    $.ajax({
        url:"bcd/php/getusedata.php",
        dataType:"json",
        type:"get",
        success:function (res) {
            if(res.code==1) {
                window.usedata = res.data.name;
                var usehead =    "<img src=\"./pic2/user.png\" class=\"layui-nav-img\"  id=\"typeimg\"> "+usedata+"";
                $(".useid").html(usehead);
                $("#usehead_nav").show();
            }
        }
    })
}

getusedata();
roadpara();
//加载栏目图片和设备
function roadpara(){
    $.ajax({
        url:"bcd/php/getroadpara.php?itype=1",
        dataType:"json",
        type:"get",
        cache:false,
        success:function (res) {
            if(res.code==1) {
                var devpic = res.data;
                for(var i= 0;i<res.count;i++){
                    var typeid = res.data[i].iid;
                    var usehead = "<a style=\"cursor:pointer;\"  onclick=\"devclick("+typeid+")\" id=\"dev_iphone"+i+"\" ><img  id=\"typeimg"+typeid+"\" src=\""+devpic[i].pic+"\"  style=\"width: 20px;height: 20px;\"   \"></a>";
                    $("#dev-nav-"+i+"").html(usehead);
                }
            }
        }
    })
}

//点击标题栏事件
function devclick(num){
    if($("#typeimg"+num+"").width() == 50  && $("#typeimg"+num+"").height() == 50){
        $("#typeimg"+num+"").css("width","20px");
        $("#typeimg"+num+"").css("height","20px");
        $("."+num+"").hide();
        var checknum = 0;
    }else{
        $("#typeimg"+num+"").css("width","50px");
        $("#typeimg"+num+"").css("height","50px");
        $("."+num+"").show();
        var checknum = 1;
    }
    $.ajax({
        url:"bcd/php/getcheck.php?itype=3&id="+num+"&checknum="+checknum+"",
        dataType:"json",
        type:"get",
        cache:false,
        success:function (res) {
            
        }
    })
}
//托动
function devmove(id) {
    $(document).keyup(function (event){
        if(event.keyCode == 17) {
            $("#"+id+"").draggable('disable');
        }
    })
    $(document).keydown(function (event){
        if(event.keyCode == 17){
            $("#"+id+"").draggable({
                start: function () {
                    flag = false;
                },
                stop: function () {
                    setTimeout(function () {
                        flag = true;
                    }, 500);
                    var type = $(this).attr("class");
                    var id = $(this).attr("id");
                    var xvalue = $(this).offset().left ;
                    var yvalue = $(this).offset().top ;
                    var wvalue = $(window).width();
                    var hvalue = $(window).height();
                    xvalue = xvalue * 100 / wvalue;
                    yvalue = yvalue * 100 / hvalue;
                    //验证数据
                    if (xvalue < 0) {
                        xvalue = 0
                    }
                    ;
                    if (yvalue < 0) {
                        yvalue = 0
                    }
                    ;
                    $.ajax({
                        type: "GET",
                        url: "bcd/php/setxy.php?itype=0&id=" + id + "&type=" + type + "&xvalue=" + xvalue + "&yvalue=" + yvalue + "&dc=" + new Date().getTime() + "",
                        //data:{},
                        dataType: "json",
                        success: function (mydata) {
                        }
                    })
                }
            });
            $("#"+id+"").draggable('enable');
        }
    })
}


//设备加载
roadpara2()
function roadpara2(){
    $.ajax({
        url:"bcd/php/getroadpara.php?itype=2",
        dataType:"json",
        type:"get",
        cache:false,
        success:function (res) {
            if(res.code==1) {
                var bodydev = "";
                for (var j = 0 ;j<res.count;j++){
                    var x = (res.data[j].ipointx==0) ? 0 :res.data[j].ipointx;
                    var y = (res.data[j].ipointy==0) ? 20 :res.data[j].ipointy;
                    var updown = (res.data[j].iupdown == 1) ?"上行":(res.data[j].iupdown == 2 ? "下行" :"变电所") ;
                    bodydev = "<div id=\""+res.data[j].iid+"\"  title=\""+res.data[j].scode+"\r"+res.data[j].scname+"\r"+updown+"\"  class=\""+res.data[j].itypeid+"\"  style=\"cursor:pointer;position:absolute;left: "+x+"%;top:"+y+"%  \"> <img src=\"pic2/"+res.data[j].picpath+"\"  style='width: 32px;height: 32px;'>"
                    if(res.data[j].itypeid == 22){
                        bodydev += "<div id=\"vdvalue"+res.data[j].iid+"\" style='font-size: 13px'>风速："+res.data[j].fengsu+ " <br>能见度："+res.data[j].nengjiandu+ "</div>";
                    }
                    bodydev += " </div>";
                    $("#dev_div_body").append(bodydev);
                    devmove(res.data[j].iid)
                }
            }
        }
    })
}

clicktype(2);
//页面载入
function clicktype(num){
    var num;
    $.ajax({
        type: "GET",
        url: "bcd/php/getcheck.php?itype="+num+"",
        cache:false,
        dataType: "json",
        success: function (mydata) {
            var check = mydata.data;
            for(var key in check) {
                 if(check[key] ==  1){
                     $("#typeimg"+key+"").css("width","50px");
                     $("#typeimg"+key+"").css("height","50px");
                     $("."+key+"").show();
                 }else if(check[key] ==  0){
                     $("#typeimg"+key+"").css("width","20px");
                     $("#typeimg"+key+"").css("height","20px");
                     $("."+key+"").hide();
                 }
            }
        }
    })
}










//修改密码
layui.use('layer', function(){
    $("#updatepass").click(function () {
        layer.open({
            type: 1
            ,area: ['500px', '350px']
            ,title:'密码修改'
            ,content:"<form class=\"layui-form\" action=\"\" lay-filter=\"example\">\n" +
                "<div class=\"layui-form-item\">\n" +
                "    <label class=\"layui-form-label\">输入框</label>\n" +
                "    <div class=\"layui-input-block\">\n" +
                "   <input type=\"text\"  id='username' value=\""+usedata+"\" name=\"username\" lay-verify=\"title\" autocomplete=\"off\"  class=\"layui-input\"  style='margin-top: 15px;width: 300px'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"layui-form-item\">\n" +
                "    <label class=\"layui-form-label\">旧密码</label>\n" +
                "    <div class=\"layui-input-block\">\n" +
                "      <input type=\"password\"  id='password'  name=\"password\" placeholder=\"请输入密码\" autocomplete=\"off\" class=\"layui-input\" style='margin-top: 15px;width: 300px'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                " <div class=\"layui-form-item\">\n" +
                "    <label class=\"layui-form-label\">新密码</label>\n" +
                "    <div class=\"layui-input-block\">\n" +
                "      <input type=\"password\" id='newpass'  name=\"password\" placeholder=\"请输入密码\" autocomplete=\"off\" class=\"layui-input\" style='margin-top: 15px;width: 300px'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                 " <div class=\"layui-form-item\">\n" +
                " <label class=\"layui-form-label\">重复新密码</label>\n" +
                "    <div class=\"layui-input-block\">\n" +
                "      <input type=\"password\"  id='renewpass' name=\"password\" placeholder=\"请输入密码\" autocomplete=\"off\" class=\"layui-input\" style='margin-top: 15px;width: 300px'>\n" +
                "    </div>\n" +
                "  </div></form>"
            ,btn: ['提交','关闭']
            ,btn1: function(index, layero){
                //按钮1
                var name = $.trim($("#username").val());
                var pass = $.trim($("#password").val());
                var newpass = $.trim($("#newpass").val());
                var renewpass = $.trim($("#renewpass").val());
                if(pass == "" || name ==""){
                    layer.msg('账号或密码不能为空');
                    return false;
                }
                if(newpass !== renewpass  ){
                    layer.msg('两个新密码不一致');
                    return false;
                }
                pass = EncryStrHex(EncryStrHex(pass,'user'),'lcrj');
                newpass = EncryStrHex(EncryStrHex(newpass,'user'),'lcrj');
                renewpass = EncryStrHex(EncryStrHex(renewpass,'user'),'lcrj');
                $.ajax({
                    type: "POST",
                    url: "bcd/php/updatepass.php?",
                    cache:false,
                    dataType: "json",
                    data:{'name':name,
                        'pass':pass,
                        'newpass':newpass,
                        'renewpass':renewpass,
                    },
                    success:function (res) {
                        layer.msg(res.msg);
                        if(res.code == 1){
                            layer.close(index);
                        }
                    }
                })
            }
            ,btn2: function(index){

            }
        });
    })
})



//登出
function logout(){
    $.ajax({
        type: "GET",
        url : "logout.php?sid=" + Math.random()+ "",
        //data:{},
        dataType: "text",
        async:false,
        success: function(mydata){
            location.replace("login.php");

        },
        error: function(mydata){
            alert("失败")
        }
    });
}


