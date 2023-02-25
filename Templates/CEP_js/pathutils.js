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

$$SHORTCODE$$.path.exists = function exists(filepath) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var stat = cep.fs.stat(filepath);
    retVal = (stat.err == cep.fs.NO_ERROR);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
}

$$SHORTCODE$$.path.isDir = function isDir(filepath) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var stat = cep.fs.stat(filepath);
    var retVal = (stat.err == cep.fs.NO_ERROR) && stat.data.isDirectory();

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return isDir;
}

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
}

$$SHORTCODE$$.path.readdir = function readdir(path) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! path) {
            break;
        }

        if (! $$SHORTCODE$$.path.exists(path)) {
            break;
        }

        var readdirData = $$SHORTCODE$$.cepFS.readdir(path);
        if (readdirData.err) {
            break;
        }

        retVal = readdirData.data;
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
}

$$SHORTCODE$$.path.readFile = function readFile(path, optionalEncoding) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! path) {
            break;
        }

        if (! $$SHORTCODE$$.path.exists(path)) {
            break;
        }

        if (! optionalEncoding || optionalEncoding == $$SHORTCODE$$.C.ENCODING_UTF8) {
            optionalEncoding = cep.encoding.UTF8;
        }

        var readData = $$SHORTCODE$$.cepFS.readFile(path, optionalEncoding);

        if (! readData || readData.err) {
            break;
        }

        retVal = readData.data;
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
}

$$SHORTCODE$$.path.stat = function stat(path) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! path) {
            break;
        }

        if (! $$SHORTCODE$$.path.exists(path)) {
            break;
        }

        retVal = $$SHORTCODE$$.cepFS.stat(path);
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
}

$$SHORTCODE$$.path.unlink = function unlink(path) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif
    do {

        if (! path) {
            retVal = "no path";
            break;
        }

        if (! $$SHORTCODE$$.path.exists(path)) {
            break;
        }

        $$SHORTCODE$$.cepFS.deleteFile(path);
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
}

$$SHORTCODE$$.path.writeFile = function writeFile(path, contents, optionalEncoding) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif
    
    do {

        if (! path) {
            break;
        }

        if (! optionalEncoding || optionalEncoding == $$SHORTCODE$$.C.ENCODING_UTF8) {
            optionalEncoding = cep.encoding.UTF8;
        }

        var result = $$SHORTCODE$$.cepFS.writeFile(path, contents, optionalEncoding);
        retVal = result.err;
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
}
})();