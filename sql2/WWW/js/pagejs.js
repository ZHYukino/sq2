﻿W = parseInt($(window).width());
H = parseInt($(window).height());
Ht= parseInt($("#default_top_panel").height());
Wt= parseInt($("#default_panel_left").width());

checkbrowser();


function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}

function checkbrowser(){
	// var browser=navigator.appName
	// if(browser=="Microsoft Internet Explorer"){
	// 	var b_version=navigator.appVersion
	// 	var version=b_version.split(";");
	// 	var trim_Version=version[1].replace(/[ ]/g,"");
	// 	if(trim_Version=="MSIE6.0")
	// 	{
	// 		window.location.href="/ie8.html";
	// 	}
	// 	else if(trim_Version=="MSIE7.0")
	// 	{
	// 		window.location.href="ie8.html";
	// 	}
	// 	else if(trim_Version=="MSIE8.0")
	// 	{
	// 		window.location.href="ie8.html";
	// 	}
	// }
    var ie = IEVersion();
    if(ie != -1){
        window.location.href="ie8.html";
	}
}

$(document).ready(function () {
	//var defaultpage=dafaultpageCommand();//验证
	var defaultpage=1;
	var updatetime=20000;
	var winktime=1000;
	
	if(defaultpage==1){
		//禁止右键
		$(document).bind("contextmenu",function(e){
			return false;
		});
		
		dress();
		
		//预加载
		var loadAction=setInterval(function(){
			estimatesInit();//判断设备
											
			if(loadflag!=0){
				clearInterval(loadAction);
				
				if(percentnum>=100){
					//如果加载的数据为空
					//有设备的显示左栏菜单，无设备不显示菜单
					if(arr_COVI.length>0){
						 $("#li_leftmenu_covi").removeClass("dn");
					}
					if(arr_FSFX.length>0){
						$("#li_leftmenu_fsfx").removeClass("dn");
					}
					if(arr_LIGHT.length>0){
						$("#li_leftmenu_gq").removeClass("dn");
					}

					var loadShowAction=setTimeout(function(){
						clearTimeout(loadShowAction);								
						
						//加载的菜单
						$("#loadback_panel").fadeTo("fast",0.5,function(){
							$("#loadback_panel").css("display","none");
						});
						
						$("#content_panel").fadeIn(function(){
							$("#content_panel").css("display","block");
						});
						
						//桌面右键菜单
						bindRightKey("default_panel_img","default-panel-img","");

						
						
					},500)
				}		
				
			}
		},winktime)
	
		//每20秒更新
		setInterval(function(){
			getDevState();//20秒更新设备状态
			getDevValue();//20秒更新设备值
			getPLCState();//20秒更新PLC状态
			
			if(arr_CAM!=""){
				autoFireExecute();//火灾执行
			}
		},updatetime);
	
		//每20秒更新
		setInterval(function(){
			updatePic();
		},updatetime);
	
		//每20秒更新PLC状况
		setInterval(function(){
			updatePlc();
		},updatetime);
	
		setInterval(function(){
			layuiFormUpdate(2);

		},winktime);

		
		
	}
})

//预加载
function loadInAction(percentnum){
	element.progress('loadvalue', percentnum+'%');
}

$(window).resize(function () {
	clearLoadPic();	//清除图片
	dress();
});

function dress(){
	W = parseInt($(window).width());
	H = parseInt($(window).height());
	
	Ht= parseInt($("#default_top_panel").height());
	Wt=parseInt($("#default_panel_left").width());

	//版面
	$("#default_panel_left").css("top",Ht+"px");
	$("#default_panel_left").css("height",H-Ht);

	$("#default_panel_right").css("top",Ht+"px");
	$("#default_panel_right").css("width",W-Wt);
	$("#default_panel_right").css("height",H-Ht);

	$("#default_panel_img").css("width",W-Wt);
    $("#default_panel_img").css("height",H-Ht);
	$("#default_control_panel").css("width",W-20);
	
	
	//加载设备类型数组
	loadCheckboxArray();
	//加载layui
	layuiload();
	////加载checkbox中的图标
	loadCheckbox();
	
}

function loadCheckboxArray(){
	var tempstr="<div class=\"layui-form\">";
	tempstr+="<p></p>";
	for(var i=1;i<10;i++){
			tempstr += "<div class=\"fl checkbox-list-div\">";
			tempstr += "<input id=\"default_checkbox_" + arr_TYPE[i][2] + "\" type=\"checkbox\" lay-filter=\"default-checkbox\" class=\"default-checkbox regular-checkbox\" typename=\"" + arr_TYPE[i][2] + "\" title=\"" + arr_TYPE[i][1] + "\">";
			tempstr += "</div>";

	}
	tempstr+="<br><br><br><br><br><br><br><p></p>";
	for(var i=10;i<arr_TYPE.length;i++){
		tempstr += "<div class=\"fl checkbox-list-div\">";
		tempstr += "<input id=\"default_checkbox_" + arr_TYPE[i][2] + "\" type=\"checkbox\" lay-filter=\"default-checkbox\" class=\"default-checkbox regular-checkbox\" typename=\"" + arr_TYPE[i][2] + "\" title=\"" + arr_TYPE[i][1] + "\">";
		tempstr += "</div>";
	}
	tempstr+="</div>";
	
	$("#checkbox_list").html(tempstr);
}


