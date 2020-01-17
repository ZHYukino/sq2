var cmsbtn = "\n" +
    " <button id=\"cms_upload\" type=\"button\" class=\"layui-btn layui-btn-normal\"  lay-demo=\"getChecked\">播放发送</button>\n" +
    " <button id=\"cms_down\" type=\"button\" class=\"layui-btn layui-btn-normal\">播放获取</button>\n" +
    " <button id=\"cms_getlight\" type=\"button\"   class=\"layui-btn layui-btn-primary\">获取亮度</button>\n" +
    " <button id=\"cms_setlight\" type=\"button\"   class=\"layui-btn layui-btn-primary\" style='margin-right: 10px'>设置亮度</button>\n" +
    " <div class=\"layui-input-inline\">\n" +
    " <input type=\"number\" name=\"phone\"  id=\"cmslight\" value=\"0\"   lay-verify=\"required|phone\" autocomplete=\"off\" class=\"layui-input\" style=\"width: 80px; height: 26px;background: #d0c0cf\">\n" +
    " <input type=\"radio\" name=\"cmsauto\" value=\"0\" title=\"自动\"  id=\"tradeType0\"  checked>自动\n" +
    " <input type=\"radio\" name=\"cmsauto\" value=\"1\" title=\"手动\"  id=\"tradeType1\" >手动\n" +
    " <button id=\"allsetplayseed\" type=\"button\" style='position:absolute ;top:3px;margin-left:95px'   class=\"layui-btn layui-btn-primary\">全选中</button>\n" +
    " <button id=\"cms_setlight\" type=\"button\" style='position:absolute ;top:3px;margin-left:185px'   class=\"layui-btn layui-btn-primary\">保存</button>\n" +
    "</div>";
$(".layui-upload").append(cmsbtn);
var allplanselect = " <button class=\"layui-btn layui-btn-primary\" style='margin-left: 175px;position:absolute;top: 3px;opacity: 1'><nav>\n" +
    "            <ul class=\"content clearfix\">\n" +
    "                <li class=\"dropdown\">\n" +
    "                    <a href=\"#\" style=\" text-decoration:none\">方案控制</a>\n" +
    "                    <ul id=\"select_sub\" class=\"sub-menu\" style='margin-left:-20px;z-index:20'>\n" +
    "                        <li class=\"dropdown\"><a href=\"#\" >选择</a> <ul id=\"del_sub\" class=\"sub-menu\"><li><a href=\"#\" onclick=\"alert(123)\">方案3</a></li><li><a href=\"#\">方案1</a></li><li><a href=\"#\">方案2</a></li></ul></li>\n" +
    "                        <li class=\"dropdown\">\n" +
    "                            <a href=\"#\">删除</a>\n" +
    "                            <ul id=\"del_sub\" class=\"sub-menu\">\n" +
    "                            <li><a href=\"#\" onclick=\"alert(123)\">方案3</a></li><li><a href=\"#\">方案1</a></li><li><a href=\"#\">方案2</a></li></ul>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "            </ul></nav></button>";
$(".layui-upload").append(allplanselect);
$("#cmsshowlist").text("播放列表");



//全选中
var chcikseed  = true ;
updatecmsres = new Array();
$("#allsetplayseed").click(function () {
    // if(chcikseed === false){
    //     settreecheck()
    //     return false;
    // }
    var url = window.location.pathname; /* 获取文件路径（文件地址） */
    if( url == "/cms.php"){
        allselectplay(1,"",6);
    }else{
        allselectplay(2,"",6);
    }
    chcikseed  = false ;
})

