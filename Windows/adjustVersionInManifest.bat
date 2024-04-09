@ECHO OFF
REM
REM Read CRDT_manifest.json and adjust the CEP manifest
REM

SETLOCAL EnableDelayedExpansion

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

IF NOT EXIST "%PROJECT_ROOT_DIR%BuildSettings\configSettings.bat" GOTO DONE

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"
CALL "%PROJECT_ROOT_DIR%BuildSettings\buildSettings.bat"

PUSHD "%PROJECT_ROOT_DIR%"

POWERSHELL -Command "((gc CSXS\manifest.xml) -replace '(<Extension +Id=\"".*?\"" +Version=\"")([0-9\.]*)(\"")', '${1}%PROJECT_VERSION%${3}') -replace '(ExtensionBundleVersion=\"")([0-9\.]*)(\"")', '${1}%PROJECT_VERSION%${3}' | Out-File CSXS\manifest.xml.new -encoding Utf8"

IF EXIST CSXS\manifest.xml.new (
    DEL CSXS\manifest.xml
    MOVE CSXS\manifest.xml.new CSXS\manifest.xml >NUL
)

POPD

IF NOT "%1" == "NESTED" (
    ECHO.
    ECHO Version number in CSXS\manifest.xml has been set to %PROJECT_VERSION%.
    ECHO.
    SET /P REPLY=Press [Enter] to finalize 
)

:DONE