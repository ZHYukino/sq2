﻿//加载页面默认控件
function layuiload(){

	form.on('checkbox(default-checkbox)', function(data){
		var typevalue=data.elem.getAttribute('typename');
		var selectvalue=$("#default_place_select").val();
		var picclass=returnPicclass(typevalue);
		if(data.elem.checked){
			defaultAjax(typevalue,selectvalue,picclass,0);
		} else {
			$("."+ picclass +"").empty();
		}
		//缓存checkbox
		saveCheckbox(typevalue);
	});

	form.on('select(default_place_select)', function(data){
		layer.closeAll();//关闭所有窗口
		clearLoadPic();	//清除图片
		//加载layui
		layuiload();//XXXXXXXXXXXXXX
		//加载checkbox中的图标
		loadCheckbox();
		//刷新双击中的表格
		lstsup_id="";//上行表id
		lstsdown_id="";//上行表id
		lstsup_ename="";//上行表ename
		lstsdown_ename="";//上行表ename
		//上行
		temptunnel=$("#default_place_select").val();
		var devjsonlstsup=getCnvertJson(0,temptunnel);
		devjsonlstsup=$.parseJSON(devjsonlstsup);
		$("#tb_lstsup").bootstrapTable('refreshOptions',{'data':devjsonlstsup.rows});
		//下行
		var devjsonlstsdown=getCnvertJson(1,temptunnel);
		devjsonlstsdown=$.parseJSON(devjsonlstsdown);
		$("#tb_lstsdown").bootstrapTable('refreshOptions',{'data':devjsonlstsdown.rows});
	});
	
	//群控
	form.on('select(select_group_updown)', function(data){
		//刷新选中数值
		$("#select_group_updown").find("option").prop("selected", false);
		$("#select_group_updown").find("option[value='"+ data.value +"']").prop("selected", true);

		var devjsonControlGroup=getControlGroupJson("LED");
		devjsonControlGroup=$.parseJSON(devjsonControlGroup);
		$("#tb_controlgroup_LED").bootstrapTable('refreshOptions',{'data':devjsonControlGroup.rows});

		//刷新列表
		devjsonControlGroup=getControlGroupJson("FAN");
		devjsonControlGroup=$.parseJSON(devjsonControlGroup);
		$("#tb_controlgroup_FAN").bootstrapTable('refreshOptions',{'data':devjsonControlGroup.rows});
		
		//刷新列表
		devjsonControlGroup=getControlGroupJson("DOOR");
		devjsonControlGroup=$.parseJSON(devjsonControlGroup);
		$("#tb_controlgroup_DOOR").bootstrapTable('refreshOptions',{'data':devjsonControlGroup.rows});
		//刷新列表
		devjsonControlGroup=getControlGroupJson("FB");
		devjsonControlGroup=$.parseJSON(devjsonControlGroup);
		$("#tb_controlgroup_FB").bootstrapTable('refreshOptions',{'data':devjsonControlGroup.rows});
		//刷新列表
		devjsonControlGroup=getControlGroupJson("TS");
		devjsonControlGroup=$.parseJSON(devjsonControlGroup);
		$("#tb_controlgroup_TS").bootstrapTable('refreshOptions',{'data':devjsonControlGroup.rows});
		//刷新列表
		devjsonControlGroup=getControlGroupJson("LS");
		devjsonControlGroup=$.parseJSON(devjsonControlGroup);
		$("#tb_controlgroup_LS").bootstrapTable('refreshOptions',{'data':devjsonControlGroup.rows});
		console.log(devjsonControlGroup);
		layuiFormUpdate(1);
		
	});


	//亮度检测
	form.on('select(controlLED_select)', function(data){
		//清空全局
		ledrelation_id="";
		$("#dn_ledrelation_total").html("");
		$("#dn_ledrelation_id").html("");
		//清空配置方案下拉框
		$("#led_plan_select").val(0);
		layuiFormUpdate(1);
		//加载控制方案判断阀值
		var selectid=$("#controlLED_select").val();
		if(selectid!=-1){
			//加载照明控制参数数组
			controlLedArray(selectid);
			layuiFormUpdate(2);
			//获取设备列表
			var tunnelnum=$("#controlLED_select  option:selected").attr("tunnel");
			//根据隧道号获取JSON
			var devjsonled=getdevjson("LED",tunnelnum);
			devjsonled=$.parseJSON(devjsonled); //转为JSON
			$("#tb_ledrelation").bootstrapTable('refreshOptions',{'data':devjsonled.rows});
			layuiFormUpdate(2);
		}
	});

	//亮度方案配置变动时
	form.on('select(led_plan_select)', function(datastr){
		var selectid=$("#controlLED_select").val();
		if(selectid!=-1){
			var planname=$("#led_plan_select").find("option:selected").text();						
			//照明加载设备关系表动作关联
			switch(planname){
				case "晴天":						
					loadLedPlan(selectid,0);
					break;
				case "阴天":
					loadLedPlan(selectid,1);
					break;
				case "晚上":
					loadLedPlan(selectid,2);
					break;
				case "夜间":
					loadLedPlan(selectid,3);
					break;
			}
		}
	});
	
	//照明时钟-时间变动时
	form.on('select(ledtime_plan_select)', function(datastr){
		//获取时间
		var arrnum=$("#ledtime_plan_select").find("option:selected").attr("arrnum");
		if(arrnum!=-1){
			//动作时间
			$("#input_led_actiontime").val(arr_ZM2[arrnum][0]);
			if(arr_ZM2[arrnum][1]==0){
				$("#ledtime_use").prop("checked",false);
			}else{
				$("#ledtime_use").prop("checked",true);
			}
			if(arr_ZM2[arrnum][2]==0){
				$("#ledtime_hint").prop("checked",false);
			}else{
				$("#ledtime_hint").prop("checked",true);
			}
			for(var i=0;i<arr_ZM2[arrnum][3].length;i++){
				if(arr_ZM2[arrnum][3][i][1]==0){
					$("#ledtime_action_"+ arr_ZM2[arrnum][3][i][0] +"").prop("checked",false);
				}else{
					$("#ledtime_action_"+ arr_ZM2[arrnum][3][i][0] +"").prop("checked",true);
				}
			}
			layuiFormUpdate(2);
		}
	});
	
	//COVI检测
	form.on('select(controlFAN_select)', function(data){								  
		//清空全局
		fanrelation_id="";
		$("#dn_fanrelation_id").html("");
		$("#dn_fanrelation_total").html("");
		layuiFormUpdate(1);
		//风机加载控制方案判断阀值
		var selectid=$("#controlFAN_select").val();
		if(selectid!=-1){
			//加载风机控制参数数组
			controlFanArray(selectid);
			//获取隧道号
			var tunnelnum=$("#controlFAN_select option:selected").attr("tunnel");
			//加载风向下拉框
			controlFsfxAjax(tunnelnum);
			//加载对应风向
			$("#fan_plan_select").val(arr_FJ[selectid][5]);
			layuiFormUpdate(1);
			//获取设备列表
			//根据隧道号获取JSON
			var devjsonfan=getdevjson("FAN",tunnelnum);
			devjsonfan=$.parseJSON(devjsonfan); //转为JSON
			$("#tb_fanrelation").bootstrapTable('refreshOptions',{'data':devjsonfan.rows});		  
			loadFanPlan(selectid);
		}else{
			//清空对应方向下拉框
			$("#fan_plan_select").val(0);
			layuiFormUpdate(1);
		}	
	});
	
	//故障设备列表
	form.on('select(default_errorequipment_select)', function(data){	
		var infostr=$("#default_errorequipment_select").val();
															  
		var devjsonerrorequipment=getErrorEquipmentJson(infostr);
		devjsonerrorequipment=$.parseJSON(devjsonerrorequipment); //转为JSON
		$("#tb_errorequipment").bootstrapTable('refreshOptions',{'data':devjsonerrorequipment.rows});				
	});

	//界面照明控制模式
	function titlesetisauto(type,i) {
		$.ajax({
			type: "GET",
			url: "bcd/php/setisauto.php?itype="+type+"&tunnel="+tunnelnum+"&state=" + i + "&dc=" + new Date().getTime() + "",
			//data:{},
			dataType: "json",
			success: function (mydata) {
				if (mydata) {
					//环境启动
					if (mydata.result) {
						AutoModeRun();
						var html = (i==0) ? "手动" : (i == 1) ?  "环境" : "时序";
						if(type == 1)  $("#control_fan_value").html(html);
						else  $("#control_led_value").html(html);
					}
					sendThisScreenMSG(mydata.msg);
				}
			},
			error: function (json) {
			}
		})
	}

	$("#control_LED_select0").click(function () {
        titlesetisauto(2,0)
	});
	$("#control_LED_select1").click(function () {
        titlesetisauto(2,1)
	});
	$("#control_LED_select2").click(function () {
        titlesetisauto(2,2)
	});
	$("#control_FAN_select0").click(function () {
        titlesetisauto(1,0)
	});
    $("#control_FAN_select1").click(function () {
        titlesetisauto(1,1)
    });
    $("#control_FAN_select2").click(function () {
        titlesetisauto(1,2)
    });

	// form.on('select(control_LED_select)', function(data){
	// 	//数组赋值
	// 	ZMMode=$("#control_LED_select").val();
	// 	$.ajax({
	// 		type: "GET",
	// 		url : "bcd/php/setisauto.php?itype=2&state="+ ZMMode +"&dc=" + new Date().getTime() + "",
	// 		//data:{},
	// 		dataType: "json",
	// 		success: function(mydata){
	// 			if(mydata){
	// 				//环境启动
	// 				if(mydata.result){
	// 					AutoModeRun();
	// 				}
	// 				sendThisScreenMSG(mydata.msg);
	// 			}
	// 		 },
	// 		error: function(json){}
	// 	});
	// });
	//
	// //界面风机控制模式
	// form.on('select(control_FAN_select)', function(data){
	// 	//数组赋值
	// 	FJMode=$("#control_FAN_select").val();
	// 	$.ajax({
	// 		type: "GET",
	// 		url : "bcd/php/setisauto.php?itype=1&state="+ FJMode +"&dc=" + new Date().getTime() + "",
	// 		//data:{},
	// 		dataType: "json",
	// 		success: function(mydata){
	// 			if(mydata){
	// 				//环境启动
	// 				if(mydata.result){
	// 					AutoModeRun();
	// 				}
	//
	// 				sendThisScreenMSG(mydata.msg);
	// 			}
	// 		},
	// 		error: function(json){}
	// 	});
	// });
	
	//双击-选择方案-表格选择
	//console.log(arr_PLAN)
	form.on('select(LSTSdbclick_select)', function(data){
		var index=$("#LSTSdbclick_select").find("option:selected").val();
		if (index!=-1){
			for(var j=0;j<arr_PLAN[index][4].length;j++){
				var $select=$(".table-lsts-select[ename='"+ arr_PLAN[index][4][j][0] +"'] ");
				
				if(arr_PLAN[index][4][j][1]=="0"){
					$select.val(0);
				}else{
					var selectvalue=$select.find("option[name='"+ arr_PLAN[index][4][j][1] +"']").val();
					$select.val(selectvalue);
				}
			}
			
			layuiFormUpdate(1);
		}			
	});
	
	//火灾应急方案-选择方案-表格选择
	form.on('select(openFirePlan_select)', function(data){
		var index=$("#openFirePlan_select").find("option:selected").val();
		if (index!=-1){
			//上下行选择框
			$("#openFirePlan_updown_select").val(arr_Fire[index][3]);
			
			$("#table_fireplan_select_LED").find("option[avalue='"+ arr_Fire[index][5] +"']").prop("selected", true);
			$("#table_fireplan_select_FAN").find("option[avalue='"+ arr_Fire[index][6] +"']").prop("selected", true);
			$("#table_fireplan_select_DOOR").find("option[avalue='"+ arr_Fire[index][7] +"']").prop("selected", true);
			$("#table_fireplan_select_FB").find("option[avalue='"+ arr_Fire[index][8] +"']").prop("selected", true);
			$("#table_fireplan_select_TS").find("option[avalue='"+ arr_Fire[index][9] +"']").prop("selected", true);
			$("#table_fireplan_select_LS").find("option[avalue='"+ arr_Fire[index][10] +"']").prop("selected", true);	
			
			ary_cmstext=arr_Fire[index][11];	//情报板内容数组
			ary_cmsstyle=arr_Fire[index][12];   //情报板样式数组
			
			var getdevjsoncms=getCmsFontJson();
			getdevjsoncms=$.parseJSON(getdevjsoncms);
			$("#tb_cmsfont").bootstrapTable('refreshOptions',{'data':getdevjsoncms.rows});
		}
		
		layuiFormUpdate(1);
		
	});
	
	//火灾应急方案-电视墙-选择设备
	form.on('select(default_device_select)', function(data){
		var index=$("#default_device_select").find("option:selected").val();
		
		var getjsonmonitorwall=getMonitorWallJson(index);
		getjsonmonitorwall=$.parseJSON(getjsonmonitorwall);
		$("#tb_monitorwall").bootstrapTable('refreshOptions',{'data':getjsonmonitorwall.rows});
		
		layuiFormUpdate(1);
		
	});
	
	//火灾应急方案-电视墙-火警时上墙方式
	form.on('select(default_device_screenselect)', function(data){
		var index=$("#default_device_screenselect").find("option:selected").val();
		
		$.ajax({  
			url: 'bcd/php/setscreenselect.php?count=' + index,// 跳转到 action
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			async : true, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {
				if(mydata.result ===1 ){
					$("#config_pingjie_screenselect").val(index);
					sendThisScreenMSG(msg_successset);  
				}else {
					alert(mydata.msg);
				}
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				 
			 }
		});
		
		layuiFormUpdate(1);
		
	});
	
	////
	
}

