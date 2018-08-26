#
# De-quarantine the configuration app
#

export scriptDir=`dirname "$0"`
cd $scriptDir

export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

xattr -dr com.apple.quarantine CEPSparkerConfig.app
xattr -dr com.apple.quarantine *.command

echo "*.command scripts and CEPSparkerConfig.app are now de-quarantined."