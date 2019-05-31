#
# Install a ZXP
#

if [ "z$1" == "z" ]; then
	echo "Usage: $0 <pathToZXP>"
	exit
fi

export ZXP_RELATIVE_FILE_PATH="$1"
export ZXP_DIR=`dirname $ZXP_RELATIVE_FILE_PATH`
export ZXP_FILE_NAME=`basename "$ZXP_RELATIVE_FILE_PATH"`
export ZXP_FOLDER_NAME="${ZXP_FILE_NAME%%.*}"
cd "$ZXP_DIR"
export ZXP_DIR=`pwd`

export EXTENSION_HOMEDIR=~/Library/Application\ Support/Adobe/CEP/extensions
if [ -e "$EXTENSION_HOMEDIR/$ZXP_FOLDER_NAME" ]; then
	echo "Extension already installed"
else
	mkdir "$EXTENSION_HOMEDIR/$ZXP_FOLDER_NAME"
	cd "$EXTENSION_HOMEDIR/$ZXP_FOLDER_NAME"
	unzip "$ZXP_DIR/$ZXP_FILE_NAME"
fi
