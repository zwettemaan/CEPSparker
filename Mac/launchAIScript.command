#
# launchAIScript <scriptPath> <appPath> <outputFile>
#
# <scriptPath> is DELETED after execution - this should be a temporary file
#
# The protocol is:
#
# 1) Copy script to run into <scriptPath> (some /tmp/... file)
# 2) Launch this command, and monitor for <outputFile>. Do not open <outputFile>
# 3) Once the file <scriptPath> disappears the script has been completed
# 4) It is now safe to read <outputFile>
#

export cmd="( osascript -e \"tell application \\\"$2\\\"\" -e \"do javascript \\\"#targetengine main\\\\n#include \\\\\\\"$1\\\\\\\"\\\"\" -e \"end tell\"; rm \"$1\" )&";

eval $cmd > "$3"
