@ECHO OFF

SETLOCAL EnableDelayedExpansion

REM
REM Setup the panel so we can run it in a live debug session 
REM

SET scriptDir=%~dp0
PUSHD "%scriptDir%.."
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

REM Check whether we have administrative permissions

NET SESSION >NUL 2>&1

IF NOT %errorLevel% == 0 (
    ECHO.
    ECHO Error: this script must be run from a command line shell
    ECHO with administrative privileges. Aborting.
    ECHO.
    POPD
    EXIT /B
) 

IF NOT EXIST BuildSettings\ExtensionDirName.txt (
    ECHO.
    ECHO Error: This CEPSparker folder has not been initialized. Make
    ECHO sure to run the SparkerConfig.exe command first. Aborting.
    ECHO.
    POPD
    EXIT /B
) 

SET /P TARGET_DIRNAME=< BuildSettings\ExtensionDirName.txt

IF "%TARGET_DIRNAME%" == "" (
    ECHO.
    ECHO Error: Cannot determine the directory name for this
    ECHO extension. Aborting.
    ECHO.
    POPD
    EXIT /B
)

SET EXTENSION_HOME_DIR=%APPDATA%\Adobe\CEP\extensions\%TARGET_DIRNAME%\

CALL "%scriptDir%setPlayerDebugMode.bat"
CALL "%scriptDir%adjustVersionInManifest.bat"

RD /s /q "%EXTENSION_HOME_DIR%" >NUL 2>&1
MKDIR "%EXTENSION_HOME_DIR%"

MKLINK /H "%EXTENSION_HOME_DIR%.debug" "%projectHomeDir%debug"

MKLINK /J "%EXTENSION_HOME_DIR%css" "%projectHomeDir%css"
MKLINK /J "%EXTENSION_HOME_DIR%CSXS" "%projectHomeDir%CSXS"
MKLINK /J "%EXTENSION_HOME_DIR%html" "%projectHomeDir%html"
MKLINK /J "%EXTENSION_HOME_DIR%js" "%projectHomeDir%js"
MKLINK /J "%EXTENSION_HOME_DIR%jsx" "%projectHomeDir%jsx"
MKLINK /J "%EXTENSION_HOME_DIR%shared_js_jsx" "%projectHomeDir%shared_js_jsx"

REM Some sample code to refer to if css dir has subdirs.
REM MKDIR "%EXTENSION_HOME_DIR%css"
REM ICACLS "%EXTENSION_HOME_DIR%" /grant Everyone:(OI)(CI)F
REM FOR /F %%f IN ('DIR /b %projectHomeDir%css') DO MKLINK /H %EXTENSION_HOME_DIR%css\%%f %projectHomeDir%css\%%f

POPD
