@ECHO OFF

SETLOCAL EnableDelayedExpansion

WHERE /q npm
IF ERRORLEVEL 1 (
    ECHO ERROR, cannot run. Node.js needs to be installed; node and npm command line commands need to be available.
    GOTO DONE
)

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%node_install"

IF NOT EXIST jsinterface.tgz (
    DEL jsinterface*.tgz >NUL 2>&1
    CALL npm pack jsinterface
    cd "%PROJECT_ROOT_DIR%node_install"
    REN jsinterface*.tgz jsinterface.tgz
    RD /S /Q jsinterface >NUL 2>&1
)

IF NOT EXIST runtests.tgz (
    DEL runtests*.tgz >NUL 2>&1
    CALL npm pack runtests
    cd "%PROJECT_ROOT_DIR%node_install"
    REN runtests*.tgz runtests.tgz
    RD /S /Q runtests >NUL 2>&1
)

CD ..

npm install .

POPD

:DONE