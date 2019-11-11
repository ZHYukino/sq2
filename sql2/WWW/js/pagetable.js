﻿//row 获取这行的值 ，index 获取索引值 
//row.devtpyename类型
//row.id
//row.shape态

$(function() {
	//初始化Table
	//操作日志
	var oTable = new TableInit();
	oTable.Init();

	//初始化Table_covi
	var oTable_covi = new TableInit_covi();
	oTable_covi.Init();

	//初始化Table_fsfx
	var oTable_fsfx = new TableInit_fsfx();
	oTable_fsfx.Init();

	//初始化Table_light
	var oTable_light = new TableInit_light();
	oTable_light.Init();

	//初始化照明控制-设备关系表
	var oTable_ledrelation = new TableInit_ledrelation();
	oTable_ledrelation.Init();

	//初始化照明时钟控制
	var oTable_ledtime = new TableInit_ledtime();
	oTable_ledtime.Init();	

	//初始化风机控制-设备关系表
	var oTable_fanrelation = new TableInit_fanrelation();
	oTable_fanrelation.Init();

	//初始化信号灯控制双击-上行
	var oTable_lstsup = new TableInit_lstsup();
	oTable_lstsup.Init();

	//信号灯控制双击-下行
	var oTable_lstsdown = new TableInit_lstsdown();
	oTable_lstsdown.Init();
	
	//火灾应急方案
	var oTable_fireplan = new TableInit_fireplan();
	oTable_fireplan.Init();
	
	//火灾应急方案-情报板参数
	var oTable_cmsfont = new TableInit_cmsfont();
	oTable_cmsfont.Init();
	
	//火灾应急方案-情报板预留信息
	var oTable_reserveinfo = new TableInit_reserveinfo();
	oTable_reserveinfo.Init();
	
	//火灾应急方案-电视墙
	var oTable_monitorwall = new TableInit_monitorwall();
	oTable_monitorwall.Init();
	
	//故障设备列表
	var oTable_errorequipment = new TableInit_errorequipment();
	oTable_errorequipment.Init();
	
	//右键群控
	//照明
	var oTable_controlgroup_LED = new TableInit_controlgroup("LED");
	oTable_controlgroup_LED.Init();
	
	//风机
	var oTable_controlgroup_FAN = new TableInit_controlgroup("FAN");
	oTable_controlgroup_FAN.Init();
	
	//防火门
	var oTable_controlgroup_DOOR = new TableInit_controlgroup("DOOR");
	oTable_controlgroup_DOOR.Init();

	//手报
	var oTable_controlgroup_FB = new TableInit_controlgroup("FB");
	oTable_controlgroup_FB.Init();
	
	//交通信号灯
	var oTable_controlgroup_TS = new TableInit_controlgroup("TS");
	oTable_controlgroup_TS.Init();
	
	//车道指示器
	var oTable_controlgroup_LS = new TableInit_controlgroup("LS");
	oTable_controlgroup_LS.Init();
});

//操作日志
var TableInit = function() {
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
	var oTableInit = new Object();
	var urls = 'bcd/php/getlog.php?'+tempstr;
	//初始化Table
	oTableInit.Init = function() {
		$('#tb_log').bootstrapTable({
			url : urls, //请求后台的URL（*）
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			//pageNumber: 1,                       //初始化加载第一页，默认第一页
			//pageSize: 10,                       //每页的记录行数（*）
			//pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
			search : false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行
			//height: $(window).height() - 100,   //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'logTime',
					title : '日志时间',
					align : 'left',
				},
				{
					field : 'logAccounts',
					title : '登录帐号',
					align : 'left',
				},
				{
					field : 'logContent',
					title : '日志内容',
					align : 'left',
				},
				{
					field : 'logRemarks',
					title : '备注',
					align : 'left',
				},
				{
					field: 'formatSpace',
					title: ''
				}
			],
			onLoadSuccess : function() { //加载成功时执行
			},
			onLoadError : function() { //加载失败时执行 
			}
		});
	};
	return oTableInit;
};

var TableInit_covi = function() {
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
	var oTableInit = new Object();
	var urls = 'bcd/php/getrptcovi.php?'+tempstr+tempcovistr;
	//初始化Table_covi
	oTableInit.Init = function() {
		$('#tb_covi').bootstrapTable({
			url : urls, //请求后台的URL（*）
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '设备编号',
					align : 'left',
				},
				{
					field : 'cname',
					title : '设备名称',
					align : 'left',
				},
				{
					field : 'colltime',
					title : '检测时间',
					align : 'left',
				},
				{
					field : 'coval',
					title : 'CO',
					align : 'left',
				},
				{
					field : 'vival',
					title : 'VI',
					align : 'left',
				}
			],
			onLoadSuccess : function() { //加载成功时执
			},
			onLoadError : function() { //加载失败时执行
			}
		});
	};
	return oTableInit;
};

var TableInit_fsfx = function() {
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
	var oTableInit = new Object();
	var urls = 'bcd/php/getrptfsfx.php?'+tempstr+tempfsfxstr;
	//初始化Table_fsfx
	oTableInit.Init = function() {
		$('#tb_fsfx').bootstrapTable({
			url : urls, //请求后台的URL（*）
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '设备编号',
					align : 'left',
				},
				{
					field : 'cname',
					title : '设备名称',
					align : 'left',
				},
				{
					field : 'colltime',
					title : '检测时间',
					align : 'left',
				},
				{
					field : 'fsval',
					title : '风速',
					align : 'left',
				},
				{
					field : 'fxval',
					title : '风向',
					align : 'left'
					,formatter:'fxvalFormatter'
				}
			],
			onLoadSuccess : function() { 
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

//风向
function fxvalFormatter(value, row, index){
	//row 获取这行的值 ，index 获取索引值
	if(row.fxval==0){
		return "顺车行方向";
	}else{
		return "逆车行风向";
	}
}

var TableInit_light = function() {
	var tempstr="";
	var templightstr="";
	var itype=$("input[name='recordlightType']:checked").val();//日期、月份、年份
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
	var oTableInit = new Object();
	var urls = 'bcd/php/getrptlight.php?'+tempstr+templightstr;
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_light').bootstrapTable({
			url : urls, //请求后台的URL（*）
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '设备编号',
					align : 'left',
				},
				{
					field : 'cname',
					title : '设备名称',
					align : 'left',
				},
				{
					field : 'colltime',
					title : '检测时间',
					align : 'left',
				},
				{
					field : 'inval',
					title : '洞内',
					align : 'left',
				},
				{
					field : 'outval',
					title : '洞外',
					align : 'left',
				}			
			],
			onLoadSuccess : function() { 
			},
			onLoadError : function() { 
			}
		});
	};	
	return oTableInit;
};

