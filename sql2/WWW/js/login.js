
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