function clearLoadInit(){
	for(var i=0;i<$(".picselectclass").length;i++){
		thisid=$(".picselectclass:eq("+ i +")").attr("id");
		$("#"+ id +"").off("click");
		$("#"+ id +"").off("dblclick");
		$("#"+ id +"").unbind("draggable");
		$("#"+ id +"").unbind("contextMenu");
	}
}

function clearLoadPic(){
	$("#default_cover").remove();
	$("#default_panel_content").before("<div id=\"default_cover\"></div>");
}

$("#default_menu_control").on("mouseover",function() {
	$('#control_panel_list').show();
})

$("#default_menu_panel").on("mouseleave",function() {
	$('#control_panel_list').hide();
})

//按钮 start

//COVI检测历史记录
$(document).on("click", "#control_covi_search", function() { 
	var tempstr="";
	var tempcovistr="";
	var itype=$("input[name='recordCoviType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_covi_begindate").val() +"&date2="+ $("#input_covi_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_covi_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_covi_yeardate").val() +"";
			break;
	}
	//选择设备
	tempcovistr="&devid="+ $("#record_covi_select").val() +"";
	$("#tb_covi").bootstrapTable('refresh',{'url':'bcd/php/getrptcovi.php?'+tempstr+tempcovistr});
})

//FSFX检测历史记录
$(document).on("click", "#control_fsfx_search", function() { 
	var tempstr="";
	var tempfsfxstr="";	
	var itype=$("input[name='recordFsfxType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_fsfx_begindate").val() +"&date2="+ $("#input_fsfx_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_fsfx_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_fsfx_yeardate").val() +"";
			break;
	}
	//选择设备
	tempfsfxstr="&devid="+ $("#record_fsfx_select").val() +"";
	$("#tb_fsfx").bootstrapTable('refresh',{'url':'bcd/php/getrptfsfx.php?'+tempstr+tempfsfxstr});
})

//LIGHT检测历史记录
$(document).on("click", "#control_light_search", function() {
	var tempstr="";
	var templightstr="";	
	var itype=$("input[name='recordLightType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_light_begindate").val() +"&date2="+ $("#input_light_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_light_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_light_yeardate").val() +"";
			break;
	}
	//选择设备
	templightstr="&devid="+ $("#record_light_select").val() +"";
	$("#tb_light").bootstrapTable('refresh',{'url':'bcd/php/getrptlight.php?'+tempstr+templightstr});
})

//日志查询
$(document).on("click", "#control_log_search", function() { 
	var tempstr="";	
	var itype=$("input[name='logType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_begindate").val() +"&date2="+ $("#input_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_yeardate").val() +"";
			break;
	}
	$("#tb_log").bootstrapTable('refresh',{'url':'bcd/php/getlog.php?'+tempstr});
})

//照明控制模式-控制方案判断阀值保存
$(document).on("click", "#control_LED_plan_save", function() { 
	//当不是请选择时才可保存
	var selectid=$("#controlLED_select").val();
	if(selectid!=-1){
		//照明控制参数数组赋值
		controlLedArraySave(selectid);
		//晴天
		var qin_use=0;
		if ($("#qin_use").is(":checked")) {
			qin_use=1;
		}
		var qin_hint=0;
		if ($("#qin_hint").is(":checked")) {
			qin_hint=1;
		}
		var input_invala2=$("#input_invala2").val();
		var input_invala1=$("#input_invala1").val();		
		var input_outvala2=$("#input_outvala2").val();
		var input_outvala1=$("#input_outvala1").val();	
		//阴天
		var yin_use=0;
		if ($("#yin_use").is(":checked")) {
			yin_use=1;
		}
		var yin_hint=0;
		if ($("#yin_hint").is(":checked")) {
			yin_hint=1;
		}
		var input_invalb2=$("#input_invalb2").val();
		var input_invalb1=$("#input_invalb1").val();
		var input_outvalb2=$("#input_outvalb2").val();
		var input_outvalb1=$("#input_outvalb1").val();
		//晚上
		var wan_use=0;
		if ($("#wan_use").is(":checked")) {
			wan_use=1;
		}
		var wan_hint=0;
		if ($("#wan_hint").is(":checked")) {
			wan_hint=1;
		}
		var input_invalc2=$("#input_invalc2").val();
		var input_invalc1=$("#input_invalc1").val();
		var input_outvalc2=$("#input_outvalc2").val();
		var input_outvalc1=$("#input_outvalc1").val();
		//夜间
		var ye_use=0;
		if ($("#ye_use").is(":checked")) {
			ye_use=1;
		}
		var ye_hint=0;
		if ($("#ye_hint").is(":checked")) {
			ye_hint=1;
		}
		var input_invald2=$("#input_invald2").val();
		var input_invald1=$("#input_invald1").val();
		var input_outvald2=$("#input_outvald2").val();
		var input_outvald1=$("#input_outvald1").val();
		var input_zmintal=$("#input_zmintal").val();
		var  urlstr="";
		urlstr=urlstr+"invala1="+input_invala1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"invala2="+input_invala2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvala1="+input_outvala1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvala2="+input_outvala2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"invalb1="+input_invalb1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"invalb2="+input_invalb2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvalb1="+input_outvalb1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvalb2="+input_outvalb2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"invalc1="+input_invalc1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"invalc2="+input_invalc2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvalc1="+input_outvalc1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvalc2="+input_outvalc2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"invald1="+input_invald1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"invald2="+input_invald2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvald1="+input_outvald1;
		urlstr=urlstr+"&";
		urlstr=urlstr+"outvald2="+input_outvald2;
		urlstr=urlstr+"&";
		urlstr=urlstr+"use1="+qin_use;
		urlstr=urlstr+"&";
		urlstr=urlstr+"hint1="+qin_hint;
		urlstr=urlstr+"&";
		urlstr=urlstr+"use2="+yin_use;
		urlstr=urlstr+"&";
		urlstr=urlstr+"hint2="+yin_hint;
		urlstr=urlstr+"&";
		urlstr=urlstr+"use3="+wan_use;
		urlstr=urlstr+"&";
		urlstr=urlstr+"hint3="+wan_hint;
		urlstr=urlstr+"&";
		urlstr=urlstr+"use4="+ye_use;
		urlstr=urlstr+"&";
		urlstr=urlstr+"hint4="+ye_hint;	
		urlstr=urlstr+"&";
		urlstr=urlstr+"zmintal="+input_zmintal;
		
		$.ajax({
			type: "GET",
			url : "bcd/php/setauto.php?itype=2&name="+ $("#controlLED_select").find("option:selected").text() +"&"+ urlstr +"&dc=" + new Date().getTime() + "",
			//data:{},
			dataType: "json",
			success: function(mydata){	
				if(mydata){
					//环境启动
					if(mydata.result){
						AutoModeRun();
					}
					
					sendThisScreenMSG(mydata.msg);
				}
			}
		})
	}else{
		sendThisScreenMSG(msg_select_led);
	}
})

