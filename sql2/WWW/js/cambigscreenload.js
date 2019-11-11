﻿function bigScreenIsLoad(){
	if(bs_setmethod==0){
		bigScreenLogin1click();
	}
}

//自动化
//自动添加网络信号，并自动切屏
function bigScreenAddDevicesAuto(devicename,camip,camchannel,windwostr){
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	bigScreenAddDevicesCommandAuto(devicename,camip);
		
	bigScreenSetToWallAuto(camip,camchannel,windwostr);
}

//自动添加网络信号，合屏并自动切屏
function bigScreenAddDevicesAutoOne(devicename,camip,camchannel,windwostr){
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	bigScreenAddDevicesCommandAuto(devicename,camip);
		
	bigScreenLoadCollection();
		
	bigScreenSetToWallAuto(camip,camchannel,windwostr);
}

//自动切屏
function bigScreenSetToWallAuto(camip,camchannel,windwostr){
	var camconfigname="";//摄像机配置名称
	var camtype="";//摄像机类别
	bs_stwnum=0;	//设置切屏命令顺序
	
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	//设备配置JSON
	//设备不为空
	if(bs_devices.length!=0){	
		//遍历配置
		for(var index in bs_devices){
		
			if(bs_devices[index].Address==camip){
				camconfigname=index;
				camtype=bs_devices[index].DeviceType;
			}
		}
		
		bigScreenSetCameraCommandAuto(0,camconfigname,camchannel,windwostr,camtype);
	}
}

//合屏
function bigScreenLoadCollection(){	
	bs_lcsnum=0;	//设置合屏命令顺序
		
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	bigScreenSetCommand(0);
}

//切屏
function bigScreenSetToWall(devicename,camip,camchannel,windowstr){
	var camconfigname="";//摄像机配置名称
	var camtype="";//摄像机类别
	bs_stwnum=0;	//设置切屏命令顺序
	
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	//设备配置JSON
	//设备不为空
	if(bs_devices.length!=0){	
		//遍历配置
		for(var index in bs_devices){
		
			if(bs_devices[index].Address==camip){
				camconfigname=index;
			}		
		}
		
		if(camconfigname==""){
			bigScreenAddDevicesCommandAuto(devicename,camip);
			//遍历配置
			for(var index in bs_devices){
			
				if(bs_devices[index].Address==camip){
					camconfigname=index;
					camtype=bs_devices[index].DeviceType;
				}		
			}
		}
		
		bigScreenSetCameraCommand(0,camconfigname,camchannel,windowstr,camtype);
	}
}

//退屏
function bigScreenExitToWall(windowstr){	
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	bigScreenExitCameraCommand(windowstr);
}

//分屏
function bigScreenSplitCollection(){
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	bigScreenSplitCommand();
}

//添加网络信号
function bigScreenAddDevices(){		
	bigScreenIsLoad();
	if(bs_setmethod==0)return;
	bigScreenAddDevicesCommand();
}


//拼接器登录
function bigScreenLogin1click(){	//登录第一步
	var pinjieip=$("#config_pingjie_ip").val();
	var pinjieacount=$("#config_pingjie_acount").val();
	var pinjiepassword=$("#config_pingjie_password").val();
	
	try{	
		$.ajax( {  
			url: 'bcd/json/rpc.php?ip=' + pinjieip,// 跳转到 action
			data: JSON.stringify({"method":"global.login","params":{"userName":pinjieacount,"password":"","clientType":"Web3.0"},"id":10000}),  
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {  
				if (mydata) {
					var a = mydata.error.code;
					if (a == 268632079) {
						$("#config_pingjie_session").val(mydata.session);
						$("#config_pingjie_md5").val(CalcPassMd5(pinjiepassword));
											
						bigScreenLogin2click();
					}	        
			  	}else{
					console.log("RPC1登录失败");
				}
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				sendThisScreenMSG(msg_connectfail);  
			 }
		});
	}catch(e){
	}
}

