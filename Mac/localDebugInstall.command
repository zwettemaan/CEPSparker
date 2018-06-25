#
# Setup the panel so we can run it in a live 
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

export CEP_VERSION=`head -n 1 "$projectHomeDir/BuildSettings/CEPVersion.txt"`
export EXTENSION_DIRNAME=`head -n 1 "$projectHomeDir/BuildSettings/ExtensionDirName.txt"`
export EXTENSION_HOMEDIR=~/Library/Application\ Support/Adobe/CEP/extensions/"$EXTENSION_DIRNAME"

"$scriptDir/setPlayerDebugMode.command"
"$scriptDir/adjustVersionInManifest.command"

rm -rf "$EXTENSION_HOMEDIR"
mkdir "$EXTENSION_HOMEDIR"

ln -s "$projectHomeDir/debug" "$EXTENSION_HOMEDIR/.debug"
ln -s "$projectHomeDir/css" "$EXTENSION_HOMEDIR/css"
ln -s "$projectHomeDir/CSXS" "$EXTENSION_HOMEDIR/CSXS"
ln -s "$projectHomeDir/html" "$EXTENSION_HOMEDIR/html"
ln -s "$projectHomeDir/js" "$EXTENSION_HOMEDIR/js"
ln -s "$projectHomeDir/jsx" "$EXTENSION_HOMEDIR/jsx"
ln -s "$projectHomeDir/shared_js_jsx" "$EXTENSION_HOMEDIR/shared_js_jsx"

