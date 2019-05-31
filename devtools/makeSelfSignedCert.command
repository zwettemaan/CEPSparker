export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`
export projectHomeDir=`dirname "$devtoolsDir"`
export buildSettingsDir="$projectHomeDir/BuildSettings"

if [ ! -f "$buildSettingsDir/certinfo.command" ]; then
	echo "certinfo.command not found. Make sure to run Mac/CEPSparkerConfig.app first."
	exit
fi

if [ ! -f "$devtoolsDir/ZXPSignCmd" ]; then
	echo "ZXPSignCmd not found. Try to run devtools/downloadZXPSignCmd.command"
	exit
fi

cd "$projectHomeDir"

. "$buildSettingsDir/certinfo.command"

if [ -f "$buildSettingsDir/$certfile" ]; then
	echo "Certificate file already exists."
	exit
fi

export cmd="\"$devtoolsDir/ZXPSignCmd\" -selfSignedCert \"$countryCode\" \"$stateOrProvince\" \"$organization\" \"$commonName\" \"$password\" \"$buildSettingsDir/$certfile\""
eval $cmd
