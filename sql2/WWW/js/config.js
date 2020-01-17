

function returnPicclass(typevalue){
	var picclass;
	switch(typevalue){
		case "TS":
			//交通信号灯
			picclass="default-pic-TS";
			break;
		case "LS":
			//车道指示标志
			picclass="default-pic-LS";
			break;
		case "LIGHT":
			//光强
			picclass="default-pic-LIGHT";
			break;
		case "LED":
			//照明
			picclass="default-pic-LED";
			break;
		case "FAN":
			//风机
			picclass="default-pic-FAN";
			break;
		case "COVI":
			//COVI
			picclass="default-pic-COVI";
			break;
		case "FSFX":
			//风速风向
			picclass="default-pic-FSFX";
			break;
		case "FB":
			//手报
			picclass="default-pic-FB";
			break;
		case "FGS":
			//烟感
			picclass="default-pic-FGS";
			break;
		case "FGW":
			//温感
			picclass="default-pic-FGW";
			break;
		case "FGR":
			//消防箱
			picclass="default-pic-FGR";
			break;
		case "DOOR":
			//防火门
			picclass="default-pic-DOOR";
			break;
		case "CMS":
			//门架式情报板
			picclass="default-pic-CMS";
			break;
		case "CAM":
			//摄像机
			picclass="default-pic-CAM";
			break;
		case "DEC":
			//解码器
			picclass="default-pic-DEC";
			break;
		case "ET":
			//紧急电话
			picclass="default-pic-ET";
			break;
		case "VD":
			//车检
			picclass="default-pic-VD";
			break;
		case "PUMP":
			//消防水泵
			picclass="default-pic-PUMP";
			break;
		case "WD":
			//气象
			picclass="default-pic-WD";
			break;
		case "TCMS":
			//限速标志
			picclass="default-pic-TCMS";
			break;
		case "FCMS":
			//F型情报板
			picclass="default-pic-FCMS";
			break;
		case "DOOREx":
			//卷帘门
			picclass="default-pic-DOOREx";
			break;
		case "ETHOST":
			//紧急电话主机
            picclass="default-pic-ETHOST";
            break;
		default:
			picclass="default-pic-TS";
	}
	return picclass;
}
//

