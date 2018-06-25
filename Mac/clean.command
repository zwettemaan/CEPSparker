#
# Remove locally created, compiled or derived data and attempt to 
# bring the project back to a 'clean slate'.
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

rm -rf LocalLinks
rm -rf build