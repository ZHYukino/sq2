﻿//下拉框和设备选择器关闭情报版
function closecms(dev) {
	switch (dev) {
        case 1:
            for (var i = 0; i < arr_CMS.length; i++) {
            	console.log(13);
                var id = arr_CMS[i][1];
                $("#" + id + "affiche").hide();
            }
            break;
        case 2:
            for (var i = 0; i < arr_TCMS.length; i++) {
                var id = arr_TCMS[i][1];
                $("#" + id + "affichetcms").hide();
            }
            break;
		case 3:
            for (var i = 0; i < arr_TCMS.length; i++) {
                var id = arr_TCMS[i][1];
                $("#" + id + "affichetcms").hide();
            }
            for (var i = 0; i < arr_CMS.length; i++) {
                var id = arr_CMS[i][1];
                $("#" + id + "affiche").hide();
            }
        break;
    }
}
//下拉框
//选择设备加载图标
function loadCheckbox(){
	var tunnelnum=$("#default_place_select").val();//隧道号
	var tunnel_name=$("#default_place_select").find("option:selected").text(); //隧道号
	$.ajax({
		type: "GET",
		url : "bcd/php/getcheck.php?itype=1&tunnel="+tunnelnum+"&dc=" + new Date().getTime() + "",
		//data:{},
		dataType: "json",
		success: function(mydata){
			if(mydata){
				 $(".default-panel-img").attr("src", "./pic2/tunnelBack"+tunnelnum+".jpg");
				 $("#title_name").text(tunnel_name);
				 closecms(3);
				for(var dataitem in mydata){
					if(mydata[dataitem]==1){
						$("input[typename="+ dataitem +"]").attr("checked","");
					}
				}
			}
			//赋值加载图
			selectTunnel();
		 },
		error: function(json){}
	});
}
//


//保存选择的设备
function saveCheckbox(typevalue){
	$.ajax({
		type: "GET",
		url : "bcd/php/getcheck.php?itype=0&name="+ typevalue +"&dc=" + new Date().getTime() + "",
		//data:{},
		dataType: "json",
		success: function(mydata){
			if(mydata.code == "CMS"){
				closecms(1);//隐藏情报板
			}
			if(mydata.code == "TCMS"){
				closecms(2);
			}
		},
		error: function(json){}
	});
}

//加载隧道时
function selectTunnel(){
	for(i=0;i<$(".default-checkbox").length;i++){
		if ($(".default-checkbox:eq("+ i +")").is(":checked")) {
			var typevalue=$(".default-checkbox:eq("+ i +")").attr("typename");
			var picclass=returnPicclass(typevalue);
			var selectvalue=$("#default_place_select").val();
			defaultAjax(typevalue,selectvalue,picclass,0);
		}
	}
}

function defaultAjax(typevalue,selectvalue,picclass,unum){
	//当前背景图大小
	picW=$("#default_panel_img").width();
	picH=$("#default_panel_img").height();
//	console.log(typevalue);

	switch(typevalue){
		case "TS":
			arr_=arr_TS;
			break;
		case "LS":
			arr_=arr_LS;
			break;
		case "LIGHT":
			arr_=arr_LIGHT;
			break;
		case "LED":
			arr_=arr_LED;
			break;
		case "FAN":
			arr_=arr_FAN;
			break;
		case "COVI":
			arr_=arr_COVI;
			break;
		case "FSFX":
			arr_=arr_FSFX;
			break;
		case "FB":
			arr_=arr_FB;
			break;
		case "FGS":
			arr_=arr_FGS;
			break;
		case "FGW":
			arr_=arr_FGW;
			break;
		case "FGR":
			arr_=arr_FGR;
			break;
		case "DOOR":
			arr_=arr_DOOR;
			break;
		case "CMS":
			arr_=arr_CMS;
			break;
		case "CAM":
			arr_=arr_CAM;
			break;
		case "DEC":
			arr_=arr_DEC;

			break;
		case "ET":
			arr_=arr_ET;
			break;
		case "VD":
			arr_=arr_VD;
			break;
		case "PUMP":
			arr_=arr_PUMP;
			break;
		case "WD":
			arr_=arr_WD;
			break;
		case "TCMS":
			arr_=arr_TCMS;
			break;
		case "FCMS":
			arr_=arr_FCMS;
			break;
		case "DOOREx":
			arr_=arr_DOOREx;
			break;
		case "ETHOST":
			arr_=arr_DEC;
			break;
	}
	if(unum==0){
		defaultAddImg(typevalue,selectvalue,picclass,arr_,0);
	}else{
		defaultUpdateImg(typevalue,selectvalue,picclass,arr_,0);
	}
}

function defaultAddImg(typevalue,selectvalue,picclass,arr_info,snum) {
	if(arr_info !=undefined){
		for (var snum = 0; snum < arr_info.length; snum++) {
			var arrnum = arr_info[snum][0];
			var sdid = arr_info[snum][2];
			if (selectvalue == sdid) {
				//状况
				var id = arr_info[snum][1];
				var devcode = arr_info[snum][3];
				var title = arr_info[snum][4] + "&#13;" + arr_info[snum][13] + "&#13;" + arr_info[snum][5];
				var updown = arr_info[snum][6];
				var ipaddr = arr_info[snum][7];
				var ipport = arr_info[snum][8];
				var shape = arr_info[snum][9];
				//自适应
				//初始设置背景图大小
				var pointX = arr_info[snum][10];
				var pointY = arr_info[snum][11];
				//状态值
				var tunnelnum=$("#default_place_select").val();//隧道号
				var state = arr_info[snum][18];
				var i1 = arr_info[snum][19];        //state
				var i2 = arr_info[snum][20];         //-1
				var n1 = arr_info[snum][29];
				var n2 = arr_info[snum][30];
				var n3 = arr_info[snum][28];     //  value
				var channel = arr_info[snum][26];//通道号
				//var v1=arr_info[snum][23];
				//var v2=arr_info[snum][24];
				//图片位置
				var thisLeft = picW / 100 * pointX;
				var thisTop = picH / 100 * pointY;
				//根据状况获取设备信息
				var picinfo = returnPicinfo(1, title, typevalue, state, shape, updown, i1, i2, n1, n2);
				//根据状况获取图片地址

				var picurl = returnPicurl(typevalue, state, shape, updown, i1, i2,tunnelnum,n3,n1);

				//根据背景图片比例得出大小
				var thiswh = "";
				//thiswidth=picW/picW_this*parseInt(eval("pic_"+ typevalue +"_width"));
				thisheight = picH / picH_this * parseInt(eval("pic_" + typevalue + "_height"));
				thiswidth = thisheight / parseInt(eval("pic_" + typevalue + "_height")) * parseInt(eval("pic_" + typevalue + "_width"));
				if (thisheight != 0) {
					thiswh += "height:" + thisheight + "px;";
				}
				if(typevalue == "TS"){
                    thiswh += "width:45px";
                }
				else if (thiswidth != 0) {
					thiswh += "width:" + thiswidth + "px;";
				}

				//拼接界面div开始
				var picmodule = "<div id=\"" + id + "\" arrnum=\"" + arrnum + "\" class=\"" + picclass + " picselectclass\" style=\"top:" + thisTop + "px;left:" + thisLeft + "px" + ";\" ipaddr=\"" + ipaddr + "\" channel=\"" + channel + "\" state=\"" + state + "\" title=\"" + title + "\" devcode=\"" + devcode + "\">";
				//+"\" title=\""+ title +"\" state=\""+ state +"\" shape=\""+ shape
				//+"\" updown=\""+ updown +"\" i1=\""+ i1 +"\" i2=\""+ i2 +"\" n1=\""+ n1
				//+"\" n2=\""+ n2 +"\" v1=\""+ v1 +"\" v2=\""+ v2 +"\" picurl=\""+ picurl +"\" ipport=\""+ ipport +"\"
				picmodule = picmodule + "<img title=\"" + picinfo + "\" src=\"" + picurl + "\" style=\"" + thiswh + "\" />";
				switch (typevalue) {
					case "LIGHT":
						picmodule = picmodule + "<div class=\"picatfont\">in:" + n1 + " out:" + n2 + "</div>";
						break;
					case "COVI":
						picmodule = picmodule + "<div class=\"picatfont\">co:" + n1 + " vi:" + n2 + "</div>";
						break;
					case "FSFX":
						picmodule = picmodule + "<div class=\"picatfont\">fs:" + n3 + " fx:" + i1 + "</div>";
						break;
				}
				picmodule = picmodule + "</div>";
				//拼接结束
				$("#default_cover").append(picmodule);
                //控制cms播放
				varname="var"+id;                  //这是防止重复cms重复的变量
				window[varname] = 100;
				varcmsbtn="cms"+id;                  //这是关闭cms的变量
				window[varcmsbtn] = true;
                var cmsupload="upload"+id;                  //这是防止重复cms重复的变量
                window[cmsupload] = 92;
                //左键事件
				bindLeftKey(picclass, id,pointX,pointY);
				//右键菜单

				bindRightKey(id, picclass, shape);
			}
		}
	}
}

