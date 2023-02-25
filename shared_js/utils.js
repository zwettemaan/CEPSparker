//
// This file contains js code shared between web browser and CEP panel
//

if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

SPRK.PROJECT_SENTINEL_FOLDER_NAME = "shared_js";

SPRK.checkMac = function checkMac() {
    
    var retVal;

    retVal = (window.navigator.platform.substr(0,3).toLowerCase() == "mac");

    return retVal;
};

SPRK.searchProjectRoot = function searchProjectRoot(startDir) {

    var retVal;

    do {

        try {
            if (! startDir) {
                SPRK.logError(arguments, "need startDir");
                break;
            }

            if (! SPRK.path.exists(startDir)) {
                SPRK.logError(arguments, "need existing startDir");
                break;
            }

            var searchDir = SPRK.path.addTrailingSeparator(startDir);
            var searchFile;
            while (searchDir && ! searchFile) {

                searchFile = searchDir + SPRK.PROJECT_SENTINEL_FOLDER_NAME;

                if (! SPRK.path.exists(searchFile)) {
                    searchFile = null;
                    searchDir = SPRK.path.dirname(searchDir) + SPRK.path.SEPARATOR;
                }

            }

            if (searchFile) {
                retVal = searchDir;
            }
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

    return retVal;
}

})();