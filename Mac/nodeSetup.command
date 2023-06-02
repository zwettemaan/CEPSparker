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

if [ ! -e jsinterface.tgz ]; then
    rm -f jsinterface*.tgz
    npm pack ./jsinterface
    mv jsinterface*.tgz jsinterface.tgz
    rm -rf jsinterface
fi

if [ ! -e runtests.tgz ]; then
    rm -f runtests*.tgz
    npm pack ./runtests
    mv runtests*.tgz runtests.tgz
    rm -rf runtests
fi

cd ..

#
# Need to install node modules used for development as well as JSInterface
#

npm install .

popd > /dev/null