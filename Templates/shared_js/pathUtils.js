//
// This file mirrors the API of jsx/pathUtils.jsx
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

(function() {
    
if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = {};
}

if ($$SHORTCODE$$.C.PLATFORM == $$SHORTCODE$$.C.CEP_JAVASCRIPT || $$SHORTCODE$$.C.PLATFORM == $$SHORTCODE$$.C.NODE_JAVASCRIPT) {

    if (! $$SHORTCODE$$.cepFS) {
        if ("undefined" != typeof cep && cep.fs) {
            $$SHORTCODE$$.cepFS = cep.fs;
        }
        else if ("undefined" != typeof window && window.cep) {
            $$SHORTCODE$$.cepFS = window.cep.fs;
        }
    }

    if (! $$SHORTCODE$$.nodeFS) {
        $$SHORTCODE$$.nodeFS = require('fs');
    }

    $$SHORTCODE$$.path.exists = function exists(filepath) {

        var retVal;
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        var stat = $$SHORTCODE$$.cepFS.stat(filepath);
        retVal = (stat.err == $$SHORTCODE$$.NO_ERROR);

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
        return retVal;
    }

    $$SHORTCODE$$.path.isDir = function isDir(filepath) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        var stat = $$SHORTCODE$$.cepFS.stat(filepath);
        var retVal = (stat.err == $$SHORTCODE$$.NO_ERROR) && stat.data.isDirectory();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
        return isDir;
    }

    $$SHORTCODE$$.path.mkdir = function mkdir(folderPath, separator) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        var err = $$SHORTCODE$$.cepFS.ERR_INVALID_PARAMS;

        if (folderPath) {
            if ($$SHORTCODE$$.path.exists(folderPath)) {
                err = $$SHORTCODE$$.NO_ERROR;
            }
            else {
                var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);
                var err = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
                if (err == $$SHORTCODE$$.NO_ERROR) {
                    var result = $$SHORTCODE$$.cepFS.makedir(folderPath);
                    err = result.err;           
                }

            }
        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
        return err;
    }

}

})();