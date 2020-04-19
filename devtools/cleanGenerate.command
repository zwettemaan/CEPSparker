#
# Undo the generation step. This will remove all your hard work.
# Do not run this unless you're absolutely sure
#

export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`

echo ""
echo "*** WARNING WARNING WARNING  ***"
echo ""
echo "This will irrevokably delete all generated files."
echo ""
echo "Type 'YES' at the prompt only if you're really sure"
echo "you want to do this."

read reply

if [ "$reply" == "YES" ]; then

  cd "$projectHomeDir"
  
  Mac/clean.command

  rm -f "$devtoolsDir"/ZXPSignCmd*
  rm -rf "$devtoolsDir"/signingtoolkit*
  rm -rf BuildSettings
  rm -rf debug
  rm -rf css
  rm -rf CSXS
  rm -rf html
  rm -rf js
  rm -rf jsx
  rm -rf LocalLinks
  rm -rf SampleImageServer
  rm -rf shared_js_jsx
  
fi