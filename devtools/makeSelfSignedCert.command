
export SPRK_DEV_TOOLS_DIR=`dirname "$0"`/

cd $SPRK_DEV_TOOLS_DIR

export SPRK_DEV_TOOLS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$SPRK_DEV_TOOLS_DIR"`/

export BUILD_SETTINGS_DIR="${PROJECT_ROOT_DIR}BuildSettings/"

if [ ! -f "${BUILD_SETTINGS_DIR}certinfo.command" ]; then
	echo ""
	echo "certinfo.command not found. Make sure to run Mac/SparkerConfig.app first."
	echo ""
	exit
fi

if [ ! -f "${SPRK_DEV_TOOLS_DIR}ZXPSignCmd" ]; then
	echo ""
	echo "ZXPSignCmd not found. Try to run devtools/downloadZXPSignCmd.command"
	echo ""
	exit
fi

cd "$PROJECT_ROOT_DIR"

. "${BUILD_SETTINGS_DIR}certinfo.command"

if [ -f "${BUILD_SETTINGS_DIR}${SPRK_CERTFILE}" ]; then
	echo ""
	echo "Certificate file already exists."
	echo ""
	exit
fi

echo ""
echo "Using the certificate information from BuildSettings/certinfo.command."
echo "Edit BuildSettings/certinfo.command before running this script if necessary."
echo ""

export cmd="\"${SPRK_DEV_TOOLS_DIR}ZXPSignCmd\" -selfSignedCert \"$SPRK_COUNTRY_CODE\" \"$SPRK_STATE_OR_PROVINCE\" \"$SPRK_ORGANIZATION\" \"$SPRK_COMMON_NAME\" \"$SPRK_PASSWORD\" \"${BUILD_SETTINGS_DIR}${SPRK_CERTFILE}\""
eval $cmd

echo ""
echo "${BUILD_SETTINGS_DIR}$SPRK_CERTFILE has been generated."
echo ""
