@ECHO OFF
REM
REM Set up a bunch of environment variables
REM

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

SET BUILD_SETTINGS_DIR=%PROJECT_ROOT_DIR%BuildSettings\
SET BUILD_DIR=%PROJECT_ROOT_DIR%build\

IF NOT EXIST "%BUILD_SETTINGS_DIR%configSettings.bat" (

    ECHO.
    ECHO Run the SparkerConfig first - this project has not been configured.
    ECHO.

) ELSE (

    CALL "%BUILD_SETTINGS_DIR%configSettings.bat"
    CALL "%BUILD_SETTINGS_DIR%buildSettings.bat"

)

SET EXTENSION_HOME_DIR=
IF NOT "%TARGET_DIRNAME%" == "" (
    SET EXTENSION_HOME_DIR=%APPDATA%\Adobe\CEP\extensions\%TARGET_DIRNAME%\
)