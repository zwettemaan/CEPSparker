#
# Remove all the CEPSparker templates and generation software
# so the project becomes stand-alone
#

export SPRK_DEV_TOOLS_DIR=`dirname "$0"`

pushd "$SPRK_DEV_TOOLS_DIR" > /dev/null

export SPRK_DEV_TOOLS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$SPRK_DEV_TOOLS_DIR"`/

export SPRK_COMMANDS_DIR="${PROJECT_ROOT_DIR}Mac/"

pushd "$PROJECT_ROOT_DIR" > /dev/null

#
# Don't even try if the project has not been generated
#
if [ ! -d "BuildSettings" ]; then

  echo ""
  echo "This is an unconfigured CEPSparker project."
  echo "Make sure to read the documentation and then run "
  echo "SparkerConfig as instructed."
  echo ""
  echo "Aborting."
  echo ""

else

  echo ""
  echo "***  WARNING WARNING WARNING  ***"
  echo ""
  echo "This will irrevokably delete all templates files and"
  echo "CEPSparker code generation software, which detaches this"
  echo "project from CEPSparker and the CEPSparker git repo"
  echo ""
  echo "Type 'YES' at the prompt only if you're really sure you want to do this."

  read reply

  if [ "$reply" == "YES" ]; then

    rm -rf .git  
    rm -f .gitignore
    rm -f ReadMe.md
    rm -f "${SPRK_DEV_TOOLS_DIR}cleanGenerate.bat"
    rm -f "${SPRK_DEV_TOOLS_DIR}cleanGenerate.command"
    rm -f "${SPRK_DEV_TOOLS_DIR}detachFromCEPSparker.command"
    rm -rf Templates
    rm -f Mac/initialSetupConfigApp.command
    rm -rf Mac/SparkerConfig.app
    rm -rf "Mac/ Do not forget to de-quarantine!.txt"
    rm -f Windows/SparkerConfig.exe
    rm -rf Windows/SparkerConfig\ Libs
    rm -rf "Windows/ Run CMD with administrative permissions!.txt"

  fi

fi

popd > /dev/null