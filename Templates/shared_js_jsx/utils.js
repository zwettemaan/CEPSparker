//
// This code is shared between CEP/JavaScript and ExtendScript
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.CANONICAL_NUMBER_DIGITS            = 10;
$$SHORTCODE$$.CANONICAL_GUID_DIGITS              = 32;
$$SHORTCODE$$.FORMATTED_GUID_SEGMENTS            = [8,4,4,4,12];
$$SHORTCODE$$.FORMATTED_GUID_SEGMENT_SEPARATOR   = "-";
$$SHORTCODE$$.PLACEHOLDER_START                  = "{";
$$SHORTCODE$$.PLACEHOLDER_END                    = "}";

$$SHORTCODE$$.canonicalGUID = function canonicalGUID(guid) {

    var retVal = "";
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            if (guid == "") {
                break;
            }
            
            guid = "" + guid;
            var canonicalGUID = "";
            for (var charIdx = 0; charIdx < guid.length; charIdx++) {
                var c = guid.charAt(charIdx);
                if (c >= 'A' && c <= 'F')
                {
                    c = c.toLowerCase();
                    canonicalGUID += c;
                }
                else if (c >= 'a' && c <= 'f')
                {
                    canonicalGUID += c;
                }
                else if (c >= '0' && c <= '9')
                {
                    canonicalGUID += c;
                }                        
            }

            if (canonicalGUID.length < $$SHORTCODE$$.CANONICAL_GUID_DIGITS)
            {
                $$SHORTCODE$$.logNote(arguments, "should have 32 hex digits");
                break;
            }

            // Strip off anything beyond 32
            canonicalGUID = canonicalGUID.substr(0, $$SHORTCODE$$.CANONICAL_GUID_DIGITS);

            retVal = canonicalGUID;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + e);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;        
}

