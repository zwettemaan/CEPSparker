export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`
export buildSettingsDir="$projectHomeDir/BuildSettings"

if [ ! -f "$buildSettingsDir/certinfo.command" ]; then
	echo ""
	echo "certinfo.command not found. Make sure to run Mac/SparkerConfig.app first."
	echo ""
	exit
fi

if [ ! -f "$devtoolsDir/ZXPSignCmd" ]; then
	echo ""
	echo "ZXPSignCmd not found. Try to run devtools/downloadZXPSignCmd.command"
	echo ""
	exit
fi

cd "$projectHomeDir"

. "$buildSettingsDir/certinfo.command"

if [ -f "$buildSettingsDir/$certfile" ]; then
	echo ""
	echo "Certificate file already exists."
	echo ""
	exit
fi

export cmd="\"$devtoolsDir/ZXPSignCmd\" -selfSignedCert \"$countryCode\" \"$stateOrProvince\" \"$organization\" \"$commonName\" \"$password\" \"$buildSettingsDir/$certfile\""
eval $cmd
