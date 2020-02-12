#
# Build a code-signed ZXP file
#

export scriptDir=`dirname "$0"`
cd "$scriptDir"

export timestampServer="http://timestamp.globalsign.com/scripts/timstamp.dll"

export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`
export devtoolsDir="$projectHomeDir/devtools"
export buildDir="$projectHomeDir/build"
export buildSettingsDir="$projectHomeDir/BuildSettings"

"$scriptDir/clean.command"

if [ ! -f "$projectHomeDir/BuildSettings/ExtensionDirName.txt" ]; then

	echo "This is an unconfigured CEPSparker directory. Nothing to build."
	exit

fi

if [ ! -f "$devtoolsDir/ZXPSignCmd" ]; then

	echo "Need to download ZXPSignCmd first. See 'devtools/downloadZXPSignCmd' scripts"
	exit

fi	

. "$buildSettingsDir/certinfo.command"

if [ ! -f "$buildSettingsDir/$certfile" ]; then

	echo "Need to provide a certificate file, or create a self-signed one first. See devtools/makeSelfSignedCert.command"
	exit

fi

export EXTENSION_DIRNAME=`head -n 1 "$projectHomeDir/BuildSettings/ExtensionDirName.txt"`

if [ "$EXTENSION_DIRNAME" == "" ]; then

	echo "Cannot determine directory name for extension. No file ExtensionDirName.txt or file is empty"
	exit

fi

export EXTENSION_VERSION=`head -n 1 "$projectHomeDir/BuildSettings/ExtensionVersion.txt"`

if [ "$EXTENSION_VERSION" == "" ]; then

	echo "Cannot determine version for extension. No file ExtensionVersion.txt or file is empty"
	exit

fi

if [ ! -d "$buildDir" ]; then
	mkdir "$buildDir"
fi

export EXTENSION_HOMEDIR="$buildDir/$EXTENSION_DIRNAME"

"$scriptDir/clearPlayerDebugMode.command"
"$scriptDir/adjustVersionInManifest.command"

rm -rf "$EXTENSION_HOMEDIR"
mkdir "$EXTENSION_HOMEDIR"

cp -R "$projectHomeDir/css" "$EXTENSION_HOMEDIR/css"
cp -R "$projectHomeDir/CSXS" "$EXTENSION_HOMEDIR/CSXS"
cp -R "$projectHomeDir/html" "$EXTENSION_HOMEDIR/html"
cp -R "$projectHomeDir/js" "$EXTENSION_HOMEDIR/js"
cp -R "$projectHomeDir/jsx" "$EXTENSION_HOMEDIR/jsx"
cp -R "$projectHomeDir/shared_js_jsx" "$EXTENSION_HOMEDIR/shared_js_jsx"

cd "$EXTENSION_HOMEDIR"

find . -name ".DS_Store" | while read a; do rm "$a"; done
find . -name "__MACOSX" | while read a; do rm -rf "$a"; done
xattr -cr .

cd "$projectHomeDir/build"

"$devtoolsDir/ZXPSignCmd" -sign "$EXTENSION_DIRNAME" "$EXTENSION_DIRNAME.zxp" "$buildSettingsDir/$certfile" "$password" -tsa $timestampServer

mv "$EXTENSION_DIRNAME.zxp" "$EXTENSION_DIRNAME.$EXTENSION_VERSION.zxp"

rm -rf "$EXTENSION_HOMEDIR"
