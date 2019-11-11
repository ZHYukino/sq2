function use1() {
    // var name = "tunnel";
    // var expdate = new Date();   //初始化时间
    // var num = 1;
    // expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
    // document.cookie = name+"="+num+";expires="+expdate.toGMTString()+";path=/";
    var result1 = window.open("./tunnel.php?tunnel=1", "window1");
    $("#1").hide();
    $("#bt1").show();
    $("#bt1").click(function () {
        if(result1.closed){
            var name = "tunnel";
            var expdate = new Date();   //初始化时间
            var num = 1;
            expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
            document.cookie = name+"="+num+";expires="+expdate.toGMTString()+";path=/";
            result1 = window.open("./tunnel.php?tunnel=1", "window1");
        }else {
            result1.focus();
        }
    });
}
function use2() {
    // var name = "tunnel";
    // var expdate = new Date();   //初始化时间
    // var num = 2;
    // expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
    // document.cookie = name+"="+num+";expires="+expdate.toGMTString()+";path=/";
    var result2 = window.open("./tunnel.php?tunnel=2", "window2");
    $("#2").hide();
    $("#bt2").show();
    $("#bt2").click(function () {
        if(result2.closed){
            var name = "tunnel";
            var expdate = new Date();   //初始化时间
            var num = 2;
            expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
            document.cookie = name+"="+num+";expires="+expdate.toGMTString()+";path=/";
            result2 = window.open("./tunnel.php?tunnel=2", "window2");
        }else {
            result2.focus();
        }
    });
}
function use3() {
    // var name = "tunnel";
    // var expdate = new Date();   //初始化时间
    // var num = 3;
    // expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
    // document.cookie = name+"="+num+";expires="+expdate.toGMTString()+";path=/";
    var result3 = window.open("./tunnel.php?tunnel=3", "window3");
    $("#3").hide();
    $("#bt3").show();
    $("#bt3").click(function () {
        if(result3.closed){
            var name = "tunnel";
            var expdate = new Date();   //初始化时间
            var num = 3;
            expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
            document.cookie = name+"="+num+";expires="+expdate.toGMTString()+";path=/";
            result3 = window.open("./tunnel.php?tunnel=3", "window3");
        }else {
            result3.focus();
        }
    });
}
