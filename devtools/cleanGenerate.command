#
# Undo the generation step. This will remove all your hard work.
# Do not run this unless you're absolutely sure
#

export SPRK_DEV_TOOLS_DIR=`dirname "$0"`

pushd "$SPRK_DEV_TOOLS_DIR" > /dev/null

export SPRK_DEV_TOOLS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$SPRK_DEV_TOOLS_DIR"`/

export SPRK_COMMANDS_DIR="${PROJECT_ROOT_DIR}Mac/"

#
# Don't even try if the project has not been generated
#
if [ ! -d "${PROJECT_ROOT_DIR}BuildSettings" ]; then

    echo ""
    echo "This project has not been configured yet - nothing to remove."
    echo "Aborting."
    echo ""

else

    echo ""
    echo "*** WARNING WARNING WARNING  ***"
    echo ""
    echo "This will irrevokably delete all generated files."
    echo ""
    echo "Type 'YES' at the prompt only if you're really sure"
    echo "you want to do this."

    read reply

    if [ "$reply" == "YES" ]; then

        cd "$PROJECT_ROOT_DIR"
        
        Mac/clean.command

        rm -f "${SPRK_DEV_TOOLS_DIR}ZXPSignCmd*"
        rm -rf "${SPRK_DEV_TOOLS_DIR}signingtoolkit*"
        rm -rf BuildSettings
        rm -rf debug
        rm -rf css
        rm -rf CSXS
        rm -rf CEP_html
        rm -rf browser_html
        rm -rf node_modules
        rm -rf LocalLinks
        rm -rf VSCode
        rm -rf SampleImageServer
        rm -rf jsx
        rm -rf CEP_js
        rm -rf browser_js
        rm -rf node_js
        rm -rf shared_js
        rm -rf shared_js_jsx
      
        echo ""
        echo "This project has been reset to an unconfigured, blank state."
        echo ""

    fi

fi

popd > /dev/null