#
# De-quarantine the configuration app
#

export scriptDir=`dirname "$0"`
cd "$scriptDir"

export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

xattr -dr com.apple.quarantine SparkerConfig.app
xattr -dr com.apple.quarantine *.command

cd ../devtools

xattr -dr com.apple.quarantine *.command

echo ""
echo '*.command scripts and SparkerConfig.app are now de-quarantined.'
echo ""
