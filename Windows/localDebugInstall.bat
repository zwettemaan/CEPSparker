@ECHO OFF

REM
REM Setup the panel so we can run it in a live debug session 
REM

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%"

REM Check whether we have administrative permissions

NET SESSION >NUL 2>&1

IF NOT %errorLevel% == 0 (
    
    ECHO.
    ECHO Error: this script must be run from a command line shell
    ECHO with administrative privileges. You can double-click sudo.bat
    ECHO to launch such a command line shell.
    ECHO.
    ECHO Aborting.
    ECHO.

) ELSE (

    CALL "%SPRK_COMMANDS_DIR%setTarget.bat"
    CALL "%SPRK_COMMANDS_DIR%setPlayerDebugMode.bat"
    CALL "%SPRK_COMMANDS_DIR%adjustVersionInManifest.bat" NESTED

    ECHO.
    ECHO Removing directory "!EXTENSION_HOME_DIR!"
    ECHO.

    RD /s /q "%EXTENSION_HOME_DIR%" >NUL 2>&1

    ECHO.
    ECHO Recreating directory "%EXTENSION_HOME_DIR%"
    ECHO.

    MKDIR "%EXTENSION_HOME_DIR%"

    ECHO.
    ECHO Creating temporary symbolic links to the extension
    ECHO.

    MKLINK /H "%EXTENSION_HOME_DIR%.debug"        "%PROJECT_ROOT_DIR%debug"

    MKLINK /J "%EXTENSION_HOME_DIR%css"           "%PROJECT_ROOT_DIR%css"
    MKLINK /J "%EXTENSION_HOME_DIR%CSXS"          "%PROJECT_ROOT_DIR%CSXS"
    MKLINK /J "%EXTENSION_HOME_DIR%CEP_html"      "%PROJECT_ROOT_DIR%CEP_html"
    MKLINK /J "%EXTENSION_HOME_DIR%node_modules"  "%PROJECT_ROOT_DIR%node_modules"
    MKLINK /J "%EXTENSION_HOME_DIR%jsx"           "%PROJECT_ROOT_DIR%jsx"
    MKLINK /J "%EXTENSION_HOME_DIR%CEP_js"        "%PROJECT_ROOT_DIR%CEP_js"
    MKLINK /J "%EXTENSION_HOME_DIR%shared_js"     "%PROJECT_ROOT_DIR%shared_js"
    MKLINK /J "%EXTENSION_HOME_DIR%shared_js_jsx" "%PROJECT_ROOT_DIR%shared_js_jsx"

    REM Some sample code to refer to if css dir has subdirs.
    REM MKDIR "%EXTENSION_HOME_DIR%css"
    REM ICACLS "%EXTENSION_HOME_DIR%" /grant Everyone:(OI)(CI)F
    REM FOR /F %%f IN ('DIR /b %projectHomeDir%css') DO MKLINK /H %EXTENSION_HOME_DIR%css\%%f %projectHomeDir%css\%%f

    POPD

    ECHO.
    ECHO Symbolic links have been created so the extension will run in the Adobe Creative Cloud apps.
    ECHO.
)

SET /P REPLY=Press [Enter] to finalize 

