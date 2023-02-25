@ECHO OFF
SETLOCAL EnableDelayedExpansion

REM
REM Undo the generation step. This will remove all your hard work.
REM Do not run this unless you're absolutely sure
REM

SET SPRK_DEV_TOOLS_DIR=%~dp0

PUSHD %SPRK_DEV_TOOLS_DIR%..

SET PROJECT_ROOT_DIR=%cd%\

POPD

PUSHD "%PROJECT_ROOT_DIR%"

SET BUILD_SETTINGS_DIR=%PROJECT_ROOT_DIR%BuildSettings\

IF NOT EXIST "%BUILD_SETTINGS_DIR%configSettings.bat" (

    ECHO.
    ECHO This project has not been configured. Aborting.
    ECHO.

) ELSE (

    ECHO.
    ECHO ***  WARNING WARNING WARNING  ***
    ECHO.
    ECHO This will irrevokably delete all generated files.
    ECHO.
    ECHO Type 'YES' at the prompt only if you're really sure
    ECHO you want to do this.

    SET /P REPLY=Delete generated files [YES/NO]?: 

    IF "!REPLY!" == "YES" (
        
        CALL Windows\clean.bat NESTED

        RD /s /q %SPRK_DEV_TOOLS_DIR%ZXPSignCmd* >NUL 2>&1
        RD /s /q %SPRK_DEV_TOOLS_DIR%signingtoolkit >NUL 2>&1
        RD /s /q BuildSettings >NUL 2>&1
        RD /s /q debug >NUL 2>&1
        RD /s /q css >NUL 2>&1
        RD /s /q CSXS >NUL 2>&1
        RD /s /q CEP_html >NUL 2>&1
        RD /s /q browser_html >NUL 2>&1
        RD /s /q node_modules >NUL 2>&1
        RD /s /q LocalLinks >NUL 2>&1
        RD /s /q VSCode >NUL 2>&1
        RD /s /q SampleImageServer >NUL 2>&1
        RD /s /q jsx >NUL 2>&1
        RD /s /q CEP_js >NUL 2>&1
        RD /s /q browser_js >NUL 2>&1
        RD /s /q node_js >NUL 2>&1
        RD /s /q shared_js >NUL 2>&1
        RD /s /q shared_js_jsx >NUL 2>&1
        
        ECHO.
        ECHO This project has been reset to an unconfigured, blank state.
        ECHO.

    )
)

POPD

ECHO.
SET /P REPLY=Press [Enter] to finalize 
