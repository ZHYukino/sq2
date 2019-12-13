//全局-start
window.layer = layui.layer;
window.laypage = layui.laypage;
//var $ = layui.jquery;//拖动与此冲突
window.element = layui.element;
window.table = layui.table;
window.laydate = layui.laydate;
window.form = layui.form;
window.tree = layui.tree;
window.layedit = layui.layedit;
window.upload = layui.upload;
window.slider = layui.slider;

//屏幕宽高
window.W = parseInt($(window).width());
window.H = parseInt($(window).height());

$(window).resize(function () {
	window.W = parseInt($(window).width());
	window.H = parseInt($(window).height());
});

//全局
var languageversion=parseInt($("#config_language").val());//语言版本

//背景图实际大小
var picW_this=1920;
var picH_this=1080;

//设备图标大小
var pic_TS_width=15;
var pic_TS_height=80;
var pic_LS_width=62;
var pic_LS_height=30;
var pic_LIGHT_width=38;
var pic_LIGHT_height=36;
var pic_LED_width=40;
var pic_LED_height=33;
var pic_FAN_width=55;
var pic_FAN_height=55;
var pic_COVI_width=80;
var pic_COVI_height=40;
var pic_FSFX_width=69;
var pic_FSFX_height=67;
var pic_FB_width=40;
var pic_FB_height=41;
var pic_FGS_width=40;
var pic_FGS_height=49;
var pic_FGW_width=45;
var pic_FGW_height=43;
var pic_FGR_width=0;
var pic_FGR_height=0;
var pic_DOOR_width=40;
var pic_DOOR_height=60;
var pic_CMS_width=55;
var pic_CMS_height=55;
var pic_CAM_width=48;
var pic_CAM_height=34;
var pic_DEC_width=0;
var pic_DEC_height=0;
var pic_ET_width=43;
var pic_ET_height=40;
var pic_VD_width=50;
var pic_VD_height=60;
var pic_PUMP_width=0;
var pic_PUMP_height=0;
var pic_WD_width=70;
var pic_WD_height=70;
var pic_TCMS_width=55;
var pic_TCMS_height=55;
var pic_FCMS_width=0;
var pic_FCMS_height=0;
var pic_DOOREx_width=219;
var pic_DOOREx_height=225;
var pic_ETHOST_height=70;
var pic_ETHOST_width=50;

//预加载
var loadAction="";      //计时判断加载
var percentnum=0;		//加载设备时
var loadarr=[[0,0]];    //是否已加载的数组
var loadflag=0;        
var loadstrflag=0;
var bLogin = 0;			//视频连接状态

var ledrelation_id="";  //照明表id
var fanrelation_id="";  //风机表id
var ledtime_id="";      //照明时钟表id
var lstsup_id="";       //上行表id
var lstsdown_id="";     //上行表id
var lstsup_ename="";    //上行表ename
var lstsdown_ename="";  //上行表ename

var ary_cmstext="";	    //情报板内容数组
var ary_cmsstyle="";    //情报板样式数组
var cms_showwidth="";	//情报板宽度
var cms_showheight="";  //情报板高度
var ary_cmstime="";		//停留时间

var cmsSwitchAction=""; //计时方法

var flag = true;

//初始化
//电视墙大屏变量定义
var bs_id=1;		//拼接操作id
var bs_setmethod=0; 	//是否登陆
var bs_compositeid="";	//切屏项目	
var bs_loadnum=0;	//初始化命令顺序
var bs_lcsnum=0;	//设置合屏命令顺序
var bs_stwnum=0;	//设置切屏命令顺序
var bs_stwnumauto=0;//设置自动切屏命令顺序
var bs_objectid1=0;	//切屏项目split
var bs_objectid2=0;	//切屏项目monitorWall
var bs_objectid3=0;	//切屏项目windowManager
var bs_objectid4=0;	//切屏项目netApp	
var bs_devices={};//设备列表
var pub;		//解密存放

//上墙
var bs_screenno=0;//上屏顺序
var arry_fireid=[];//火灾相邻设备ID

var ar_Camera = new Array();
var ar_CameraEx = new Array();
var ar_CameraCT = new Array();
var ar_CameraBs = new Array();
var intervalProcess;
var intervalProcessEx;
var intervalProcessCT;
var intervalProcessbigScreen;
var ct_objectid=0;

//判断浏览器
function ajaxcreateXMLHttpRequest(){
	var xmlHttp=null;
	//一般先判断非IE浏览器
	//window对象中有XMLHttpRequest存在就是非IE，包括（IE7，IE8）
	if(window.XMLHttpRequest){
		xmlHttp=new XMLHttpRequest();//非IE以及IE7，IE8浏览器
		if(xmlHttp.overrideMimeType){
			xmlHttp.overrideMimeType("text/xml");//重置mime类型
		}
	//window对象中有ActiveXObject属性存在就是IE浏览器的低版本
	}
	else if(window.ActiveXObject){
		var versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];//各种IE浏览器创建Ajax对象时传递的参数
		for(var i=0; i<versions.length; i++){
			try{
				xmlHttp=new ActiveXObject(versions[i]);//各个IE浏览器版本的参数不同
				if(xmlHttp){
					return xmlHttp;
				}
			}catch(e){
				xmlHttp=false;
			}
		}
	}
	return xmlHttp;
}

//判断浏览器
function ietypecheck(){
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
		(s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/)) ? Sys.ie = s[2] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	if (Sys.ie){ietype = 0}
	else {ietype =1}
}

var ietype;
ietypecheck();

if(languageversion==""||typeof(languageversion)=="underfined"){
	languageversion=0;
}

if(languageversion==0){
	var msg_timeout="连接超时";
	var msg_connectfail="连接失败";
	var msg_connectabnormal="连接异常";
	var msg_successadd="新增成功";
	var msg_successedit="编辑成功";
	var msg_successdel="删除成功";
	var msg_successset="设置成功";
	var msg_control_led="照明控制模式不是手动控制模式，无法控制";
	var msg_control_fan="风机控制模式不是手动控制模式，无法控制";
	var msg_control_fannow1="本台风机正在反转,不能执行正转操作";
	var msg_control_fannow2="同组另一台风机正在反转,不能执行正转操作";
	var msg_control_fannow3="本台风机正在正转,不能执行反转操作";
	var msg_control_fannow4="同组另一台风机正在正转,不能执行反转操作";
	var msg_control_plc="PLC在本地控制模式,不能发送命令";
	var msg_control_this="当前已是本状态";
	var msg_nodevice="暂无设备";
	var msg_errordevice="设备故障";
	var msg_select_led="请选择亮度检测";
	var msg_select_covi="请选择COVI检测";
	var msg_select_direction="请选择对应方向";
	var msg_select_plan="请选择方案配置或方案名称";
	var msg_select_table="列表里下拉框需要全部选择";
	var msg_select_updown="请选择上下行";
	var msg_input_planname="方案名称不能为空";
	var msg_input_actiontime="动作时间不能为空";
	var msg_textarea_content="显示内容未填写";
	var msg_table_selectdata="请先在表格点击选取数据";
	var msg_verification_date="请输入正确的日期格式";
	var msg_cms_nodata="没有情报板数据";
	var msg_cms_nocontent="没有预览内容";
	var msg_select_default="请选择";
	var msg_confirm_del="请确认是否删除";
	var msg_confirm_use="请确认是否应用";
	var msg_confirm_execute="请确认是否执行";
}