//照明控制参数-设备关系表保存
$(document).on("click", "#control_LED_relation_save", function() { 
	//表格数组赋值
	var selectid=$("#controlLED_select").val();
	var planid=$("#led_plan_select").val();
	if(selectid!=-1){
		if(planid!=0){
			var arrnum=$("#led_plan_select").find("option:selected").attr("arrnum");
			for(var i=0;i<arr_ZM1[selectid][3][arrnum].length;i++){						
				if ($("#ledrelation_relation_"+ arr_ZM1[selectid][3][arrnum][i][0] +"").is(":checked")) {
					arr_ZM1[selectid][3][arrnum][i][1]=1;
				}else{
					arr_ZM1[selectid][3][arrnum][i][1]=0;
				}
				if ($("#ledrelation_action_"+ arr_ZM1[selectid][3][arrnum][i][0] +"").is(":checked")) {
					arr_ZM1[selectid][3][arrnum][i][2]=1;
				}else{
					arr_ZM1[selectid][3][arrnum][i][2]=0;
				}
			}
			var plan_id=$("#dn_ledrelation_id").html();
			var plan_total=$("#dn_ledrelation_total").html();
			var arr_planid=plan_id.split(',');
			var temp_planid="";
			var temp_isopen="";
			var temp_isselect="";
			for(var i=0;i<arr_planid.length;i++){
				if(temp_planid==""){
					temp_planid="id"+ i +"="+arr_planid[i];
				}else{
					temp_planid=temp_planid+"&id"+ i +"="+arr_planid[i];
				}
			}
			var j=0;
			$("[name='ledrelation_isopen']").each(function(){ 		
				var str="";
				if ($("#"+ $(this).attr("id") +"").is(":checked")) {
					str=1;
				}else{
					str=0;
				}
				if(temp_isopen==""){
					temp_isopen="isopen"+ j +"="+str;//$("#"+ $(this).attr("id") +"")
				}else{
					temp_isopen=temp_isopen+"&isopen"+ j +"="+str;
				}
				j=j+1;
			})
			j=0;
			$("[name='ledrelation_isselect']").each(function(){
				var str="";
				if ($("#"+ $(this).attr("id") +"").is(":checked")) {
					str=1;
				}else{
					str=0;
				}
				if(temp_isselect==""){
					temp_isselect="isselect"+ j +"="+str;//$("#"+ $(this).attr("id") +"")
				}else{
					temp_isselect=temp_isselect+"&isselect"+ j +"="+str;
				}
				j=j+1;
			})
			var sname=$("#controlLED_select").find("option:selected").text();
			var sname2=$("#led_plan_select").find("option:selected").text();
			$.ajax({
				type: "GET",
				url : "bcd/php/setlink.php?itype=2&name="+ sname +"&name2="+ sname2 +"&total="+ plan_total +"&"+ temp_planid +"&"+ temp_isopen +"&"+ temp_isselect +"&dc=" + new Date().getTime() + "",
				//data:{},
				dataType: "json",
				success: function(mydata){
					if(mydata){
						//环境启动
						if(mydata.result){
							AutoModeRun();
							sendThisScreenMSG(mydata.msg);
						}else {
							sendThisScreenMSG(mydata.msg);
                        }

					}
				}
			})
		}else{
			sendThisScreenMSG(msg_select_plan);
		}
	}else{		
		sendThisScreenMSG(msg_select_led);
	}
})

