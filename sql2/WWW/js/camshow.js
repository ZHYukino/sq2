
/*单IP摄像机start*/
//单IP摄像机
function getCameraHtml(sObjdownid,sObjid,sObjpanelid,ipaddr,ipport){
	shtml="";
	
	shtml+="<div class=\"camera-win\">";
	shtml+="<div id=\""+ sObjdownid +"\" class=\"tv-download\" style=\"display:none\" ><a class=\"layui-btn layui-btn-danger\" href=\"download\\webplugin.exe\" download=\"download\\webplugin.exe\">点击下载控件!</a></div>";	
	
	if(ietype==0){
		shtml += "<object  id='" + sObjid + "' class=\"tv-obj\" VideoWindTextColor='9c9c9c' VideoWindBarColor='414141' classid=\"CLSID:ED1EDBF5-CCC7-4171-A559-6578BD6D3002\" data='data:application/x-oleobject;' width='635px' height='300px' hspace='0' vspace='0' align='middle' style=\"display:block\" ></object>";
	}else{
		shtml += "<object id='" + sObjid + "' class=\"tv-obj\" type='application/media-plugin-version-3.0.0.2' VideoWindTextColor='9c9c9c' VideoWindBarColor='414141' name='ocxdh' width='635px' height='300px' hspace='0' vspace='0' align='middle' style='display:block'/></object>";
	}
	
	shtml+="<div id=\""+ sObjpanelid +"\" class=\"tv-panle\" style=\"display:block\"></div>";//遮罩
	
	shtml+="<div id=\"tv_control_panel\">";
	shtml+="<div id=\"tv_control\">";
	
	//八方向键
	var upnum="Up";
	var downnum="Down";
	var leftnum="Left";
	var rightnum="Right";
	
	var leftupnum="LeftUp";
	var leftdownnum="LeftDown";
	var rightupnum="RightUp";
	var rightdownnum="RightDown";
	
	//镜头变化
	var zoomupnum="ZoomWide";
	var zoomdownnum="ZoomTele";
	
	var focusupnnum="FocusFar";
	var focusdownnum="FocusNear";
	
	var irisupnum="IrisSmall";
	var irisdownnum="IrisLarge";
	
	//$(this).attr('data-direction')
	shtml+="<div id=\"tv_upleft\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt1.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt11.jpg)');\" onMouseDown=\"PTZ_Start('"+ leftupnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ leftupnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div id=\"tv_up\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt2.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.jpg)');\" onMouseDown=\"PTZ_Start('"+ upnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ upnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div id=\"tv_upright\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt3.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt31.jpg)');\" onMouseDown=\"PTZ_Start('"+ rightupnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ rightupnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div id=\"tv_left\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt4.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt41.jpg)');\" onMouseDown=\"PTZ_Start('"+ leftnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ leftnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div id=\"tv_center\" class=\"tv-control-button\"></div>";
	shtml+="<div id=\"tv_right\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt6.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt61.jpg)');\" onMouseDown=\"PTZ_Start('"+ rightnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ rightnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div id=\"tv_downleft\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt7.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt71.jpg)');\" onMouseDown=\"PTZ_Start('"+ leftdownnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ leftdownnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div id=\"tv_down\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt8.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt81.jpg)');\" onMouseDown=\"PTZ_Start('"+ downnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ downnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div id=\"tv_downright\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt9.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt91.jpg)');\" onMouseDown=\"PTZ_Start('"+ rightdownnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ rightdownnum +"','"+ ipaddr +"')\"></div>";
	shtml+="</div>";
	shtml+="<div id=\"tv_vice_control\">";
	shtml+="<div class=\"tv-vice-control\">";
	shtml+="<div id=\"tv_zoomup\" class=\"tv-control-button tv-zoomup\" onMouseOut=\"$(this).css('background','url(../img/yt11.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.gif)');\" onMouseDown=\"PTZ_Start('"+ zoomupnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ zoomupnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div>变倍</div>";
	shtml+="<div id=\"tv_zoomdown\" class=\"tv-control-button tv-zoomdown\" onMouseOut=\"$(this).css('background','url(../img/yt12.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt22.gif)');\" onMouseDown=\"PTZ_Start('"+ zoomdownnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ zoomdownnum +"','"+ipaddr+"')\"></div>";
	shtml+="</div>";
	shtml+="<div class=\"tv-vice-control\">";
	shtml+="<div id=\"tv_focusingup\" class=\"tv-control-button tv-zoomup\" onMouseOut=\"$(this).css('background','url(../img/yt11.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.gif)');\" onMouseDown=\"PTZ_Start('"+ focusupnnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ focusupnnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div>聚焦</div>";
	shtml+="<div id=\"tv_focusingdown\" class=\"tv-control-button tv-zoomdown\" onMouseOut=\"$(this).css('background','url(../img/yt12.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt22.gif)');\" onMouseDown=\"PTZ_Start('"+ focusdownnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ focusdownnum +"','"+ ipaddr +"')\"></div>";
	shtml+="</div>";
	shtml+="<div class=\"tv-vice-control\">";
	shtml+="<div id=\"tv_apertureup\" class=\"tv-control-button tv-zoomup\" onMouseOut=\"$(this).css('background','url(../img/yt11.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.gif)');\" onMouseDown=\"PTZ_Start('"+ irisupnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ irisupnum +"','"+ ipaddr +"')\"></div>";
	shtml+="<div>光圈</div>";
	shtml+="<div id=\"tv_aperturedown\" class=\"tv-control-button tv-zoomdown\" onMouseOut=\"$(this).css('background','url(../img/yt12.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt22.gif)');\" onMouseDown=\"PTZ_Start('"+ irisdownnum +"','"+ ipaddr +"')\" onMouseUp=\"PTZ_Stop('"+ irisdownnum +"','"+ ipaddr +"')\"></div>";
	shtml+="</div>";
	shtml+="</div>";
	shtml+="<div id=\"tv_vice_control_other\">";
	//shtml+="<div class=\"layui-btn layui-btn-primary tv-layui-style\" onclick=\"PTZ_FullScreen();\"><i title=\"全屏\" class=\"glyphicon glyphicon-fullscreen\"></i></div>"
	shtml+="</div>";
	shtml+="</div>";
	shtml+="</div>";
	
	return shtml;
}