function bigScreenLogin2click(){  //登录第二步
	var pinjieip=$("#config_pingjie_ip").val();
	var sessionstr = $("#config_pingjie_session").val();
	var pinjieacount=$("#config_pingjie_acount").val();
	var md5=$("#config_pingjie_md5").val();
	
	try{	
		var a = {"method":"global.login","session":parseInt(sessionstr),"params":{"userName":pinjieacount,"password":md5,"clientType":"Web3.0", "authorityType":"OldDigest"},"id":10000};
		$.ajax({
			url: 'bcd/json/rpc.php?ip=' + pinjieip + '&id=' + sessionstr,// 跳转到 action
			data:JSON.stringify(a),
			type:'post',  
			contentType: "application/x-www-form-urlencoded",
			cache:false,
			async : false, //默认为true 异步    
			dataType:'json',  //json
			success:function(mydata) {  
				if (mydata.result){
					if(bs_setmethod==0){
						intervalProcessbigScreen = setInterval("bigScreenKeepAlive()", 30000);
						bs_loadnum=0;//初始化登陆	
						bigScreenLoadCommand(bs_loadnum);
						bs_setmethod++;//已经登录
					}				
				}else{
					console.log("RPC2登录失败");
				}
			 },  
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				 sendThisScreenMSG(msg_connectfail);  
			 }
		});
	}catch(e){
	}
}

function bigScreenKeepAlive(){ 		///------------------会话保持
	var pinjieip=$("#config_pingjie_ip").val();
	var sessionstr = $("#config_pingjie_session").val();
		
	var a = {"method":"global.keepAlive","params":{"timeout": 300},"session":parseInt(sessionstr),"id":parseInt(bs_id)};	
	$.ajax( {  
	    url: '/json/rpc2.asp?ip=' + pinjieip + '&id=' + sessionstr,// 跳转到 action  
	    data:JSON.stringify(a),
	    type:'post',  
	    contentType: "application/x-www-form-urlencoded",
	    cache:false,
	    async : false, //默认为true 异步    
	    dataType:'json',  //json
	    success:function(mydata) {  
		},  
	    error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});	
	bs_id++;
}


function bigScreenLogoutclick(){		//注销
	var pinjieip=$("#config_pingjie_ip").val();
	var sessionstr = $("#config_pingjie_session").val();
	
	if(sessionstr!=""){
		try{	
			var a = {"method" : "global.logout","params" : null,"session":b,"id" : 10000};	
			$.ajax( {  
				url: 'bcd/json/rpc.php?ip=' + pinjieip + '&id=' + sessionstr,// 跳转到 action
				data:JSON.stringify(a),
				type:'post',  
				contentType: "application/x-www-form-urlencoded",
				cache:false,
				async : false, //默认为true 异步    
				dataType:'json',  //json
				success:function(mydata) { 					
					$("#config_pingjie_md5").val("");
					$("#config_pingjie_session").val("");
				 },  
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					 
				 }
			});
			clearInterval(intervalProcessbigScreen);
			bs_setmethod=0;
		}catch(e){
		}
	}
}

