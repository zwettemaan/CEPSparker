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

SET USER_HOME_DIR=%USERPROFILE%\
SET EXTENSION_DIR=%APPDATA%\Adobe\CEP\extensions\
SET DOCUMENTS_DIR=%USER_HOME_DIR%Documents\
SET ADOBE_SCRIPTS_DIR=%DOCUMENTS_DIR%Adobe Scripts

IF NOT EXIST "%BUILD_SETTINGS_DIR%configSettings.bat" (

    ECHO.
    ECHO Run the SparkerConfig first - this project has not been configured.
    ECHO.
    GOTO DONE

) 

SET CRDT_MANIFEST=%PROJECT_ROOT_DIR%CRDT_manifest.json
SET CMD="$manifest = (Get-Content '%CRDT_MANIFEST%' | ForEach-Object { $_ -replace '^^\s*\/\/.*$','' } | ConvertFrom-Json); echo $manifest.version"

SETLOCAL EnableDelayedExpansion

FOR /f "DELIMS=" %%a IN ('PowerShell %CMD%') DO SET CRDT_VERSION=%%a

ENDLOCAL

CALL "%BUILD_SETTINGS_DIR%configSettings.bat"

SET EXTENSION_HOME_DIR=
IF NOT "%TARGET_DIRNAME%" == "" (
    SET EXTENSION_HOME_DIR=%EXTENSION_DIR%%TARGET_DIRNAME%\
)

:DONE