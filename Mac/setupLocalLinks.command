#
# Set up a folder with symbolic links to important 
# local directories for easy access
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

cd "$PROJECT_ROOT_DIR"

#
# Do nothing if the LocalLinks already exists. If you want a clean
# slate, delete LocalLinks before running this script
#

if [ -e LocalLinks ]; then

    echo ""
    echo "LocalLinks folder already exists."
    echo "Doing nothing."
    echo ""

    open LocalLinks

else

    mkdir LocalLinks
    cd LocalLinks
    ln -s "/Library/Application Support/Adobe/CEP/extensions" "Extensions_Application"
    ln -s ~/Library/Logs/CSXS "Adobe_LogFiles"
    ln -s ~/Library/Application\ Support/Adobe/CEP/extensions "Extensions_User"

    echo ""
    echo "LocalLinks folder has been created."
    echo ""

    open .

fi

popd > /dev/null