$$SHORTCODE$$.canonicalNumber = function canonicalNumber(input) {
    // Platform-independent notation for numbers

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            var type = typeof input;
            if (type != "number") {
                $$SHORTCODE$$.logError(arguments, "incorrect type");
                break;
            }

            var canonicalValue = input;
            var isNegative = canonicalValue < 0;

            if (isNegative) {
                canonicalValue = -canonicalValue;
            }

            var isInt = Math.floor(canonicalValue) == canonicalValue;

            var power = 0;

            if (! isInt) {
                while (canonicalValue >= 1.0) {
                    canonicalValue = canonicalValue / 10.0;
                    power++;
                }
                while (canonicalValue < 0.1) {
                    canonicalValue = canonicalValue * 10.0;
                    power--;
                }
            }

            retVal = "";
            if (isNegative) {
                retVal += "-";
            }

            if (isInt) {
                retVal += canonicalValue;
            }
            else {
                retVal += "0.";
                for (var digitIdx = 0; digitIdx < $$SHORTCODE$$.CANONICAL_NUMBER_DIGITS; digitIdx++) {
                    canonicalValue *= 10.0;
                    var digit = Math.floor(canonicalValue);
                    canonicalValue -= digit;
                    retVal += digit;
                }
                retVal += "e" + power;
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

$$SHORTCODE$$.deepClone = function deepClone(obj) {

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {
            
            if ("object" != typeof obj) {
                retVal = obj;
                break;
            }

            if (! obj) {
                retVal = obj;
                break;
            }

            var clone;
            if (obj instanceof Array) {
                clone = [];
            }
            else {
                clone = {};        
            }

            for (var x in obj) 
            {
                var val = obj[x];
                if (typeof val == "object")
                {
                    clone[x] = $$SHORTCODE$$.deepClone(val);
                }
                else
                {
                    clone[x] = val;
                }
            }

            retVal = clone;
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

/**
 * Wrap a string in double quotes, which is handy to pass a string through CSInterface
 * or JSInterface.
 * If `a = 'a"a\''`, then `$$SHORTCODE$$.dQ(a)` is `"a\\"a'"` and `eval($$SHORTCODE$$.dQ(a)) == a`
 * We can send `$$SHORTCODE$$.dQ(a)` through an interface, and at the other end, execute `eval()` on the
 * data to reconstitute the original string `a`
 * 
 * @function $$SHORTCODE$$.dQ
 * 
 * @param {string} s - The string we want to double quote
 * @return A string prefixed and suffixed with double quotes, which we can eval() back to s
 */

$$SHORTCODE$$.dQ = function(s) {
    return '"' + s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r") + '"';
}

$$SHORTCODE$$.endsWith = function(hayStack, needle) {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    try {
        retVal = hayStack.substr(- needle.length) == needle;
    }
    catch (err) {
        $$SHORTCODE$$.logError(arguments, "throws " + err);
    }
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.formattedGUID = function formattedGUID(guid) {

    var retVal = "";
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            guid = $$SHORTCODE$$.canonicalGUID(guid);
            if (guid == "") {
                break;
            }
            
            retVal = "";
            for (var idx = $$SHORTCODE$$.FORMATTED_GUID_SEGMENTS.length - 1; idx >= 0; idx--) {
                var segmentLength = $$SHORTCODE$$.FORMATTED_GUID_SEGMENTS[idx];
                var segment = guid.substr(- segmentLength); 
                guid = guid.substr(0, guid.length - segmentLength);
                if (retVal == "") {
                    retVal = segment;
                }
                else {
                    retVal = segment + $$SHORTCODE$$.FORMATTED_GUID_SEGMENT_SEPARATOR + retVal;
                }
            }
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + e);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;   
}

$$SHORTCODE$$.jsEqual = function jsEqual(obj1, obj2) {

    var retVal = true;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {
            
            if (obj1 == obj2) {
                break;
            }

            if (typeof obj1 != typeof obj2) {
                retVal = false;
                break;
            }

            if ("object" != typeof obj1) {
                retVal = false;
                break;
            }

            for (var x in obj1) 
            {
                if (! (x in obj2)) {
                    retVal = false;
                    break;
                }
            }

            if (! retVal) {
                break;
            }

            for (var x in obj2) 
            {
                if (! (x in obj1)) {
                    retVal = false;
                    break;
                }
            }

            if (! retVal) {
                break;
            }

            for (var x in obj1) 
            {
                if (! $$SHORTCODE$$.jsEqual(obj1[x], obj2[x])) {
                    retVal = false;
                    break;
                }
            }

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $$SHORTCODE$$.logExit(arguments);

    return retVal;
}

$$SHORTCODE$$.logEntry = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Entry");
    }
}

$$SHORTCODE$$.logError = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_ERROR) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "ERROR  : " + s);
    }
}

$$SHORTCODE$$.logExit = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Exit");
    }
}

$$SHORTCODE$$.logNote = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_NOTE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "NOTE   : " + s);
    }
}

$$SHORTCODE$$.logTrace = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_TRACE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "TRACE  : " + s);
    }
}

$$SHORTCODE$$.logWarning = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_WARN) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "WARNING: " + s);
    }
}

