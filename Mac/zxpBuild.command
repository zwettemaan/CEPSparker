#
# Build a code-signed ZXP file
#
# This is an alternate method - the preferred method is to package using the 
# PluginInstaller, which can be downloaded from:
#
# https://store.tgrg.net
#
# PluginInstaller will handle creating the certificate, code-signing, and will
# create both a .zxp (old) and .tpkg (new). At the user end, PluginInstaller can handle
# installing the .tpkg file as well.
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

pushd "${PROJECT_ROOT_DIR}" > /dev/null

export SPRK_DEV_TOOLS_DIR="${PROJECT_ROOT_DIR}Developer/"

"${SPRK_COMMANDS_DIR}clean.command"

if [ ! -e "${BUILD_SETTINGS_DIR}buildSettings.command" ]; then

    echo ""
    echo "This is an unconfigured CEPSparker directory. Nothing to build."
    echo ""

elif [ ! -e "${SPRK_DEV_TOOLS_DIR}ZXPSignCmd" ]; then

    echo ""
    echo "Need to download ZXPSignCmd first. See ${SPRK_DEV_TOOLS_DIR}downloadZXPSignCmd.command script"
    echo ""

else 

    . "${BUILD_SETTINGS_DIR}certinfo.command"

    if [ ! -f "${BUILD_SETTINGS_DIR}${SPRK_CERTFILE}" ]; then

        echo ""
        echo "Need to provide a certificate file, or create a self-signed one first. See Developer/makeSelfSignedCert.command"
        echo ""

    elif [ "$TARGET_DIRNAME" == "" ]; then

        echo ""
        echo "Cannot determine directory name for extension."
        echo ""

    elif [ "$PROJECT_VERSION" == "" ]; then

        echo ""
        echo "Cannot determine version for extension."
        echo ""

    else 

        "${SPRK_COMMANDS_DIR}adjustVersionInManifest.command"

        if [ ! -d "$BUILD_DIR" ]; then
            mkdir "$BUILD_DIR"
        fi

        export EXTENSION_BUILD_DIR="${BUILD_DIR}${TARGET_DIRNAME}/"

        rm -rf "$EXTENSION_BUILD_DIR"
        mkdir "$EXTENSION_BUILD_DIR"

        cp -R "${PROJECT_ROOT_DIR}css"           "${EXTENSION_BUILD_DIR}css"

        cp -R "${PROJECT_ROOT_DIR}CSXS"          "${EXTENSION_BUILD_DIR}CSXS"

        cp -R "${PROJECT_ROOT_DIR}CEP_html"      "${EXTENSION_BUILD_DIR}CEP_html"

        cp -R "${PROJECT_ROOT_DIR}node_modules"  "${EXTENSION_BUILD_DIR}node_modules"
        rm -rf "${EXTENSION_BUILD_DIR}node_modules/@types"
        rm -rf "${EXTENSION_BUILD_DIR}node_modules/types-for-adobe"
        rm -rf "${EXTENSION_BUILD_DIR}node_modules/undici-types"
        rm -f "${EXTENSION_BUILD_DIR}node_modules/.package-lock.json"

        cp -R "${PROJECT_ROOT_DIR}jsx"           "${EXTENSION_BUILD_DIR}jsx"
        rm -f "${EXTENSION_BUILD_DIR}jsx/manually*.jsx"

        cp -R "${PROJECT_ROOT_DIR}CEP_js"        "${EXTENSION_BUILD_DIR}CEP_js"

        cp -R "${PROJECT_ROOT_DIR}shared_js"     "${EXTENSION_BUILD_DIR}shared_js"

        cp -R "${PROJECT_ROOT_DIR}shared_js_jsx" "${EXTENSION_BUILD_DIR}shared_js_jsx"

        cd "$EXTENSION_BUILD_DIR"

        find . -name ".DS_Store" | while read a; do rm -f "$a"; done
        find . -name "__MACOSX" | while read a; do rm -rf "$a"; done
        xattr -cr .

        cd "${BUILD_DIR}"

        "${SPRK_DEV_TOOLS_DIR}ZXPSignCmd" -sign "$TARGET_DIRNAME" "$TARGET_DIRNAME.zxp" "${BUILD_SETTINGS_DIR}${SPRK_CERTFILE}" "$SPRK_PASSWORD" -tsa "${TIMESTAMP_SERVER}"

        mv "$TARGET_DIRNAME.zxp" "$TARGET_DIRNAME.$PROJECT_VERSION.zxp"

        rm -rf "$EXTENSION_BUILD_DIR"

        echo ""
        echo "Signed extension has been created: $TARGET_DIRNAME.$PROJECT_VERSION.zxp"
        echo ""
        
    fi

fi  

popd > /dev/null