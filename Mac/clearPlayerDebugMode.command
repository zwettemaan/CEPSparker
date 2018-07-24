#
# Disable debugging
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

if [ -f  "$projectHomeDir/BuildSettings/CEPVersion.txt" ]; then

    export CEP_VERSION=`head -n 1 "$projectHomeDir/BuildSettings/CEPVersion.txt"`

    if [ "$CEP_VERSION" != "" ]; then
    
        if [ "$CEP_VERSION" == "4.2" ]; then
            export PLIST_FILE=com.adobe.CSXS.4.plist
        elif [ "$CEP_VERSION" == "5.2" ]; then
            export PLIST_FILE=com.adobe.CSXS.5.plist
        elif [ "$CEP_VERSION" == "6.1" ]; then
            export PLIST_FILE=com.adobe.CSXS.5.plist
        elif [ "$CEP_VERSION" == "7.0" ]; then
            export PLIST_FILE=com.adobe.CSXS.5.plist
        elif [ "$CEP_VERSION" == "8.0" ]; then
            export PLIST_FILE=com.adobe.CSXS.8.plist
        else
            echo "Unexpected CEP_VERSION"
        fi

        if [ "$PLIST_FILE" != "" ]; then

            defaults write $PLIST_FILE PlayerDebugMode 0
            defaults write $PLIST_FILE LogLevel 1

            #
            # Force Mac OS to re-read the PLIST file
            #
            killall -u `whoami` cfprefsd
        fi
    fi
fi