//首先加载初始化命令
function bigScreenLoadCommand(bs_loadnum){
	bs_loadnum=parseInt(bs_loadnum);
	if(bs_loadnum<35){
		
		var pinjieip=$("#config_pingjie_ip").val();
		var sessionstr = $("#config_pingjie_session").val();
		
		var json = "";
		var sRetFunc="";
		switch(bs_loadnum){
			case 0:
				json=bigScreenGetRequest("magicBox.getDeviceType","");
				break;
			case 1:
				json=bigScreenGetRequest("userManager.getUserInfo",{"name":"admin"});
				break;
			case 2:
				json=bigScreenGetRequest("matrix.getCards",{"host":0});
				break;
			case 3:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":0});
				break;
			case 4:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":1});
				break;
			case 5:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":2});
				break;
			case 6:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":3});
				break;
			case 7:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":4});
				break;
			case 8:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":5});
				break;
			case 9:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":6});
				break;
			case 10:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":7});
				break;
			case 11:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":8});
				break;
			case 12:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":9});
				break;
			case 13:
				json=bigScreenGetRequest("matrix.getCardInfo",{"host":0,"card":10});
				break;
			case 14:
				bs_id=1;
				json=bigScreenGetRequest('Security.getEncryptInfo');
				sRetFunc=function(data){
					if(data.result){
						pub=data.params.pub;
						bs_loadnum++;
						bigScreenLoadCommand(bs_loadnum);
					}
				};
				break;
			case 15:
				var enc=Encrypt.EncryptInfo(pub,'{"name":"RemoteDevice"}');
				json=bigScreenGetRequest('Security.getConfig',{salt:enc.salt,cipher:"AES-128",content:enc.content});
				sRetFunc=function(data){
					if(data.result){
						bs_devices=Encrypt.UnEncryptInfo(enc.key,data.params.content).table||{};
						//$("#textarea_backinfo").val(JSON.stringify(bs_devices));
						bs_loadnum++;
						bigScreenLoadCommand(bs_loadnum);
					}
				};
					
				break;
			case 16:
				json=bigScreenGetRequest("netApp.factory.instance","");//bs_objectid4
				sRetFunc=function(data){
					bs_objectid4=data.result;
					bs_loadnum++;
					bigScreenLoadCommand(bs_loadnum);
				};
				break;
			case 17:
				json=bigScreenGetRequest("netApp.getRemoteDeviceStatus",null,parseInt(bs_objectid4));
				break;
			case 18:
				json=bigScreenGetRequest("configManager.getConfig",{"name":"ChannelTitle"});
				break;
			case 19:
				json=bigScreenGetRequest("configManager.getConfig",{"name":"VideoIn"});
				break;
			case 20:
				json=bigScreenGetRequest("configManager.getConfig",{"name":"MonitorWall"});
				sRetFunc=function(data){
					bs_compositeid=data.params.table[0].Blocks[0].CompositeID;
					bs_loadnum++;
					bigScreenLoadCommand(bs_loadnum);
				};
				break;
			case 21:
				json=bigScreenGetRequest("monitorWall.factory.instance",{"channel":0});//bs_objectid2
				sRetFunc=function(data){
					bs_objectid2=data.result;
					bs_loadnum++;
					bigScreenLoadCommand(bs_loadnum);
				};
				break;
			case 22:
				json=bigScreenGetRequest("monitorWall.attachTour",{"proc":parseInt(sessionstr)+1},parseInt(bs_objectid2));
				break;
			case 23:
				json=bigScreenGetRequest("configManager.getConfig",{"name":"VideoOut"});
				break;
			case 24:
				json=bigScreenGetRequest("split.factory.instanceByCompositeID",{"compositeID":bs_compositeid});//bs_objectid1
				sRetFunc=function(data){
					bs_objectid1=data.result;
					bs_loadnum++;
					bigScreenLoadCommand(bs_loadnum);
				};
				break;
			case 25:
				json=bigScreenGetRequest("windowManager.factory.instance",{"channel":0,"composite":bs_compositeid});//bs_objectid3
				sRetFunc=function(data){
					bs_objectid3=data.result;
					bs_loadnum++;
					bigScreenLoadCommand(bs_loadnum);
				};
				break;
			case 26:
				json=bigScreenGetRequest("split.attachTour",{"proc":parseInt(sessionstr)},parseInt(bs_objectid1));
				break;
			case 27:
				json=bigScreenGetRequest("monitorWall.getScreenControlParams",{"compositeID":bs_compositeid},parseInt(bs_objectid2));
				break;
			case 28:
				json=bigScreenGetRequest("split.getMode",null,parseInt(bs_objectid1));
				break;
			case 29:
				json=bigScreenGetRequest("split.getScene",null,parseInt(bs_objectid1));
				break;
			case 30:
				json=bigScreenGetRequest("split.getAudioOutputEx",null,parseInt(bs_objectid1));
				break;
			case 31:
				json=bigScreenGetRequest("windowManager.getTourStatus",{"window":-1},parseInt(bs_objectid3));
				break;
			case 32:
				json=bigScreenGetRequest("monitorWall.getTvInfo",null,parseInt(bs_objectid2));
				break;
			case 33:
				json=bigScreenGetRequest("monitorWall.getLockStatus",null,parseInt(bs_objectid2));
				break;
			case 34:
				json=bigScreenGetRequest("monitorWall.getStatus",null,parseInt(bs_objectid2));
				break;
		}
				
		bs_id++;
		
		if(sRetFunc==""){
			sRetFunc=function(data){
				bs_loadnum++;
				bigScreenLoadCommand(bs_loadnum);
			};
		}
		sFailRet=function(data){
			sendThisScreenMSG(msg_connectfail);  
		};
		bigScreenSendRequest(json,sRetFunc,sFailRet);
	}
}

