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

if (! $$SHORTCODE$$.nodeFS) {
    $$SHORTCODE$$.nodeFS = require('fs');
}

$$SHORTCODE$$.path.exists = function exists(filePath) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {
            var stat = 
            $$SHORTCODE$$.nodeFS.statSync(filePath);            
            retVal = true;
        }
        catch (err) {            
        }

    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
}

$$SHORTCODE$$.path.isDir = function isDir(filePath) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {


        try {
            var stat = $$SHORTCODE$$.nodeFS.statSync(filePath);            
            retVal = stat.isDirectory();
        }
        catch (err) {            
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
}

$$SHORTCODE$$.path.mkdir = function mkdir(folderPath, separator) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! folderPath) {
            retVal = "no folder path";
            break;
        }

        if ($$SHORTCODE$$.path.exists(folderPath)) {
            break;
        }

        var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);

        retVal = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
        if (retVal) {
            break;
        }
        
        retVal = $$SHORTCODE$$.nodeFS.mkdirSync(folderPath);

    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    
    $endif
    return retVal;
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

        retVal = $$SHORTCODE$$.nodeFS.readdirSync(path);
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
            optionalEncoding = "utf8";
        }

        var options = {
            encoding: optionalEncoding
        };

        retVal = $$SHORTCODE$$.nodeFS.readFileSync(path, options);
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

        retVal = $$SHORTCODE$$.nodeFS.statSync(path);
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

        $$SHORTCODE$$.nodeFS.unlinkSync(path);
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

        try  {

            retVal = -1;

            if (! path) {
                break;
            }

            if (! optionalEncoding || optionalEncoding == $$SHORTCODE$$.C.ENCODING_UTF8) {
                optionalEncoding = "utf8";
            }

            var options = {
                encoding: optionalEncoding
            };

            $$SHORTCODE$$.nodeFS.writeFileSync(path, contents, options);

            retVal = 0;
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

})();