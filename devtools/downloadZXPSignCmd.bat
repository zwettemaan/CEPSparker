@Echo OFF
SetLocal EnableDelayedExpansion

SET version=4.1.1
SET OSXDir=osx10.15
SET WinDir=win64
SET OSXFile=ZXPSignCmd-64bit
SET WinExeFile=ZXPSignCmd.exe

SET URLMac=https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/%version%/%OSXDir%/%OSXFile%.dmg
SET URLWin=https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/%version%/%WinDir%/%WinExeFile%

SET SPRK_DEV_TOOLS_DIR=%~dp0
PUSHD "%SPRK_DEV_TOOLS_DIR%"

powershell.exe -Command [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (new-object System.Net.WebClient).DownloadFile("""%URLMac%""","""%OSXFile%.dmg""")
powershell.exe -Command [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (new-object System.Net.WebClient).DownloadFile("""%URLWin%""","""%WinExeFile%""")

POPD