//照明控制-设备关系表
var TableInit_ledrelation = function() {
	ledrelation_id="";
	temptunnel=-1;
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_ledrelation').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			//data : devjson.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '设备编号',
					align : 'left',
					width : '200'
					,formatter:'ledRelationIdFormatter'
				},
				{
					field : 'cname',
					title : '设备名称',
					align : 'left',
					width : '200'
				},
				{
					field : 'actionstr',
					title : '动作',
					align : 'left',
					width : '40'
					,formatter:'ledRelationActionFormatter'
				},
				{
					field : 'relationstr',
					title : '关联',
					align : 'left',
					width : '40'
					,formatter:'ledRelationFormatter'
				},
				{
					field : 'tunnel',
					title : '所在隧道',
					align : 'left',
					width : '100'
				},
				{
					field: 'formatSpace',
					title: ''
				}
			],
			onLoadSuccess : function() { 
			},
			onLoadError : function() { 
			}
		});
	};

	return oTableInit;
};

//照明设备关系表ID
function ledRelationIdFormatter(value, row, index){
	if(ledrelation_id==""){
		ledrelation_id=row.id;
	}else{
		ledrelation_id=ledrelation_id+","+row.id;
	}
	$("#dn_ledrelation_id").html(ledrelation_id);
	ledrelation_total=ledrelation_id.split(',').length;
	$("#dn_ledrelation_total").html(ledrelation_total);
	return row.ename;
}

//照明设备关系表关联
function ledRelationFormatter(value, row, index){
	return "<input id=\"ledrelation_relation_"+ row.id +"\" type=\"checkbox\" name=\"ledrelation_isselect\" lay-skin=\"primary\">";
}

//照明设备关系表动作
function ledRelationActionFormatter(value, row, index){
	return "<input id=\"ledrelation_action_"+ row.id +"\" type=\"checkbox\" name=\"ledrelation_isopen\" lay-skin=\"primary\">";
}

//照明控制-时钟控制方案
var TableInit_ledtime = function() {
	var ledtime_str="";
	var temptunnel=-1;
	var oTableInit = new Object();
	//初始化Table_ledtime
	oTableInit.Init = function() {
		$('#tb_ledtime').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			//data : devjson.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '设备编号',
					align : 'left',
					width : '200',
					formatter:'ledTimeIdFormatter'
				},
				{
					field : 'cname',
					title : '设备名称',
					align : 'left',
					width : '200'
				},
				{
					field : 'actionstr',
					title : '动作',
					align : 'left',
					width : '40',
					formatter:'ledTimeActionFormatter'
				},
				{
					field : 'tunnel',
					title : '所在隧道',
					align : 'left',
					width : '100'
				},
				{
					field: 'formatSpace',
					title: ''
				}
			],
			onLoadSuccess : function() { 
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

//照明时钟控制方案ID
function ledTimeIdFormatter(value, row, index){
	if(ledtime_id=="")
	{
		ledtime_id=row.id;
	}else{
		ledtime_id=ledtime_id+","+row.id;
	}
	$("#dn_ledtime_id").html(ledtime_id);
	ledtime_total=ledtime_id.split(',').length;
	$("#dn_ledtime_total").html(ledtime_total);
	return row.ename;
}

//照明时钟控制方案动作
function ledTimeActionFormatter(value, row, index){
	return "<input id=\"ledtime_action_"+ row.id +"\" type=\"checkbox\" name=\"ledtime_isopen\" lay-skin=\"primary\">";
}

//风机控制-设备关系表
var TableInit_fanrelation = function() {
	var fanrelation_id="";
	var temptunnel=-1;
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_fanrelation').bootstrapTable({
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '设备编号',
					align : 'left',
					width : '200',
					formatter:'fanRelationIdFormatter'
				},
				{
					field : 'cname',
					title : '设备名称',
					align : 'left',
					width : '200'
				},
				{
					field : 'relationstr',
					title : '关联',
					align : 'left',
					width : '40',
					formatter:'fanRelationFormatter'
				},
				{
					field : 'tunnel',
					title : '所在隧道',
					align : 'left',
					width : '100'
				},
				{
					field: 'formatSpace',
					title: ''
				}	
			],
			onLoadSuccess : function() { 							
			},
			onLoadError : function() { 
			}
		});
	};	
	return oTableInit;
};

//风机设备关系表ID
function fanRelationIdFormatter(value, row, index){
	if(fanrelation_id=="")
	{
		fanrelation_id=row.id;
	}else{
		fanrelation_id=fanrelation_id+","+row.id;
	}
	$("#dn_fanrelation_id").html(fanrelation_id);
	fanrelation_total=fanrelation_id.split(',').length;
	$("#dn_fanrelation_total").html(fanrelation_total);		
	return row.ename;
}     

//风机设备关系表关联
function fanRelationFormatter(value, row, index){
	return "<input id=\"fanrelation_relation_"+ row.id +"\" type=\"checkbox\" name=\"fanrelation_isselect\" lay-skin=\"primary\">";	
}

