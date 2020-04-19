@Echo OFF
SetLocal EnableDelayedExpansion

SET devToolsDir=%~dp0

PUSHD "%devToolsDir%.."
SET projectHomeDir=%cd%\
CD BuildSettings
SET buildSettingsDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

IF NOT EXIST "%buildSettingsDir%certinfo.bat" (
    ECHO.
    ECHO Error: certinfo.bat not found. 
    ECHO Probably this CEPSparker folder has not been initialized. Make
    ECHO sure to run the SparkerConfig.exe command first. Aborting.
    ECHO.
    POPD
    EXIT /B
)

IF NOT EXIST "%devToolsDir%ZXPSignCmd.exe" (
    ECHO.
    ECHO Error: ZXPSignCmd.exe not found. 
    ECHO Use the downloadZXPSignCmd.bat script to download it. Aborting.
    ECHO.
    POPD
    EXIT /B
)

CALL "%buildSettingsDir%certinfo.bat"

IF EXIST "%buildSettingsDir%\%certfile%" (
    ECHO.
    ECHO Error: Certificate file already exists. Aborting. 
    ECHO.
    POPD
    EXIT /B
)

"%devToolsDir%\ZXPSignCmd.exe" -selfSignedCert "%countryCode%" "%stateOrProvince%" "%organization%" "%commonName%" "%password%" "%buildSettingsDir%\%certfile%"

POPD