//判断更新时
function defaultUpdateImg(typevalue,selectvalue,picclass,arr_info,snum){
	if(arr_info !=undefined) {
		for (var snum = 0; snum < arr_info.length; snum++) {
			//信息
			var sdid = arr_info[snum][2];
			//状况变化/时间，值变化/时间
			var statego = arr_info[snum][14];
			var valuego = arr_info[snum][16];
			if (selectvalue == sdid) {
				if (statego == true || valuego == true) {
					//更新状态
					arr_info[snum][14] = false;
					arr_info[snum][16] = false;
					//状况
					var id = arr_info[snum][1];
					var title = arr_info[snum][4] + "\n" + arr_info[snum][13] + "\n" + arr_info[snum][5];
					var updown = arr_info[snum][6];
					var shape = arr_info[snum][9];
					var state = arr_info[snum][18];
					var i1 = arr_info[snum][19];        //state
					var i2 = arr_info[snum][20];         //-1
					var n1 = arr_info[snum][29];
					var n2 = arr_info[snum][30];
					var n3 = arr_info[snum][28];
					var channel = arr_info[snum][26];//通道号
					//根据状况获取设备信息
					var picinfo = returnPicinfo(2, title, typevalue, state, shape, updown, i1, i2, n1, n2);

					//根据背景图片比例得出大小
					var thiswh = "";
					//thiswidth=picW/picW_this*parseInt(eval("pic_"+ typevalue +"_width"));
					thisheight = picH / picH_this * parseInt(eval("pic_" + typevalue + "_height"));
					thiswidth = thisheight / parseInt(eval("pic_" + typevalue + "_height")) * parseInt(eval("pic_" + typevalue + "_width"));
					if (thisheight != 0) {
						thiswh += "height:" + thisheight + "px;";
					}
                    if(typevalue == "TS"){
                        thiswh += "width:45px";
                    }
                    else if (thiswidth != 0) {
                        thiswh += "width:" + thiswidth + "px;";
                    }
					var tunnelnum=$("#default_place_select").val();//隧道号
					//根据状况获取图片地址
					var picurl = returnPicurl(typevalue, state, shape, updown, i1, i2,tunnelnum,n3,n1);
					$("#" + id + " img").attr("title", picinfo);
					$("#" + id + " img").attr("src", picurl);
					$("#" + id + " img").attr("style", thiswh);
					switch (typevalue) {
						case "LIGHT":
							$("#" + id + " .picatfont").html("in:" + n1 + " out:" + n2 + "");
							break;
						case "COVI":
							$("#" + id + " .picatfont").html("co:" + n1 + " vi:" + n2 + "");
							break;
						case "FSFX":
							$("#" + id + " .picatfont").html("fs:" + n3 + " fx:" + i1 + "");
							break;
					}
				}
			}
		}
	}
}



	//门架播放版
	function cmssetdota(id,place,rate,check,content,speed,size,stoptime,stopplace,pic,font_color,font_style) {

		var place_zh = place;                         	//上下的位置方式   1为居中 2左边  3右边
		var rate_zh = rate;                         	//滑动频率  10-20-30   数字大速度慢
		var check_zh = check;                          	//进入方式
		if(check <=2){
			$("#"+id+"test_content").append(""+content+"");   //内容
		}
		$("#"+id+"test_content").css("font-family",""+font_style+"");   //字体样式
		if(pic !=0 ){
			$("#"+id+"imgpic2").attr("src",""+pic+"");
			$("#"+id+"imgpic").attr("src",""+pic+"");         //两张图片
		}
		$("#"+id+"affiche").css("color",""+font_color+"");
		var cmsspeed_zh = speed;                       //滚动速度
		var font_size = size;                     //字体大小
		var cmsstoptime = stoptime;               //停止时间
		var cmsstopplace = stopplace;               		//停止位置
		(function () {
			var timer = setTimeout(this.marquee, 1000);
		}());
		$("#"+id+"test_content").css("font-size", "" + font_size + "px");

		var scrollWidth = $("#"+id+"affiche").width() ;       //div 长度
		var textWidth = $("#"+id+"affiche_text").width() ;
		var iwidth = scrollWidth;
		switch (check_zh) {
			//1为 左边入场
			case 1:
				$("#"+id+"affiche_text").css("left", "100%");
				$("#"+id+"affiche_text").show();
				$("#"+id+"nbs").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
				var interval = setInterval
				(function () {
					if (iwidth < -textWidth-100) {
						iwidth = scrollWidth+30 ;
					}
					if(iwidth < -textWidth-60){
						$("#"+id+"affiche_text").hide();
					}
					if(iwidth < scrollWidth+20 ){
						$("#"+id+"affiche_text").show();
					}
					iwidth -=  cmsspeed_zh;
					var font_left = (scrollWidth - textWidth  ) / 2 -(8*4) ;                 //居中数
					switch (cmsstopplace) {
						case 1:
							if (iwidth >= font_left && iwidth < font_left + speed) {              //居中数减去字体速度   当值小于2个数停止
								$("#"+id+"affiche_text").delay(stoptime);
							}
						break;
						case 3:
							//右边停止
							if(pic !=0 ) {
								if (iwidth >=scrollWidth-textWidth-35-(4*8)  && iwidth < scrollWidth-textWidth+speed-35-(4*8) ) {              //居中数减去字体速度   当值小于2个数停止
									$("#"+id+"affiche_text").delay(stoptime);
								}
							}else{
								if (iwidth >=scrollWidth-textWidth-35  && iwidth < scrollWidth-textWidth+speed-35 ) {              //居中数减去字体速度   当值小于2个数停止
									$("#"+id+"affiche_text").delay(stoptime);
								}
							}
						break;
						case 2:
							//左边停止
							let nblength = 0
							if(pic == 0)  nblength=-(8*4);
							if (iwidth >=-3+nblength && iwidth <-3+speed+nblength  ) {              //居中数减去字体速度   当值小于2个数停止
								$("#"+id+"affiche_text").delay(stoptime);
							}
						break;
					}
					$("#"+id+"affiche_text").animate({'left': iwidth + 'px'}, 10);
				}, 10);
				window["var"+ id +""] = false;
				break;
			case 2:
				//右边入场
				$("#"+id+"affiche_text").css("right", "200%");
				$("#"+id+"affiche_text").show();
				$("#"+id+"nbs").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
				setInterval
				(function () {
                    if (iwidth < -textWidth-100) {
                        iwidth = scrollWidth+30 ;
                    }
                    if(iwidth < -textWidth-60){
                        $("#"+id+"affiche_text").hide();
                    }
                    if(iwidth < scrollWidth+20 ){
                        $("#"+id+"affiche_text").show();
                    }
					iwidth = iwidth - cmsspeed_zh;
					var font_left = (scrollWidth - textWidth ) / 2;                 //居中数  32 是两个图片的 px值
					switch (cmsstopplace) {
						case 1:
							//居中停止
							if (iwidth >= font_left && iwidth <= font_left+speed ) {              //居中数减去字体速度   当值小于2个数停止
								$("#"+id+"affiche_text").delay(stoptime);
							}
						break;
						case 2:
							//靠左停止
							if(pic == 0){
								if (iwidth >=scrollWidth-textWidth  && iwidth < scrollWidth-textWidth+speed ) {              //居中数减去字体速度   当值小于2个数停止
									$("#"+id+"affiche_text").delay(stoptime);
								}
							}else{
								if (iwidth >=scrollWidth-textWidth-(4*8)  && iwidth < scrollWidth-textWidth+speed-(4*8)) {              //居中数减去字体速度   当值小于2个数停止
									$("#"+id+"affiche_text").delay(stoptime);
								}
							}
						break;
						case 3:
							//靠右停止
							if(pic == 0){
								if (iwidth >=32-(4*8) && iwidth <32+speed-(4*8)  ) {              //居中数减去字体速度   当值小于2个数停止
									$("#"+id+"affiche_text").delay(stoptime);
								}
							}else{
								if (iwidth >=32 && iwidth <32+speed  ) {              //居中数减去字体速度   当值小于2个数停止
									$("#"+id+"affiche_text").delay(stoptime);
								}
							}
						break;
					}
					$("#"+id+"affiche_text").animate({'right': iwidth + 'px'}, 10);
				}, 10);
				window["var"+ id +""] = false;
				break;
			case 3:
				//上
				$("#"+id+"affiche_text").removeAttr('style');
                $("#"+id+"affiche_text").css("top", "100%");
				$("#"+id+"imgpic").removeAttr('style');
				$("#"+id+"affiche_text").css('width','250px');
				$("#"+id+"affiche_text").css('position','absolute');
				$("#"+id+"affiche_text").css('line-height',""+size+"px");
				$("#"+id+"test_content").append(""+content+"");   //内容
				var textheight = $("#"+id+"affiche_text").height();
				var scrollheight = $("#"+id+"affiche").height();
				var jheight = scrollheight;            //   j高度
				scrollWidth = $("#"+id+"affiche").width() ;       //div 长度
				textWidth = $("#"+id+"affiche_text").width() ;
				iwidth = scrollWidth;
				if (place_zh === 1) {
					//计算文字距离div距离  做出居中效果
					var font_left = (scrollWidth - textWidth ) / 2;
					$("#"+id+"affiche_text").css("left", "" + font_left + "px");
				} else if (place_zh === 2) {
					//左边效果
					$("#"+id+"affiche_text").css("left", "0");
				} else if (place_zh === 3) {
					//右边效果
					$("#"+id+"affiche_text").css("right", "32px");
				}
				setInterval
				(function () {
					jheight = jheight - cmsspeed_zh;
					if(stopplace == 1){
						if(jheight <= -2 && jheight > -2-speed){
							$("#"+id+"affiche_text").delay(stoptime);
						}
					}
                    if(size * 2>=40){
                        if (jheight < -textheight-size-size) {
                            jheight = scrollheight+8;
                        }
                    }else{
                        if (jheight < -textheight-40) {
                            jheight = scrollheight+8;
                        }
                    }
					$("#"+id+"affiche_text").animate({'top': jheight + 'px'}, rate_zh);
				}, 5);
				window["var"+ id +""] = false;
				break;
			case 4:
				//下
				$("#"+id+"affiche_text").removeAttr('style');
				$("#"+id+"affiche_text").css('width','280px');
				$("#"+id+"affiche_text").css('position','absolute');
                $("#"+id+"affiche_text").css('line-height',""+size+"px");
				$("#"+id+"test_content").append(""+content+"");   //内容
				$("#"+id+"imgpic").removeAttr('style');
				$("#"+id+"imgpic2").removeAttr('style');	
				var textheight = $("#"+id+"affiche_text").height();
				var scrollheight = $("#"+id+"affiche").height();
				var jheight = scrollheight;            //   j高度
				scrollWidth = $("#"+id+"affiche").width() ;       //div 长度
				textWidth = $("#"+id+"affiche_text").width() ;
				iwidth = scrollWidth;
				if (place_zh === 1) {
					//计算文字距离div距离  做出居中效果
					var font_left = (scrollWidth - textWidth ) / 2;
					$("#"+id+"affiche_text").css("left", "" + font_left + "px")
				} else if (place_zh === 2) {
					//左边效果
					$("#"+id+"affiche_text").css("left", "0");
				} else if (place_zh === 3) {
					//右边效果
					$("#"+id+"affiche_text").css("right", "32px");
				}
				//下滚动
				$("#"+id+"affiche_text").css("bottom", "100%");
				setInterval
				(function () {
					jheight = jheight - cmsspeed_zh;
					if(size * 2>=40){
						if (jheight < -textheight-size-size) {
							jheight = scrollheight+8;
						}
					}else{
                        if (jheight < -textheight-40) {
                            jheight = scrollheight+8;
                        }
					}
					if(stopplace == 1){
						if(jheight <= 0 && jheight > 0-speed){
							$("#"+id+"affiche_text").delay(stoptime);
						}
					}
					$("#"+id+"affiche_text").animate({'bottom': jheight + 'px'}, rate_zh);
				}, 5);
				window["var"+ id +""] = false;
				break;
		}
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



//点击事件
function bindLeftKey(picclass,id,pointX,pointY) {
    //可限速标志
    if (picclass == "default-pic-TCMS") {
        $("#" + id + "").on('mousedown', function (es) {
            if (es.which == 3) {
                if (window["cms" + id + ""]) {
                    window["cms" + id + ""] = false;
                    $("#" + id + "affichetcms").show();
                    if (!window["var" + id + ""]) return false;   			//防止执行两次 运动
                    if (window["tcmscheck" + id + ""] !== false) {
                        $("#" + id + "affichetcms").css("left", "" + pointX + "%");
                        $("#" + id + "affichetcms").css("top", "" + pointY - 8 + "%");
                    }
                    tcms(id);
                } else {
                    window["cms" + id + ""] = true;
                    $("#" + id + "affichetcms").hide();
                }
            }
        })
    }

    //门架标志 右击
    if (picclass == "default-pic-CMS") {
        $("#" + id + "").on('mousedown', function (e) {
            if(e.which == 3){
            //如果为true 就是第一次打开cms ，false 为第二点击cms ，也就是关闭
				if (window["cms" + id + ""]) {
					window["cms" + id + ""] = false;
					$("#" + id + "affiche").show();
					//防止执行两次 运动
					console.log(window["var" + id + ""]);
					if (!window["var" + id + ""]) return false;
					//如果通过setxy移动过限速标志情报板就不再修改位置
					if (window["cmscheck" + id + ""] !== false) {
						if (pointX < 10) {
							//位置最左最右特殊化
							$("#" + id + "affiche").css("left", "" + pointX - 1 + "%");
						} else if (pointX > 90) {
							$("#" + id + "affiche").css("left", "" + pointX - 21 + "%");
						} else {
							$("#" + id + "affiche").css("left", "" + pointX - 9 + "%");
						}
						$("#" + id + "affiche").css("top", "" + pointY - 4 + "%");
					}
					getcmsshow(id);
				} else {
					window["cms" + id + ""] = true;
					$("#" + id + "affiche").hide();
				}
            }
            $("#" + id + "").on('dblclick', function () {
                $(function() {
                    var zNodes1 ;
                    $.ajax({
                        url:"bcd/php/setcms.php?itype=2&id=100002",
                        type:"get",
                        dataType:"json",
                        async:false,
                        data:"" ,
                        success:function (res) {
                            zNodes1=res;
                        }
                    });
                    //创建ztree的配置对象
                    var setting1 = {
                        treeId: "ztree1",
                        data: {
                            simpleData: {
                                enable: true, //设置使用简单数据格式
                                idKey: "id", //id标识  可以修改为数据库对应字段
                                pIdKey: "pid", //父级id
                                rootPId: 0, //根节点id
                            }
                        },
                        //设置点击事件
                        callback: {
                            onClick: function(event, treeId, treeNode, clickFlag) {
                                console.log(treeNode.name)
                            }
                        },
                        // check: {
                        //     enable: true, //是否显示 checkbox/radio
                        //     chkStyle: "radio", //设置显示类型 值可选：radio/checkbox
                        // }
                    };
                    //初始化第一个树
                    $.fn.zTree.init($("#ztree1"), setting1, zNodes1);

                });
                layer.open({
                    type: 1 //此处以iframe举例
                    ,title: '情报版'
                    ,area: ['1000px', '640px']
                    ,shade: 0
                    ,maxmin: true
                    ,offset: [Ht+10]
					, id: 'LAY_LSTSdbclick_cms' //防止重复弹出
                     ,content: $("#cms_one")
                   // , content: 'html内容'
                    ,btn: ['关闭'] //只是为了演示
                    ,yes: function(index, layero){
                        $('#cmsuploadimg'+id+'').hide();
                        $('#1cmsuploadimg'+id+'').hide();
                        layer.close(index);
                    }
                     ,zIndex: layer.zIndex
                    ,success: function(layero){
                         // layer.setTop(layero);
                    }
                });
                $('#cmsuploadimg'+id+'').show();
                $('#1cmsuploadimg'+id+'').show();
                console.log( window["upload"+id+""]);
                if(window["upload"+id+""] != "92" )  return false;
                window["upload"+id+""] = false;
                console.log( window["upload"+id+""]);
                layui.use('upload', function(){
                    var $ = layui.jquery
                        ,upload = layui.upload;
                    //普通图片上传
                    upload.render({
                        elem: '#cmsuploadimg'+id+''
                        ,url: './bcd/php/setcms.php?itype=1&id='+id+''
                        // ,id: 'LAY_control_panel_cms' //防止重复弹出
                        ,accept: 'file' //普通文件
                        ,multiple: true
                        ,before: function(obj){
                            //预读本地文件示例，不支持ie8
                            $('#cmsuploadimg'+id+'').text("上传中。。");
                            layer.load(); //上传loading
                            // obj.preview(function(index, file, result){
                            //     $('#cmsuploadpic'+id+'').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img" style="width: 100px;height: 100px;margin-right:10px;margin-top:10px">')
                            // });
                        }
                        ,done: function(res){
                            //上传完毕
                            $('#cmsuploadimg'+id+'').text("播放发送");
                            layer.closeAll('loading'); //关闭loading
                            layer.msg(res.sinfo, {time: 2000, icon:6});
                        }
                        ,error: function(){
                            //演示失败状态，并实现重传
                            $('#cmsuploadimg'+id+'').text("播放发送");
                            layer.closeAll('loading'); //关闭loading
                            var demoText = $('#demoText');
                            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                            demoText.find('.demo-reload').on('click', function(){
                                uploadInst.upload();
                            });
                        }
                    });
                });
            })
        })
    }

    //信号灯双击
    if (picclass == "default-pic-TS" || picclass == "default-pic-LS") {
        $("#" + id + "").on('dblclick', function () {
            layer.open({
                type: 1 //此处以iframe举例
                , title: '信号灯控制 — ' + $("#default_place_select").find("option:selected").text()
                , area: ['500px', '' + H - 100 + 'px']
                , shade: 0
                , maxmin: true
                , offset: [Ht + 10]
                , id: 'LAY_LSTSdbclick_panel' //防止重复弹出
                , content: $("#LSTSdbclick_panel")
                , btn: ['关闭'] //只是为了演示
                , yes: function (index, layero) {
                    layer.close(index);
                }
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //更新下拉框内容
                    updateTSSelectContent("LSTSdbclick_select", arr_PLAN);
                }
            })
        })
    }
    //COVI单击
    if (picclass == "default-pic-COVI") {
        $("#" + id + "").on('click', function () {
            if (flag) {
                var coviid = $(this).attr("id");
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: 'CO/VI采集数据'
                    , area: ['800px', '' + H - 100 + 'px']
                    , shade: 0
                    , maxmin: true
                    , offset: [Ht + 10]
                    , id: 'LAY_control_data_covi' //防止重复弹出
                    , content: $("#control_data_covi")
                    , btn: ['关闭'] //只是为了演示
                    , yes: function (index, layero) {
                        layer.close(index);
                    }
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);
                        for (var i = 0; i < arr_COVI.length; i++) {
                            if (arr_COVI[i][1] == coviid) {
                                var covistate = arr_COVI[i][19];
                                var coviup = arr_COVI[i][6];
                                var covin3 = arr_COVI[i][28];
                                var covi_img = returnStatePic("covi", covistate, coviup, covin3);
                                var covi_statename = returnStateName(covistate);
                                var covi_name = arr_COVI[i][13];
                                var covi_addr = arr_COVI[i][5];
                                $("#covi_img").attr("src", covi_img);
                                $("#covi_name").html(covi_name);
                                $("#covi_addr").html(covi_addr);
                                $("#covi_state").html(covi_statename);
                                //取最近的一次值
                                var covi_coval = arr_COVI[i][29];
                                var covi_vival = arr_COVI[i][30];
                                $("#covi_coval").html(covi_coval);
                                $("#covi_vival").html(covi_vival);
                            }
                        }
                        $.ajax({
                            type: "GET",
                            url: "bcd/php/getrptcovi.php?itype=4&devid=" + coviid + "&dc=" + new Date().getTime() + "",
                            //data:{},
                            dataType: "json",
                            success: function (mydata) {
                                if (mydata) {
                                    var arrCo = [];
                                    var arrVi = [];
                                    var arrCollTime = [];
                                    for (i = 0; i < mydata.data.length; i++) {
                                        arrCo.push(parseInt(mydata.data[i].coval));
                                        arrVi.push(parseInt(mydata.data[i].vival));
                                        arrCollTime.push(returnFormatTime(mydata.data[i].colltime));
                                    }
                                    //加载图表
                                    $('#container_covi').highcharts({
                                        exporting: {
                                            enabled: false
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        chart: {
                                            type: 'line'
                                        },
                                        title: {
                                            text: '1小时CO,VI检测曲线图'
                                        },
                                        subtitle: {
                                            text: ''
                                        },
                                        xAxis: {
                                            categories: arrCollTime
                                        },
                                        yAxis: {
                                            title: {
                                                text: ''
                                            }
                                        },
                                        plotOptions: {
                                            line: {
                                                dataLabels: {
                                                    enabled: true          // 开启数据标签
                                                },
                                                enableMouseTracking: false // 关闭鼠标跟踪，对应的提框、点击事件会失效
                                            }
                                        },
                                        series: [{
                                            name: 'CO检测值',
                                            data: arrCo
                                        },
                                            {
                                                name: 'VI检测值',
                                                data: arrVi
                                            }]
                                    });
                                }
                            },
                            error: function (json) {
                            }
                        });
                    }
                });
            }
        })
    }
    //FSFX单击
    if (picclass == "default-pic-FSFX") {
        $("#" + id + "").on('click', function () {
            if (flag) {
                var fsfxid = $(this).attr("id");
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '风速/风向采集数据'
                    , area: ['800px', '' + H - 100 + 'px']
                    , shade: 0
                    , maxmin: true
                    , offset: [Ht + 10]
                    , id: 'LAY_control_data_fsfx' //防止重复弹出
                    , content: $("#control_data_fsfx")
                    , btn: ['关闭'] //只是为了演示
                    , yes: function (index, layero) {
                        layer.close(index);
                    }
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);
                        for (var i = 0; i < arr_FSFX.length; i++) {
                            if (arr_FSFX[i][1] == fsfxid) {
                                var fsfxstate = arr_FSFX[i][19];
                                var fsfxup = arr_FSFX[i][6];
                                var fsfxn3 = arr_FSFX[i][28];
                                var fsfx_img = returnStatePic("fsfx", fsfxstate, fsfxup, fsfxn3);
                                var fsfx_statename = returnStateName(fsfxstate);
                                var fsfx_name = arr_FSFX[i][4];
                                var fsfx_addr = arr_FSFX[i][5];
                                $("#fsfx_img").attr("src", fsfx_img);
                                $("#fsfx_name").html(fsfx_name);
                                $("#fsfx_addr").html(fsfx_addr);
                                $("#fsfx_state").html(fsfx_statename);
                                //取最近的一次值
                                var fsfx_fsval = arr_FSFX[i][21];
                                var fsfx_fxval = arr_FSFX[i][22];
                                var citystr = "";
                                //风向
                                if (parseInt(fsfx_fxval) == 1) {
                                    citystr = $("#config_city_left").val();
                                } else {
                                    citystr = $("#config_city_right").val();
                                }
                                fsfx_fxval = "往" + citystr + "方向";
                                $("#fsfx_fsval").html(fsfx_fsval);
                                $("#fsfx_fxval").html(fsfx_fxval);
                            }
                        }
                        $.ajax({
                            type: "GET",
                            url: "bcd/php/getrptfsfx.php?itype=4&devid=" + fsfxid + "&dc=" + new Date().getTime() + "",
                            //data:{},
                            dataType: "json",
                            success: function (mydata) {
                                if (mydata) {
                                    var arrFs = [];
                                    var arrCollTime = [];
                                    for (i = 0; i < mydata.data.length; i++) {
                                        arrFs.push(parseInt(mydata.data[i].fsval));
                                        arrCollTime.push(returnFormatTime(mydata.data[i].colltime));
                                    }
                                    //加载图表
                                    $('#container_fsfx').highcharts({
                                        exporting: {
                                            enabled: false
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        chart: {
                                            type: 'line'
                                        },
                                        title: {
                                            text: '1小时风速检测曲线图'
                                        },
                                        subtitle: {
                                            text: ''
                                        },
                                        xAxis: {
                                            categories: arrCollTime
                                        },
                                        yAxis: {
                                            title: {
                                                text: ''
                                            }
                                        },
                                        plotOptions: {
                                            line: {
                                                dataLabels: {
                                                    enabled: true          // 开启数据标签
                                                },
                                                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                                            }
                                        },
                                        series: [{
                                            name: '风速检测值(m/s)',
                                            data: arrFs
                                        }]
                                    });
                                }
                            },
                            error: function (json) {
                            }
                        });
                    }
                });
            }
        })
    }
    //光强度单击
    if (picclass == "default-pic-LIGHT") {
        $("#" + id + "").on('click', function () {
            if (flag) {
                var lightid = $(this).attr("id");
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '光强度采集数据'
                    , area: ['800px', '' + H - 100 + 'px']
                    , shade: 0
                    , maxmin: true
                    , offset: [Ht + 10]
                    , id: 'LAY_control_data_light' //防止重复弹出
                    , content: $("#control_data_light")
                    , btn: ['关闭'] //只是为了演示
                    , yes: function (index, layero) {
                        layer.close(index);
                    }
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);
                        for (var i = 0; i < arr_LIGHT.length; i++) {
                            if (arr_LIGHT[i][1] == lightid) {
                                var lightstate = arr_LIGHT[i][19];
                                var lightup = arr_LIGHT[i][6];
                                var lightn3 = arr_LIGHT[i][28];
                                var light_img = returnStatePic("light", lightstate, lightup, lightn3);
                                var light_statename = returnStateName(lightstate);
                                var light_name = arr_LIGHT[i][4];
                                var light_addr = arr_LIGHT[i][5];
                                $("#light_img").attr("src", light_img);
                                $("#light_name").html(light_name);
                                $("#light_addr").html(light_addr);
                                $("#light_state").html(light_statename);
                                //取最近的一次值
                                var light_inval = arr_LIGHT[i][21];
                                var light_outval = arr_LIGHT[i][22];
                                $("#light_inval").html(light_inval);
                                $("#light_outval").html(light_outval);
                            }
                        }
                        $.ajax({
                            type: "GET",
                            url: "bcd/php/getrptlight.php?itype=4&devid=" + lightid + "&dc=" + new Date().getTime() + "",
                            //data:{},
                            dataType: "json",
                            success: function (mydata) {
                                if (mydata) {
                                    var arrIn = [];
                                    var arrOut = [];
                                    var arrCollTime = [];
                                    for (i = 0; i < mydata.data.length; i++) {
                                        arrIn.push(parseInt(mydata.data[i].inval));
                                        arrOut.push(parseInt(mydata.data[i].outval));
                                        arrCollTime.push(returnFormatTime(mydata.data[i].colltime));
                                    }
                                    //加载图表
                                    $('#container_light').highcharts({
                                        exporting: {
                                            enabled: false
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        chart: {
                                            type: 'line'
                                        },
                                        title: {
                                            text: '1小时光强检测曲线图'
                                        },
                                        subtitle: {
                                            text: ''
                                        },
                                        xAxis: {
                                            categories: arrCollTime
                                        },
                                        yAxis: {
                                            title: {
                                                text: ''
                                            }
                                        },
                                        plotOptions: {
                                            line: {
                                                dataLabels: {
                                                    enabled: true          // 开启数据标签
                                                },
                                                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                                            }
                                        },
                                        series: [{
                                            name: '洞内检测值(lx)',
                                            data: arrIn
                                        },
                                            {
                                                name: '洞外检测值(cd/m2)',
                                                data: arrOut
                                            }]
                                    });
                                }
                            },
                            error: function (json) {
                            }
                        });
                    }
                });
            }
        })
    }
    //摄像机单击
    if (picclass == "default-pic-CAM") {
        $("#" + id + "").on('click', function () {
            var camtitle = $(this).attr("title");
            ipaddr = $(this).attr("ipaddr");
            ipport = "";
            //ipport=	$(this).attr("ipport");
            ipchannel = $(this).attr("channel");

            //拖动是否单击
            if (flag) {
                if ($(this).attr("state") != 0) {//非故障时
                    var index = layer.load(1, {time: 1 * 1000});
                    if (camtitle.indexOf("#") < 0) {
                        setCameraobj(id, camtitle, ipaddr, ipport, ipchannel);	        //单IP
                    } else {
                        if (camtitle.indexOf("CT") < 0) {
                            setCameraobjEx(id, camtitle, ipaddr, ipport, ipchannel);	//16路
                        } else {
                            setCameraobjCT(id, camtitle, ipaddr, ipport, ipchannel);	//16路带云台
                        }
                    }
                } else {
                    sendScreenMSG(msg_errordevice);
                }
            }
        })
    }


    //拖动保存坐标


    if ($("#setmap").length != 0) {
        $(document).keyup(function (event){
            if(event.keyCode == 17) {
                $("." + picclass + "").draggable('disable');
            }
        })
		$(document).keydown(function (event){
			if(event.keyCode == 17){
                $("." + picclass + "").draggable({
                    start: function () {
                        flag = false;
                    },
                    stop: function () {
                        setTimeout(function () {
                            flag = true;
                        }, 500);

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
                            url: "bcd/php/setxy.php?itype=1&id=" + id + "&cname=" + cname + "&xvalue=" + xvalue + "&yvalue=" + yvalue + "&dc=" + new Date().getTime() + "",
                            //data:{},
                            dataType: "json",
                            success: function (mydata) {
                                if (mydata.type == 23 && mydata.result) {
                                    var cmscheck = "cmscheck" + id;
                                    window[cmscheck] = false;
                                    if (xvalue < 10) {
                                        //位置最左最右特殊化
                                        $("#" + id + "affiche").css("left", "" + xvalue - 1 + "%");
                                    } else if (xvalue > 90) {
                                        $("#" + id + "affiche").css("left", "" + xvalue - 21 + "%");
                                    } else {
                                        $("#" + id + "affiche").css("left", "" + xvalue - 9 + "%");
                                    }
                                    $("#" + id + "affiche").css("top", "" + yvalue - 4 + "%");
                                } else if (mydata.result && mydata.type == 25) {
                                    var tcmscheck = "tcmscheck" + id;
                                    window[tcmscheck] = false;
                                    $("#" + id + "affichetcms").css("left", "" + xvalue + "%");
                                    $("#" + id + "affichetcms").css("top", "" + yvalue - 8 + "%");
                                }
                                if (!mydata.result) {
                                    sendThisScreenMSG(mydata.msg);
                                }
                            }
                        })
                    }
                });   $("." + picclass + "").draggable('enable');
			}
		})
        // onkeyup = function (event){
        //     if(event.keyCode == 17){
        //         console.log(111);
        //     }
        // }

        // $("." + picclass + "").draggable('disable');
        // onkeydown=function (event) {
        //     if (event.keyCode!=17) {
        //         $("." + picclass + "").draggable('enable');
        //     }
        //     // $("." + picclass + "").draggable('enable');
        // }
        // onkeyup=function (event) {
        //     if (event.keyCode==17) {
        // console.log(456);
        // $("." + picclass + "").draggable('disable');


    }
}

