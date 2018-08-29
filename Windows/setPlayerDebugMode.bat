@ECHO OFF
REM
REM Enable debugging
REM

REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v LogLevel /t REG_SZ /d 5 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v LogLevel /t REG_SZ /d 5 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v LogLevel /t REG_SZ /d 5 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v LogLevel /t REG_SZ /d 5 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v PlayerDebugMode /t REG_SZ /d 1 /f > NUL
REG add HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v LogLevel /t REG_SZ /d 5 /f > NUL
