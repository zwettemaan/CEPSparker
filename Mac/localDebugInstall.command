#
# Setup the panel so we can run it in a live session of the target application
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

if [ "$EXTENSION_HOME_DIR" != "" ]; then

	"${SPRK_COMMANDS_DIR}setPlayerDebugMode.command"
	"${SPRK_COMMANDS_DIR}adjustVersionInManifest.command"

	rm -rf "$EXTENSION_HOME_DIR"
	mkdir "$EXTENSION_HOME_DIR"

	ln -s "${PROJECT_ROOT_DIR}debug"         "${EXTENSION_HOME_DIR}.debug"
	ln -s "${PROJECT_ROOT_DIR}css"           "${EXTENSION_HOME_DIR}css"
	ln -s "${PROJECT_ROOT_DIR}CSXS"          "${EXTENSION_HOME_DIR}CSXS"
	ln -s "${PROJECT_ROOT_DIR}html"          "${EXTENSION_HOME_DIR}html"
	ln -s "${PROJECT_ROOT_DIR}js"            "${EXTENSION_HOME_DIR}js"
	ln -s "${PROJECT_ROOT_DIR}jsx"           "${EXTENSION_HOME_DIR}jsx"
	ln -s "${PROJECT_ROOT_DIR}shared_js_jsx" "${EXTENSION_HOME_DIR}shared_js_jsx"

	echo ""
	echo "Symbolic links have been created so the extension will run in the Adobe Creative Cloud apps."
	echo ""
	
fi

popd > /dev/null