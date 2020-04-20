@ECHO OFF
REM Usage
REM 
REM   zxpBuildUCF
REM 
REM or 
REM 
REM   zxpBuildUCF debug
REM
REM Optional 'debug' parameter: add .debug file into signed ZXP 
REM

SETLOCAL EnableDelayedExpansion

REM
REM Setup the panel so we can run it in a live debug session 
REM

SET timestampServer=http://timestamp.globalsign.com/scripts/timstamp.dll

SET scriptDir=%~dp0
PUSHD "%scriptDir%.."
SET projectHomeDir=%cd%\
CD devtools
SET devtoolsDir=%cd%\
cd ..\BuildSettings
SET buildSettingsDir=%cd%\

POPD

PUSHD "%projectHomeDir%"

REM Check whether we have administrative permissions

NET SESSION >NUL 2>&1

IF NOT %errorLevel% == 0 (
    ECHO.
    ECHO Error: this script must be run from a command line shell
    ECHO with administrative privileges. Aborting.
    ECHO.
    POPD
    EXIT /B
) 

IF NOT EXIST BuildSettings\ExtensionDirName.txt (
    ECHO.
    ECHO Error: This CEPSparker folder has not been initialized. Make
    ECHO sure to run the SparkerConfig.exe command first. Aborting.
    ECHO.
    POPD
    EXIT /B
) 

CALL "%scriptDir%clean.bat"

SET /P TARGET_DIRNAME=< BuildSettings\ExtensionDirName.txt

IF "%TARGET_DIRNAME%" == "" (
    ECHO.
    ECHO Error: Cannot determine the directory name for this
    ECHO extension. Aborting.
    ECHO.
    POPD
    EXIT /B
)

SET /P PROJECT_VERSION=< BuildSettings\ExtensionVersion.txt

IF "%PROJECT_VERSION%" == "" (
    ECHO.
    ECHO Error: Cannot determine the version for this
    ECHO extension. Aborting.
    ECHO.
    POPD
    EXIT /B
)

IF NOT EXIST "%buildSettingsDir%certinfo.bat" (
    ECHO.
    ECHO Error: certinfo.bat not found. 
    ECHO Probably this CEPSparker folder has not been initialized. Make
    ECHO sure to run the Windows\SparkerConfig.exe command first.
    ECHO Aborting.
    ECHO.
    POPD
    EXIT /B
)

IF NOT EXIST "%devToolsDir%ZXPSignCmd.exe" (
    ECHO.
    ECHO Error: ZXPSignCmd.exe not found. 
    ECHO Use the devtools\downloadZXPSignCmd.bat script to download it. 
    ECHO Aborting.
    ECHO.
    POPD
    EXIT /B
)

CALL "%buildSettingsDir%certinfo.bat"

IF NOT EXIST "%buildSettingsDir%\%certfile%" (

    ECHO Error: certificate file
    ECHO   %buildSettingsDir%\%certfile%
    ECHO not found.
    ECHO Need to provide a certificate file, or create a self-signed one first. See devtools\makeSelfSignedCert.bat
    ECHO Aborting.
    POPD
    EXIT /B
)

SET buildDir=%projectHomeDir%build\

IF NOT EXIST "%buildDir%" (
    MKDIR "%buildDir%"
)

SET EXTENSION_HOMEDIR=%buildDir%%TARGET_DIRNAME%\

CALL "%scriptDir%clearPlayerDebugMode.bat"
CALL "%scriptDir%adjustVersionInManifest.bat"

RD /s /q "%EXTENSION_HOMEDIR%" >NUL 2>&1

MKDIR "%EXTENSION_HOMEDIR%"

XCOPY "%projectHomeDir%css" "%EXTENSION_HOMEDIR%css\" /y /s /e >NUL 2>&1
XCOPY "%projectHomeDir%CSXS" "%EXTENSION_HOMEDIR%CSXS\" /y /s /e >NUL 2>&1
XCOPY "%projectHomeDir%html" "%EXTENSION_HOMEDIR%html\" /y /s /e >NUL 2>&1
XCOPY "%projectHomeDir%js" "%EXTENSION_HOMEDIR%js\" /y /s /e >NUL 2>&1
XCOPY "%projectHomeDir%jsx" "%EXTENSION_HOMEDIR%jsx\" /y /s /e >NUL 2>&1
XCOPY "%projectHomeDir%shared_js_jsx" "%EXTENSION_HOMEDIR%shared_js_jsx\" /y /s /e >NUL 2>&1
IF "%1" == "debug" (
    COPY "%projectHomeDir%debug" "%EXTENSION_HOMEDIR%.debug_precursor" >NUL 2>&1
)

REM UCF.JAR cannot handle spaces in file path. Convert them to 8.3 file paths

CALL "%scriptDir%shortPath.bat" "%devtoolsDir%signingtoolkit\ucf.jar"
SET SH83_UCFJAR=%SHORTPATH%

CALL "%scriptDir%shortPath.bat" "%buildSettingsDir%%certfile%"
SET SH83_CERTFILE=%SHORTPATH%

CALL "%scriptDir%shortPath.bat" "%buildDir%"
SET SH83_EXTENSION_BUILDIR=%SHORTPATH%

CD "%SH83_EXTENSION_BUILDIR%"

SET /p PROJECT_VERSION=< ..\BuildSettings\ExtensionVersion.txt

IF "%1" == "debug" (
    java -jar "%SH83_UCFJAR%" -package -storetype PKCS12 -keystore "%SH83_CERTFILE%" -storepass "%password%" -tsa "%timestampServer%" "%TARGET_DIRNAME%.zxp" -C "%TARGET_DIRNAME%" . -e "%TARGET_DIRNAME%\.debug_precursor" .debug
    REN "%TARGET_DIRNAME%.zxp" "%TARGET_DIRNAME%.%PROJECT_VERSION%.debug.zxp"
) ELSE (
    java -jar "%SH83_UCFJAR%" -package -storetype PKCS12 -keystore "%SH83_CERTFILE%" -storepass "%password%" -tsa "%timestampServer%" "%TARGET_DIRNAME%.zxp" -C "%TARGET_DIRNAME%" . 
    REN "%TARGET_DIRNAME%.zxp" "%TARGET_DIRNAME%.%PROJECT_VERSION%.zxp"
)

RD /s /q "%EXTENSION_HOMEDIR%" >NUL 2>&1

POPD