//layui的刷新
function layuiFormUpdate(num){
	switch(num){
		case 0:
			form.render(''); //更新所有
			break;
		case 1:
			form.render('select'); //更新select
			break;
		case 2:
			form.render('checkbox'); //更新checkbox		
			break;
	}
}

//摄像机-切上电视墙
function showBigScreen(cid){
	var camip="";
	var camchannel=0;	
	
	for(var i=0;i<arr_CAM.length;i++){
		if(cid==arr_CAM[i][1]){
			devicename=arr_CAM[i][4];
			camip=arr_CAM[i][7];
			camchannel=arr_CAM[i][26];
		}
	}

	if(!camip) {
		sendThisScreenMSG(msg_connectfail);

		return false;
	}
	
	layer.open({
		type: 1 //此处以iframe举例
		,title: "切上电视墙-选择屏幕"
		,area: ['400px', '280px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_showMonitorWall_panel' //防止重复弹出
		,content: $("#showMonitorWall_panel")
		,btn: ['确定','退屏','关闭'] 
		,yes: function(index, layero){
			var windowstr=$("#default_screen_select").val();
			
			bigScreenSetToWall(devicename,camip,camchannel,windowstr);
		}
		,btn2: function(index, layero){
			var windowstr=$("#default_screen_select").val();
			
			bigScreenExitToWall(windowstr);
		}
		,btn3: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
		}
	})
}

