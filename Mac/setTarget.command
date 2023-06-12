#
# Extract meta-info from BuildSettings folder and define a bunch of
# environment variables based on the retrieved info.
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
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

#
# Don't even try if the project has not been generated
#
if [ ! -e "${BUILD_SETTINGS_DIR}configSettings.command" ]; then

    echo ""
    echo "Run the SparkerConfig first - this project has not been configured."
    echo "Aborting."
    echo ""

else 

    . "${BUILD_SETTINGS_DIR}configSettings.command"

    # Convert Windows build settings for Mac; strip CR at end of each line.

    rm -f "${BUILD_SETTINGS_DIR}buildSettings.command"
    echo "# This file is auto-generated from buildSettings.bat."      > "${BUILD_SETTINGS_DIR}buildSettings.command"
    echo "# Make any adjustments in buildSettings.bat and they will" >> "${BUILD_SETTINGS_DIR}buildSettings.command"
    echo "# automatically be copied into this file."                 >> "${BUILD_SETTINGS_DIR}buildSettings.command"
    echo ""                                                          >> "${BUILD_SETTINGS_DIR}buildSettings.command"
    
    cat "${BUILD_SETTINGS_DIR}buildSettings.bat" | while read line || [ -n "$line" ]; do

        cmd=`echo "$line" | perl -pe "s/^\s*SET\s+(.*)=(.*?)\r?$/export \1=\"\2\"/"`
        echo $cmd >> "${BUILD_SETTINGS_DIR}buildSettings.command"
        eval $cmd

    done

    if [ "$TARGET_DIRNAME" != "" ]; then

        export EXTENSION_HOME_DIR="${EXTENSION_DIR}${TARGET_DIRNAME}/"
        
    fi

fi

popd > /dev/null
