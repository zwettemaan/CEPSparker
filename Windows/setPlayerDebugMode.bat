rem
rem Enable debugging
rem

set scriptDir=%~dp0
pushd %scriptDir%..
set projectHomeDir=%cd%
popd

pushd %projectHomeDir%

if exist "%projectHomeDir%\BuildSettings\CEPVersion.txt" (

    set /p CEP_VERSION=< BuildSettings\CEPVersion.txt

    if not "%CEP_VERSION%" == "" (
    
        set recognized="NO"

        if "%CEP_VERSION%" == "4.2" (
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v PlayerDebugMode /t REG_SZ /d 1 /f
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v LogLevel /t REG_SZ /d 5 /f
            set recognized="YES"
        )
        if "%CEP_VERSION%" == "5.2" (
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v PlayerDebugMode /t REG_SZ /d 1 /f
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v LogLevel /t REG_SZ /d 5 /f
            set recognized="YES"
        )
        if "%CEP_VERSION%" == "6.1" (
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v PlayerDebugMode /t REG_SZ /d 1 /f
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v LogLevel /t REG_SZ /d 5 /f
            set recognized="YES"
        )
        if "%CEP_VERSION%" == "7.0" (
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v PlayerDebugMode /t REG_SZ /d 1 /f
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v LogLevel /t REG_SZ /d 5 /f
            set recognized="YES"
        )
        if "%CEP_VERSION%" == "8.0" (
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v PlayerDebugMode /t REG_SZ /d 1 /f
            reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v LogLevel /t REG_SZ /d 5 /f
            set recognized="YES"
        )
        if "%recognized%" == "NO" (
            echo "Unexpected CEP_VERSION"
        )
    )
)

popd