//右键菜单
function bindRightKey(id,picclass,shape){
	switch(picclass){
		/*
		//桌面右键
		case "default-panel-img":
			$("#"+id).contextMenu('menu_controlGroup', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
						onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'controlGroup_open': function(t) {
						rightMenuControl();
					}
				}
			});

			break;
		*/
		//CMS
		// case "default-pic-CMS":
        //     $("#"+id).contextMenu('menu_CMS', {
        //         onShowMenu: function(e, menu) {
        //             this.shadow = true;//去除阴影
        //             //定位菜单
        //             setTimeout(function(){
        //                 onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
        //             },1);
        //             return menu;
        //         },
        //         bindings:{
        //         	//上传
        //             'CMS_upload': function(t) {
        //                 layer.open({
        //                     type: 1 //此处以iframe举例
        //                     ,title: "情报板文件上传"
        //                     ,area: ['580px', '420px']
        //                     ,shade: 0
        //                     ,maxmin: true
        //                     ,offset: [Ht+10]
        //                     ,id: 'LAY_showMonitorWall_panel' //防止重复弹出
        //                     ,content: $("#showMonitorWall_CMSupload")
        //                     ,btn: ['关闭']
        //                     ,yes: function(index, layero){
        //                         layer.close(index);
        //                         $('#cmsuploadimg'+id+'').hide();
        //                         $('#cmsuploadtext'+id+'').hide();
        //                     }
        //                 });
        //             	 $('#cmsuploadimg'+id+'').show();
        //             	 $('#cmsuploadtext'+id+'').show();
        //                 console.log( window["upload"+id+""]);
        //                  if(window["upload"+id+""] != "92" )  return false;
        //                 	window["upload"+id+""] = false;
        //                 	console.log( window["upload"+id+""]);
        //                 layui.use('upload', function(){
        //                     var $ = layui.jquery
		// 						,upload = layui.upload;
        //                     //普通图片上传
        //                      upload.render({
        //                         elem: '#cmsuploadimg'+id+''
        //                         ,url: './bcd/php/setcms.php?itype=1&id='+id+''
        //                         ,accept: 'file' //普通文件
        //                         ,multiple: true
        //                         ,before: function(obj){
        //                             //预读本地文件示例，不支持ie8
        //                             $('#cmsuploadimg'+id+'').text("文件上传中。。");
        //                              layer.load(); //上传loading
        //                             obj.preview(function(index, file, result){
        //                                 $('#cmsuploadpic'+id+'').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img" style="width: 100px;height: 100px;margin-right:10px;margin-top:10px">')
        //                             });
        //                         }
        //                         ,done: function(res){
        //                             //上传完毕
		// 							$('#cmsuploadimg'+id+'').text("多文件上传");
        //                              layer.closeAll('loading'); //关闭loading
		// 							layer.msg(res.sinfo, {time: 2000, icon:6});
        //                         }
        //                         ,error: function(){
        //                             //演示失败状态，并实现重传
        //                             $('#cmsuploadimg'+id+'').text("多文件上传");
        //                              layer.closeAll('loading'); //关闭loading
        //                             var demoText = $('#demoText');
        //                             demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
        //                             demoText.find('.demo-reload').on('click', function(){
        //                                 uploadInst.upload();
        //                             });
        //                         }
        //                     });
        //                 });
        //             },
		// 			//下载
        //             'CMS_download': function(t) {
        //                 rightMenuAjax("CMS",t.id,1,"CMS_download")
        //             },
		// 			//设置亮度
        //             'CMS_setlight': function(t) {
        //                 $("#CMS_light").val("40");
        //                 $.ajax({
        //                     type:"get",
        //                     url:"./bcd/php/setcms.php?itype=3&id="+id+"",
        //                     dataType:"json",
        //                     success:function (res){
        //                         $("#CMS_light").val("40");
        //                     }
        //                 })
        //                 layer.open({
        //                     type: 1 //此处以iframe举例
        //                     ,title: "情报板亮度设置"
        //                     ,area: ['350px', '230px']
        //                     ,shade: 0
        //                     ,maxmin: true
        //                     ,offset: [Ht+10]
        //                     ,id: 'LAY_showMonitorWall_panel' //防止重复弹出
        //                     ,content: $("#showMonitorWall_CMS")
        //                     ,btn: ['确定','关闭']
        //                     ,yes: function(index, layero){
        //                     	var cms_light = $("#CMS_light").val();
		// 						$.ajax({
		// 							type:"get",
		// 							url:"./bcd/php/setcms.php?itype=4&id="+id+"",
		// 							dataType:"json",
		// 							success:function (res){
		// 								if(res.code >= 1){
        //                                     $("#CMS_light").val(res.light);
		// 									layer.msg(res.msg,{icon: 1});
		// 								}else if(res.code == "0"){
        //                                     layer.msg(res.msg,{icon: 2,time:1000});
		// 								}
        //                             }
		// 						})
        //                     }
        //                 })
        //             }
        //         }
        //     });
        //     break;

		//信号灯
		case "default-pic-TS":
			//右键
			var shape=parseInt(shape);
			switch(shape){
				case 3:
					$("#"+id).contextMenu('menu_TS_1', {
						onShowMenu: function(e, menu) {
							this.shadow = false;//去除阴影
							//定位菜单
							setTimeout(function(){
								onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
							},1);
							return menu;
						},
						bindings:{	
							'TS_red': function(t) {	
								rightMenuAjax("TS",t.id,0,"TS_red")
							},
							'TS_yellow': function(t) {
								rightMenuAjax("TS",t.id,1,"TS_yellow")
							},
							'TS_green': function(t) {	
								rightMenuAjax("TS",t.id,2,"TS_green")
							},
							'TS_green3': function(t) {
								rightMenuAjax("TS",t.id,3,"TS_green3")
							},
							'TS_green4': function(t) {
								rightMenuAjax("TS",t.id,4,"TS_green4")
							},
							'TS_green5': function(t) {
								rightMenuAjax("TS",t.id,5,"TS_green5")
							},
							'TS_green6': function(t) {
								rightMenuAjax("TS",t.id,6,"TS_green6")
							}
						}
					});
					break;
				case 4:
					$("#"+id).contextMenu('menu_TS_2', {
						onShowMenu: function(e, menu) {
							this.shadow = false;//去除阴影
							//定位菜单
							setTimeout(function(){
								onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
							},1);
							return menu;
						},
						bindings:{
							'TS_red': function(t) {
								rightMenuAjax("TS",t.id,1,"TS_red")
							},
							'TS_yellow': function(t) {
								rightMenuAjax("TS",t.id,2,"TS_yellow")
							},
							'TS_green': function(t) {
								rightMenuAjax("TS",t.id,4,"TS_green")
							},
							'TS_turnleft': function(t) {
								rightMenuAjax("TS",t.id,8,"TS_turnleft")
							}
						}
					});
					break;
				default:
					$("#"+id).contextMenu('menu_TS_1', {
						onShowMenu: function(e, menu) {
							this.shadow = false;//去除阴影
							//定位菜单
							setTimeout(function(){
								onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
							},1);
							return menu;
						},
						bindings:{
							'TS_red': function(t) {
								rightMenuAjax("TS",t.id,0,"TS_red")
							},
							'TS_yellow': function(t) {
								rightMenuAjax("TS",t.id,1,"TS_yellow")
							},
							'TS_green': function(t) {
								rightMenuAjax("TS",t.id,2,"TS_green")
							},
							'TS_green3': function(t) {
								rightMenuAjax("TS",t.id,3,"TS_green3")
							},
							'TS_green4': function(t) {
								rightMenuAjax("TS",t.id,4,"TS_green4")
							},
							'TS_green5': function(t) {
								rightMenuAjax("TS",t.id,5,"TS_green5")
							},
							'TS_green6': function(t) {
								rightMenuAjax("TS",t.id,6,"TS_green6")
							}
						}
					});
			}
			break;
		case "default-pic-LS":
			getLSMenu(id,shape);
			break;
		//LED
		case "default-pic-LED":
			$("#"+id).contextMenu('menu_LED', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'LED_close': function(t) {
						rightMenuAjax("LED",t.id,0,"LED_close")
					},
					'LED_open': function(t) {
						rightMenuAjax("LED",t.id,1,"LED_open")
					}
				}
			});			
			break;
		case "default-pic-FAN":
			$("#"+id).contextMenu('menu_FAN', {
				onShowMenu: function(e, menu) {
					this.shadow = true;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'FAN_stop': function(t) {
						rightMenuAjax("FAN",t.id,0,"FAN_stop") 
					},
					'FAN_right': function(t) {
						rightMenuAjax("FAN",t.id,1,"FAN_right")
					},
					'FAN_left': function(t) {
						rightMenuAjax("FAN",t.id,2,"FAN_left")
					}
				}
			});
			break;
		case "default-pic-DOOR":
			$("#"+id).contextMenu('menu_DOOR', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'DOOR_up': function(t) {
						rightMenuAjax("DOOR",t.id,1,"DOOR_up")  
					},
					'DOOR_down': function(t) {
						rightMenuAjax("DOOR",t.id,0,"DOOR_down")
					}
				}
			});
			break;
		case "default-pic-DOOREx":
			$("#"+id).contextMenu('menu_DOOREx', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'DOOREx_up': function(t) {
						rightMenuAjax("DOOREx",t.id,1,"DOOREx_up")  
					},
					'DOOREx_default': function(t) {
						rightMenuAjax("DOOREx",t.id,2,"DOOREx_default")
					},
					'DOOREx_down': function(t) {
						rightMenuAjax("DOOREx",t.id,3,"DOOREx_down")
					}
				}
			});
			break;
		case "default-pic-CAM":
			$("#"+id).contextMenu('menu_CAM', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'CAM_open': function(t) {
						showBigScreen(id);
					},
					'CAM_group': function(t) {
						//合屏
						bigScreenLoadCollection();
					},
					'CAM_separate': function(t) {
						//分屏
						bigScreenSplitCollection();
					}
				}
			});
			break;
	}
}