//合屏命令
function bigScreenSetCommand(bs_lcsnum){
	var bigplanname=$("#config_pingjie_planname").val(); //预案名称
	
	if(bigplanname!=""){
		bs_lcsnum=parseInt(bs_lcsnum);
		if(bs_lcsnum<6){
			
			var pinjieip=$("#config_pingjie_ip").val();
			var sessionstr = $("#config_pingjie_session").val();
			
			var json = "";
			var sRetFunc="";
			switch(bs_lcsnum){			
				//放大屏
				case 0:
					json=bigScreenGetRequest("configManager.getConfig",{"name":"MonitorWallCollection"});
					break;
				case 1:
					json=bigScreenGetRequest("monitorWall.loadCollection",{"name":bigplanname},parseInt(bs_objectid2));
					break;
				case 2:
					json=bigScreenGetRequest("split.getMode",null,parseInt(bs_objectid1));
					break;
				case 3:
					json=bigScreenGetRequest("split.getScene",null,parseInt(bs_objectid1));
					break;
				case 4:
					json=bigScreenGetRequest("split.getAudioOutputEx",null,parseInt(bs_objectid1));
					break;
				case 5:
					json=bigScreenGetRequest("windowManager.getTourStatus",{"window":-1},parseInt(bs_objectid3));
					break;
			}
			
			bs_id++;
			
			if(sRetFunc==""){
				sRetFunc=function(data){
					bs_lcsnum++;
					bigScreenSetCommand(bs_lcsnum);
				};
			}
			sFailRet=function(data){
				sendThisScreenMSG(msg_connectfail);  
			};
			bigScreenSendRequest(json,sRetFunc,sFailRet);
		}
	}else{
		//sendThisScreenMSG("未设置预案");
	}
}

//自动切上摄像机
function bigScreenSetCameraCommandAuto(bs_stwnumauto,camconfigname,camchannel,windowstr,camtype){		
	bs_stwnumauto=parseInt(bs_stwnumauto);
	
	switch(camtype){
		case "DVR"://16路
			break;
		case "IPC"://单IP
			//跳过
			if(bs_stwnumauto==0){
				bs_stwnumauto=1;				
			}
			camchannel=0;
			break;
		default:
			break;
	}
		
	if(bs_stwnumauto<5){		
		var pinjieip=$("#config_pingjie_ip").val();
		var sessionstr = $("#config_pingjie_session").val();
				
		var json = "";
		var sRetFunc="";
		switch(bs_stwnumauto){
			//大屏中的第几屏
			case 0:
				json=bigScreenGetRequest("windowManager.getWorkMode",{"window":parseInt(windowstr)},parseInt(bs_objectid3));
				break;
			//切上视频
			case 1:
				json=bigScreenGetRequest("split.setSource",{"window":parseInt(windowstr),"source":{"Device":camconfigname,"Enable":true,"Interval":10,"VideoChannel":parseInt(camchannel),"VideoStream":"Main"}},parseInt(bs_objectid1));
				break;
			case 2:
				json=bigScreenGetRequest("split.getWinSource",{"window":parseInt(windowstr)},parseInt(bs_objectid1));
				break;
			case 3:
				json=bigScreenGetRequest("split.getSource",{"window":parseInt(windowstr)},parseInt(bs_objectid1));
				break;
			case 4:				
				json=bigScreenGetRequest("split.setTopWindow",{"window":parseInt(windowstr)},parseInt(bs_objectid1));
				break;
		}
		
		bs_id++;
		
		if(sRetFunc==""){
			sRetFunc=function(data){
				bs_stwnumauto++;
				bigScreenSetCameraCommandAuto(bs_stwnumauto,camconfigname,camchannel,windowstr,camtype);
			};
		}
		sFailRet=function(data){
			sendThisScreenMSG(msg_connectfail);  
		};
		bigScreenSendRequest(json,sRetFunc,sFailRet);
	}
}

