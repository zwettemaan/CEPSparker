@ECHO OFF
REM
REM Set up a folder with symbolic links to important 
REM local directories for easy access
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

    REM
    REM Do nothing if the LocalLinks already exists. If you want a clean
    REM slate, delete LocalLinks before running this script
    REM

    IF EXIST LocalLinks (
        
        ECHO.
        ECHO Warning: LocalLinks directory already exists.
        ECHO.

        explorer LocalLinks

    ) ELSE (
            
        MKDIR LocalLinks
        CD LocalLinks

        MKLINK /D Extensions_Application "%PROGRAMFILES(X86)%\Common Files\Adobe\CEP\extensions"
        MKLINK /D Extensions_User "%APPDATA%\Adobe\CEP\extensions"
        MKLINK /D Adobe_LogFiles "%LOCALAPPDATA%\Temp"

        explorer .

    )
)

POPD

IF NOT "%1" == "NESTED" (
    SET /P REPLY=Press [Enter] to finalize
)