//风机控制模式-控制方案判断阀值保存
$(document).on("click", "#control_FAN_plan_save", function() { 
	//数组赋值
	var selectid=$("#controlFAN_select").val();
	if(selectid!=-1){
		//是否启用
		var use=0;
		if ($("input[name=useFan]").is(":checked")) {
			use=1;
		}
		//是否启用
		var c1hint=0;
		if ($("input[name=hintFan1]").is(":checked")) {
			c1hint=1;
		}
		var c2hint=0;
		if ($("input[name=hintFan2]").is(":checked")) {
			c2hint=1;
		}
		var c3hint=0;
		if ($("input[name=hintFan3]").is(":checked")) {
			c3hint=1;
		}
		//最小值及最大值
		var input_c1cmin=$("#input_c1cmin").val();
		var input_c1cmax=$("#input_c1cmax").val();
		var input_c1vmin=$("#input_c1vmin").val();
		var input_c1vmax=$("#input_c1vmax").val();
		var input_c2cmin=$("#input_c2cmin").val();
		var input_c2cmax=$("#input_c2cmax").val();
		var input_c2vmin=$("#input_c2vmin").val();
		var input_c2vmax=$("#input_c2vmax").val();
		var input_c3cmin=$("#input_c3cmin").val();
		var input_c3cmax=$("#input_c3cmax").val();
		var input_c3vmin=$("#input_c3vmin").val();
		var input_c3vmax=$("#input_c3vmax").val();
		var input_fjintal=$("#input_fjintal").val();
		//数组赋值
		//风机控制参数数组赋值
		controlFanArraySave(selectid);
		var urlstr="";
		urlstr=urlstr+"use="+use;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c1hint="+c1hint;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c2hint="+c2hint;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c3hint="+c3hint;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c1cmin="+input_c1cmin;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c1cmax="+input_c1cmax;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c1vmin="+input_c1vmin;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c1vmax="+input_c1vmax;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c2cmin="+input_c2cmin;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c2cmax="+input_c2cmax;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c2vmin="+input_c2vmin;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c2vmax="+input_c2vmax;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c3cmin="+input_c3cmin;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c3cmax="+input_c3cmax;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c3vmin="+input_c3vmin;
		urlstr=urlstr+"&";
		urlstr=urlstr+"c3vmax="+input_c3vmax;
		urlstr=urlstr+"&";
		urlstr=urlstr+"fjintal="+input_fjintal;
		$.ajax({
			type: "GET",
			url : "bcd/php/setauto.php?itype=1&name="+ $("#controlFAN_select").find("option:selected").text() +"&"+ urlstr +"&dc=" + new Date().getTime() + "",
			//data:{},
			dataType: "json",
			success: function(mydata){	
				if(mydata){
					//环境启动
					if(mydata.result){
						AutoModeRun();
					}
					
					sendThisScreenMSG(mydata.msg);
				}
			}
		})
	}else{
		sendThisScreenMSG(msg_select_covi);
	}
})

//风机控制参数-设备关系表保存
$(document).on("click", "#control_FAN_relation_save", function() { 
	//表格数组赋值
	var selectid=$("#controlFAN_select").val();
	var planid=$("#fan_plan_select").val();
	if(selectid!=-1){
		if(planid!=0){
			arr_FJ[selectid][4]=$("#fan_plan_select").find("option:selected").text();
			arr_FJ[selectid][5]=$("#fan_plan_select").find("option:selected").val();	
			for(var i=0;i<arr_FJ[selectid][6].length;i++){
				if ($("#fanrelation_relation_"+ arr_FJ[selectid][6][i][0] +"").is(":checked")) {
					arr_FJ[selectid][6][i][1]=1;
				}else{
					arr_FJ[selectid][6][i][1]=0;
				}
			}
			var plan_id=$("#dn_fanrelation_id").html();
			var plan_total=$("#dn_fanrelation_total").html();
			var arr_planid=plan_id.split(',');
			var temp_planid="";
			var temp_isselect="";
			for(var i=0;i<arr_planid.length;i++){
				if(temp_planid==""){
					temp_planid="id"+ i +"="+arr_planid[i];
				}else{
					temp_planid=temp_planid+"&id"+ i +"="+arr_planid[i];
				}
			}
			var j=0;	
			$("[name='fanrelation_isselect']").each(function(){ 
				var str="";
				if ($("#"+ $(this).attr("id") +"").is(":checked")) {
					str=1;
				}else{
					str=0;
				}
				if(temp_isselect==""){
					temp_isselect="isselect"+ j +"="+str;//$("#"+ $(this).attr("id") +"")
				}else{
					temp_isselect=temp_isselect+"&isselect"+ j +"="+str;
				}
				j=j+1;
			})
			var sname=$("#controlFAN_select").find("option:selected").text();
			var fxname=$("#fan_plan_select").find("option:selected").text();
			var fxid=$("#fan_plan_select").find("option:selected").val();
			$.ajax({
				type: "GET",
				url : "bcd/php/setlink.php?itype=1&name="+ sname +"&fx="+ fxname +"&fxid="+ fxid +"&total="+ plan_total +"&"+ temp_planid +"&"+ temp_isselect +"&dc=" + new Date().getTime() + "",
				//data:{},
				dataType: "json",
				success: function(mydata){
					if(mydata){
						//环境启动
						if(mydata.result){
							sendThisScreenMSG(mydata.msg);
							AutoModeRun();
						}else {
							sendThisScreenMSG(mydata.msg);
                        }

						sendThisScreenMSG(mydata.msg);
					}
				}
			})
		}else{
			sendThisScreenMSG(msg_select_direction);
		}
	}else{
		sendThisScreenMSG(msg_select_covi);
	}
})

