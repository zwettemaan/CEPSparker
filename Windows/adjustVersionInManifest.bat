@ECHO OFF
REM
REM Read BuildSettings/ExtensionVersion.txt and adjust the manifest
REM

SET scriptDir=%~dp0
PUSHD %scriptDir%..
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

IF EXIST BuildSettings\ExtensionVersion.txt (
    SET /p EXTENSION_VERSION=< BuildSettings\ExtensionVersion.txt
    IF NOT "%%EXTENSION_VERSION%%" == "" (
    
        POWERSHELL -Command "(gc CSXS\manifest.xml) -replace '(<Extension +Id=\"".*?\"" +Version=\"")([0-9\.]*)(\"")', '${1}%EXTENSION_VERSION%${3}' | Out-File CSXS\manifest.xml.new"

        IF EXIST CSXS\manifest.xml.new (
            DEL CSXS\manifest.xml
            MOVE CSXS\manifest.xml.new CSXS\manifest.xml
        )
    )
)

POPD