//页面错误提示-关掉当前框及上一层框
function sendScreenMSG(str){
	layer.open({
		type: 1
		,offset: 'auto'
		,id: 'LAY_info_tips' //防止重复弹出
		,content: "<div style=\"padding: 20px 100px;\">"+ str +"</div>"
		,btn: '关闭'
		,btnAlign: 'c' //按钮居中
		,shade: 0.3 //不显示遮罩
		,yes: function(index){
		  layer.close(index-1);
		  layer.close(index);
		}
		,cancel : function(index){
		  layer.close(index-1);
		  layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
		  layer.setTop(layero); 
		}
	});
}

//页面错误提示-关掉当前框
function sendThisScreenMSG(str){
	layer.open({
		type: 1
		,offset: 'auto'
		,id: 'LAY_info_tips' //防止重复弹出
		,content: "<div style=\"padding: 20px 100px;\">"+ str +"</div>"
		,btn: '关闭'
		,btnAlign: 'c' //按钮居中
		,shade: 0.3 //不显示遮罩
		,yes: function(index){		  
		  layer.close(index);
		}
		,cancel : function(index){
		  layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
		  layer.setTop(layero); 
		}
	});
}

//页面提示选择-是否确定
function sendThisScreenConfirm(str,func){
	layer.open({
		type: 1
		,offset: 'auto'
		,id: 'LAY_info_tips' //防止重复弹出
		,content: "<div style=\"padding: 20px 100px;\">"+ str +"</div>"
		,btn: ["确定","取消"]
		,btnAlign: 'c' //按钮居中
		,shade: 0.3 //不显示遮罩
		,yes: function(index){	
		  func();
			
		  layer.close(index);
		}
		,cancel : function(index){
		  layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
		  layer.setTop(layero); 
		}
	});
}

//更新后更新下拉框内容
function updateSelectContent(selectid,thisArr_){
	
	var tunnelnum=$("#default_place_select").val();//隧道号
	$("#"+ selectid +" option").remove();
	
	var thisoption="<option value=\"-1\" selname=\""+ msg_select_default +"\" selected>"+ msg_select_default +"</option>";
	for(var i=0;i<thisArr_.length;i++){
		if(thisArr_[i][2]==tunnelnum){
			thisoption+="<option value=\""+ thisArr_[i][0] +"\" selname=\""+  thisArr_[i][4] +"\" >"+  thisArr_[i][4] +"</option>";
		}
	}
	$("#"+ selectid +"").append(thisoption);
	
	layuiFormUpdate(1);
}

