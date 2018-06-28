#
# Remove locally created, compiled or derived data and attempt to 
# bring the project back to a 'clean slate'.
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

if [ -f "$projectHomeDir/BuildSettings/ExtensionDirName.txt" ]; then
	export EXTENSION_DIRNAME=`head -n 1 "$projectHomeDir/BuildSettings/ExtensionDirName.txt"`
	export EXTENSION_HOMEDIR=~/Library/Application\ Support/Adobe/CEP/extensions/"$EXTENSION_DIRNAME"
	rm -rf "$EXTENSION_HOMEDIR"
fi

rm -rf LocalLinks
rm -rf build
