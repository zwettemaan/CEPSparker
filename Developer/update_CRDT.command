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

export CREATIVE_DEVELOPER_TOOLS_ES="${TIGHTENER_GIT_ROOT}/../CRDT_ES/scripts/CreativeDeveloperTools_ES"
if [ ! -d "${CREATIVE_DEVELOPER_TOOLS_ES}" ]; then

    echo "Cannot refresh from repo. CEPSparker repo needs to be installed alongside CRDT_ES repo"
    exit

fi

rm -rf "${CEP_SPARKER_DIR}Templates/jsx/CreativeDeveloperTools_ES"

cp -R "${CREATIVE_DEVELOPER_TOOLS_ES}" "${CEP_SPARKER_DIR}Templates/jsx"

if [ -d "${CEP_SPARKER_DIR}/jsx" ]; then

    rm -rf "${CEP_SPARKER_DIR}jsx/CreativeDeveloperTools_ES"

    cp -R "${CREATIVE_DEVELOPER_TOOLS_ES}" "${CEP_SPARKER_DIR}jsx"
    
fi
