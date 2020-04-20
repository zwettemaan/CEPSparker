export URL="http://download.macromedia.com/pub/developer/creativesuite/extension-builder/signingtoolkit.zip"

export SPRK_DEV_TOOLS_DIR=`dirname "$0"`/

cd $SPRK_DEV_TOOLS_DIR

export SPRK_DEV_TOOLS_DIR=`pwd`/

if [ ! -e signingtoolkit/ucf.jar ]; then
  rm -rf signingtoolkit
  wget $URL
  mkdir signingtoolkit
  cd signingtoolkit
  unzip ../signingtoolkit.zip
  cd ..
  rm signingtoolkit.zip
fi

