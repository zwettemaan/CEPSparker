#
# Build a code-signed ZXP file
#
# Usage: 
#
#   zxpBuildUCF.command
#
# or
#
#   zxpBuildUCF.command debug
#
# Optional 'debug' parameter: add .debug file into signed ZXP 
#

export param="$1"

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

# 
# Need some older java runtime, e.g. 1.7.0_80 installed!
#
# At some point in time (Java 9?) things don't work any more with certificate issues
#
# https://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html
#

export JAVA_HOME=$(/usr/libexec/java_home -v 1.7.0_80)
export JAVA_VERSION=`java -version 2>&1 | head -n 1 | sed -E -e "s/^[^\"]*\"|\"$//g"`

if [ "$JAVA_VERSION" != "1.7.0_80" ]; then

    echo ""
    echo "Need version 1.7.0_80 of Java runtime installed"
    echo "Visit https://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html"
    echo ""

else

    export SPRK_TIMESTAMP_SERVER="http://timestamp.globalsign.com/scripts/timstamp.dll"

    export SPRK_DEV_TOOLS_DIR="${PROJECT_ROOT_DIR}devtools/"

    "${SPRK_COMMANDS_DIR}clean.command"

    if [ ! -e "${BUILD_SETTINGS_DIR}buildSettings.command" ]; then

        echo ""
        echo "This is an unconfigured CEPSparker directory. Nothing to build."
        echo ""

    elif [ ! -f "${SPRK_DEV_TOOLS_DIR}signingtoolkit/ucf.jar" ]; then

        echo ""
        echo "Need to download ucf.jar first. See ${SPRK_DEV_TOOLS_DIR}downloadUcfJar.command script"
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

            "${SPRK_COMMANDS_DIR}adjustVersionInManifest.command"

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
fi

popd > /dev/null