//桌面菜单
//按设备群控
function controlGroupGo(index){
	//console.log($(".table_select_group_led").length)
	var lednum=$(".table_select_group_led").length;
	var fannum=$(".table_select_group_fan").length;
	var doornum=$(".table_select_group_door").length;
	var fbnum=$(".table_select_group_fb").length;
	var tsnum=$(".table_select_group_ts").length;
	var lsnum=$(".table_select_group_ls").length;

	//群控LED
	for(var i=0;i<lednum;i++){
		var ledstate=$(".table_select_group_led").eq(i).find("option:selected").attr("avalue");
		//alert($(".table_select_group_led").eq(i).attr("thisid"))		
		if(parseInt(ledstate)>=0){
			var ledid=$(".table_select_group_led").eq(i).attr("thisid");
			var nowstate=$(".table_select_group_led").eq(i).attr("thisstate");
			//不是当前状态才执行
			if(parseInt(ledstate)!=parseInt(nowstate)){
				changestate(ledid,ledstate);
			}
		}
		
		if(i==lednum-1){
			
		}
	}
	
	//群控FAN
	//已经执行过的FAN名单
	var fantimenum=0;
	var list_fanidisgo=Array();
	
	for(var i=0;i<fannum;i++){
		var groupid=$(".table_select_group_fan").eq(i).attr("groupid");
		var fanid=$(".table_select_group_fan").eq(i).attr("thisid");
		var fanstate=$(".table_select_group_fan").eq(i).find("option:selected").attr("avalue");
		
		var nowstate=$(".table_select_group_fan").eq(i).attr("thisstate");
			//不是当前状态才执行
		if(parseInt(fanstate)!=parseInt(nowstate)){
			switch(parseInt(fanstate)){
				case 0:
					changestate(fanid,0);
				case 1:
					changestate(fanid,1);
					//不操作
					break;
				case 2:
					//停止风机
					changestate(fanid,2);
					
					break;
				case 3:
					fantimenum++;//执行时间+1
									
					//同组风机
					var arr_samefan=Array();
					var stateflag=0;
					var tunnel="";
					var	updown="";
				
					for(var j=0;j<arr_FAN.length;j++){
						if(parseInt(groupid)==parseInt(arr_FAN[j][12])){
							var arr_fanone={
								"fanid":arr_FAN[j][1],
								"tunnel":arr_FAN[j][2],
								"updown":arr_FAN[j][6],
								"groupid":arr_FAN[j][12],
								"state":arr_FAN[j][19],
							}						
						}
						
						if(parseInt(arr_FAN[j][1])!=parseInt(fanid)){
							tunnel=arr_FAN[j][2];
							updown=arr_FAN[j][6];
						}
						
						arr_samefan.push(arr_fanone);	
					}

					
					for(var j=0;j<arr_samefan.length;j++){

						if(parseInt(arr_samefan[j].fanid)!=parseInt(fanid)){
							if(parseInt(arr_samefan[j].state)>0){
								stateflag=arr_samefan[j].state;//记录方向
							}
						}
					}
					
					//大于0时有方向，等于0时为停止
					if(parseInt(stateflag)>0){
						setTimeout("changestate("+fanid+","+stateflag+")",fantimenum*1000+3000);					
					}else{
						var fsfxnum=-1;
						
						//获取同隧道同上下行的fsfx(第一个)
						for(var j=0;j<arr_FSFX.length;j++){
							if(arr_FSFX[j][2]==tunnel&&arr_FSFX[j][6]==updown){
								fsfxnum=arr_FSFX[j][19];
								break;
							}
						}
						

						
						//没有FSFX时
						if(fsfxnum<0){
							stateflag=2;
						}else{
							if(fsfxnum==1){
								stateflag=2;
							}else{
								stateflag=1;
							}
						}
						
						setTimeout("changestate("+fanid+","+stateflag+")",fantimenum*1000+3000);
					}	
					break;
			}

		}
		if(i==fannum-1){
			//console.log("ledok");
			//console.log(arr_LED);
			
		}
	}
	
	//群控door
	for(var i=0;i<doornum;i++){
		var doorstate=$(".table_select_group_door").eq(i).find("option:selected").attr("avalue");
		if(parseInt(doorstate)>=0){
			var doorid=$(".table_select_group_door").eq(i).attr("thisid");
			
			var nowstate=$(".table_select_group_door").eq(i).attr("thisstate");
			//不是当前状态才执行
			if(parseInt(doorstate)!=parseInt(nowstate)){
				changestate(doorid,doorstate);		
			}
		}
		
		if(i==doornum-1){
			//console.log("doorok");
			//console.log(arr_LED);
			
		}
	}
	
	//群控fb
	for(var i=0;i<fbnum;i++){
		var fbstate=$(".table_select_group_fb").eq(i).find("option:selected").attr("avalue");
		if(parseInt(fbstate)>=0){
			var fbid=$(".table_select_group_fb").eq(i).attr("thisid");
			
			var nowstate=$(".table_select_group_fb").eq(i).attr("thisstate");
			//不是当前状态才执行
			if(parseInt(fbstate)!=parseInt(nowstate)){
				changestate(fbid,fbstate);
			}
		}
		
		if(i==fbnum-1){
			
		}
	}
	
	//群控ts
	for(var i=0;i<tsnum;i++){
		var tsstate=$(".table_select_group_ts").eq(i).find("option:selected").attr("avalue");
		if(parseInt(tsstate)>=0){
			var tsid=$(".table_select_group_ts").eq(i).attr("thisid");
			var nowstate=$(".table_select_group_ts").eq(i).attr("thisstate");
			//不是当前状态才执行
			if(parseInt(tsstate)!=parseInt(nowstate)){
				changestate(tsid,tsstate);
			}
		}
		
		if(i==tsnum-1){
			
		}
	}
	
	//群控ls
	for(var i=0;i<lsnum;i++){
		var lsstate=$(".table_select_group_ls").eq(i).find("option:selected").attr("avalue");
		if(parseInt(lsstate)>=0){
			var lsid=$(".table_select_group_ls").eq(i).attr("thisid");
			
			var nowstate=$(".table_select_group_ls").eq(i).attr("thisstate");
			//不是当前状态才执行
			if(parseInt(lsstate)!=parseInt(nowstate)){
				changestate(lsid,lsstate);			
			}
		}
		
		if(i==lsnum-1){
			
		}
	}
	
	
}
//cms右键 方法
function cmsrightajax(id,state,act) {
	$.ajax({
		url:"bcd/php/setcms.php?id="+id+"&actnum="+state+"&actname="+act+"",
		dataType:"json",
		type:"get",
		success:function (res) {
			console.log(res);
        }
	})
}

