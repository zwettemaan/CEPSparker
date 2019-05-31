@Echo OFF
SetLocal EnableDelayedExpansion

SET devToolsDir=%~dp0

PUSHD "%devToolsDir%.."
SET projectHomeDir=%cd%\
CD BuildSettings
SET buildSettingsDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

"%buildSettingsDir%"certinfo.bat

ZXPSignCmd.exe -selfSignedCert %countryCode% %stateOrProvince% %organization% %commonName% %password% "%buildSettingsDir%"%certfile%

POPD