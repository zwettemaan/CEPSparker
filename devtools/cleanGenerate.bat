@ECHO OFF
REM
REM Undo the generation step. This will remove all your hard work.
REM Do not run this unless you're absolutely sure
REM

SET devToolsDir=%~dp0
PUSHD %devToolsDir%..
SET projectHomeDir=%cd%\
POPD

PUSHD "%projectHomeDir%"

ECHO "*******************************************"
ECHO "***WARNING WARNING WARNING***"
ECHO "This will irrevokably delete all generated files."
ECHO "*******************************************"
ECHO ""
ECHO "Type 'YES' at the prompt only if you're really sure"
ECHO "you want to do this."

SET /P REPLY=Delete generated files [YES/NO]?: 

if "%reply%" == "YES" (
  
  CALL Windows\clean.bat

  RD /s /q %devToolsDir%/ZXPSignCmd* >NUL 2>&1
  RD /s /q %devToolsDir%/signingtoolkit >NUL 2>&1
  RD /s /q BuildSettings >NUL 2>&1
  RD /s /q debug >NUL 2>&1
  RD /s /q css >NUL 2>&1
  RD /s /q CSXS >NUL 2>&1
  RD /s /q html >NUL 2>&1
  RD /s /q js >NUL 2>&1
  RD /s /q jsx >NUL 2>&1
  RD /s /q LocalLinks >NUL 2>&1
  RD /s /q SampleImageServer >NUL 2>&1
  RD /s /q shared_js_jsx >NUL 2>&1
  
)

POPD