//右键设置状态
function rightMenuAjax(classname,id,state,act){
	var rightflag=false;//控制模式标识
	switch(classname){
		case "CMS":
            rightflag=true;
            cmsrightajax(id,state,act);
            return false;
            break;
		case "TS":
			rightflag=true;
			break;
		case "LED":
			if($("#control_LED_select").val()!=0){
				sendScreenMSG(msg_control_led);
			}else{
				rightflag=true;
			}
			break;
		case "FAN":
			if($("#control_FAN_select").val()!=0){
				sendScreenMSG(msg_control_fan);
			}else{
				rightflag=true;
			}
			break;
		case "LS":
			rightflag=true;
			break;
		case "DOOR":
			rightflag=true;
			break;
		case "DOOREx":
			rightflag=true;
			break;
	}
	if(rightflag==true){
		var controlflag=false;//PLC runmode标识
		var plcid=-1;
		var runmode=0;
		//获取数组序号
		tno=$("#"+ id +"").attr("arrnum");
		switch(classname){
			case "TS":
				plcid=arr_TS[tno][25];
				break;
			case "LED":
				plcid=arr_LED[tno][25];
				break;
			case "FAN":
				plcid=arr_FAN[tno][25];
				break;
			case "LS":
				plcid=arr_LS[tno][25];
				break;
			case "DOOR":
				plcid=arr_DOOR[tno][25];
				break;
			case "DOOREx":
				plcid=arr_DOOREx[tno][25];
				break;
		}
		//取得设备控制模式
		for(var i=0;i<arr_PLC.length;i++){
			if(arr_PLC[i][1]==plcid){
				runmode=arr_PLC[i][7];
				break;
			}
		}
		if(runmode==0){
			sendThisScreenMSG(msg_control_plc);
		}else{
			//如果是风机
			if(classname=="FAN"){
				fango=arr_FAN[tno][19];//本机正反转
				switch(act){
					case "FAN_stop":
						controlflag=true;
						break;
					case "FAN_right":
						//本机判断
						if(fango==2){
							sendThisScreenMSG(msg_control_fannow1);
							break;
						}
						//同组判断
						this_groupid=arr_FAN[tno][12];
						var same_id=-1;
						for(var j=0;j<arr_FAN.length;j++){
							if(this_groupid==arr_FAN[j][12] && j!=tno){
								same_id=j;
								break;
							}	
						}
						if(same_id!=-1){
							same_i1=arr_FAN[same_id][19];
							if(same_i1==2){				
								sendThisScreenMSG(msg_control_fannow2);
							}else{
								controlflag=true;
							}
						}else{
							controlflag=true;	
						}
						break;
					case "FAN_left":						
						//本机判断
						if(fango==1){
							sendThisScreenMSG(msg_control_fannow3);
							break;
						}
						//同组判断
						this_groupid=arr_FAN[tno][12];
						var same_id=-1;
						for(var j=0;j<arr_FAN.length;j++){
							if(this_groupid==arr_FAN[j][12] && j!=tno){
								same_id=j;
								break;
							}	
						}
						if(same_id!=-1){
							same_i1=arr_FAN[same_id][19];
							if(same_i1==1){				
								sendThisScreenMSG(msg_control_fannow4);
							}else{
								controlflag=true;
							}
						}else{
							controlflag=true;
						}
						break;
				}
			}else{
				controlflag=true;
			}		
		}
		if(controlflag==true){
			nowflag=false;//当前状态标识
			fango=-1;
			switch(classname){
				case "FAN":
					fango=arr_FAN[tno][19];
					break;
				case "TS":
					fango=arr_TS[tno][19];
					break;
				case "LS":
					fango=arr_LS[tno][19];
					break;
				case "LED":
					fango=arr_LED[tno][19];
					break;
				case "DOOR":
					fango=arr_DOOR[tno][19];
					break;
				case "DOOREx":
					fango=arr_DOOREx[tno][19];
					break;
			}
			if(fango!=state){
				nowflag=true;
			}else{
				sendThisScreenMSG(msg_control_this);
			}
			if(nowflag==true){
				var changetype;
				var cname;
				var tip;
				switch(classname){
					case "TS":
						changetype="信息灯控制";
						cname=arr_TS[tno][13];
						switch(act){
							case "TS_red":
								tip="双向禁止";
								break;
							case "TS_yellow":
								tip="正向通行";
								break;
                            case "TS_green":
                                tip="正向慢性";
                                break;
							case "TS_green3":
								tip="正向左转";
								break;
                            case "TS_green4":
                                tip="反向通行";
                                break;
                            case "TS_green5":
                                tip="反向慢性";
                                break;
                            case "TS_green6":
                                tip="反向右转";
                                break;
							case "TS_turnleft":
								tip="调整左转";
								break;
						}
						break;
					case "LED":
						changetype="照明控制";
						cname=arr_LED[tno][13];
						switch(act){
							case "LED_close":
								tip="关灯";
								break;
							case "LED_open":
								tip="开灯";
								break;
						}
						break;
					case "FAN":
						changetype="风机控制";
						cname=arr_FAN[tno][13];
						switch(act){
							case "FAN_stop":
								tip="停止";
								break;
							case "FAN_right":
								tip="正转";
								break;
							case "FAN_left":
								tip="反转";
								break;
						}
						break;
					case "DOOR":
						changetype="防火门控制";
						cname=arr_DOOR[tno][13];
						switch(act){
							case "DOOR_up":
								tip="上升";
								break;
							case "DOOR_down":
								tip="下降";
								break;
						}
						break;
					case "DOOREx":
						changetype="卷帘门控制";
						cname=arr_DOOREx[tno][13];
						switch(act){
							case "DOOREx_up":
								tip="上升";
								break;
							case "DOOREx_default":
								tip="停止";
								break;
							case "DOOREx_down":
								tip="下降";
								break;
						}
						break;
					case "LS":
						changetype="信息灯控制";
						cname=arr_LS[tno][13];
						switch(act){
							case "LS_stop":
								tip="禁止";
								break;
							case "LS_go":
								tip="通行";
								break;
							case "LS_twoway":
								tip="双向禁行";
								break;
							case "LS_right":
								tip="正向通行";
								break;
							case "LS_left":
								tip="反向通行";
								break;
							case "LS_turnleft":
								tip="正向左转";
								break;
                            case "LS_turnleft1":
                                tip="反向右转";
                                break;
						}
						break;
				}
				cname=encodeURIComponent(cname);//转码，防止设备名出现特殊字符导致出现提交问题
				tip=encodeURIComponent(tip);
				$.ajax({
						type: "GET",
						url : "bcd/php/setvalue.php?itype=1&id="+ id +"&state="+ state +"&changetype="+ changetype +"&cname="+ cname +"&tip="+ tip +"&dc=" + new Date().getTime() + "",
						//data:{},
						dataType: "json",
						success: function(mydata){
							sendThisScreenMSG(mydata.msg);
						}
				})
			}
		}
	}
}

