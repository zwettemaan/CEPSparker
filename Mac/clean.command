#
# Remove locally created, compiled or derived data and attempt to 
# bring the project back to a 'clean slate'.
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

"$scriptDir/clearPlayerDebugMode.command"

if [ -f "$projectHomeDir/BuildSettings/ExtensionDirName.txt" ]; then
	export EXTENSION_DIRNAME=`head -n 1 "$projectHomeDir/BuildSettings/ExtensionDirName.txt"`
	if [ "%EXTENSION_DIRNAME%" != "" ]; then
		export EXTENSION_HOMEDIR=~/Library/Application\ Support/Adobe/CEP/extensions/"$EXTENSION_DIRNAME"
		rm -rf "$EXTENSION_HOMEDIR"
	fi
fi

rm -rf LocalLinks
rm -rf build
