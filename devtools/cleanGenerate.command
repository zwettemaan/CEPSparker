#
# Undo the generation step. This will remove all your hard work.
# Do not run this unless you're absolutely sure
#

export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`

echo "***WARNING WARNING WARNING***"
echo "This will irrevokably delete all generated files. Type 'YES' at the"
echo "prompt only if you're really sure you want to do this."

read reply

if [ "$reply" == "YES" ]; then

  cd "$projectHomeDir"

  rm -rf BuildSettings
  rm -rf debug
  rm -rf css
  rm -rf CSXS
  rm -rf html
  rm -rf js
  rm -rf jsx
  rm -rf LocalLinks
  rm -rf shared_js_jsx
  rm -rf ToolSources/CEPSparkerConfig/Builds*
  rm -rf ToolSources/CEPSparkerConfig/.CEPSparkerConfig.xojo_uistate
  
fi