@echo off

call "%~dp0../setenv"

"%MYSQL_HOME%\bin\mysql" %MYSQL_LOGON% ifactor < %~dp0data\ifactor.sql

pause
