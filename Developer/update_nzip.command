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

echo "update_nzip started"

export CREATIVE_DEVELOPER_TOOLS_ES="${TIGHTENER_GIT_ROOT}/../CRDT_ES/scripts/CreativeDeveloperTools_ES"
if [ ! -d "${CREATIVE_DEVELOPER_TOOLS_ES}" ]; then

    echo "Cannot refresh nzip file. SizeLabels repo needs to be installed alongside CRDT_ES repo"

else

    pushd "${CEP_SPARKER_DIR}Templates/jsx" > /dev/null

    rm -rf "${CEP_SPARKER_DIR}Templates/jsx/CreativeDeveloperTools_ES"

    cp -R "${CREATIVE_DEVELOPER_TOOLS_ES}" "${CEP_SPARKER_DIR}Templates/jsx"

    zip -y -r CreativeDeveloperTools_ES.zip CreativeDeveloperTools_ES

    rm -rf CreativeDeveloperTools_ES

    mv CreativeDeveloperTools_ES.zip CreativeDeveloperTools_ES.nzip

    popd > /dev/null

fi

if [ -d "${CEP_SPARKER_DIR}/jsx" ]; then

    if [ -f "${CEP_SPARKER_DIR}Templates/jsx/CreativeDeveloperTools_ES.nzip" ]; then

        pushd "${CEP_SPARKER_DIR}jsx" > /dev/null

        rm -rf CreativeDeveloperTools_ES

        cp "${CEP_SPARKER_DIR}Templates/jsx/CreativeDeveloperTools_ES.nzip" CreativeDeveloperTools_ES.nzip
        
        unzip CreativeDeveloperTools_ES.nzip

        popd > /dev/null

    fi

fi
