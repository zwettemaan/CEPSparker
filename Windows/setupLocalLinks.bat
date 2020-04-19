@ECHO OFF
REM
REM Set up a folder with symbolic links to important 
REM local directories for easy access
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

REM
REM Do nothing if the LocalLinks already exists. If you want a clean
REM slate, delete LocalLinks before running this script
REM

IF EXIST LocalLinks (
	ECHO.
    ECHO Warning: LocalLinks directory already exists. Aborting.
	ECHO.
    POPD
    EXIT /B
) 
        
MKDIR LocalLinks
CD LocalLinks

MKLINK /D Extensions_Application "%PROGRAMFILES(X86)%\Common Files\Adobe\CEP\extensions"
MKLINK /D Extensions_User "%APPDATA%\Adobe\CEP\extensions"
MKLINK /D Adobe_LogFiles "%LOCALAPPDATA%\Temp"

POPD