//照明控制参数-时钟控制方案保存
$(document).on("click", "#control_LED_time_save", function() { 
	//验证
	if($("#ledtime_plan_select").val()!=0){
		if($("#input_led_actiontime").val()!=""){
			//------------表格数组赋值
			//获取时间
			var arrnum=$("#ledtime_plan_select").find("option:selected").attr("arrnum");
			//动作时间
			arr_ZM2[arrnum][0]=$("#input_led_actiontime").val();
			//是否启用及提示
			if ($("#ledtime_use").is(":checked")) {
				arr_ZM2[arrnum][1]=1;
			}else{
				arr_ZM2[arrnum][1]=0;
			}
			if ($("#ledtime_hint").is(":checked")) {
				arr_ZM2[arrnum][2]=1;
			}else{
				arr_ZM2[arrnum][2]=0;
			}
			//表格关联
			for(var i=0;i<arr_ZM2[arrnum][3].length;i++){
				if ($("#ledtime_action_"+ arr_ZM2[arrnum][3][i][0] +"").is(":checked")) {
					arr_ZM2[arrnum][3][i][1]=1;
				}else{
					arr_ZM2[arrnum][3][i][1]=0;
				}
			}
			//------------保存数据库
			//时间点名
			var timename=$("#ledtime_plan_select").find("option:selected").text();
			//是否启用及提示
			var ledtime_use=0;
			if ($("#ledtime_use").is(":checked")) {
				ledtime_use=1;
			}
			var ledtime_hint=0;
			if ($("#ledtime_hint").is(":checked")) {
				ledtime_hint=1;
			}
			//动作时间
			var timestr=$("#input_led_actiontime").val();
			//表数据
			var plan_id=$("#dn_ledtime_id").html();
			var plan_total=$("#dn_ledtime_total").html();
			var arr_planid=plan_id.split(',');
			var temp_planid="";
			var temp_isopen="";
			for(var i=0;i<arr_planid.length;i++){
				if(temp_planid==""){
					temp_planid="id"+ i +"="+arr_planid[i];
				}else{
					temp_planid=temp_planid+"&id"+ i +"="+arr_planid[i];
				}
			}
			var j=0;	
			$("[name='ledtime_isopen']").each(function(){ 
				var str="";
				if ($("#"+ $(this).attr("id") +"").is(":checked")) {
					str=1;
				}else{
					str=0;
				}
				if(temp_isopen==""){
					temp_isopen="isopen"+ j +"="+str;//$("#"+ $(this).attr("id") +"")
				}else{
					temp_isopen=temp_isopen+"&isopen"+ j +"="+str;
				}
				j=j+1;
			})
			$.ajax({
				type: "GET",
				url : "bcd/php/setlink.php?itype=3&name="+ timename +"&use="+ ledtime_use +"&hint="+ ledtime_hint +"&time="+ timestr +"&total="+ plan_total +"&"+ temp_planid +"&"+ temp_isopen +"&dc=" + new Date().getTime() + "",
				//data:{},
				dataType: "json",
				success: function(mydata){
					if(mydata){
						//环境启动
						if(mydata.result){
							sendThisScreenMSG(mydata.msg);
							AutoModeRun();
						}else {
							sendThisScreenMSG(mydata.msg);
                        }
					}
				}
			})
		}else{
			sendThisScreenMSG(msg_input_actiontime);
		}
	}else{
		sendThisScreenMSG(msg_select_plan);
	}
})

//双击-删除方案
$(document).on("click", "#LSTSdbclick_del_plan", function() { 
	if($("#LSTSdbclick_select").val()!=-1){
		var func=function(){
			var planname=$("#LSTSdbclick_select").find("option:selected").text();			
			$.ajax({
				type: "GET",
				url : "bcd/json/delsigplan.php?itype=1&name="+ planname +"&dc=" + new Date().getTime() + "",
				//data:{},
				dataType: "json",
				success: function(mydata){
					if(mydata){
						if(mydata.result){
							//重新请求数组
							regetsigplan();
							
							//更新下拉框内容
							updateTSSelectContent("LSTSdbclick_select",arr_PLAN);
							
							layuiFormUpdate(1);					
						}
						
						sendThisScreenMSG(mydata.msg);
					}
				},
				error: function(json){}
			});

		};

		sendThisScreenConfirm(msg_confirm_del,func);

	}else{
		sendThisScreenMSG(msg_select_plan);
	}
})

