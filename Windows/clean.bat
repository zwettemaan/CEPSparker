@ECHO OFF
REM
REM Remove locally created, compiled or derived data and attempt to 
REM bring the project back to a 'clean slate'.
REM

SET scriptDir=%~dp0
PUSHD %scriptDir%..
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

CALL "%scriptDir%clearPlayerDebugMode.bat"

IF EXIST %BuildSettings\ExtensionDirName.txt (

    SET /p EXTENSION_DIRNAME=< BuildSettings\ExtensionDirName.txt
    
    IF NOT "%EXTENSION_DIRNAME%" == "" (
    
        SET EXTENSION_HOMEDIR="%APPDATA%\Adobe\CEP\extensions\%EXTENSION_DIRNAME%\"
    
        RD /s /q %EXTENSION_HOMEDIR% > NUL 2>&1
    
    )
)

RD /s /q LocalLinks > NUL 2>&1
RD /s /q build > NUL 2>&1

POPD