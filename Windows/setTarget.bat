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

SET CRDT_MANIFEST="CRDT_manifest.json"

SET cmd="$PROJECT_VERSION = (Get-Content -Path 'CRDT_manifest.json' | ConvertFrom-Json) ; ($machineInfo.pluginInstallerPath | out-file -encoding ASCII 'C:\Users\ADMINI~1\AppData\Local\Temp\2\pluginInstallerPath.txt')"

PowerShell %cmd%
REM FOR /F "delims=" %%x in (%TEMP%\pluginInstallerPath.txt) do set PLUGIN_INSTALLER=%%x
SET /P PLUGIN_INSTALLER=<%TEMP%\pluginInstallerPath.txt

SET EXTENSION_HOME_DIR=
IF NOT "%TARGET_DIRNAME%" == "" (
    SET EXTENSION_HOME_DIR=%EXTENSION_DIR%%TARGET_DIRNAME%\
)

CALL "%BUILD_SETTINGS_DIR%configSettings.bat"
CALL "%BUILD_SETTINGS_DIR%buildSettings.bat"

:DONE