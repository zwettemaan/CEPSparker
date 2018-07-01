#
# De-quarantine the configuration app
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

xattr -dr com.apple.quarantine CEPSparkerConfig.app

echo "CEPSparkerConfig.app is now de-quarantined."