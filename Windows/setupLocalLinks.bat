@ECHO OFF
REM
REM Set up a folder with symbolic links to important 
REM local directories for easy access
REM

SET scriptDir=%~dp0
PUSHD %scriptDir%..
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

REM
REM Do nothing if the LocalLinks already exists. If you want a clean
REM slate, delete LocalLinks before running this script
REM

IF NOT EXIST LocalLinks (

    MKDIR LocalLinks
    CD LocalLinks

    MKLINK /D Extensions_Application "%PROGRAMFILES(X86)%\Common Files\Adobe\CEP\extensions"
    MKLINK /D Extensions_User "%APPDATA%\Adobe\CEP\extensions"
    MKLINK /D Adobe_LogFiles "%LOCALAPPDATA%\Temp"

)

POPD