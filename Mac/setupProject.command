#
# Set up a folder with symbolic links to important 
# local directories for easy access
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

export EXTENSION_VERSION=`head -n 1 "$projectHomeDir/ExtensionVersion.txt"`