//更新后更新信号灯方案下拉框内容
function updateTSSelectContent(selectid,thisArr_){
	
	var tunnelnum=$("#default_place_select").val();//隧道号
	$("#"+ selectid +" option").remove();	
	
	var thisoption="<option value=\"-1\" selname=\""+ msg_select_default +"\" selected>"+ msg_select_default +"</option>";
	for(var i=0;i<thisArr_.length;i++){
		if(thisArr_[i][2]==tunnelnum){
			thisoption+="<option value=\""+ thisArr_[i][0] +"\" selname=\""+  thisArr_[i][3] +"\">"+  thisArr_[i][3] +"</option>";
		}
	}
	$("#"+ selectid +"").append(thisoption);
	
	layuiFormUpdate(1);
}

//选择设备
$("#li_leftmenu_dev").on("click",function(){
	layer.open({
		type: 1 //此处以iframe举例
		,title: "选择设备"
		,area: ['600px', '400px']
		,shade: 0
		,maxmin: true
		,offset: '' 
		,id: 'LAY_show' //防止重复弹出
		,content: $("#checkbox_list")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
		}
	});
})

//火灾应急方案
$("#li_leftmenu_fire").on("click",function(){
	layer.open({
		type: 1 //此处以iframe举例
		,title: '火灾应急方案'
		,area: ['800px', '480px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_openFirePlan_panel' //防止重复弹出
		,content: $("#openFirePlan_panel")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero);
			
			//重新更新方案下拉框
			updateSelectContent("openFirePlan_select",arr_Fire);
		}
	})
})



//系统信息
$("#li_leftmenu_info").on("click",function(){
	layer.open({
		type: 1 //此处以iframe举例
		,title: '系统信息'
		,area: ['800px', '480px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_control_panel_system' //防止重复弹出
		,content: $("#control_panel_system")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			//加载照明及风机控制模式
			$("#control_LED_select").val(ZMMode);
			$("#control_FAN_select").val(FJMode);
			layuiFormUpdate(1);
		}
	});
})



//CO/VI采集数据
$("#li_leftmenu_covi").on("click",function(){
	layer.open({
		type: 1 //此处以iframe举例
		,title: 'CO/VI采集数据'
		,area: ['800px', '480px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_control_data_covi' //防止重复弹出
		,content: $("#control_data_covi")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			
			if(arr_COVI.length!=0){
				var covistate=arr_COVI[0][19];
				var covi_img=returnStatePic("covi",covistate);
				var covi_statename=returnStateName(covistate);
				var covi_name=arr_COVI[0][4];
				var covi_addr=arr_COVI[0][5];
				$("#covi_img").attr("src",covi_img);
				$("#covi_name").html(covi_name);
				$("#covi_addr").html(covi_addr);
				$("#covi_state").html(covi_statename);
				//取最近的一次值
				var covi_coval=arr_COVI[0][21];
				var covi_vival=arr_COVI[0][22];
				$("#covi_coval").html(covi_coval);
				$("#covi_vival").html(covi_vival);
				//加载图表 start
				$.ajax({
					type: "GET",
					url : "bcd/php/getrptcovi.php?itype=4&devid="+ arr_COVI[0][1] +"&dc=" + new Date().getTime() + "",
					//data:{},
					dataType: "json",
					success: function(mydata){
						if(mydata){
							var arrCo=[];
							var arrVi=[];
							var arrCollTime=[];
							for(i=0;i<mydata.data.length;i++){
								arrCo.push(parseInt(mydata.data[i].coval));
								arrVi.push(parseInt(mydata.data[i].vival));
								arrCollTime.push(returnFormatTime(mydata.data[i].colltime));
							}
							$('#container_covi').highcharts({
								exporting:{
									enabled:false
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
										enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
									}
								},
								series: [{
									name: 'CO检测值',
									data: arrCo
								}, {
									name: 'VI检测值',
									data: arrVi
								}]
							});
						}
					},
					error: function(json){}
				});
				//加载图表 end
			}else{
				sendScreenMSG(msg_nodevice);							
			}
		}
	});
})