function setCameraobj(sid,title,ipaddr,ipport,ipchannel){//点击摄像机事件
	var paneltv;                         //计时
	var sObjdownid = "ocxdown" + sid;    //下载
	var sObjid = "ocx" + sid++;          //影片
	var sObjpanelid="ocxpanle" + sid++;  //遮罩

	if (!ipchannel||ipchannel=="") {
		ipchannel=0;
	}

	sthml="";
	shtml=getCameraHtml(sObjdownid,sObjid,sObjpanelid,ipaddr,ipport);
		
	layer.open({
		type: 1 //此处以iframe举例
		,title: "<i class=\"glyphicon glyphicon-facetime-video\"></i>&nbsp;&nbsp;"+title
		,area: ['635px', '462px']
		,shade: 0
		,maxmin: false
		,offset: [Ht+10]
		,resize:false
		,id: 'LAY_CAM' //防止重复弹出
		,content: shtml//s2
		//,btn: ['关闭'] //只是为了演示
		,cancel: function(index, layero){
			clearTimeout(paneltv);
			document.getElementById(sObjid).style.display="none";//隐藏
			$("#"+ sObjid +"").html("");
			$("#ptz_objid").html("");
		    layer.close(index);
		  	
			try{
				if(bLogin == 1){
					clearTimeout(objpanel);
					
					Logoutclick(ipaddr);
					var ocx =document.getElementById(sObjid);//.object，不支持JQ					
					ocx.DisConnectRealVideo(ipchannel);
					ocx.LogoutDevice();			
					
					bLogin=0;
				}
			}catch(e){
			}
									  
		}
		
		,zIndex: layer.zIndex 
		,success: function(layero){
		    layer.setTop(layero); 
			
		    $("#ptz_objid").html(sObjid);//objid
			document.getElementById(sObjid).style.top="-500px";			
			
			panletv=setTimeout(function(){			  
		       if(ietype==0)
				{
					try{
						var obj=new ActiveXObject("WebActiveX.Plugin.3.0.0.2");				
					}
					catch(e){
						document.getElementById(sObjpanelid).style.display="none";//显示,加载内存只能用JS
						document.getElementById(sObjdownid).style.display="block";//显示
						document.getElementById(sObjid).style.display="none";//隐藏
					}
					
			   }else{
					try{
						navigator.plugins.refresh(false);
						obj = navigator.mimeTypes["application/media-plugin-version-3.0.0.2"];
						if (!(obj && obj.enabledPlugin))
						{					
							document.getElementById(sObjpanelid).style.display="none";//显示,加载内存只能用JS
							document.getElementById(sObjdownid).style.display="block";//显示
							document.getElementById(sObjid).style.display="none";//隐藏
						}
					}
					catch(e){
					}					
			   }
			   
			   var ocx =document.getElementById(sObjid);//.object，不支持JQ		
			   ocx.LoginDeviceEx(ipaddr,80,"admin","admin", 4);//其实无返回 parseInt(sPort)
			   ocx.SetModuleMode(3);
			   crv_value=ocx.ConnectRealVideo(0 ,2);//parseInt(ipchannel)
			   			   
			   if(crv_value!=0){
				   Login1click(ipaddr);
				   
				   bLogin = 1;//开启正常时的关闭
				   
				   //正常了才显示出来
					var objpanel=setTimeout(function(){
						document.getElementById(sObjid).style.top="0";
					},500)
				   
					
			   }else{
				   document.getElementById(sObjpanelid).style.display="block";//显示
				   document.getElementById(sObjdownid).style.display="none";//隐藏
				   document.getElementById(sObjid).style.display="none";//隐藏
				
				   sendScreenMSG(msg_connectfail);
			   }
			  
		   },300)
			
		}
	});
}

