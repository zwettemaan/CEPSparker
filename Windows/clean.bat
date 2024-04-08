@ECHO OFF
REM
REM Remove locally created, compiled or derived data and attempt to 
REM bring the project back to a 'clean slate'.
REM

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%"

CALL "%SPRK_COMMANDS_DIR%clearPlayerDebugMode.bat"

IF NOT "%EXTENSION_HOME_DIR%" == "" (    
    RD /s /q "%EXTENSION_HOME_DIR%" >NUL 2>&1
)

RD /S /Q LocalLinks >NUL 2>&1
RD /S /Q build >NUL 2>&1
DEL /Q *.tpkg
DEL /Q Developer\*_trackingGUID.json"

POPD

ECHO.
ECHO Project has been set to a clean slate. Built version and local links removed.
ECHO.

IF NOT "%1" == "NESTED" (
    SET /P REPLY=Press [Enter] to finalize 
)
