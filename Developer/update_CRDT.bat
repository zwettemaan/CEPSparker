@ECHO OFF
SETLOCAL EnableDelayedExpansion

SET SPRK_DEV_TOOLS_DIR=%~dp0

PUSHD %SPRK_DEV_TOOLS_DIR%..

SET PROJECT_ROOT_DIR=%cd%\

SET BUILD_SETTINGS_DIR=%PROJECT_ROOT_DIR%BuildSettings\

IF "%TIGHTENER_GIT_ROOT%" == "" GOTO NO_REFRESH

IF NOT EXIST "%TIGHTENER_GIT_ROOT%" GOTO NO_REFRESH

SET CREATIVE_DEVELOPER_TOOLS_ES=%TIGHTENER_GIT_ROOT%..\CRDT_ES\scripts\CreativeDeveloperTools_ES

IF NOT EXIST "%CREATIVE_DEVELOPER_TOOLS_ES%" GOTO NO_REFRESH

RD /S /Q Templates\jsx\CreativeDeveloperTools_ES >NUL 2>&1
XCOPY "%CREATIVE_DEVELOPER_TOOLS_ES%" Templates\jsx\CreativeDeveloperTools_ES\ /S /Y > NUL

GOTO AFTER_REFRESH

:NO_REFRESH

ECHO Cannot refresh from repo. CEPSparker repo needs to be installed alongside CRDT_ES repo with an .nzip file in it.

:AFTER_REFRESH

IF NOT EXIST jsx GOTO DONE

RD /S /Q jsx\CreativeDeveloperTools_ES >NUL 2>&1
XCOPY "%CREATIVE_DEVELOPER_TOOLS_ES%" jsx\CreativeDeveloperTools_ES\ /S /Y > NUL

:DONE

POPD
