//
// This file mirrors the API of CEP_js/pathUtils.js or shared_js/utils.js
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = {};
}

$$SHORTCODE$$.path.exists = function exists(filepath) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var f = File(filepath);
    var retVal = f.exists;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.isDir = function isDir(folderPath) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif
    
    // This casts to a File instead of a Folder if the
    // path references a file

    var folder = Folder(folderPath);

    var retVal = (folder instanceof Folder);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.mkdir = function mkdir(folderPath, separator) {

    var success = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {
            if (! folderPath) {
                $$SHORTCODE$$.logError(arguments, "no folderPath");
                break;
            }

            if ($$SHORTCODE$$.path.exists(folderPath)) {
                success = true;
                break;
            }

            var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);
            success = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
            if (! success) {
                $$SHORTCODE$$.logError(arguments, "cannot create parent folder");
                break;
            }

            var folder = Folder(folderPath);
            folder.create();
            success = folder.exists;
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws" + err);       
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif  
    return success;
};

$$SHORTCODE$$.path.readFile = function readFile(path, optionalEncoding) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            if (! path) {
                break;
            }

            if (! $$SHORTCODE$$.path.exists(path)) {
                break;
            }

            if (! optionalEncoding || optionalEncoding == $$SHORTCODE$$.C.ENCODING_UTF8) {
                optionalEncoding = "UTF-8";
            }

            var f = File(path);
            f.encoding = optionalEncoding;
            f.open("r");
            retVal = f.read();
            f.close();
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

$$SHORTCODE$$.path.writeFile = function writeFile(path, contents, optionalEncoding) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {
            
            if (! path) {
                break;
            }

            if (! optionalEncoding || optionalEncoding == $$SHORTCODE$$.C.ENCODING_UTF8) {
                optionalEncoding = "UTF-8";
            }

            var f = File(path);
            f.encoding = optionalEncoding;
            f.open("w");
            f.write(contents);
            f.close();

            if (f.exists) {
                retVal = 0;
            }
            else {
                retVal = -1;
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
