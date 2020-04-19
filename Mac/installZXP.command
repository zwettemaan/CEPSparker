#
# Install a ZXP
#

if [ "$1" == "" ]; then
	echo "Usage: $0 <pathToZXP>"
	exit
fi

export ZXP_RELATIVE_FILE_PATH="$1"
export ZXP_DIR=`dirname $ZXP_RELATIVE_FILE_PATH`
export ZXP_FILE_NAME=`basename "$ZXP_RELATIVE_FILE_PATH"`
export ZXP_FOLDER_NAME="${ZXP_FILE_NAME%%.*}"

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

cd "$ZXP_DIR"

export ZXP_DIR=`pwd`/

if [ -e "$EXTENSION_HOMEDIR/$ZXP_FOLDER_NAME" ]; then
	echo ""
	echo "Extension already installed"
	echo ""
else
	mkdir "$EXTENSION_HOMEDIR/$ZXP_FOLDER_NAME"
	cd "$EXTENSION_HOMEDIR/$ZXP_FOLDER_NAME"
	unzip "$ZXP_DIR/$ZXP_FILE_NAME"
fi

popd > /dev/null