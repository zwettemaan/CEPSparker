@ECHO OFF
SETLOCAL EnableDelayedExpansion

REM
REM Remove all the CEPSparker templates and generation software
REM so the project becomes stand-alone
REM

SET SPRK_DEV_TOOLS_DIR=%~dp0

PUSHD %SPRK_DEV_TOOLS_DIR%..

SET PROJECT_ROOT_DIR=%cd%\

POPD

PUSHD "%PROJECT_ROOT_DIR%"

SET BUILD_SETTINGS_DIR=%PROJECT_ROOT_DIR%BuildSettings\

REM
REM Don't even try if the project has not been generated
REM

IF NOT EXIST "%BUILD_SETTINGS_DIR%configSettings.bat" (

    ECHO.
    ECHO This is an unconfigured CEPSparker project.
    ECHO Make sure to read the documentation and then run 
    ECHO SparkerConfig as instructed.
    ECHO.
    ECHO Aborting.
    ECHO.

) ELSE (

    ECHO.
    ECHO ***  WARNING WARNING WARNING  ***
    ECHO.
    ECHO This will irrevokably delete all templates files and
    ECHO CEPSparker code generation software, which detaches this
    ECHO project from CEPSparker and the CEPSparker git repo
    ECHO.
    ECHO Type 'YES' at the prompt only if you're really sure you want to do this.

    SET /P REPLY=Delete template files [YES/NO]?: 

    IF "!REPLY!" == "YES" (
        
        RD /s /q .git  
        RD /s /q .gitignore
        RD /q ReadMe.md
        RD /q LICENSE
        RD /q %SPRK_DEV_TOOLS_DIR%cleanGenerate.bat
        RD /q %SPRK_DEV_TOOLS_DIR%cleanGenerate.command
        RD /q %SPRK_DEV_TOOLS_DIR%detachFromCEPSparker.command
        RD /s /q Templates
        RD /q Mac\initialSetupConfigApp.command
        RD /s /q Mac\SparkerConfig.app
        RD /q "Mac\ Do not forget to de-quarantine!.txt"
        RD /q Windows\SparkerConfig.exe
        RD /s /q "Windows\SparkerConfig\ Libs"
        RD /q "Windows\ Run CMD with administrative permissions!.txt"
        
    )
)

POPD

ECHO.
SET /P REPLY=Press [Enter] to finalize 
