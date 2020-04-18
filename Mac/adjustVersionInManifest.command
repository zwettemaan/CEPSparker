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

if [ "$EXTENSION_VERSION" != "" ]; then

	#
	# Update extension version number in manifest
	#
	sed -E "s/(<Extension +Id=\"[^\"]*\" +Version=\")([0-9\.]*)(\")/\1$EXTENSION_VERSION\3/" < CSXS/manifest.xml > CSXS/manifest.xml.new

	mv CSXS/manifest.xml.new CSXS/manifest.xml

fi

popd > /dev/null