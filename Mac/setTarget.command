#
# Extract meta-info from BuildSettings folder and define a bunch of
# environment variables based on the retrieved info.
#

if [ "$SPRK_COMMANDS_DIR" = "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$SPRK_COMMANDS_DIR"`/

export USER_HOME_DIR=~/
export EXTENSION_DIR="${USER_HOME_DIR}Library/Application Support/Adobe/CEP/extensions/"
export DOCUMENTS_DIR="${USER_HOME_DIR}Documents/"
export ADOBE_SCRIPTS_DIR="${DOCUMENTS_DIR}Adobe Scripts"

export BUILD_SETTINGS_DIR="${PROJECT_ROOT_DIR}BuildSettings/"
export BUILD_DIR="${PROJECT_ROOT_DIR}build/"

# Use Python to parse machineInfo.json file

PYTHON_PATH=`which python`
PYTHON2_PATH=`which python2`
PYTHON3_PATH=`which python3`
if [ -f "${PYTHON3_PATH}" ]; then
    export PYTHON="${PYTHON3_PATH}"
elif [ -f "${PYTHON_PATH}" ]; then
    export PYTHON="${PYTHON_PATH}"
elif [ -f "${PYTHON2_PATH}" ]; then
    export PYTHON="${PYTHON2_PATH}"
elif [ -f "/opt/homebrew/bin/python3" ]; then
    export PYTHON="/opt/homebrew/bin/python3"
elif [ -f "/opt/homebrew/bin/python" ]; then
    export PYTHON="/opt/homebrew/bin/python"
elif [ -f "/opt/homebrew/bin/python2" ]; then
    export PYTHON="/opt/homebrew/bin/python2"
elif [ -f "/opt/homebrew/bin/python3" ]; then
    export PYTHON="/opt/homebrew/bin/python3"
elif [ -f "/usr/local/bin/python" ]; then
    export PYTHON="/usr/local/bin/python"
elif [ -f "/usr/local/bin/python2" ]; then
    export PYTHON="/usr/local/bin/python2"
elif [ -f "/usr/bin/python3" ]; then
    export PYTHON="/usr/bin/python3"
elif [ -f "/usr/bin/python" ]; then
    export PYTHON="/usr/bin/python"
elif [ -f "/usr/bin/python2" ]; then
    export PYTHON="/usr/bin/python2"
else
    echo "Cannot find a usable Python"
    exit
fi

export JSON_ATTRNAME="version"
export PYTHON_VERSION=`"${PYTHON}" --version`
if [[ "${PYTHON_VERSION}" =~ "^.* 2\..*$" ]]; then
    export PYTHONIOENCODING=utf8
    PYTHON_FILTER="import sys, json; print json.load(sys.stdin)['${JSON_ATTRNAME}'];"
else
    PYTHON_FILTER="import sys, json; print(json.load(sys.stdin)['${JSON_ATTRNAME}']);"
fi

export CRDT_MANIFEST="CRDT_manifest.json"

export CRDT_VERSION=`cat "${PROJECT_ROOT_DIR}${CRDT_MANIFEST}" | sed -E "s/^(.*)\/\/.*$/\\1/" | "${PYTHON}" -c "${PYTHON_FILTER}"`
if [ "${CRDT_VERSION}" = "" ]; then
    echo "Cannot access version number"
    exit
fi

#
# Don't even try if the project has not been generated
#
if [ ! -e "${BUILD_SETTINGS_DIR}configSettings.command" ]; then

    echo ""
    echo "Run the SparkerConfig first - this project has not been configured."
    echo "Aborting."
    echo ""
    popd > /dev/null
    exit

fi

# Extract version number from CRDT_manifest.json and store it in BuildSettings/buildSettings.bat and buildSettings.command
# For now, just PROJECT_VERSION. Might have more settings in the future

rm -f "${BUILD_SETTINGS_DIR}buildSettings.bat"

echo "REM This file is auto-generated from CRDT_manifest.json."      > "${BUILD_SETTINGS_DIR}buildSettings.bat"
echo "REM Make any adjustments in CRDT_manifest.json and they will" >> "${BUILD_SETTINGS_DIR}buildSettings.bat"
echo "REM automatically be copied into this file."                  >> "${BUILD_SETTINGS_DIR}buildSettings.bat"
echo ""                                                             >> "${BUILD_SETTINGS_DIR}buildSettings.bat"
echo "SET PROJECT_VERSION=${CRDT_VERSION}"                          >> "${BUILD_SETTINGS_DIR}buildSettings.bat"

rm -f "${BUILD_SETTINGS_DIR}buildSettings.command"

echo "# This file is auto-generated from CRDT_manifest.json."        > "${BUILD_SETTINGS_DIR}buildSettings.command"
echo "# Make any adjustments in CRDT_manifest.json and they will"   >> "${BUILD_SETTINGS_DIR}buildSettings.command"
echo "# automatically be copied into this file."                    >> "${BUILD_SETTINGS_DIR}buildSettings.command"
echo ""                                                             >> "${BUILD_SETTINGS_DIR}buildSettings.command"
echo "export PROJECT_VERSION=\"${CRDT_VERSION}\""                   >> "${BUILD_SETTINGS_DIR}buildSettings.command"

. "${BUILD_SETTINGS_DIR}configSettings.command"
. "${BUILD_SETTINGS_DIR}buildSettings.command"

if [ "$TARGET_DIRNAME" != "" ]; then

    export EXTENSION_HOME_DIR="${EXTENSION_DIR}${TARGET_DIRNAME}/"
    
fi