//车道指示标志右键类别
function getLSMenu(id,shape){
	var shape=parseInt(shape);
	switch(shape){
		case 1:
			$("#"+id).contextMenu('menu_LS_1', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'LS_stop': function(t) {
						rightMenuAjax("LS",t.id,0,"LS_stop");
					},
					'LS_go': function(t) {
						rightMenuAjax("LS",t.id,1,"LS_go");
					}
				}
			});
			break;
		case 2:
			$("#"+id).contextMenu('menu_LS_2', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'LS_twoway': function(t) {
						rightMenuAjax("LS",t.id,0,"LS_twoway");
					},
					'LS_right': function(t) {
						rightMenuAjax("LS",t.id,1,"LS_right");
					}
				}
			});
			break;
		case 3:
			$("#"+id).contextMenu('menu_LS_3', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'LS_twoway': function(t) {
						rightMenuAjax("LS",t.id,0,"LS_twoway");
					},
					'LS_right': function(t) {
						rightMenuAjax("LS",t.id,1,"LS_right");
					},
					'LS_left': function(t) {
						rightMenuAjax("LS",t.id,2,"LS_left");
					}
				}
			});
			break;
		case 4:
			$("#"+id).contextMenu('menu_LS_4', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'LS_twoway': function(t) {
						rightMenuAjax("LS",t.id,0,"LS_twoway");
					},
					'LS_right': function(t) {
						rightMenuAjax("LS",t.id,1,"LS_right");
					},
					'LS_left': function(t) {
						rightMenuAjax("LS",t.id,2,"LS_left");
					},
					'LS_turnleft': function(t) {
						rightMenuAjax("LS",t.id,3,"LS_turnleft");
					},'LS_turnleft1': function(t) {
					rightMenuAjax("LS",t.id,4,"LS_turnleft1");
					}
				}
			});
			break;
		case 5:
			$("#"+id).contextMenu('menu_LS_4', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'LS_twoway': function(t) {
						rightMenuAjax("LS",t.id,0,"LS_twoway");
					},
					'LS_right': function(t) {
						rightMenuAjax("LS",t.id,1,"LS_right");
					},
					'LS_left': function(t) {
						rightMenuAjax("LS",t.id,2,"LS_left");
					},
					'LS_turnleft': function(t) {
						rightMenuAjax("LS",t.id,3,"LS_turnleft");
					},'LS_turnleft1': function(t) {
						rightMenuAjax("LS",t.id,4,"LS_turnleft1");
					}
				}
			});
			break;
		default:
			$("#"+id).contextMenu('menu_LS_1', {
				onShowMenu: function(e, menu) {
					this.shadow = false;//去除阴影
					//定位菜单
					setTimeout(function(){
				  		onShowMenu(e.pageX,e.pageY,$($(menu[0])[0]).width(),$($(menu[0])[0]).height());
					},1);
					return menu;
				},
				bindings:{
					'LS_stop': function(t) {
						rightMenuAjax("LS",t.id,0,"LS_stop");
					},
					'LS_go': function(t) {
						rightMenuAjax("LS",t.id,1,"LS_go");
					}
				}
			});
	}
}

//定位右键位置
function onShowMenu(pageX,pageY,menuW,menuH){
	if(pageX+menuW>W){
		$("#jqContextMenu").css("left",W-menuW-10);
	}
	if(pageY+menuH>H){
		$("#jqContextMenu").css("top",H-menuH-10);
	}
}

