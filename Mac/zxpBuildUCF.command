#
# Build a code-signed ZXP file
#
# Usage: 
#
#   zxpBuildUCF.command
#
# or
#
#   zxpBuildUCF.command debug
#
# Optional 'debug' parameter: add .debug file into signed ZXP 
#

export param="$1"
export scriptDir=`dirname "$0"`
cd "$scriptDir"

# 
# Need java runtime 1.7.0_80 installed!
# https://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html
#

export JAVA_HOME=$(/usr/libexec/java_home -v 1.7.0_80)
export JAVA_VERSION=`java -version 2>&1 | head -n 1 | sed -E -e "s/^[^\"]*\"|\"$//g"`
if [ "$JAVA_VERSION" != "1.7.0_80" ]; then

	echo "Need version 1.7.0_80 of Java runtime installed"
	echo "Visit https://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html"
	exit

fi

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

if [ ! -f "$devtoolsDir/signingtoolkit/ucf.jar" ]; then

	echo "Need to download ucf.jar first. See 'devtools/downloadUcfJar' scripts"
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
cp -R "$projectHomeDir/debug" "$EXTENSION_HOMEDIR/.debug"

cd "$EXTENSION_HOMEDIR"

find . -name ".DS_Store" | while read a; do rm "$a"; done
find . -name "__MACOSX" | while read a; do rm -rf "$a"; done
xattr -cr .

cd "$projectHomeDir/build"

if [ "$param" == "debug" ]; then
	java -jar "$devtoolsDir/signingtoolkit/ucf.jar" -package -storetype PKCS12 -keystore "$buildSettingsDir/$certfile" -storepass "$password" -tsa $timestampServer "$EXTENSION_DIRNAME.zxp" -C "$EXTENSION_HOMEDIR" . -e "$EXTENSION_HOMEDIR/.debug" .debug
else
	java -jar "$devtoolsDir/signingtoolkit/ucf.jar" -package -storetype PKCS12 -keystore "$buildSettingsDir/$certfile" -storepass "$password" -tsa $timestampServer "$EXTENSION_DIRNAME.zxp" -C "$EXTENSION_HOMEDIR" .
fi

rm -rf "$EXTENSION_HOMEDIR"
