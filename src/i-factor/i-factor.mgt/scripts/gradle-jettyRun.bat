@echo off

call "%~dp0..\..\scripts\setenv"

set GRADLE_OPTS=-Xmx512m -XX:MaxPermSize=512m -Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n
rem set GRADLE_USER_HOME=%UserProfile%\.gradle

cd /d "%~dp0.."
gradle jettyRun 2>&1 | "%~dp0..\..\scripts\tee" "%~dp0stdout.log"

pause
