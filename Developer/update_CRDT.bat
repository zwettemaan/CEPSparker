@ECHO OFF

REM
REM This script is used for building a CEPSparker release. It will grab the CreativeDeveloperTools_ES.nzip
REM file from the CRDT_ES repo.
REM

SETLOCAL EnableDelayedExpansion

SET SPRK_DEV_TOOLS_DIR=%~dp0

PUSHD %SPRK_DEV_TOOLS_DIR%..

SET PROJECT_ROOT_DIR=%cd%\

SET BUILD_SETTINGS_DIR=%PROJECT_ROOT_DIR%BuildSettings\

IF "%TIGHTENER_GIT_ROOT%" == "" GOTO NO_REFRESH

IF NOT EXIST "%TIGHTENER_GIT_ROOT%" GOTO NO_REFRESH

SET CREATIVE_DEVELOPER_TOOLS_ES_NZIP=%TIGHTENER_GIT_ROOT%..\CRDT_ES\scripts\CreativeDeveloperTools_ES.nzip

IF NOT EXIST "%CREATIVE_DEVELOPER_TOOLS_ES_NZIP%" GOTO NO_REFRESH

CD "%PROJECT_ROOT_DIR%Templates\jsx"

RD /S /Q CreativeDeveloperTools_ES >NUL 2>&1
DEL CreativeDeveloperTools_ES.nzip >NUL 2>&1
DEL CreativeDeveloperTools_ES.zip >NUL 2>&1

COPY "%CREATIVE_DEVELOPER_TOOLS_ES_NZIP%" CreativeDeveloperTools_ES.zip > NUL 2>&1
PowerShell -c "Expand-Archive -Path 'CreativeDeveloperTools_ES.zip' -DestinationPath '.'"
DEL CreativeDeveloperTools_ES.zip >NUL 2>&1

IF NOT EXIST "%PROJECT_ROOT_DIR%jsx" GOTO DONE

CD "%PROJECT_ROOT_DIR%jsx"

RD /S /Q CreativeDeveloperTools_ES >NUL 2>&1
DEL CreativeDeveloperTools_ES.nzip >NUL 2>&1
DEL CreativeDeveloperTools_ES.zip >NUL 2>&1

COPY "%CREATIVE_DEVELOPER_TOOLS_ES_NZIP%" CreativeDeveloperTools_ES.zip > NUL 2>&1
PowerShell -c "Expand-Archive -Path 'CreativeDeveloperTools_ES.zip' -DestinationPath '.'"
DEL CreativeDeveloperTools_ES.zip >NUL 2>&1

GOTO DONE

:NO_REFRESH

ECHO Cannot refresh from repo. CEPSparker repo needs to be installed alongside CRDT_ES repo with an .nzip file in it.
GOTO :DONE

:DONE

POPD
