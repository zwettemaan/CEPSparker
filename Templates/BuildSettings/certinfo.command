# A certificate file by this name in devtools/
# If you have a proper certificate, copy it into devtools and adjust the name
# for SPRK_CERTFILE below
export SPRK_CERTFILE="selfSignedCert.p12"

# A password for this certificate file
export SPRK_PASSWORD="PASSWORD"

# The following are only needed to create a self-signed certificate

export SPRK_COUNTRY_CODE="US"
export SPRK_STATE_OR_PROVINCE="CA"
export SPRK_ORGANIZATION="My, Myself"
export SPRK_COMMON_NAME="Whatever"
