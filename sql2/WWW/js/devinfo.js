// JavaScript Document
/*------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------*/

function titleclickcheckbox(data) {
	for (var key in  devtypecontrolbtn){
		if(devtypecontrolbtn[key] == data){
            var picclass=returnPicclass(key);
            if( $("#typeimg"+devtypecontrolbtn[key]+"").width() == 40  && $("#typeimg"+devtypecontrolbtn[key]+"").height() == 40) {
                $("." + picclass + "").empty();
                $("#typeimg"+devtypecontrolbtn[key]+"").animate({
                    //获得当前元素的宽度并*2
                    width:25,
                    height:25,
					padding:7.5
                },200);
                saveCheckbox(key);
            }else{
                var selectvalue=$("#default_place_select").val();
                defaultAjax(key,selectvalue,picclass,0);
                $("#typeimg"+devtypecontrolbtn[key]+"").animate({
                    //获得当前元素的宽度并*2
                    width:40,
                    height:40,
                    padding:0
                },200);
                saveCheckbox(key);
			}
		}
	}
}



// 设备类型加载
function getdevtypename(arr_,b){
	$.ajax({
		type: "GET",
		url : "bcd/php/gettype.php?sid=" + Math.random()+ "&itype=1",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
            var jsonObject=eval("("+mydata+")");
            window.devtypecontrolbtn = new Array();
            for (var z=1;z<jsonObject.results;z++){
                var typeid = jsonObject.rows[z].fid;
                devtypecontrolbtn[jsonObject.rows[z].fename] = jsonObject.rows[z].fid;
                // var usehead = "<li class=\"layui-nav-item\"   id=\"dev-nav-"+typeid+"\">";
                var usehead = "<a style=\"cursor:pointer;\"  onclick=\"titleclickcheckbox("+jsonObject.rows[z].fid+")\"  id=\"dev_iphone"+typeid+"\" ><img  id=\"typeimg"+typeid+"\" src=\""+jsonObject.rows[z].pic+"\"  style=\"width:25px;height:25px;\"   \"></a>";
                $("#dev-nav-"+typeid+"").html(usehead);
                // usehead += "</li>";
                // $("#usedaotasdesd").append(usehead);
            }
			if(mydata){
				for (var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(jsonObject.rows[i].fid);
					arr_[i].push(jsonObject.rows[i].fcname);
					arr_[i].push(jsonObject.rows[i].fename);
				}
			}
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}

getdevtypename(arr_TYPE,TYPEinit);
/*------------------------------------------------------------------------------------------------------
隧道信息加载
------------------------------------------------------------------------------------------------------*/
function gettunnel(arr_,b){
	$.ajax({
		type: "GET",
		url : "bcd/php/gettunnel.php?sid=" + Math.random()+ "&itype=1",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(mydata){
				var jsonObject=eval("("+mydata+")");
				for (var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(i);
					arr_[i].push(jsonObject.rows[i].id);
					arr_[i].push(jsonObject.rows[i].tuvalue);
					arr_[i].push(1);//隧道上行执行火灾方案
					arr_[i].push(1);//隧道下行执行火灾方案
				}
			}
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}

gettunnel(arr_TUNNEL,TUNNELinit);

/*------------------------------------------------------------------------------------------------------
设备信息加载
------------------------------------------------------------------------------------------------------*/
function devgetpara(arr_,b,t){
	$.ajax({
		type: "GET",
		url : "bcd/json/getpara.php?sid=" + Math.random()+ "&itype=1&q=" + t,
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(mydata){
				var jsonObject=eval("("+mydata+")");
				for(var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(i);
					arr_[i].push(jsonObject.rows[i].id);
					arr_[i].push(jsonObject.rows[i].tunnel);
					arr_[i].push(jsonObject.rows[i].devcode);
					arr_[i].push(jsonObject.rows[i].devename);
					arr_[i].push(jsonObject.rows[i].devaddr);
					arr_[i].push(jsonObject.rows[i].updown);
					arr_[i].push(jsonObject.rows[i].ipaddr);
					arr_[i].push(jsonObject.rows[i].ipport);
					arr_[i].push(jsonObject.rows[i].shape);
					arr_[i].push(jsonObject.rows[i].pointx);
					arr_[i].push(jsonObject.rows[i].pointy);
					arr_[i].push(jsonObject.rows[i].groupid);
					arr_[i].push(jsonObject.rows[i].devcname);
					arr_[i].push(false);
					arr_[i].push("");
					arr_[i].push(false);
					arr_[i].push("");
					arr_[i].push(2);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(jsonObject.rows[i].plcid);
					arr_[i].push(jsonObject.rows[i].channel);
					arr_[i].push(jsonObject.rows[i].outword);
				}
			}
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}

function devgetpara2(arr_,b,t,u){
    var tunnelnum=$("#default_place_select").val();//隧道号
	$.ajax({
		type: "GET",
		url : "bcd/php/getpara.php?sid=" + Math.random()+ "&itype="+u+"&q=" + t+"&tunnel="+tunnelnum+"",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(u == 3){
				arr_[i] =new Array();
			}
			else if(mydata){
				var jsonObject=eval("("+mydata+")");
				for(var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(i);
					arr_[i].push(jsonObject.rows[i].id);
					arr_[i].push(jsonObject.rows[i].tunnel);
					arr_[i].push(jsonObject.rows[i].devcode);
					arr_[i].push(jsonObject.rows[i].devename);
					arr_[i].push(jsonObject.rows[i].devaddr);
					arr_[i].push(jsonObject.rows[i].updown);
					arr_[i].push(jsonObject.rows[i].ipaddr);
					arr_[i].push(jsonObject.rows[i].ipport);
					arr_[i].push(jsonObject.rows[i].shape);
					arr_[i].push(jsonObject.rows[i].pointx);
					arr_[i].push(jsonObject.rows[i].pointy);
					arr_[i].push(jsonObject.rows[i].groupid);
					arr_[i].push(jsonObject.rows[i].devcname);
					arr_[i].push(false);
					arr_[i].push("");
					arr_[i].push(false);
					arr_[i].push("");
					arr_[i].push(2);
					arr_[i].push(jsonObject.rows[i].istate);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(-1);
					arr_[i].push(jsonObject.rows[i].plcid);
					arr_[i].push(jsonObject.rows[i].channel);
					arr_[i].push(jsonObject.rows[i].outword);
					arr_[i].push(jsonObject.rows[i].value);		//28
					arr_[i].push(jsonObject.rows[i].fnvalue);   //29
					arr_[i].push(jsonObject.rows[i].fnvalue1);  //30
					arr_[i].push(jsonObject.rows[i].value1);  //31
                    arr_[i].push(jsonObject.rows[i].icount1);  //32
                    arr_[i].push(jsonObject.rows[i].icount2);
                    arr_[i].push(jsonObject.rows[i].focc1);
                    arr_[i].push(jsonObject.rows[i].focc2);
                    arr_[i].push(jsonObject.rows[i].fspeed1);
                    arr_[i].push(jsonObject.rows[i].fspeed2); //37
                    arr_[i].push(jsonObject.rows[i].fengsu); //38
                    arr_[i].push(jsonObject.rows[i].nengjiandu); //39
                    arr_[i].push(jsonObject.rows[i].playx); //40
                    arr_[i].push(jsonObject.rows[i].playy); //41
				}
			}
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}



devgetpara2(arr_TS,TSinit,1,1);
devgetpara2(arr_LS,LSinit,2,1);
devgetpara2(arr_LIGHT,LIGHTinit,4,1);                 //照明
devgetpara2(arr_LED,LEDinit,6,1);
devgetpara2(arr_FAN,FANinit,8,1);
devgetpara2(arr_COVI,COVIinit,7,1);
devgetpara2(arr_FSFX,FSFXinit,5,1);
devgetpara2(arr_FB,FBinit,11,1);          //收报
devgetpara2(arr_FGS,FGSinit,12,3);   //wu
devgetpara2(arr_FGW,FGWinit,13,3);   //wu
devgetpara2(arr_FGR,FGRinit,14,3);   //wu
devgetpara2(arr_DOOR,DOORinit,16,1);           //车横   DOOR
 devgetpara2(arr_CMS,CMSinit,23,2);		//情报板
devgetpara2(arr_CAM,CAMinit,17,2);     //摄像头
devgetpara2(arr_DEC,DECinit,18,2);       //紧急电话  主机
devgetpara2(arr_ET,ETinit,19,2);				//紧急电话分机
devgetpara2(arr_VD,VDinit,20,2);         //车检
devgetpara2(arr_PUMP,PUMPinit,21,3);		//wu
devgetpara2(arr_WD,WDinit,22,2);			//气象
devgetpara2(arr_TCMS,TCMSinit,25,2);		//限速标志
devgetpara2(arr_FCMS,FCMSinit,41,3);    //wu
devgetpara2(arr_DOOREx,DOORExinit,40,3);   //wu
//加载故障设备
function geterrordev(){
	arr_Error = new Array();
	var i=0;
	i=adderrordev(arr_TS,i,"TS");
	i=adderrordev(arr_LS,i,"LS");
	i=adderrordev(arr_LIGHT,i,"LIGHT");
	i=adderrordev(arr_LED,i,"LED");
	i=adderrordev(arr_FAN,i,"FAN");
	i=adderrordev(arr_COVI,i,"COVI");
	i=adderrordev(arr_FSFX,i,"FSFX");
	i=adderrordev(arr_FB,i,"FB");
	i=adderrordev(arr_FGS,i,"FGS");
	i=adderrordev(arr_FGW,i,"FGW");
	i=adderrordev(arr_FGR,i,"FGR");
	i=adderrordev(arr_DOOR,i,"DOOR");
	i=adderrordev(arr_CMS,i,"CMS");
	i=adderrordev(arr_CAM,i,"CAM");
	i=adderrordev(arr_DEC,i,"DEC");
	i=adderrordev(arr_ET,i,"ET");
	i=adderrordev(arr_VD,i,"VD");
	i=adderrordev(arr_PUMP,i,"PUMP");
	i=adderrordev(arr_WD,i,"WD");
	i=adderrordev(arr_TCMS,i,"TCMS");
	i=adderrordev(arr_FCMS,i,"FCMS");
	i=adderrordev(arr_DOOREx,i,"DOOREx");
}

function adderrordev(arr_,num,devtype){
	for(var j=0;j<arr_.length;j++){
		if(arr_[j][19]==0){
			//arr_[j][18]=devtype;
			arr_Error[num]=new Array();
			arr_Error[num].push(arr_[j][1]);
			arr_Error[num].push(arr_[j][13]);
			arr_Error[num].push(arr_[j][5]);
			arr_Error[num].push(arr_[j][2]);
			arr_Error[num].push(returnDevTypeName(devtype));
			num++;
		}
	}
	return num;
}

geterrordev()
/*------------------------------------------------------------------------------------------------------
PLC信息加载
------------------------------------------------------------------------------------------------------*/
function plcgetinfo(arr_,b){
	$.ajax({
		type: "GET",
		url : "bcd/php/getplc.php?sid=" + Math.random()+ "&itype=1",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(mydata){
				var jsonObject=eval("("+mydata+")");
				for (var i=0;i<jsonObject.results;i++){
				   arr_[i] = new Array();
				   arr_[i].push(i);
				   arr_[i].push(jsonObject.rows[i].id);
				   arr_[i].push(jsonObject.rows[i].state);
				   arr_[i].push(jsonObject.rows[i].name);
				   arr_[i].push(false);
				   arr_[i].push("");
				   arr_[i].push(-1);
				   arr_[i].push(-1);
				   arr_[i].push(jsonObject.rows[i].tunnel);
			   }
			}
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}

plcgetinfo(arr_PLC,PLCinit);

/*------------------------------------------------------------------------------------------------------
情报板加载
------------------------------------------------------------------------------------------------------*/
function getgscms(arr_,b){
	$.ajax({
		type: "GET",
		url : "bcd/json/getcms.php?sid=" + Math.random()+ "&itype=1",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(mydata){
				var jsonObject=eval("("+mydata+")");
				for (var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(i);
					arr_[i].push(jsonObject.rows[i].id);
					arr_[i].push(jsonObject.rows[i].devno);
					arr_[i].push(jsonObject.rows[i].tunnel);
					arr_[i].push(jsonObject.rows[i].updown);
					arr_[i].push(jsonObject.rows[i].devtype);
					arr_[i].push(jsonObject.rows[i].devaddr);
				}
			}			
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}

getgscms(arr_GSCMS,GSCMSinit);

/*------------------------------------------------------------------------------------------------------
情报板预设信息加载
------------------------------------------------------------------------------------------------------*/
function getcmstext(arr_,b){
	$.ajax({
		type: "GET",
		url : "bcd/json/getpreinfocms.php?sid=" + Math.random()+ "&itype=1",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(mydata){
				var jsonObject=eval("("+mydata+")");
				for (var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(i);
					arr_[i].push(jsonObject.rows[i].preinfoid);
					arr_[i].push(jsonObject.rows[i].preinfocontent);
				}
			}	
			b[0]=true;		
		},
		error: function(mydata){b[0]=false;}
	});
}

getcmstext(arr_CMSTEXT,CMSTEXTinit);

//重新请求方案信息
function regetcmstext(){
	CMSTEXTinit[0]=false;
	arr_CMSTEXT = new Array();
	getcmstext(arr_CMSTEXT,CMSTEXTinit);
}

/*------------------------------------------------------------------------------------------------------
信号灯控制方案加载
------------------------------------------------------------------------------------------------------*/
function getsigplan(arr_,b){
	$.ajax({
		type: "GET",
		url : "bcd/json/getsigplan.php?sid=" + Math.random()+ "&itype=1",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(mydata){
				var jsonObject=eval("("+mydata+")");
				for (var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(i);
					arr_[i].push(jsonObject.rows[i].id);
					arr_[i].push(jsonObject.rows[i].tunnel);
					arr_[i].push(jsonObject.rows[i].name);
				}
			}
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}

getsigplan(arr_PLAN,PLANinit);
//还有
function getsigplaninfo(planindex){
	var totalnum=0;
	var tmpurl="";
	for (var i=0;i<arr_TS.length;i++){
		if (arr_TS[i][2]==arr_PLAN[planindex][2]){
			tmpurl+="&ename"+totalnum+"="+arr_TS[i][4];
			totalnum++;
		}
	}
	for (var i=0;i<arr_LS.length;i++){
		if (arr_LS[i][2]==arr_PLAN[planindex][2]){
			tmpurl+="&ename"+totalnum+"="+arr_LS[i][4];
			totalnum++;
		}
	}
	var sigplaninfourl="bcd/json/getsigplaninfo.php?sid=" + Math.random()+ "&itype=1&name=" ;
	$.ajax({
		type: "GET",
		url : sigplaninfourl+arr_PLAN[planindex][3]+"&total="+totalnum+tmpurl,
		//data:{},
		dataType: "json",
		async:false,
		success: function(mydata){
			if(mydata){
				arr_PLAN[planindex][4] = new Array();
				for (var j=0;j<totalnum;j++){
					arr_PLAN[planindex][4][j] = new Array();
					arr_PLAN[planindex][4][j][0] = mydata[j].ename;
					if(mydata[j].tip==""){
						arr_PLAN[planindex][4][j][1] = "0";
					}else{
						arr_PLAN[planindex][4][j][1] = mydata[j].tip;
					}
				}
			}
		},
		error: function(mydata){}
	});
}

//获取方案信息
if (PLANinit[0]==true){
	for (var i=0;i<arr_PLAN.length;i++){
		getsigplaninfo(i);
	}
}

//重新请求方案信息
function regetsigplan(){
	PLANinit[0]=false;
	arr_PLAN = new Array();
	getsigplan(arr_PLAN,PLANinit);
	if (PLANinit[0]==true){
		for (var i=0;i<arr_PLAN.length;i++){
			getsigplaninfo(i);
		}
	}
}

/*------------------------------------------------------------------------------------------------------
火灾控制方案加载
------------------------------------------------------------------------------------------------------*/
function getfireplan(arr_,b){
	$.ajax({
		type: "GET",
		url : "bcd/json/getfireplan.php?sid=" + Math.random()+ "&itype=1",
		//data:{},
		dataType: "text",
		async:false,
		success: function(mydata){
			if(mydata){
				var jsonObject=eval("("+mydata+")");
				for (var i=0;i<jsonObject.results;i++){
					arr_[i] = new Array();
					arr_[i].push(i);
					arr_[i].push(jsonObject.rows[i].id);
					arr_[i].push(jsonObject.rows[i].tunnel);
					arr_[i].push(jsonObject.rows[i].updown);
					arr_[i].push(jsonObject.rows[i].name);
					arr_[i].push(jsonObject.rows[i].led);
					arr_[i].push(jsonObject.rows[i].fan);
					arr_[i].push(jsonObject.rows[i].door);
					arr_[i].push(jsonObject.rows[i].fb);
					arr_[i].push(jsonObject.rows[i].ts);
					arr_[i].push(jsonObject.rows[i].ls);
					arr_[i].push(jsonObject.rows[i].sendtext);
					arr_[i].push(jsonObject.rows[i].textformat);
				}
			}
			b[0]=true;
		},
		error: function(mydata){b[0]=false;}
	});
}

getfireplan(arr_Fire,Fireinit);

//重新请求方案信息
function regetfireplan(){
	Fireinit[0]=false;
	arr_Fire = new Array();
	getfireplan(arr_Fire,Fireinit);
}

function setfire(tunnel,updown,led,fan,door,fb,ts,ls,sendtext,textformat){
	//判断方案是否执行，执行中为0，可以执行为1
	var flag=arr_TUNNEL[tunnel][3+updown];
	if(flag){
		arr_TUNNEL[tunnel][3+updown] = 0;
		var tmplist = "";
		var tstotal = 0;
		if(ts!=-1){
			for(var i=0;i<arr_TS.length;i++){
				if(arr_TS[i][2]==tunnel&&arr_TS[i][6]==updown&&arr_TS[i][19]!=ts){
					tmplist = tmplist + "&tsid" + tstotal +"=" + arr_TS[i][1];
					tstotal++;
				}
			}
			tmplist = tmplist + "&tsstate=" + ts;
		}
		tmplist = tmplist + "&tstotal=" + tstotal;
		var lstotal = 0;
		if(ls!=-1){
			for(var i=0;i<arr_LS.length;i++){
				if(arr_LS[i][2]==tunnel&&arr_LS[i][6]==updown&&arr_LS[i][19]!=ls){
					tmplist = tmplist + "&lsid" + lstotal +"=" + arr_LS[i][1];
					lstotal++;
				}
			}
			tmplist = tmplist + "&lsstate=" + ls;
		}
		tmplist = tmplist + "&lstotal=" + lstotal;
		var fbtotal = 0;
		if(fb!=-1){
			for(var i=0;i<arr_FB.length;i++){
				if(arr_FB[i][2]==tunnel&&arr_FB[i][6]==updown&&arr_FB[i][19]!=fb){
					tmplist = tmplist + "&fbid" + fbtotal +"=" + arr_FB[i][1];
					fbtotal++;
				}
			}
			tmplist = tmplist + "&fbstate=" + fb;
		}
		tmplist = tmplist + "&fbtotal=" + fbtotal;
		var ledtotal = 0;
		if(led!=-1){
			for(var i=0;i<arr_LED.length;i++){
				if(arr_LED[i][2]==tunnel&&arr_LED[i][6]==updown&&arr_LED[i][19]!=led){
					tmplist = tmplist + "&ledid" + ledtotal +"=" + arr_LED[i][1];
					ledtotal++;
				}
			}
			tmplist = tmplist + "&ledstate=" + led;
		}
		tmplist = tmplist + "&ledtotal=" + ledtotal;
		var doortotal = 0;
		if(door!=-1){
			for(var i=0;i<arr_DOOR.length;i++){
				if(arr_DOOR[i][2]==tunnel&&arr_DOOR[i][6]==updown&&arr_DOOR[i][19]!=door){
					tmplist = tmplist + "&doorid" + doortotal +"=" + arr_DOOR[i][1];
					doortotal++;
				}
			}
			tmplist = tmplist + "&doorstate=" + door;
		}
		tmplist = tmplist + "&doortotal=" + doortotal;
		var setfirefan = 0;
		var returndata;
		$.ajax({
			type: "GET",
			url : "bcd/json/setfire.php?sid=" + Math.random()+ "&itype=1"+tmplist,
			//data:{},
			dataType: "json",
			async:false,
			success: function(mydata){
				if(mydata){
					returndata = mydata.msg;
					if(mydata.result){
						setfirefan = 1;//成功标记
					}
				}
			},
			error: function(mydata){}
		});
		//风机处理
		var zzz = 0;
		if(setfirefan){
			if(fan==0){
				for(var i=0;i<arr_FAN.length;i++){
					if(arr_FAN[i][2]==tunnel&&arr_FAN[i][6]==updown&&arr_FAN[i][19]!=0){
						changestate(arr_FAN[i][1],0);
					}
				}
			}
			if(fan==1){
				var m=-1;
				var v1,v2;
				for(var i=0;i<arr_FSFX.length;i++){//获得同隧道同上下行的fsfx(第一个)
					if(arr_FSFX[i][2]==tunnel&&arr_FSFX[i][6]==updown){
						m=i;
						break;
					}
				}
				//console.log(m);
				if(m==-1){//没有对应风向做参照时默认为
					v1=2;
					v2=1;
				}else{
					if(arr_FSFX[m][19]==1){ //往左---需要反转
					  v1=2; //最终方向反转
					  v2=1; //取消方向正转
					}else{      //往右---需要正转
					  v1=1; //最终方向正转
					  v2=2; //取消方向反转
					}
				}
				for(var i=0;i<arr_FAN.length;i++){
					//console.log(typeof(tunnel));
					//console.log(arr_FAN[i][2]==tunnel);
					if(arr_FAN[i][2]==tunnel&&arr_FAN[i][6]==updown){
						if(arr_FAN[i][19]==v2){
							changestate(arr_FAN[i][1],0);
							setTimeout("changestate("+arr_FAN[i][1]+","+v1+")",zzz*10000+30000);
							zzz++;
							//console.log("changestate("+arr_FAN[i][1]+","+v1+")");
						}
						if(arr_FAN[i][19]==0){
							setTimeout("changestate("+arr_FAN[i][1]+","+v1+")",zzz*10000+30000);
							zzz++;
							//console.log("changestate("+arr_FAN[i][1]+","+v1+")");
						}
					}
				}
			}
		}

		//情报板更改
		var tmp2list = "&tunnel="+tunnel+"&updown="+updown;
		var textsend = new Array();
		textsend = sendtext.split("*");
		var formattext = new Array();
		formattext = textformat.split("*");
		var sendflag = 0;
		if(textsend.length==formattext.length){
			sendflag = 1;
			tmp2list = tmp2list + "&rowcount=" + textsend.length;
			for(var i=0;i<textsend.length;i++){
				tmp2list = tmp2list +"&sendtext" + i + "=" + textsend[i];
				tmp2list = tmp2list +"&textformat" + i + "=" + formattext[i];
			}
		}
		if(sendflag){
			$.ajax({
				type: "GET",
				url : "bcd/json/cms_send.php?sid=" + Math.random()+ "&itype=1"+tmp2list,
				//data:{},
				dataType: "json",
				async:false,
				success: function(mydata){
					if(mydata){
						returndata = mydata.msg + "," + returndata;
					}
				},
				error: function(mydata){}
			});
		}else{
			returndata = "???," + returndata;
		}

		if(setfirefan==0||fan==0||zzz==0){
			alert(returndata);
			arr_TUNNEL[tunnel][3+updown] = 1;
		}else{
			alert(returndata+",将逐步更改风机状态请勿关闭浏览器");
			setTimeout("arr_TUNNEL["+tunnel+"][3+"+updown+"] = 1",zzz*10000+30000);
		}
	}else{
		//手动控制就只提示不自动10秒后尝试重新执行了,或有需求也可根据需求执行
		//setTimeout("setfire("+tunnel+","+updown+","+ts+","+ls+","+fb+","+led+","+door+","+fan+")",10000);
		alert("方案执行中！风机状态如未更改完毕请等待执行完毕才可切换方案执行");
	}
}

/*------------------------------------------------------------------------------------------------------
设备状态更新
------------------------------------------------------------------------------------------------------*/
var xmlhttpstate;
var hasstate;
function devchangstate(i,arr_,jsonObject){
	for (var j=0;j<arr_.length;j++){
		if (jsonObject.rows[i].id==arr_[j][1]){
			if (jsonObject.rows[i].state!=arr_[j][19]){
				arr_[j][14]=true;
				arr_[j][15]=jsonObject.rows[i].dt;
				arr_[j][19]=jsonObject.rows[i].state;
			}
			hasstate=true;
			break;
		}
	}
}

function ajaxChangedstate(){
	if (xmlhttpstate.readyState==4 && xmlhttpstate.status==200) {
		var jsonresponse;
		var jsonObject;
		jsonresponse=xmlhttpstate.responseText;
		jsonObject=eval("("+jsonresponse+")");
		//document.getElementById("x-desktop").innerHTML=xmlhttpstate.responseText;
	 	for (var i=0;i<jsonObject.results;i++){
			hasstate=false;
			if (!hasstate) {devchangstate(i,arr_TS,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_LS,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_LIGHT,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_LED,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_FAN,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_COVI,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_FSFX,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_FB,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_FGS,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_FGW,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_FGR,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_DOOR,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_CMS,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_CAM,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_DEC,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_ET,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_VD,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_PUMP,jsonObject);}
			if (!hasstate) {devchangstate(i,arr_WD,jsonObject);}
		}
	}
}


function getDevState(){
	var stateurl="bcd/php/getstate.php?sid=" + Math.random()+ "&itype=1";
	xmlhttpstate= ajaxcreateXMLHttpRequest();
	xmlhttpstate.onreadystatechange=ajaxChangedstate;
	xmlhttpstate.open("GET", stateurl, true);
	xmlhttpstate.send(null);
}

getDevState();

/*------------------------------------------------------------------------------------------------------
PLC状态更新
------------------------------------------------------------------------------------------------------*/
var xmlhttpplcstate;
var hasplcstate;
function plcchangstate(i,arr_,jsonObject){
	for (var j=0;j<arr_.length;j++){
		if (jsonObject.rows[i].id==arr_[j][1]){
			if (jsonObject.rows[i].state!=arr_[j][2]){
				arr_[j][4]=true;
				arr_[j][5]=jsonObject.rows[i].dt;
				arr_[j][2]=jsonObject.rows[i].state;
				console.log(jsonObject.rows[i].state);
				arr_[j][7]=jsonObject.rows[i].runmode;
			}
			hasplcstate=true;
			break;
		}
	}
}

function ajaxChangedplcstate(){
	if (xmlhttpplcstate.readyState==4 && xmlhttpplcstate.status==200) {
		var jsonresponse;
		var jsonObject;	
		jsonresponse=xmlhttpplcstate.responseText;
		jsonObject=eval("("+jsonresponse+")");
	 	for (var i=0;i<jsonObject.results;i++){
			hasplcstate=false;
			if (!hasplcstate) {plcchangstate(i,arr_PLC,jsonObject);}
		}
	}
}

function getPLCState(){
	var plcstateurl="bcd/php/getplcstate.php?sid=" + Math.random()+ "&itype=1" ;
	xmlhttpplcstate= ajaxcreateXMLHttpRequest();
	xmlhttpplcstate.onreadystatechange=ajaxChangedplcstate;
	xmlhttpplcstate.open("GET", plcstateurl, true);
	xmlhttpplcstate.send(null);
}

getPLCState();

/*------------------------------------------------------------------------------------------------------
设备值更新
------------------------------------------------------------------------------------------------------*/
var xmlhttpvalue;
var hasvalue;
function devchangvalue(i,arr_,jsonObject){
	for (var j=0;j<arr_.length;j++){
		if (jsonObject.rows[i].id==arr_[j][1]){
			if (jsonObject.rows[i].state!=arr_[j][19] || jsonObject.rows[i].value !=arr_[j][28] || jsonObject.rows[i].fnvalue!=arr_[j][29] ||
				jsonObject.rows[i].fnvalue1 !=arr_[j][30] || jsonObject.rows[i]. value1!=arr_[j][31]  || jsonObject.rows[i].shape!=arr_[j][9] ||
                jsonObject.rows[i].icount1 !=arr_[j][32] || jsonObject.rows[i]. icount2!=arr_[j][33]  || jsonObject.rows[i].focc1!=arr_[j][34] ||
                jsonObject.rows[i].focc2 !=arr_[j][35] || jsonObject.rows[i]. fspeed1!=arr_[j][36]  || jsonObject.rows[i].fspeed2!=arr_[j][37] ||
                jsonObject.rows[i].fengsu !=arr_[j][38] || jsonObject.rows[i]. nengjiandu!=arr_[j][39]
			)
			{
				arr_[j][16]=true;
				arr_[j][17]=jsonObject.rows[i].dt;
				arr_[j][17]=jsonObject.rows[i].shape;
				arr_[j][19]=jsonObject.rows[i].state;  //state
				//arr_[j][20]=jsonObject.rows[i].i2;  // -1
				arr_[j][29]=jsonObject.rows[i].fnvalue;  //f1
				arr_[j][30]=jsonObject.rows[i].fnvalue1;		//  f2
				arr_[j][28]=jsonObject.rows[i].value;    // va
				arr_[j][31]=jsonObject.rows[i].value1;    // va 1

                arr_[j][32]=jsonObject.rows[i].icount1;    // 32
                arr_[j][33]=jsonObject.rows[i].icount2;    // va 1
                arr_[j][34]=jsonObject.rows[i].focc1;    // va 1
                arr_[j][35]=jsonObject.rows[i].focc2;    // va 1
                arr_[j][36]=jsonObject.rows[i].fspeed1;    // va 1
                arr_[j][37]=jsonObject.rows[i].fspeed2;    // 37
                arr_[j][38]=jsonObject.rows[i].fengsu;    // 38
                arr_[j][39]=jsonObject.rows[i].nengjiandu;    // 39
				// arr_[j][23]=jsonObject.rows[i].v1;
				// arr_[j][24]=jsonObject.rows[i].v2;
			}
			hasvalue=true;
			break;
		}
	}
}

function ajaxChangedvalue(){
	if (xmlhttpvalue.readyState==4 && xmlhttpvalue.status==200) {
		var jsonresponse;
		var jsonObject;	
		jsonresponse=xmlhttpvalue.responseText;
		jsonObject=eval("("+jsonresponse+")");
		//document.getElementById("x-desktop").innerHTML=xmlhttpstate.responseText;
	 	for (var i=0;i<jsonObject.results;i++){
			hasvalue=false;			
			if (!hasvalue) {devchangvalue(i,arr_TS,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_LS,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_LIGHT,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_LED,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_FAN,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_COVI,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_FSFX,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_FB,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_FGS,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_FGW,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_FGR,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_DOOR,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_CMS,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_CAM,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_DEC,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_ET,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_VD,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_PUMP,jsonObject);}
			if (!hasvalue) {devchangvalue(i,arr_WD,jsonObject);}
		}
	}
}

function getDevValue(){
	var valueurl="bcd/php/getvalue.php?sid=" + Math.random()+ "&itype=1" ;
	xmlhttpvalue= ajaxcreateXMLHttpRequest();
	xmlhttpvalue.onreadystatechange=ajaxChangedvalue;
	xmlhttpvalue.open("GET", valueurl, true);
	xmlhttpvalue.send(null);
}

getDevValue();
var tunnelnum=$("#default_place_select").val();//隧道号
var autourl1="bcd/php/getauto.php?tunnel="+tunnelnum+"&sid=" + Math.random()+ "&itype=" ;
function getFJAuto1(devindex,devid,devname){
	$.ajax({
		type: "GET",
		url : autourl1+1+"&name="+devname,
		//data:{},
		dataType: "json",
		async:false,
		success: function(mydata){
			if(mydata){
				FJIntel=mydata.fjintal;
				arr_FJ[devindex] = new Array();
				arr_FJ[devindex][0]=devid;
				arr_FJ[devindex][1]=devname;
				arr_FJ[devindex][2]=mydata.use;
				arr_FJ[devindex][3]= new Array();
				arr_FJ[devindex][3][0]=new Array();
				arr_FJ[devindex][3][0][0]="正常";
				arr_FJ[devindex][3][0][1]=mydata.c1hint;
				arr_FJ[devindex][3][0][2]=mydata.c1cmin;
				arr_FJ[devindex][3][0][3]=mydata.c1cmax;
				arr_FJ[devindex][3][0][4]=mydata.c1vmin;
				arr_FJ[devindex][3][0][5]=mydata.c1vmax;
				arr_FJ[devindex][3][1]=new Array();
				arr_FJ[devindex][3][1][0]="报警";
				arr_FJ[devindex][3][1][1]=mydata.c2hint;
				arr_FJ[devindex][3][1][2]=mydata.c2cmin;
				arr_FJ[devindex][3][1][3]=mydata.c2cmax;
				arr_FJ[devindex][3][1][4]=mydata.c2vmin;
				arr_FJ[devindex][3][1][5]=mydata.c2vmax;			
				arr_FJ[devindex][3][2]=new Array();
				arr_FJ[devindex][3][2][0]="关闭";
				arr_FJ[devindex][3][2][1]=mydata.c3hint;
				arr_FJ[devindex][3][2][2]=mydata.c3cmin;
				arr_FJ[devindex][3][2][3]=mydata.c3cmax;
				arr_FJ[devindex][3][2][4]=mydata.c3vmin;
				arr_FJ[devindex][3][2][5]=mydata.c3vmax;	
				arr_FJ[devindex][7]=-1;
				arr_FJ[devindex][8]=1;//1代表空闲可执行
			}
		},
		error: function(mydata){}
	});
}

function getZMAuto1(devindex,devid,devname){
	$.ajax({
		type: "GET",
		url : autourl1+2+"&name="+devname,
		//data:{},
		dataType: "json",
		async:false,
		success: function(mydata){
			if(mydata){
				ZMIntel1=mydata.zmintal;
				arr_ZM1[devindex] = new Array();
				arr_ZM1[devindex][0]=devid;
				arr_ZM1[devindex][1]=devname;
				arr_ZM1[devindex][2]= new Array();
				arr_ZM1[devindex][2][0]= new Array();
				arr_ZM1[devindex][2][0][0]="晴天";
				arr_ZM1[devindex][2][0][1]=mydata.use1;
				arr_ZM1[devindex][2][0][2]=mydata.hint1;
				arr_ZM1[devindex][2][0][3]=mydata.outvala2;
				arr_ZM1[devindex][2][0][4]=mydata.outvala1;
				arr_ZM1[devindex][2][0][5]=mydata.invala2;
				arr_ZM1[devindex][2][0][6]=mydata.invala1;
				arr_ZM1[devindex][2][1]= new Array();
				arr_ZM1[devindex][2][1][0]="阴天"; 
				arr_ZM1[devindex][2][1][1]=mydata.use2;
				arr_ZM1[devindex][2][1][2]=mydata.hint2;
				arr_ZM1[devindex][2][1][3]=mydata.outvalb2;
				arr_ZM1[devindex][2][1][4]=mydata.outvalb1;
				arr_ZM1[devindex][2][1][5]=mydata.invalb2;
				arr_ZM1[devindex][2][1][6]=mydata.invalb1;
				arr_ZM1[devindex][2][2]= new Array();
				arr_ZM1[devindex][2][2][0]="晚上"; 
				arr_ZM1[devindex][2][2][1]=mydata.use3;
				arr_ZM1[devindex][2][2][2]=mydata.hint3;	
				arr_ZM1[devindex][2][2][3]=mydata.outvalc2;
				arr_ZM1[devindex][2][2][4]=mydata.outvalc1;
				arr_ZM1[devindex][2][2][5]=mydata.invalc2;
				arr_ZM1[devindex][2][2][6]=mydata.invalc1;			
				arr_ZM1[devindex][2][3]= new Array();
				arr_ZM1[devindex][2][3][0]="夜间"; 
				arr_ZM1[devindex][2][3][1]=mydata.use4;
				arr_ZM1[devindex][2][3][2]=mydata.hint4;
				arr_ZM1[devindex][2][3][3]=mydata.outvald2;
				arr_ZM1[devindex][2][3][4]=mydata.outvald1;
				arr_ZM1[devindex][2][3][5]=mydata.invald2;
				arr_ZM1[devindex][2][3][6]=mydata.invald1;	
				arr_ZM1[devindex][4]=-1;
			}
		},
		error: function(mydata){}
	});
}
var tunnelnum=$("#default_place_select").val();//隧道号
var autourl2="bcd/php/getlink.php?tunnel="+tunnelnum+"&sid=" + Math.random()+ "&itype=" ;
function getFJAuto2(devindex,devid,devname,devupdown){
	var totalnum=0;
	var tmpurl="";
	for (var i=0;i<arr_FAN.length;i++){
		if (arr_FAN[i][2]==devupdown){
			tmpurl+="&id"+totalnum+"="+arr_FAN[i][1];
			totalnum++;
		}
	}
	$.ajax({
		type: "GET",
		url : autourl2+1+"&name="+devname+"&total="+totalnum+tmpurl,
		dataType: "json",
		cache:false,
		async:false,
		success: function(mydata){
			if(mydata){
				arr_FJ[devindex][4]=mydata.fx;
				arr_FJ[devindex][5]=mydata.fxid;
				arr_FJ[devindex][6]=new Array();
				for (var i=0;i<totalnum;i++){
					arr_FJ[devindex][6][i]=new Array();
					arr_FJ[devindex][6][i][0]=mydata.data[i].devid;
					arr_FJ[devindex][6][i][1]=mydata.data[i].isselect;
				}
			}	
		},
		error: function(mydata){}
	});
}

function getZMAuto2(devindex,devid,devname,devupdown){
	var totalnum=0;
	var tmpurl="";
	for (var i=0;i<arr_LED.length;i++){
		if (arr_LED[i][2]==devupdown){
			tmpurl+="&id"+totalnum+"="+arr_LED[i][1];
			totalnum++;
		}
	}
	$.ajax({
		type: "GET",
		url : autourl2+2+"&name="+devname+"&total="+totalnum+tmpurl,
		//data:{},
		dataType: "json",
		async:false,
		success: function(mydata){
			if(mydata){
				arr_ZM1[devindex][3]=new Array();
				for (var i=0;i<4;i++){
					arr_ZM1[devindex][3][i]=new Array();
					for (var j=0;j<totalnum;j++){
						arr_ZM1[devindex][3][i][j]=new Array();
						arr_ZM1[devindex][3][i][j][0]=mydata[i][j].devid;
						arr_ZM1[devindex][3][i][j][1]=mydata[i][j].isselect;
						arr_ZM1[devindex][3][i][j][2]=mydata[i][j].isopen;
					}				
				}
			}
		},
		error: function(mydata){}
	});
}

function getZMAuto3(){
	var totalnum=0;
	var tmpurl="";
    var tunnelnum=$("#default_place_select").val();//隧道号
	for (var i=0;i<arr_LED.length;i++){
        if(arr_LED[i][2] == tunnelnum) {
            tmpurl += "&id" + totalnum + "=" + arr_LED[i][1];
            totalnum++;
        }
	}
	$.ajax({
		type: "GET",
		url : autourl2+3+"&total="+totalnum+tmpurl,
		//data:{},
		dataType: "json",
		async:false,
		success: function(mydata){
			if(mydata){
				for (var i=0;i<8;i++){
					arr_ZM2[i] = new Array();
					arr_ZM2[i][0] = mydata[i].time;
					arr_ZM2[i][1] = mydata[i].use;
					arr_ZM2[i][2] = mydata[i].hint;
					arr_ZM2[i][3] = new Array();
					for (var j=0;j<totalnum;j++){
						arr_ZM2[i][3][j]=new Array();
						arr_ZM2[i][3][j][0]=mydata[i].data[j].devid;
						arr_ZM2[i][3][j][1]=mydata[i].data[j].isopen;
					}
				}
			}
		},
		error: function(mydata){}
	});
}

//取风机环境控制信息
if (COVIinit[0]==true){
	for (var i=0;i<arr_COVI.length;i++){
		getFJAuto1(arr_COVI[i][0],arr_COVI[i][1],arr_COVI[i][13]);
		getFJAuto2(arr_COVI[i][0],arr_COVI[i][1],arr_COVI[i][13],arr_COVI[i][2]);
	}
}

//取照明环境控制信息
if (LIGHTinit[0]==true){
	for (var i=0;i<arr_LIGHT.length;i++){
		getZMAuto1(arr_LIGHT[i][0],arr_LIGHT[i][1],arr_LIGHT[i][13]);
		getZMAuto2(arr_LIGHT[i][0],arr_LIGHT[i][1],arr_LIGHT[i][13],arr_LIGHT[i][2]);
	}
}

//取照明时间控制信息
if (LEDinit[0]==true){
	getZMAuto3();
}

function getMode(){
	$.ajax({
		type: "GET",
		url : "bcd/php/getisauto.php?itype=1&tunnel="+tunnelnum+"&dc=" + new Date().getTime() + "",
		dataType: "json",
		async:false,
		success: function(mydata){
			if(mydata){
				FJMode=mydata;
                var html = (mydata==0) ? "手动" : (mydata == 1) ?  "环境" : "时序";
                $("#control_fan_value").html(html);
			}
		},
		error: function(mydata){}
	});		
	$.ajax({
		type: "GET",
		url : "bcd/php/getisauto.php?itype=2&tunnel="+tunnelnum+"&dc=" + new Date().getTime() + "",
		//data:{},
		dataType: "json",
		async:false,
		success: function(mydata){
			if(mydata){
				ZMMode=mydata;
                var html = (mydata == 0) ? "手动" : (mydata == 1) ?  "环境" : "时序";
                $("#control_led_value").html(html);
			}
		},
		error: function(mydata){}
	});		
}

//加载风机控制模式//加载照明控制模式
getMode();

//风机环境模式操作
function FJAutoModeRun(){
	for (var i=0;i<arr_COVI.length;i++){
		var devindex=arr_COVI[i][0];//对应arr_FJ的序号
		var co=arr_COVI[i][29];
		var vi=arr_COVI[i][30];
		if(co >= arr_FJ[devindex][3][0][2] && co <= arr_FJ[devindex][3][0][3] 
			&& vi >= arr_FJ[devindex][3][0][4] && vi <= arr_FJ[devindex][3][0][5]
			&& arr_FJ[devindex][2] && arr_FJ[devindex][7]!=1){
			arr_FJ[devindex][7]=1;//正常
			if(arr_FJ[devindex][3][0][1]){
				if (confirm("隧道环境已恢复正常，是否关闭风机?")) {  
					FJAutoModeStopSet(devindex);
				}
			}else{
				FJAutoModeStopSet(devindex);
			}
		}else if(co >= arr_FJ[devindex][3][1][2] && co <= arr_FJ[devindex][3][1][3] 
			&& vi >= arr_FJ[devindex][3][1][4] && vi <= arr_FJ[devindex][3][1][5]
			&& arr_FJ[devindex][2] && arr_FJ[devindex][7]!=2){
			arr_FJ[devindex][7]=2;//超标
			var v1,v2;
			var brun = 0;//是否执行
			if(arr_FJ[devindex][3][1][1]){
				if (confirm("隧道环境超标，是否要启动风机?")) {  
					brun=1;
				}
			}else{
				brun=1;
			}
			if(brun){
				var m=-1;
				for(var i=0;i<arr_FSFX.length;i++){
					if(arr_FSFX[i][1]==arr_FJ[devindex][5]){
						m=i;
						break;
					}
				}
				if(m==-1){//没有对应风向做参照时默认为
					v1=2;
					v2=1;
				}else{
					if(arr_FSFX[m][19]==1){ //往左---需要反转
					  v1=2; //最终方向反转
					  v2=1; //取消方向正转
					}else{      //往右---需要正转
					  v1=1; //最终方向正转
					  v2=2; //取消方向反转
					}
				}
				//先关掉反风向的风机
				for(var h=0;h<arr_FJ[devindex][6].length;h++){//遍历方案列表
					if(arr_FJ[devindex][6][h][1]==1){//如果关联的话
						for(var i=0;i<arr_FAN.length;i++){
							if(arr_FJ[devindex][6][h][0]==arr_FAN[i][1]){//在风机列表中找到对应的
								if(arr_FAN[i][19]==v2){//如果状态是v2
									changestate(arr_FAN[i][1],0);//将风机关闭
								}
								break;//不管改不改变,找到就不再继续找了
							}
						}
					}
				}

				//延时30秒执行开启操作防止接收不到停止信号
				setTimeout("FJAutoModeRunSet("+devindex+","+v1+")",30000);
			}
		}else if(co >= arr_FJ[devindex][3][2][2] && co <= arr_FJ[devindex][3][2][3] 
			&& vi >= arr_FJ[devindex][3][2][4] && vi <= arr_FJ[devindex][3][2][5]
			&& arr_FJ[devindex][2] && arr_FJ[devindex][7]!=3){
			arr_FJ[devindex][7]=3;
			alert("隧道环境指标已严重超标，请关闭隧道！");
		}
	}
}

//执行方案
function FJAutoModeStopSet(devindex){
	for(var h=0;h<arr_FJ[devindex][6].length;h++){//遍历方案列表
		if(arr_FJ[devindex][6][h][1]==1){//如果关联的话
			for(var i=0;i<arr_FAN.length;i++){
				if(arr_FJ[devindex][6][h][0]==arr_FAN[i][1]){//在风机列表中找到对应的
					if(arr_FAN[i][19]!=0){//如果状态不是停止
						changestate(arr_FAN[i][1],0);//将风机设置为停止
					}
					break;//不管改不改变,找到就不再继续找了
				}
			}
		}
	}
}

//执行方案
function FJAutoModeRunSet(devindex,v1){
	if(arr_FJ[devindex][8]){
		arr_FJ[devindex][8] = 0;
		var zzz = 0;
		for(var h=0;h<arr_FJ[devindex][6].length;h++){//遍历方案列表
			if(arr_FJ[devindex][6][h][1]==1){//如果关联的话
				for(var i=0;i<arr_FAN.length;i++){
					if(arr_FJ[devindex][6][h][0]==arr_FAN[i][1]){//在风机列表中找到对应的
						if(arr_FAN[i][19]!=v1){//如果状态不是v1
							//changestate(arr_FAN[i][1],v1);//将风机设置为v1状态
							//每次执行延迟10秒
							setTimeout("changestate("+arr_FAN[i][1]+","+v1+")",zzz*10000);
							zzz++;
						}
						break;//不管改不改变,找到就不再继续找了
					}
				}
			}
		}
		setTimeout("arr_FJ["+devindex+"][8] = 1",zzz*10000);
	}else{
		setTimeout("FJAutoModeRunSet("+devindex+","+v1+")",10000);
		alert("方案切换过快,前一方案还未执行完毕,等待10秒后将重新尝试执行");
	}
}

//照明环模式操作
function ZMAutoMode1Run(){
	for(var i=0;i<arr_LIGHT.length;i++){
		var devindex=arr_LIGHT[i][0];//对应arr_ZM1的序号
		var n1=arr_LIGHT[i][21];//洞内值
		var n2=arr_LIGHT[i][22];//洞外值
		for(var j=0;j<arr_ZM1[devindex][2].length;j++){
			if(n2 >= arr_ZM1[devindex][2][j][3] && n2 <= arr_ZM1[devindex][2][j][4] 
			&& n1 >= arr_ZM1[devindex][2][j][5] && n1 <= arr_ZM1[devindex][2][j][6] 
			&& arr_ZM1[devindex][2][j][1] && arr_ZM1[devindex][4]!=j){
				if(arr_ZM1[devindex][2][j][2]){
					if (confirm("光强度在"+ arr_ZM1[devindex][2][j][0] 
						+"范围内，是否切换为"+ arr_ZM1[devindex][2][j][0] +"方案?")){
						ZMAutoMode1Do(j,devindex);
					}
				}else{
					ZMAutoMode1Do(j,devindex);
				}
				break;
			}
		}
	}
}

//照明时间模式操作
function ZMAutoMode2Run(){
	var time=getNowFormatDate();
	for(var i=0;i<arr_ZM2.length;i++){
		if(arr_ZM2[i][0]==time&&curZMTimIn!=i&&arr_ZM2[i][1]==1){//启用，当前时间，当前方案非该方案
			if(arr_ZM2[i][2]){
				if (confirm("时间"+(i+1)+"所配置时间点已到达,是否切换为对应方案?")){
					ZMAutoMode2Do(i);
				}
			}else{
				ZMAutoMode2Do(i);
			}
		}
	}
}

//格式化时间
function getNowFormatDate(){
	var date=new Date();
	var strHour=date.getHours();
	var strMin=date.getMinutes();
	if(strHour>=0&&strHour<=9) strHour= "0"+strHour;
	if(strMin>=0&&strMin<=9) strMin= "0"+strMin;
	return strHour+":"+strMin;
}

//照明环境模式修改
function ZMAutoMode1Do(planid,devindex){
	arr_ZM1[devindex][4]=planid;
	for(var h=0;h<arr_ZM1[devindex][3][planid].length;h++){//遍历方案列表
		if(arr_ZM1[devindex][3][planid][h][1]==1){//如果关联的话
			for(var i=0;i<arr_LED.length;i++){
				if(arr_ZM1[devindex][3][planid][h][0]==arr_LED[i][1]){//在照明列表中找到对应的
					if(arr_LED[i][19]!=arr_ZM1[devindex][3][planid][h][2]){//按照动作,不一样则操作更改
						changestate(arr_LED[i][1],arr_ZM1[devindex][3][planid][h][2]);//将照明设置为对应状态
					}
					break;//不管改不改变,找到就不再继续找了
				}
			}
		}
	}
}

//照明时间模式修改
function ZMAutoMode2Do(planid){
	curZMTimIn=planid;
	for(var i=0;i<arr_LED.length;i++){
		for(var h=0;h<arr_ZM2[planid][3].length;h++){
			if(arr_ZM2[planid][3][h][0]==arr_LED[i][1]){//遍历数组找到对应的
				if(arr_LED[i][19]!=arr_ZM2[planid][3][h][1]){//判断跟动作是否一致
					changestate(arr_LED[i][1],arr_ZM2[planid][3][h][1]);//不一致,改为一致
				}
				break;//不管改不改变,找到就不再继续找了
			}
		}
	}
}
var changeflag = 1;//有未登录情况时置为0，即后续操作跳过不提交，无需重置为1，重新登录完加载即为1
//修改设备状态
function changestate(devid,state){
	if(changeflag){
		$.ajax({
			type: "GET",
			url : "bcd/php/setvalue2.php?id="+ devid +"&state="+ state +"&dc=" + new Date().getTime() + "",
			//data:{},
			dataType: "json",
			success: function(data){
				if(!data.result){
					changeflag = 0;
					sendThisScreenMSG(data.msg);
				}
			}
		})
	}
}

//定时环境控制
function AutoModeRun(){
	if (fjtimeresult!=-1){
		window.clearInterval(fjtimeresult);
		fjtimeresult=-1;
	}
	if (FJMode==1){
		fjtimeresult=window.setInterval(function(){
			FJAutoModeRun();						
		},60000*FJIntel);
	}
	if (zmtimeresult!=-1){
		window.clearInterval(zmtimeresult);
		zmtimeresult=-1;
	}
	if (ZMMode==1){
		zmtimeresult=window.setInterval(function(){
			ZMAutoMode1Run();						
		},60000*ZMIntel1);
	}
	else if (ZMMode==2){
		zmtimeresult=window.setInterval(function(){
			ZMAutoMode2Run();						
		},60000*ZMIntel2);
	}
}

//启动环境控制定时
AutoModeRun();