function updatePic(){
	for(i=0;i<$(".default-checkbox").length;i++){
		if ($(".default-checkbox:eq("+ i +")").is(":checked")) {
			var typevalue=$(".default-checkbox:eq("+ i +")").attr("typename");
			var picclass=returnPicclass(typevalue);
			var selectvalue=$("#default_place_select").val();
			defaultAjax(typevalue,selectvalue,picclass,1);
		}
	}
}

//日期格式化
function returnDate(type){
	backDate="";
	thisDate=new Date();
	yearstr=thisDate.getFullYear();
	monthstr=thisDate.getMonth()+1;
	datestr=thisDate.getDate();
	//补0
	if(datestr<10){
		datestr="0"+datestr;
	}
	if(monthstr<10){
		monthstr="0"+monthstr;
	}
	switch(type){
		case 1:
			backDate=yearstr+"-"+ monthstr +"-"+datestr;
			break;
		case 2:
			backDate=yearstr+"-"+ monthstr;
			break;
		case 3:
			backDate=yearstr;
	}
	return backDate;
}

//时间格式化
function returnFormatTime(timestr){
	backTime="";
	thisTime=new Date(timestr);
	hourstr=thisTime.getHours();
	minutesstr=thisTime.getMinutes();
	//补0
	if(minutesstr<10){
		minutesstr="0"+minutesstr;
	}
	backTime=hourstr+":"+minutesstr;
	return backTime;
}

//日期比较
//比较日前大小  
function compareDate(checkStartDate, checkEndDate) {  
	var backstr=0;
	var arys1= new Array();      
	var arys2= new Array();    
	
	if(checkStartDate != null && checkEndDate != null) {      
		arys1=checkStartDate.split('/'); 
		var sdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);      
		arys2=checkEndDate.split('/');      
		var edate=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2]);    
		
		if(sdate.getTime() > edate.getTime()) {      
			backstr=0;
		} else {   
			backstr=1;
		}   
	}   
	
	return backstr;
}  

