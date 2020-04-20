#
# De-quarantine the configuration app
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$SPRK_COMMANDS_DIR"`/

xattr -dr com.apple.quarantine SparkerConfig.app
xattr -dr com.apple.quarantine *.command

cd "${PROJECT_ROOT_DIR}devtools"

xattr -dr com.apple.quarantine *.command

popd > /dev/null

echo ""
echo '*.command scripts and SparkerConfig.app are now de-quarantined.'
echo ""
