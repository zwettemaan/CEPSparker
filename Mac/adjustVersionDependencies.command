#
# Read CRDT_manifest.json and adjust the CEP manifest
#

if [ "${SPRK_COMMANDS_DIR}" == "" -o ! -d "${SPRK_COMMANDS_DIR}" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "${SPRK_COMMANDS_DIR}" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "${SPRK_COMMANDS_DIR}"`/

if [ ! -e "${PROJECT_ROOT_DIR}/BuildSettings/configSettings.command" ]; then
    exit
fi

. setTarget.command

cd "${PROJECT_ROOT_DIR}"

if [ "${CRDT_VERSION}" != "" ]; then

    #
    # Update extension version number in manifest
    #
    sed -E "s/(<Extension +Id=\"[^\"]*\" +Version=\")([0-9\.]*)(\")/\1${CRDT_VERSION}\3/" < CSXS/manifest.xml | sed -E "s/(ExtensionBundleVersion=\")([0-9\.]*)(\")/\1${CRDT_VERSION}\3/" > CSXS/manifest.xml.new

    mv CSXS/manifest.xml.new CSXS/manifest.xml

    cat > "${PROJECT_ROOT_DIR}/shared_js_jsx/version.js" << EOF
${SHORTCODE}.C.VERSION = "${CRDT_VERSION}";    
EOF

    echo ""
    echo "Version dependencies updated"
    echo ""

fi

popd > /dev/null