//返回图片
function returnPicurl(typevalue,state,shape,updown,i1,i2,tunnelnum,n3,n1){
	// n3=28 ->value  n1 =29 ->fnvalue   i1= state
	var picurl="";
	var state=parseInt(state);
	var shape=parseInt(shape);
	var updown=parseInt(updown);              //上下行
	var i1=parseInt(i1);
	var i2=parseInt(i2);
	var up = updown;

	//0上行-1下行
	//正常或采集器异常

		switch(typevalue){
			case "TS":
				if(i1 == 1){
					picurl="../pic2/ts_"+up+"_"+n3+".png";
				}else{
					picurl="../pic2/ts_"+up+"_"+n3+".png";
				}

				break;
			case "LS":
				if(i1 == 1){
					if(shape == 3){
						if(up == 1) {
							switch (n3) {
								case 0:
									picurl = "../pic2/ls_1_0.png";
									break;
								case 1:
									picurl = "../pic2/ls_1_3.png";
									break;
								case 2:
									picurl = "../pic2/ls_1_4.png";
									break;
								default:
									picurl = "../pic2/ls_1_0.png";
							}
						}else if(up ==2){
							switch (n3) {
								case 0:
									picurl = "../pic2/ls_1_0.png";
									break;
								case 1:
									picurl = "../pic2/ls_2_3.png";
									break;
								case 2:
									picurl = "../pic2/ls_2_4.png";
									break;
								default:
									picurl = "../pic2/ls_1_0.png";
							}
						}
					}else if(shape == 5){
						if(up==1){
							//上行
							switch(n3){
								case 0:
									//双向禁止
									picurl="../pic2/ls_1_0.png";
									break;
								case 1:
									//正向通行
									picurl="../pic2/ls_1_3.png";
									break;
								case 2:
									//反向通行
									picurl="../pic2/ls_1_4.png";
									break;
								case 3:
									//正向左转
									picurl="../pic2/ls_2_2 - fb.png";
									break;
								case 4:
									//反向右转
									picurl="../pic2/ls_2_1.png";
									break;
								default:
									picurl="../pic2/ls_1_0.png";
							}
						}else{
							//下行
							switch(n3){
								case 0:
									//双向禁止
									picurl="../pic2/ls_1_0.png";
									break;
								case 1:
									//正向通行
									picurl="../pic2/ls_2_3.png";
									break;
								case 2:
									//反向通行
									picurl="../pic2/ls_1_4.png";
									break;
								case 3:
									//正向左转
									picurl="../pic2/ls_4_2.png";
									break;
								case 4:
									//反向右转
									picurl="../pic2/ls_4_1.png";
									break;
								default:
									picurl="../pic2/ls_1_0.png";
							}
						}
					}
				}else {
					picurl="../pic2/ls_"+up+"_-1.png";
				}

				break;
			case "LIGHT":
				//光强
				 // n3 = value  up = 后台updown
				if(i1 == 1){
					picurl="../pic2/light_"+up+"_"+n3+".png";
				}else if(i1 == 0) {
					picurl="../pic2/light_"+up+"_-1.png";
				}
				break;
			case "LED":
				//照明
				if(i1 == 1){
					picurl="../pic2/led_"+up+"_"+n3+".png";
				}else {
					picurl="../pic2/led_"+up+"_-1.png";
				}

				break;
			case "FAN":
				if(i1 == 1) {
					if (up == 1) {
						//上行
						switch (n3) {
							case 1:
								picurl = "../pic2/fan_1_" + n3 + ".gif";
								break;
							case 2:
								picurl = "../pic2/fan_1_" + n3 + ".gif";
								break;
							case 0:
								picurl = "../pic2/fan_1_" + n3 + ".png";
								break;
							case -1:
								picurl = "../pic2/fan_01" + n3 + ".png";
								break;
						}
					} else if (up == 2) {
						//下行
						switch (n3) {
							case 1:
								picurl = "../pic2/fan_2_" + n3 + ".gif";
								break;
							case 2:
								picurl = "../pic2/fan_2_" + n3 + ".gif";
								break;
							case 0:
								picurl = "../pic2/fan_2_" + n3 + ".png";
								break;
							case -1:
								picurl = "../pic2/fan_2_" + n3 + ".png";
								break;
						}
						//	picurl="../pic2/fan_2_"+i1+".png|gif";
					} else if (up == 0) {
						//下行
						switch (i1) {
							case 1:
								picurl = "../pic2/fan_0_" + i1 + ".gif";
								break;
							case 2:
								picurl = "../pic2/fan_0_" + i1 + ".gif";
								break;
							case 0:
								picurl = "../pic2/fan_0_" + i1 + ".png";
								break;
							case -1:
								picurl = "../pic2/fan_0_" + i1 + ".png";
								break;
						}
					}
				}else {
					picurl = "../pic2/fan_"+up+"_-1.png";
				}
				break;
			case "COVI":
				//COVI
				if(i1 == 1 ){
					if(up==1){
						//上行
						picurl="../pic2/covi_1_"+n3+".png";
					}else{
						//下行
						picurl="../pic2/covi_"+up+"_"+n3+".png";
					}
				}else{
					picurl="../pic2/covi_"+up+"_-1.png";
				}
				
				break;
			case "FSFX":
				//风速风向
				if(i1 == 1){
					picurl="../pic2/tw_"+up+"_"+n3+".png";
				}else if(i1 == 0){
					picurl="../pic2/tw_"+up+"_-1.png";
				}
				break;
			case "FB":
				//手报
				if(i1 == 1){
					picurl="../pic2/fb_"+up+"_"+n3+".png";
				}else{
					picurl="../pic2/fb_"+up+"_-1.png";
				}

				break;
			case "FGS":
				//烟感
				switch(i1){
					case 0:
						//正常
						picurl="../pic/fgs0.png";
						break;
					case 1:
						//火警
						picurl="../pic/fgs1.gif";
						break;
					default:
						picurl="../pic/fgs0.png";
				}
				break;
			case "FGW":
				//温感
				switch(i1){
					case 0:
						//正常
						picurl="../pic/fgw0.png";
						break;
					case 1:
						//火警
						picurl="../pic/fgw1.gif";			
						break;
					default:
						picurl="../pic/fgw0.png";
				}
				break;
			case "FGR":
				//消防箱-未有图-未有参数
				break;
				//原先的防火门改成车横
			case "DOOR":
				//车横
				if(i1 ==1 ){
					picurl="../pic2/gt_"+n3+".png";
				}else if(i1 == 0) {
					picurl="../pic2/gt_-1.png";
				}
				break;
			case "CMS":
				//门架式情报板    UP 上下行/
				if(i1 == 1){
					if(updown == 0) up=1;
					picurl="../pic2/cms_"+up+"_"+n3+".png";
				}else {
					picurl="../pic2/cms_"+up+"_-1.png";
				}
				break;
			case "CAM":
				//摄像机
                if(updown == 0) up=1;
				if(i1 == 1){
					picurl="../pic2/cam_1_"+shape+"_"+up+"_"+n3+".png";
				}else{
					picurl="../pic2/cam_1_"+shape+"_"+up+"_-1.png";
				}

				break;
			case "DEC":
				//解码器-未有图-未有参数
				//现在改成ETHOST
				break;
			case "ET":
				//紧急电话
				if(i1 == 1){
					picurl="../pic2/ET_"+up+"_"+n3+".png";
				}else if(i1 == 0){
					picurl="../pic2/ET_"+up+"_-1.png";
				}
				break;
			case "VD":
				//车检
                if(updown == 0) up=1;
				if(i1 == 1){
					if(up == -1){
						picurl="../pic2/vd.PNG";
					}else {
						picurl="../pic2/vd_"+up+"_"+n3+".PNG";
					}
				}else{
					picurl="../pic2/vd_"+up+"_-1.PNG";
				}
				break;
			case "PUMP":
				//消防水泵-未有图-未有参数
				break;
			case "WD":
				//气象-
                if(updown == 0) up=1;
				if(i1 == 1){
					picurl="../pic2/wd_"+up+"_"+n3+".png";
				}else {
					picurl="../pic2/wd_"+up+"_-1.png";
				}
				break;
			case "TCMS":
				//限速标志-未有图-未有参数
                if(updown == 0) up=1;
				if(i1 == 1){
					picurl="../pic2/tcms_"+up+"_"+n3+".png";
				}else {
					picurl="../pic2/tcms_"+up+"_-1.png";
				}
				break;
			case "FCMS":
				//F型情报板-未有图-未有参数
				break;
			case "DOOREx":

				//卷帘门
				switch(i1){
					case 1:
						//上位
						picurl="../pic/doorex.png";
						break;
					case 2:
						//中位
						picurl="../pic/doorex1.png";
						break;
					case 3:
						//下位
						picurl="../pic/doorex0.png";
						break;
					default:
						picurl="../pic/doorex.png";
				}	
				break;
			case "ETHOST":
				picurl="../pic2/ETHOST2.png";
				break;

		}

	//}
	//如果故障，则替换成故障图
	if(state==2){
		switch(typevalue){
			case "TS":
				break;
			case "LS":
				break;
			case "LIGHT":
				break;
			case "LED":
				break;
			case "FAN":
				//风机故障
			case "COVI":
				//COVI
			//	picurl="../pic/covi2.png";
				break;
			case "FSFX":
				//风速风向
				break;
			case "FB":
				break;
			case "FGS":
				break;
			case "FGW":
				break;
			case "FGR":
				break;
			case "DOOR":
				//防火门-人行横道
				break;
			case "CMS":
				break;
			case "CAM":
				picurl="../pic2/cam_1_"+shape+"_"+up+"_"+i1+".png";
				break;
			case "DEC":
				break;
			case "ET":
				//紧急电话
				//picurl="../pic/che_error.png";
				break;
			case "VD":

				break;
			case "PUMP":
				break;
			case "WD":
				//气象
				break;
			case "TCMS":
				break;
			case "FCMS":
				break;
			case "DOOREx":
				break;
			
		}
	}
	return picurl;
}