//风速/风向采集数据
$("#li_leftmenu_fsfx").on("click",function(){
	layer.open({
		type: 1 //此处以iframe举例
		,title: '风速/风向采集数据'
		,area: ['800px', '480px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_control_data_fsfx' //防止重复弹出
		,content: $("#control_data_fsfx")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			
			if(arr_FSFX.length!=0){
				var fsfxstate=arr_FSFX[0][19];
				var fsfx_img=returnStatePic("fsfx",fsfxstate);
				var fsfx_statename=returnStateName(fsfxstate);
				var fsfx_name=arr_FSFX[0][4];
				var fsfx_addr=arr_FSFX[0][5];
				$("#fsfx_img").attr("src",fsfx_img);
				$("#fsfx_name").html(fsfx_name);
				$("#fsfx_addr").html(fsfx_addr);
				$("#fsfx_state").html(fsfx_statename);
				//取最近的一次值
				var fsfx_fsval=arr_FSFX[0][21];
				var fsfx_fxval=arr_FSFX[0][22];
				var citystr="";
				//风向
				if(parseInt(fsfx_fxval)==1){
					citystr=$("#config_city_left").val();
				}else{
					citystr=$("#config_city_right").val();
				}
				fsfx_fxval="往"+ citystr +"方向";
				$("#fsfx_fsval").html(fsfx_fsval);
				$("#fsfx_fxval").html(fsfx_fxval);	  
				//加载图表 start
				$.ajax({
					type: "GET",
					url : "bcd/php/getrptfsfx.php?itype=4&devid="+ arr_FSFX[0][1] +"&dc=" + new Date().getTime() + "",
					//data:{},
					dataType: "json",
					success: function(mydata){
						if(mydata){
							var arrFs=[];							
							var arrCollTime=[];
							for(i=0;i<mydata.data.length;i++){
								arrFs.push(parseInt(mydata.data[i].fsval));
								arrCollTime.push(returnFormatTime(mydata.data[i].colltime));
							}
							$('#container_fsfx').highcharts({
								exporting:{
									enabled:false
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
					error: function(json){}
				});
				//加载图表 end
			}else{
				sendScreenMSG(msg_nodevice);
			}
		}
	});
})

//光强度采集数据
$("#li_leftmenu_gq").on("click",function(){
	layer.open({
		type: 1 //此处以iframe举例
		,title: '光强度采集数据'
		,area: ['800px', '480px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_control_data_light' //防止重复弹出
		,content: $("#control_data_light")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			
			if(arr_LIGHT.length!=0){	
				var lightstate=arr_LIGHT[0][19];
				var light_img=returnStatePic("light",lightstate);
				var light_statename=returnStateName(lightstate);
				var light_name=arr_LIGHT[0][4];
				var light_addr=arr_LIGHT[0][5];
				$("#light_img").attr("src",light_img);
				$("#light_name").html(light_name);
				$("#light_addr").html(light_addr);
				$("#light_state").html(light_statename);
				//取最近的一次值
				var light_inval=arr_LIGHT[0][21];
				var light_outval=arr_LIGHT[0][22];
				$("#light_inval").html(light_inval);
				$("#light_outval").html(light_outval);
				//加载图表 start
				$.ajax({
					type: "GET",
					url : "bcd/php/getrptlight.php?itype=4&devid="+ arr_LIGHT[0][1] +"&dc=" + new Date().getTime() + "",
					//data:{},
					dataType: "json",
					success: function(mydata){
						if(mydata){
							var arrIn=[];
							var arrOut=[];
							var arrCollTime=[];
							for(i=0;i<mydata.data.length;i++){
								arrIn.push(parseInt(mydata.data[i].inval));
								arrOut.push(parseInt(mydata.data[i].outval));
								arrCollTime.push(returnFormatTime(mydata.data[i].colltime));
							}
							$('#container_light').highcharts({
								exporting:{
									enabled:false
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
					error: function(json){}
				});
				//加载图表 end
			}else{
				sendScreenMSG(msg_nodevice);
			}
		}
	});
})

//故障设备列表
$("#li_leftmenu_devfalse").on("click",function(){
	//处理下拉框
	if(arr_TS==""){					
		$("#default_errorequipment_select option[value='TS']").remove();				
	}
	if(arr_LS==""){					
		$("#default_errorequipment_select option[value='LS']").remove();				
	}
	if(arr_LIGHT==""){					
		$("#default_errorequipment_select option[value='LIGHT']").remove();				
	}
	if(arr_LED==""){					
		$("#default_errorequipment_select option[value='LED']").remove();				
	}
	if(arr_FAN==""){					
		$("#default_errorequipment_select option[value='FAN']").remove();				
	}
	if(arr_COVI==""){					
		$("#default_errorequipment_select option[value='COVI']").remove();				
	}
	if(arr_FSFX==""){					
		$("#default_errorequipment_select option[value='FSFX']").remove();				
	}
	if(arr_FB==""){					
		$("#default_errorequipment_select option[value='FB']").remove();				
	}
	if(arr_FGS==""){					
		$("#default_errorequipment_select option[value='FGS']").remove();				
	}
	if(arr_FGW==""){					
		$("#default_errorequipment_select option[value='FGW']").remove();				
	}
	if(arr_FGR==""){					
		$("#default_errorequipment_select option[value='FGR']").remove();				
	}
	if(arr_DOOR==""){					
		$("#default_errorequipment_select option[value='DOOR']").remove();				
	}
	if(arr_CMS==""){					
		$("#default_errorequipment_select option[value='CMS']").remove();				
	}
	if(arr_CAM==""){					
		$("#default_errorequipment_select option[value='CAM']").remove();				
	}
	if(arr_DEC==""){
		$("#default_errorequipment_select option[value='DEC']").remove();				
	}
	if(arr_ET==""){					
		$("#default_errorequipment_select option[value='ET']").remove();				
	}
	if(arr_VD==""){					
		$("#default_errorequipment_select option[value='VD']").remove();				
	}				
	if(arr_PUMP==""){					
		$("#default_errorequipment_select option[value='PUMP']").remove();				
	}				
	if(arr_WD==""){					
		$("#default_errorequipment_select option[value='WD']").remove();				
	}
	
	layuiFormUpdate(1);
	
	//刷新数组
	geterrordev();
	
	var optionstr="";
	//加载设备列表下拉框
	optionstr=optionstr+"<select id=\"default_errorequipment_select\" lay-filter=\"default_errorequipment_select\">";
	optionstr=optionstr+"<option value=\"all\" avalue=\"0\" selected>全部设备</option>";
	for(var i=0;i<arr_TYPE.length;i++){
		optionstr=optionstr+"<option value=\""+ arr_TYPE[i][2] +"\" avalue=\""+ arr_TYPE[i][0] +"\">"+ arr_TYPE[i][1] +"</option>";
	}
	optionstr=optionstr+"</select>";
								
	layer.open({
		type: 1 //此处以iframe举例
		,title: '故障设备列表'
		,area:[''+ W-200 +'px',''+ H-100 +'px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_eject_errorequipment_panel' //防止重复弹出
		,content: $("#eject_errorequipment_panel")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			$("#div_errorequipment_select").html(optionstr);
			layuiFormUpdate(1);
			
			layer.setTop(layero); 
		}
	})
})

//群控
$("#li_leftmenu_control").on("click",function(){
	var optionstr="";
	//上下行下拉框
	optionstr+="<select id=\"select_group_updown\" lay-filter=\"select_group_updown\" class=\"table-in-select\">";
	optionstr+="<option value=\"-1\">请选择</option>";
	optionstr+="<option value=\"0\">上行</option>";
	optionstr+="<option value=\"1\">下行</option>";
	optionstr+="</select>";

	
	//群控
	layer.open({
		type: 1 //此处以iframe举例
		,title: '群控'
		,area: ['800px', '480px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_controlGroup' //防止重复弹出
		,content: $("#controlGroup")
		,btn: ['执行','关闭'] //只是为了演示
		,yes: function(index, layero){
			var func=function(){
				layer.open({
					type: 1
					,time: 10000
					,content: "<div style=\"padding: 20px 10px;\">正在执行中，请不要关闭或刷新浏览器</div>"
					,fixed: false
					,closeBtn: 0
					,offset: 'auto'
					,id: 'LAY_info_tips_exec' //防止重复弹出
					,success: function(layero, index){
					  controlGroupGo(index);				
					}
					,end :function(){
						layer.open({
							type: 1
							,time: 5000
							,content: "<div style=\"padding: 20px 10px;\">任务正在后台执行中，请稍会再查看</div>"
							,fixed: false
							,closeBtn: 0
							,offset: 'auto'
							,id: 'LAY_info_tips_backexec' //防止重复弹出
							,success: function(layero, index){				  
							}
							,end :function(){
							}
					   });	
					}		  
					
				  });
			};
		
			sendThisScreenConfirm(msg_confirm_execute,func);
		}
		,btn2:function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero, index){
			$("#div_groupupdown_select").html(optionstr);
			layuiFormUpdate(1);

			layer.setTop(layero); 
		}			
	})
})

//注销退出
$("#li_leftmenu_exit").on("click",function(){
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
})

////////////////////////////////////////////////////////////
//COVI历史记录
$(document).on("click", "#control_record_covi", function() { 
	parent.layer.open({
		type: 1 //此处以iframe举例
		,title: "COVI检测历史记录"
		,area:[''+ W-200 +'px',''+ H-100 +'px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_record_covi' //防止重复弹出
		,content: $("#record_covi")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			
			//填充日期
			$("#input_covi_begindate").val(returnDate(1));
			$("#input_covi_enddate").val(returnDate(1));
			$("#input_covi_monthdate").val(returnDate(2));
			$("#input_covi_yeardate").val(returnDate(3));
			
			layuiFormUpdate(0);
		}
	});
})

//风速风向历史记录
$(document).on("click", "#control_record_fsfx", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "风速风向检测历史记录"
		,area:[''+ W-200 +'px',''+ H-100 +'px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_record_fsfx' //防止重复弹出
		,content: $("#record_fsfx")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			//填充日期
			$("#input_fsfx_begindate").val(returnDate(1));
			$("#input_fsfx_enddate").val(returnDate(1));
			$("#input_fsfx_monthdate").val(returnDate(2));
			$("#input_fsfx_yeardate").val(returnDate(3));

			layuiFormUpdate(0);
		}
	});
})

//风速风向历史记录
$(document).on("click", "#control_record_light", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "光强度检测历史记录"
		,area:[''+ W-200 +'px',''+ H-100 +'px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_record_light' //防止重复弹出
		,content: $("#record_light")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			//填充日期
			$("#input_light_begindate").val(returnDate(1));
			$("#input_light_enddate").val(returnDate(1));
			$("#input_light_monthdate").val(returnDate(2));
			$("#input_light_yeardate").val(returnDate(3));

			layuiFormUpdate(0);
		}
	});
})

//日志查询
$(document).on("click", "#control_admin_log", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "日志查询"
		,area:[''+ W-200 +'px',''+ H-100 +'px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_admin_log' //防止重复弹出
		,content: $("#admin_panel_log")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			//填充日期
			$("#input_begindate").val(returnDate(1));
			$("#input_enddate").val(returnDate(1));
			$("#input_monthdate").val(returnDate(2));
			$("#input_yeardate").val(returnDate(3));

			layuiFormUpdate(0);
		}
	});
})

//照明控制参数
$(document).on("click", "#control_led_parameter", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "照明控制参数"
		,area: ['850px', '510px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10]
		,id: 'LAY_controlLED_panel' //防止重复弹出
		,content: $("#controlLED_panel")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			
			//加载亮度检测下拉框内容
			controlLedAjax();
			
			//根据隧道号获取JSON
			var tunnelnum=$("#default_place_select").val();//隧道号
			var devjsonledtime=getdevjson("LED",tunnelnum);
			devjsonledtime=$.parseJSON(devjsonledtime); //转为JSON 
			$("#tb_ledtime").bootstrapTable('refreshOptions',{'data':devjsonledtime.rows});	  

			layuiFormUpdate(0);
		}
	});
})

