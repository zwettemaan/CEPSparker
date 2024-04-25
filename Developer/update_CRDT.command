#
# This script is used for building a CEPSparker release. It will grab the CreativeDeveloperTools_ES.nzip
# file from the CRDT_ES repo.
#

if [ `uname` != "Darwin" ]; then
    echo Needs to run on Mac
    exit
fi

export SCRIPT_DIR=`dirname $0`
cd $SCRIPT_DIR
export SCRIPT_DIR=`pwd`/

if [ "${TIGHTENER_GIT_ROOT}" = "" ]; then
    echo Needs to be on a workstation with Tightener installed
    exit
fi

if [ ! -d "${TIGHTENER_GIT_ROOT}" ]; then
    echo Needs to be on a workstation with Tightener installed
    exit
fi

cd ..

export CEP_SPARKER_DIR=`pwd`/

. "${TIGHTENER_GIT_ROOT}BuildScripts/setEnv"

echo "update_CRDT started"

export CREATIVE_DEVELOPER_TOOLS_ES_NZIP="${TIGHTENER_GIT_ROOT}/../CRDT_ES/scripts/CreativeDeveloperTools_ES.nzip"
if [ ! -e "${CREATIVE_DEVELOPER_TOOLS_ES_NZIP}" ]; then

    echo "Cannot refresh from repo. CEPSparker repo needs to be installed alongside CRDT_ES repo"
    exit

fi

cd "${CEP_SPARKER_DIR}Templates/jsx"

rm -rf "CreativeDeveloperTools_ES"
rm -f "CreativeDeveloperTools_ES.zip"

cp -R "${CREATIVE_DEVELOPER_TOOLS_ES_NZIP}" CreativeDeveloperTools_ES.zip

unzip -q CreativeDeveloperTools_ES.zip

rm -f CreativeDeveloperTools_ES.zip

if [ -d "${CEP_SPARKER_DIR}/jsx" ]; then

    cd "${CEP_SPARKER_DIR}jsx"
    
    rm -rf "CreativeDeveloperTools_ES"
    rm -f "CreativeDeveloperTools_ES.zip"

    cp -R "${CREATIVE_DEVELOPER_TOOLS_ES_NZIP}" CreativeDeveloperTools_ES.zip

    unzip -q CreativeDeveloperTools_ES.zip

    rm -f CreativeDeveloperTools_ES.zip
    
fi
