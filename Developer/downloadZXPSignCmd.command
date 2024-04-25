#
# This is an alternate method - the preferred method is to package using the 
# PluginInstaller, which can be downloaded from:
#
# https://store.tgrg.net
#
# PluginInstaller will handle creating the certificate, code-signing, and will
# create both a .zxp (old) and .tpkg (new). At the user end, PluginInstaller can handle
# installing the .tpkg file as well.
#

export version="4.1.1"
export OSXDir="osx10.15"
export WinDir="win64"
export OSXFile="ZXPSignCmd-64bit"
export WinExeFile="ZXPSignCmd.exe"

export URLMac="https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/$version/$OSXDir/$OSXFile.dmg"
export URLWin="https://github.com/Adobe-CEP/CEP-Resources/raw/master/ZXPSignCMD/$version/$WinDir/$WinExeFile"

export SPRK_DEV_TOOLS_DIR=`dirname "$0"`/

cd $SPRK_DEV_TOOLS_DIR

export SPRK_DEV_TOOLS_DIR=`pwd`/

if [ ! -f ZXPSignCmd ]; then
  if [ -e /Volumes/$OSXFile ]; then
    echo "Cannot download Mac version because /Volumes/$OSXFile already exists or is already mounted"
  else
    if [ ! -f $OSXFile.dmg ]; then
      wget $URLMac
    fi
    hdiutil mount "${SPRK_DEV_TOOLS_DIR}${OSXFile}.dmg"
    cp /Volumes/${OSXFile}/$OSXFile ./ZXPSignCmd
    chmod +x ZXPSignCmd
    umount /Volumes/${OSXFile}
  fi
fi

if [ ! -f $WinExeFile ]; then
  wget $URLWin
fi
