@ECHO OFF

SETLOCAL EnableDelayedExpansion

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%"

CD node_install

npm pack jsinterface
REN jsinterface*.tgz jsinterface.tgz
RD /S /Q jsinterface >NUL 2>&1

npm pack runtests
REN runtests*.tgz runtests.tgz
RD /S /Q runtests >NUL 2>&1

POPD