/*单IP摄像机登录 start*/
function Login1click(sip){	//登录第一步
	try{
		$.ajax( {  
			url: '/json/rpc.asp?ip=' + sip,// 跳转到 action  
			data: JSON.stringify({"method":"global.login","params":{"userName":"admin","password":"","clientType":"Web3.0"},"id":10000}),  
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {  
				if (mydata) {
					//var a = data.error.code;
					//if (a == 401) {
						
					//}	  
					var md5 = CalcMd5(mydata.params.random,mydata.params.realm,"admin","admin");
					var ptz_id = 0;
					var i = ar_Camera.push(new Array(sip,mydata.session,md5,ptz_id));
					Login2click(sip,mydata.session,md5);
				}
			},  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
			
		});
	}catch(e){
		sendScreenMSG(msg_connectfail);
	}
}

function Login2click(sip,sessionval,md5){  //登录第二步
	try{
		var a = {"method":"global.login","session":parseInt(sessionval),"params":{"userName":"admin","password":md5,"clientType":"Web3.0"},"id":10000};
		$.ajax( {  
			url: '/json/rpc.asp?ip=' + sip + '&id=' + sessionval,// 跳转到 action    
			data:JSON.stringify(a),
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {  
				if (mydata) {
					if (mydata.result == true){
						intervalProcess = setInterval("KeepAlive()", 30000);
					}
				}
			},  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	}catch(e){
		sendScreenMSG(msg_connectfail);
	}
}

function Logoutclick(sip){		//注销
	try{
		var sessionval = '';
		for (var i=0;i<ar_Camera.length;i++){
			if (ar_Camera[i][0] == sip){
				sessionval = ar_Camera[i][1];
			}
		}
		
		var a = {"method" : "global.logout","params" : null,"session":parseInt(sessionval),"id" : 10001};	
		$.ajax( {  
			url: '/json/rpc2.asp?ip=' + sip + '&id=' + sessionval,// 跳转到 action  
			data:JSON.stringify(a),
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			 }
		});
		clearInterval(intervalProcess);
	}catch(e){
	}
}

function KeepAlive(){ 		///------------------会话保持
	var a = '';
	for (var i=0;i<ar_Camera.length;i++){	
		a = {"method":"global.keepAlive","params":{"timeout": 300},"session":parseInt(ar_Camera[i][1]),"id":ar_Camera[i][3]};	
		$.ajax( {  
		    url: '/json/rpc2.asp?ip=' + ar_Camera[i][0] + '&id=' + ar_Camera[i][1],// 跳转到 action  
		    data:JSON.stringify(a),
		    type:'post',  
		    contentType: "application/x-www-form-urlencoded",
		    cache:false,
		    //async : false, //默认为true 异步    
		    dataType:'json',  //json
		    success:function(mydata) {  
		     },  
		    error : function(XMLHttpRequest, textStatus, errorThrown) {
		     }
		});	
		ar_Camera[i][3]++;
	}
}
/*单IP摄像机登录 end*/

/*云台控制 start*/
function PTZ_Start(x,sip){		//PTZ启动
	var c = 4;
	//var b = parseInt($("#sessionID").val());	
	var cid = -1;
	for (var i=0;i<ar_Camera.length;i++){
		if (ar_Camera[i][0] == sip){
			var cid = i;
		}
	}	
	if (cid == -1){

		return;
	}
		
	var a = {"method" : "ptz.start", "session":ar_Camera[cid][1],"params" : {"channel" : 0, "code" : x,"arg1" : c,"arg2" : c,"arg3" : 0},"id" : ar_Camera[cid][3]};	//parseInt(ipchannel)
	$.ajax( {  
	    url: '/json/rpc2.asp?ip=' + sip + '&id=' + ar_Camera[cid][1],// 跳转到 action  
	    data:JSON.stringify(a),
	    type:'post',  
	    contentType: "application/x-www-form-urlencoded",
	    cache:false,
	    //async : false, //默认为true 异步    
	    dataType:'json',  //json
	    success:function(mydata) {  
	     },  
	    error : function(XMLHttpRequest, textStatus, errorThrown) {
	     }
	});
	ar_Camera[cid][3]++;
}

function PTZ_Stop(x,sip){		//PTZ停止
	var c = 4;
	//var b = parseInt($("#sessionID").val());	
	var cid = -1;
	for (var i=0;i<ar_Camera.length;i++){
		if (ar_Camera[i][0] == sip){
			var cid = i;
		}
	}	
	if (cid == -1){
		return;
	}		
	var a = {"method" : "ptz.stop", "session":ar_Camera[cid][1],"params" : {"channel" : 0, "code" : x,"arg1" : c,"arg2" : c,"arg3" : 0},"id" : ar_Camera[cid][3]};	//parseInt(ipchannel)
	$.ajax( {  
	    url: '/json/rpc2.asp?ip=' + sip + '&id=' + ar_Camera[cid][1],// 跳转到 action  
	    data:JSON.stringify(a),
	    type:'post',  
	    contentType: "application/x-www-form-urlencoded",
	    cache:false,
	    //async : false, //默认为true 异步    
	    dataType:'json',  //json
	    success:function(mydata) {  
	     },  
	    error : function(XMLHttpRequest, textStatus, errorThrown) {
	     }
	});
	ar_Camera[cid][3]++;
}
/*云台控制 end*/
/*单IP摄像机 end*/

/*16路摄像机无云台控制 start*/
//16路摄像机
function getCameraHtmlEx(sObjdownid,sObjid,sObjpanelid,ipaddr,ipport){
	shtml="";
	
	shtml+="<div class=\"camera-win\">";
	shtml+="<div id=\""+ sObjdownid +"\" class=\"tv-download\" style=\"display:none\" ><a class=\"layui-btn layui-btn-danger\" href=\"download\\webpluginmoni.exe\" download=\"download\\webpluginmoni.exe\">点击下载控件!</a></div>";
	
	if(ietype==0){
		shtml+="<object id='" + sObjid + "' class=\"tv-obj\" classid='CLSID:7F9063B6-E081-49DB-9FEC-D72422F2727F' data='data:application/x-oleobject;' VideoWindTextColor='9c9c9c' VideoWindBarColor='414141' name='ocxdh' width='635px' height='300px' hspace='0' vspace='0' align='middle' style=\"display:block\"/></object>";
	}else{
		shtml+="<object id='" + sObjid + "' class=\"tv-obj\" type='application/media-plugin-version-3.1.0.2' VideoWindTextColor='9c9c9c' VideoWindBarColor='414141' name='ocxdh' width='635px' height='300px' hspace='0' vspace='0' align='middle' style='display:block;position:absolute;top: 0px;z-index:50;'/><param name=\"allowFullScreen\" value=\"true\"><param name=\"wmode\" value=\"opaque\"></object>";
	}
	
	shtml+="<div id=\""+ sObjpanelid +"\" class=\"tv-panle\" style=\"display:block\"></div>";
	
	shtml+="</div>";
	
	return shtml;
}

//点击16路摄像机事件
function setCameraobjEx(sid,title,ipaddr,ipport,ipchannel){	
	var paneltv;                         //计时
	var sObjdownid = "ocxdown" + sid;    //下载
	var sObjid = "ocx" + sid++;          //影片
	var sObjpanelid="ocxpanle" + sid++;  //遮罩
	
	if (!ipchannel||ipchannel=="") {
		ipchannel=0;
	}

	sthml="";
	shtml=getCameraHtmlEx(sObjdownid,sObjid,sObjpanelid,ipaddr,ipport);
		
	layer.open({
		type: 1 //此处以iframe举例
		,title: "<i class=\"glyphicon glyphicon-facetime-video\"></i>&nbsp;&nbsp;"+title
		,area: ['635px', '342px']
		,shade: 0
		,maxmin: false
		,offset: [Ht+10]
		,resize:false
		,id: 'LAY_CAM' //防止重复弹出
		,content: shtml//s2
		//,btn: ['关闭'] //只是为了演示
		,cancel: function(index, layero){
			clearTimeout(paneltv);
			document.getElementById(sObjid).style.display="none";//隐藏
			$("#"+ sObjid +"").html("");
			$("#ptz_objid").html("");
		    layer.close(index);
		  	
			try{
				if(bLogin == 1){
					clearTimeout(objpanel);
					
					LogoutclickEx(ipaddr);
					var ocx =document.getElementById(sObjid);//.object，不支持JQ					
					ocx.DisConnectRealVideo(ipchannel);
					ocx.LogoutDevice();			
					
					bLogin=0;
				}
			}catch(e){
			}									  
		}		
		,zIndex: layer.zIndex 
		,success: function(layero){
		    layer.setTop(layero); 
		    $("#ptz_objid").html(sObjid);//objid
			document.getElementById(sObjid).style.top="-500px";
			
			panletv=setTimeout(function(){
			   
		       if(ietype==0)
				{
					try{
						var obj=new ActiveXObject("WebActiveEXE.Plugin.1");					
					}
					catch(e){
						document.getElementById(sObjpanelid).style.display="none";//显示,加载内存只能用JS
						document.getElementById(sObjdownid).style.display="block";//显示
						document.getElementById(sObjid).style.display="none";//隐藏
					}
					
			   }else{
					try{
						navigator.plugins.refresh(false);
						obj = navigator.mimeTypes["application/media-plugin-version-3.1.0.2"];
						if (!(obj && obj.enabledPlugin))
						{					
							document.getElementById(sObjpanelid).style.display="none";//显示,加载内存只能用JS
							document.getElementById(sObjdownid).style.display="block";//显示
							document.getElementById(sObjid).style.display="none";//隐藏
						}
					}
					catch(e){
					}					
			   }
			   		
			   var ocx =document.getElementById(sObjid);//.object，不支持JQ		
			   ocx.LoginDeviceEx(ipaddr,37777,"admin","admin", 0);
			   ocx.SetModuleMode(3);
			   ocx.SetWinBindedChannel(1, 0, 0, 0);
			   crv_value=ocx.ConnectRealVideo(parseInt(ipchannel) ,1);
			   			   
			   if(crv_value!=0){
				   Login1clickEx(ipaddr);
				   bLogin = 1;
				   
				   //正常了才显示出来
					var objpanel=setTimeout(function(){
						document.getElementById(sObjid).style.top="0";
					},500)
			   }else{
					document.getElementById(sObjpanelid).style.display="block";//显示
				    document.getElementById(sObjdownid).style.display="none";//隐藏
				    document.getElementById(sObjid).style.display="none";//隐藏
				
				    sendScreenMSG(msg_connectfail);
			   }
			  
		   },300)
			
		}
	});
}

/*16路摄像机登录注销 start*/
function Login1clickEx(sip){	//登录第一步
	try{
		$.ajax( {  
			url: '/json/rpcx1.asp?ip=' +sip,// 跳转到 action   
			data: JSON.stringify({"method":"global.login","params":{"userName":"admin","password":"","clientType":"Dahua3.0-Web3.0"},"id":1}),  
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {  
				if (mydata) {
					//var a = mydata.error.code;
					//if (a == 268632079) {						
					//}	 
					var md5=CalcPassMd5("admin")//"6QNMIQGe";
					var ptz_id = 5;
					var i = ar_CameraEx.push(new Array(sip,mydata.session,md5,ptz_id));
					
					Login2clickEx(sip,mydata.session,md5);       
			  	}
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			 }
		});
	}catch(e){
		sendScreenMSG(msg_connectfail);
	}
}

function Login2clickEx(sip,sessionval,md5){  //登录第二步
	try{
		var a = {"method":"global.login","params":{"userName":"admin","password":md5,"clientType":"Dahua3.0-Web3.0","authorityType":"OldDigest"},"id":2,"session":sessionval};//parseInt()
		$.ajax( {  
			url: '/json/rpcx1.asp?ip=' + sip + '&id=' + sessionval,// 跳转到 action    可能得改为RPC2
			data:JSON.stringify(a),
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {
				if (mydata.result){
					intervalProcessEx = setInterval("KeepAliveEx()", 30000);
				}
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			 }
		});
	}catch(e){
		sendScreenMSG(msg_connectfail);
	}
}

function LogoutclickEx(sip){		//注销	
	try{	
		var sessionval = '';
		for (var i=0;i<ar_CameraEx.length;i++){
			if (ar_CameraEx[i][0] == sip){
				sessionval = ar_CameraEx[i][1];
			}
		}
	
		var a = {"method" : "global.logout","params" : null,"session":sessionval,"id" : 11};	
		$.ajax( {  
			url: '/json/rpcx2.asp?ip=' + sip + '&id=' + sessionval,// 跳转到 action  
			data:JSON.stringify(a),
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) { 
			},  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
		clearInterval(intervalProcessEx);
	}catch(e){
	}
}

function KeepAliveEx(){ 		///------------------会话保持
	var a = '';
	for (var i=0;i<ar_CameraEx.length;i++){	
		a = {"method":"global.keepAlive","params":{"timeout": 300},"session":parseInt(ar_CameraEx[i][1]),"id":ar_CameraEx[i][3]};	
		$.ajax( {  
		    url: '/json/rpcx3.asp?ip=' + ar_CameraEx[i][0] + '&id=' + ar_CameraEx[i][1],// 跳转到 action  
		    data:JSON.stringify(a),
		    type:'post',  
		    contentType: "application/x-www-form-urlencoded",
		    cache:false,
		    //async : false, //默认为true 异步    
		    dataType:'json',  //json
		    success:function(mydata) {  
		    },  
		    error : function(XMLHttpRequest, textStatus, errorThrown) {
		    }
		});	
		ar_CameraEx[i][3]++;
	}
}
/*16路摄像机登录注销 end*/
/*16路摄像机无云台控制end*/


/*16路摄像机有云台控制 start*/
//16路摄像机有云台
function getCameraHtmlCT(sObjdownid,sObjid,sObjpanelid,ipaddr,ipport,ipchannel){
	shtml="";
	
	shtml+="<div class=\"camera-win\">";
	shtml+="<div id=\""+ sObjdownid +"\" class=\"tv-download\" style=\"display:none\" ><a class=\"layui-btn layui-btn-danger\" href=\"download\\webpluginmoni.exe\" download=\"download\\webpluginmoni.exe\">点击下载控件!</a></div>";
	
	if(ietype==0){
		shtml+="<object id='" + sObjid + "' class=\"tv-obj\" classid='CLSID:7F9063B6-E081-49DB-9FEC-D72422F2727F' data='data:application/x-oleobject;' VideoWindTextColor='9c9c9c' VideoWindBarColor='414141' name='ocxdh' width='635px' height='300px' hspace='0' vspace='0' align='middle' style=\"display:block\"/></object>";
	}else{
		shtml+="<object id='" + sObjid + "' class=\"tv-obj\" type='application/media-plugin-version-3.1.0.2' VideoWindTextColor='9c9c9c' VideoWindBarColor='414141' name='ocxdh' width='635px' height='300px' hspace='0' vspace='0' align='middle' style='display:block;position:absolute;top: 0px;z-index:50;'/><param name=\"allowFullScreen\" value=\"true\"><param name=\"wmode\" value=\"opaque\"></object>";
	}
	
	shtml+="<div id=\""+ sObjpanelid +"\" class=\"tv-panle\" style=\"display:block\"></div>";
	
	shtml+="<div id=\"tv_control_panel\">";
	shtml+="<div id=\"tv_control\">";
	
	//八方向键
	var upnum="Up";
	var downnum="Down";
	var leftnum="Left";
	var rightnum="Right";
	
	var leftupnum="LeftUp";
	var leftdownnum="LeftDown";
	var rightupnum="RightUp";
	var rightdownnum="RightDown";
	
	//镜头变化
	var zoomupnum="ZoomWide";
	var zoomdownnum="ZoomTele";
	
	var focusupnnum="FocusFar";
	var focusdownnum="FocusNear";
	
	var irisupnum="IrisSmall";
	var irisdownnum="IrisLarge";
	
	//$(this).attr('data-direction')
	shtml+="<div id=\"tv_upleft\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt1.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt11.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ leftupnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ leftupnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div id=\"tv_up\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt2.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ upnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ upnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div id=\"tv_upright\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt3.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt31.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ rightupnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ rightupnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div id=\"tv_left\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt4.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt41.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ leftnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ leftnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div id=\"tv_center\" class=\"tv-control-button\"></div>";
	shtml+="<div id=\"tv_right\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt6.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt61.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ rightnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ rightnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div id=\"tv_downleft\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt7.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt71.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ leftdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ leftdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div id=\"tv_down\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt8.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt81.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ downnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ downnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div id=\"tv_downright\" class=\"tv-control-button\" onMouseOut=\"$(this).css('background','url(../img/yt9.jpg)');\" onMouseOver=\"$(this).css('background','url(../img/yt91.jpg)');\" onMouseDown=\"PTZ_StartCT('"+ rightdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ rightdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="</div>";
	shtml+="<div id=\"tv_vice_control\">";
	shtml+="<div class=\"tv-vice-control\">";
	shtml+="<div id=\"tv_zoomup\" class=\"tv-control-button tv-zoomup\" onMouseOut=\"$(this).css('background','url(../img/yt11.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.gif)');\" onMouseDown=\"PTZ_StartCT('"+ zoomupnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ zoomupnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div>变倍</div>";
	shtml+="<div id=\"tv_zoomdown\" class=\"tv-control-button tv-zoomdown\" onMouseOut=\"$(this).css('background','url(../img/yt12.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt22.gif)');\" onMouseDown=\"PTZ_StartCT('"+ zoomdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ zoomdownnum +"','"+ipaddr+"','"+ ipchannel +"')\"></div>";
	shtml+="</div>";
	shtml+="<div class=\"tv-vice-control\">";
	shtml+="<div id=\"tv_focusingup\" class=\"tv-control-button tv-zoomup\" onMouseOut=\"$(this).css('background','url(../img/yt11.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.gif)');\" onMouseDown=\"PTZ_StartCT('"+ focusupnnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ focusupnnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div>聚焦</div>";
	shtml+="<div id=\"tv_focusingdown\" class=\"tv-control-button tv-zoomdown\" onMouseOut=\"$(this).css('background','url(../img/yt12.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt22.gif)');\" onMouseDown=\"PTZ_StartCT('"+ focusdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ focusdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="</div>";
	shtml+="<div class=\"tv-vice-control\">";
	shtml+="<div id=\"tv_apertureup\" class=\"tv-control-button tv-zoomup\" onMouseOut=\"$(this).css('background','url(../img/yt11.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt21.gif)');\" onMouseDown=\"PTZ_StartCT('"+ irisupnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ irisupnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="<div>光圈</div>";
	shtml+="<div id=\"tv_aperturedown\" class=\"tv-control-button tv-zoomdown\" onMouseOut=\"$(this).css('background','url(../img/yt12.gif)');\" onMouseOver=\"$(this).css('background','url(../img/yt22.gif)');\" onMouseDown=\"PTZ_StartCT('"+ irisdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\" onMouseUp=\"PTZ_StopCT('"+ irisdownnum +"','"+ ipaddr +"','"+ ipchannel +"')\"></div>";
	shtml+="</div>";
	shtml+="</div>";
	shtml+="<div id=\"tv_vice_control_other\">";
	//shtml+="<div class=\"layui-btn layui-btn-primary tv-layui-style\" onclick=\"PTZ_FullScreen();\"><i title=\"全屏\" class=\"glyphicon glyphicon-fullscreen\"></i></div>"
	shtml+="</div>";
	shtml+="</div>";
	shtml+="</div>";
	
	return shtml;
}

//点击16路摄像机有云台事件
function setCameraobjCT(sid,title,ipaddr,ipport,ipchannel){	
	var paneltv;                         //计时
	var sObjdownid = "ocxdown" + sid;    //下载
	var sObjid = "ocx" + sid++;          //影片
	var sObjpanelid="ocxpanle" + sid++;  //遮罩
	
	if (!ipchannel||ipchannel=="") {
		ipchannel=0;
	}

	sthml="";
	shtml=getCameraHtmlCT(sObjdownid,sObjid,sObjpanelid,ipaddr,ipport);
		
	layer.open({
		type: 1 //此处以iframe举例
		,title: "<i class=\"glyphicon glyphicon-facetime-video\"></i>&nbsp;&nbsp;"+title
		,area: ['635px', '462px']
		,shade: 0
		,maxmin: false
		,offset: [Ht+10]
		,resize:false
		,id: 'LAY_CAM' //防止重复弹出
		,content: shtml//s2
		//,btn: ['关闭'] //只是为了演示
		,cancel: function(index, layero){
			clearTimeout(paneltv);
			document.getElementById(sObjid).style.display="none";//隐藏
			$("#"+ sObjid +"").html("");
			$("#ptz_objid").html("");
		    layer.close(index);
		  	
			try{
				if(bLogin == 1){
					clearTimeout(objpanel);
					
					LogoutclickCT(ipaddr);
					var ocx =document.getElementById(sObjid);//.object，不支持JQ					
					ocx.DisConnectRealVideo(ipchannel);
					ocx.LogoutDevice();			
					
					bLogin=0;
				}
			}catch(e){
			}									  
		}		
		,zIndex: layer.zIndex 
		,success: function(layero){
		    layer.setTop(layero); 
		    $("#ptz_objid").html(sObjid);//objid
			document.getElementById(sObjid).style.top="-500px";
			
			panletv=setTimeout(function(){
			   
		       if(ietype==0)
				{
					try{
						var obj=new ActiveXObject("WebActiveEXE.Plugin.1");					
					}
					catch(e){
						document.getElementById(sObjpanelid).style.display="none";//显示,加载内存只能用JS
						document.getElementById(sObjdownid).style.display="block";//显示
						document.getElementById(sObjid).style.display="none";//隐藏
					}
					
			   }else{
					try{
						navigator.plugins.refresh(false);
						obj = navigator.mimeTypes["application/media-plugin-version-3.1.0.2"];
						if (!(obj && obj.enabledPlugin))
						{					
							document.getElementById(sObjpanelid).style.display="none";//显示,加载内存只能用JS
							document.getElementById(sObjdownid).style.display="block";//显示
							document.getElementById(sObjid).style.display="none";//隐藏
						}
					}
					catch(e){
					}					
			   }
			   		
			   var ocx =document.getElementById(sObjid);//.object，不支持JQ		
			   ocx.LoginDeviceEx(ipaddr,37777,"admin","admin", 0);
			   ocx.SetModuleMode(3);
			   ocx.SetWinBindedChannel(1, 0, 0, 0);
			   crv_value=ocx.ConnectRealVideo(parseInt(ipchannel) ,1);
			   			   
			   if(crv_value!=0){
				   Login1clickCT(ipaddr,ipchannel);
				   bLogin = 1;
				   
				   //正常了才显示出来
					var objpanel=setTimeout(function(){
						document.getElementById(sObjid).style.top="0";
					},500)
					
			   }else{
					document.getElementById(sObjpanelid).style.display="block";//显示
				    document.getElementById(sObjdownid).style.display="none";//隐藏
				    document.getElementById(sObjid).style.display="none";//隐藏
				
				    sendScreenMSG(msg_connectfail);
			   }
			  
		   },300)
			
		}
	});
}

/*16路摄像机登录注销 start*/
function Login1clickCT(sip,ipchannel){	//登录第一步
	try{
		$.ajax( {  
			url: '/json/rpcx1.asp?ip=' +sip,// 跳转到 action  
			data: JSON.stringify({"method":"global.login","params":{"userName":"admin","password":"","clientType":"Dahua3.0-Web3.0"},"id":1}),  
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {  
				if (mydata) {
					//var a = mydata.error.code;
					//if (a == 268632079) {						
						
					//}
					var md5=CalcPassMd5("admin");
					var ptz_id = 5;
					var i = ar_CameraCT.push(new Array(sip,mydata.session,md5,ptz_id));
					
					Login2clickCT(sip,mydata.session,md5,ipchannel);	        
			  	}
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			 }
		});
	}catch(e){
		sendScreenMSG(msg_connectfail);
	}
}

function Login2clickCT(sip,sessionval,md5,ipchannel){  //登录第二步
	try{
		var a = {"method":"global.login","params":{"userName":"admin","password":md5,"clientType":"Dahua3.0-Web3.0","authorityType":"OldDigest"},"id":2,"session":sessionval};//parseInt()
		$.ajax( {  
			url: '/json/rpcx1.asp?ip=' + sip + '&id=' + sessionval,// 跳转到 action    可能得改为RPC2
			data:JSON.stringify(a),
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {  
				if (mydata.result){
					intervalProcessCT = setInterval("KeepAliveCT()", 30000);
					 getPTZObjectCT(sip,sessionval,ipchannel);
				}
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			 }
		});
	}catch(e){
		sendScreenMSG(msg_connectfail);
	}
}

function getPTZObjectCT(sip,sessionval,ipchannel){
	var a = {"method":"ptz.factory.instance","params":{"channel":parseInt(ipchannel)},"session":parseInt(sessionval),"id":3};//parseInt()
	$.ajax( {  
		url: '/json/rpcx2.asp?ip=' + sip + '&id=' + sessionval,// 跳转到 action    可能得改为RPC2
		data:JSON.stringify(a),
		type:'post',  
		contentType: "application/x-www-form-urlencoded",
		cache:false,
		//async : false, //默认为true 异步    
		dataType:'json',  //json
		success:function(mydata) {  
			ct_objectid=mydata.result;
		},  
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function LogoutclickCT(sip){		//注销	
	try{	
		var sessionval = '';
		for (var i=0;i<ar_CameraCT.length;i++){
			if (ar_CameraEx[i][0] == sip){
				sessionval = ar_CameraCT[i][1];
			}
		}
	
		var a = {"method" : "global.logout","params" : null,"session":sessionval,"id" : 11};	
		$.ajax( {  
			url: '/json/rpcx2.asp?ip=' + sip + '&id=' + sessionval,// 跳转到 action  
			data:JSON.stringify(a),
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			//async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) { 
			},  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
		clearInterval(intervalProcessCT);
	}catch(e){
	}
}

function KeepAliveCT(){ 		///------------------会话保持
	var a = '';
	for (var i=0;i<ar_CameraCT.length;i++){	
		a = {"method":"global.keepAlive","params":{"timeout": 300},"session":parseInt(ar_CameraCT[i][1]),"id":ar_CameraCT[i][3]};	
		$.ajax( {  
		    url: '/json/rpcx3.asp?ip=' + ar_CameraCT[i][0] + '&id=' + ar_CameraCT[i][1],// 跳转到 action  
		    data:JSON.stringify(a),
		    type:'post',  
		    contentType: "application/x-www-form-urlencoded",
		    cache:false,
		    //async : false, //默认为true 异步    
		    dataType:'json',  //json
		    success:function(mydata) {  
		    },  
		    error : function(XMLHttpRequest, textStatus, errorThrown) {
		    }
		});	
		ar_CameraCT[i][3]++;
	}
}
/*16路摄像机登录注销 end*/

function PTZ_StartCT(x,sip,ipchannel){		//PTZ启动
	var c = 4;
	//var b = parseInt($("#sessionID").val());	
	var cid = -1;
	for (var i=0;i<ar_CameraCT.length;i++){
		if (ar_CameraCT[i][0] == sip){
			var cid = i;
		}
	}	
	if (cid == -1){

		return;
	}
		
	var a = {"method" : "ptz.start", "session":ar_CameraCT[cid][1],"params" : {"channel":parseInt(ipchannel), "code" : x,"arg1" : c,"arg2" : c,"arg3" : 0},"id" : ar_CameraCT[cid][3],"object":parseInt(ct_objectid)};	//parseInt(ipchannel)
	$.ajax( {  
	    url: '/json/rpcx2.asp?ip=' + sip + '&id=' + ar_CameraCT[cid][1],// 跳转到 action  
	    data:JSON.stringify(a),
	    type:'post',  
	    contentType: "application/x-www-form-urlencoded",
	    cache:false,
	    //async : false, //默认为true 异步    
	    dataType:'json',  //json
	    success:function(mydata) {  
	     },  
	    error : function(XMLHttpRequest, textStatus, errorThrown) {
	     }
	});
	ar_CameraCT[cid][3]++;
}

function PTZ_StopCT(x,sip,ipchannel){		//PTZ停止
	var c = 4;
	//var b = parseInt($("#sessionID").val());	
	var cid = -1;
	for (var i=0;i<ar_CameraCT.length;i++){
		if (ar_CameraCT[i][0] == sip){
			var cid = i;
		}
	}	
	if (cid == -1){
		return;
	}		
	var a = {"method" : "ptz.stop", "session":ar_CameraCT[cid][1],"params" : {"channel":parseInt(ipchannel), "code" : x,"arg1" : c,"arg2" : c,"arg3" : 0},"id" : ar_CameraCT[cid][3],"object":parseInt(ct_objectid)};	//parseInt(ipchannel)
	$.ajax( {  
	    url: '/json/rpcx2.asp?ip=' + sip + '&id=' + ar_CameraCT[cid][1],// 跳转到 action  
	    data:JSON.stringify(a),
	    type:'post',  
	    contentType: "application/x-www-form-urlencoded",
	    cache:false,
	    //async : false, //默认为true 异步    
	    dataType:'json',  //json
	    success:function(mydata) {  
	    },  
	    error : function(XMLHttpRequest, textStatus, errorThrown) {
	    }
	});
	ar_CameraCT[cid][3]++;
}
/*16路摄像机有云台控制end*/

//加密
//单IP
function CalcMd5(a,b,u,p){		
  //var a = $("#random").val();
	//var b = $("#realm").val();
	var f = hex_md5(u + ":" + b + ":" + p);
	var g = hex_md5(u + ":" + a + ":" + f);
	return g;
}
//16路
function CalcPassMd5(p){		
	var c = DH_Superencipherment(p);
	return c;
}

function mytoInt(b, a){
	return parseInt(b, a || 10)
}

function DH_Superencipherment(c) {
    for (var e = "", h = [], c = hex_md5(c), f = [], a = 0; a < 16 && a < c.length / 2; a++)
        f[a] = mytoInt(c.slice(2 * a, 2 * a + 2),16);
    for (a = 0; a <= 7; a++)
        h[a] = (f[2 * a] + f[2 * a + 1]) % 62,
        h[a] += h[a] >= 0 && h[a] <= 9 ? 48 : h[a] >= 10 && h[a] <= 35 ? 55 : 61,
        e += String.fromCharCode(h[a]);
    return e
}