window.getlight = true;
function allselectplay(type,checkid,itype) {
    //type为1是cms
    //type为2是tcms
    $(".cms_three").css("margin-Left","380px");
    tunnelinfo = "";
    $.ajax({
        type:"get",
        url:"bcd/php/seedcms.php?itype="+type+"",
        dataType:"json",
        success:function (res) {
            tunnelinfo = res;
            layui.use('tree', function(){
                var tree = layui.tree
                //渲染
                var inst1 = tree.render({
                    elem: '#seedcmsplay'  //绑定元素
                    ,showCheckbox:true
                    ,id: 'seedcheck' //定义索引
                    ,data: tunnelinfo
                    ,click:function (obj) {
                        if(window.getlight !== false) {
                            if (obj.data.id > 10000) {
                                checkcmsplay(obj.data.id);
                            }
                        }else {
                            if (obj.data.id > 10000) {
                                checkcmsplayes(obj.data.id);
                            }
                        }
                    }
                });
                //全选
                function settreecheck() {
                    tree.setChecked('seedcheck', [0, 20]); //单个勾选 id 为 0 的节点
                    tree.setChecked('seedcheck', [1, 20]); //单个勾选 id 为 1 的节点
                    tree.setChecked('seedcheck', [2, 20]); //单个勾选 id 为 2 的节点
                    tree.setChecked('seedcheck', [3, 20]); //单个勾选 id 为 3 的节点
                }
                //删除播放发送按钮
                $("#cms_upload").unbind("click");
                $("#cms_getlight").unbind("click");
                $("#cms_setlight").unbind("click");
                $("#cms_down").unbind("click");
                //重新定义发送按钮
                $("#cms_getlight").click(function () {
                    seedallprocess(3)
                });
                $("#cms_setlight").click(function () {
                    seedallprocess(4)
                });
                $("#cms_down").click(function () {
                    seedallprocess(5)
                });
                $("#cms_upload").click(function () {
                    seedallprocess(6)
                });
                //发送全过程
                function seedallprocess(itypes) {
                    var checkData = tree.getChecked('seedcheck');
                    //遍历出选中的cmsid
                    var seedcmsid = "";
                    seedhtml  = new Array();
                    var seedid  = new Array();
                    var numes = 1;
                    var nbsps = "&nbsp&nbsp&nbsp&nbsp";
                    for(var  key = 0;key< checkData.length;key++){
                        for (var k in checkData[key].children) {
                            //发送id 的数值
                            seedcmsid += checkData[key].children[k].id+",";
                            //树名
                            seedhtml[numes] = checkData[key].children[k].title;
                            //树id
                            seedid[numes] = checkData[key].children[k].id;
                            $("div[data-id='"+seedid[numes]+"'] .layui-tree-txt").html(""+seedhtml[numes]+nbsps+"准备操作("+new Date().toLocaleTimeString('chinese',{hour12:false})+")");
                            numes += 1;
                        }
                    }
                    //发送情报板
                    var cmsauto = $("input[name='cmsauto']:checked").val();
                    var lightvalue = $("#cmslight").val();
                    var url ="";
                    if(itypes==4) {
                         url = "&auto=" + cmsauto + "&value=" + lightvalue + "";
                    }
                    $.ajax({
                        type: "GET",
                        url: "bcd/php/setcms.php?itype="+itypes+"&id=" + seedcmsid + "&nowid="+id+url+"",
                        dataType: "json",
                        success: function (res) {
                            //发送成功后
                            saveseedtime = res.seedtime;
                            var updatetime = 20000;
                            var seedcmid = "";
                            for (var z=0;z<res.num;z++){
                                seedcmid += (z==(res.num-1)) ? res.data[z].iid : res.data[z].iid+"|" ;
                                var returnmsg = res.data[z].sinfo;
                                $("div[data-id='10000"+res.data[z].iid+"'] .layui-tree-txt").html(""+seedhtml[z+1]+nbsps+"操作中("+new Date().toLocaleTimeString('chinese',{hour12:false})+")");
                            }

                            //定时获取上传的cms结果方法
                            var checktrue = false;
                            var checkrefre = false;
                            function updateseedres(time,fid,seedhtml,resultes){
                                //resultes->6   播发发送的结果
                                //resultes->5   播发获取的结果
                                //resultes->3   获取亮度的结果
                                //resultes->4   设置亮度的结果
                                $.ajax({
                                    type: "GET",
                                    url: "bcd/php/setcms.php?itype=7&time=" + time + "&fid="+seedcmid+"&res="+resultes+"",
                                    dataType: "json",
                                    success: function (res) {
                                        getlightauto = new Array();
                                        getlightvalue = new Array();
                                        for (var key in res.data){
                                            //操作成功
                                            if(res.data[key].iinfo === 0){
                                                $("div[data-id='10000"+res.data[key].iid+"'] .layui-tree-txt").html(""+seedhtml[(parseInt(key)+1)]+nbsps+"操作成功("+new Date().toLocaleTimeString('chinese',{hour12:false})+")");
                                                checktrue = true;
                                                //获取亮度并且赋值
                                                if(resultes === 3){
                                                    window.getlight = false;
                                                    getlightauto[res.data[key].iid] = res.data[key].ivalueauto;
                                                    getlightvalue[res.data[key].iid] = res.data[key].ivalue;
                                                    if("10000"+res.data[key].iid == id){
                                                        $("input[name='cmsauto']:eq("+res.data[key].ivalueauto+")").prop("checked","checked");
                                                        $("#cmslight").val(res.data[key].ivalue);
                                                    }
                                                }
                                            }
                                            //操作失败
                                            if( checktrue !== false && res.data[key].iinfo!==0){
                                                $("div[data-id='10000"+res.data[key].iid+"'] .layui-tree-txt").html(""+seedhtml[(parseInt(key)+1)]+nbsps+"操作失败("+new Date().toLocaleTimeString('chinese',{hour12:false})+")");
                                            }
                                        }
                                        if(checkrefre !==false){
                                            clearInterval(updatecmsres[saveseedtime]);
                                            //播放发送成功，更改网站内容
                                            else if(resultes === 6){

                                            }
                                        }
                                        if(checktrue !== false){
                                            checkrefre = true;
                                        }
                                    }
                                })
                            }
                            updatecmsres[saveseedtime] = setInterval(function(){
                                updateseedres(saveseedtime,seedcmid,seedhtml,itypes);//30秒更新设备状态
                            },updatetime);
                        }
                    });
                }
                //等于1为全选中
                if(checkid === ""){
                    settreecheck()
                }
                //发送情报板
                else if(itype === 6){
                    //选中点击的节点
                    tree.setChecked('seedcheck', checkid);
                    var checkData = tree.getChecked('seedcheck');
                    seedallprocess(itype);
                }
                //获取亮度
                else if(itype === 3){
                    tree.setChecked('seedcheck', checkid);
                    var checkData = tree.getChecked('seedcheck');
                    seedallprocess(itype);
                }
                //设置亮度
                else if(itype === 4){
                    tree.setChecked('seedcheck', checkid);
                    var checkData = tree.getChecked('seedcheck');
                    seedallprocess(itype);
                }
                else if(itype === 5){
                    tree.setChecked('seedcheck', checkid);
                    var checkData = tree.getChecked('seedcheck');
                    seedallprocess(itype);
                }
            });
        }
    });
}
//选择更改情报板
function checkcmsplayes(playcmsdevid){
    console.log(getlightauto)
    console.log(getlightvalue)
    $("#" + id + "affiche").hide();
    $("." + id + "affiche").hide();
    id = playcmsdevid;
    trees(id,"cms");
    starsplaycms(id);
    var strid = id.replace("10000",'');
    $("input[name='cmsauto']:eq("+getlightauto[strid]+")").prop("checked","checked");
    $("#cmslight").val(getlightvalue[id.replace("10000",'')]);
}


