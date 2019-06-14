//
// This code is shared between CEP/JavaScript and ExtendScript
//

// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = {};
}

$$SHORTCODE$$.path.basename = function basename(filepath, separator) {
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    // toString() handles cases where filepath is an ExtendScript File/Folder object
    var splitPath = filepath.toString().split(separator);
    do {
        var endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

    return endSegment;
};

$$SHORTCODE$$.path.dirname = function dirname(filepath, separator) {
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    // toString() handles cases where filepath is an ExtendScript File/Folder object
    var splitPath = filepath.toString().split(separator);
    do {
        var endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    var retVal = splitPath.join(separator);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

    return retVal;
};

$$SHORTCODE$$.path.filenameExtension = function filenameExtension(filepath, separator) {
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var splitName = $$SHORTCODE$$.path.basename(filepath).split(".");
    var extension = "";
    if (splitName.length > 1) {
        extension = splitName.pop();
    }

    var retVal = extension.toLowerCase();

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

    return retVal;
};

