#
# Read BuildSettings/ExtensionVersion.txt and adjust the manifest
#

export scriptDir=`dirname "$0"`
cd $scriptDir
export scriptDir=`pwd`
export projectHomeDir=`dirname "$scriptDir"`

cd "$projectHomeDir"

if [ -f "$projectHomeDir/BuildSettings/ExtensionVersion.txt" ]; then

	export EXTENSION_VERSION=`head -n 1 "$projectHomeDir/BuildSettings/ExtensionVersion.txt"`

	if [ "$EXTENSION_VERSION" != "" ]; then

		#
		# Update extension version number in manifest
		#
		sed -E "s/(<Extension +Id=\"[^\"]*\" +Version=\")([0-9\.]*)(\")/\1$EXTENSION_VERSION\3/" < CSXS/manifest.xml > CSXS/manifest.xml.new

		mv CSXS/manifest.xml.new CSXS/manifest.xml

	fi
fi