#
# Set up a folder with symbolic links to important 
# local directories for easy access
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

if [ ! -d LocalLinks ]; then
	mkdir LocalLinks
	cd LocalLinks
	ln -s "/Library/Application Support/Adobe/CEP/extensions" "Extensions_Application"
	ln -s ~/Library/Logs/CSXS "Adobe_LogFiles"
	ln -s ~/Library/Application\ Support/Adobe/CEP/extensions "Extensions_User"
fi