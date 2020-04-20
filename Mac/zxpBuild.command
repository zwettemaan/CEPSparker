#
# Build a code-signed ZXP file
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

export timestampServer="http://timestamp.globalsign.com/scripts/timstamp.dll"

export SPRK_DEV_TOOLS_DIR="${PROJECT_ROOT_DIR}devtools"

"${SPRK_COMMANDS_DIR}clean.command"

if [ ! -e "${BUILD_SETTINGS_DIR}buildSettings.command" ]; then

	echo ""
	echo "This is an unconfigured CEPSparker directory. Nothing to build."
	echo ""

elif [ ! -f "${SPRK_DEV_TOOLS_DIR}ZXPSignCmd" ]; then

	echo ""
	echo "Need to download ZXPSignCmd first. See ${SPRK_DEV_TOOLS_DIR}downloadZXPSignCmd.command script"
	echo ""

else 

	. "${BUILD_SETTINGS_DIR}certinfo.command"

	if [ ! -f "${BUILD_SETTINGS_DIR}${certfile}" ]; then

		echo ""
		echo "Need to provide a certificate file, or create a self-signed one first. See devtools/makeSelfSignedCert.command"
		echo ""

	elif [ "$TARGET_DIRNAME" == "" ]; then

		echo ""
		echo "Cannot determine directory name for extension."
		echo ""

	elif [ "$PROJECT_VERSION" == "" ]; then

		echo ""
		echo "Cannot determine version for extension."
		echo ""

	else 

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

		cd "$EXTENSION_HOMEDIR"

		find . -name ".DS_Store" | while read a; do rm "$a"; done
		find . -name "__MACOSX" | while read a; do rm -rf "$a"; done
		xattr -cr .

		cd "${PROJECT_ROOT_DIR}build"

		"${SPRK_DEV_TOOLS_DIR}ZXPSignCmd" -sign "$TARGET_DIRNAME" "$TARGET_DIRNAME.zxp" "${BUILD_SETTINGS_DIR}${certfile}" "$password" -tsa $timestampServer

		mv "$TARGET_DIRNAME.zxp" "$TARGET_DIRNAME.$PROJECT_VERSION.zxp"

		rm -rf "$EXTENSION_HOMEDIR"
		
	fi

fi	

popd > /dev/null