//信号灯控制双击-上行
var TableInit_lstsup = function() {
	//获取隧道+temptunnel
	var temptunnel=$("#default_place_select").val();
	var devjsonlstsup=getCnvertJson(0,temptunnel);
	devjsonlstsup=$.parseJSON(devjsonlstsup); 
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_lstsup').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			data : devjsonlstsup.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '编号',
					align : 'left',
					width : '150'
					,formatter:'lstsupIdFormatter'
				},
				{
					field : 'operationstr',
					title : '操作',
					align : 'left',
					width : '150'
					,formatter:'lstsupOperationFormatter'
				},
				{
					field : 'cname',
					title : '名称',
					align : 'left',
					width : '150'
				},
				{
					field: 'formatSpace',
					title: ''
				}
			],
			onLoadSuccess : function() { 				
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

//信号灯控制双击-下拉框-上行
function lstsupOperationFormatter(value, row, index){
	selectstr=getTableOperationStr(row.devtpyename,row.shape,row.id,row.ename);			
	return selectstr;
}     

//信号灯控制双击-上行
function lstsupIdFormatter(value, row, index){
	if(lstsup_id=="")
	{
		lstsup_id=row.id;
	}else{
		lstsup_id=lstsup_id+","+row.id;
	}
	$("#dn_lstsup_id").html(lstsup_id);
	lstsup_total=lstsup_id.split(',').length;
	$("#dn_lstsup_total").html(lstsup_total);
	if(lstsup_ename=="")
	{
		lstsup_ename=row.ename;
	}else{
		lstsup_ename=lstsup_ename+","+row.ename;
	}
	$("#dn_lstsup_ename").html(lstsup_ename);
	return row.ename;
}

//信号灯控制双击-下行
var TableInit_lstsdown = function() {
	//获取隧道+temptunnel
	var temptunnel=$("#default_place_select").val();
	var devjsonlstsdown=getCnvertJson(1,temptunnel);
	devjsonlstsdown=$.parseJSON(devjsonlstsdown);
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_lstsdown').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			data : devjsonlstsdown.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'ename',
					title : '编号',
					align : 'left',
					width : '150'
					,formatter:'lstsdownIdFormatter'
				},
				{
					field : 'operationstr',
					title : '操作',
					align : 'left',
					width : '150'
					,formatter:'lstsdownOperationFormatter'
				},
				{
					field : 'cname',
					title : '名称',
					align : 'left',
					width : '150'
				},
				{
					field: 'formatSpace',
					title: ''
				}		
			],
			onLoadSuccess : function() { 					
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

//信号灯控制双击-下拉框-下行
function lstsdownOperationFormatter(value, row, index){
	selectstr=getTableOperationStr(row.devtpyename,row.shape,row.id,row.ename);		
	return selectstr;
}     

//信号灯控制双击-下行
function lstsdownIdFormatter(value, row, index){
	if(lstsdown_id=="")
	{
		lstsdown_id=row.id;
	}else{
		lstsdown_id=lstsdown_id+","+row.id;
	}
	$("#dn_lstsdown_id").html(lstsdown_id);
	lstsdown_total=lstsdown_id.split(',').length;
	$("#dn_lstsdown_total").html(lstsdown_total);	
	if(lstsdown_ename=="")
	{
		lstsdown_ename=row.ename;
	}else{
		lstsdown_ename=lstsdown_ename+","+row.ename;
	}
	$("#dn_lstsdown_ename").html(lstsdown_ename);	
	return row.ename;
}       

function getTableOperationStr(typevalue,shapevalue,idvalue,enamevalue){
	var selectstr="";
	
	if(typevalue=="LS"){
		selectstr="<select id=\"table_ls_select_"+ idvalue +"\" lay-ignore ename=\""+ enamevalue +"\" name=\"table_lsselect\" class=\"table-lsts-select\">";// lay-filter=\"control_FAN_select\"id=\""+ idvalue +"\"
		selectstr+="<option value=\"0\" avalue=\"-1\">"+ msg_select_default +"</option>";
		switch(shapevalue){
			case '1':
				selectstr+="<option value=\"1\" name=\"禁止\" avalue=\"0\">禁止</option>";
				selectstr+="<option value=\"2\" name=\"通行\" avalue=\"1\">通行</option>";
				break;
			case '2':
				selectstr+="<option value=\"1\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
				selectstr+="<option value=\"2\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
				break;
			case '3':
				selectstr+="<option value=\"1\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
				selectstr+="<option value=\"2\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
				selectstr+="<option value=\"3\" name=\"反向通行\" avalue=\"3\">反向通行</option>";
				break;
			case '4':
				selectstr+="<option value=\"1\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
				selectstr+="<option value=\"2\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
				selectstr+="<option value=\"3\" name=\"反向通行\" avalue=\"3\">反向通行</option>";
				selectstr+="<option value=\"4\" name=\"左转通行\" avalue=\"5\">左转通行</option>";
				break;
			case '5':
				selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
				selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
				selectstr+="<option value=\"2\" name=\"反向通行\" avalue=\"2\">反向通行</option>";
				selectstr+="<option value=\"3\" name=\"反向通行\" avalue=\"3\">正向左转</option>";
				selectstr+="<option value=\"4\" name=\"左转通行\" avalue=\"4\">反向右转</option>";
				break;
		}
		selectstr+="</select>";
	}else{
		selectstr="<select id=\"table_ts_select_"+ idvalue +"\" lay-ignore ename=\""+ enamevalue +"\" name=\"table_tsselect\" class=\"table-lsts-select\">";//id=\"table_ts_select_"+ idvalue +"\" id=\""+ idvalue +"\" 
		selectstr+="<option value=\"0\" avalue=\"-1\">"+ msg_select_default +"</option>";
		selectstr+="<option value=\"1\" name=\"红灯\" avalue=\"1\">红灯</option>";
		selectstr+="<option value=\"2\" name=\"黄灯\" avalue=\"2\">黄灯</option>";
		selectstr+="<option value=\"3\" name=\"绿灯\" avalue=\"4\">绿灯</option>";
		if(shapevalue==4){
			selectstr+="<option value=\"4\" name=\"左转\" avalue=\"8\">左转</option>";
		}
		selectstr+="</select>";
	}
	return selectstr;
}


//火灾应急预案
var TableInit_fireplan = function() {
	var devjsonfireplan=getFirePlanJson();
	devjsonfireplan=$.parseJSON(devjsonfireplan);
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_fireplan').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			data : devjsonfireplan.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'name',
					title : '设备',
					align : 'left',
					width : '150'
				},
				{
					field : 'operationstr',
					title : '操作',
					align : 'left',
					width : '150'
					,formatter:'fireplanOperationFormatter'
				}	
			],
			onLoadSuccess : function() { 					
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

function fireplanOperationFormatter(value, row, index){//xxx
	var selectstr="";
	
	switch(row.arrindex){
		case 0:
			//照明
			selectstr="<select id=\"table_fireplan_select_LED\" lay-ignore name=\"table_select_led\" class=\"table-in-select\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			selectstr+="<option value=\"1\" name=\"全部关闭\" avalue=\"0\">全部关闭</option>";
			selectstr+="<option value=\"2\" name=\"全部打开\" avalue=\"1\">全部打开</option>";
			selectstr+="</select>";
			break;
		case 1:
			//风机
			selectstr="<select id=\"table_fireplan_select_FAN\" lay-ignore name=\"table_select_fan\" class=\"table-in-select\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			selectstr+="<option value=\"1\" name=\"全部关闭\" avalue=\"0\">全部关闭</option>";
			selectstr+="<option value=\"2\" name=\"全部正转\" avalue=\"1\">全部正转</option>";
			selectstr+="<option value=\"3\" name=\"全部反转\" avalue=\"2\">全部反转</option>";
			selectstr+="</select>";
			break;
		case 2:
			//防火门
			selectstr="<select id=\"table_fireplan_select_DOOR\" lay-ignore name=\"table_select_door\" class=\"table-in-select\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			selectstr+="<option value=\"1\" name=\"全部上升到位\" avalue=\"1\">全部上升到位</option>";
			selectstr+="<option value=\"2\" name=\"全部下降到位\" avalue=\"2\">全部下降到位</option>";
			selectstr+="<option value=\"3\" name=\"全部上升中\" avalue=\"3\">全部上升中</option>";
			selectstr+="<option value=\"4\" name=\"全部下降中\" avalue=\"4\">全部下降中</option>";
			selectstr+="</select>";
			break;
		case 3:
			//手报
			selectstr="<select id=\"table_fireplan_select_FB\" lay-ignore name=\"table_select_ts\" class=\"table-in-select\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			selectstr+="<option value=\"1\" name=\"全部关闭\" avalue=\"0\">全部关闭</option>";
			selectstr+="<option value=\"2\" name=\"全部火警\" avalue=\"1\">全部火警</option>";
			selectstr+="</select>";
			break;
		case 4:			
			//交通信号灯
			selectstr="<select id=\"table_fireplan_select_TS\" lay-ignore name=\"table_select_ts\" class=\"table-in-select\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			selectstr+="<option value=\"1\" name=\"全部双向禁止\" avalue=\"1\">全部双向禁止</option>";
			selectstr+="<option value=\"2\" name=\"全部正向通行\" avalue=\"2\">全部正向通行</option>";
			selectstr+="<option value=\"3\" name=\"全部正向慢行\" avalue=\"3\">全部正向慢行</option>";
			selectstr+="<option value=\"4\" name=\"全部正向左转\" avalue=\"4\">全部正向左转</option>";
			selectstr+="<option value=\"5\" name=\"全部反向通行\" avalue=\"5\">全部反向通行</option>";
			selectstr+="<option value=\"6\" name=\"全部反向慢行\" avalue=\"6\">全部反向慢行</option>";
			selectstr+="<option value=\"7\" name=\"全部反向右转\" avalue=\"7\">全部反向右转</option>";
			selectstr+="</select>";
			break;
		case 5:
			//交通指示器
			selectstr="<select id=\"table_fireplan_select_LS\" lay-ignore name=\"table_select_ls\" class=\"table-in-select\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			selectstr+="<option value=\"1\" name=\"全部双向禁行\" avalue=\"0\">全部双向禁行</option>";
			selectstr+="<option value=\"2\" name=\"全部正向通行\" avalue=\"1\">全部正向通行</option>";
			selectstr+="<option value=\"3\" name=\"全部反向通行\" avalue=\"3\">全部反向通行</option>";
			selectstr+="<option value=\"4\" name=\"全部左转通行\" avalue=\"4\">全部左转通行</option>";
			selectstr+="<option value=\"5\" name=\"全部右转通行\" avalue=\"5\">全部右转通行</option>";
			selectstr+="</select>";
			break;
		case 6:
			//情报板
			selectstr="<div id=\"table_fireplan_select_CMS_edit\" class=\"layui-btn layui-btn-normal table-in-button\" ";
			selectstr+="style=\"height:25px;line-height:25px;width:40px;margin:0 5px 0 0;padding:0;\">";
			selectstr+="编辑";
			selectstr+="</div>";
			selectstr+="<div id=\"table_fireplan_select_CMS_show\" class=\"layui-btn layui-btn-normal table-in-button\" ";
			selectstr+="style=\"height:25px;line-height:25px;width:40px;margin:0 5px 0 0;padding:0;\" data-method=\"showSeeCMS\">";
			selectstr+="预览";
			selectstr+="</div>";
			break;
	}
	
	return selectstr;
}

//火灾应急方案-情报板参数
var TableInit_cmsfont = function() {
	var devjsoncmsfont=getCmsFontJson();
	devjsoncmsfont=$.parseJSON(devjsoncmsfont);
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_cmsfont').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			//data : devjsoncmsfont.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'cmsfontdel',
					title : '<i class="glyphicon glyphicon-remove"></i>',
					align : 'left',
					width : '20'
					,formatter:'cmsfontOperationDelFormatter'
				},
				{
					field : 'cmsfontcontent',
					title : '内容',
					align : 'left',
					width : '100'					
				},
				{
					field : 'cmsfontsize',
					title : '字号',
					align : 'left',
					width : '40'
					,formatter:'cmsfontsizeFormatter'
				},
				{
					field : 'cmsfontfamily',
					title : '字体',
					align : 'left',
					width : '40'
					,formatter:'cmsfontfamilyFormatter'
				},
				{
					field : 'cmsfontcolor',
					title : '字体颜色',
					align : 'left',
					width : '40'
					,formatter:'cmsfontcolorFormatter'
				},
				{
					field : 'cmsfontgo',
					title : '出字方式',
					align : 'left',
					width : '40'
					,formatter:'cmsfontgoFormatter'
				},
				{
					field : 'cmsfontspeed',
					title : '出字速度',
					align : 'left',
					width : '40'
				},
				{
					field : 'cmsfontstay',
					title : '停留时间',
					align : 'left',
					width : '40'
				},
				{
					field : 'cmsfontleft',
					title : '左边距',
					align : 'left',
					width : '40'
				},
				{
					field : 'cmsfontright',
					title : '右边距',
					align : 'left',
					width : '40'
				}
			],
			onClickCell: function (field, value, row, $element) {
				var infostr_id=row.id;
				var infostr_content=row.cmsfontcontent;
				infostr_content=exReplaceSeperator(infostr_content);
				
				$("#div_cmsReserveInfo_id").html(infostr_id)
				$("#input_cms_content_textarea").val(infostr_content);
				
				//情报板赋值
				$("#select_openFirePlan_fontgo").val(row.cmsfontgo);
				$("#input_openFirePlan_fontspeed").val(row.cmsfontspeed);
				$("#input_openFirePlan_fontstay").val(row.cmsfontstay);
				$("#select_openFirePlan_fontsize").val(row.cmsfontsize);
				$("#select_openFirePlan_fontfamily").val(row.cmsfontfamily);
				$("#select_openFirePlan_fontcolor").val(row.cmsfontcolor);
				$("#input_openFirePlan_fontleft").val(row.cmsfontleft);
				$("#input_openFirePlan_fontright").val(row.cmsfontright);
				
				layuiFormUpdate(1);
			},
			onLoadSuccess : function() { 					
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

function cmsfontOperationDelFormatter(value, row, index){
	var selectstr="";
	
	//清除选择的数组内容
	selectstr+="<a href=\"javascript:void(0)\" onclick=\"cmsfontOperationDel("+ index +");\"><i class=\"glyphicon glyphicon-remove\"></i></a>";
	
	return selectstr;
}

function cmsfontOperationDel(index){
	var selectstr="";
	var ary_cmstext_make="";
	var ary_cmsstyle_make="";
	
	if(index>=0){
		var val1=delArray(ary_cmstext.split("*"),index);
		var val2=delArray(ary_cmsstyle.split("*"),index);
		
		for(var i=0;i<val1.length;i++){
			if(ary_cmstext_make==""){
				ary_cmstext_make=val1[i];
			}else{
				ary_cmstext_make+="*"+val1[i];
			}
		}
		for(var i=0;i<val2.length;i++){
			if(ary_cmsstyle_make==""){
				ary_cmsstyle_make=val2[i];
			}else{
				ary_cmsstyle_make+="*"+val2[i];
			}
		}
		ary_cmstext=ary_cmstext_make;
		ary_cmsstyle=ary_cmsstyle_make;
		
		var getdevjsoncms=getCmsFontJson();
		getdevjsoncms=$.parseJSON(getdevjsoncms);
		$("#tb_cmsfont").bootstrapTable('refreshOptions',{'data':getdevjsoncms.rows});
		
	}
	
	return selectstr;
}

function cmsfontsizeFormatter(value, row, index){
	var selectstr="";
	
	switch(value){
		case 0:
			selectstr="48*48";
			break;
		case 1:
			selectstr="32*32";
			break;
		case 2:
			selectstr="24*24";
			break;
		case 3:
			selectstr="16*16";
			break;
		case 4:
			selectstr="20*20";
			break;
		case 5:
			selectstr="40*40";
			break;
	}
	
	return selectstr;
}

function cmsfontfamilyFormatter(value, row, index){
	var selectstr="";
	
	switch(value){
		case 0:
			selectstr="宋体";
			break;
		case 1:
			selectstr="楷体";
			break;
		case 2:
			selectstr="黑体";
			break;
	}
	
	return selectstr;
}

function cmsfontcolorFormatter(value, row, index){
	var selectstr="";
	
	switch(value){
		case 0:
			selectstr="红色";
			break;
		case 1:
			selectstr="绿色";
			break;
		case 2:
			selectstr="黄色";
			break;
	}
	
	return selectstr;
}

function cmsfontgoFormatter(value, row, index){
	var selectstr="";
	
	switch(value){
		case 0:
			selectstr="直接显示";
			break;
		case 1:
			selectstr="从下往上";
			break;
		case 2:
			selectstr="从上往下";
			break;
		case 3:
			selectstr="从左往右";
			break;
		case 4:
			selectstr="从右往左";
			break;
	}
	
	return selectstr;
}

//火灾应急方案-情报板预留信息
var TableInit_reserveinfo = function() {
	var devjsonreserveinfo=getReserveInfoJson();
	devjsonreserveinfo=$.parseJSON(devjsonreserveinfo);
	
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_reserveinfo').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			data : devjsonreserveinfo.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [
				{
					field : 'reservedelbutton',
					title : '<i class="glyphicon glyphicon-remove"></i>',
					align : 'left',
					width : '20'
					,formatter:'reserveOperationDelFormatter'
				},
				{
					field : 'reservecontent',
					title : '内容',
					align : 'left',
					width : '550'
				}
			],
			onClickCell: function (field, value, row, $element) {
				var infostr_id=row.id;
				var infostr_content=row.reservecontent;
				infostr_content=exReplaceSeperator(infostr_content);
				
				$("#div_editReserveInfo_id").html(infostr_id)
				$("#input_reserveinfo_textarea").val(infostr_content);
			},
			onLoadSuccess : function() { 					
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

function reserveOperationDelFormatter(value, row, index){
	var selectstr="";
	
	selectstr+="<a href=\"javascript:void(0)\" onclick=\"reserveOperationDel("+ row.id +");\"><i class=\"glyphicon glyphicon-remove\"></i></a>";
	
	return selectstr;
}


//火灾应急方案-电视墙
var TableInit_monitorwall = function() {
	var devjsonmonitorwall=getMonitorWallJson();
	devjsonmonitorwall=$.parseJSON(devjsonmonitorwall);
	
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_monitorwall').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			data : devjsonmonitorwall.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [				
				{
					field : 'mwname',
					title : '设备名称',
					align : 'left',
					width : '200'
				},
				{
					field : 'mwaddr',
					title : '桩号',
					align : 'left',
					width : '200'
				},
				{
					field : 'mwstate',
					title : '运行',
					align : 'left',
					width : '100'
					,formatter:'mwstateFormatter'
				},
				{
					field : 'mwi1',
					title : '状态',
					align : 'left',
					width : '100'
					,formatter:'mwi1Formatter'
				},				
				{
					field : 'mwcamno',
					title : '摄像机ID',
					align : 'left',
					width : '200'
				},				
				{
					field : 'mwcamip',
					title : '摄像机IP',
					align : 'left',
					width : '200'
				},				
				{
					field : 'mwcamdevname',
					title : '摄像机名称',
					align : 'left',
					width : '200'
				},
				{
					field : 'mwOperation',
					title : '操作',
					align : 'left',
					width : '100'
					,formatter:'mwOperationFormatter'
				}
			],
			onClickCell: function (field, value, row, $element) {
				
			},
			onLoadSuccess : function() { 					
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

function mwstateFormatter(value, row, index){
	var selectstr="";
	
	switch(parseInt(row.mwstate)){
		case 0:
			selectstr="正常";
			break;
		case 1:
			selectstr="故障";
			break;
		case 2:
			selectstr="异常";
			break;
		default:
			selectstr="正常";
			break;
	}
	
	return selectstr;
}

function mwi1Formatter(value, row, index){
	var selectstr="";
	
	switch(parseInt(row.mwi1)){
		case 0:
			selectstr="正常";
			break;
		case 1:
			selectstr="<div class=\"red\">火警</div>";
			break;
		default:
			selectstr="正常";
			break;
	}
	
	return selectstr;
}

function mwOperationFormatter(value, row, index){
	var selectstr="";
	
	if(row.mwcamno!=""){
		selectstr+="</div>";
		selectstr+="<div class=\"layui-btn layui-btn-normal table-in-button\" ";
		selectstr+="style=\"height:25px;line-height:25px;width:40px;margin:0 5px 0 0;padding:0;\" onclick=\"showBigScreen("+ row.mwcamno +")\">";
		selectstr+="切屏";
		selectstr+="</div>";
	}
	
	return selectstr;
}

//故障设备列表
var TableInit_errorequipment = function() {
	var devjsonerrorequipment=getErrorEquipmentJson("all");
	devjsonerrorequipment=$.parseJSON(devjsonerrorequipment);
	
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#tb_errorequipment').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			data : devjsonerrorequipment.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [				
				{
					field : 'errorequipmentname',
					title : '设备名称',
					align : 'left',
				},
				{
					field : 'errorequipmentaddr',
					title : '桩号',
					align : 'left',
				},
				{
					field : 'equipmenttunnel',
					title : '所属隧道',
					align : 'left',
				},
				{
					field : 'errorequipmenttype',
					title : '设备类型',
					align : 'left',
				}
			],
			onClickCell: function (field, value, row, $element) {
				
			},
			onLoadSuccess : function() { 					
			},
			onLoadError : function() { 
			}
		});
	};
	return oTableInit;
};

