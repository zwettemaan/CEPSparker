@ECHO OFF

REM A certificate file by this name in devtools/
REM If you have a proper certificate, copy it into devtools and adjust the name
REM for $$SHORTCODE$$_CERTFILE below

SET $$SHORTCODE$$_CERTFILE=$$CERTIFICATE_FILENAME$$

REM A password for this certificate file
SET $$SHORTCODE$$_PASSWORD=$$CERTIFICATE_PASSWORD$$

REM The following are only needed to create a self-signed certificate

SET $$SHORTCODE$$_COUNTRY_CODE=$$CERTIFICATE_COUNTRY_CODE$$
SET $$SHORTCODE$$_STATE_OR_PROVINCE=
SET $$SHORTCODE$$_ORGANIZATION=
SET $$SHORTCODE$$_COMMON_NAME=$$CERTIFICATE_COMMON_NAME$$
