REM
REM Read BuildSettings/ExtensionVersion.txt and adjust the manifest
REM

set scriptDir=%~dp0
pushd %scriptDir%..
set projectHomeDir=%cd%
popd

pushd %projectHomeDir%

if exist "%projectHomeDir%\BuildSettings\ExtensionVersion.txt" (
	set /p EXTENSION_VERSION=< BuildSettings\ExtensionVersion.txt
	if not "%%EXTENSION_VERSION%%" == "" (
	
		powershell -Command "(gc CSXS\manifest.xml) -replace '(<Extension +Id=\"".*?\"" +Version=\"")([0-9\.]*)(\"")', '${1}%EXTENSION_VERSION%${3}' | Out-File CSXS\manifest.xml.new"

		if exist CSXS\manifest.xml.new (
			del CSXS\manifest.xml
			move CSXS\manifest.xml.new CSXS\manifest.xml
		)
	)
)

popd