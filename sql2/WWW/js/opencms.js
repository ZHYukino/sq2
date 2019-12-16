 
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

 //获得限速的数据
function gettcmsshow(id,type=0,cid) {
    $.ajax({
        type: "GET",
        url: "bcd/php/cmsshow.php?itype=2&id="+id+"",
        dataType: "json",
        async: false,
        success:function (res) {
           window.rescount = res.count;
            // cmssetdota(id,res,res.count,type,cid);
            tcmsdota(id,res,res.count,type,cid)
        }
    })
}

//门架播放版
function cmssetdota(id,resdata,playnum,type,cid=null) {

    var arr_check = new Array();
    var check = new Array("左边进场","右边进场","下移","上移","立即出现");
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
    var selectcolor = new Array();
    var fontsize = new Array("15","25","30");

    var fontstyle = new Array();
        fontstyle[0] = "SimHei";                 //黑体
        fontstyle[1] = "KaiTi";                  //楷体
        fontstyle[2] = "SimSun";                  //宋体
        fontstyle[3] = "FangSong";                //仿宋

    var chinse = new Array("黑体","楷体","宋体","仿宋");
    var fontcolor = new Array("red","yellow","green","black","pink","blue");

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

        idping[i] = "<div id=\""+id+"affiche_text"+i+"\"  ;  style='position: absolute;display:none; height:32;width:320px' >"+img[i]+"<span  id=\""+id+"test_content"+i+"\"  style=\" position:absolute ;margin-left:"+resdata.data[i].fontx+"px;font-size:" + font_size[i] + "px;color:"+font_color[i]+";margin-top:2px;width:280px;font-family:"+font_style[i]+";line-height:" + font_size[i] + "px;\">"+content[i]+"</span></div>"
        
        
       
        //判断是否是图片还是文字还是 父节点
        showcontent = "<span  class=\""+id+"test_content"+i+"\"  style=\"position:absolute ;margin-left:"+resdata.data[i].fontx+"px;font-size:" + font_size[i] + "px;color:"+font_color[i]+";margin-top:2px;width:280px;font-family:"+font_style[i]+";line-height:" + font_size[i] + "px;\">"+content[i]+"</span>";
       
        if(cid != null &&  cid.indexOf("图片") != -1){
            //去除文字
            showcontent = "";
            //过滤汉字图片1（只剩 1）
            var reg=/[\u4E00-\u9FA5]/g;
            var cidnum=cid.replace(reg,'');
            if(!isNaN(cidnum * 1)){
                 picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\""+uppicx[cidnum-1]+"\"  maxlength=\"3\" class=\"picx"+i+"\"></td></tr><tr><td>当前图片</td><td>"+ uppicpath[cidnum-1] +"</td></tr><tr><td>上传并且更改图片</td><td><button type=\"button\"class=\"layui-btn-sm layui-btn-primary\" id=\"filepic"+i+"\">上传图片</button></td></tr>"
                img[i] = showimg[cidnum-1];
            }
        }else if(cid != null && cid == "文字"){
            img[i] = "";
            //字体style
            selectstr[i] = '<select class=\"fontstyle'+i+'\" >';
            fontstyle.forEach(function(element,index,arr){
                if(font_style[i] == element ){
                    selectstr[i] += "<option value=\""+element+"\"  selected >"+chinse[index]+"</option>";
                }else{
                    selectstr[i] += "<option value=\""+element+"\" >"+chinse[index]+"</option>";
                 }
            })
            selectstr[i] += "</select>";
            //字体大小
            selectsize[i] = '<select class=\"fontsize'+i+'\" >';
            fontsize.forEach(function(element,index,arr){
                if(font_size[i] == element ){
                    selectsize[i] += "<option value=\""+element+"\"  selected >"+element+"</option>";
                }else{
                    selectsize[i] += "<option value=\""+element+"\" >"+element+"</option>";
                  }
            })
            selectsize[i] += "</select>";
            //字体颜色
            selectcolor[i] = '<select class=\"fontcolor'+i+'\" >';
            fontcolor.forEach(function(element,index,arr){
                if(font_color[i] == element ){
                    selectcolor[i] += "<option value=\""+element+"\"  selected >"+element+"</option>";
                }else{
                   selectcolor[i] += "<option value=\""+element+"\" >"+element+"</option>";
                }
            })
            selectcolor[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\""+pontx[i]+"\"  maxlength=\"3\" class=\"fontx"+i+"\"></td></tr><tr><td>字体颜色</td><td>"+  selectcolor[i] +"</td></tr><tr><td>字体</td><td>"+  selectstr[i] +"</td></tr><tr><td>字体大小</td><td>"+ selectsize[i] +"</td></tr><tr><td>字符</td><td><textarea style='width:250px;height:60px'   class=\"content"+i+"\";>"+content[i]+"</textarea></td></tr>"
        }else if(cid == null ){
            //出场顺序
            selectstr[i] = '<select class=\"check'+i+'\" >';
            check.forEach(function(element,index,arr){
                if(arr_check[i] == index+1 ){
                    selectstr[i] += "<option value=\""+(index+1)+"\"  selected >"+element+"</option>";
                }else{
                    selectstr[i] += "<option value=\""+(index+1)+"\" >"+element+"</option>";
                 }
            })
            selectstr[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>滚动序号</td><td>"+i+"</td></tr><tr><td>出现方式</td><td>"+selectstr[i]+"</td></tr><tr><td>滚动速度</td><td><input type=\"text\" value=\""+speed[i]*10*10+" \"   maxlength=\"4\"   class=\"speed"+i+"\" ></td></tr><tr><td>停留时间ms</td><td><input type=\"text\" value=\""+stoptime[i]+" \"  maxlength=\"6\" class=\"stoptime"+i+"\"></td></tr>"
        }

        classping[i] = "<div class=\""+id+"affiche_text"+i+"\";  style='position: absolute; height:32;width:320px' >" +img[i]+showcontent+"<div>"; 
       

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
        //type-1   为动作  ，cidnum 为图片 1或者2   
        updatecmsini(type-1,cidnum);
        return false;
    }
    $("."+id+"affiche").append(classping[0]);
    //左边或者上进场 else 右或者下边
    if( arr_check[0] == 1 ||  arr_check[0] == 2 ||  arr_check[0] == 5 ){
        var textWidth = 320;
        var place1 = "left";
        var iwidth1 =320;
        var scrollWidth1 = $("#"+id+"affiche").width() ;       //div 长度
    }else{
        var textWidth = 32;
        var iwidth1 =32;
        var place1 = "top";
        var scrollWidth1 = $("#"+id+"affiche").height() ;       //div 长度
    }
    if( arr_check[1] == 1 ||  arr_check[1] == 2 ||  arr_check[1] == 5 ){
        var textWidth1 = 320;
        var iwidth2=320;
        var place2 = "left";
        var scrollWidth2 = $("#"+id+"affiche").width() ;       //div 长度
    }else{
        var textWidth1 = 32;
        var place2 = "top";
        var iwidth2=32;
        var scrollWidth2 = $("#"+id+"affiche").height() ;       //div 长度
    }
    if( arr_check[2] == 1 ||  arr_check[2] == 2 ||  arr_check[2] == 5){
        var textWidth2 = 320;
        var iwidth3 = 320;
        var place3 = "left";
        var scrollWidth3 = $("#"+id+"affiche").width() ;       //div 长度
    }else{
        var textWidth2 = 32;
        var place3 = "top";
        var iwidth3 = 32;
        var scrollWidth3 = $("#"+id+"affiche").height() ;       //div 长度
    }
   

   //立即出现
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
    var stops = new Array();
    stops[id] = 1;

    function cmsstate(){
        if(stops[id] == 1 ){
            $("#"+id+"affiche_text2").hide();
            $("#"+id+"affiche_text0").show();
            if(arr_check[0] == 5 && iwidth1 == 0){
                clearInterval(interval);
                setTimeout(statecms, stoptime[0]);
            }
            iwidth1  -= speed[0];
            if(iwidth1 <=0 && iwidth1 >0-speed[0] && stoptime[1] != 0 && arr_check[0] != 5){
                //清除  
                clearInterval(interval);
                //延迟执行
                setTimeout(statecms, stoptime[0]);
            }
        }
        else if(stops[id] == 2 ){
             if(arr_check[1] == 5 && iwidth2 == 0){
                clearInterval(interval);
                setTimeout(statecms, stoptime[1]);
            }
            iwidth2 -=  speed[1];

            $("#"+id+"affiche_text0").hide();
             if(iwidth2 <=0 && iwidth2 >0-speed[1] && stoptime[1] != 0 && arr_check[0] != 5){
                //清除  
                clearInterval(interval);
                //延迟执行
                setTimeout(statecms, stoptime[1]);
            }
         }
         else if( stops[id] == 3  ){   
            if(arr_check[2] == 5 && iwidth3 == 0){
                clearInterval(interval);
                setTimeout(statecms, stoptime[2]);
            }   
            iwidth3 -=  speed[2]

            $("#"+id+"affiche_text1").hide();
             if(iwidth3 <=0 && iwidth3 >0-speed[2] && stoptime[2] != 0 && arr_check[0] != 5){
                //清除  
                clearInterval(interval);
                //延迟执行
                setTimeout(statecms, stoptime[2]);
            }
        }

        if (iwidth1 <= -textWidth ) {
            iwidth1 = scrollWidth1  ; 
          
             if(playnum == 1){
                  stops[id] = 1; 
             }else{
                  stops[id] = 2;
             }
            if(arr_check[1] == 5){
                iwidth2=0;
            }
             $("#"+id+"affiche_text0").hide();
            $("#"+id+"affiche_text1").show();
        }
        else if (iwidth2 <= -textWidth1 ) {
            if(playnum == 2){
                      stops[id] = 1;
                }else{
                     stops[id] = 3;
                }
                iwidth2 = scrollWidth2;
            if(arr_check[0] == 5 && playnum == 2){
                    iwidth1=0;
            }
            if(arr_check[2] == 5 && playnum == 3){
                    iwidth3=0;
             }
             $("#"+id+"affiche_text1").hide();
            $("#"+id+"affiche_text2").show();
        }
        else if (iwidth3 <= -textWidth2 ) {
            iwidth3 = scrollWidth3;
            if(playnum == 3){
                 stops[id] = 1; 
            }
            if(arr_check[0] == 5 && playnum == 3){
                 iwidth1=0;
            }     
            $("#"+id+"affiche_text2").hide();
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
     } 
   
    var interval = window.setInterval (cmsstate,100);
    
    function statecms(){
         interval = window.setInterval (cmsstate,100);
    }
     
}



function tcmsdota(id,resdata,playnum,type,cid=null){
    var arr_check = new Array();
    var check = new Array("左边进场","右边进场","下移","上移","立即出现");
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
    var selectcolor = new Array();
    var fontsize = new Array("15","25","30");

    var fontstyle = new Array();
        fontstyle[0] = "SimHei";                 //黑体
        fontstyle[1] = "KaiTi";                  //楷体
        fontstyle[2] = "SimSun";                  //宋体
        fontstyle[3] = "FangSong";                //仿宋

    var chinse = new Array("黑体","楷体","宋体","仿宋");
    var fontcolor = new Array("red","yellow","green","black","pink","blue");

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
            img[i] += "<img src=\""+resdata.data[i].picpath[z]+"\";    style=\"margin-left:"+resdata.data[i].picx[z]+"px;position:absolute;height:48;width:48px;\">"
            //静止可选择的图片
            uppicpath[z] = resdata.data[i].uppicpath[z];
            uppicx[z] =  resdata.data[i].picx[z];
            showimg[z] = "<img src=\""+resdata.data[i].picpath[z]+"\";    style=\"margin-left:"+resdata.data[i].picx[z]+"px;position:absolute;height:48;width:48px;\">"
            //图片位置
            picx[i] = resdata.data[i].picx[0];
        }

        idping[i] = "<div id=\""+id+"affiche_text"+i+"\"  ;  style='position: absolute;display:none; height:48;width:48px' >"+img[i]+"</div>"
        
        
       
        //判断是否是图片还是文字还是 父节点
        showcontent = "<span  class=\""+id+"test_content"+i+"\"  style=\"position:absolute ;margin-left:"+resdata.data[i].fontx+"px;font-size:" + font_size[i] + "px;color:"+font_color[i]+";margin-top:2px;width:280px;font-family:"+font_style[i]+";line-height:" + font_size[i] + "px;\">"+content[i]+"</span>";
       
        if(cid != null &&  cid.indexOf("图片") != -1){
            //去除文字
            showcontent = "";
            //过滤汉字图片1（只剩 1）
            var reg=/[\u4E00-\u9FA5]/g;
            var cidnum=cid.replace(reg,'');
            if(!isNaN(cidnum * 1)){
                 picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\""+uppicx[cidnum-1]+"\"  maxlength=\"3\" class=\"picx"+i+"\"></td></tr><tr><td>当前图片</td><td>"+ uppicpath[cidnum-1] +"</td></tr><tr><td>上传并且更改图片</td><td><button type=\"button\"class=\"layui-btn-sm layui-btn-primary\" id=\"filepic"+i+"\">上传图片</button></td></tr>"
                img[i] = showimg[cidnum-1];
            }
        }else if(cid != null && cid == "文字"){
            img[i] = "";
            //字体style
            selectstr[i] = '<select class=\"fontstyle'+i+'\" >';
            fontstyle.forEach(function(element,index,arr){
                if(font_style[i] == element ){
                    selectstr[i] += "<option value=\""+element+"\"  selected >"+chinse[index]+"</option>";
                }else{
                    selectstr[i] += "<option value=\""+element+"\" >"+chinse[index]+"</option>";
                 }
            })
            selectstr[i] += "</select>";
            //字体大小
            selectsize[i] = '<select class=\"fontsize'+i+'\" >';
            fontsize.forEach(function(element,index,arr){
                if(font_size[i] == element ){
                    selectsize[i] += "<option value=\""+element+"\"  selected >"+element+"</option>";
                }else{
                    selectsize[i] += "<option value=\""+element+"\" >"+element+"</option>";
                  }
            })
            selectsize[i] += "</select>";
            //字体颜色
            selectcolor[i] = '<select class=\"fontcolor'+i+'\" >';
            fontcolor.forEach(function(element,index,arr){
                if(font_color[i] == element ){
                    selectcolor[i] += "<option value=\""+element+"\"  selected >"+element+"</option>";
                }else{
                   selectcolor[i] += "<option value=\""+element+"\" >"+element+"</option>";
                }
            })
            selectcolor[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>X坐标</td><td><input type='text' value=\""+pontx[i]+"\"  maxlength=\"3\" class=\"fontx"+i+"\"></td></tr><tr><td>字体颜色</td><td>"+  selectcolor[i] +"</td></tr><tr><td>字体</td><td>"+  selectstr[i] +"</td></tr><tr><td>字体大小</td><td>"+ selectsize[i] +"</td></tr><tr><td>字符</td><td><textarea style='width:250px;height:60px'   class=\"content"+i+"\";>"+content[i]+"</textarea></td></tr>"
        }else if(cid == null ){
            //出场顺序
            selectstr[i] = '<select class=\"check'+i+'\" >';
            check.forEach(function(element,index,arr){
                if(arr_check[i] == index+1 ){
                    selectstr[i] += "<option value=\""+(index+1)+"\"  selected >"+element+"</option>";
                }else{
                    selectstr[i] += "<option value=\""+(index+1)+"\" >"+element+"</option>";
                 }
            })
            selectstr[i] += "</select>";

            picxlabel[i] = "<tr><th>名称</th><th>信息</th></tr><tr><td>滚动序号</td><td>"+i+"</td></tr><tr><td>出现方式</td><td>"+selectstr[i]+"</td></tr><tr><td>滚动速度</td><td><input type=\"text\" value=\""+speed[i]*10*10+" \"   maxlength=\"4\"   class=\"speed"+i+"\" ></td></tr><tr><td>停留时间ms</td><td><input type=\"text\" value=\""+stoptime[i]+" \"  maxlength=\"6\" class=\"stoptime"+i+"\"></td></tr>"
        }

        classping[i] = "<div class=\""+id+"affiche_text"+i+"\";  style='position: absolute; height:32;width:320px' >" +img[i]+showcontent+"<div>"; 
       

        //如果为0就添加动画运动
        if(type == 0){
            $("#"+id+"affichetcms").append(idping[i]);
        }
    }

    //不为零的 点击更换信息版，所以下面不需要再执行
    if(type !=0 ){
        $("."+id+"affiche").children().remove();
        $("."+id+"affiche").append(classping[type-1]);
        $("#updatecms").children().remove();
        $("#updatecms").append(picxlabel[type-1]);
        //type-1   为动作  ，cidnum 为图片 1或者2   
        updatecmsini(type-1,cidnum);
        return false;
    }
    $("."+id+"affiche").append(classping[0]);
    //左边或者上进场 else 右或者下边
    if( arr_check[0] == 1 ||  arr_check[0] == 2 ||  arr_check[0] == 5 ){
        var textWidth = 48;
        var place1 = "left";
        var iwidth1 =48;
        var scrollWidth1 = $("#"+id+"affichetcms").width() ;       //div 长度
    }else{
        var textWidth = 48;
        var iwidth1 =48;
        var place1 = "top";
        var scrollWidth1 = $("#"+id+"affichetcms").height() ;       //div 长度
    }
    if( arr_check[1] == 1 ||  arr_check[1] == 2 ||  arr_check[1] == 5 ){
        var textWidth1 = 48;
        var iwidth2=48;
        var place2 = "left";
        var scrollWidth2 = $("#"+id+"affichetcms").width() ;       //div 长度
    }else{
        var textWidth1 = 48;
        var place2 = "top";
        var iwidth2=48;
        var scrollWidth2 = $("#"+id+"affichetcms").height() ;       //div 长度
    }
    if( arr_check[2] == 1 ||  arr_check[2] == 2 ||  arr_check[2] == 5){
        var textWidth2 = 48;
        var iwidth3 = 48;
        var place3 = "left";
        var scrollWidth3 = $("#"+id+"affichetcms").width() ;       //div 长度
    }else{
        var textWidth2 = 48;
        var place3 = "top";
        var iwidth3 = 48;
        var scrollWidth3 = $("#"+id+"affichetcms").height() ;       //div 长度
    }
   

   //立即出现
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
    var stops = new Array();
    stops[id] = 1;

    function cmsstate(){
        if(stops[id] == 1 ){
            $("#"+id+"affiche_text2").hide();
            $("#"+id+"affiche_text0").show();
            if(arr_check[0] == 5 && iwidth1 == 0){
                clearInterval(interval);
                setTimeout(statecms, stoptime[0]);
            }
            iwidth1  -= speed[0];
            if(iwidth1 <=0 && iwidth1 >0-speed[0] && stoptime[1] != 0 && arr_check[0] != 5){
                //清除  
                clearInterval(interval);
                //延迟执行
                setTimeout(statecms, stoptime[0]);
            }
        }
        else if(stops[id] == 2 ){
             if(arr_check[1] == 5 && iwidth2 == 0){
                clearInterval(interval);
                setTimeout(statecms, stoptime[1]);
            }
            iwidth2 -=  speed[1];

            $("#"+id+"affiche_text0").hide();
             if(iwidth2 <=0 && iwidth2 >0-speed[1] && stoptime[1] != 0 && arr_check[0] != 5){
                //清除  
                clearInterval(interval);
                //延迟执行
                setTimeout(statecms, stoptime[1]);
            }
         }
         else if( stops[id] == 3  ){   
            if(arr_check[2] == 5 && iwidth3 == 0){
                clearInterval(interval);
                setTimeout(statecms, stoptime[2]);
            }   
            iwidth3 -=  speed[2]

            $("#"+id+"affiche_text1").hide();
             if(iwidth3 <=0 && iwidth3 >0-speed[2] && stoptime[2] != 0 && arr_check[0] != 5){
                //清除  
                clearInterval(interval);
                //延迟执行
                setTimeout(statecms, stoptime[2]);
            }
        }

        if (iwidth1 <= -textWidth ) {
            iwidth1 = scrollWidth1  ; 
          
             if(playnum == 1){
                  stops[id] = 1; 
             }else{
                  stops[id] = 2;
             }
            if(arr_check[1] == 5){
                iwidth2=0;
            }
             $("#"+id+"affiche_text0").hide();
            $("#"+id+"affiche_text1").show();
        }
        else if (iwidth2 <= -textWidth1 ) {
            if(playnum == 2){
                      stops[id] = 1;
                }else{
                     stops[id] = 3;
                }
                iwidth2 = scrollWidth2;
            if(arr_check[0] == 5 && playnum == 2){
                    iwidth1=0;
            }
            if(arr_check[2] == 5 && playnum == 3){
                    iwidth3=0;
             }
             $("#"+id+"affiche_text1").hide();
            $("#"+id+"affiche_text2").show();
        }
        else if (iwidth3 <= -textWidth2 ) {
            iwidth3 = scrollWidth3;
            if(playnum == 3){
                 stops[id] = 1; 
            }
            if(arr_check[0] == 5 && playnum == 3){
                 iwidth1=0;
            }     
            $("#"+id+"affiche_text2").hide();
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
     } 
   
    var interval = window.setInterval (cmsstate,100);
    
    function statecms(){
         interval = window.setInterval (cmsstate,100);
    }
}



//  //可变速限速标志
// function tcms(id){
//     $.ajax({
//         type:"GET",
//         url:"bcd/php/tcms.php?itype=1&id="+id+"",
//         dataType:"json",
//         success:function(res){
//             tcmsdota(id,res.checktcms,res.speedtcms,res.imgpicname);
//         }
//     })
// }

