@echo off
"./php-5.4.14/php.exe" -c %cd%/php-5.4.14/php.ini -S 0.0.0.0:88 -t %cd%/WWW
cmd