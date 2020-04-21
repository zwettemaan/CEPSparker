@ECHO OFF

REM Launch an Administrative CMD shell when double-clicked

powershell.exe -Command "Start-Process cmd \"/k cd /d %cd%\" -Verb RunAs"