export version="4.0.7"
export URLMac="https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/$version/osx10/ZXPSignCmd.dmg"
export URLWin="https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/$version/win64/ZXPSignCmd.exe"

export SPRK_DEV_TOOLS_DIR=`dirname "$0"`/

cd $SPRK_DEV_TOOLS_DIR

export SPRK_DEV_TOOLS_DIR=`pwd`/

if [ ! -f ZXPSignCmd ]; then
  if [ -e /Volumes/ZXPSignCmd ]; then
    echo "Cannot download Mac version because /Volumes/ZXPSignCmd already exists or is already mounted"
  else
    if [ ! -f ZXPSignCmd.dmg ]; then
      wget $URLMac
    fi
    hdiutil mount "${SPRK_DEV_TOOLS_DIR}ZXPSignCmd.dmg"
    cp /Volumes/ZXPSignCmd/ZXPSignCmd .
    umount /Volumes/ZXPSignCmd
  fi
fi

if [ ! -f ZXPSignCmd.exe ]; then
  wget $URLWin
fi
