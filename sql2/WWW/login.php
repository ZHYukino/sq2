
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="renderer" content="ie-comp"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>登陆界面</title>
    <meta name="author" content="广东创想时代交通科技有限公司-lb2019">

    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <link rel="shortcut icon" href="user.png">
    
    <!-- layui -->
    <link rel="stylesheet" type="text/css" href="../jspackage/layui/css/layui.css" media="all" />

	<!-- 自定义 -->
	<link href="css/loginstyle.css?vs=112" rel="stylesheet">

    <!-- jq -->
    <script src="../jspackage/jquery/jquery-1.11.3.min.js"></script>
</head>

<body>
    <form id="loginform" action="" method="post" class="layui-form">
        <div class="box loginscreen  animated fadeInDown">
            <div class="login-box">
                <div class="login-title text-center">
                    <h1><small>输入用户名和密码</small></small></h1>
                </div>
                <div class="login-content">
                    
                    <div class="form">
                        <div class="form-group">
                            <div class="layui-form-item">
                                <label class="layui-form-label">登录帐户</label>
                                <div class="layui-input-inline">
                                    <input id="username" name="username" type="text" required lay-verify="required" autocomplete="off" placeholder="请输入登录帐户" class="layui-input" value="">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="layui-form-item">
                                <label class="layui-form-label">登录密码</label>
                                <div class="layui-input-inline">
                                    <input id="password" name="password" type="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="layui-form-item">
                                <div class="layui-input-block">
                               
                                    <a  class="layui-btn layui-btn-normal" lay-submit lay-filter="button_load"   data-method="confirmTrans"  id="button_load">登陆</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div id="login_bg"><img src="img/htbg.jpg" /></div>

    <!-- layui -->
    <script type="text/javascript" src="../jspackage/layui/layui.all.js"></script><!-- 
    <script type="text/javascript" src="./js/jquery.js"></script> -->

    <script type = "text/javascript"   src="js/Des.js"></script>
    <script type = "text/javascript"   src="js/login.js"></script>

</script>
</body>
</html>