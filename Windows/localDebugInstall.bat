@ECHO ON
REM
REM Setup the panel so we can run it in a live debug session 
REM

SET scriptDir=%~dp0
PUSHD %scriptDir%..
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

IF EXIST BuildSettings\ExtensionDirName.txt (

    SET /p EXTENSION_DIRNAME=< BuildSettings\ExtensionDirName.txt

    IF NOT "%EXTENSION_DIRNAME%" == "" (

        SET EXTENSION_HOMEDIR="%APPDATA%\Adobe\CEP\extensions\%EXTENSION_DIRNAME%\"

        CALL "%scriptDir%setPlayerDebugMode.bat"
        CALL "%scriptDir%adjustVersionInManifest.bat"

        RD /s /q %EXTENSION_HOMEDIR% > NUL 2>&1
        MKDIR %EXTENSION_HOMEDIR%

        MKLINK %EXTENSION_HOMEDIR%.debug "%projectHomeDir%debug"
        MKLINK /D %EXTENSION_HOMEDIR%CSS "%projectHomeDir%CSS"
        MKLINK /D %EXTENSION_HOMEDIR%CSXS "%projectHomeDir%CSXS"
        MKLINK /D %EXTENSION_HOMEDIR%html "%projectHomeDir%html"
        MKLINK /D %EXTENSION_HOMEDIR%js "%projectHomeDir%js"
        MKLINK /D %EXTENSION_HOMEDIR%jsx "%projectHomeDir%jsx"
        MKLINK /D %EXTENSION_HOMEDIR%shared_js_jsx "%projectHomeDir%shared_js_jsx"
        
    )
)

POPD
