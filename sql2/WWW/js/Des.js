var BitIP = [57,49,41,33,25,17, 9, 1,59,51,43,35,27,19,11, 3,61,53,45,37,29,21,13, 5,63,55,47,39,31,23,15, 7,56,48,40,32,24,16, 8, 0,58,50,42,34,26,18,10, 2,60,52,44,36,28,20,12, 4,62,54,46,38,30,22,14, 6];
var BitCP = [39, 7,47,15,55,23,63,31,38, 6,46,14,54,22,62,30,37, 5,45,13,53,21,61,29,36, 4,44,12,52,20,60,28,35, 3,43,11,51,19,59,27,34, 2,42,10,50,18,58,26,33, 1,41, 9,49,17,57,25,32, 0,40, 8,48,16,56,24];
var BitExp = [31, 0, 1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 7, 8, 9,10,11,12,11,12,13,14,15,16,15,16,17,18,19,20,19,20,21,22,23,24,23,24,25,26,27,28,27,28,29,30,31, 0];
var BitPM = [15, 6,19,20,28,11,27,16, 0,14,22,25, 4,17,30, 9,1, 7,23,13,31,26, 2, 8,18,12,29, 5,21,10, 3,24];
var sBox = [[14, 4,13, 1, 2,15,11, 8, 3,10, 6,12, 5, 9, 0, 7, 0,15, 7, 4,14, 2,13, 1,10, 6,12,11, 9, 5, 3, 8, 4, 1,14, 8,13, 6, 2,11,15,12, 9, 7, 3,10, 5, 0,15,12, 8, 2, 4, 9, 1, 7, 5,11, 3,14,10, 0, 6,13],[15, 1, 8,14, 6,11, 3, 4, 9, 7, 2,13,12, 0, 5,10, 3,13, 4, 7,15, 2, 8,14,12, 0, 1,10, 6, 9,11, 5, 0,14, 7,11,10, 4,13, 1, 5, 8,12, 6, 9, 3, 2,15,13, 8,10, 1, 3,15, 4, 2,11, 6, 7,12, 0, 5,14, 9],[10, 0, 9,14, 6, 3,15, 5, 1,13,12, 7,11, 4, 2, 8,13, 7, 0, 9, 3, 4, 6,10, 2, 8, 5,14,12,11,15, 1,13, 6, 4, 9, 8,15, 3, 0,11, 1, 2,12, 5,10,14, 7, 1,10,13, 0, 6, 9, 8, 7, 4,15,14, 3,11, 5, 2,12],[ 7,13,14, 3, 0, 6, 9,10, 1, 2, 8, 5,11,12, 4,15,13, 8,11, 5, 6,15, 0, 3, 4, 7, 2,12, 1,10,14, 9,10, 6, 9, 0,12,11, 7,13,15, 1, 3,14, 5, 2, 8, 4, 3,15, 0, 6,10, 1,13, 8, 9, 4, 5,11,12, 7, 2,14],[ 2,12, 4, 1, 7,10,11, 6, 8, 5, 3,15,13, 0,14, 9,14,11, 2,12, 4, 7,13, 1, 5, 0,15,10, 3, 9, 8, 6, 4, 2, 1,11,10,13, 7, 8,15, 9,12, 5, 6, 3, 0,14,11, 8,12, 7, 1,14, 2,13, 6,15, 0, 9,10, 4, 5, 3],[12, 1,10,15, 9, 2, 6, 8, 0,13, 3, 4,14, 7, 5,11,10,15, 4, 2, 7,12, 9, 5, 6, 1,13,14, 0,11, 3, 8, 9,14,15, 5, 2, 8,12, 3, 7, 0, 4,10, 1,13,11, 6, 4, 3, 2,12, 9, 5,15,10,11,14, 1, 7, 6, 0, 8,13],[ 4,11, 2,14,15, 0, 8,13, 3,12, 9, 7, 5,10, 6, 1,13, 0,11, 7, 4, 9, 1,10,14, 3, 5,12, 2,15, 8, 6, 1, 4,11,13,12, 3, 7,14,10,15, 6, 8, 0, 5, 9, 2, 6,11,13, 8, 1, 4,10, 7, 9, 5, 0,15,14, 2, 3,12],[13, 2, 8, 4, 6,15,11, 1,10, 9, 3,14, 5, 0,12, 7, 1,15,13, 8,10, 3, 7, 4,12, 5, 6,11, 0,14, 9, 2, 7,11, 4, 1, 9,12,14, 2, 0, 6,10,13,15, 3, 5, 8, 2, 1,14, 7, 4,10, 8,13,15,12, 9, 0, 3, 5, 6,11]];
var BitPMC1 = [56,48,40,32,24,16, 8, 0,57,49,41,33,25,17, 9, 1,58,50,42,34,26,18,10, 2,59,51,43,35,62,54,46,38,30,22,14, 6,61,53,45,37,29,21,13, 5,60,52,44,36,28,20,12, 4,27,19,11, 3];
var BitPMC2 = [13,16,10,23, 0, 4, 2,27,14, 5,20, 9,22,18,11, 3,25, 7,15, 6,26,19,12, 1,40,51,30,36,46,54,29,39,50,44,32,47,43,48,38,55,33,52,45,41,49,35,28,31];
var subKey = [];

