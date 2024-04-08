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
    echo "Cannot update nzip file. SizeLabels repo needs to be installed alongside CRDT_ES repo"
    exit
fi

rm -rf jsx/CreativeDeveloperTools_ES
rm -f jsx/CreativeDeveloperTools_ES.nzip
rm -f jsx/CreativeDeveloperTools_ES.zip

cp -R "${CREATIVE_DEVELOPER_TOOLS_ES}" "${CEP_SPARKER_DIR}jsx"

cd jsx

zip -y -r CreativeDeveloperTools_ES.zip CreativeDeveloperTools_ES
mv CreativeDeveloperTools_ES.zip CreativeDeveloperTools_ES.nzip

cd ..
 

