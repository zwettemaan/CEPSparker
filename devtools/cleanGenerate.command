#
# Undo the generation step. This will remove all your hard work.
# Do not run this unless you're absolutely sure
#

export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`

echo "This will irrevokably delete all generated files. Type 'YES' at the"
echo "prompt if you're really sure you want to do this."

read reply

if [ "$reply" == "YES" ]; then

  cd "$projectHomeDir"

  rm -rf css
  rm -rf CSXS
  rm -rf js
  rm -rf jsx
  rm -rf shared_js_jsx
  rm -rf debug
  rm -rf CEPVersion.txt
  rm -rf ExtensionVersion.txt
  rm -rf Mac/ProjectSettings.command
  rm -rf Windows/ProjectSettings.bat
  
fi