//切上摄像机
function bigScreenSetCameraCommand(bs_stwnum,camconfigname,camchannel,windowstr,camtype){		
	bs_stwnum=parseInt(bs_stwnum);
	
	switch(camtype){
		case "DVR"://16路
			break;
		case "IPC"://单IP
			//跳过
			if(bs_stwnum==0){
				bs_stwnum=1;
			}
			camchannel=0;
			break;
		default:
			break;
	}
		
	if(bs_stwnum<5){
		
		var pinjieip=$("#config_pingjie_ip").val();
		var sessionstr = $("#config_pingjie_session").val();
		
		var json = "";
		var sRetFunc="";
		switch(bs_stwnum){
			//大屏中的第几屏
			case 0:
				json=bigScreenGetRequest("windowManager.getWorkMode",{"window":parseInt(windowstr)},parseInt(bs_objectid3));
				break;
			//切上视频
			case 1:
				json=bigScreenGetRequest("split.setSource",{"window":parseInt(windowstr),"source":{"Device":camconfigname,"Enable":true,"Interval":10,"VideoChannel":parseInt(camchannel),"VideoStream":"Main"}},parseInt(bs_objectid1));
				break;
			case 2:
				json=bigScreenGetRequest("split.getWinSource",{"window":parseInt(windowstr)},parseInt(bs_objectid1));
				break;
			case 3:
				json=bigScreenGetRequest("split.getSource",{"window":parseInt(windowstr)},parseInt(bs_objectid1));
				break;
			case 4:				
				json=bigScreenGetRequest("split.setTopWindow",{"window":parseInt(windowstr)},parseInt(bs_objectid1));
				break;
		}
		
		bs_id++;
		
		if(sRetFunc==""){
			sRetFunc=function(data){
				bs_stwnum++;
				bigScreenSetCameraCommand(bs_stwnum,camconfigname,camchannel,windowstr,camtype);
			};
		}
		sFailRet=function(data){
			sendThisScreenMSG(msg_connectfail);  
		};
		bigScreenSendRequest(json,sRetFunc,sFailRet);
	}
}

//退出切屏
function bigScreenExitCameraCommand(windowstr){	
	var json = "";
	var sRetFunc="";
	
	json=bigScreenGetRequest("split.setSource",{"window":parseInt(windowstr),"source":{"Device":null,"VideoChannel":null,"VideoStream ":null,"UniqueChannel ":-1}},parseInt(bs_objectid1));
	
	bs_id++;
	
	sRetFunc=function(data){
	};
	sFailRet=function(data){
		sendThisScreenMSG(msg_connectfail);  
	};
	
	bigScreenSendRequest(json,sRetFunc,sFailRet);
}

//分屏
function bigScreenSplitCommand(){
	var json = "";
	var sRetFunc="";
	
	json=bigScreenGetRequest("windowManager.setMode",{"window":0,"mode":"Split4"},parseInt(bs_objectid3));
	
	bs_id++;
	
	sRetFunc=function(data){
	};
	sFailRet=function(data){
		sendThisScreenMSG(msg_connectfail);  
	};
	
	bigScreenSendRequest(json,sRetFunc,sFailRet);	
}

