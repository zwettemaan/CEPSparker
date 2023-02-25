#
# Read BuildSettings/buildSettings.command and adjust the manifest
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

cd "$PROJECT_ROOT_DIR"

if [ "$PROJECT_VERSION" != "" ]; then

    #
    # Update extension version number in manifest
    #
    sed -E "s/(<Extension +Id=\"[^\"]*\" +Version=\")([0-9\.]*)(\")/\1$PROJECT_VERSION\3/" < CSXS/manifest.xml | sed -E "s/(ExtensionBundleVersion=\")([0-9\.]*)(\")/\1$PROJECT_VERSION\3/" > CSXS/manifest.xml.new

    mv CSXS/manifest.xml.new CSXS/manifest.xml

    echo ""
    echo "Extension version in manifest.xml has been updated."
    echo ""

fi

popd > /dev/null