//播放获取
$("#cms_down").click(function () {
    if(chcikseed === false){
        return false;
    }
    var url = window.location.pathname; /* 获取文件路径（文件地址） */
    if( url == "/cms.php"){
        allselectplay(1,id,6);
    }else{
        allselectplay(2,id,6);
    }
    chcikseed  = false ;
})

//上传情报板
$("#cms_upload").click(function () {
    if(chcikseed === false){
        return false;
    }
    var url = window.location.pathname; /* 获取文件路径（文件地址） */
    if( url == "/cms.php"){
        allselectplay(1,id,5);
    }else{
        allselectplay(2,id,5);
    }
    chcikseed  = false ;
})


//获取cms亮度
$("#cms_getlight").click(function () {
    if(chcikseed === false){
        return false;
    }
    var url = window.location.pathname; /* 获取文件路径（文件地址） */
    if( url == "/cms.php"){
        allselectplay(1,id,3);
    }else{
        allselectplay(2,id,3);
    }
    chcikseed  = false ;
})


//设置cms亮度
$("#cms_setlight").click(function () {
    if(chcikseed === false){
        return false;
    }
    var url = window.location.pathname; /* 获取文件路径（文件地址） */
    if( url == "/cms.php"){
        console.log(id);
        allselectplay(1,id,4);
    }else{
        allselectplay(2,id,4);
    }
    chcikseed  = false ;
})




//托动
function devmove(id, tunnel = 0) {
    $(document).keyup(function (event) {
        if (event.keyCode == 17) {
            $("#" + id + "").draggable('disable');
        }
    })
    $(document).keydown(function (event) {
        if (event.keyCode == 17) {
            $("#" + id + "").draggable({
                start: function () {
                    flag = false;
                },
                stop: function () {
                    setTimeout(function () {
                        flag = true;
                    }, 500);
                    if (tunnel >= 1) {
                        var Ht = parseInt($("#default_top_panel").height());
                        var Wt = parseInt($("#default_panel_left").width());
                        var cname = $(this).attr("title");
                        var id = $(this).attr("id");
                        var xvalue = $(this).offset().left - Wt;
                        var yvalue = $(this).offset().top - Ht;
                        var wvalue = $("#default_panel_img").width();
                        var hvalue = $("#default_panel_img").height();
                        xvalue = xvalue * 100 / wvalue;
                        yvalue = yvalue * 100 / hvalue;
                    }
                    if (tunnel == 0) {
                        var type = $(this).attr("class");
                        var id = $(this).attr("id");
                        var xvalue = $(this).offset().left;
                        var yvalue = $(this).offset().top;
                        var wvalue = $(window).width();
                        var hvalue = $(window).height();
                        xvalue = xvalue * 100 / wvalue;
                        yvalue = yvalue * 100 / hvalue;
                    }
                    //验证数据
                    if (xvalue < 0) xvalue = 0;
                    if (yvalue < 0) yvalue = 0;
                    $.ajax({
                        type: "GET",
                        url: "bcd/php/setxy.php?itype=0&id=" + id + "&xvalue=" + xvalue + "&yvalue=" + yvalue + "&dc=" + new Date().getTime() + "",
                        dataType: "json",
                        success: function (mydata) {

                        }
                    })
                }
            });
            $("#" + id + "").draggable('enable');
        }
    })
}