function dafaultpageCommand(){
	var backstr=0;
	
	var thatDa1="2018";
	var thatDa2="1"
	var thatDa3="1"
	var thatDa=thatDa1+"/"+thatDa2+"/"+thatDa3;							
	var thisDa = new Date();
	
	backstr=compareDate(thisDa.toLocaleDateString(),thatDa);
	
	return backstr;
}

//plc状况
function showPlc(){
	$(".plc-list-show").remove();
	for (var snum=0;snum<arr_PLC.length;snum++){
		var arrnum=arr_PLC[snum][0];
		var sdid=arr_PLC[snum][2];
		//状况
		var id=arr_PLC[snum][1];
		var name=arr_PLC[snum][3];
		var statego=arr_PLC[snum][4];
		var stategotime=arr_PLC[snum][5];
		var state=arr_PLC[snum][2];
		var runmode=arr_PLC[snum][7];
		var plcpicurl;
		if(state==0){
			plcpicurl="../pic2/plc0.gif";
		}else{
			plcpicurl="../pic2/plc1.gif";
		}
		//判断有无PLC
		var plcmodule="<div class=\"plc-list-show\" id=\"plc_id_"+ id +"\">";
		plcmodule=plcmodule + ""+ name +"";
		plcmodule=plcmodule + "<span><img src=\""+ plcpicurl +"\" style='width:90px;height:40px ' /></span>";
		plcmodule=plcmodule + "</div>";
		$("#plc_show").append(plcmodule);
	}
}

//20秒更新plc状况
function updatePlc(){
	var plcflag=false;
	for (var snum=0;snum<arr_PLC.length;snum++){
		var statego=arr_PLC[snum][4];
		if(statego==true){
			plcflag=true;
		}
		//更新状态
		arr_PLC[snum][4]=false;
	}
	if(plcflag==true){
		showPlc();
	}
}

//切换屏
function changeTab(obj,tnum){
    $(".tab_select").addClass("tab_noselect").removeClass("tab_select");
    $(obj).addClass("tab_select").removeClass("tab_noselect");
    //所有的TAB数量，加1为只显示一个
    for(var i=1;i<=$(".tab_noshow").length+1;i++){
        $("#tabinfo"+ i +"").addClass("tab_noshow").removeClass("tab_show");
    }
    $("#tabinfo"+ tnum +"").addClass("tab_show").removeClass("tab_noshow");   
}

//照明加载亮度检测下拉框
function controlLedAjax(){
	$("#controlLED_select option").remove();
	//增加默认项
	var ledoption="<option value=\"-1\" tunnel=\"-1\" selected>"+ msg_select_default +"</option>";
	for(var i=0;i<arr_LIGHT.length;i++){
		ledoption=ledoption+"<option value=\""+ arr_LIGHT[i][0] +"\" tunnel=\""+  arr_LIGHT[i][2] 
			+"\" >"+  arr_LIGHT[i][13] +"</option>";
	}
	$("#controlLED_select").append(ledoption);
	layuiFormUpdate(1);
}

//照明加载控制参数
function controlLedArray(sn){
	//控制方案判断阀值
	//读取数组
	//晴天
	qin_use=arr_ZM1[sn][2][0][1];
	qin_hint=arr_ZM1[sn][2][0][2];
	outvala2=arr_ZM1[sn][2][0][3];
	outvala1=arr_ZM1[sn][2][0][4];
	invala2=arr_ZM1[sn][2][0][5];
	invala1=arr_ZM1[sn][2][0][6];
	//阴天
	yin_use=arr_ZM1[sn][2][1][1];
	yin_hint=arr_ZM1[sn][2][1][2];
	outvalb2=arr_ZM1[sn][2][1][3];
	outvalb1=arr_ZM1[sn][2][1][4];
	invalb2=arr_ZM1[sn][2][1][5];
	invalb1=arr_ZM1[sn][2][1][6];
	//晚上
	wan_use=arr_ZM1[sn][2][2][1];
	wan_hint=arr_ZM1[sn][2][2][2];
	outvalc2=arr_ZM1[sn][2][2][3];
	outvalc1=arr_ZM1[sn][2][2][4];
	invalc2=arr_ZM1[sn][2][2][5];
	invalc1=arr_ZM1[sn][2][2][6];
	//夜间
	ye_use=arr_ZM1[sn][2][3][1];
	ye_hint=arr_ZM1[sn][2][3][2];
	outvald2=arr_ZM1[sn][2][3][3];
	outvald1=arr_ZM1[sn][2][3][4];
	invald2=arr_ZM1[sn][2][3][5];
	invald1=arr_ZM1[sn][2][3][6];
	zmintal=ZMIntel1;
	$("#input_outvala2").val(outvala2);
	$("#input_outvala1").val(outvala1);
	$("#input_invala2").val(invala2);
	$("#input_invala1").val(invala1);
	$("#input_outvalb2").val(outvalb2);
	$("#input_outvalb1").val(outvalb1);
	$("#input_invalb2").val(invalb2);
	$("#input_invalb1").val(invalb1);
	$("#input_outvalc2").val(outvalc2);
	$("#input_outvalc1").val(outvalc1);
	$("#input_invalc2").val(invalc2);
	$("#input_invalc1").val(invalc1);
	$("#input_outvald2").val(outvald2);
	$("#input_outvald1").val(outvald1);
	$("#input_invald2").val(invald2);
	$("#input_invald1").val(invald1);
	$("#input_zmintal").val(zmintal);//分隔时间
	if(qin_use==0){
		$("#qin_use").prop("checked",false);
	}else{
		$("#qin_use").prop("checked",true);
	}
	if(qin_hint==0){
		$("#qin_hint").prop("checked",false);
	}else{
		$("#qin_hint").prop("checked",true);
	}
	if(yin_use==0){
		$("#yin_use").prop("checked",false);
	}else{
		$("#yin_use").prop("checked",true);
	}
	if(yin_hint==0){
		$("#yin_hint").prop("checked",false);
	}else{
		$("#yin_hint").prop("checked",true);
	}
	if(wan_use==0){
		$("#wan_use").prop("checked",false);
	}else{
		$("#wan_use").prop("checked",true);
	}
	if(wan_hint==0){
		$("#wan_hint").prop("checked",false);
	}else{
		$("#wan_hint").prop("checked",true);
	}
	if(ye_use==0){
		$("#ye_use").prop("checked",false);
	}else{
		$("#ye_use").prop("checked",true);
	}
	if(ye_hint==0){
		$("#ye_hint").prop("checked",false);
	}else{
		$("#ye_hint").prop("checked",true);
	}
}

//照明控制参数数组赋值
function controlLedArraySave(sn){
	//控制方案判断阀值
	//晴天
	if ($("#qin_use").is(":checked")) {
		qin_use=1;
	}else{
		qin_use=0;
	}
	if ($("#qin_hint").is(":checked")) {
		qin_hint=1;
	}else{
		qin_hint=0;
	}
	arr_ZM1[sn][2][0][1]=qin_use;
	arr_ZM1[sn][2][0][2]=qin_hint;
	arr_ZM1[sn][2][0][3]=$("#input_outvala2").val();
	arr_ZM1[sn][2][0][4]=$("#input_outvala1").val();
	arr_ZM1[sn][2][0][5]=$("#input_invala2").val();
	arr_ZM1[sn][2][0][6]=$("#input_invala1").val();
	//阴天
	if ($("#yin_use").is(":checked")) {
		yin_use=1;
	}else{
		yin_use=0;
	}
	if ($("#yin_hint").is(":checked")) {
		yin_hint=1;
	}else{
		yin_hint=0;
	}
	arr_ZM1[sn][2][1][1]=yin_use;
	arr_ZM1[sn][2][1][2]=yin_hint;
	arr_ZM1[sn][2][1][3]=$("#input_outvalb2").val();
	arr_ZM1[sn][2][1][4]=$("#input_outvalb1").val();
	arr_ZM1[sn][2][1][5]=$("#input_invalb2").val();
	arr_ZM1[sn][2][1][6]=$("#input_invalb1").val();
	//晚上
	if ($("#wan_use").is(":checked")) {
		wan_use=1;
	}else{
		wan_use=0;
	}
	if ($("#wan_hint").is(":checked")) {
		wan_hint=1;
	}else{
		wan_hint=0;
	}
	arr_ZM1[sn][2][2][1]=wan_use;
	arr_ZM1[sn][2][2][2]=wan_hint;
	arr_ZM1[sn][2][2][3]=$("#input_outvalc2").val();
	arr_ZM1[sn][2][2][4]=$("#input_outvalc1").val();
	arr_ZM1[sn][2][2][5]=$("#input_invalc2").val();
	arr_ZM1[sn][2][2][6]=$("#input_invalc1").val();
	//夜间
	if ($("#ye_use").is(":checked")) {
		ye_use=1;
	}else{
		ye_use=0;
	}
	if ($("#ye_hint").is(":checked")) {
		ye_hint=1;
	}else{
		ye_hint=0;
	}
	arr_ZM1[sn][2][3][1]=ye_use;
	arr_ZM1[sn][2][3][2]=ye_hint;
	arr_ZM1[sn][2][3][3]=$("#input_outvald2").val();
	arr_ZM1[sn][2][3][4]=$("#input_outvald1").val();
	arr_ZM1[sn][2][3][5]=$("#input_invald2").val();
	arr_ZM1[sn][2][3][6]=$("#input_invald1").val();
	ZMIntel1=$("#input_zmintal").val();//分隔时间
}

//照明加载设备关系表动作关联
function loadLedPlan(sn,num){
	if(typeof(arr_ZM1[sn][3][num])!= "undefined"){
		//表格动作关联
		for(var i=0;i<arr_ZM1[sn][3][num].length;i++){
			if(arr_ZM1[sn][3][num][i][1]==0){
				$("#ledrelation_relation_"+ arr_ZM1[sn][3][num][i][0] +"").prop("checked",false);
			}else{
				$("#ledrelation_relation_"+ arr_ZM1[sn][3][num][i][0] +"").prop("checked",true);
			}
			if(arr_ZM1[sn][3][num][i][2]==0){
				$("#ledrelation_action_"+ arr_ZM1[sn][3][num][i][0] +"").prop("checked",false);
			}else{
				$("#ledrelation_action_"+ arr_ZM1[sn][3][num][i][0] +"").prop("checked",true);
			}
		}
		layuiFormUpdate(2);//checkbox
	}
}

//风机加载COVI检测下拉框
function controlFanAjax(){
	$("#controlFAN_select option").remove();
	//增加默认项
	var fanoption="<option value=\"-1\" tunnel=\"-1\" selected>"+ msg_select_default +"</option>";
	for(var i=0;i<arr_COVI.length;i++){
		fanoption=fanoption+"<option value=\""+ arr_COVI[i][0] +"\" tunnel=\""+ arr_COVI[i][2] 
			+"\">"+  arr_COVI[i][13] +"</option>";
	}
	$("#controlFAN_select").append(fanoption);
	layuiFormUpdate(1);
}

