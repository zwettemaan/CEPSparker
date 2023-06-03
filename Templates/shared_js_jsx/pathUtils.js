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

$$SHORTCODE$$.path.addTrailingSeparator = function addTrailingSeparator(filePath, separator) {

    var retVal = filePath;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! filePath) {
            break;            
        }

        var lastChar = filePath.substr(-1);        
        if (lastChar == $$SHORTCODE$$.path.SEPARATOR || lastChar == $$SHORTCODE$$.path.OTHER_PLATFORM_SEPARATOR) {
            break;
        }

        if (! separator) {
            separator = $$SHORTCODE$$.path.SEPARATOR;
        }

        retVal += separator;
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.basename = function basename(filePath, separator) {    

    var endSegment;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    // toString() handles cases where filePath is an ExtendScript File/Folder object
    var splitPath = filePath.toString().split(separator);
    do {
        endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return endSegment;
};

$$SHORTCODE$$.path.dirname = function dirname(filePath, separator) {    

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    // toString() handles cases where filePath is an ExtendScript File/Folder object
    var splitPath = filePath.toString().split(separator);
    do {
        var endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    retVal = splitPath.join(separator);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.filenameExtension = function filenameExtension(filePath, separator) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var splitName = $$SHORTCODE$$.path.basename(filePath).split(".");
    var extension = "";
    if (splitName.length > 1) {
        extension = splitName.pop();
    }

    retVal = extension.toLowerCase();

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.stripTrailingSeparator = function stripTrailingSeparator(filePath, separator) {    

    var retVal = filePath;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! filePath) {
            break;            
        }

        var lastChar = filePath.substr(-1);        
        if (! separator) {
            if (lastChar == $$SHORTCODE$$.path.SEPARATOR || lastChar == $$SHORTCODE$$.path.OTHER_PLATFORM_SEPARATOR) {
                retVal = filePath.substr(0, filePath.length - 1); 
            }
        }
        else {
            if (lastChar == separator) {
                retVal = filePath.substr(0, filePath.length - 1); 
            }
        }

    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