function initPermutation(inData){
	var newData = [0,0,0,0,0,0,0,0];
	for(var i=0;i<64;i++) if((inData[BitIP[i]>>3]&(1<<(7-(BitIP[i]&7))))!=0) newData[i>>3] = newData[i>>3]|(1<<(7-(i&7)));
	for(var i=0;i<8;i++) inData[i] = newData[i];
	return inData;
}

function conversePermutation(inData){
	var newData = [0,0,0,0,0,0,0,0];
	for(var i=0;i<64;i++) if((inData[BitCP[i]>>3]&(1<<(7-(BitCP[i]&7))))!=0) newData[i>>3] = newData[i>>3]|(1<<(7-(i&7)));
	for(var i=0;i<8;i++) inData[i] = newData[i];
	return inData;
}

function expand(inData){
	var newData = [0,0,0,0,0,0];
	for(var i=0;i<48;i++) if((inData[BitExp[i]>>3]&(1<<(7-(BitExp[i]&7))))!=0) newData[i>>3] = newData[i>>3]|(1<<(7-(i&7)));
	return newData;
}

function permutation(inData){
	var newData = [0,0,0,0];
	for(var i=0;i<32;i++) if((inData[BitPM[i]>>3]&(1<<(7-(BitPM[i]&7))))!=0) newData[i>>3] = newData[i>>3]|(1<<(7-(i&7)));
	for(var i=0;i<4;i++) inData[i] = newData[i];
	return newData;
}

function si(s,inByte){
  return sBox[s][(inByte&32)|((inByte&30)>>1)|((inByte&1)<<4)]&15;
}

function permutationChoose1(inData){
	var newData = [0,0,0,0,0,0,0];
	for(var i=0;i<56;i++) if((inData[BitPMC1[i]>>3]&(1<<(7-(BitPMC1[i]&7))))!=0) newData[i>>3] = newData[i>>3]|(1<<(7-(i&7)));
	return newData;
}

function permutationChoose2(inData){
	var newData = [0,0,0,0,0,0];
	for(var i=0;i<48;i++) if((inData[BitPMC2[i]>>3]&(1<<(7-(BitPMC2[i]&7))))!=0) newData[i>>3] = newData[i>>3]|(1<<(7-(i&7)));
	return newData;
}

function cycleMove(inData,bitMove){
	for(var i=0;i<bitMove;i++){
		inData[0] = (inData[0]<<1)|(inData[1]>>7);
		inData[1] = (inData[1]<<1)|(inData[2]>>7);
		inData[2] = (inData[2]<<1)|(inData[3]>>7);
		inData[3] = (inData[3]<<1)|((inData[0]&16)>>4);
		inData[0] = (inData[0]&15);
	}
	return inData;
}

