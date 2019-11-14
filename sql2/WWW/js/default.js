function getusedata() {
    $.ajax({
        url:"bcd/php/getusedata.php",
        dataType:"json",
        type:"get",
        success:function (res) {
            if(res.code==1) {
                var usedata = res.data.name;
                var usehead =    "<img src=\"./pic2/user.png\" class=\"layui-nav-img\"  id=\"useimg\"> "+usedata+"";
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
                    // console.log(devpic[i].pic);
                    var usehead = "<a style=\"cursor:pointer;\"  onclick=\"devclick("+i+")\" id=\"dev_iphone"+i+"\" ><img  id=\"useimg"+i+"\" src=\""+devpic[i].pic+"\"  style=\"width: 20px;height: 20px;\"   \"></a>";
                    $("#dev-nav-"+i+"").html(usehead);
                }
            }
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

//点击事件
function devclick(num){
    if($("#useimg"+num+"").width() == 50  && $("#useimg"+num+"").height() == 50){
        $("#useimg"+num+"").css("width","20px");
        $("#useimg"+num+"").css("height","20px");
    }else{
        $("#useimg"+num+"").css("width","50px");
        $("#useimg"+num+"").css("height","50px");
    }
}

