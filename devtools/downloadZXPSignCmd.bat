@Echo OFF
SetLocal EnableDelayedExpansion

SET version=4.0.7
SET URLMac=https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/%version%/osx10/ZXPSignCmd.dmg
SET URLWin=https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/%version%/win64/ZXPSignCmd.exe

SET SPRK_DEV_TOOLS_DIR=%~dp0
PUSHD "%SPRK_DEV_TOOLS_DIR%"

powershell.exe -Command [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (new-object System.Net.WebClient).DownloadFile("""%URLMac%""",'ZXPSignCmd.dmg')
powershell.exe -Command [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (new-object System.Net.WebClient).DownloadFile("""%URLWin%""",'ZXPSignCmd.exe')

POPD