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
    ECHO Error: this script must be run from a command line shell
    ECHO with administrative privileges. Aborting.
    POPD
    EXIT /B
) 

IF NOT EXIST BuildSettings\ExtensionDirName.txt (
    ECHO Error: This CEPSparker folder has not been initialized. Make
    ECHO sure to run the CEPSparkerConfig.exe command first. Aborting.
    POPD
    EXIT /B
) 

SET /P EXTENSION_DIRNAME=< BuildSettings\ExtensionDirName.txt

IF "%EXTENSION_DIRNAME%" == "" (
    ECHO Error: Cannot determine the directory name for this
    ECHO extension. Aborting.
    POPD
    EXIT /B
)

SET EXTENSION_HOMEDIR=%APPDATA%\Adobe\CEP\extensions\%EXTENSION_DIRNAME%\

CALL "%scriptDir%setPlayerDebugMode.bat"
CALL "%scriptDir%adjustVersionInManifest.bat"

RD /s /q "%EXTENSION_HOMEDIR%" >NUL 2>&1
MKDIR "%EXTENSION_HOMEDIR%"

MKLINK /H "%EXTENSION_HOMEDIR%.debug" "%projectHomeDir%debug"

MKLINK /J "%EXTENSION_HOMEDIR%css" "%projectHomeDir%css"
MKLINK /J "%EXTENSION_HOMEDIR%CSXS" "%projectHomeDir%CSXS"
MKLINK /J "%EXTENSION_HOMEDIR%html" "%projectHomeDir%html"
MKLINK /J "%EXTENSION_HOMEDIR%js" "%projectHomeDir%js"
MKLINK /J "%EXTENSION_HOMEDIR%jsx" "%projectHomeDir%jsx"
MKLINK /J "%EXTENSION_HOMEDIR%shared_js_jsx" "%projectHomeDir%shared_js_jsx"

REM Some sample code to refer to if css dir has subdirs.
REM MKDIR "%EXTENSION_HOMEDIR%css"
REM ICACLS "%EXTENSION_HOMEDIR%" /grant Everyone:(OI)(CI)F
REM FOR /F %%f IN ('DIR /b %projectHomeDir%css') DO MKLINK /H %EXTENSION_HOMEDIR%css\%%f %projectHomeDir%css\%%f

POPD