var Encrypt = (function(){
	return new function(){
		function randomNum(m) {
			m = m > 16 ? 16 : m;
			var num = Math.random().toString();
			if (num.substr(num.length - m, 1) === '0') {
				return randomNum(m);
			}
			return num.substring(num.length - m);
		}
		this.EncryptInfo = function(pub, src){
			var NE = {};
			var pub = pub.split(',');
			var NE0 = pub[0].split(':');
			var NE1 = pub[1].split(':');
			NE[NE0[0]] = NE0[1];
			NE[NE1[0]] = NE1[1];
			var num16Key = randomNum(16);
			//var num16Key=4231453946684396;//第一次
			//var num16Key=3689487207861966;//第二次
			$("#keynum").val(num16Key);
			// RSA加密
			var rsa = new RSAKey();
			rsa.setPublic(NE['N'], NE['E']);
			var salt = rsa.encrypt(num16Key);
			// AES加密
			var key = CryptoJS.enc.Utf8.parse(num16Key);
			var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(src), key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.ZeroPadding
			});
			return {
				'salt': salt,
				'key': key,
				'content': encrypted.toString()
			};
		};
		this.UnEncryptInfo = function(key, content){
			var jsonStr = CryptoJS.AES.decrypt(content, key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.ZeroPadding
			});
			return eval('('+CryptoJS.enc.Utf8.stringify(jsonStr)+')');
		};
	};
})();

function bigScreenSendRequest(jsonString, sRetFunc,sFailRet){
	var pinjieip=$("#config_pingjie_ip").val();
	var sessionstr = $("#config_pingjie_session").val();
	
	var login=0;
	//if(rpcUrl == "/RPC2_Login") login=1;
	//if(asyn == undefined) asyn = true;
	if(sRetFunc == undefined) sRetFunc = function(){};
	if(sFailRet == undefined) sFailRet = function(){};
	
	$.ajax( {
		url: '/json/rpc3.asp?ip=' + pinjieip + "&id=" + sessionstr +"&login="+login+"&user="+navigator.userAgent,
	    data:JSON.stringify(jsonString),
		timeout : 5000,
	    type:'post',
	    contentType: "application/x-www-form-urlencoded",
	    cache:false,
	    async : false,
	    dataType:'json',
	    success:function(mydata) {
			if(mydata){
				sRetFunc(data);
			}
	     },
	    error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus=='timeout'){
				//处理超时的逻辑
				sendThisScreenMSG(msg_timeout);
			}
			else{
				sFailRet();
			}
	     }
	});
}

function bigScreenGetRequest(method,params,object){
	var sessionstr = $("#config_pingjie_session").val();
	
	if(params == undefined) params = null;
	var json = {
		"method":method,
		"params":params,
		"session":parseInt(sessionstr),
		"id":bs_id
	};
	if(object !== undefined) json.object = object;
	return json;
}