//风机加载对应风向下拉框内容
function controlFsfxAjax(tunnel){
	$("#fan_plan_select option").remove();
	//增加默认项
	var fsfxoption="<option value=\"0\" selected>"+ msg_select_default +"</option>";	
	for(var i=0;i<arr_FSFX.length;i++){
		if(arr_FSFX[i][2]==tunnel){
			fsfxoption=fsfxoption+"<option value=\""+ arr_FSFX[i][1] +"\" >"+  arr_FSFX[i][13] +"</option>";
		}
	}
	$("#fan_plan_select").append(fsfxoption);
	layuiFormUpdate(1);
}

//风机加载控制参数
function controlFanArray(sn){
	//控制方案判断阀值
	//读取数组
	var datause=arr_FJ[sn][2];
	//是否启用
	if(datause==0){
		$("input[name=useFan]").prop("checked",false);
	}else{
		$("input[name=useFan]").prop("checked",true);
	}
	var c1hint=arr_FJ[sn][3][0][1];
	var c1cmin=arr_FJ[sn][3][0][2];
	var c1cmax=arr_FJ[sn][3][0][3];
	var c1vmin=arr_FJ[sn][3][0][4];
	var c1vmax=arr_FJ[sn][3][0][5];
	var c2hint=arr_FJ[sn][3][1][1];
	var c2cmin=arr_FJ[sn][3][1][2];
	var c2cmax=arr_FJ[sn][3][1][3];
	var c2vmin=arr_FJ[sn][3][1][4];
	var c2vmax=arr_FJ[sn][3][1][5];
	var c3hint=arr_FJ[sn][3][2][1];
	var c3cmin=arr_FJ[sn][3][2][2];
	var c3cmax=arr_FJ[sn][3][2][3];
	var c3vmin=arr_FJ[sn][3][2][4];
	var c3vmax=arr_FJ[sn][3][2][5];
	var fjintal=FJIntel;
	//是否控制提示
	if(c1hint==0){
		$("input[name=hintFan1]").prop("checked",false);
	}else{
		$("input[name=hintFan1]").prop("checked",true);
	}
	if(c2hint==0){
		$("input[name=hintFan2]").prop("checked",false);
	}else{
		$("input[name=hintFan2]").prop("checked",true);
	}
	if(c3hint==0){
		$("input[name=hintFan3]").prop("checked",false);
	}else{
		$("input[name=hintFan3]").prop("checked",true);
	}
	$("#input_c1cmin").val(c1cmin);
	$("#input_c1cmax").val(c1cmax);
	$("#input_c1vmin").val(c1vmin);
	$("#input_c1vmax").val(c1vmax);
	$("#input_c2cmin").val(c2cmin);
	$("#input_c2cmax").val(c2cmax);
	$("#input_c2vmin").val(c2vmin);
	$("#input_c2vmax").val(c2vmax);
	$("#input_c3cmin").val(c3cmin);
	$("#input_c3cmax").val(c3cmax);
	$("#input_c3vmin").val(c3vmin);
	$("#input_c3vmax").val(c3vmax);
	$("#input_fjintal").val(fjintal);//分隔时间
}

//风机控制参数数组赋值
function controlFanArraySave(sn){
	//控制方案判断阀值
	//是否使用
	if ($("#fan_useFan").is(":checked")) {
		arr_FJ[sn][2]=1;
	}else{
		arr_FJ[sn][2]=0;
	}
	//正常
	if ($("#fan_hintFan1").is(":checked")) {
		arr_FJ[sn][3][0][1]=1;
	}else{
		arr_FJ[sn][3][0][1]=0;
	}
	arr_FJ[sn][3][0][2]=$("#input_c1cmin").val();
	arr_FJ[sn][3][0][3]=$("#input_c1cmax").val();
	arr_FJ[sn][3][0][4]=$("#input_c1vmin").val();
	arr_FJ[sn][3][0][5]=$("#input_c1vmax").val();
	//报警
	if ($("#fan_hintFan2").is(":checked")) {
		arr_FJ[sn][3][1][1]=1;
	}else{
		arr_FJ[sn][3][1][1]=0;
	}
	arr_FJ[sn][3][1][2]=$("#input_c2cmin").val();
	arr_FJ[sn][3][1][3]=$("#input_c2cmax").val();
	arr_FJ[sn][3][1][4]=$("#input_c2vmin").val();
	arr_FJ[sn][3][1][5]=$("#input_c2vmax").val();
	//关闭
	if ($("#fan_hintFan3").is(":checked")) {
		arr_FJ[sn][3][2][1]=1;
	}else{
		arr_FJ[sn][3][2][1]=0;
	}	
	arr_FJ[sn][3][2][2]=$("#input_c3cmin").val();
	arr_FJ[sn][3][2][3]=$("#input_c3cmax").val();
	arr_FJ[sn][3][2][4]=$("#input_c3vmin").val();
	arr_FJ[sn][3][2][5]=$("#input_c3vmax").val();
	FJIntel=$("#input_fjintal").val();//分隔时间
}

//风机加载设备关系表关联
function loadFanPlan(sn){
	if(typeof(arr_FJ[sn][6])!= "undefined"){
		//表格内容关
		for(var i=0;i<arr_FJ[sn][6].length;i++){
			if(arr_FJ[sn][6][i][1]==0){
				$("#fanrelation_relation_"+ arr_FJ[sn][6][i][0] +"").prop("checked",false);
			}else{
				$("#fanrelation_relation_"+ arr_FJ[sn][6][i][0] +"").prop("checked",true);
			}
		}
		layuiFormUpdate(2);//checkbox
	}
}

//表格数组转为JSON
function getdevjson(devtype,tunnel){
	var arr_;
	var rows="";
	if (devtype == "FAN"){
		arr_=arr_FAN;
	}
	if (devtype == "LED"){
		arr_=arr_LED;
	}
	var count = 0;
	for (var i=0;i<arr_.length;i++){
		if (arr_[i][2]==tunnel||tunnel==-1){
			if (count >0 && i <arr_.length){
				rows=rows + ",";
			}
			// 更改 隧道配置
            var   arr_tunnel =  (arr_[i][2] ==1)? "隧道A":(arr_[i][2] == 2 ?"隧道B":"隧道C" );
			count = count +1;
			rows=rows + "{\"id\":\"" + arr_[i][1] + "\",\"ename\":\"" + arr_[i][4] + "\",\"cname\":\"" + arr_[i][13] + "\",\"tunnel\":\"" +  arr_tunnel + "\",\"formatSpace\":\"\",\"actionstr\":\"\",\"relationstr\":\"\"}";
		}
	}
	return "{\"total\": " +count+ ",\"rows\": [" +rows+ "]}";
}

//界面控制-信号灯数组转为JSON
function getCnvertJson(updown,tunnel){
	var rows="";
	var count = 0;
	var arr_ = arr_LS;
	for (var i=0;i<arr_.length;i++){
		if (arr_[i][2]==tunnel && arr_[i][6]==updown)
		{
			if (count >0 && i <arr_.length) rows=rows + ",";
			count = count +1;
			rows=rows + "{\"id\":\"" + arr_[i][1] + "\",\"ename\":\"" + arr_[i][4] + "\",\"operationstr\":\"\",\"shape\":\"" + arr_[i][9] + "\",\"cname\":\"" + arr_[i][13] + "\",\"devtpyename\":\"LS\",\"formatSpace\":\"\"}";
		}
	}
	arr_ = arr_TS;
	for (var i=0;i<arr_.length;i++){
		if (arr_[i][2]==tunnel && arr_[i][6]==updown)
		{
			if (count >0 && i <arr_.length) rows=rows + ",";
			count = count +1;
			rows=rows + "{\"id\":\"" + arr_[i][1] + "\",\"ename\":\"" + arr_[i][4] + "\",\"operationstr\":\"\",\"shape\":\"" + arr_[i][9] + "\",\"cname\":\"" + arr_[i][13] + "\",\"devtpyename\":\"TS\",\"formatSpace\":\"\"}";
		}
	}
	return "{\"total\": " +count+ ",\"rows\": [" +rows+ "]}";
}

//火灾应急方案JSON
function getFirePlanJson(){
	var rows="";
	
	if(arr_LED.length!=0){
		rows+="{\"name\":\"照明\",\"arrindex\":0,\"operationstr\":\"\",\"formatSpace\":\"\"}";
		rows+=",";
	}
	if(arr_FAN.length!=0){
		rows+="{\"name\":\"风机\",\"arrindex\":1,\"operationstr\":\"\",\"formatSpace\":\"\"}";
		rows+=",";
	}
	if(arr_DOOR.length!=0){
		rows+="{\"name\":\"防火门\",\"arrindex\":2,\"operationstr\":\"\",\"formatSpace\":\"\"}";
		rows+=",";
	}
	if(arr_FB.length!=0){
		rows+="{\"name\":\"手报\",\"arrindex\":3,\"operationstr\":\"\",\"formatSpace\":\"\"}";
		rows+=",";
	}
	if(arr_TS.length!=0){
		rows+="{\"name\":\"交通信号灯\",\"arrindex\":4,\"operationstr\":\"\",\"formatSpace\":\"\"}";
		rows+=",";
	}
	if(arr_LS.length!=0){
		rows+="{\"name\":\"车道指示器\",\"arrindex\":5,\"operationstr\":\"\",\"formatSpace\":\"\"}";
		if(arr_GSCMS.length!=0){
			//情报板注意录入上下行
			rows+=",";
			rows+="{\"name\":\"情报板\",\"arrindex\":6,\"operationstr\":\"\",\"formatSpace\":\"\"}";
		}
	}
	
	return "{\"total\": 7,\"rows\": [" +rows+ "]}";
}

//火灾应急方案-情板报参数JSON
function getCmsFontJson(){
	var arrnum=0;
	var rows="";
	var count = 0;
	var arr_split="";
	
	//避免空的错误
	if(ary_cmstext!=""){
		arrnum=1;
		var arr_ = ary_cmstext.split("*");
		var arr_1= ary_cmsstyle.split("*");
	}
	
	if(arrnum==1){
		for (var i=0;i<arr_.length;i++){
			if (count >0 && i <arr_.length) rows=rows + ",";
			count = count +1;
			arr_split= arr_1[i].split(",");
			//if(count<15&&count>11) alert(tranWrap(arr_[i][2]))
			rows=rows+"{\"cmsfontdel\":\"\",\"cmsfontgo\":" + arr_split[0] + ",\"cmsfontspeed\":" + arr_split[1] + ",\"cmsfontstay\":" + arr_split[2] + ",\"cmsfontsize\":" + arr_split[3] + ",\"cmsfontfamily\":" + arr_split[4] + ",\"cmsfontcolor\":" + arr_split[5] + ",\"cmsfontleft\":" + arr_split[7] + ",\"cmsfontright\":" + arr_split[8] + ",\"cmsfontcontent\":\"" + ReplaceSeperator(arr_[i]) + "\"}";
		}
	}
	
	return "{\"total\": "+ count +",\"rows\": [" +rows+ "]}";
}

