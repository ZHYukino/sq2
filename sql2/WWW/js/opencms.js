 


    //门架播放版
function cmssetdota(id,resdata,playnum,type,cid=null) {

    var arr_check = new Array();
    var check = new Array("左边进场","右边进场","上面进场","下面进场","立即出现");
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
    var stoptime = new Array();
    var showcontent = new Array();
    var showimg = new Array();
    var uppicpath = new Array();
    var uppicx = new Array();
    var  picxlabel = new Array();
    var selectstr = new Array();
    var selectsize = new Array();
    var fontsize = new Array("15","22","30");
    var fontstyle = new Array();
        fontstyle[0] = "SimHei";                 //黑体
        fontstyle[1] = "KaiTi ";                  //楷体
        fontstyle[2] = "SimSun";                  //宋体
        fontstyle[3] = "FangSong";                //仿宋
    var chinse = new Array("黑体","楷体","宋体","仿宋");
    for (var i = 0; i < resdata.data.length; i++) {
        arr_check[i] =  resdata.data[i].check ;
        content[i] =  resdata.data[i].content ;
        font_style[i] =  resdata.data[i].font_style ;
        font_color[i] =  resdata.data[i].font_color ;
        font_size[i] =  resdata.data[i].size ;
        speed[i] = resdata.data[i].speed*1;
        img[i] = "";
        pontx[i] = resdata.data[i].fontx*1;
        stoptime[i] = resdata.data[i].stoptime;

        //多张图片循环
        for(var z = 0;z<resdata.data[i].picpath.length; z++){

            //播放动画的图片
            img[i] += "<img src=\""+resdata.data[i].picpath[z]+"\";    style=\"margin-left:"+resdata.data[i].picx[z]+"px;position:absolute;\">"
            //静止可选择的图片
            uppicpath[z] = resdata.data[i].uppicpath[z];
            uppicx[z] =  resdata.data[i].picx[z];
            showimg[z] = "<img src=\""+resdata.data[i].picpath[z]+"\";    style=\"margin-left:"+resdata.data[i].picx[z]+"px;position:absolute;\">"
            //图片位置
            picx[i] = resdata.data[i].picx[0];
        }

        idping[i] = "<div id=\""+id+"affiche_text"+i+"\"  ;  style='position: absolute;display:none; height:32;width:320px' >"+img[i]+"<span  id=\""+id+"test_content"+i+"\"  style=\" position:absolute ;margin-left:"+resdata.data[i].fontx+"px;font-size:" + font_size[i] + "px;color:"+font_color[i]+";margin-top:1px;width:300px;font-family:"+font_style[i]+"\">"+content[i]+"</span></div>"
        
        
       
        //判断是否是图片还是文字还是 父节点
        showcontent = "<span  class=\""+id+"test_content"+i+"\"  style=\"position:absolute ;margin-left:"+resdata.data[i].fontx+"px;font-size:" + font_size[i] + "px;color:"+font_color[i]+";margin-top:1px;width:300px;font-family:"+font_style[i]+"\">"+content[i]+"</span>";
       
        if(cid != null &&  cid.indexOf("图片") != -1){
            //去除文字
            showcontent = "";
            //过滤汉字图片1（只剩 1）
            var reg=/[\u4E00-\u9FA5]/g;
            var cidnum=cid.replace(reg,'');

            if(!isNaN(cidnum * 1)){
                 picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td>"+uppicx[cidnum-1]+"</td></tr><tr><td>图片</td><td>"+ uppicpath[cidnum-1] +"</td></tr>"
                img[i] = showimg[cidnum-1];
            }
        }else if(cid != null && cid == "文字"){
            img[i] = "";
            selectstr[i] = '<select name=\"fontstyle\" >';
            fontstyle.forEach(function(element,index,arr){
                if(font_style[i] == element ){
                    selectstr[i] += "<option value=\""+element+"\"  selected >"+chinse[index]+"</option>";
                }else{
                    selectstr[i] += "<option value=\""+element+"\" >"+chinse[index]+"</option>";
                 }
            })
            selectstr[i] += "</select>";

            selectsize[i] = '<select name=\"fontsize\" >';
            fontsize.forEach(function(element,index,arr){
                if(font_size[i] == element ){
                    selectsize[i] += "<option value=\""+index+"\"  selected >"+element+"</option>";
                }else{
                    selectsize[i] += "<option value=\""+index+"\" >"+element+"</option>";
                  }
            })
            selectsize[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td>"+pontx[i]+"</td></tr><tr><td>字体颜色</td><td>"+  font_color[i] +"</td></tr><tr><td>字体</td><td>"+  selectstr[i] +"</td></tr><tr><td>字体大小</td><td>"+ selectsize[i] +"</td></tr>"
        }else if(cid == null ){

            selectstr[i] = '<select name=\"check\" >';
            check.forEach(function(element,index,arr){
                if(arr_check[i] == index+1 ){
                    selectstr[i] += "<option value=\""+element+"\"  selected >"+element+"</option>";
                }else{
                    selectstr[i] += "<option value=\""+element+"\" >"+element+"</option>";
                 }
            })
            selectstr[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>出现方式</td><td>"+selectstr[i]+"</td></tr><tr><td>出现速度</td><td><input type=\"text\" value=\""+speed[i]+" \"></td></tr>"
        }

        classping[i] = "<div class=\""+id+"affiche_text"+i+"\"  ;  style='position: absolute; height:32;width:320px' >" +img[i]+showcontent+"<div>"; 
       

        //如果为0就添加动画运动
        if(type == 0){
            $("#"+id+"affiche").append(idping[i]);
         }
    }

    //不为零的 点击更换信息版，所以下面不需要再执行
    if(type !=0 ){
        $("."+id+"affiche").children().remove();
        $("."+id+"affiche").append(classping[type-1]);
        $("#updatecms").children().remove();
        $("#updatecms").append(picxlabel[type-1]);
    
        return false;
    }

    //左边或者上进场 else 右或者下边
    if( arr_check[0] == 1 ||  arr_check[0] == 2 ||  arr_check[0] == 5 ){
         var textWidth = 320;
         var place1 = "left";
        var iwidth1 =320;
          var scrollWidth = $("#"+id+"affiche").width() ;       //div 长度
    }else{
        var textWidth = 32;
        var iwidth1 =32;
        var place1 = "top";
        var scrollWidth = $("#"+id+"affiche").height() ;       //div 长度
    }
    if( arr_check[1] == 1 ||  arr_check[1] == 2 ||  arr_check[1] == 5 ){
         var textWidth1 = 320;
           var iwidth2=320;
          var place2 = "left";
           var scrollWidth = $("#"+id+"affiche").width() ;       //div 长度
    }else{
        var textWidth1 = 32;
        var place2 = "top";
        var iwidth2=32;
         var scrollWidth = $("#"+id+"affiche").height() ;       //div 长度
    }
    if( arr_check[2] == 1 ||  arr_check[2] == 2 ||  arr_check[2] == 5){
         var textWidth2 = 320;
         var iwidth3 = 320;
         var place3 = "left";
         var scrollWidth = $("#"+id+"affiche").width() ;       //div 长度
    }else{
        var textWidth2 = 32;
        var place3 = "top";
        var iwidth3 = 32;
         var scrollWidth = $("#"+id+"affiche").height() ;       //div 长度
    }
   

   //立即停止
    if(arr_check[0] == 5 ){
         iwidth1=0;
    }
    if(arr_check[0] == 5 ){
         iwidth1=0;
    }
     if(arr_check[1] == 5 ){
         iwidth2=0;
    }
     if(arr_check[2] == 5 ){
         iwidth3=0;
    }
    stops = 1;
    var check_zh = 1;
    var interval = setInterval
     (function () {
        if( stops == 1  ){
            iwidth1  -= speed[0];
            $("#"+id+"affiche_text2").hide();
            $("#"+id+"affiche_text0").show();
        }
        else if(stops == 2 ){
                  
             iwidth2 -=  speed[1];
             $("#"+id+"affiche_text0").hide();
                    // $("#"+id+"affiche_text1").show();
         }
         else if( stops == 3  ){
                    
                iwidth3 -=  speed[2]
                $("#"+id+"affiche_text1").hide();
        }

        if (iwidth1 <= -textWidth ) {
                iwidth1 = scrollWidth  ; 
              
            if(playnum == 1){
                      stops = 1; 
                 }else{
                      stops = 2;
                 }
                if(arr_check[1] == 5){
                    iwidth2=0;
                }
                $("#"+id+"affiche_text1").show();
            }
        else if (iwidth2 <= -textWidth1 ) {
            if(playnum == 2){
                      stops = 1;
                }else{
                     stops = 3;
                }
                iwidth2 = scrollWidth;
            if(arr_check[0] == 5 && playnum == 2){
                    iwidth1=0;
                }
            if(arr_check[2] == 5 && playnum == 3){
                    iwidth3=0;
                }
                 $("#"+id+"affiche_text2").show();
        }
        else if (iwidth3 <= -textWidth2 ) {
            iwidth3 = scrollWidth;
            if(playnum == 3){
                 stops = 1; 
            }
            if(arr_check[0] == 5 && playnum == 3){
                 iwidth1=0;
            }     
        }

        if(arr_check[0] == 1 || arr_check[0] == 5 || arr_check[0] == 3){
            var left1 = -iwidth1;
        }else if(arr_check[0]  == 2 || arr_check[0]  == 4){
            var left1 = iwidth1;
        } 
        if(arr_check[1]  == 1 || arr_check[1] == 5 || arr_check[1] == 3){
             var left2 = -iwidth2;
        }else if(arr_check[1]  == 2 || arr_check[1]  == 4){
             var left2 = iwidth2;
        }
         if(arr_check[2] == 1 || arr_check[2] == 5 || arr_check[2] == 3){
            var left3 = -iwidth3;
        }else if(arr_check[2]  == 2 || arr_check[2]  == 4){
            var left3 = iwidth3;
        }


        $("#"+id+"affiche_text0").css(''+place1+'',''+left1 + 'px');
        $("#"+id+"affiche_text1").css(''+place2+'',''+left2 + 'px');
        $("#"+id+"affiche_text2").css(''+place3+'',''+left3 + 'px');
   }, 30);
    window["var"+ id +""] = false;      
}

//获得门架的数据
function getcmsshow(id) {
    $.ajax({
        type: "GET",
        url: "bcd/php/cmsshow.php?itype=1&id="+id+"",
        dataType: "json",
        success:function (res) {
            cmssetdota(id,res.data.place,res.data.rate,res.data.check,res.data.content,res.data.speed,res.data.size,res.data.stoptime,res.data.stopplace,res.data.picpath,res.data.font_color,res.data.font_style);
        }
    })
}


function tcmsdota(id,checktcms,speedtcms,imgpictcms){
    var check = checktcms;                          //进入方式
    var cmsspeed = speedtcms;                       //滚动速度
    imgpictcms = imgpictcms;
    $("#"+id+"TCMS").attr("src",""+imgpictcms+"");
    (function () {
        var timer = setTimeout(this.marquee, 1000);
    }());
    var scrollWidths = $('#'+id+'affichetcms').width() ;       //div 长度
    var textWidths = $('#'+id+'affiche_texttcms').width() ;
    var textheights = $('#'+id+'affiche_texttcms').height();
    var scrollheights = $('#'+id+'affichetcms').height();
    var j = scrollheights;            //   j高度
    var i = scrollWidths;
    switch (check) {
        //1为 右边
        case 1:
            $("#"+id+"affiche_texttcms").css("left", "100%");
            $("#"+id+"affiche_texttcms").show();
            setInterval
            (function () {
                i = i-cmsspeed;
                if (i < -scrollWidths) {
                    i = scrollWidths;
                }
                $('#'+id+'affiche_texttcms').animate({'left': i + 'px'}, 10);
            }, 10);
            window["var"+ id +""] = false;
            break;
        case 2:
            //左
            $("#"+id+"affiche_texttcms").css("right", "200%");
            $("#"+id+"affiche_texttcms").show();
            setInterval
            (function () {
                i = i - cmsspeed;
                if (i < -scrollWidths) {
                    i = scrollWidths;
                }
                $('#'+id+'affiche_texttcms').animate({'right': i + 'px'}, 10);
            }, 10);
            window["var"+ id +""] = false;
            break;
        case 3:
            //上
            $("#"+id+"affiche_texttcms").css("top", "100%");
            $("#"+id+"affiche_texttcms").show();
            var font_lefts = 0 ;
            $("#"+id+"affiche_texttcms").css("left", "" + font_lefts + "px")
            setInterval
            (function () {
                j = j - cmsspeed;
                if (j < -textheights-20) {
                    j = scrollheights + 40;
                }
                $('#'+id+'affiche_texttcms').animate({'top': j + 'px'}, 10);
            }, 20);
            window["var"+ id +""] = false;
            break;
        case 4:
            //下
            $("#"+id+"affiche_texttcms").css("left", "" + 0 + "px");
            //下滚动
            $("#"+id+"affiche_texttcms").css("bottom", "100%");
            $("#"+id+"affiche_texttcms").show();
            setInterval
            (function () {
                j = j - cmsspeed;
                if (j < -textheights-10) {
                    j = scrollheights +40;
                }
                $('#'+id+'affiche_texttcms').animate({'bottom': j + 'px'}, 20);
            }, 20);
            window["var"+ id +""] = false;
            break;
    }
}

//可变速限速标志

function tcms(id){
    $.ajax({
        type:"GET",
        url:"bcd/php/tcms.php?itype=1&id="+id+"",
        dataType:"json",
        success:function(res){
            tcmsdota(id,res.checktcms,res.speedtcms,res.imgpicname);
        }
    })
}