//自动添加网络信号
function bigScreenAddDevicesCommandAuto(devName,ip){
	var RemoteDeviceID = "RemoteDevice"+Math.floor(Math.random()*10000+1);
	while(bs_devices[RemoteDeviceID]){
		RemoteDeviceID = "RemoteDevice"+Math.floor(Math.random()*10000+1);
	}
	//bs_devices[RemoteDeviceID]={};
	//判断名称是否为空
	//sendThisScreenMSG(devName==null);
	if(!isEmpty(devName)){
		return;
	}
	//判断ip是否合法
	if(!isIpAddress(ip)){
		return false;
	}
	//手动添加时判断设备是否已经添加
	for(var id in bs_devices){
		if(id!=RemoteDeviceID&&ip==bs_devices[id].Address&&bs_devices[id].Port==37777&&bs_devices[id].ProtocolType=="Private"){
			//sendThisScreenMSG("设备已添加");
			return false;
		}
	}
	var serviceType="TCP";
	//var tepRemoteDev = bs_devices[RemoteDeviceID];
	var tepRemoteDev={};
	tepRemoteDev.Name = devName;
	tepRemoteDev.Address = ip;
	tepRemoteDev.ProtocolType = "Private";
	tepRemoteDev.UserName = "admin";
	tepRemoteDev.Password = "admin";
	tepRemoteDev.Port = 37777;
	tepRemoteDev.HttpPort = 80;
	tepRemoteDev.RtspPort = 554;
	tepRemoteDev.AudioInputChannels = 0;
	tepRemoteDev.Definition = 'Standard';
	tepRemoteDev.DeviceClass = '';
	tepRemoteDev.Enable = true;
	tepRemoteDev.MachineGroup = '';
	tepRemoteDev.RemoteChannel = 0;
	tepRemoteDev.VideoInputChannels = 0;
	tepRemoteDev.DeviceType = '';
	//tepRemoteDev.VideoInputs = curjsonRemoteDevice[curRemoteDeviceID].VideoInputs;
	tepRemoteDev.VideoInputs;
	tepRemoteDev.AlarmInputs;
	/*var enableChNum = 0;
	for(ID in bs_devices){
		var videoInputs=bs_devices[ID].VideoInputs;
		if(videoInputs===undefined)continue;
		for(var i=0,l=videoInputs.length;i<l;i++){
			if(videoInputs[i]&&videoInputs[i].Enable)enableChNum++;
		}
	}
	if(enableChNum>1024){
		sendThisScreenMSG("使能的远程通道数大于1024，请确认并去掉部分使能勾选！");
		return false;
	}*/
	bs_devices[RemoteDeviceID] = tepRemoteDev;
	
	//添加配置
	bigScreenSendRequest(bigScreenGetRequest('Security.getEncryptInfo'),function(data){
		if(data.result){
			pub=data.params.pub;
		}
	});
	bs_id++;
	var enc=Encrypt.EncryptInfo(pub,'{"name":"RemoteDevice","table":'+JSON.stringify(bs_devices)+',"options":""}');
	bigScreenSendRequest(bigScreenGetRequest('Security.setConfig',{salt:enc.salt,cipher:"AES-128",content:enc.content}),function(data){
		if(data.result){
			//sendThisScreenMSG("新增成功");
			
			bigScreenSendRequest(bigScreenGetRequest("netApp.factory.instance",""),function(data){
				bs_objectid4=data.result;
			});
			bs_id++;
			bigScreenSendRequest(bigScreenGetRequest("netApp.getRemoteDeviceStatus",null,parseInt(bs_objectid4)));
			bs_id++;
			
			//重新获取配置
			bigScreenSendRequest(bigScreenGetRequest('Security.getEncryptInfo'),function(data){
				if(data.result){
					pub=data.params.pub;
				}
			});
			bs_id++;
			var enc=Encrypt.EncryptInfo(pub,'{"name":"RemoteDevice"}');
			bigScreenSendRequest(bigScreenGetRequest('Security.getConfig',{salt:enc.salt,cipher:"AES-128",content:enc.content}),function(data){
				if(data.result){
					bs_devices=Encrypt.UnEncryptInfo(enc.key,data.params.content).table||{};
				}
			});
			bs_id++;
		}
	});
	bs_id++;
}