intervalvdplay = new Array();
//车检和气象的状态字体滚动
function wvdstateplay(idvalue) {
    clearInterval(intervalvdplay[idvalue]);
    function vdcmsstate(obj) {
        var $self = obj.find("ul");
        var lineHeight = $self.find("li:first").height();
        $self.animate({
            "marginTop": -lineHeight + "px"
        }, 600, function () {
            $self.css({
                marginTop: 0
            }).find("li:first").appendTo($self);
        })
    }

    intervalvdplay[idvalue] = setInterval(function () {
        vdcmsstate($("#wvdvalue" + idvalue + ""));
    }, 4000);
}


//获得门架的数据
function getcmsshow(id, type = 0, cid) {
    $.ajax({
        type: "GET",
        url: "bcd/php/cmsshow.php?itype=2&id=" + id + "",
        dataType: "json",
        async: false,
        success: function (res) {
            cmssetdota(id, res, res.count, type, cid);

        }
    })
}

//获得限速的数据
function gettcmsshow(id, type = 0, cid) {
    $.ajax({
        type: "GET",
        url: "bcd/php/cmsshow.php?itype=2&id=" + id + "",
        dataType: "json",
        async: false,
        success: function (res) {
            window.rescount = res.count;
            tcmsdota(id, res, res.count, type, cid)
        }
    })
}

interval = new Array();

