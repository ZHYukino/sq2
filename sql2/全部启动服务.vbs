Set ws=Wscript.createobject("wscript.shell")
ws.run "start_mysql.bat",0
ws.run "start_php.bat",0
Set ws = Nothing
MsgBox "php+mysql的服务已启动，可在浏览器上输入：http://127.0.0.1/:88/login.php",0,"提示"