#
# Setup the panel so we can run it in a live session of the target application
#

if [ "${SPRK_COMMANDS_DIR}" == "" -o ! -d "${SPRK_COMMANDS_DIR}" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "${SPRK_COMMANDS_DIR}" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

if [ ! -d "${SPRK_COMMANDS_DIR}../BuildSettings" ]; then

    echo ""
    echo "This project has not been configured yet - nothing to install."
    echo "Aborting."
    echo ""
	exit
fi

. ./setTarget.command

./nodeSetup.command

if [ ! -d "${USER_HOME_DIR}Library/Application Support/Adobe" ]; then
    mkdir "${USER_HOME_DIR}Library/Application Support/Adobe"
fi

if [ ! -d "${USER_HOME_DIR}Library/Application Support/Adobe/CEP" ]; then
    mkdir "${USER_HOME_DIR}Library/Application Support/Adobe/CEP"
fi

if [ ! -d "${USER_HOME_DIR}Library/Application Support/Adobe/CEP/extensions" ]; then
    mkdir "${USER_HOME_DIR}Library/Application Support/Adobe/CEP/extensions"
fi

if [ "${EXTENSION_HOME_DIR}" != "" ]; then

    "${SPRK_COMMANDS_DIR}setPlayerDebugMode.command"
    "${SPRK_COMMANDS_DIR}adjustVersionInManifest.command"

    rm -rf "${EXTENSION_HOME_DIR}"
    mkdir "${EXTENSION_HOME_DIR}"

    ln -s "${PROJECT_ROOT_DIR}debug"         "${EXTENSION_HOME_DIR}.debug"
    ln -s "${PROJECT_ROOT_DIR}css"           "${EXTENSION_HOME_DIR}css"
    ln -s "${PROJECT_ROOT_DIR}CSXS"          "${EXTENSION_HOME_DIR}CSXS"
    ln -s "${PROJECT_ROOT_DIR}CEP_html"      "${EXTENSION_HOME_DIR}CEP_html"
    ln -s "${PROJECT_ROOT_DIR}node_modules"  "${EXTENSION_HOME_DIR}node_modules"
    ln -s "${PROJECT_ROOT_DIR}jsx"           "${EXTENSION_HOME_DIR}jsx"
    ln -s "${PROJECT_ROOT_DIR}CEP_js"        "${EXTENSION_HOME_DIR}CEP_js"
    ln -s "${PROJECT_ROOT_DIR}shared_js"     "${EXTENSION_HOME_DIR}shared_js"
    ln -s "${PROJECT_ROOT_DIR}shared_js_jsx" "${EXTENSION_HOME_DIR}shared_js_jsx"

    echo ""
    echo "Symbolic links have been created so the extension will run in the Adobe Creative Cloud apps."
    echo ""
    
fi

popd > /dev/null