//返回设备信息
function returnPicinfo(spantype,title,typevalue,state,shape,updown,i1,i2,n1,n2){
	var picinfo="";
	var state=parseInt(state);
	var shape=parseInt(shape);
	var updown=parseInt(updown);
	var i1=parseInt(i1);
	var i2=parseInt(i2);
	var str;
	if(spantype==1){
		str="&#13;";
	}else{
		str="\n";
	}
	//正常或采集器异常
	if(state==1||state==3){
		switch(typevalue){
			case "TS":
				//交通信号灯
				switch(i1){
					case 0:
						//关闭
						picinfo="关闭";
						break;
					case 1:
						//红灯
						picinfo="红灯";
						break;
					case 2:
						//黄灯
						picinfo="黄灯";
						break;
					case 4:
						//绿灯
						picinfo="绿灯";
						break;
					case 8:
						//左转
						picinfo="左转";
						break;
					default:
						picinfo="关闭";
				}
				break;
			case "LS":
				//车道指示标志
				switch(shape){
					case 1:
						switch(i1){
							case 0:
								//禁止
								picinfo="禁止";
								break;
							case 1:
								//通行
								picinfo="通行";
								break;
							default:
								picinfo="禁止";
						}
						break;
					case 2:
						switch(i1){
							case 0:
								//双向禁止
								picinfo="双向禁止";
								break;
							case 1:
								//正向通行
								picinfo="正向通行";
								break;
							default:
								picinfo="双向禁止";
						}
						break;
					case 3:
						switch(i1){
							case 0:
								//双向禁止
								picinfo="双向禁止";
								break;
							case 1:
								//正向通行
								picinfo="正向通行";
								break;
							case 3:
								//反向通行
								picinfo="反向通行";
								break;
							default:
								picinfo="双向禁止";
						}
						break;
					//4态和5态一样
					case 4:
						switch(i1){
							case 0:
								//双向禁止
								picinfo="双向禁止";
								break;
							case 1:
								//正向通行
								picinfo="正向通行";
								break;
							case 3:
								//反向通行
								picinfo="反向通行";
								break;
							case 5:
								//左转通行
								picinfo="左转通行";
								break;
							default:
								picinfo="双向禁止";
						}
						break;
					case 5:
						switch(i1){
							case 0:
								//双向禁止
								picinfo="双向禁止";
								break;
							case 1:
								//正向通行
								picinfo="正向通行";
								break;
							case 3:
								//反向通行
								picinfo="反向通行";
								break;
							case 5:
								//左转通行
								picinfo="左转通行";
								break;
							default:
								picinfo="双向禁止";
						}
						break;
				}			
				break;
			case "LIGHT":
				//光强
				picinfo="洞内值:"+n1+" (lux)"+str;
				picinfo=picinfo+"洞外值:"+n2+" (cd/m2)";	
				break;
			case "LED":
				//照明
				switch(i1){
					case 0:
						//关
						picinfo="关";						
						break;
					case 1:
						//开
						picinfo="开";						
						break;
					default:
						picinfo="关";
				}				
				break;
			case "FAN":
				//风机
				switch(i1){
					case 0:
						//停止	
						switch(i2){
							case 0:
								picinfo="停止";								
								break;
							case 1:
								picinfo="停止(异常)";							
								break;
							default:
								picinfo="停止";
						}					
						break;
					case 1:
						//正转
						switch(i2){
							case 0:
								picinfo="正转";
								break;
							case 1:
								picinfo="正转(异常)";
								break;
							default:
								picinfo="正转";
						}						
						break;
					case 2:
						//反转
						switch(i2){
							case 0:
								picinfo="反转";								
								break;
							case 1:
								picinfo="反转(异常)";
								break;
							default:
								picinfo="反转";	
						}						
						break;
				}				
				break;
			case "COVI":
				//COVI
				picinfo="CO:"+n1+" (ppm)"+str;
				picinfo=picinfo+"VI:"+n2+" (km1)";				
				break;
			case "FSFX":
				//风速风向
				picinfo="风速:"+n1+" (m/s)"+str;				
				switch(i1){
					case 0:					
						picinfo=picinfo+"风向：顺车行方向";
						break;
					case 1:
						//火警
						picinfo=picinfo+"风向：逆车行方向";
						break;
					default:
						picinfo=picinfo+"风向：顺车行方向";
				}				
				break;
			case "FB":
				//手报
				switch(i1){
					case 0:
						//正常
						picinfo="正常";
						break;
					case 1:
						//火警
						picinfo="火警";
						break;
					default:
						picinfo="正常";
				}
				break;
			case "FGS":
				//烟感
				switch(i1){
					case 0:
						//正常
						picinfo="正常";
						break;
					case 1:
						//火警
						picinfo="火警";
						break;
					default:
						picinfo="正常";
				}				
				break;
			case "FGW":
				//温感
				switch(i1){
					case 0:
						//正常
						picinfo="正常";
						break;
					case 1:
						//火警
						picinfo="火警";
						break;
					default:
						picinfo="正常";
				}				
				break;
			case "FGR":
				//消防箱
				switch(i1){
					case 0:
						//正常
						picinfo="正常";
						break;
					case 1:
						//火警
						picinfo="火警";
						break;
					default:
						picinfo="正常";
				}				
				break;
			case "DOOR":
				//防火门
				switch(i1){
					case 0:
						//关
						picinfo="关";
						break;
					case 1:
						//开
						picinfo="开";
						break;
					default:
						picinfo="关";
				}
					
				break;
			case "CMS":
				//门架式情报板
				picinfo="正常";				
				break;
			case "CAM":
				//摄像机
				picinfo="正常";				
				break;
			case "DEC":
				//解码器
				picinfo="正常";				
				break;
			case "ET":
				//紧急电话
				picinfo="正常";				
				break;
			case "VD":
				//车检
				picinfo="正常";				
				break;
			case "PUMP":
				//消防水泵
				picinfo="正常";				
				break;
			case "WD":
				//气象
				picinfo="正常";				
				break;
			case "TCMS":
				//限速标志
				picinfo="正常";				
				break;
			case "FCMS":
				//F型情报板
				picinfo="正常";				
				break;
			case "DOOREx":
				//卷帘门
				switch(i1){
					case 1:
						//上位
						picinfo="上位";
						break;
					case 2:
						//中位
						picinfo="中位";
						break;
					case 3:
						//下位
						picinfo="下位";
						break;
					default:
						picinfo="上位";
				}				
				break;
		}
	}
	//故障
	if(state==2){
		picinfo="故障";
	}
	return title+str+picinfo;
}

