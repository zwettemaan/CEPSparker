@Echo OFF
SetLocal EnableDelayedExpansion

SET URL=http://download.macromedia.com/pub/developer/creativesuite/extension-builder/signingtoolkit.zip

SET devToolsDir=%~dp0
PUSHD "%devToolsDir%"

RMDIR signingtoolkit /s /q > nul 2>&1
MKDIR signingtoolkit

powershell.exe -Command [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (new-object System.Net.WebClient).DownloadFile("""%URL%""",'signingtoolkit.zip')
powershell.exe -Command Expand-Archive signingtoolkit.zip -DestinationPath signingtoolkit

DEL signingtoolkit.zip

POPD