//风机控制参数
$(document).on("click", "#control_fan_parameter", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "风机控制参数"
		,area: ['850px', '510px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_controlFAN_panel' //防止重复弹出
		,content: $("#controlFAN_panel")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
			
			//风机加载COVI检测下拉框内容
			controlFanAjax();
			//风机加载所有对应风向下拉框内容
			controlFsfxAjax(0);

			layuiFormUpdate(0);
		}
	});
})

//双击-增加方案
$(document).on("click", "#LSTSdbclick_add_plan", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "新增方案"
		,area: ['300px', '180px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_LSTSdbclick_panel_addplan' //防止重复弹出
		,content: $("#LSTSdbclick_panel_addplan")
		,btn: ['确定','关闭'] //只是为了演示
		,yes: function(index, layero){
			var tunnelnum=$("#default_place_select").val();
			var planname=$("#input_LSTSdbclick_addplan").val();
			var sbtotal=parseInt($("#dn_lstsup_total").html())+parseInt($("#dn_lstsdown_total").html());
			//上行
			var plan_lstsup_ename=$("#dn_lstsup_ename").html();
			//下行
			var plan_lstsdown_ename=$("#dn_lstsdown_ename").html();
			ename_str=plan_lstsup_ename+","+plan_lstsdown_ename;
			arr_lsts=ename_str.split(',');
			
			var temp_planename="";
			var temp_tip="";
			for(var i=0;i<arr_lsts.length;i++){
				if(temp_planename==""){
					temp_planename="ename"+ i +"="+arr_lsts[i];
				}else{
					temp_planename=temp_planename+"&ename"+ i +"="+arr_lsts[i];
				}
			}
			var j=0;
			$(".table-lsts-select").each(function(){ 		
				//str="";
				var selectname=$("#"+ $(this).attr("id") +"").find("option:selected").text();		
				if(selectname!=msg_select_default){
					if(temp_tip==""){
						temp_tip="tip"+ j +"="+selectname;
					}else{
						temp_tip=temp_tip+"&tip"+ j +"="+selectname;
					}	
				}else{
					if(temp_tip==""){
						temp_tip="tip"+ j +"="+"";
					}else{
						temp_tip=temp_tip+"&tip"+ j +"="+"";
					}
				}
				j=j+1;
			})
			
			$.ajax({
				type: "GET",
				url : "bcd/json/setsigplan.php?itype=1&Tunnel="+ tunnelnum +"&name="+ planname +"&total="+ sbtotal +"&"+ temp_planename +"&"+ temp_tip +"&dc=" + new Date().getTime() + "",
				//data:{},
				dataType: "json",
				success: function(mydata){
					if(mydata){
						if(mydata.result){
							//清空输入框
							planname=$("#input_LSTSdbclick_addplan").val();
							$("#input_LSTSdbclick_addplan").val("");
							//重新请求数组
							regetsigplan();
							
							//更新下拉框内容
							updateTSSelectContent("LSTSdbclick_select",arr_PLAN);
							
							$("#LSTSdbclick_select").find("option[selname='"+ planname +"']").attr("selected", true);	
							layuiFormUpdate(1);
							layer.close(index);									
						}
						
						sendThisScreenMSG(mydata.msg);
					}
				},
				error: function(json){}
			});
		}
		,btn2: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 

			layuiFormUpdate(0);
		}
	});
})

