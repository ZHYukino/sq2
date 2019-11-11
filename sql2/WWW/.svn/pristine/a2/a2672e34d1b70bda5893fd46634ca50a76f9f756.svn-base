//登陆-验证
function checkLogin() {
	var loginname = $("#login_username").val();
	var loginpassword = $("#login_password").val();

	/*if (loginname == "") {
		LoginPrompt("用户名不能为空","username");
		return false;
	}
	
	if (loginpassword == "") {
		LoginPrompt("用户密码不能为空","password");
		return false;
	}else {
		LoginPromptClear();

		return true;
	}*/
}

/*---------------------功能模块 start---------------------*/
//打开网页
function openurl(urlstr){
	window.open(urlstr);   
}
//当前页打开网页
function openCurrentUrl(urlstr){
	window.open(urlstr,'_self');
}

//登陆注册页提示
function LoginPrompt(str,name) {
	if(name=="username"){
		$("#login_validate_username").html(str);
	}
	
	if(name=="password"){
		$("#login_validate_password").html(str);
	}
	/*if ($(".alert").length != 0) {
		$(".alert").remove();
	}

	switch (anum) {
	case 1:
		mstr = "alert-success";
		break;
	case 2:
		mstr = "alert-info";
		break;
	case 3:
		mstr = "alert-warning";
		break;
	case 4:
		mstr = "alert-danger";
		break;
	}

	promptstr = "<div class=\"alert " + mstr + "\">";
	promptstr = promptstr + "<div class=\"web-panel\">";
	promptstr = promptstr + str;
	promptstr = promptstr + "<a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a>";
	promptstr = promptstr + "</div>";
	promptstr = promptstr + "</div>";


	if (method == "log") {
		$("#member_log_prompt").append(promptstr);
	} else {
		$("#member_reg_prompt").append(promptstr);
	}

	setTimeout(function() {
		$(".alert").animate({
			opacity : '0.0'
		}, 1500, function() {
			$(".alert").remove();
		})
	}, 2000)*/
}

//后台页面验证提示
function validationPrompt(str,name) {
	$("#"+ name +"").html(str);
}

//登陆注册页提示
function LoginPromptClear(str) {
	$("#login_validate_username").empty();
	$("#login_validate_password").empty();
}

//清除后台页面验证提示
function validationPromptClear(str) {
	$("#"+ str +"").empty();	
}
/*---------------------功能模块 end---------------------*/