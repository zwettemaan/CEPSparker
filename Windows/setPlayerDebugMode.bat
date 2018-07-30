@ECHO OFF
REM
REM Enable debugging
REM

SET scriptDir=%~dp0
PUSHD %scriptDir%..
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

IF EXIST BuildSettings\CEPVersion.txt (

    SET /p CEP_VERSION=< BuildSettings\CEPVersion.txt

    IF NOT "%CEP_VERSION%" == "" (
    
        SET recognized="NO"
        
        IF "%CEP_VERSION%" == "4.2" (
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v LogLevel /t REG_SZ /d 5 /f > NUL
            SET recognized="YES"
        )
        IF "%CEP_VERSION%" == "5.2" (
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v LogLevel /t REG_SZ /d 5 /f > NUL
            SET recognized="YES"
        )
        IF "%CEP_VERSION%" == "6.1" (
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v LogLevel /t REG_SZ /d 5 /f > NUL
            SET recognized="YES"
        )
        IF "%CEP_VERSION%" == "7.0" (
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v LogLevel /t REG_SZ /d 5 /f > NUL
            SET recognized="YES"
        )
        IF "%CEP_VERSION%" == "8.0" (
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
            REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v LogLevel /t REG_SZ /d 5 /f > NUL
            SET recognized="YES"
        )

        IF "%recognized%" == "NO" (
            ECHO "Unexpected CEP_VERSION"
        )
    )
)

POPD