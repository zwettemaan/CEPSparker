#
# Called by PluginManager by way of CRDT_manifest.json. 
#

export SPRK_COMMANDS_DIR=`dirname "$0"`

export SOURCE_PACKAGE_FOLDER="$1"
export TARGET_PACKAGE_FOLDER="$2"
export FILE_PATH_PLUGIN_INSTALLER_RESOURCES="$3"
export FILE_PATH_CODE_SIGN_CERTIFICATE="$4"
export CODE_SIGN_CERTIFICATE_PASSWORD="$5"
export URL_TIME_STAMP_SERVER="$6"
export INJECT_DEBUG_FILE="$7"

export CPU_ARCHITECTURE=`uname -p`
export PACKAGE_NAME=`basename "${TARGET_PACKAGE_FOLDER}"`
export PACKAGE_PARENT_DIR=`dirname "${TARGET_PACKAGE_FOLDER}"`
export UCF_TEMP_DIR=/tmp/CRDT_Temp_UCF/

pushd "${SPRK_COMMANDS_DIR}" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. ./adjustVersionDependencies.command

popd > /dev/null