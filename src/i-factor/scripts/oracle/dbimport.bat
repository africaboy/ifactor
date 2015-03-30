@echo off

call "%~dp0../setenv"

"%ORA_HOME%\bin\imp" ifactor/ifactor fromuser=ifactor touser=ifactor file=%~dp0data\ifactor.dmp

pause


