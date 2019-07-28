export URL="http://download.macromedia.com/pub/developer/creativesuite/extension-builder/signingtoolkit.zip"

export devtoolsDir=`dirname "$0"`
cd $devtoolsDir
export devtoolsDir=`pwd`

if [ ! -e signingtoolkit/ucf.jar ]; then
  rm -rf signingtoolkit
  wget $URL
  mkdir signingtoolkit
  cd signingtoolkit
  unzip ../signingtoolkit.zip
  cd ..
  rm signingtoolkit.zip
fi