function makeKey(inKey){
	var bitDisplace = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];
	var outData56 = permutationChoose1(inKey);
	var key28l=[],key28r=[],key56o=[];
	key28l[0] = outData56[0]>>4;
	key28l[1] = (outData56[0]<<4)|(outData56[1]>>4);
	key28l[2] = (outData56[1]<<4)|(outData56[2]>>4);
	key28l[3] = (outData56[2]<<4)|(outData56[3]>>4);
	key28r[0] = outData56[3]&15;
	key28r[1] = outData56[4];
	key28r[2] = outData56[5];
	key28r[3] = outData56[6];
	for(var i=0;i<16;i++){
		key28l = cycleMove(key28l,bitDisplace[i]);
		key28r = cycleMove(key28r,bitDisplace[i]);
		key56o[0] = (key28l[0]<<4)|(key28l[1]>>4);
		key56o[1] = (key28l[1]<<4)|(key28l[2]>>4);
		key56o[2] = (key28l[2]<<4)|(key28l[3]>>4);
		key56o[3] = (key28l[3]<<4)|(key28r[0]);
		key56o[4] = key28r[1];
		key56o[5] = key28r[2];
		key56o[6] = key28r[3];
		subKey[i] = permutationChoose2(key56o);
	}
}

function encry(inData, subKey){
	var buf=[],outData=[];
	var outBuf = expand(inData);
	for(var i=0;i<6;i++) outBuf[i] = outBuf[i]^subKey[i];
	buf[0] = outBuf[0]>>2;
	buf[1] = ((outBuf[0]&3)<<4)|(outBuf[1]>>4);
	buf[2] = ((outBuf[1]&15)<<2)|(outBuf[2]>>6);
	buf[3] = outBuf[2]&63;
	buf[4] = outBuf[3]>>2;
	buf[5] = ((outBuf[3]&3)<<4)|(outBuf[4]>>4);
	buf[6] = ((outBuf[4]&15)<<2)|(outBuf[5]>>6);
	buf[7] = outBuf[5]&63;
	for(var i=0;i<8;i++) buf[i] = si(i, buf[i]);
	for(var i=0;i<4;i++) outBuf[i] = (buf[i*2]<<4)|buf[i*2+1];
	outBuf = permutation(outBuf);
	for(var i=0;i<4;i++) outData[i] = outBuf[i];
	return outData;
}

function desData(desMode,inData){
	var outData=[],temp=[],buf;
	for(var i=0;i<8;i++) outData[i] = inData[i];
	outData = initPermutation(outData);
	if(desMode=="Encry"){
		for(var i=0;i<16;i++){
			for(var j=0;j<4;j++) temp[j] = outData[j];
			for(var j=0;j<4;j++) outData[j] = outData[j + 4];
			buf = encry(outData, subKey[i]);
			for(var j=0;j<4;j++) outData[j + 4] = temp[j]^buf[j];
		}
		for(var i=0;i<4;i++) temp[i] = outData[i + 4];
		for(var i=0;i<4;i++) outData[i + 4] = outData[i];
		for(var i=0;i<4;i++) outData[i] = temp[i];
	}else if(desMode=="Decry"){
		for(var i=15;i>-1;i--){
			for(var j=0;j<4;j++) temp[j] = outData[j];
			for(var j=0;j<4;j++) outData[j] = outData[j + 4];
			buf = encry(outData, subKey[i]);
			for(var j=0;j<4;j++) outData[j + 4] = temp[j]^buf[j];
		}
		for(var i=0;i<4;i++) temp[i] = outData[i + 4];
		for(var i=0;i<4;i++) outData[i + 4] = outData[i];
		for(var i=0;i<4;i++) outData[i] = temp[i];
	}
	return conversePermutation(outData);
}

function EncryStr(Str, Key){
	var KeyByte=[],StrByte=[],OutByte,StrResult='';
	if((Str.length > 0)&(Str[Str.length-1].charCodeAt() == 0)){
		console.log('Error: the last char is NULL char.');
		return '';
	}
	if(Key.length<8) for(var i = Key.length;i<8;i++) Key += String.fromCharCode(0);
	while(Str.length%8!=0) Str += String.fromCharCode(0);
	for(var i =0;i<8;i++) KeyByte[i] = Key[i].charCodeAt();
	makeKey(KeyByte);
	for(var i = 0;i<Math.floor(Str.length/8);i++){
		for(var j = 0;j<8;j++) StrByte[j] = Str[i*8+j].charCodeAt();
		OutByte = desData("Encry", StrByte);
		for(var j =0;j<8;j++) StrResult += String.fromCharCode(OutByte[j]);
	}
	return StrResult;
}