//双击-应用方案
$(document).on("click", "#LSTSdbclick_go_plan", function() { 
	var func=function(){
		var dbclickflag=true;
		for(var i=0;i<$(".table-lsts-select").length;i++){
			if($(".table-lsts-select:eq("+ i +")").val()<=0){
				dbclickflag=false;
				break;
			}
		}
		if(dbclickflag){
			//planname=$("#LSTSdbclick_select").find("option:selected").text();
			var sbtotal=parseInt($("#dn_lstsup_total").html())+parseInt($("#dn_lstsdown_total").html());
			//上行
			var plan_lstsup_id=$("#dn_lstsup_id").html();
			var plan_lstsup_total=$("#dn_lstsup_total").html();   
			//下行
			var plan_lstsdown_id=$("#dn_lstsdown_id").html();
			var plan_lstsdown_total=$("#dn_lstsdown_total").html();   
			var lstsid_str=plan_lstsup_id+","+plan_lstsdown_id;  
			var arr_lstsid=lstsid_str.split(',');
			var temp_planid="";
			var temp_state="";
			for(var i=0;i<arr_lstsid.length;i++){
				if(temp_planid==""){
					temp_planid="id"+ i +"="+arr_lstsid[i];
				}else{
					temp_planid=temp_planid+"&id"+ i +"="+arr_lstsid[i];
				}
			}
			var j=0;
			$(".table-lsts-select").each(function(){ 		
				//var str="";
				//selectname=$("#"+ $(this).attr("id") +"").find("option:selected").text();
				selectvalue=$("#"+ $(this).attr("id") +"").find("option:selected").attr("avalue");
				if(temp_state==""){
					temp_state="state"+ j +"="+selectvalue;//$("#"+ $(this).attr("id") +"")
				}else{
					temp_state=temp_state+"&state"+ j +"="+selectvalue;
				}
				j=j+1;
			})
			$.ajax({
				type: "GET",
				url : "bcd/json/setsig.php?itype=1&total="+ sbtotal +"&"+ temp_planid +"&"+ temp_state +"&dc=" + new Date().getTime() + "",
				//data:{},
				dataType: "json",
				success: function(mydata){
					if(mydata){
						sendThisScreenMSG(mydata.msg);
					}
				},
				error: function(json){}
			});	
		}else{
			sendThisScreenMSG(msg_select_table);
		}

	};

	sendThisScreenConfirm(msg_confirm_use,func);

})


//火灾应急方案-删除方案
$(document).on("click", "#openFirePlan_del_plan", function() { 
	if($("#openFirePlan_select").val()!=-1){
		var func=function(){
			var planname=$("#openFirePlan_select").find("option:selected").text();			
			$.ajax({
				type: "GET",
				url : "bcd/json/delfireplan.php?itype=1&name="+ planname +"&dc=" + new Date().getTime() + "",
				//data:{},
				dataType: "json",
				success: function(mydata){
					if(mydata){
						if(mydata.result){
							//重新请求数组
							regetfireplan();
							
							//重新更新方案下拉框
							updateSelectContent("openFirePlan_select",arr_Fire);
						}else {
							alert(mydata.msg);
						}
					}
				},
				error: function(json){}
			});

		};

		sendThisScreenConfirm(msg_confirm_del,func);

	}else{
		sendThisScreenMSG(msg_select_plan);
	}
})

//火灾应急方案-执行方案
$(document).on("click", "#openFirePlan_go_plan", function() { 
	var fireupdown=$("#openFirePlan_updown_select").find("option:selected").val();
											   
	if (fireupdown!=-1){
		var func=function(){
			var tunnelnum=$("#default_place_select").val();
		
			var fireled=$("#table_fireplan_select_LED").find("option:selected").attr("avalue");
			var firefan=$("#table_fireplan_select_FAN").find("option:selected").attr("avalue");
			var firedoor=$("#table_fireplan_select_DOOR").find("option:selected").attr("avalue");
			var firefb=$("#table_fireplan_select_FB").find("option:selected").attr("avalue");
			var firets=$("#table_fireplan_select_TS").find("option:selected").attr("avalue");
			var firels=$("#table_fireplan_select_LS").find("option:selected").attr("avalue");
			fireupdown=parseInt(fireupdown);
			
			//执行方案
			setfire(tunnelnum,fireupdown,fireled,firefan,firedoor,firefb,firets,firels,ReplaceSeperator(ary_cmstext),ReplaceSeperator(ary_cmsstyle));
		};

		sendThisScreenConfirm(msg_confirm_execute,func);

	}else{
		 sendThisScreenMSG(msg_select_updown);
	}
})

//导出日志
$(document).on("click", "#control_log_output", function() { 
	$("#pageload").html("");
	var tempstr="";	
	var itype=$("input[name='logType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_begindate").val() +"&date2="+ $("#input_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_yeardate").val() +"";
			break;
	}
	
	var exceljson='bcd/php/exportlogexcel.php?'+tempstr+'&tablename=log_'+new Date().getTime()+'&dc='+new Date().getTime();

	$.ajax({
		url:exceljson,
		type:"get",
		dataType:"json",
		success:function (res) {
			if(res.code===1){
				window.open(res.msg);
			}else if (res.code ===-1){
				alert("导出的数据为空");
			}
		}
	})
})

