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

. ./setTarget.command

./adjustVersionInManifest.command

if [ -e "${UCF_TEMP_DIR}" ]; then
    rm -rf "${UCF_TEMP_DIR}"
fi

mkdir "${UCF_TEMP_DIR}"

if [ "${CPU_ARCHITECTURE}" = "arm" ]; then
    export JRE=mac_arm64_jre.zip
else
    export JRE=mac_x86_64_jre.zip
fi

unzip -q "${FILE_PATH_PLUGIN_INSTALLER_RESOURCES}/${JRE}" -d "${UCF_TEMP_DIR}" 

export JAVA_HOME="${UCF_TEMP_DIR}/jre/Contents/Home"

cd "${PACKAGE_PARENT_DIR}"

# JSON files get rewritten by ucf.jar as they get included into the ZXP - move the CRDT_manifest.json away
# so it is not included into the code-signing.
#
# We will restore it beside the ZXP file

mv "${PACKAGE_NAME}/CRDT_manifest.json" "${UCF_TEMP_DIR}"

find "${PACKAGE_NAME}" -name ".DS_Store" | while read a; do rm -f "$a"; done
find "${PACKAGE_NAME}" -name "__MACOSX" | while read a; do rm -rf "$a"; done
xattr -cr "${PACKAGE_NAME}"

if [ "${INJECT_DEBUG_FILE}" = "1" -a -e "${SOURCE_PACKAGE_FOLDER}/debug" ]; then
    "${JAVA_HOME}/bin/java" -jar "${FILE_PATH_PLUGIN_INSTALLER_RESOURCES}/ucf.jar" -package -storetype PKCS12 -keystore "${FILE_PATH_CODE_SIGN_CERTIFICATE}" -storepass "${CODE_SIGN_CERTIFICATE_PASSWORD}" -tsa "${URL_TIME_STAMP_SERVER}" "${PACKAGE_NAME}.zxp" -C "${TARGET_PACKAGE_FOLDER}" . -e "${SOURCE_PACKAGE_FOLDER}/debug" .debug
else
    "${JAVA_HOME}/bin/java" -jar "${FILE_PATH_PLUGIN_INSTALLER_RESOURCES}/ucf.jar" -package -storetype PKCS12 -keystore "${FILE_PATH_CODE_SIGN_CERTIFICATE}" -storepass "${CODE_SIGN_CERTIFICATE_PASSWORD}" -tsa "${URL_TIME_STAMP_SERVER}" "${PACKAGE_NAME}.zxp" -C "${TARGET_PACKAGE_FOLDER}" .
fi

mv "${PACKAGE_NAME}" "${PACKAGE_NAME}.precursor"

mkdir "${PACKAGE_NAME}"

mv "${PACKAGE_NAME}.zxp" "${PACKAGE_NAME}"

mv "${UCF_TEMP_DIR}/CRDT_manifest.json" ${PACKAGE_NAME}

rm -rf "${PACKAGE_NAME}.precursor"
rm -rf "${UCF_TEMP_DIR}"

if [ ! -d "${SOURCE_PACKAGE_FOLDER}/build" ]; then
	mkdir "${SOURCE_PACKAGE_FOLDER}/build"
fi

cp "${PACKAGE_NAME}/${PACKAGE_NAME}.zxp" "${SOURCE_PACKAGE_FOLDER}/build"

popd > /dev/null