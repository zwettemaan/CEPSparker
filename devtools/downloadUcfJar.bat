@Echo OFF
SetLocal EnableDelayedExpansion

SET URL=http://download.macromedia.com/pub/developer/creativesuite/extension-builder/signingtoolkit.zip

SET devToolsDir=%~dp0
PUSHD "%devToolsDir%"

DEL /S/Q signingtoolkit
MKDIR signingtoolkit

powershell.exe -Command [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (new-object System.Net.WebClient).DownloadFile("""%URL%""",'signingtoolkit.zip')
powershell.exe -Command Expand-Archive signingtoolkit.zip -DestinationPath signingtoolkit

DEL signingtoolkit.zip

POPD