//群控-表格
var TableInit_controlgroup = function(str) {
	var devjsonControlGroup=getControlGroupJson(str);
	devjsonControlGroup=$.parseJSON(devjsonControlGroup);
	
	var strid="";
	
	switch(str){
		case "LED":
			strid = "tb_controlgroup_LED";
			break;
		case "FAN":
			strid = "tb_controlgroup_FAN";
			break;
		case "DOOR":
			strid = "tb_controlgroup_DOOR";
			break;
		case "FB":
			strid = "tb_controlgroup_FB";
			break;
		case "TS":
			strid = "tb_controlgroup_TS";
			break;
		case "LS":
			strid = "tb_controlgroup_LS";
			break;
		default:
			strid = "tb_controlgroup_LED";
			break;			
	}
	
	var oTableInit = new Object();
	//初始化Table_light
	oTableInit.Init = function() {
		$('#'+ strid +'').bootstrapTable({
			//url : urls, //请求后台的URL（*）
			data : devjsonControlGroup.rows, 
			method : 'get', //请求方式（*）
			toolbar : '#toolbar', //工具按钮用哪个容器
			striped : true, //是否显示行间隔色
			cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, //是否显示分页（*）
			sortable : false, //是否启用排序
			sortOrder : "asc", //排序方式
			queryParams : oTableInit.queryParams, //传递参数（*）
			sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
			strictSearch : true, //全匹配搜索
			showColumns : false, //是否显示所有的列
			showRefresh : false, //是否显示刷新按钮
			minimumCountColumns : 1, //最少允许的列数
			clickToSelect : true, //是否启用点击选中行			
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			showToggle : false, //是否显示详细视图和列表视图的切换按钮
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			showHeader : true, //列头
			columns : [				
				{
					field : 'equipmentname',
					title : '设备名称',
					align : 'left',
					width : '150'
				},
				{
					field : 'equipmentaddr',
					title : '桩号',
					align : 'left',
					width : '150'
				},
				{
					field : 'equipmenttunnel',
					title : '所属隧道',
					align : 'left',
					width : '100'
				},
				{
					field : 'equipmentupdown',
					title : '上下行',
					align : 'left',
					width : '50'
					,formatter:'fontUpdownFormatter'
				},
				{
					field : 'equipmentstate',
					title : '当前状态',
					align : 'left',
					width : '100'
					,formatter:'fontStateFormatter'
				},
				{
					field : 'operationstr',
					title : '操作',
					align : 'left',
					width : '150'
					,formatter:'controlGroupFormatter'
				},
			],
			onClickCell: function (field, value, row, $element) {

			},
			onLoadSuccess : function() {
			},
			onLoadError : function() {
			}
		});
	};
	return oTableInit;
};