//返回状态名称
function returnStateName(num){
	var statename="";
	num=parseInt(num);
	switch(num){
		case 0:
			statename="关闭";
			break;
		case 1:
			statename="正常";
			break;
		case 2:
			statename="故障";
			break;
		case 3:
			statename="采集器异常";
			break;
		default:
			statename="正常";
	}
	return statename;
}

function returnDevTypeName(str){
	var infotype="";
	
	switch(str){
		case "TS":
			infotype = "交通信号灯";
			break;
		case "LS":
			infotype = "车道指示标志";
			break;
		case "LIGHT":
			infotype = "光强";
			break;
		case "LED":
			infotype = "照明";
			break;
		case "FAN":
			infotype = "风机";
			break;
		case "COVI":
			infotype = "COVI";
			break;
		case "FSFX":
			infotype = "风速风向";
			break;
		case "FB":
			infotype = "手报";
			break;
		case "FGS":
			infotype = "烟感";
			break;
		case "FGW":
			infotype = "温感";
			break;
		case "FGR":
			infotype = "消防箱";
			break;
		case "DOOR":
			infotype = "防火门";
			break;
		case "CMS":
			infotype = "情报板";
			break;
		case "CAM":
			infotype = "摄像机";
			break;
		case "DEC":
			infotype = "解码器";
			break;
		case "ET":
			infotype = "紧急电话";
			break;
		case "VD":
			infotype = "车检";
			break;
		case "PUMP":
			infotype = "消防水泵";
			break;
		case "WD":
			infotype = "气象";
			break;
		case "TCMS":
			infotype = "限速标志";
			break;
		case "FCMS":
			infotype = "F型情报板";
			break;
		case "DOOREx":
			infotype = "卷帘门";
			break;
		default:
			infotype = "交通信号灯";
	}
		
	return infotype;
}

