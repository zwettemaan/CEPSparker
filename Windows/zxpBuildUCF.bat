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

IF "%SPRK_COMMANDS_DIR%" == "" (
    SET SPRK_COMMANDS_DIR=%~dp0
)

PUSHD "%SPRK_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
CD devtools
SET SPRK_DEV_TOOLS_DIR=%cd%\
POPD

CALL "%SPRK_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%"

REM Check whether we have administrative permissions

NET SESSION >NUL 2>&1

IF NOT %errorLevel% == 0 (

    ECHO.
    ECHO Error: this script must be run from a command line shell
    ECHO with administrative privileges. Aborting.
    ECHO.

) ELSE (

    CALL "%SPRK_COMMANDS_DIR%clean.bat" NESTED

    IF NOT EXIST "%BUILD_SETTINGS_DIR%certinfo.bat" (
        ECHO.
        ECHO Error: certinfo.bat not found. 
        ECHO Probably this CEPSparker folder has not been initialized. Make
        ECHO sure to run the Windows\SparkerConfig.exe command first.
        ECHO Aborting.
        ECHO.
    ) ELSE IF NOT EXIST "%SPRK_DEV_TOOLS_DIR%signingtoolkit\ucf.jar" (
        ECHO.
        ECHO Error: ucf.jar not found. 
        ECHO Use the devtools\downloadUcfJar.bat script to download it. 
        ECHO Aborting.
        ECHO.
    ) ELSE (

        CALL "%BUILD_SETTINGS_DIR%certinfo.bat"

        IF NOT EXIST "%BUILD_SETTINGS_DIR%%SPRK_CERTFILE%" (

            ECHO Error: certificate file
            ECHO   %BUILD_SETTINGS_DIR%%SPRK_CERTFILE%
            ECHO not found.
            ECHO Need to provide a certificate file, or create a self-signed one first. See devtools\makeSelfSignedCert.bat
            ECHO Aborting.
        ) ELSE (

            IF NOT EXIST "%BUILD_DIR%" (
                MKDIR "%BUILD_DIR%"
            )

            CALL "%SPRK_COMMANDS_DIR%adjustVersionInManifest.bat" NESTED

            SET EXTENSION_BUILD_DIR=%BUILD_DIR%%TARGET_DIRNAME%

            RD /s /q "%EXTENSION_BUILD_DIR%" >NUL 2>&1

            MKDIR "%EXTENSION_BUILD_DIR%"

            XCOPY "%PROJECT_ROOT_DIR%css"           "%EXTENSION_BUILD_DIR%\css\" /y /s /e >NUL 2>&1
            XCOPY "%PROJECT_ROOT_DIR%CSXS"          "%EXTENSION_BUILD_DIR%\CSXS\" /y /s /e >NUL 2>&1
            XCOPY "%PROJECT_ROOT_DIR%CEP_html"      "%EXTENSION_BUILD_DIR%\CEP_html\" /y /s /e >NUL 2>&1
            XCOPY "%PROJECT_ROOT_DIR%node_modules"  "%EXTENSION_BUILD_DIR%\node_modules\" /y /s /e >NUL 2>&1
            XCOPY "%PROJECT_ROOT_DIR%jsx"           "%EXTENSION_BUILD_DIR%\jsx\" /y /s /e >NUL 2>&1
            DEL "%EXTENSION_BUILD_DIR%\jsx\manually*.jsx" >NUL 2>&1
            XCOPY "%PROJECT_ROOT_DIR%CEP_js"        "%EXTENSION_BUILD_DIR%\CEP_js\" /y /s /e >NUL 2>&1
            XCOPY "%PROJECT_ROOT_DIR%shared_js"     "%EXTENSION_BUILD_DIR%\shared_js\" /y /s /e >NUL 2>&1
            XCOPY "%PROJECT_ROOT_DIR%shared_js_jsx" "%EXTENSION_BUILD_DIR%\shared_js_jsx\" /y /s /e >NUL 2>&1
            
            IF "%1" == "debug" (
                COPY "%PROJECT_ROOT_DIR%debug" "%EXTENSION_BUILD_DIR%.debug_precursor" >NUL 2>&1
            )

            REM UCF.JAR cannot handle spaces in file path. Convert them to 8.3 file paths

            CALL "%SPRK_COMMANDS_DIR%shortPath.bat" "%SPRK_DEV_TOOLS_DIR%signingtoolkit\ucf.jar"
            SET SH83_UCFJAR=%SHORTPATH%

            CALL "%SPRK_COMMANDS_DIR%shortPath.bat" "%BUILD_SETTINGS_DIR%%SPRK_CERTFILE%"
            SET SH83_CERTFILE=%SHORTPATH%

            CALL "%SPRK_COMMANDS_DIR%shortPath.bat" "%BUILD_DIR%"
            SET SH83_EXTENSION_BUILDIR=%SHORTPATH%

            CD "%SH83_EXTENSION_BUILDIR%"

            IF "%1" == "debug" (
                java -jar "%SH83_UCFJAR%" -package -storetype PKCS12 -keystore "%SH83_CERTFILE%" -storepass "%SPRK_PASSWORD%" -tsa "%timestampServer%" "%TARGET_DIRNAME%.zxp" -C "%TARGET_DIRNAME%" . -e "%TARGET_DIRNAME%\.debug_precursor" .debug
                REN "%TARGET_DIRNAME%.zxp" "%TARGET_DIRNAME%.%PROJECT_VERSION%.debug.zxp"
            ) ELSE (
                java -jar "%SH83_UCFJAR%" -package -storetype PKCS12 -keystore "%SH83_CERTFILE%" -storepass "%SPRK_PASSWORD%" -tsa "%timestampServer%" "%TARGET_DIRNAME%.zxp" -C "%TARGET_DIRNAME%" . 
                REN "%TARGET_DIRNAME%.zxp" "%TARGET_DIRNAME%.%PROJECT_VERSION%.zxp"
            )

            RD /s /q "%EXTENSION_BUILD_DIR%" >NUL 2>&1

        )
    )
)

POPD

SET /P REPLY=Press [Enter] to finalize
