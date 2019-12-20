


$(document).bind("contextmenu", function () {
    console.log("用户点击鼠标右键....." + new Date().getTime());
    return false;
});

//登陆者信息
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
                    var usehead = "<a style=\"cursor:pointer;\"  onclick=\"devclick("+typeid+")\" id=\"dev_iphone"+i+"\" ><img  id=\"typeimg"+typeid+"\" src=\""+devpic[i].pic+"\"  style=\"width:30px;height:30px;\"   \"></a>";
                    $("#dev-nav-"+i+"").html(usehead);
                }
            }
        }
    })
}

//点击标题栏事件
function devclick(num){
    if($("#typeimg"+num+"").width() == 50  && $("#typeimg"+num+"").height() == 50){
        $("#typeimg"+num+"").css("width","30px");
        $("#typeimg"+num+"").css("height","30px");
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
                var cmsnum = 0;
                var cmsid = new Array();
                var tcmsnum = 0;
                var tcmsid = new Array();
                for (var j = 0 ;j<res.count;j++){
                    var x = (res.data[j].ipointx==0) ? 0 :res.data[j].ipointx;
                    var y = (res.data[j].ipointy==0) ? 20 :res.data[j].ipointy;
                    var updown = (res.data[j].iupdown == 1) ?"上行":(res.data[j].iupdown == 2 ? "下行" :"变电所") ;
                    bodydev = "<div id=\""+res.data[j].iid+"\"  title=\""+res.data[j].scode+"\r"+res.data[j].scname+"\r"+updown+"\"  class=\""+res.data[j].itypeid+"\"  style=\"cursor:pointer;position:absolute;left: "+x+"%;top:"+y+"%  \"> <img src=\"pic2/"+res.data[j].picpath+"\"  style='width: 32px;height: 32px;'>"
                    if(res.data[j].itypeid == 22){
                        bodydev += "<div id=\"vdvalue"+res.data[j].iid+"\" style='font-size: 13px'>风速："+res.data[j].fengsu+ " <br>能见度："+res.data[j].nengjiandu+ "</div>";
                    }else if(res.data[j].itypeid == 23 ){
                         bodydev +="<div id=\"10000"+res.data[j].iid+"affiche\"  ; class=\"cmsplayback\"  style='display: block; width: 96%; height: 30px;top:-32px;left:-160px;margin: 0 auto;position: absolute;  overflow: hidden;background: #000000;   width: 320px;   height: 32px; position: absolute; border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'></div>";
                         cmsid[cmsnum]  = "10000"+res.data[j].iid+"";
                         cmsnum += 1; 
                    }else if(res.data[j].itypeid == 25){
                         bodydev +="<div id=\"10000"+res.data[j].iid+"affichetcms\"  ; class=\"tcmsplayback\"  style='display: block; width: 96%; height: 30px;top:-50px;left:-8px;margin: 0 auto;position: absolute;  overflow: hidden;background: #000000;   width: 48px;   height:48px; position: absolute; border-top-left-radius: 2px;border-top-right-radius: 2px;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;'></div>";
                         tcmsid[tcmsnum]  = "10000"+res.data[j].iid+"";
                         tcmsnum += 1; 
                    }
                    bodydev += " </div>";
                    $("#dev_div_body").append(bodydev);
                    //移动
                    devmove(res.data[j].iid);

                }//for循环结束   

                //加载cms
                for (var i = 0; i < $(".cmsplayback").length; i++) {
                    // console.log(cmsid[i]);
                    getcmsshow(cmsid[i]);
                    // cmsid[i].replace("10000",'')
                    opencmsplay(cmsid[i],1)
                }//for循环结束 

                //加载tcms
                for (var i = 0; i < $(".tcmsplayback").length; i++) {
                    // console.log(cmsid[i]);
                    gettcmsshow(tcmsid[i]);
                    // cmsid[i].replace("10000",'')
                    opencmsplay(tcmsid[i],2)
                }//for循环结束 
            }
        }
    })
}



// open cms 修改窗
function opencmsplay(id,type){
    layui.use('layer', function(){
        if(type === 1){
        $("#" + id.replace("10000","") + "").on('dblclick', function () {
            var index=layer.open({
                type: 2//此处以iframe举例
                ,title: '门架势情报版'+id.replace("10000",'')+''
                ,area: ['1300px', '670px']
                ,shade: 0
                ,maxmin: true
                , id: 'LAY_LSTSdbclick_cms' //防止重复弹出
                 ,content: 'cms.php?cms='+id+''
               // , content: 'html内容'
                ,btn: ['关闭'] //只是为了演示
                ,yes: function(index, layero){
                    layer.close(index);
                }
                 ,zIndex: layer.zIndex
                ,success: function(layero,index){
                    // console.log($("#"+id+"affiche").html());
                    layer.full(index);
                }
            });
         })
        }else if(type === 2){
             $("#" + id.replace("10000","") + "").on('dblclick', function () {
            var index=layer.open({
                type: 2//此处以iframe举例
                ,title: '限速'+id.replace("10000",'')+''
                ,area: ['1300px', '670px']
                ,shade: 0
                ,maxmin: true
                , id: 'LAY_LSTSdbclick_tcms' //防止重复弹出
                 ,content: 'tcms.php?tcms='+id+''
               // , content: 'html内容'
                ,btn: ['关闭'] //只是为了演示
                ,yes: function(index, layero){
                    layer.close(index);
                }
                ,success: function(layero,index){
                    layer.full(index);
                }
            });
         })
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
                     $("#typeimg"+key+"").css("width","30px");
                     $("#typeimg"+key+"").css("height","30px");
                     $("."+key+"").hide();
                 }
            }
        }
    })
}




