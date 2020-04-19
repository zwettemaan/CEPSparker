@ECHO OFF
REM
REM Read BuildSettings/ExtensionVersion.txt and adjust the manifest
REM

SET scriptDir=%~dp0
PUSHD "%scriptDir%.."
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

IF NOT EXIST BuildSettings\ExtensionVersion.txt (
	ECHO.
    ECHO Error: This CEPSparker folder has not been initialized. Make
    ECHO sure to run the SparkerConfig.exe command first. Aborting.
	ECHO.
    POPD
    EXIT /B
)

SET /p EXTENSION_VERSION=< BuildSettings\ExtensionVersion.txt

IF "%EXTENSION_VERSION%" == "" (
	ECHO.
    ECHO Error: Cannot determine extension version number. Aborting.
	ECHO.
    POPD
    EXIT /B
)
    
POWERSHELL -Command "(gc CSXS\manifest.xml) -replace '(<Extension +Id=\"".*?\"" +Version=\"")([0-9\.]*)(\"")', '${1}%EXTENSION_VERSION%${3}' | Out-File CSXS\manifest.xml.new -encoding Utf8"

IF EXIST CSXS\manifest.xml.new (
    DEL CSXS\manifest.xml
    MOVE CSXS\manifest.xml.new CSXS\manifest.xml >NUL
)

POPD