$$SHORTCODE$$.objectEqual = function objectEqual(obj1, obj2) {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            var obj1Type = typeof obj1;
            var obj2Type = typeof obj2;
            if (obj1Type != obj2Type) {
                break;
            }

            if (obj1 == obj2) {
                retVal = true;
                break;
            }

            if (typeof obj1 != "object") {
                break;
            }

            // Array [...] and Object {...} can be considered 'equal' - we mimic
            // more or less what PHP does
            var retVal = true;
            for (var prop1 in obj1) {
                if (! prop1 in obj2) {
                    retVal = false;
                    break;
                }
            }
            if (! retVal) {
                break;
            }

            for (var prop2 in obj2) {
                if (! prop2 in obj1) {
                    retVal = false;
                    break;
                }
            }
            if (! retVal) {
                break;
            }

            for (var prop in obj1) {
                if (! objectEqual(obj1[prop], obj2[prop])) {
                    retVal = false;
                    break;
                }
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

$$SHORTCODE$$.padLeft = function padLeft(s, c, len) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            if (len <= 0) {
                retVal = "";
                break;
            }

            retVal = s + "";
            while (retVal.length < len) {
                retVal = c + retVal;
            }

            retVal = retVal.substr(retVal.length - len);
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + e);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.padRight = function padRight(s, c, len) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            if (len <= 0) {
                retVal = "";
                break;
            }

            retVal = s + "";
            while (retVal.length < len) {
                retVal += c;
            }

            retVal = retVal.substr(0, len);
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + e);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.randomGUID = function randomGUID() {

    var retVal = ""
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    try {
        for (var wordIdx = 0; wordIdx < 8; wordIdx++) {
            var r = Math.round(Math.random() * 65536);
            var r = $$SHORTCODE$$.toHex(r,4);
            retVal = retVal + r;
            if (wordIdx >= 1 && wordIdx <= 4) {
                retVal = retVal + "-";
            }
        }
    }
    catch (err) {
        $$SHORTCODE$$.logError(arguments, "throws " + err);
    }
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.resolvePlaceholders = function resolvePlaceholders(map, obj) {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            if ("object" != typeof map) {
                $$SHORTCODE$$.logError(arguments, "need map");
                break;
            }

            if ("object" != typeof obj) {
                $$SHORTCODE$$.logError(arguments, "need obj");
                break;
            }

            var clone;
            if (obj instanceof Array) {
                clone = [];
            }
            else {
                clone = {};        
            }

            for (var x in obj) 
            {
                var val = obj[x];
                var mappedX = replacePlaceholders(map, x);
                var valType = typeof val;
                if (valType == "object")
                {
                    clone[mappedX] = $$SHORTCODE$$.resolvePlaceholders(map, val);
                }
                else if (valType == "string")
                {
                    clone[mappedX] = replacePlaceholders(map, val);
                }
                else {
                    clone[mappedX] = val;
                }
            }

            retVal = clone;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + e);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;

    function replacePlaceholders(map, s) {

        var retVal;
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif
    
        do {
    
            try {
    
                var inName = false;
                var endPos = -1;
                for (var pos = s.length - 1; pos >= 0; pos--) {
                    var c = s.charAt(pos);
                    if (! inName) {
                        if (c == $$SHORTCODE$$.PLACEHOLDER_END) {
                            inName = true;
                            endPos = -1;
                        }
                    }
                    else {
                        if (c == $$SHORTCODE$$.PLACEHOLDER_START) {
                            inName = false;
                            if (endPos >= 0) {
                                var placeholder = s.substr(pos + 1, endPos - pos);
                                if (placeholder in map) {
                                    var replacement = map[placeholder];
                                    s = s.substr(0, pos) + replacement + s.substr(endPos + 2);
                                }
                            }
                        }
                        else {
                            if (endPos < 0) {
                                endPos = pos;
                            }
                        }
                    }
                }     

                retVal = s;   
            }
            catch (err)
            {
                $$SHORTCODE$$.logError(arguments, "throws " + e);
            }
        }
        while (false);

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
        return retVal;
    }
}

$$SHORTCODE$$.shallowClone = function shallowClone(obj) {

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if ("object" != typeof obj) {
                retVal = obj;
                break;
            }

            if (! obj) {
                retVal = obj;
                break;
            }

            var clone;
            if (obj instanceof Array) {
                clone = [];
            }
            else {
                clone = {};        
            }

            for (var x in obj) 
            {
                clone[x] = obj[x];
            }

            retVal = clone;
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

// sQ: Wrap a string in single quotes
$$SHORTCODE$$.sQ = function(s) {
    return "'" + s.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n").replace(/\r/g,"\\r") + "'";
}

$$SHORTCODE$$.startsWith = function(hayStack, needle) {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    try {
        retVal = hayStack.substr(0, needle.length) == needle;
    }
    catch (err) {
        $$SHORTCODE$$.logError(arguments, "throws " + err);
    }
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.toHex = function toHex(value, numDigits) {

    var retVal = "";
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    try {
        var c;
        while (numDigits > 0) {
            var nibble = (value % 16) >>> 0;
            var value = (value >>> 4);
            if (nibble < 10) {
                var c = String.fromCharCode(nibble + 48);
            }
            else {
                c = String.fromCharCode(nibble + 55);
            }
            numDigits--;
            retVal = c + retVal;
        }
    }
    catch (err) {
        $$SHORTCODE$$.logError(arguments, "throws " + err);
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}
