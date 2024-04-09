@ECHO OFF
SETLOCAL EnableDelayedExpansion

SET SPRK_DEV_TOOLS_DIR=%~dp0

PUSHD %SPRK_DEV_TOOLS_DIR%..

SET PROJECT_ROOT_DIR=%cd%\

SET BUILD_SETTINGS_DIR=%PROJECT_ROOT_DIR%BuildSettings\

IF "%TIGHTENER_GIT_ROOT%" == "" GOTO NO_REFRESH

IF NOT EXIST "%TIGHTENER_GIT_ROOT%" GOTO NO_REFRESH

SET CREATIVE_DEVELOPER_TOOLS_ES_NZIP=%TIGHTENER_GIT_ROOT%..\CRDT_ES\scripts\CreativeDeveloperTools_ES.nzip

IF NOT EXIST "%CREATIVE_DEVELOPER_TOOLS_ES_NZIP%" GOTO NO_REFRESH

DEL /Q Templates\jsx\CreativeDeveloperTools_ES.nzip >NUL 2>&1

COPY %CREATIVE_DEVELOPER_TOOLS_ES_NZIP% Templates\jsx >NUL 2>&1

GOTO AFTER_REFRESH

:NO_REFRESH

ECHO Cannot refresh from repo. CEPSparker repo needs to be installed alongside CRDT_ES repo with an .nzip file in it.

:AFTER_REFRESH

IF NOT EXIST jsx GOTO DONE

RD /S /Q jsx\CreativeDeveloperTools_ES >NUL 2>&1
DEL /Q jsx\CreativeDeveloperTools_ES.nzip >NUL 2>&1
DEL /Q jsx\CreativeDeveloperTools_ES.zip >NUL 2>&1

COPY Templates\jsx\CreativeDeveloperTools_ES.nzip jsx\CreativeDeveloperTools_ES.zip >NUL 2>&1

CD jsx

POWERSHELL -command "Expand-Archive -Force 'CreativeDeveloperTools_ES.zip' '.'"

REN CreativeDeveloperTools_ES.zip CreativeDeveloperTools_ES.nzip

:DONE

POPD
