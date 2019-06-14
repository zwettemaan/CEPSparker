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
    
    $$SHORTCODE$$.logEntry(arguments);

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    // toString() handles cases where filepath is an ExtendScript File/Folder object
    var splitPath = filepath.toString().split(separator);
    do {
        var endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    $$SHORTCODE$$.logExit(arguments);

    return endSegment;
};

$$SHORTCODE$$.path.dirname = function dirname(filepath, separator) {
    
    $$SHORTCODE$$.logEntry(arguments);

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

    $$SHORTCODE$$.logExit(arguments);

    return retVal;
};

$$SHORTCODE$$.path.filenameExtension = function filenameExtension(filepath, separator) {
    
    $$SHORTCODE$$.logEntry(arguments);

    var splitName = $$SHORTCODE$$.path.basename(filepath).split(".");
    var extension = "";
    if (splitName.length > 1) {
        extension = splitName.pop();
    }

    var retVal = extension.toLowerCase();

    $$SHORTCODE$$.logExit(arguments);

    return retVal;
};

