@echo off

call "%~dp0../setenv"

"%MYSQL_HOME%\bin\mysqldump" --hex-blob %MYSQL_LOGON% ifactor > %~dp0data\ifactor.sql

pause