//导出COVI
$(document).on("click", "#control_covi_output", function() { 
	$("#pageload").html("");
	var tempstr="";
	var tempcovistr="";
	var itype=$("input[name='recordCoviType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_covi_begindate").val() +"&date2="+ $("#input_covi_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_covi_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_covi_yeardate").val() +"";
			break;
	}
	//选择设备
	tempcovistr="&devid="+ $("#record_covi_select").val() +"";
	
	var exceljson='bcd/php/exportcoviexcel.php?'+tempstr+''+tempcovistr+'&tablename=covi_'+new Date().getTime()+'&dc='+new Date().getTime();

	$.ajax({
		url:exceljson,
		type:"get",
		dataType:"json",
		success:function (res) {
			if(res.code===1){
				window.open(res.msg);
			}else if (res.code ===-1){
				alert("导出的数据为空");
			}
		}
	})
})

//导出Fsfx
$(document).on("click", "#control_fsfx_output", function() { 
	$("#pageload").html("");
	var tempstr="";
	var tempfsfxstr="";	
	var itype=$("input[name='recordFsfxType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_fsfx_begindate").val() +"&date2="+ $("#input_fsfx_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_fsfx_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_fsfx_yeardate").val() +"";
			break;
	}
	//选择设备
	tempfsfxstr="&devid="+ $("#record_fsfx_select").val() +"";
	
	var exceljson='bcd/php/exportfsfxexcel.php?'+tempstr+''+tempfsfxstr+'&tablename=fsfx_'+new Date().getTime()+'&dc='+new Date().getTime();

	$.ajax({
		url:exceljson,
		type:"get",
		dataType:"json",
		success:function (res) {
			if(res.code===1){
				window.open(res.msg);
			}else if (res.code ===-1){
				alert("导出的数据为空");
			}
		}
	})
})

//导出Light
$(document).on("click", "#control_light_output", function() { 
	$("#pageload").html("");
	var tempstr="";
	var templightstr="";	
	var itype=$("input[name='recordLightType']:checked").val();//日期、月份、年份
	switch(itype){
		case '1':
			tempstr="itype="+itype+"&date1="+ $("#input_light_begindate").val() +"&date2="+ $("#input_light_enddate").val() +"";
			break;
		case '2':
			tempstr="itype="+itype+"&date1="+ $("#input_light_monthdate").val() +"";
			break;
		case '3':
			tempstr="itype="+itype+"&date1="+ $("#input_light_yeardate").val() +"";
			break;
	}
	//选择设备
	templightstr="&devid="+ $("#record_light_select").val() +"";
	
	var exceljson='bcd/php/exportlightexcel.php?'+tempstr+''+templightstr+'&tablename=light_'+new Date().getTime()+'&dc='+new Date().getTime();

	$.ajax({
		url:exceljson,
		type:"get",
		dataType:"json",
		success:function (res) {
			if(res.code===1){
				window.open(res.msg);
			}else if (res.code ===-1){
				alert("导出的数据为空");
			}
		}
	})
})

//导出故障设备
$(document).on("click", "#control_error_output", function() { 
	$("#pageload").html("");
	var tempstr="";
	var templightstr="";
	var devtypeid=$("#default_errorequipment_select").find("option:selected").attr("avalue");
	
	var exceljson='bcd/php/exporterrorexcel.php?devtype='+ devtypeid +'&tablename=error_'+new Date().getTime()+'&dc='+new Date().getTime();
	$.ajax({
		url:exceljson,
		type:"get",
		dataType:"json",
		success:function (res) {
			if(res.code===1){
				window.open(res.msg);
			}else if (res.code ===-1){
				alert("导出的数据为空");
			}
		}
	})
})

//火灾应急方案-情板报内容-新增
$(document).on("click", "#button_div_addCmsInfo", function() { 
	var textstr=$("#input_cms_content_textarea").val().replace(/[\r\n]/g,",");
	var stylestr="";
	
	if(textstr!=""){
		//记录样式
		var cms_fontgo=$("#select_openFirePlan_fontgo").find("option:selected").val();
		var cms_fontspeed=$("#input_openFirePlan_fontspeed").val();
		var cms_fontstay=$("#input_openFirePlan_fontstay").val();
		var cms_fontsize=$("#select_openFirePlan_fontsize").find("option:selected").val();
		var cms_fontfamily=$("#select_openFirePlan_fontfamily").find("option:selected").val();
		var cms_fontcolor=$("#select_openFirePlan_fontcolor").find("option:selected").val();
		var cms_fontzero=0;
		var cms_fontleft=$("#input_openFirePlan_fontleft").val();
		var cms_fontright=$("#input_openFirePlan_fontright").val();
		
		stylestr=cms_fontgo+","+cms_fontspeed+","+cms_fontstay+","+cms_fontsize+","+cms_fontfamily+","+cms_fontcolor+","+cms_fontzero+","+cms_fontleft+","+cms_fontright;
		
		if(ary_cmstext==""){
			ary_cmstext=textstr;
		}else{
			ary_cmstext+="*"+textstr;
		}
		
		if(ary_cmsstyle==""){
			ary_cmsstyle=stylestr;
		}else{
			ary_cmsstyle+="*"+stylestr;
		}
		
		var getdevjsoncms=getCmsFontJson();
		getdevjsoncms=$.parseJSON(getdevjsoncms);
		$("#tb_cmsfont").bootstrapTable('refreshOptions',{'data':getdevjsoncms.rows});
	}else{
		sendThisScreenMSG(msg_textarea_content);
	}
})