function fontStateFormatter(value, row, index){
	var selectstr="";
	//照明
	switch(row.equipmenttype){
		case "LED":
			switch(parseInt(row.equipmentstate)){
				case -1:
					selectstr="关闭";
					break;
				case 0:
					selectstr="关闭";
					break;
				case 1:
					selectstr="打开";
					break;
				default:
					selectstr="关闭";
					break;
			}
			break;
		case "FAN":
			switch(parseInt(row.equipmentstate)){
				case -1:
					selectstr="停止";
					break;
				case 0:
					selectstr="停止";
					break;
				case 1:
					selectstr="正转";
					break;
				case 2:
					selectstr="反转";
					break;
				default:
					selectstr="停止";
					break;
			}

			break;
		case "DOOR":
			switch(parseInt(row.equipmentstate)){
				case -1:
					selectstr="无";
					break;
				case 0:
					selectstr="上升到位";
					break;
				case 1:
					selectstr="下降到位";
					break;
				case 2:
					selectstr="上升中";
					break;
				case 3:
					selectstr="下降中";
					break;
				default:
					selectstr="上升到位";
					break;
			}
			break;
		case "FB":
			switch(parseInt(row.equipmentstate)){
				case -1:
					selectstr="关闭";
					break;
				case 0:
					selectstr="关闭";
					break;
				case 1:
					selectstr="火警";
					break;
				default:
					selectstr="关闭";
					break;
			}
			break;
		case "TS":
			switch(parseInt(row.equipmentstate)){
				case 0:
					selectstr="双向禁止";
					break;
				case 1:
					selectstr="正向通行";
					break;
				case 2:
					selectstr="正向慢行";
					break;
				case 3:
					selectstr="正向左转";
					break;
				case 4:
					selectstr="反向通行";
					break;
				case 5:
					selectstr="反向慢行";
					break;
				case 6:
					selectstr="反向左转";
					break;
				case -1:
					selectstr="双向禁止";
					break;
				default:
					selectstr="双向禁止";
			}
			break;
		case "LS":
			switch(parseInt(row.equipmentstate)){
				default:
					selectstr="双向禁行";
					break;
				case -1:
					selectstr="双向禁行";
					break;
				case 0:
					selectstr="双向禁行";
					break;
				case 1:
					selectstr="正向通行";
					break;
				case 2:
					selectstr="反向通行";
					break;
				case 3:
					if(row.shape == "5")
					{
						selectstr="正向左转";
					}
					break;
				case 4:
					if(row.shape == "5"){
						selectstr="反向右转";
					}
					break;
			}
			break;
	}

	return selectstr;
}

