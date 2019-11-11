@echo off
taskkill /F /IM mysqld.exe
"./mysql-5.5.55-win32/bin/mysqld.exe" --defaults-file=./mysql-5.5.55-win32/my.ini