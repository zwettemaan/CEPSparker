@ECHO OFF

SETLOCAL EnableDelayedExpansion

REM
REM Setup the panel so we can run it in a live debug session 
REM

REM KC 20220726: this server worked, found it in a list
REM https://kbpdfstudio.qoppa.com/list-of-timestamp-servers-for-signing-pdf/

SET timestampServer=http://timestamp.digicert.com

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
CD devtools
SET SPRK_DEV_TOOLS_DIR=%cd%\
POPD

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%"

REM Check whether we have administrative permissions

NET SESSION >NUL 2>&1

IF NOT %errorLevel% == 0 (
    ECHO.
    ECHO Error: this script must be run from a command line shell
    ECHO with administrative privileges. Aborting.
    ECHO.
    GOTO DONE
)

CALL "%SPRK_COMMANDS_DIR%clean.bat" NESTED

IF NOT EXIST "%BUILD_SETTINGS_DIR%certinfo.bat" (

    ECHO.
    ECHO Error: certinfo.bat not found. 
    ECHO Probably this CEPSparker folder has not been initialized. Make
    ECHO sure to run the Windows\SparkerConfig.exe command first.
    ECHO Aborting.
    ECHO.
    GOTO DONE

) 

IF NOT EXIST "%SPRK_DEV_TOOLS_DIR%ZXPSignCmd.exe" (

    ECHO.
    ECHO Error: ZXPSignCmd.exe not found. 
    ECHO Use the devtools\downloadZXPSignCmd.bat script to download it. 
    ECHO Aborting.
    ECHO.

    GOTO DONE
)

CALL "%BUILD_SETTINGS_DIR%certinfo.bat"

IF NOT EXIST "%BUILD_SETTINGS_DIR%\%SPRK_CERTFILE%" (

    ECHO.
    ECHO Error: certificate file
    ECHO   %BUILD_SETTINGS_DIR%\%SPRK_CERTFILE%
    ECHO not found.
    ECHO Need to provide a certificate file, or create a self-signed one first. See devtools\makeSelfSignedCert.bat
    ECHO Aborting.
    ECHO.

    GOTO DONE
)

IF NOT EXIST "%BUILD_DIR%" (
    MKDIR "%BUILD_DIR%"
)

CALL "%SPRK_COMMANDS_DIR%adjustVersionInManifest.bat" NESTED

SET EXTENSION_BUILD_DIR=%BUILD_DIR%%TARGET_DIRNAME%

RD /s /q "%EXTENSION_BUILD_DIR%" >NUL 2>&1
MKDIR "%EXTENSION_BUILD_DIR%"

XCOPY "%PROJECT_ROOT_DIR%css"           "%EXTENSION_BUILD_DIR%\css\" /y /s /e >NUL 2>&1
XCOPY "%PROJECT_ROOT_DIR%CSXS"          "%EXTENSION_BUILD_DIR%\CSXS\" /y /s /e >NUL 2>&1
XCOPY "%PROJECT_ROOT_DIR%html"          "%EXTENSION_BUILD_DIR%\html\" /y /s /e >NUL 2>&1
XCOPY "%PROJECT_ROOT_DIR%js"            "%EXTENSION_BUILD_DIR%\js\" /y /s /e >NUL 2>&1
XCOPY "%PROJECT_ROOT_DIR%jsx"           "%EXTENSION_BUILD_DIR%\jsx\" /y /s /e >NUL 2>&1
DEL "%EXTENSION_BUILD_DIR%\jsx\manually*.jsx" >NUL 2>&1
XCOPY "%PROJECT_ROOT_DIR%shared_js_jsx" "%EXTENSION_BUILD_DIR%\shared_js_jsx\" /y /s /e >NUL 2>&1

CD "%BUILD_DIR%"

"%SPRK_DEV_TOOLS_DIR%ZXPSignCmd" -sign "%TARGET_DIRNAME%" "%TARGET_DIRNAME%.zxp" "%BUILD_SETTINGS_DIR%\%SPRK_CERTFILE%" "%SPRK_PASSWORD%" -tsa "%timestampServer%"

RD /s /q "%EXTENSION_BUILD_DIR%" >NUL 2>&1

REN "%TARGET_DIRNAME%.zxp" "%TARGET_DIRNAME%.%PROJECT_VERSION%.zxp"

:DONE

POPD
SET /P REPLY=Press [Enter] to finalize
