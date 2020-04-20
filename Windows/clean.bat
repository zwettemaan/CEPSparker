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

SET TARGET_DIRNAME=
IF EXIST BuildSettings\ExtensionDirName.txt (
    SET /p TARGET_DIRNAME=< BuildSettings\ExtensionDirName.txt
)   

SET EXTENSION_HOME_DIR=
IF "%TARGET_DIRNAME%" == "" (
    ECHO Empty ExtensionDirName. Won't attempt to remove extension directory.
) ELSE (
    SET EXTENSION_HOME_DIR=%APPDATA%\Adobe\CEP\extensions\%TARGET_DIRNAME%\
)

IF NOT "%EXTENSION_HOME_DIR%" == "" (    
    RD /s /q "%EXTENSION_HOME_DIR%" >NUL 2>&1
)

RD /S /Q LocalLinks >NUL 2>&1
RD /S /Q build >NUL 2>&1

POPD