function getusedata() {
    $.ajax({
        url:"bcd/php/getusedata.php",
        dataType:"json",
        type:"get",
        success:function (res) {
            if(res.code==1) {
                var usedata = res.data.name;
                var usehead =    "<img src=\"./pic2/user.png\" class=\"layui-nav-img\"  id=\"typeimg\"> "+usedata+"";
                $(".useid").html(usehead);
            }
        }
    })
}

getusedata();
roadpara();
//取得栏目图片和设备
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
                    var x = (res.data[j].ipointx==0) ? 50 :res.data[j].ipointx;
                    var hy = $(window).height();
                    var y = (res.data[j].ipointy==0) ? 50 :res.data[j].ipointy  ;
                     bodydev = "<div id=\""+res.data[j].iid+"\"   class=\""+res.data[j].itypeid+"\"  style=\"cursor:pointer;position:absolute;left: "+x+"%;top:"+y+"%  \"> <img src=\"pic2/"+res.data[j].picpath+"\"  style='width: 32px;height: 32px;'> </div>"
                    $("#dev_div_body").append(bodydev);
                    devmove(res.data[j].iid)
                }
            }
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