//点击表单
layui.use('layer', function(){
    //修改密码
    $("#updatepass").click(function () {
        layer.open({
            type: 1
            ,area: ['500px', '350px']
            ,title:'密码修改'
            ,content:"<form class=\"layui-form\" action=\"\" lay-filter=\"example\">\n" +
                "<div class=\"layui-form-item\">\n" +
                "    <label class=\"layui-form-label\">账号</label>\n" +
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
                if( newpass !== renewpass  ){
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


    //用户管理
    $("#adminlist").click(function(){
        opentableadmin();
         layer.open({
            type: 1
            ,area: ['800px', '450px']
            ,title:'用户信息'
            ,content:$(".admintable")
            ,btn: ['关闭']
            ,id:"admintable"
            ,btn1: function(index, layero){
                layer.close(index);
            }
        })
    })
    //表格
    function opentableadmin(){    
        layui.use('table', function(){
          var tableIns = layui.table;
          tableIns.render({
            elem: '#table1'
            ,id:"fid"
            ,url:'bcd/php/curdadmin.php?itype=1'
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
              {field:'FCode', width:100, title: '编号',align:'center' , sort: true}
              ,{field:'FEName', width:120, title: '账号',align:'center'}
              ,{field:'FCName', width:150, title: '名称',align:'center'}
              ,{field:'FEnable', width:80, title: '状态',align:'center'}
              ,{field:'FRemark',width:175, title: '备注',align:'center'}
              ,{fixed: 'right', width: 165, title: '操作',align:'center', toolbar: '#barDemo'}
            ]]
            , done: function (res) {
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                console.log(res);
                window.newcode = "0000"+res.count;
            }
          });

          //监听行工具事件
          tableIns.on('tool(admintable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'detail'){
                $("#radio1").hide();
                $("#radio2").show();
                $("#FCode").val(newcode);
                $("#FEName").val("");
                $("#FCName").val("");
                $("#FRemark").val("");
                var enable = $("#newenable").is(':checked') ? 1 : 0;
                layer.open({
                    type: 1
                    ,area: ['600px', '450px']
                    ,title:'用户添加'
                    ,content:$(".updateadmin")
                    ,btn: ['提交','关闭']
                    ,id:"addadmin"
                    ,btn1: function(index, layero){
                         var code =  $("#FCode").val();
                         var ename = $("#FEName").val();
                         var cname = $("#FCName").val();
                         var remark = $("#FRemark").val();
                         if(code.length == 0||remark.length == 0||cname.length == 0||ename.length == 0 ){
                            layer.msg('所有表单不可为空');
                            return false;
                         }
                        $.ajax({
                            type: "POST",
                            url : "bcd/php/curdadmin.php?itype=4",
                            data:{"code":code,"ename":ename,"cname":cname,"remark":remark,"enable":enable},
                            dataType: "json",
                            success:function(res){
                                layer.msg(res.msg, {icon: 1});
                                layer.close(index);
                                opentableadmin();
                            }
                        })
                    },btn2: function(index, layero){
                        layer.close(index);
                    }
                })
              // layer.msg('查看操作');
            } else if(layEvent === 'del'){
              layer.confirm('真的删除此用户么', function(index){
                // if(data.FEName == "super") return false;
                curdadmin(2,data.FEName);
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
              });
            } else if(layEvent === 'edit'){
                //赋值给表单
                $("#radio2").hide();
                $("#radio1").show();
                $("#FCode").val(data.FCode);
                $("#FEName").val(data.FEName);
                $("#FCName").val(data.FCName);
                $("#FRemark").val(data.FRemark);
                  layer.open({
                    type: 1
                    ,area: ['600px', '450px']
                    ,title:'用户信息修改----'+data.FCName+''
                    ,content:$(".updateadmin")
                    ,btn: ['提交','关闭']
                    ,id:"updateadmin"
                    ,btn1: function(index, layero){
                        var fid = data.fid;
                        var code =  $("#FCode").val();
                        var ename = $("#FEName").val();
                        var cname = $("#FCName").val();
                        var remark = $("#FRemark").val();
                        var enable = $("#enable").is(':checked') ? 1 : 0;
                        var remarkpass = $("#remarkpass").is(':checked') ? 1 : 0;
                        var enableuse = (enable==1) ? "启用" : "禁用";
                        $.ajax({
                            type: "POST",
                            url : "bcd/php/curdadmin.php?itype=3",
                            data:{"code":code,"ename":ename,"cname":cname,"remark":remark,"enable":enable,"remarkpass":remarkpass,"fid":fid},
                            dataType: "json",
                            success:function(res){
                               if(res.code === 0){
                                    layer.msg(res.msg, {icon: 1});
                                    layer.close(index);
                                    //修改
                                    obj.update({
                                        FCode: code,
                                        FEName: ename,
                                        FCName: cname,
                                        FEnable : enableuse,
                                        FRemark : remark
                                    });
                               }else{
                                    layer.msg(res.msg, {icon: 2});  
                               }
                            }
                        })
                    },btn2: function(index, layero){
                        layer.close(index);
                    }
                })
               // layer.msg('编辑操作');
            }
          });

        });
    }
})





function curdadmin(type,username){
    $.ajax({
        type: "POST",
        url : "bcd/php/curdadmin.php?itype="+type+"",
        data:{"user":username},
        dataType: "json",
        success:function(res){
            return res;
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




