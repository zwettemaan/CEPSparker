#
# Remove locally created or derived data and attempt to 
# bring the project back to a 'clean slate'.
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

"${SPRK_COMMANDS_DIR}clearPlayerDebugMode.command"

if [ -d "$EXTENSION_HOME_DIR" ]; then

    rm -rf "$EXTENSION_HOME_DIR"

fi

rm -rf "${PROJECT_ROOT_DIR}LocalLinks"
rm -rf "${PROJECT_ROOT_DIR}build"
rm -f "${PROJECT_ROOT_DIR}*.tpkg"
rm -f "${PROJECT_ROOT_DIR}Developer/*_trackingGUID.json"

popd > /dev/null

echo ""
echo "Project has been set to a clean slate. Built version and local links removed."
echo ""
