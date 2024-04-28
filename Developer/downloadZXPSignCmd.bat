@Echo OFF

REM
REM This is an alternate method - the preferred method is to package using the 
REM PluginInstaller, which can be downloaded from:
REM
REM https://tgrg.net
REM
REM PluginInstaller will handle creating the certificate, code-signing, and will
REM create both a .zxp (old) and .tpkg (new). At the user end, PluginInstaller can handle
REM installing the .tpkg file as well.
REM

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