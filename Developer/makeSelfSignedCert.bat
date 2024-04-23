@Echo OFF
SetLocal EnableDelayedExpansion

SET SPRK_DEV_TOOLS_DIR=%~dp0

PUSHD "%SPRK_DEV_TOOLS_DIR%.."

SET PROJECT_ROOT_DIR=%cd%\
CD BuildSettings
SET BUILD_SETTINGS_DIR=%cd%\

POPD

PUSHD "%PROJECT_ROOT_DIR%"

IF NOT EXIST "%BUILD_SETTINGS_DIR%certinfo.bat" (
    ECHO.
    ECHO Error: certinfo.bat not found. 
    ECHO Probably this CEPSparker folder has not been initialized. Make
    ECHO sure to run the SparkerConfig.exe command first. Aborting.
    ECHO.
    POPD
    EXIT /B
)

IF NOT EXIST "%SPRK_DEV_TOOLS_DIR%ZXPSignCmd.exe" (
    ECHO.
    ECHO Error: ZXPSignCmd.exe not found. 
    ECHO Use the downloadZXPSignCmd.bat script to download it. Aborting.
    ECHO.
    POPD
    EXIT /B
)

CALL "%BUILD_SETTINGS_DIR%certinfo.bat"

IF EXIST "%BUILD_SETTINGS_DIR%%SPRK_CERTFILE%" (
    ECHO.
    ECHO Error: Certificate file already exists. Aborting. 
    ECHO.
    POPD
    EXIT /B
)

ECHO.
ECHO Using the certificate information from BuildSettings/certinfo.command.
ECHO Edit BuildSettings/certinfo.command before running this script if necessary.
ECHO.

"%SPRK_DEV_TOOLS_DIR%ZXPSignCmd.exe" -selfSignedCert "%SPRK_COUNTRY_CODE%" "%SPRK_STATE_OR_PROVINCE%" "%SPRK_ORGANIZATION%" "%SPRK_COMMON_NAME%" "%SPRK_PASSWORD%" "%BUILD_SETTINGS_DIR%%SPRK_CERTFILE%"

ECHO.
ECHO %BUILD_SETTINGS_DIR%%SPRK_CERTFILE% has been generated.
ECHO.

POPD