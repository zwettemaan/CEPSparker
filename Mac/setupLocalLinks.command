#
# Set up a folder with symbolic links to important 
# local directories for easy access
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

#
# Do nothing if the LocalLinks already exists. If you want a clean
# slate, delete LocalLinks before running this script
#

if [ ! -d LocalLinks ]; then

	mkdir LocalLinks
	cd LocalLinks
	ln -s "/Library/Application Support/Adobe/CEP/extensions" "Extensions_Application"
	ln -s ~/Library/Logs/CSXS "Adobe_LogFiles"
	ln -s ~/Library/Application\ Support/Adobe/CEP/extensions "Extensions_User"

	if [ -f "$projectHomeDir/BuildSettings/CEPVersion.txt" ]; then

		export CEP_VERSION=`head -n 1 "$projectHomeDir/BuildSettings/CEPVersion.txt"`

		if [ "$CEP_VERSION" != "" ]; then

			if [ "$CEP_VERSION" == "4.2" ]; then
				ln -s ~/Library/Logs/CSXS/cep_cookies/ "Persistent_Cookies"
			elif [ "$CEP_VERSION" == "5.2" ]; then
				ln -s ~/Library/Logs/CSXS/cep_cache/ "Persistent_Cookies"
			elif [ "$CEP_VERSION" == "6.1" ]; then
				ln -s ~/Library/Caches/CSXS/cep_cache/ "Persistent_Cookies"
			elif [ "$CEP_VERSION" == "7.0" ]; then
				ln -s ~/Library/Caches/CSXS/cep_cache/ "Persistent_Cookies"
			elif [ "$CEP_VERSION" == "8.0" ]; then
				ln -s ~/Library/Caches/CSXS/cep_cache/ "Persistent_Cookies"
			else
				echo "Unexpected CEP_VERSION"
			fi
			
		fi
	fi
fi