function DecryStr(Str, Key){
	var KeyByte=[],StrByte=[],OutByte,StrResult = '';
	if(Key.length<8) for(var i = Key.length;i<8;i++) Key += String.fromCharCode(0);
	for(var i =0;i<8;i++) KeyByte[i] = Key[i].charCodeAt();
	makeKey(KeyByte);
	for(var i = 0;i<Math.floor(Str.length/8);i++){
		for(var j = 0;j<8;j++) StrByte[j] = Str[i*8+j].charCodeAt();
		OutByte = desData("Decry", StrByte);
		for(var j =0;j<8;j++){ StrResult += String.fromCharCode(OutByte[j]);
		}
	}
	while((StrResult.length > 0)&(StrResult[StrResult.length-1].charCodeAt() == 0)) StrResult = StrResult.slice(0,StrResult.length-1);
	return StrResult;
}

function EncryStrHex(Str, Key){
	var Temp,StrResult = '';
	var TempResult = EncryStr(Str, Key);
	for(var i=0;i<TempResult.length;i++){
		Temp = TempResult[i].charCodeAt().toString(16).toUpperCase();
		if(Temp.length == 1) Temp = '0' + Temp;
		StrResult += Temp;
	}
	return StrResult;
}

function HexToInt(Hex){
	var ch,Res = 0;
	for(var i = 0;i<Hex.length;i++){
		ch = Hex[i];
		if((ch >= '0')&(ch <= '9'))
			Res = Res * 16 + ch.charCodeAt() - '0'.charCodeAt();
		else if((ch >= 'A')&(ch <= 'F'))
			Res = Res * 16 + ch.charCodeAt() - 'A'.charCodeAt() + 10;
		else if((ch >= 'a')&(ch <= 'f'))
			Res = Res * 16 + ch.charCodeAt() - 'a'.charCodeAt() + 10;
		else
			console.log('error');
	}
    return Res;
}

function DecryStrHex(StrHex, Key){
	var Str = '';
	for(var i = 0; i<Math.floor(StrHex.length/2);i++) Str += String.fromCharCode(HexToInt(StrHex.slice(i*2,i*2+2)));
	return DecryStr(Str, Key);
}



//密码登录
// console.log(EncryStrHex(EncryStrHex('admin','user'),'lcrj'));
// console.log(DecryStrHex(DecryStrHex('42BF30DD6F0E7BCD4B6DAFD588E76589','lcrj'),'user'));



//enter 按键
$(document).keydown(function (event) {
	if (event.keyCode == 13) {
		$("#button_load").click();
	}
});
//登陆
$(function(){
	var btn = 0;//设置一个变量禁止重复提交
	$('#button_load').click(function(){
		var name=$.trim($('#username').val());
		var pass=$.trim($('#password').val());//去空格
		pass = EncryStrHex(EncryStrHex(pass,'user'),'lcrj')
		console.log(pass);
		if(name.length===0||pass.length===0)
		{
			layer.msg('用户名密码不能为空', {icon: 3,time: 1000});
			return false;
		}
		if(btn === 1)  return false;//禁止重复提交
		btn = 1;
		$('#button_load').text('登陆中...');
		$.ajax({
			type:"post",
			dataType:"json",
			url:"./bcd/php/login.php",
			data:{'name':name,'pass':pass},
			async:true,
			success:function(res)
			{
				$('#button_load').text('登陆');
				btn = 0;
				if(res.code===1)
				{
					layer.msg(res.msg, {icon: 1});
					location.href ="./default.php";//跳转
				}else if(res.code===0){
					layer.msg(res.msg, {icon: 2,time: 1000});
				}else{
					layer.msg('服务器内部错误',{icon: 2,time: 1000});
				}
			},
			error:function(res)
			{
				btn = 0;
				$('#button_load').text('登陆');
				return false;
			}
		})
	})
})