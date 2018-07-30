@ECHO OFF
REM
REM Remove locally created, compiled or derived data and attempt to 
REM bring the project back to a 'clean slate'.
REM

SET scriptDir=%~dp0
PUSHD "%scriptDir%.."
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

CALL "%scriptDir%clearPlayerDebugMode.bat"

SET EXTENSION_DIRNAME=
IF EXIST BuildSettings\ExtensionDirName.txt (
    SET /p EXTENSION_DIRNAME=< BuildSettings\ExtensionDirName.txt
)   

SET EXTENSION_HOMEDIR=
IF "%EXTENSION_DIRNAME%" == "" (
    ECHO Empty ExtensionDirName. Won't attempt to remove extension directory.
) ELSE (
    SET EXTENSION_HOMEDIR=%APPDATA%\Adobe\CEP\extensions\%EXTENSION_DIRNAME%\
)

IF NOT "%EXTENSION_HOMEDIR%" == "" (    
    RD /s /q "%EXTENSION_HOMEDIR%" >NUL 2>&1
)

RD /S /Q LocalLinks >NUL 2>&1
RD /S /Q build >NUL 2>&1

POPD