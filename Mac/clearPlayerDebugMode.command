#
# Disable debugging
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

export CEP_VERSION=`head -n 1 "$projectHomeDir/CEPVersion.txt"`

if [ $CEP_VERSION = "4.x" ]; then
  export PLIST_FILE=com.adobe.CSXS.4.plist
elif [ $CEP_VERSION = "5.x" ]; then
  export PLIST_FILE=com.adobe.CSXS.5.plist
elif [ $CEP_VERSION = "6.x" ]; then
  export PLIST_FILE=com.adobe.CSXS.5.plist
elif [ $CEP_VERSION = "7.x" ]; then
  export PLIST_FILE=com.adobe.CSXS.5.plist
elif [ $CEP_VERSION = "8.x" ]; then
  export PLIST_FILE=com.adobe.CSXS.8.plist
fi

defaults write $PLIST_FILE PlayerDebugMode 0
defaults write $PLIST_FILE LogLevel 1

#
# Force Mac OS to re-read the PLIST file
#
killall -u `whoami` cfprefsd