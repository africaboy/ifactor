@echo off

call "%~dp0../setenv"

"%ORA_HOME%\bin\exp" ifactor/ifactor owner=ifactor file=%~dp0data\ifactor.dmp

pause


