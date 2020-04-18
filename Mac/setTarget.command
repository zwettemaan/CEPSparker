#
# Extract meta-info from BuildSettings folder and define a bunch of
# environment variables based on the retrieved info.
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$SPRK_COMMANDS_DIR"`/

export BUILD_SETTINGS_DIR="${PROJECT_ROOT_DIR}BuildSettings/"
export BUILD_DIR="${PROJECT_ROOT_DIR}build/"

#
# Don't even try if the project has not been generated
#
if [ ! -e "${BUILD_SETTINGS_DIR}buildSettings.command" ]; then

  echo ""
  echo "Run the SparkerConfig first - this project has not been configured."
  echo "Aborting."
  echo ""
  exit

fi

. "$BUILD_SETTINGS_DIR/buildSettings.command"

if [ "$EXTENSION_DIRNAME" != "" ]; then

    export EXTENSION_HOMEDIR=~"/Library/Application Support/Adobe/CEP/extensions/$EXTENSION_DIRNAME/"

fi

popd > /dev/null
