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

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

# 
# Need some older java runtime, e.g. 1.7.0_80 installed!
#
# At some point in time (Java 9?) things don't work any more with certificate issues
#
# https://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html
#

export JAVA_HOME=$(/usr/libexec/java_home -v 1.7.0_80)
export JAVA_VERSION=`java -version 2>&1 | head -n 1 | sed -E -e "s/^[^\"]*\"|\"$//g"`
if [ "$JAVA_VERSION" != "1.7.0_80" ]; then

	echo ""
	echo "Need version 1.7.0_80 of Java runtime installed"
	echo "Visit https://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html"
	echo ""
	exit

fi

export timestampServer="http://timestamp.globalsign.com/scripts/timstamp.dll"

export SPRK_DEV_TOOLS_DIR="${PROJECT_ROOT_DIR}devtools"

"${SPRK_COMMANDS_DIR}clean.command"

if [ ! -e "${BUILD_SETTINGS_DIR}buildSettings.command" ]; then

	echo ""
	echo "This is an unconfigured CEPSparker directory. Nothing to build."
	echo ""
	exit

fi

if [ ! -f "${SPRK_DEV_TOOLS_DIR}signingtoolkit/ucf.jar" ]; then

	echo ""
	echo "Need to download ucf.jar first. See ${SPRK_DEV_TOOLS_DIR}downloadUcfJar.command script"
	echo ""
	exit

fi	

. "${BUILD_SETTINGS_DIR}certinfo.command"

if [ ! -f "${BUILD_SETTINGS_DIR}${certfile}" ]; then

	echo ""
	echo "Need to provide a certificate file, or create a self-signed one first. See ${SPRK_DEV_TOOLS_DIR}makeSelfSignedCert.command"
	echo ""
	exit

fi

if [ "$EXTENSION_DIRNAME" == "" ]; then

	echo ""
	echo "Cannot determine directory name for extension. "
	echo ""
	exit

fi

if [ "$EXTENSION_VERSION" == "" ]; then

	echo ""
	echo "Cannot determine version for extension."
	echo ""
	exit

fi

if [ ! -d "$BUILD_DIR" ]; then
	mkdir "$BUILD_DIR"
fi

"${SPRK_COMMANDS_DIR}clearPlayerDebugMode.command"
"${SPRK_COMMANDS_DIR}adjustVersionInManifest.command"

rm -rf "$EXTENSION_HOMEDIR"
mkdir "$EXTENSION_HOMEDIR"

cp -R "${PROJECT_ROOT_DIR}css" "${EXTENSION_HOMEDIR}css"
cp -R "${PROJECT_ROOT_DIR}CSXS" "${EXTENSION_HOMEDIR}CSXS"
cp -R "${PROJECT_ROOT_DIR}html" "${EXTENSION_HOMEDIR}html"
cp -R "${PROJECT_ROOT_DIR}js" "${EXTENSION_HOMEDIR}js"
cp -R "${PROJECT_ROOT_DIR}jsx" "${EXTENSION_HOMEDIR}jsx"
cp -R "${PROJECT_ROOT_DIR}shared_js_jsx" "${EXTENSION_HOMEDIR}shared_js_jsx"
if [ "$param" == "debug" ]; then
	cp -R "${PROJECT_ROOT_DIR}debug" "${EXTENSION_HOMEDIR}.debug"
fi

cd "$EXTENSION_HOMEDIR"

find . -name ".DS_Store" | while read a; do rm "$a"; done
find . -name "__MACOSX" | while read a; do rm -rf "$a"; done
xattr -cr .

cd "${PROJECT_ROOT_DIR}build"

if [ "$param" == "debug" ]; then
	java -jar "$devtoolsDir/signingtoolkit/ucf.jar" -package -storetype PKCS12 -keystore "$buildSettingsDir/$certfile" -storepass "$password" -tsa $timestampServer "$EXTENSION_DIRNAME.zxp" -C "$EXTENSION_HOMEDIR" . -e "${EXTENSION_HOMEDIR}.debug" .debug
	mv "$EXTENSION_DIRNAME.zxp" "$EXTENSION_DIRNAME.$EXTENSION_VERSION.debug.zxp"
else
	java -jar "$devtoolsDir/signingtoolkit/ucf.jar" -package -storetype PKCS12 -keystore "$buildSettingsDir/$certfile" -storepass "$password" -tsa $timestampServer "$EXTENSION_DIRNAME.zxp" -C "$EXTENSION_HOMEDIR" .
	mv "$EXTENSION_DIRNAME.zxp" "$EXTENSION_DIRNAME.$EXTENSION_VERSION.zxp"
fi

rm -rf "$EXTENSION_HOMEDIR"

popd > /dev/null