//火灾应急方案-情板报-预留信息-列表JSON
function getReserveInfoJson(){
	var rows="";
	var count = 0;
	var arr_ = arr_CMSTEXT;
	
	for (var i=0;i<arr_.length;i++){
		if (count >0 && i <arr_.length) rows=rows + ",";
		count = count +1;
		//if(count<15&&count>11) alert(tranWrap(arr_[i][2]))
		rows=rows+"{\"id\":" + arr_[i][1] + ",\"reservedelbutton\":\"\",\"reservecontent\":\"" + ReplaceSeperator(arr_[i][2]) + "\"}";
	}
	
	return "{\"total\": " +count+ ",\"rows\": [" +rows+ "]}";
}

//火灾应急方案-电视墙-设备JSON
function getMonitorWallJson(index){
	var infostr="";
	var rows="";
	var count = 0;
	
	var arr_ = arr_FB;

	switch(parseInt(index)){
		case 0:
			arr_ = arr_FB;
			break;
		case 1:
			arr_ = arr_FGS;
			break;
		case 2:
			arr_ = arr_FGW;
			break;
		default:
			arr_ = arr_FB;
			break;			
	}
	
	var camid="";
	var camip="";
	var camdevname="";
	
	for (var i=0;i<arr_.length;i++){
		camid=arr_[i][27];
		
		if (count >0 && i <arr_.length) rows=rows + ",";
		count = count +1;
				
		//获取摄像机IP
		for(var x=0;x<arr_CAM.length;x++){
			if(camid==arr_CAM[x][1]){
				camdevname=arr_CAM[x][4];
				camip=arr_CAM[x][7];
				//console.log("c123231312");
			}
		}
		
		rows=rows+"{\"id\":" + arr_[i][1] + ",\"mwname\":\""+ arr_[i][13] +"\",\"mwaddr\":\""+ arr_[i][5] +"\",\"mwstate\":\""+ parseInt(arr_[i][28]) +"\",\"mwi1\":\""+ parseInt(arr_[i][19]) +"\",\"mwcamdevname\":\""+ camdevname +"\",\"mwcamno\":\""+ camid +"\",\"mwcamip\":\""+ camip +"\",\"mwOperation\":\"\"}";
	}
	
	return "{\"total\": " +count+ ",\"rows\": [" +rows+ "]}";
}

//故障设备列表
function getErrorEquipmentJson(str){

	var rows="";
	var count = 0;
	var devtype="";
	if(str!="all")devtype=returnDevTypeName(str);
	
	for (var i=0;i<arr_Error.length;i++){
		//不是全部和不是所属类别跳下一步
		if(str!="all"&&arr_Error[i][4]!=devtype) continue;
		var   arr_tunnel =  (arr_Error[i][3] ==1)? "隧道A":(arr_Error[i][3] == 2 ?"隧道B":"隧道C" );     //更改隧道名字
		if (count >0) rows=rows + ",";
		count = count +1;
		rows=rows+"{\"id\":" + arr_Error[i][0] + ",\"errorequipmentname\":\""+ arr_Error[i][1] +"\",\"errorequipmentaddr\":\""+ arr_Error[i][2] +"\",\"equipmenttunnel\":\""+ arr_tunnel +"\",\"errorequipmenttype\":\""+ arr_Error[i][4] +"\"}";
		
	}
	
	//console.log(arr_Error)
	
	return "{\"total\": " +count+ ",\"rows\": [" +rows+ "]}";
}

//群控设备列表
function getControlGroupJson(str){
	var rows="";
	var count = 0;
	var devtype="";
	var arr_ = "";
	
	switch(str){
		case "LED":
			arr_ = arr_LED;
			break;
		case "FAN":
			arr_ = arr_FAN;
			break;
		case "DOOR":
			arr_ = arr_DOOR;
			break;
		case "FB":
			arr_ = arr_FB;
			break;
		case "TS":
			arr_ = arr_TS;
			break;
		case "LS":
			arr_ = arr_LS;
			break;
		default:
			arr_ = arr_LED;
			break;			
	}	

	var tunnel=$("#default_place_select").find("option:selected").val();
	var updown=$("#select_group_updown").find("option:selected").val();

	for (var i=0;i<arr_.length;i++){
		//console.log(tunnel);
		if(parseInt(tunnel)==parseInt(arr_[i][2])){
			if(parseInt(updown)>=0){
				if(parseInt(updown)==parseInt(arr_[i][6])){
					if (count >0) rows=rows + ",";
					count = count +1;
					rows=rows+"{\"id\":" + arr_[i][1] + ",\"equipmentname\":\""+ arr_[i][13] +"\",\"groupid\":\"" + arr_[i][12] + "\",\"equipmentaddr\":\""+ arr_[i][5] +"\",\"equipmentstate\":\""+ arr_[i][28] +"\",\"equipmenttunnel\":\""+ arr_[i][2] +"\",\"equipmentupdown\":\""+ arr_[i][6] +"\",\"equipmenttype\":\""+ str +"\",\"operationstr\":\"\"}";
				}
			}else{
				if (count >0) rows=rows + ",";
				count = count +1;

				  var   arr_tunnel =  (arr_[i][2] ==1)? "隧道A":(arr_[i][2] == 2 ?"隧道B":"隧道C" );     //更改隧道名字
 				rows=rows+"{\"id\":" + arr_[i][1] + ",\"equipmentname\":\""+ arr_[i][13] +"\",\"groupid\":\"" + arr_[i][12] + "\",\"equipmentaddr\":\""+ arr_[i][5] +"\",\"equipmentstate\":\""+ arr_[i][28] +"\",\"equipmenttunnel\":\""+ arr_tunnel +"\",\"shape\":\""+ arr_[i][9] +"\",\"equipmentupdown\":\""+ arr_[i][6] +"\",\"equipmenttype\":\""+ str +"\",\"operationstr\":\"\"}";
			}
		}
		
		//,\"tunnel\":" + arr_[i][2] + ",\"updown\":" + arr_[i][6] + ",
	}



	return "{\"total\": " +count+ ",\"rows\": [" +rows+ "]}";
}


//删除数组下标的内容
function delArray(arr,index){
　	for(var i=0; i<arr.length; i++) {
		if(i == index) {
			arr.splice(i, 1);
			break;
		}
	}
	
	return arr;
}

//火灾时自动执行
function autoFireExecute(){
	//[手报,烟感,温感,ID,是否已切]
	var screenplan=parseInt($("#config_pingjie_screenselect").val());//用户设置默认显示方式
	var screennum=parseInt($("#config_pingjie_screencount").val());//大屏数量
	var screenarray=$("#config_pingjie_svalue").val();
	screenarray=screenarray.split(",");
	
	for(var i=0;i<arr_FB.length;i++){//手报
		//火灾时
		if(arr_FB[i][19]==1){
			if(arry_fireid!=""){
				//判断设备数组是否有重复ID
				var fireindex=0;
				for(var j=0;j<arry_fireid.length;j++){
					if(arry_fireid[j][3]==arr_FB[i][27]){
						if(arry_fireid[j][0]==0){
							arry_fireid[j][0]=1;
						}
						
						fireindex=1;
					}
				}
				
				//如果数组里没有，新增
				if(fireindex==0){				
					arry_fireid.push([1,0,0,arr_FB[i][27],0]);
				}
			}else{
				//数组为空，新增
				arry_fireid.push([1,0,0,arr_FB[i][27],0]);
			}			
		}else{
		//火灾没有时
			for(var j=0;j<arry_fireid.length;j++){
				if(arry_fireid[j][3]==arr_FB[i][27]){
					if(arry_fireid[j][0]==1){
						arry_fireid[j][0]=0;
					}
				}
			}
		}
	}
	
	for(var i=0;i<arr_FGS.length;i++){//烟感
		//火灾时
		if(arr_FGS[i][19]==1){
			if(arry_fireid!=""){
				//判断设备数组是否有重复ID
				var fireindex=0;
				for(var j=0;j<arry_fireid.length;j++){
					if(arry_fireid[j][3]==arr_FGS[i][27]){
						if(arry_fireid[j][1]==0){
							arry_fireid[j][1]=1;
						}
						
						fireindex=1;
					}
				}
				
				//如果数组里没有，新增
				if(fireindex==0){					
					arry_fireid.push([0,1,0,arr_FGS[i][27],0]);
				}
			}else{
				//数组为空，新增
				arry_fireid.push([0,1,0,arr_FGS[i][27],0]);
			}			
		}else{
		//火灾没有时
			for(var j=0;j<arry_fireid.length;j++){
				if(arry_fireid[j][3]==arr_FGS[i][27]){
					if(arry_fireid[j][1]==1){
						arry_fireid[j][1]=0;
					}
				}
			}
		}
	}
	
	for(var i=0;i<arr_FGW.length;i++){//温感
		//火灾时
		if(arr_FGW[i][19]==1){
			if(arry_fireid!=""){
				//判断设备数组是否有重复ID
				var fireindex=0;
				for(var j=0;j<arry_fireid.length;j++){
					if(arry_fireid[j][3]==arr_FGW[i][27]){
						if(arry_fireid[j][2]==0){
							arry_fireid[j][2]=1;
						}
						
						fireindex=1;
					}
				}
				
				//如果数组里没有，新增
				if(fireindex==0){					
					arry_fireid.push([0,0,1,arr_FGW[i][27],0]);
				}
			}else{
				//数组为空，新增
				arry_fireid.push([0,0,1,arr_FGW[i][27],0]);
			}			
		}else{
		//火灾没有时
			for(var j=0;j<arry_fireid.length;j++){
				if(arry_fireid[j][3]==arr_FGW[i][27]){
					if(arry_fireid[j][2]==1){
						arry_fireid[j][2]=0;
					}
				}
			}
		}
	}
	
	//当火灾全没时，删除数组
	for(var i=0;i<arry_fireid.length;i++){
		if(arry_fireid[i][0]==0&&arry_fireid[i][1]==0&&arry_fireid[i][2]==0){
			delArray(arry_fireid,i);
		}
	}
	
	//console.log(arry_fireid);
	
	//当有火灾时自动执行
	if(arry_fireid!=""){
		for(var i=0;i<arry_fireid.length;i++){
			if(arry_fireid[i][3]!=""){
				//未切屏的切上
				if(parseInt(arry_fireid[i][4])==0){
					var iscam=0; //是否存在摄像机
					var devicename="";
					var camip="";
					var camchannel="";
					
					for(var j=0;j<arr_CAM.length;j++){
						if(parseInt(arry_fireid[i][3])==parseInt(arr_CAM[j][1])){
							devicename=arr_CAM[j][4];
							camip=arr_CAM[j][7];
							camchannel=arr_CAM[j][26];
							
							iscam=1;
						}
					}
					
					if(iscam==1){
						if(screenplan==4){
							bigScreenAddDevicesAuto(devicename,camip,camchannel,screenarray[bs_screenno]);
								
							bs_screenno++;
							if(bs_screenno==screennum){
								bs_screenno=0;
							}
						}else{
							bigScreenAddDevicesAutoOne(devicename,camip,camchannel,screenarray[0]);
						}
						
						arry_fireid[i][4]=1;//切上之后状态为1
					}
				}
			}
		}
	}
}