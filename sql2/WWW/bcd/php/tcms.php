<?php 
	require("common.php");
	$tcms = parse_ini_file("../../4/play.lst",true);
	$tcms = explode(',',$tcms["tcms"]["item0"]);
	


	$json = [
		"checktcms"=>intval($tcms["0"]),
		"speedtcms"=>intval($tcms["1"])/100,
		"imgpicname"=>"./4/".$tcms["2"].""
	];
	if($tcms == "0"){
		$json["imgpicname"] = 0;
	}
	echo json_encode($json);

