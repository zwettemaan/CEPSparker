#
# Remove all the CEPSparker templates and generation software
# so the project becomes stand-alone
#

export devtoolsDir=`dirname "$0"`
cd "$devtoolsDir"

export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`

cd "$projectHomeDir"

#
# Don't even try if the project has not been generated
#
if [ ! -d "./BuildSettings" ]; then

  echo "*******************************************"
  echo "This is an unconfigured CEPSparker project."
  echo "Leaving this project untouched."
  echo "Make sure to read the documentation and then run "
  echo "CEPSparkerConfig as instructed."
  echo "*******************************************"

else

  echo "*******************************************"
  echo "***WARNING WARNING WARNING***"
  echo "This will irrevokably delete all templates files and"
  echo "CEPSparker code generation software, which detaches this"
  echo "project from CEPSparker and the CEPSparker git repo"
  echo "*******************************************"
  echo ""
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