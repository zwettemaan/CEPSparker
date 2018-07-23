#
# Remove all the CEPSparker templates and generation software
# so the project becomes stand-alone
#

export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`

cd "$projectHomeDir"

#
# Don't even try if the project has not been generated
#
if [ -d "./BuildSettings"]; then

  echo "***WARNING WARNING WARNING***"
  echo "This will irrevokably delete all templates files and CEPSparker code generation software."
  echo "Type 'YES' at the prompt only if you're really sure you want to do this."

  read reply

  if [ "$reply" == "YES" ]; then

    rm -rf .git  
    rm -f .gitignore
    rm -f ReadMe.md
    rm -rf ProjectConfig.txt
    rm -rf Templates
    rm -rf ToolSources/CEPSparkerConfig
    rm -rf Mac/CEPSparkerConfig.app
    rm -rf Mac/initialSetupConfigApp.command
    rm -rf $devtoolsDir

  fi

fi