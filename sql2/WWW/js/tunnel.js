resultbtn = new Array();
btncheck = 1;



//隧道ABC按钮
function tunnelbtn(data) {
    if(resultbtn[data].closed){
        resultbtn[data] = window.open("./tunnel.php?tunnel="+data+"", "window"+data+"");
    }else {
        resultbtn[data].focus();
    }
}

document.onkeydown =function (e) {
    $(document).keyup(function (event){
        if(event.keyCode == 17) {
            btncheck = 1;
        }
    })
    $(document).keydown(function (event){
        if(event.keyCode == 17){
            btncheck = 0;
        }
    })
}

function use(data) {
    if(btncheck == 1){
        resultbtn[data] = window.open("./tunnel.php?tunnel="+data+"", "window"+data+"");
    }else{
        return false;
    }
    $("#one"+data+"").hide();
    $("#bt"+data+"").show();
    $("#bt"+data+"").click(function () {
        if(btncheck == 1){
            tunnelbtn(data);
        }
    });

}
// function use2() {
//     var result2 = window.open("./tunnel.php?tunnel=2", "window2");
//     $("#one2").hide();
//     $("#bt2").show();
//     $("#bt2").click(function () {
//         if(result2.closed){
//             result2 = window.open("./tunnel.php?tunnel=2", "window2");
//         }else {
//             result2.focus();
//         }
//     });
// }
// function use3() {
//     var result3 = window.open("./tunnel.php?tunnel=3", "window3");
//     $("#one3").hide();
//     $("#bt3").show();
//     $("#bt3").click(function () {
//         if(result3.closed){
//             result3 = window.open("./tunnel.php?tunnel=3", "window3");
//         }else {
//             result3.focus();
//         }
//     });
// }
