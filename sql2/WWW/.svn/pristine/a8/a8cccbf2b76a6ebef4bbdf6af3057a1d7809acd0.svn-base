//新闻管理-提交验证
function checkNews() {
	
	
	var classstr = "news_classid_validation";
	var namestr = "news_name_validation";
	
	var idinput=$("#news_id");
	
	var newsid=$("#news_id").val();
	var newsclassid = $("#news_classid").val();
	var newsname = $("#news_name").val();
	
	var newscontent = $("#news_content").val();
	var newsfrom = $("#news_from").val();
	var newsviews = $("#news_views").val();
	var newstitle = $("#news_title").val();
	var newskeywords = $("#news_keywords").val();
	var newsdescription = $("#news_description").val();
	var newsistop = $("#news_istop").val();
	
	if (newsclassid == ""||newsclassid == 0) {
		validationPrompt("新闻类别不能为空",classstr);
		return false;
	}else{
		validationPromptClear(classstr);
	}
	
	if (newsname == "") {
		validationPrompt("新闻名称不能为空",namestr);
		return false;
	}else {		
		validationPromptClear(namestr);		
	}
	
	//提交数据
	if(idinput.length==0){
		$.ajax({
			type: "POST",
			url: "back/json/news_add",
			data: $("#form_news").serialize(),
			dataType: "json",
			success: function(data){
				if(data.code==1){
					parent.doremind('保存成功！',2,'back/news','back/news_operation?method=add');
				}
             },
			error: function(json){} 
		});
	}else{
		$.ajax({
			type: "POST",
			url: "back/json/news_edit?dc=" + new Date().getTime() + "",
			data: $("#form_news").serialize(),
			dataType: "json",
			success: function(data){
				if(data.code==1){
					parent.doremind('保存成功！',2,'back/news','back/news');
					//$("#tb_commonaddress").bootstrapTable('refresh');
				}
             },
 			error: function(json){}
		});
	}
	
	return false;
}

//文章管理-提交验证
function checkArticle() {	
	
	var classstr = "article_classid_validation";
	var namestr = "article_name_validation";
	
	var idinput=$("#article_id");
	
	var articleid=$("#article_id").val();
	var articlename = $("#article_name").val();
	
	var articlecontent = $("#article_content").val();
	var articleviews = $("#article_views").val();
	var articletitle = $("#article_title").val();
	var articlekeywords = $("#article_keywords").val();
	var articledescription = $("#article_description").val();
	
	if (articlename == "") {
		validationPrompt("新闻名称不能为空",namestr);
		return false;
	}else {		
		validationPromptClear(namestr);		
	}
	
	//提交数据
	if(idinput.length==0){
		$.ajax({
			type: "POST",
			url: "back/json/article_add",
			data: $("#form_article").serialize(),
			dataType: "json",
			success: function(data){
				if(data.code==1){
					parent.doremind('保存成功！',2,'back/article','back/article_operation?method=add');
				}
         },
			error: function(json){} 
		});
	}else{
		$.ajax({
			type: "POST",
			url: "back/json/article_edit?dc=" + new Date().getTime() + "",
			data: $("#form_article").serialize(),
			dataType: "json",
			success: function(data){
				if(data.code==1){
					parent.doremind('保存成功！',2,'back/article','back/article');
					//$("#tb_commonaddress").bootstrapTable('refresh');
				}
         },
			error: function(json){}
		});
	}
	
	return false;
}

/*---------------------功能模块 start---------------------*/
/*---------------------功能模块 end---------------------*/
