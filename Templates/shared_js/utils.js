//
// This file contains js code shared between web browser and CEP panel
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.PROJECT_SENTINEL_FOLDER_NAME = "shared_js";

$$SHORTCODE$$.checkMac = function checkMac() {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = (window.navigator.platform.substr(0,3).toLowerCase() == "mac");

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.searchProjectRoot = function searchProjectRoot(startDir) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {
            if (! startDir) {
                $$SHORTCODE$$.logError(arguments, "need startDir");
                break;
            }

            if (! $$SHORTCODE$$.path.exists(startDir)) {
                $$SHORTCODE$$.logError(arguments, "need existing startDir");
                break;
            }

            var searchDir = $$SHORTCODE$$.path.addTrailingSeparator(startDir);
            var searchFile;
            while (searchDir && ! searchFile) {

                searchFile = searchDir + $$SHORTCODE$$.PROJECT_SENTINEL_FOLDER_NAME;

                if (! $$SHORTCODE$$.path.exists(searchFile)) {
                    searchFile = null;
                    searchDir = $$SHORTCODE$$.path.dirname(searchDir) + $$SHORTCODE$$.path.SEPARATOR;
                }

            }

            if (searchFile) {
                retVal = searchDir;
            }
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}
