@ECHO OFF

REM A certificate file by this name in devtools/
REM If you have a proper certificate, copy it into devtools and adjust the name
REM for certfile below
SET certfile="selfSignedCert.p12"

REM A password for this certificate file
SET password="PASSWORD"

REM The following are only needed to create a self-signed certificate

SET countryCode="US"
SET stateOrProvince="CA"
SET organization="My, Myself"
SET commonName="Whatever"
