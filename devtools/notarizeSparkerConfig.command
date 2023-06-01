export SPRK_DEV_TOOLS_DIR=`dirname "$0"`

pushd "$SPRK_DEV_TOOLS_DIR" > /dev/null

export SPRK_DEV_TOOLS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$SPRK_DEV_TOOLS_DIR"`/

cd "${PROJECT_ROOT_DIR}"

rm -rf ./Mac.zip

find . -name ".DS_Store" | while read a; do rm "$a"; done
find . -name "__MACOSX" | while read a; do rm -rf "$a"; done

xattr -cr "Mac"

codesign --timestamp --verbose --deep --force --sign "Developer ID Application: Rorohiko Ltd. (UF54MCK725)" "./Mac"
zip -y -r ./Mac.zip Mac

echo "Enter notarization password:"
read NOTARIZATION_PASSWORD

echo "Enter Mac's login password:"
sudo xcode-select -s /Applications/Xcode.app

xcrun notarytool submit --password "${NOTARIZATION_PASSWORD}" --apple-id "dev@rorohiko.com"  --team-id "UF54MCK725" --wait ./Mac.zip

rm ./Mac.zip