function controlgroupLEDFormatter(value, row, index){
	var selectstr="";

	switch(parseInt(row.equipmenttype)){
		case "LED":
			selectstr="无操作";
			break;
		default:
			selectstr="无操作";
			break;
	}

	return selectstr;
}

//表格字段通用
//上下行
function fontUpdownFormatter(value, row, index){
	var selectstr="";

	switch(parseInt(row.equipmentupdown)){
		case 0:
			selectstr="上行";
			break;
		case 1:
			selectstr="下行";
			break;
		default:
			selectstr="-";
			break;
	}

	return selectstr;
}

//隧道名称
function fontTunnelNameFormatter(value, row, index){
	var tunnelarray=$("#input_tunnelname").val();
	tunnelarray=tunnelarray.split(",");

	var selectstr="";

	for(var i=0;i<tunnelarray.length;i++){
		if(row.equipmenttunnel==i){
			selectstr=tunnelarray[i];
		}
	}

	return selectstr;
}
//操作
function controlGroupFormatter(value, row, index){
	var selectstr="";

	switch(row.equipmenttype){
		case "LED":
			//照明
			selectstr="<select thisid=\""+ row.id +"\" lay-ignore name=\"table_select_led[]\" class=\"table-in-select  table_select_group_led\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			switch(parseInt(row.equipmentstate)){
				case 0:
					selectstr+="<option value=\"2\" name=\"打开\" avalue=\"1\">打开</option>";
					break;
				case 1:
					selectstr+="<option value=\"1\" name=\"关闭\" avalue=\"0\">关闭</option>";
					break;
				default:
					selectstr+="<option value=\"1\" name=\"关闭\" avalue=\"0\">关闭</option>";
					selectstr+="<option value=\"2\" name=\"打开\" avalue=\"1\">打开</option>";
					break;
			}

			selectstr+="</select>";
			break;
		case "FAN":
			//风机
			selectstr="<select thisid=\""+ row.id +"\" groupid=\""+ row.groupid +"\"  lay-ignore name=\"table_select_fan[]\" class=\"table-in-select table_select_group_fan\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			switch(parseInt(row.equipmentstate)){
				case 0:
					selectstr+="<option value=\"1\" name=\"正转\" avalue=\"1\">正转</option>";
					selectstr+="<option value=\"2\" name=\"反转\" avalue=\"2\">反转</option>";
					break;
				case 1:
					selectstr+="<option value=\"0\" name=\"关闭\" avalue=\"0\">关闭</option>";
					selectstr+="<option value=\"2\" name=\"反转\" avalue=\"2\">反转</option>";
					break;
				case 2:
					selectstr+="<option value=\"0\" name=\"关闭\" avalue=\"0\">关闭</option>";
					selectstr+="<option value=\"1\" name=\"正转\" avalue=\"1\">正转</option>";
					break;
				default:
					selectstr+="<option value=\"0\" name=\"关闭\" avalue=\"0\">关闭</option>";
					selectstr+="<option value=\"1\" name=\"打开\" avalue=\"1\">打开</option>";
					selectstr+="<option value=\"2\" name=\"反转\" avalue=\"2\">反转</option>";
					break;
			}
			selectstr+="</select>";
			break;
		case "DOOR":
			//车横
			selectstr="<select thisid=\""+ row.id +"\" lay-ignore name=\"table_select_door[]\" class=\"table-in-select    table_select_group_door\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			switch(parseInt(row.equipmentstate)){
				case 0:
					selectstr+="<option value=\"1\" name=\"下降到位\" avalue=\"1\">下降到位</option>";
					selectstr+="<option value=\"2\" name=\"上升中\" avalue=\"2\">上升中</option>";
					selectstr+="<option value=\"3\" name=\"下降中\" avalue=\"3\">下降中</option>";
					break;
				case 1:
					selectstr+="<option value=\"0\" name=\"上升到位\" avalue=\"0\">上升到位</option>";
					selectstr+="<option value=\"2\" name=\"上升中\" avalue=\"2\">上升中</option>";
					selectstr+="<option value=\"3\" name=\"下降中\" avalue=\"3\">下降中</option>";
					break;
				case 2:
					selectstr+="<option value=\"0\" name=\"上升到位\" avalue=\"0\">上升到位</option>";
					selectstr+="<option value=\"1\" name=\"下降到位\" avalue=\"1\">下降到位</option>";
					selectstr+="<option value=\"3\" name=\"下降中\" avalue=\"3\">下降中</option>";
					break;
				case 3:
					selectstr+="<option value=\"0\" name=\"上升到位\" avalue=\"0\">上升到位</option>";
					selectstr+="<option value=\"1\" name=\"下降到位\" avalue=\"1\">下降到位</option>";
					selectstr+="<option value=\"2\" name=\"上升中\" avalue=\"2\">上升中</option>";
					break;
				default:
					selectstr+="<option value=\"0\" name=\"上升到位\" avalue=\"0\">上升到位</option>";
					selectstr+="<option value=\"1\" name=\"下降到位\" avalue=\"1\">下降到位</option>";
					selectstr+="<option value=\"2\" name=\"上升中\" avalue=\"2\">上升中</option>";
					selectstr+="<option value=\"3\" name=\"下降中\" avalue=\"3\">下降中</option>";
					break;
			}

			selectstr+="</select>";
			break;
		case "FB":
			//手报
			selectstr="<select thisid=\""+ row.id +"\" lay-ignore name=\"table_select_sb[]\" class=\"table-in-select    table_select_group_sb\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			switch(parseInt(row.equipmentstate)){
				case 0:
					selectstr+="<option value=\"2\" name=\"火警\" avalue=\"1\">火警</option>";
					break;
				case 1:
					selectstr+="<option value=\"1\" name=\"关闭\" avalue=\"0\">关闭</option>";
					break;
				default:
					selectstr+="<option value=\"1\" name=\"关闭\" avalue=\"0\">关闭</option>";
					selectstr+="<option value=\"2\" name=\"火警\" avalue=\"1\">火警</option>";
					break;
			}
			selectstr+="</select>";
			break;
		case "TS":
			//交通信号灯
			selectstr="<select thisid=\""+ row.id +"\" lay-ignore name=\"table_select_ts[]\" class=\"table-in-select    table_select_group_ts\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";

			switch(parseInt(row.equipmentstate)){
				case 0:
					selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
					selectstr+="<option value=\"2\" name=\"正向慢行\" avalue=\"2\">正向慢行</option>";
					selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					selectstr+="<option value=\"4\" name=\"反向通行\" avalue=\"4\">反向通行</option>";
					selectstr+="<option value=\"5\" name=\"反向慢行\" avalue=\"5\">反向慢行</option>";
					selectstr+="<option value=\"6\" name=\"反向右转\" avalue=\"6\">反向右转</option>";
					break;
				case 1:
					selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
					selectstr+="<option value=\"2\" name=\"正向慢行\" avalue=\"2\">正向慢行</option>";
					selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					selectstr+="<option value=\"4\" name=\"反向通行\" avalue=\"4\">反向通行</option>";
					selectstr+="<option value=\"5\" name=\"反向慢行\" avalue=\"5\">反向慢行</option>";
					selectstr+="<option value=\"6\" name=\"反向右转\" avalue=\"6\">反向右转</option>";
					break;
				case 2:
					selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
					selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
					selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					selectstr+="<option value=\"4\" name=\"反向通行\" avalue=\"4\">反向通行</option>";
					selectstr+="<option value=\"5\" name=\"反向慢行\" avalue=\"5\">反向慢行</option>";
					selectstr+="<option value=\"6\" name=\"反向右转\" avalue=\"6\">反向右转</option>";
					break;
				case 3:
					selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
					selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
					selectstr+="<option value=\"2\" name=\"正向慢行\" avalue=\"2\">正向慢行</option>";
					selectstr+="<option value=\"4\" name=\"反向通行\" avalue=\"4\">反向通行</option>";
					selectstr+="<option value=\"5\" name=\"反向慢行\" avalue=\"5\">反向慢行</option>";
					selectstr+="<option value=\"6\" name=\"反向右转\" avalue=\"6\">反向右转</option>";
					break;
				case 4:
					selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
					selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
					selectstr+="<option value=\"2\" name=\"正向慢行\" avalue=\"2\">正向慢行</option>";
					selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					selectstr+="<option value=\"5\" name=\"反向慢行\" avalue=\"5\">反向慢行</option>";
					selectstr+="<option value=\"6\" name=\"反向右转\" avalue=\"6\">反向右转</option>";
					break;
				case 5:
					selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
					selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
					selectstr+="<option value=\"2\" name=\"正向慢行\" avalue=\"2\">正向慢行</option>";
					selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					selectstr+="<option value=\"4\" name=\"反向通行\" avalue=\"4\">反向通行</option>";
					selectstr+="<option value=\"6\" name=\"反向右转\" avalue=\"6\">反向右转</option>";
					break;
				case 6:
					selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
					selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
					selectstr+="<option value=\"2\" name=\"正向慢行\" avalue=\"2\">正向慢行</option>";
					selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					selectstr+="<option value=\"4\" name=\"反向通行\" avalue=\"4\">反向通行</option>";
					selectstr+="<option value=\"5\" name=\"反向慢行\" avalue=\"5\">反向慢行</option>";
					break;
				default:
					selectstr+="<option value=\"0\" name=\"双向禁止\" avalue=\"0\">双向禁止</option>";
					selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
					selectstr+="<option value=\"2\" name=\"正向慢行\" avalue=\"2\">正向慢行</option>";
					selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					selectstr+="<option value=\"4\" name=\"反向通行\" avalue=\"4\">反向通行</option>";
					selectstr+="<option value=\"5\" name=\"反向慢行\" avalue=\"5\">反向慢行</option>";
					selectstr+="<option value=\"6\" name=\"反向右转\" avalue=\"6\">反向右转</option>";
					break;
			}
			selectstr+="</select>";
			break;
		case "LS":
			//交通指示器
			selectstr="<select thisid=\""+ row.id +"\" lay-ignore name=\"table_select_ls[]\" class=\"table-in-select table_select_group_ls\">";
			selectstr+="<option value=\"0\" avalue=\"-1\">无操作</option>";
			// switch(parseInt(row.equipmentstate)){
			// 	case 0:
			// 		if(row.shape == "5") {
			// 			selectstr += "<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
			// 			selectstr += "<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
			// 			selectstr += "<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
			// 			selectstr += "<option value=\"4\" name=\"双向禁行\" avalue=\"4\">反向右转</option>";
			// 		}else {
			// 			selectstr += "<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
			// 			selectstr += "<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
			// 		}
			// 			break;
			// 	case 1:
			// 		selectstr+="<option value=\"0\" name=\"双向禁行\" avalue=\"0\">双向禁行</option>";
			// 		selectstr+="<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
			// 		selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
			// 		selectstr+="<option value=\"4\" name=\"双向禁行\" avalue=\"4\">反向右转</option>";
			// 		break;
			// 	case 2:
			// 		selectstr+="<option value=\"0\" name=\"双向禁行\" avalue=\"0\">双向禁行</option>";
			// 		selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
			// 		selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
			// 		selectstr+="<option value=\"4\" name=\"双向禁行\" avalue=\"4\">反向右转</option>";
			// 		break;
			// 	case 3:
			// 		selectstr+="<option value=\"0\" name=\"双向禁行\" avalue=\"0\">双向禁行</option>";
			// 		selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
			// 		selectstr+="<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
			// 		selectstr+="<option value=\"4\" name=\"双向禁行\" avalue=\"4\">反向右转</option>";
			// 		break;
			// 	case 4:
			// 		selectstr+="<option value=\"0\" name=\"双向禁行\" avalue=\"0\">双向禁行</option>";
			// 		selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
			// 		selectstr+="<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
			// 		selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
			// 		break;
			// 	default:
			// 		selectstr+="<option value=\"0\" name=\"双向禁行\" avalue=\"0\">双向禁行</option>";
			// 		selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
			// 		selectstr+="<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
			// 		selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
			// 		selectstr+="<option value=\"4\" name=\"双向禁行\" avalue=\"4\">反向右转</option>";
			// 		break;
			// }
			if(parseInt(row.equipmentstate) != "default"){
				if (parseInt(row.equipmentstate) != 0) {
					selectstr += "<option value=\"0\" name=\"双向禁行\" avalue=\"0\">双向禁行</option>";
				}
				if (parseInt(row.equipmentstate) != 1) {
					selectstr += "<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
				}
				if (parseInt(row.equipmentstate) != 2) {
					selectstr += "<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
				}
				if(row.shape == "5") {
					if(parseInt(row.equipmentstate) != 3) selectstr += "<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
					if(parseInt(row.equipmentstate) != 4) selectstr += "<option value=\"4\" name=\"双向禁行\" avalue=\"4\">反向右转</option>";
				}
			 }else{
				selectstr+="<option value=\"0\" name=\"双向禁行\" avalue=\"0\">双向禁行</option>";
				selectstr+="<option value=\"1\" name=\"正向通行\" avalue=\"1\">正向通行</option>";
				selectstr+="<option value=\"2\" name=\"双向禁行\" avalue=\"2\">反向通行</option>";
				selectstr+="<option value=\"3\" name=\"正向左转\" avalue=\"3\">正向左转</option>";
				selectstr+="<option value=\"4\" name=\"双向禁行\" avalue=\"4\">反向右转</option>";
			}
			selectstr+="</select>";
			break;
		default:
			selectstr="-";
			break;
	}
	
	return selectstr;
}