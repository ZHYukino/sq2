Set ws=Wscript.createobject("wscript.shell")
ws.run "start_mysql.bat",0
ws.run "start_php.bat",0
Set ws = Nothing
MsgBox "php+mysql�ķ�������������������������룺http://127.0.0.1/:88/login.php",0,"��ʾ"