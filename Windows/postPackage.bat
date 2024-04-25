@ECHO OFF
REM
REM Called by PluginManager by way of CRDT_manifest.json. 
REM

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

SET SOURCE_PACKAGE_FOLDER=%~s1
SET TARGET_PACKAGE_FOLDER=%~s2
SET FILE_PATH_PLUGIN_INSTALLER_RESOURCES=%~s3
SET FILE_PATH_CODE_SIGN_CERTIFICATE=%~s4
SET CODE_SIGN_CERTIFICATE_PASSWORD=%5
SET URL_TIME_STAMP_SERVER=%6
SET INJECT_DEBUG_FILE=%7

SET PACKAGE_NAME=%~nx2
PUSHD %TARGET_PACKAGE_FOLDER%\..
SET PACKAGE_PARENT_DIR=%cd%\
POPD
SET UCF_TEMP_DIR=%TEMP%\CRDT_Temp_UCF\
SET JRE=windows_x86_64_jre.zip

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

IF "%PROCESSOR_ARCHITECTURE%" == "ARM64" GOTO UNSUPPORTED_ARM

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"
CALL "%SPRK_COMMANDS_DIR%adjustVersionInManifest.bat" NESTED
CALL "%PROJECT_ROOT_DIR%BuildSettings\buildSettings.bat"

POWERSHELL -command "Expand-Archive -Force '%FILE_PATH_PLUGIN_INSTALLER_RESOURCES%\%JRE%' '%UCF_TEMP_DIR%'"

SET JAVA_HOME=%UCF_TEMP_DIR%jre

CD "%PACKAGE_PARENT_DIR%"

REM JSON files get rewritten by ucf.jar as they get included into the ZXP - move the CRDT_manifest.json away
REM so it is not included into the code-signing.
REM We will restore it beside the ZXP file

MOVE %PACKAGE_NAME%\CRDT_manifest.json "%UCF_TEMP_DIR%" > NUL 2>&1

IF "%INJECT_DEBUG_FILE%" == "1" (
    IF EXIST %SOURCE_PACKAGE_FOLDER%\debug (
        %JAVA_HOME%\bin\java -jar %FILE_PATH_PLUGIN_INSTALLER_RESOURCES%\ucf.jar -package -storetype PKCS12 -keystore %FILE_PATH_CODE_SIGN_CERTIFICATE% -storepass "%CODE_SIGN_CERTIFICATE_PASSWORD%" -tsa "%URL_TIME_STAMP_SERVER%" "%PACKAGE_NAME%.zxp" -C %TARGET_PACKAGE_FOLDER% . -e %SOURCE_PACKAGE_FOLDER%\debug .debug
        GOTO ZXPDONE
    )
)

%JAVA_HOME%\bin\java -jar %FILE_PATH_PLUGIN_INSTALLER_RESOURCES%\ucf.jar -package -storetype PKCS12 -keystore %FILE_PATH_CODE_SIGN_CERTIFICATE% -storepass "%CODE_SIGN_CERTIFICATE_PASSWORD%" -tsa "%URL_TIME_STAMP_SERVER%" "%PACKAGE_NAME%.zxp" -C %TARGET_PACKAGE_FOLDER% .

:ZXPDONE

MOVE %PACKAGE_NAME% %PACKAGE_NAME%.precursor > NUL 2>&1

MD %PACKAGE_NAME%

MOVE %PACKAGE_NAME%.zxp %PACKAGE_NAME% > NUL 2>&1

MOVE "%UCF_TEMP_DIR%CRDT_manifest.json" %PACKAGE_NAME% > NUL 2>&1

RD /s /q %PACKAGE_NAME%.precursor > NUL 2>&1
RD /s /q "%UCF_TEMP_DIR%" > NUL 2>&1

IF NOT EXIST %SOURCE_PACKAGE_FOLDER%\build\ MD %SOURCE_PACKAGE_FOLDER%\build

COPY %PACKAGE_NAME%\%PACKAGE_NAME%.zxp %SOURCE_PACKAGE_FOLDER%\build > NUL 2>&1

GOTO DONE

:UNSUPPORTED_ARM
ECHO Windows on ARM is currently unsupported
GOTO DONE


:DONE