//返回统计表格状态对应图片
function returnStatePic(name,num,up,n3){
	var picurl="";
	num=parseInt(num);
	switch(name){
		case "covi":
			switch(num){
				case 0:
                    if(up==1){
                        //上行
                        picurl="../pic2/covi_1_-1.png";
                    }else{
                        //下行
                        picurl="../pic2/covi_2_-1.png";
                    }
                    break;
					break;
				case 1:
                    if(up==1){
                        //上行
                        picurl="../pic2/covi_1_"+n3+".png";
                    }else{
                        //下行
                        picurl="../pic2/covi_2_"+n3+".png";
                    }
					break;
				default:
                    picurl="../pic2/covi.png";
			}
			break;
		case "fsfx":
			switch(num){
				case 1:
					switch (up) {
                        case 1:
                            picurl = "../pic2/tw_1_" + n3 + ".png";
                            break;
                        case 2:
                            picurl = "../pic2/tw_2_" + n3 + ".png";
                            break;
                        case 0:
                            picurl = "../pic2/tw_1_" + n3 + ".png";
                            break;
                        default:
                            picurl = "../pic2/tw_1_" + n3 + ".png";
                    }
					break;
				case 0:
                    switch (up) {
                        case 1:
                            picurl = "../pic2/tw_1_-1.png";
                            break;
                        case 2:
                            picurl = "../pic2/tw_2_-1.png";
                            break;
                        case 0:
                            picurl = "../pic2/tw_1_-1.png";
                            break;
                        default:
                            picurl = "../pic2/tw_1_-1.png";
                    }
					break;
				default:
                    picurl = "../pic2/tw_0_-1.png";
			}
			break;
		case "light":
			switch(num){
				case 1:
					switch (up) {
						case 1:
                            picurl="../pic2/light_1_"+n3+".png";
                            break;
						case 2:
                            picurl="../pic2/light_2_"+n3+".png";
                            break;
                        default:
                            picurl="../pic2/light.png";
                            break;
                    }
                break;
				case 0:
                    switch (up) {
                        case 1:
                            picurl="../pic2/light_1_-1.png";
                            break;
                        case 2:
                            picurl="../pic2/light_2_-1.png";
                            break;
                        default:
                            picurl="../pic2/light.png";
                            break;
                    }
                break;
				default :
                    picurl="../pic2/light.png";
            }
			break;
	}
	return picurl;
}