//门架播放版
function cmssetdota(id, resdata, playnum, type, cid = null) {

    var arr_check = new Array();
    var check = new Array("左边进场", "右边进场", "下移", "上移", "立即出现");
    var content = new Array();
    var font_style = new Array();
    var font_color = new Array();
    var back_color = new Array();
    var font_size = new Array();
    var speed = new Array();
    var idping = new Array();
    var classping = new Array();
    var pontx = new Array();
    var ponty = new Array();
    var img = new Array();
    var picx = new Array();
    var picy = new Array();
    var stoptime = new Array();
    var showcontent = new Array();
    var showimg = new Array();
    var uppicpath = new Array();
    var uppicx = new Array();
    var uppicy = new Array();
    var picxlabel = new Array();
    var selectstr = new Array();
    var selectsize = new Array();

    var fontstyle = new Array();
    fontstyle[0] = "SimHei";                 //黑体
    fontstyle[1] = "KaiTi";                  //楷体
    fontstyle[2] = "SimSun";                  //宋体
    fontstyle[3] = "FangSong";                //仿宋

    var chinse = new Array("黑体", "楷体", "宋体", "仿宋");

    for (var i = 0; i < resdata.data.length; i++) {
        arr_check[i] = resdata.data[i].check;
        content[i] = resdata.data[i].content;
        font_style[i] = resdata.data[i].font_style;
        font_color[i] = resdata.data[i].font_color;
        back_color[i] = resdata.data[i].back_color;
        font_size[i] = resdata.data[i].size;
        speed[i] = resdata.data[i].speed * 1;
        img[i] = "";
        pontx[i] = resdata.data[i].fontx * 1;
        ponty[i] = resdata.data[i].fonty * 1;
        stoptime[i] = resdata.data[i].stoptime;

        //多张图片循环
        for (var z = 0; z < resdata.data[i].picpath.length; z++) {

            //播放动画的图片
            img[i] += "<img src=\"" + resdata.data[i].picpath[z] + "\";    style=\"z-index:5;margin-left:" + resdata.data[i].picx[z] + "px;margin-top:" + resdata.data[i].picy[z] + "px;position:absolute;\">"
            //静止可选择的图片
            uppicpath[z] = resdata.data[i].uppicpath[z];
            uppicx[z] = resdata.data[i].picx[z];
            uppicy[z] = resdata.data[i].picy[z];
            showimg[z] = "<img src=\"" + resdata.data[i].picpath[z] + "\";    style=\"z-index:5;margin-left:" + resdata.data[i].picx[z] + "px;margin-top:" + resdata.data[i].picy[z] + "px;position:absolute;\">"
            //图片位置
            picx[i] = resdata.data[i].picx[0];
            picy[i] = resdata.data[i].picy[0];
        }

        idping[i] = "<div id=\"" + id + "affiche_text" + i + "\"  ;  style='position: absolute;display:none; height:32;width:320px' >" + img[i] + "<span  id=\"" + id + "test_content" + i + "\"  style=\"background-color:" + back_color[i] + "; position:absolute ;margin-left:" + resdata.data[i].fontx + "px; margin-top:" + resdata.data[i].fonty + "px;font-size:" + font_size[i] + "px;color:" + font_color[i] + ";font-family:" + font_style[i] + ";line-height:" + font_size[i] + "px;\">" + content[i] + "</span></div>"


        //判断是否是图片还是文字还是 父节点
        showcontent = "<span  class=\"" + id + "test_content" + i + "\"  style=\"background-color:" + back_color[i] + ";position:absolute ;margin-left:" + resdata.data[i].fontx + "px;margin-top:" + resdata.data[i].fonty + "px;font-size:" + font_size[i] + "px;color:" + font_color[i] + ";font-family:" + font_style[i] + ";line-height:" + font_size[i] + "px;\">" + content[i] + "</span>";

        if (cid != null && cid.indexOf("图片") != -1) {
            //去除文字
            showcontent = "";
            //过滤汉字图片1（只剩 1）
            var reg = /[\u4E00-\u9FA5]/g;
            var cidnum = cid.replace(reg, '');
            if (!isNaN(cidnum * 1)) {
                picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\"" + uppicx[cidnum - 1] + "\"  maxlength=\"3\" class=\"picx" + i + "\"></td></tr><tr><td>Y坐标</td><td><input type='text' value=\"" + uppicy[cidnum - 1] + "\"  maxlength=\"3\" class=\"picy" + i + "\"></td></tr><tr><td>当前图片</td><td>" + uppicpath[cidnum - 1] + "<button id=\"selectpic" + i + "\"  style='margin-left: 35px' class=\"layui-btn layui-btn-xs\">更改图片</button></td></tr><tr><td>上传并且更改图片</td><td><button type=\"button\"class=\"layui-btn-sm layui-btn-primary\" id=\"filepic" + i + "\">上传图片</button></td></tr>"
                img[i] = showimg[cidnum - 1];
            }
        } else if (cid != null && cid == "文字") {
            img[i] = "";
            //字体style
            selectstr[i] = '<select class=\"fontstyle' + i + '\" >';
            fontstyle.forEach(function (element, index, arr) {
                if (font_style[i] == element) {
                    selectstr[i] += "<option value=\"" + element + "\"  selected >" + chinse[index] + "</option>";
                } else {
                    selectstr[i] += "<option value=\"" + element + "\" >" + chinse[index] + "</option>";
                }
            });
            selectstr[i] += "</select>";
            selectsize[i] += "</select>";
            //g,表示全部替换。
            var brreg = new RegExp("<br>", "g");
            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\"" + pontx[i] + "\"  maxlength=\"3\" class=\"fontx" + i + "\"></td></tr><tr><td>Y坐标</td><td><input type='text' value=\"" + ponty[i] + "\"  maxlength=\"3\" class=\"fonty" + i + "\"></td></tr><tr><td>字体颜色</td><td><div   class=\"fontcolor" + i + "\"></div></td></tr><tr><td>背景颜色</td><td><div   class=\"backcolor" + i + "\"></div></td></tr><tr><td>字体</td><td>" + selectstr[i] + "</td></tr><tr><td>字体大小</td><td><input type='text' value=\"" + font_size[i] + "\"  maxlength=\"2\" class=\"fontsize" + i + "\"></td></tr><tr><td>文字</td><td><textarea style='width:250px;height:60px'   class=\"content" + i + "\";>" + content[i].replace(brreg, "\r") + "</textarea></td></tr>"
        } else if (cid == null) {
            //出场顺序
            selectstr[i] = '<select class=\"check' + i + '\" >';
            check.forEach(function (element, index, arr) {
                if (arr_check[i] == index + 1) {
                    selectstr[i] += "<option value=\"" + (index + 1) + "\"  selected >" + element + "</option>";
                } else {
                    selectstr[i] += "<option value=\"" + (index + 1) + "\" >" + element + "</option>";
                }
            })
            selectstr[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>滚动序号</td><td>" + i + "</td></tr><tr><td>出现方式</td><td>" + selectstr[i] + "</td></tr><tr><td>滚动速度</td><td><input type=\"text\" value=\"" + speed[i] * 10 * 10 + " \"   maxlength=\"4\"   class=\"speed" + i + "\" ></td></tr><tr><td>停留时间ms</td><td><input type=\"text\" value=\"" + stoptime[i] + " \"  maxlength=\"6\" class=\"stoptime" + i + "\"></td></tr>"
        }

        classping[i] = "<div class=\"" + id + "affiche_text" + i + "\";  style='position: absolute; height:32;width:320px' >" + img[i] + showcontent + "<div>";


        //如果为0就添加动画运动
        if (type == 0) {
            $("#" + id + "affiche").append(idping[i]);
        }
    }

    //不为零的 点击更换信息版，所以下面不需要再执行
    if (type != 0) {
        $("." + id + "affiche").children().remove();
        $("." + id + "affiche").append(classping[type - 1]);
        $("#updatecms").children().remove();
        $("#updatecms").append(picxlabel[type - 1]);
        //type-1   为动作  ，cidnum 为图片 1或者2   
        updatecmsini(type - 1, cidnum, font_color[type - 1], back_color[type - 1]);
        return false;
    }
    $("." + id + "affiche").append(classping[0]);
    //左边或者上进场 else 右或者下边
    var textWidth = new Array();
    var iwidth = new Array();
    var left = new Array();
    var scrollWidth = new Array();
    var placese = new Array();

    for (var j = 0; j < playnum; j++) {
        //左右和立即出现
        if (arr_check[j] == 1 || arr_check[j] == 2 || arr_check[j] == 5) {
            textWidth[j] = 320;
            placese[j] = "left";
            iwidth[j] = 320;
            scrollWidth[j] = $("#" + id + "affiche").width();       //div 长度
        }//上下
        else {
            textWidth[j] = 32;
            iwidth[j] = 32;
            placese[j] = "top";
            scrollWidth[j] = $("#" + id + "affiche").height();       //div 长度
        }
        if (arr_check[j] == 5) {
            iwidth[j] = 0;
        }
    }


    var stops = new Array();
    stops[id] = 0;

    function cmsstate() {
        for (var x = 0; x < playnum; x++) {
            var xs = x + 1;
            var playes = playnum - 1;
            if (stops[id] == x) {
                $("#" + id + "affiche_text" + playes + "").hide();
                $("#" + id + "affiche_text" + x + "").show();
                if (arr_check[x] == 5 && iwidth[x] == 0) {
                    clearInterval(interval[id]);
                    setTimeout(statecms, stoptime[x]);
                }
                iwidth[x] -= speed[x];
                if (iwidth[x] <= 0 && iwidth[x] > 0 - speed[x] && stoptime[x] != 0 && arr_check[x] != 5) {
                    //清除
                    clearInterval(interval[id]);
                    //延迟执行
                    setTimeout(statecms, stoptime[x]);
                }
            }
            if (iwidth[x] <= -textWidth[x]) {
                iwidth[x] = scrollWidth[x];
                if (playnum == xs) {
                    stops[id] = 0;
                } else {
                    stops[id] = xs;
                }
                if (arr_check[x + 1] == 5) {
                    iwidth[x + 1] = 0;
                }
                $("#" + id + "affiche_text" + x + "").hide();
                if (playnum == xs) {
                    $("#" + id + "affiche_text0").show();
                } else {
                    $("#" + id + "affiche_text" + xs + "").show();
                }
            }
            if (arr_check[x] == 1 || arr_check[x] == 5 || arr_check[x] == 3) {
                left[x] = -iwidth[x];
            } else if (arr_check[x] == 2 || arr_check[x] == 4) {
                left[x] = iwidth[x];
            }
            $("#" + id + "affiche_text" + x + "").css('' + placese[x] + '', '' + left[x] + 'px');
        }
    }

    interval[id] = window.setInterval(cmsstate, 50);

    function statecms() {
        interval[id] = window.setInterval(cmsstate, 50);
    }

}


//门夹播放版
function tcmsdota(id, resdata, playnum, type, cid = null) {
    var arr_check = new Array();
    var check = new Array("左边进场", "右边进场", "下移", "上移", "立即出现");
    var content = new Array();
    var font_style = new Array();
    var font_color = new Array();
    var font_size = new Array();
    var speed = new Array();
    var idping = new Array();
    var classping = new Array();
    var pontx = new Array();
    var img = new Array();
    var picx = new Array();
    var picy = new Array();
    var stoptime = new Array();
    var showcontent = new Array();
    var showimg = new Array();
    var uppicpath = new Array();
    var uppicx = new Array();
    var uppicy = new Array();
    var picxlabel = new Array();
    var selectstr = new Array();
    var selectsize = new Array();
    var selectcolor = new Array();
    var fontsize = new Array("15", "25", "30");

    var fontstyle = new Array();
    fontstyle[0] = "SimHei";                 //黑体
    fontstyle[1] = "KaiTi";                  //楷体
    fontstyle[2] = "SimSun";                  //宋体
    fontstyle[3] = "FangSong";                //仿宋

    var chinse = new Array("黑体", "楷体", "宋体", "仿宋");
    var fontcolor = new Array("red", "yellow", "green", "black", "pink", "blue");

    for (var i = 0; i < resdata.data.length; i++) {
        arr_check[i] = resdata.data[i].check;
        content[i] = resdata.data[i].content;
        font_style[i] = resdata.data[i].font_style;
        font_color[i] = resdata.data[i].font_color;
        font_size[i] = resdata.data[i].size;
        speed[i] = resdata.data[i].speed * 1;
        img[i] = "";
        pontx[i] = resdata.data[i].fontx * 1;
        stoptime[i] = resdata.data[i].stoptime;

        //多张图片循环
        for (var z = 0; z < resdata.data[i].picpath.length; z++) {

            //播放动画的图片
            img[i] += "<img src=\"" + resdata.data[i].picpath[z] + "\";    style=\"margin-left:" + resdata.data[i].picx[z] + "px;margin-top:" + resdata.data[i].picy[z] + "px;position:absolute;height:48;width:48px;\">"
            //静止可选择的图片
            uppicpath[z] = resdata.data[i].uppicpath[z];
            uppicx[z] = resdata.data[i].picx[z];
            uppicy[z] = resdata.data[i].picy[z];
            showimg[z] = "<img src=\"" + resdata.data[i].picpath[z] + "\";    style=\"margin-left:" + resdata.data[i].picx[z] + "px;margin-top:" + resdata.data[i].picy[z] + "px;position:absolute;height:48;width:48px;\">"
            //图片位置
            picx[i] = resdata.data[i].picx[0];
            picy[i] = resdata.data[i].picy[0];
        }

        idping[i] = "<div id=\"" + id + "affiche_text" + i + "\"  ;  style='position: absolute;display:none; height:48;width:48px' >" + img[i] + "</div>"


        //判断是否是图片还是文字还是 父节点
        showcontent = "<span  class=\"" + id + "test_content" + i + "\"  style=\"position:absolute ;margin-left:" + resdata.data[i].fontx + "px;font-size:" + font_size[i] + "px;color:" + font_color[i] + ";margin-top:2px;width:280px;font-family:" + font_style[i] + ";line-height:" + font_size[i] + "px;\">" + content[i] + "</span>";

        if (cid != null && cid.indexOf("图片") != -1) {
            //去除文字
            showcontent = "";
            //过滤汉字图片1（只剩 1）
            var reg = /[\u4E00-\u9FA5]/g;
            var cidnum = cid.replace(reg, '');
            if (!isNaN(cidnum * 1)) {
                picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\"" + uppicx[cidnum - 1] + "\"  maxlength=\"3\" class=\"picx" + i + "\"></td></tr><tr><td>Y坐标</td><td><input type='text' value=\"" + uppicy[cidnum - 1] + "\"  maxlength=\"3\" class=\"picy" + i + "\"></td></tr><tr><td>当前图片</td><td>" + uppicpath[cidnum - 1] + "<button id=\"selectpic" + i + "\"  style='margin-left: 35px' class=\"layui-btn layui-btn-xs\">更改图片</button></td></tr><tr><td>上传并且更改图片</td><td><button type=\"button\"class=\"layui-btn-sm layui-btn-primary\" id=\"filepic" + i + "\">上传图片</button></td></tr>"
                img[i] = showimg[cidnum - 1];
            }
        } else if (cid != null && cid == "文字") {
            img[i] = "";
            //字体style
            selectstr[i] = '<select class=\"fontstyle' + i + '\" >';
            fontstyle.forEach(function (element, index, arr) {
                if (font_style[i] == element) {
                    selectstr[i] += "<option value=\"" + element + "\"  selected >" + chinse[index] + "</option>";
                } else {
                    selectstr[i] += "<option value=\"" + element + "\" >" + chinse[index] + "</option>";
                }
            })
            selectstr[i] += "</select>";
            //字体大小
            selectsize[i] = '<select class=\"fontsize' + i + '\" >';
            fontsize.forEach(function (element, index, arr) {
                if (font_size[i] == element) {
                    selectsize[i] += "<option value=\"" + element + "\"  selected >" + element + "</option>";
                } else {
                    selectsize[i] += "<option value=\"" + element + "\" >" + element + "</option>";
                }
            })
            selectsize[i] += "</select>";
            //字体颜色
            selectcolor[i] = '<select class=\"fontcolor' + i + '\" >';
            fontcolor.forEach(function (element, index, arr) {
                if (font_color[i] == element) {
                    selectcolor[i] += "<option value=\"" + element + "\"  selected >" + element + "</option>";
                } else {
                    selectcolor[i] += "<option value=\"" + element + "\" >" + element + "</option>";
                }
            })
            selectcolor[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\"" + pontx[i] + "\"  maxlength=\"3\" class=\"fontx" + i + "\"></td></tr><tr><td>字体颜色</td><td>" + selectcolor[i] + "</td></tr><tr><td>字体</td><td>" + selectstr[i] + "</td></tr><tr><td>字体大小</td><td>" + selectsize[i] + "</td></tr><tr><td>字符</td><td><textarea style='width:250px;height:60px'   class=\"content" + i + "\";>" + content[i] + "</textarea></td></tr>"
        } else if (cid == null) {
            //出场顺序
            selectstr[i] = '<select class=\"check' + i + '\" >';
            check.forEach(function (element, index, arr) {
                if (arr_check[i] == index + 1) {
                    selectstr[i] += "<option value=\"" + (index + 1) + "\"  selected >" + element + "</option>";
                } else {
                    selectstr[i] += "<option value=\"" + (index + 1) + "\" >" + element + "</option>";
                }
            })
            selectstr[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>滚动序号</td><td>" + i + "</td></tr><tr><td>出现方式</td><td>" + selectstr[i] + "</td></tr><tr><td>滚动速度</td><td><input type=\"text\" value=\"" + speed[i] * 10 * 10 + " \"   maxlength=\"4\"   class=\"speed" + i + "\" ></td></tr><tr><td>停留时间ms</td><td><input type=\"text\" value=\"" + stoptime[i] + " \"  maxlength=\"6\" class=\"stoptime" + i + "\"></td></tr>"
        }

        classping[i] = "<div class=\"" + id + "affiche_text" + i + "\";  style='position: absolute; height:32;width:320px' >" + img[i] + showcontent + "<div>";


        //如果为0就添加动画运动
        if (type == 0) {
            $("#" + id + "affichetcms").append(idping[i]);
        }
    }

    //不为零的 点击更换信息版，所以下面不需要再执行
    if (type != 0) {
        $("." + id + "affiche").children().remove();
        $("." + id + "affiche").append(classping[type - 1]);
        $("#updatecms").children().remove();
        $("#updatecms").append(picxlabel[type - 1]);
        //type-1   为动作  ，cidnum 为图片 1或者2   
        updatecmsini(type - 1, cidnum);
        return false;
    }
    $("." + id + "affiche").append(classping[0]);
    //左边或者上进场 else 右或者下边
    var textWidth = new Array();
    var iwidth = new Array();
    var left = new Array();
    var scrollWidth = new Array();
    var placese = new Array();

    for (var j = 0; j < playnum; j++) {
        if (arr_check[j] == 1 || arr_check[j] == 2 || arr_check[j] == 5) {
            textWidth[j] = 48;
            placese[j] = "left";
            iwidth[j] = 48;
            scrollWidth[j] = $("#" + id + "affichetcms").width();       //div 长度
        } else {
            textWidth[j] = 48;
            iwidth[j] = 48;
            placese[j] = "top";
            scrollWidth[j] = $("#" + id + "affichetcms").height();       //div 长度
        }
        if (arr_check[j] == 5) {
            iwidth[j] = 0;
        }
    }


    var stops = new Array();
    stops[id] = 0;

    function tcmsstate() {
        for (var x = 0; x < playnum; x++) {
            var xs = x + 1;
            var playes = playnum - 1;
            if (stops[id] == x) {
                $("#" + id + "affiche_text" + playes + "").hide();
                $("#" + id + "affiche_text" + x + "").show();
                if (arr_check[x] == 5 && iwidth[x] == 0) {
                    clearInterval(interval[id]);
                    setTimeout(statecms, stoptime[x]);
                }
                iwidth[x] -= speed[x];
                if (iwidth[x] <= 0 && iwidth[x] > 0 - speed[x] && stoptime[x] != 0 && arr_check[x] != 5) {
                    //清除
                    clearInterval(interval[id]);
                    //延迟执行
                    setTimeout(statecms, stoptime[x]);
                }
            }
            if (iwidth[x] <= -textWidth[x]) {
                iwidth[x] = scrollWidth[x];
                if (playnum == xs) {
                    stops[id] = 0;
                } else {
                    stops[id] = xs;
                }
                if (arr_check[x + 1] == 5) {
                    iwidth[x + 1] = 0;
                }
                $("#" + id + "affiche_text" + x + "").hide();
                if (playnum == xs) {
                    $("#" + id + "affiche_text0").show();
                } else {
                    $("#" + id + "affiche_text" + xs + "").show();
                }
            }
            if (arr_check[x] == 1 || arr_check[x] == 5 || arr_check[x] == 3) {
                left[x] = -iwidth[x];
            } else if (arr_check[x] == 2 || arr_check[x] == 4) {
                left[x] = iwidth[x];
            }
            $("#" + id + "affiche_text" + x + "").css('' + placese[x] + '', '' + left[x] + 'px');
        }
    }

    interval[id] = window.setInterval(tcmsstate, 50);

    function statecms() {
        interval[id] = window.setInterval(tcmsstate, 50);
    }
}