//火灾应急方案-情板报内容-清除
$(document).on("click", "#button_div_clearCmsInfo", function() { 
	$("#input_cms_content_textarea").val("");
})

//火灾应急方案-情板报-预留信息-新增
$(document).on("click", "#button_div_addReserveInfo", function() { 
	var infostr=$("#input_reserveinfo_textarea").val().replace(/[\r\n]/g,",");
	
	if(infostr!=""){
		$.ajax({
			type: "GET",
			url : "bcd/json/getpreinfocms.php?sid=" + Math.random()+ "&itype=3&type=1&content="+ infostr +"",
			//data:{},
			dataType: "text",
			async:false,
			success: function(mydata){
				//重新请求情报板预留信息数组
				regetcmstext();
				
				var devjsonreserveinfo=getReserveInfoJson();
				devjsonreserveinfo=$.parseJSON(devjsonreserveinfo);
				$("#tb_reserveinfo").bootstrapTable('refreshOptions',{'data':devjsonreserveinfo.rows});
				
				sendThisScreenMSG(msg_successadd);
			},
			error: function(mydata){
			}
		});
	}else{
		sendThisScreenMSG(msg_textarea_content);
	}
})

//火灾应急方案-情板报-预留信息-编辑
$(document).on("click", "#button_div_editReserveInfo", function() { 
	var infostr_id=$("#div_editReserveInfo_id").html();
	var infostr=$("#input_reserveinfo_textarea").val().replace(/[\r\n]/g,",");
	
	if(infostr_id!=""){
		if(infostr!=""){
			$.ajax({
				type: "GET",
				url : "bcd/json/getpreinfocms.php?sid=" + Math.random()+ "&itype=5&type=1&id="+ infostr_id +"&content="+ infostr +"",
				//data:{},
				dataType: "text",
				async:false,
				success: function(mydata){
					//重新请求情报板预留信息数组
					regetcmstext();
						
					var devjsonreserveinfo=getReserveInfoJson();
					devjsonreserveinfo=$.parseJSON(devjsonreserveinfo);
					$("#tb_reserveinfo").bootstrapTable('refreshOptions',{'data':devjsonreserveinfo.rows});
					
					sendThisScreenMSG(msg_successedit);
				},
				error: function(mydata){
				}
			});
		}else{
			sendThisScreenMSG(msg_textarea_content);
		}
	}
	else{		
		sendThisScreenMSG(msg_table_selectdata);
	}
})

//火灾应急方案-情板报-预留信息-清空
$(document).on("click", "#button_div_clearReserveInfo", function() { 
	$("#input_reserveinfo_textarea").val("");
})

//火灾应急方案-情板报-预留信息-删除
function reserveOperationDel(id){
	var func=function(){
		$.ajax({
			type: "GET",
			url : "bcd/json/getpreinfocms.php?sid=" + Math.random()+ "&itype=4&type=1&id="+ id +"",
			//data:{},
			dataType: "text",
			async:false,
			success: function(mydata){
				$("#div_editReserveInfo_id").html("");
				$("#input_reserveinfo_textarea").val("");
				
				//重新请求情报板预留信息数组
				regetcmstext();
				
				var devjsonreserveinfo=getReserveInfoJson();
				devjsonreserveinfo=$.parseJSON(devjsonreserveinfo);
				$("#tb_reserveinfo").bootstrapTable('refreshOptions',{'data':devjsonreserveinfo.rows});
				
				sendThisScreenMSG(msg_successdel);
			},
			error: function(mydata){
			}
		});
	};

	sendThisScreenConfirm(msg_confirm_del,func);
	
}

//火灾应急方案-电视墙-合屏
$(document).on("click", "#button_monitorwall_groupscreen", function() { 
	bigScreenLoadCollection();
})


//火灾应急方案-电视墙-分屏
$(document).on("click", "#button_monitorwall_splitscreen", function() { 
	bigScreenSplitCollection();
})


//按钮 end

//通用方法
//转换换行符-用于数据库转JSON
function ReplaceSeperator(str){
	var i;
    var result = "";
    var c;
	if(str.length>0){
		for (i = 0; i < str.length; i++) {
			c = str.substr(i, 1);
			if (c == "\n")
				result = result + ",";
			else if (c != "\r")
				result = result + c;
		}
	}
    return result;
}

//转换换行符-用于JSON转存数据库
function exReplaceSeperator(str){
	var i;
    var result = "";
    var c;
	if(str.length>0){
		for (i = 0; i < str.length; i++) {
			c = str.substr(i, 1);
			if (c == ",")
				result = result + "\r\n";   
			else 
				result = result + c;
		}
	}
    return result;
}
//方法