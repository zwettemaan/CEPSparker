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

export CPU_ARCHITECTURE=`uname -p`
export PACKAGE_NAME=`basename "${TARGET_PACKAGE_FOLDER}"`
export PACKAGE_PARENT_DIR=`dirname "${TARGET_PACKAGE_FOLDER}"`
export UCF_TEMP_DIR=/tmp/CRDT_Temp_UCF/
export FILE_PATH_UCF_TOOL="${UCF_TEMP_DIR}UCF.app/Contents/MacOS/UCF"
export TARGET_PACKAGE_PRECURSOR_FOLDER=${TARGET_PACKAGE_FOLDER}.precursor

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

"${JAVA_HOME}/bin/java" -jar "${FILE_PATH_PLUGIN_INSTALLER_RESOURCES}/ucf.jar" -package -storetype PKCS12 -keystore "${FILE_PATH_CODE_SIGN_CERTIFICATE}" -storepass "${CODE_SIGN_CERTIFICATE_PASSWORD}" -tsa "${URL_TIME_STAMP_SERVER}" "${PACKAGE_NAME}.zxp" -C "${TARGET_PACKAGE_FOLDER}" .

rm -rf "${UCF_TEMP_DIR}"

rm -rf "${TARGET_PACKAGE_PRECURSOR_FOLDER}"
mv "${TARGET_PACKAGE_FOLDER}" "${TARGET_PACKAGE_PRECURSOR_FOLDER}"

mkdir "${PACKAGE_NAME}"
cd "${PACKAGE_NAME}"
unzip -q "../${PACKAGE_NAME}.zxp"
cd ..

mv "${PACKAGE_NAME}.zxp" "${SOURCE_PACKAGE_FOLDER}"

popd > /dev/null