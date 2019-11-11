﻿//[0]数组序号，[1]ID,[2]隧道序号tunnel，[3]devcode，[4]devename，[5]devaddr，[6]updown，[7]ipaddr，[8]ipport，[9]shape，[10]pointx，[11]pointy，[12]组groupid，[13]devcname,[14]状态变化是否，[15]变化时间，[16]是否值有变化,[17]变化时间,[18]状态或故障类型，[19]值i1，[20]值12，[21]值n1，[22]值n2，[23]值v1，[24]值v2,[25]plcid,[26]channel,[27]outword关联视频ID
var arr_TS = new Array();	//交通信号灯
var arr_LS = new Array();	//车道指示标志
var arr_LIGHT = new Array();//光强
var arr_LED = new Array();	//照明
var arr_FAN = new Array();	//风机
var arr_COVI = new Array();	//COVI
var arr_FSFX = new Array();	//风速风向
var arr_FB = new Array();	//手报
var arr_FGS = new Array();	//烟感
var arr_FGW = new Array();	//温感
var arr_FGR = new Array();	//消防箱
var arr_DOOR = new Array();	//防火门
var arr_CMS = new Array();	//情报板
var arr_CAM = new Array();	//摄像机
var arr_DEC = new Array();	//解码器
var arr_ET = new Array();	//紧急电话
var arr_VD = new Array();	//车检
var arr_PUMP = new Array();	//消防水泵
var arr_WD = new Array();	//气象
var arr_TCMS = new Array();	//限速标志
var arr_FCMS = new Array();	//F型情报板
var arr_DOOREx = new Array();//卷帘门
//[0]数组序号，[1]ID,[2]隧道序号tunnel，[3]name,[4]状态变化是否，[5]变化时间，[6]state,[7]runmode
var arr_PLC = new Array();
//[0]数组序号，[1]隧道序号，[2]隧道名,[3]隧道上行执行火灾方案,[4]隧道下行执行火灾方案
var arr_TUNNEL = new Array();
//[0]数组序号，[1]ID,[2]隧道序号tunnel，[3]name,[4] [[设备的ename，下拉框选项]...]
var arr_PLAN = new Array();
//[0]数组序号，[1]ID,[2]内容
var arr_CMSTEXT = new Array();
//[0]数组序号，[1]ID,[2]设备编号,[3]隧道号,[4]上下行,[5]设备类别,[6]桩号
var arr_GSCMS = new Array();//两个CMS数组，一个是隧道的，一个是道路的，GS是道路的
//设备类型数组
var arr_TYPE = new Array();
//设备加载完成标志
var TSinit={'0':'false'};
var LSinit={'0':'false'};
var LIGHTinit={'0':'false'};
var LEDinit={'0':'false'};
var FANinit={'0':'false'};
var COVIinit={'0':'false'};
var FSFXinit={'0':'false'};
var FBinit={'0':'false'};
var FGSinit={'0':'false'};
var FGWinit={'0':'false'};
var FGRinit={'0':'false'};
var DOORinit={'0':'false'};
var CMSinit={'0':'false'};
var CAMinit={'0':'false'};
var DECinit={'0':'false'};
var ETinit={'0':'false'};
var VDinit={'0':'false'};
var PUMPinit={'0':'false'};
var WDinit={'0':'false'};
var TCMSinit={'0':'false'};
var FCMSinit={'0':'false'};
var DOORExinit={'0':'false'};

var PLCinit={'0':'false'};
var TUNNELinit={'0':'false'};
var PLANinit={'0':'false'};
var Fireinit={'0':'false'};
var CMSTEXTinit={'0':'false'};
var GSCMSinit={'0':'false'};
var TYPEinit={'0':'false'};

//火灾手动控制方案 
//[0]数组序号,[1]方案id,[2]隧道号，[3]上下行，[4]方案名，[5]照明操作(0关1开)，[6]风机操作(0关1开)，[7]防火门操作(1上升2停止3下降)，[8]手报操作(0正常1火警)，[9]交通信号灯操作(1红灯4绿灯)，[10]车道指示标志操作(0禁止1正向通行)
//[11]情报板文字数组字符串,[12]文字样式数组字符串
var arr_Fire = new Array();

//风机环境控制 COVI的ID,COVI的devname，是否启用，[[正常，正常控制是否提，正常CO值，正常CO值，正常VI值，正常VI值]，[报警，报警控制是否提醒，报警CO值，报警CO值，报警VI值，报警Vi值]，[关闭，关闭控制是否是醒，关闭CO值，关闭CO值，关闭VI值，关闭Vi值]]，FSFX的devname，FSFX的ID，[[FAN的ID，关联]...]，curFJTimIn
var arr_FJ = new Array();
var FJIntel =1;
//照明环境控制 LIGHT的ID，LIGHT的devname，[[晴天，是否启用，控制时是否提示，晴天洞外光强，晴天洞外光强，晴天洞内光强，晴天洞内光强]，[阴天，是否启用，控制时是否提示，阴天洞外光强，阴天洞外光强，阴天洞内光强，阴天洞内光强]，[晚上，是否启用，控制时是否提示，晚上洞外光强，晚上洞外光强，晚上洞内光强，晚上洞内光强]，[夜间，是否启用，控制时是否提示，夜间洞外光强，夜间洞外光强，夜间洞内光强，夜间洞内光强]]，[[晴天[LED的ID，关联，动作]...]，[阴天[LED的ID，关联，动作]...]，[晚上[LED的ID，关联，动作]...]，[夜间]]，curZMTimIn
var arr_ZM1 = new Array();
var ZMIntel1 =1;
//照明时间控制 时间，是否启用，控制时是否提示，[[LED的ID，动作]...]
var arr_ZM2 = new Array();
//故障设备
var arr_Error = new Array();
var ZMIntel2 =1;
var curZMTimIn=-1;
//照明风机控制模式
ZMMode=0;
FJMode=0;
zmtimeresult=-1;
fjtimeresult=-1;