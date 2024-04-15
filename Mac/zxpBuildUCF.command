#
# Build a code-signed package folder, which can be compressed into a .ZXP or a .tpkg
#
# Usage: 
#
#   codeSign.command cepPackageFolder pluginInstallerResourcesFolderPath
#
# Optional 'debug' parameter: add .debug file into signed ZXP 
#

export CEP_PACKAGE_FOLDER="$1"
export PLUGIN_INSTALLER_RESOURCES_FOLDER="$2"

if [ "${CEP_PACKAGE_FOLDER}" == "" -o ! -d "{CEP_PACKAGE_FOLDER}" ]; then
    echo "CEP_PACKAGE_FOLDER is not a directory"
    exit
fi

if [ "${PLUGIN_INSTALLER_RESOURCES_FOLDER}" == "" -o ! -d "${PLUGIN_INSTALLER_RESOURCES_FOLDER}" ]; then
    echo "PLUGIN_INSTALLER_RESOURCES_FOLDER is not a directory"
    exit
fi

if [ ! -e "${PLUGIN_INSTALLER_RESOURCES_FOLDER}/UCF.app"]; then

    if [ ! -e "${PLUGIN_INSTALLER_RESOURCES_FOLDER}/UCF.app.zip"]; then
        echo "Cannot find UCF.app.zip"
        exit
    fi

    unzip "${PLUGIN_INSTALLER_RESOURCES_FOLDER}/UCF.app.zip"

fi

if [ ! -e "${PLUGIN_INSTALLER_RESOURCES_FOLDER}/UCF.app/Contents/MacOS/UCF"]; then
    echo "Cannot find UCF executable"
    exit
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

export SPRK_TIMESTAMP_SERVER="http://timestamp.globalsign.com/scripts/timstamp.dll"

export SPRK_DEV_TOOLS_DIR="${PROJECT_ROOT_DIR}devtools/"

if [ ! -e "${BUILD_SETTINGS_DIR}buildSettings.command" ]; then

    echo ""
    echo "This is an unconfigured CEPSparker directory. Nothing to build."
    echo ""

else 

    . "${BUILD_SETTINGS_DIR}certinfo.command"

    if [ ! -f "${BUILD_SETTINGS_DIR}${SPRK_CERTFILE}" ]; then

        echo ""
        echo "Need to provide a certificate file, or create a self-signed one first. See ${SPRK_DEV_TOOLS_DIR}makeSelfSignedCert.command"
        echo ""

    elif [ "$TARGET_DIRNAME" == "" ]; then

        echo ""
        echo "Cannot determine directory name for extension. "
        echo ""

    elif [ "$PROJECT_VERSION" == "" ]; then

        echo ""
        echo "Cannot determine version for extension."
        echo ""

    else

        if [ ! -d "$BUILD_DIR" ]; then
            mkdir "$BUILD_DIR"
        fi

        export EXTENSION_BUILD_DIR="${BUILD_DIR}${TARGET_DIRNAME}/"

        rm -rf "$EXTENSION_BUILD_DIR"
        mkdir "$EXTENSION_BUILD_DIR"

        if [ "$param" == "debug" ]; then
            cp "${PROJECT_ROOT_DIR}debug"         "${EXTENSION_BUILD_DIR}.debug"
        fi

        cp -R "${PROJECT_ROOT_DIR}css"           "${EXTENSION_BUILD_DIR}css"
        cp -R "${PROJECT_ROOT_DIR}CSXS"          "${EXTENSION_BUILD_DIR}CSXS"
        cp -R "${PROJECT_ROOT_DIR}html"          "${EXTENSION_BUILD_DIR}html"
        cp -R "${PROJECT_ROOT_DIR}js"            "${EXTENSION_BUILD_DIR}js"
        cp -R "${PROJECT_ROOT_DIR}jsx"           "${EXTENSION_BUILD_DIR}jsx"
        cp -R "${PROJECT_ROOT_DIR}shared_js_jsx" "${EXTENSION_BUILD_DIR}shared_js_jsx"

        cd "$EXTENSION_BUILD_DIR"

        find . -name ".DS_Store" | while read a; do rm "$a"; done
        find . -name "__MACOSX" | while read a; do rm -rf "$a"; done
        xattr -cr .

        cd "${PROJECT_ROOT_DIR}build"

        if [ "$param" == "debug" ]; then

            java -jar "${SPRK_DEV_TOOLS_DIR}signingtoolkit/ucf.jar" -package -storetype PKCS12 -keystore "${BUILD_SETTINGS_DIR}${SPRK_CERTFILE}" -storepass "$SPRK_PASSWORD" -tsa "$SPRK_TIMESTAMP_SERVER" "$TARGET_DIRNAME.zxp" -C "$EXTENSION_BUILD_DIR" . -e "${EXTENSION_BUILD_DIR}.debug" .debug

            mv "$TARGET_DIRNAME.zxp" "$TARGET_DIRNAME.$PROJECT_VERSION.debug.zxp"

            echo ""
            echo "Signed debug extension has been created: $TARGET_DIRNAME.$PROJECT_VERSION.debug.zxp"
            echo ""
        
        else

            java -jar "${SPRK_DEV_TOOLS_DIR}signingtoolkit/ucf.jar" -package -storetype PKCS12 -keystore "${BUILD_SETTINGS_DIR}${SPRK_CERTFILE}" -storepass "$SPRK_PASSWORD" -tsa "$SPRK_TIMESTAMP_SERVER" "$TARGET_DIRNAME.zxp" -C "$EXTENSION_BUILD_DIR" .

            mv "$TARGET_DIRNAME.zxp" "$TARGET_DIRNAME.$PROJECT_VERSION.zxp"

            echo ""
            echo "Signed extension has been created: $TARGET_DIRNAME.$PROJECT_VERSION.zxp"
            echo ""
            
        fi

        rm -rf "$EXTENSION_BUILD_DIR"
    fi
fi

popd > /dev/null