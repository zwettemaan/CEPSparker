#
# Setup the panel so we can run it in a live session of the target application
#

if [ "$SPRK_COMMANDS_DIR" == "" -o ! -d "$SPRK_COMMANDS_DIR" ]; then
    export SPRK_COMMANDS_DIR=`dirname "$0"`
fi

pushd "$SPRK_COMMANDS_DIR" > /dev/null

export SPRK_COMMANDS_DIR=`pwd`/

. setTarget.command

if ! command -v npm &> /dev/null; then
    echo "ERROR, cannot install. Node.js needs to be installed (node and npm command line commands need to be available)."
    exit
fi

cd ../node_install

npm pack jsinterface
mv jsinterface*.tgz jsinterface.tgz
rm -rf jsinterface

npm pack runtests
mv runtests*.tgz runtests.tgz
rm -rf runtests

cd ..

#
# Need to install node modules used for development as well as JSInterface
#

npm install .

popd > /dev/null