//火灾应急方案-增加方案
$(document).on("click", "#openFirePlan_add_plan", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "新增方案"
		,area: ['300px', '180px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_openFirePlan_panel_addplan' //防止重复弹出
		,content: $("#openFirePlan_panel_addplan")
		,btn: ['确定','关闭'] //只是为了演示
		,yes: function(index, layero){
			var tunnelnum=$("#default_place_select").val();
			var planname=$("#input_openFirePlan_addplan").val();
			var planupdown=$("#openFirePlan_updown_select").val();
									
			var plants=$("#table_fireplan_select_TS").find("option:selected").attr("avalue");
			var planls=$("#table_fireplan_select_LS").find("option:selected").attr("avalue");
			var planfan=$("#table_fireplan_select_FAN").find("option:selected").attr("avalue");
			var plandoor=$("#table_fireplan_select_DOOR").find("option:selected").attr("avalue");
			var planled=$("#table_fireplan_select_LED").find("option:selected").attr("avalue");
			var planfb=$("#table_fireplan_select_FB").find("option:selected").attr("avalue");
			
			if(planname!=""){	
				if(planupdown>=0){						
					$.ajax({
						type: "GET",
						url : "bcd/php/setfireplan.php?itype=1&Tunnel="+ tunnelnum +"&name="+ planname +"&updown="+ planupdown +"&ts="+ plants +"&ls="+ planls +"&fan="+ planfan +"&door="+ plandoor +"&led="+ planled +"&fb="+ planfb +"&sendtext="+ ary_cmstext +"&textformat="+ ary_cmsstyle +"&dc=" + new Date().getTime() + "",
						//data:{},
						dataType: "json",
						success: function(mydata){
							if(mydata){
								if(mydata.result){
									//清空输入框
									//planname=$("#input_openFirePlan_addplan").val();
									$("#input_openFirePlan_addplan").val("");
									//重新请求数组
									regetfireplan();
									
									//重新更新方案下拉框
									updateSelectContent("openFirePlan_select",arr_Fire);
									
									$("#openFirePlan_select").find("option[selname='"+ planname +"']").attr("selected", true);
									layuiFormUpdate(1);
									layer.close(index);
								}
								
								sendThisScreenMSG(mydata.msg);
							}
						},
						error: function(json){}
					});
				}else{
					sendThisScreenMSG(msg_select_updown);
				}
			}else{
				sendThisScreenMSG(msg_input_planname);
			}
			
		}
		,btn2: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 

			layuiFormUpdate(0);
		}
	});
})

//火灾应急方案-编辑情报板
$(document).on("click", "#table_fireplan_select_CMS_edit", function() { 
	var tunnelnum=$("#default_place_select").find("option:selected").val();
		var updownnum=$("#openFirePlan_updown_select").find("option:selected").val();
		
		if(updownnum!=-1){
			var numcount=0;
			var camid="";
			var camname="";
			var camclass="";
			var camnum="";
			
			for(var i=0;i<arr_GSCMS.length;i++){
				if(parseInt(tunnelnum)==parseInt(arr_GSCMS[i][3])&&parseInt(updownnum)==parseInt(arr_GSCMS[i][4])){
					numcount=1;
					
					camid=arr_GSCMS[i][1];
					camname=arr_GSCMS[i][2];
					camclass=showCmsClassName(arr_GSCMS[i][5]);
					camnum=arr_GSCMS[i][6];
				}
			}
			
			if(numcount==1){
				var that = this; 
				//多窗口模式，层叠置顶
				layer.open({
					type: 1 //此处以iframe举例
					,title: "编辑情报板-"+ camnum +"-"+ camname +"-"+ camname
					,area: ['800px', '480px']
					,shade: 0
					,maxmin: true
					,offset: [Ht+10] 
					,id: 'LAY_openFirePlan_panel_editCMS' //防止重复弹出
					,content: $("#openFirePlan_panel_editCMS")
					,btn: ['确定','关闭'] //只是为了演示
					,yes: function(index, layero){
						layer.close(index);
					}
					,btn1: function(index, layero){
						layer.close(index);
					}
					,zIndex: layer.zIndex 
					,success: function(layero){
						layer.setTop(layero); 

						layuiFormUpdate(0);
					}
				});
			}else{
				sendThisScreenMSG(msg_cms_nodata);
			}
			
		}else{
			sendThisScreenMSG(msg_select_updown);
		}
})

