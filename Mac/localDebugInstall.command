#
# Setup the panel so we can run it in a live session of the target application
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

if [ "$EXTENSION_HOMEDIR" != "" ]; then

	"{$SPRK_COMMANDS_DIR}setPlayerDebugMode.command"
	"{$SPRK_COMMANDS_DIR}adjustVersionInManifest.command"

	rm -rf "$EXTENSION_HOMEDIR"
	mkdir "$EXTENSION_HOMEDIR"

	ln -s "{$SPRK_COMMANDS_DIR}debug" "${EXTENSION_HOMEDIR}.debug"
	ln -s "{$SPRK_COMMANDS_DIR}css" "${EXTENSION_HOMEDIR}css"
	ln -s "{$SPRK_COMMANDS_DIR}CSXS" "${EXTENSION_HOMEDIR}CSXS"
	ln -s "{$SPRK_COMMANDS_DIR}html" "${EXTENSION_HOMEDIR}html"
	ln -s "{$SPRK_COMMANDS_DIR}js" "${EXTENSION_HOMEDIR}js"
	ln -s "{$SPRK_COMMANDS_DIR}jsx" "${EXTENSION_HOMEDIR}jsx"
	ln -s "{$SPRK_COMMANDS_DIR}shared_js_jsx" "${EXTENSION_HOMEDIR}shared_js_jsx"
	
fi

popd > /dev/null