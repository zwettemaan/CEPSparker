@ECHO OFF

REM A certificate file by this name in devtools/
REM If you have a proper certificate, copy it into devtools and adjust the name
REM for SPRK_CERTFILE below
SET SPRK_CERTFILE=selfSignedCert.p12

REM A password for this certificate file
SET SPRK_PASSWORD=PASSWORD

REM The following are only needed to create a self-signed certificate

SET SPRK_COUNTRY_CODE=US
SET SPRK_STATE_OR_PROVINCE=CA
SET SPRK_ORGANIZATION=My, Myself
SET SPRK_COMMON_NAME=Whatever
