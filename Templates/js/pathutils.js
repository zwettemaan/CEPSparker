//
// This file mirrors the API of jsx/pathUtils.jsx
//

if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = {};
}

$$SHORTCODE$$.path.exists = function exists(filepath) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var stat = cep.fs.stat(filepath);
    var retVal = (stat.err == cep.fs.NO_ERROR);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

    return retVal;
};

$$SHORTCODE$$.path.isDir = function isDir(filepath) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var isDir = IsDirectory(filepath);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

    return isDir;
};

$$SHORTCODE$$.path.mkdir = function mkdir(folderPath, separator) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var err = cep.fs.ERR_INVALID_PARAMS;

    if (folderPath) {
        if ($$SHORTCODE$$.path.exists(folderPath)) {
            err = cep.fs.NO_ERROR;
        }
        else {
            var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);
            var err = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
            if (err == cep.fs.NO_ERROR) {
                var result = cep.fs.makedir(folderPath);
                err = result.err;           
            }

        }
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif
    
    return err;
};

