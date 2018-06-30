export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`

cd "$projectHomeDir/Mac"
find . -name ".DS_Store" | while read a; do rm "$a"; done
find . -name "__MACOSX" | while read a; do rm -rf "$a"; done
xattr -cr "CEPSparkerConfig.app"
codesign --verbose --deep --force --sign "Developer ID Application: Rorohiko Ltd. (UF54MCK725)" "CEPSparkerConfig.app"
  