//添加网络信号
function bigScreenAddDevicesCommand(){
	var devName=$('#input_monitorwall_name').val().trim();
	var ip=$('#input_monitorwall_ip').val().trim();
	var RemoteDeviceID = "RemoteDevice"+Math.floor(Math.random()*10000+1);
	while(bs_devices[RemoteDeviceID]){
		RemoteDeviceID = "RemoteDevice"+Math.floor(Math.random()*10000+1);
	}
	//bs_devices[RemoteDeviceID]={};
	//判断名称是否为空
	//sendThisScreenMSG(devName==null);
	if(!isEmpty(devName)){
		//sendThisScreenMSG("名称不能为空或空格");
		$('#input_monitorwall_name').focus();
		return;
	}
	//判断ip是否合法
	if(!isIpAddress(ip)){
		//sendThisScreenMSG("IP地址格式错误，请重新输入");
		$('#input_monitorwall_ip').focus();
		return false;
	}
	//手动添加时判断设备是否已经添加
	for(var id in bs_devices){
		if(id!=RemoteDeviceID&&ip==bs_devices[id].Address&&bs_devices[id].Port==37777&&bs_devices[id].ProtocolType=="Private"){
			//sendThisScreenMSG("设备已添加");
			return false;
		}
	}
	var serviceType="TCP";
	//var tepRemoteDev = bs_devices[RemoteDeviceID];
	var tepRemoteDev={};
	tepRemoteDev.Name = devName;
	tepRemoteDev.Address = ip;
	tepRemoteDev.ProtocolType = "Private";
	tepRemoteDev.UserName = "admin";
	tepRemoteDev.Password = "admin";
	tepRemoteDev.Port = 37777;
	tepRemoteDev.HttpPort = 80;
	tepRemoteDev.RtspPort = 554;
	tepRemoteDev.AudioInputChannels = 0;
	tepRemoteDev.Definition = 'Standard';
	tepRemoteDev.DeviceClass = '';
	tepRemoteDev.Enable = true;
	tepRemoteDev.MachineGroup = '';
	tepRemoteDev.RemoteChannel = 0;
	tepRemoteDev.VideoInputChannels = 0;
	tepRemoteDev.DeviceType = '';
	//tepRemoteDev.VideoInputs = curjsonRemoteDevice[curRemoteDeviceID].VideoInputs;
	tepRemoteDev.VideoInputs;
	tepRemoteDev.AlarmInputs;
	/*var enableChNum = 0;
	for(ID in bs_devices){
		var videoInputs=bs_devices[ID].VideoInputs;
		if(videoInputs===undefined)continue;
		for(var i=0,l=videoInputs.length;i<l;i++){
			if(videoInputs[i]&&videoInputs[i].Enable)enableChNum++;
		}
	}
	if(enableChNum>1024){
		sendThisScreenMSG("使能的远程通道数大于1024，请确认并去掉部分使能勾选！");
		return false;
	}*/
	bs_devices[RemoteDeviceID] = tepRemoteDev;
	setDeviveConfig();
}

function isEmpty(str){
	if(str!=null&&str.length>0){
		return true;
	}
	return false;
}

function isIpAddress(address){
	if(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(address)){
		var ip=address.split('.');
		if(ip[0]-0<=255&&ip[1]-0<=255&&ip[2]-0<=255&&ip[3]-0<=255){
			return true;
		}
	}
	return false;
}

//获取配置
function getDeviveConfig(){
	bigScreenSendRequest(bigScreenGetRequest('Security.getEncryptInfo'),function(data){
		if(data.result){
			pub=data.params.pub;
		}
	});
	bs_id++;
	var enc=Encrypt.EncryptInfo(pub,'{"name":"RemoteDevice"}');
	bigScreenSendRequest(bigScreenGetRequest('Security.getConfig',{salt:enc.salt,cipher:"AES-128",content:enc.content}),function(data){
		if(data.result){
			bs_devices=Encrypt.UnEncryptInfo(enc.key,data.params.content).table||{};
		}
	});
	bs_id++;
	getconfig();//...
}

function getconfig(){
	bigScreenSendRequest(bigScreenGetRequest("netApp.factory.instance",""),function(data){
		bs_objectid4=data.result;
	});
	bs_id++;
	bigScreenSendRequest(bigScreenGetRequest("netApp.getRemoteDeviceStatus",null,parseInt(bs_objectid4)));
	bs_id++;
}

//添加配置
function setDeviveConfig(){
	bigScreenSendRequest(bigScreenGetRequest('Security.getEncryptInfo'),function(data){
		if(data.result){
			pub=data.params.pub;
		}
	});
	bs_id++;
	var enc=Encrypt.EncryptInfo(pub,'{"name":"RemoteDevice","table":'+JSON.stringify(bs_devices)+',"options":""}');
	bigScreenSendRequest(bigScreenGetRequest('Security.setConfig',{salt:enc.salt,cipher:"AES-128",content:enc.content}),function(data){
		if(data.result){
			//sendThisScreenMSG("新增成功");
			getconfig();//...
			getDeviveConfig();//重新获取配置
		}else{
			getDeviveConfig();//重新获取配置
			sendThisScreenMSG(Encrypt.UnEncryptInfo(enc.key,data.params.content).options);//失败提示返回信息
		}
	});
	bs_id++;
}


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