//返回情报板类型名称
function showCmsClassName(num){
	var classname="";
	num=parseInt(num);
	if(num>8&&num<14){
		switch(num){
			case 9:
				classname="T型情报板";
				break;
			case 10:
				classname="小型情报板";
				break;
			case 11:
				classname="F型情报板";
				break;
			case 12:
				classname="LED情报板";
				break;
			case 13:
				classname="门架式情报板";
				break;
			default:
				classname="T型情报板";
		}
	}
	return classname;
}

//返回情报板宽高
function getCmsClassWH(num){
	//var classname="";
	num=parseInt(num);
	switch(num){
		case 9://T型情报板
			cms_showwidth="96px";
			cms_showheight="96px";
			break;
		case 10://小型情报板
			//cms_showwidth="";
			//cms_showheight="";
			break;
		case 11://F型情报板
			cms_showwidth="128px";
			cms_showheight="64px";
			break;
		case 12://LED情报板
			cms_showwidth="160px";
			cms_showheight="120px";
			break;
		case 13://门架式情报板
			cms_showwidth="400px";
			cms_showheight="40px";
			break;
		default:
			cms_showwidth="96px";
			cms_showheight="96px";
	}
	//return classname;
}

//返回情报板字体大小
function getCmsFontSize(num){
	var str="";
	num=parseInt(num);
	switch(num){
		case 0:
			str="48px";
			break;
		case 1:
			str="32px";
			break;
		case 2:
			str="24px";
			break;
		case 3:
			str="16px";
			break;
		case 4:
			str="20px";
			break;
		case 5:
			str="40px";
			break;
		default:
			str="48px";
	}
	return str
}

//返回情报板字体
function getCmsFontFamily(num){
	var str="";
	num=parseInt(num);
	switch(num){
		case 0:
			str="宋体";
			break;
		case 1:
			str="楷体";
			break;
		case 2:
			str="黑体";
			break;
		default:
			str="宋体";
	}
	return str
}

//返回情报板字体颜色
function getCmsFontColor(num){
	var str="";
	num=parseInt(num);
	switch(num){
		case 0:
			str="red";
			break;
		case 1:
			str="green";
			break;
		case 2:
			str="yellow";
			break;
		default:
			str="red";
	}
	return str;
}

//情报板切换停留时间
function cmsSwitch(tnum){
	cmsSwitchAction="";
	
	var cmstext=ary_cmstext.split("*");
	var cmsstyle=ary_cmsstyle.split("*");
	
	//console.log(cmstext[tnum]);
	
	var cmstextstr=ReplaceSeperator(cmstext[tnum]);
	cmstextstr=cmstextstr.replace(/[,]/g,'<br />');
	var cmsarr=cmsstyle[tnum].split(",");
	
	$("#div_seeCMS").html("<div id=\"div_seeCMS_content\">"+ cmstextstr +"</div>");
	
	$("#div_seeCMS_content").css("fontSize",getCmsFontSize(cmsarr[3]));
	$("#div_seeCMS_content").css("lineHeight",getCmsFontSize(cmsarr[3]));
	$("#div_seeCMS_content").css("fontFamily",getCmsFontFamily(cmsarr[4]));
	$("#div_seeCMS_content").css("color",getCmsFontColor(cmsarr[5]));
	$("#div_seeCMS_content").css("marginLeft",cmsarr[7]+"px");
	$("#div_seeCMS_content").css("marginTop",cmsarr[8]+"px");
	
	//clearTimeout(paneltv);panletv=setTimeout(function(){
	cmsSwitchAction=setTimeout(function(){
			clearTimeout(cmsSwitchAction);
			tnum++;
			if(tnum>=cmstext.length){
				tnum=0;
			}
			cmsSwitch(tnum);
		},cmsarr[2]*1000
	)
}

//判断设备是否加载完成
function estimatesInit(){
	if(TSinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==1){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;			
			loadInAction(percentnum);
			
			loadarr.push([1,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(LSinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==2){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([2,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(LIGHTinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==3){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([3,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(LEDinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==4){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([4,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(FANinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==5){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([5,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(COVIinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==6){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([6,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(FSFXinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==7){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([7,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(FBinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==8){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([8,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(FGSinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==9){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([9,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(FGWinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==10){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([10,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(FGRinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==11){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([11,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(DOORinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==12){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([12,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(CMSinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==13){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([13,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(CAMinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==14){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([14,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(DECinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==15){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([15,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(ETinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==16){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([16,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(VDinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==17){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([17,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(PUMPinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==19){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([18,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(WDinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==19){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([19,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}

	if(TCMSinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==20){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([20,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}

	if(FCMSinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==21){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([21,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}

	if(DOORExinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==22){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([22,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(PLCinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==20){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([20,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(TUNNELinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==21){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([21,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(PLANinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==22){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([22,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(Fireinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==23){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([23,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(CMSTEXTinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==24){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([24,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
	
	if(GSCMSinit[0]==true){
		loadflag=1;
		for(var i=0;i<loadarr.length;i++){
			if(loadarr[i][0]==25){
				loadstrflag=0;
				break;				
			}else{
				loadstrflag=1;
			}
		}
		
		if(loadstrflag==1){
			percentnum=parseInt(percentnum)+4;
			loadInAction(percentnum);
			loadarr.push([25,1]);
		}
	}else{
		loadflag=0;
		return loadflag;
	}
}