//火灾应急方案-编辑选择预留信息
$(document).on("click", "#button_div_openCmsInfo", function() { 
	layer.open({
		type: 1 //此处以iframe举例
		,title: "编辑预留信息"
		,area: ['600px', '360px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_reserveinfo_panel' //防止重复弹出
		,content: $("#reserveinfo_panel")
		,btn: ['选择','关闭'] //只是为了演示
		,yes: function(index, layero){
			$("#input_cms_content_textarea").val($("#input_reserveinfo_textarea").val());
			layer.close(index);
		}
		,btn2: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
		}
	});
})

//火灾应急方案-预览情报板
$(document).on("click", "#button_div_showCmsInfo", function() { 
	var tunnelnum=$("#default_place_select").find("option:selected").val();
	var updownnum=$("#openFirePlan_updown_select").find("option:selected").val();
	
	if(updownnum!=-1){
		var numcount=0;
		var camid="";
		var camname="";
		var camclass="";
		var camnum="";
		
		for(var i=0;i<arr_GSCMS.length;i++){
			if(parseInt(tunnelnum)==parseInt(arr_GSCMS[i][3])&&parseInt(updownnum)==parseInt(arr_GSCMS[i][4])){
				numcount=1;
				
				camid=arr_GSCMS[i][1];
				camname=arr_GSCMS[i][2];
				camclass=showCmsClassName(arr_GSCMS[i][5]);
				camnum=arr_GSCMS[i][6];
				
				//情报板宽高
				getCmsClassWH(arr_GSCMS[i][5]);
			}
		}
		
		if(numcount==1){
			if(ary_cmstext!=""){
				var that = this; 
				//多窗口模式，层叠置顶
				layer.open({
					type: 1 //此处以iframe举例
					,title: "编辑情报板-"+ camnum +"-"+ camname +"-"+ camclass
					,area: ['480px', '300px']
					,shade: 0
					,maxmin: false
					,resize: false 
					,offset: [Ht+10] 
					,id: 'LAY_openFirePlan_panel_seeCMS' //防止重复弹出
					,content: $("#openFirePlan_panel_seeCMS")
					,btn: ['关闭'] //只是为了演示
					,yes: function(index, layero){
						layer.close(index);
						
						clearTimeout(cmsSwitchAction);
					}
					,zIndex: layer.zIndex 
					,success: function(layero){
						layer.setTop(layero); 
						
						$("#div_seeCMS_group").css("width",cms_showwidth);
						$("#div_seeCMS").css("width",cms_showwidth);
						$("#div_seeCMS").css("height",cms_showheight);
															
						cmstext=ary_cmstext.split("*");
						cmsstyle=ary_cmsstyle.split("*");
						
						for(var i=0;i<cmstext.length;i++){
							if(cmstext.length==1){
								var cmstextstr=ReplaceSeperator(cmstext[i]);
								cmstextstr=cmstextstr.replace(/[,]/g,'<br />');
								$("#div_seeCMS").html("<div id=\"div_seeCMS_content\">"+ cmstextstr +"</div>");
								
								cmsarr=cmsstyle[i].split(",");
								$("#div_seeCMS_content").css("fontSize",getCmsFontSize(cmsarr[3]));
								$("#div_seeCMS_content").css("lineHeight",getCmsFontSize(cmsarr[3]));
								$("#div_seeCMS_content").css("fontFamily",getCmsFontFamily(cmsarr[4]));
								$("#div_seeCMS_content").css("color",getCmsFontColor(cmsarr[5]));
								$("#div_seeCMS_content").css("marginLeft",cmsarr[7]+"px");
								$("#div_seeCMS_content").css("marginTop",cmsarr[8]+"px");
							}else{
								cmsSwitch(0);
								break;
							}
						}
					}
				});
			}else{
				sendThisScreenMSG(msg_cms_nocontent);
			}
		}else{
			sendThisScreenMSG(msg_cms_nodata);
		}
	}else{
		sendThisScreenMSG(msg_select_updown);
	}
})

//火灾应急方案-电视墙
$(document).on("click", "#openFirePlan_screen", function() { 
	if(arr_FB==""){
		$("#default_device_select option[value='0']").remove(); 
	}
	if(arr_FGS==""){
		$("#default_device_select option[value='1']").remove();
	}
	if(arr_FGW==""){
		$("#default_device_select option[value='2']").remove(); 
	}
	
	// $("#default_device_screenselect").val($("#config_pingjie_screenselect").val());
	// layuiFormUpdate(1);

	layer.open({
		type: 1 //此处以iframe举例
		,title: '电视墙'
		,area: ['800px', '480px']
		,shade: 0
		,maxmin: true
		,offset: [Ht+10] 
		,id: 'LAY_eject_monitorwall_panel' //防止重复弹出
		,content: $("#eject_monitorwall_panel")
		,btn: ['关闭'] //只是为了演示
		,yes: function(index, layero){
			layer.close(index);
		}
		,zIndex: layer.zIndex 
		,success: function(layero){
			layer.setTop(layero); 
		}
	})
})


//弹出触发事件
var active = {

};

$('.layui-btn').on('click', function(){
	var othis = $(this), method = othis.data('method');
	active[method] ? active[method].call(this, othis) : '';
});

$('.layui-menu').on('click', function(){
	var othis = $(this), method = othis.data('method');
	active[method] ? active[method].call(this, othis) : '';
});

//监听Tab切换
element.on('tab(demo)', function(data){
	//layer.msg('切换了：'+ this.innerHTML);
});

