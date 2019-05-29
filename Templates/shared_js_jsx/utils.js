//
// This code is shared between CEP/JavaScript and ExtendScript
//

$$SHORTCODE$$.shallowClone = function(obj) 
{
    var retVal = {};
    for (var x in obj) 
    {
        retVal[x] = obj[x];
    }

    return retVal;
}

$$SHORTCODE$$.deepClone = function(obj) 
{
    var retVal;
    if (obj instanceof Array) {
        retVal = [];
    }
    else {
        retVal = {};        
    }
    for (var x in obj) 
    {
        var val = obj[x];
        if (typeof val == "object")
        {
            retVal[x] = $$SHORTCODE$$.deepClone(val);
        }
        else
        {
            retVal[x] = val;
        }
    }

    return retVal;
}

// dQ: Wrap a string in double quotes
$$SHORTCODE$$.dQ = function(s) {
    return '"' + s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r") + '"';
}

// sQ: Wrap a string in single quotes
$$SHORTCODE$$.sQ = function(s) {
    return "'" + s.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n").replace(/\r/g,"\\r") + "'";
}

$$SHORTCODE$$.logError = function(s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_ERROR) {
        $$SHORTCODE$$.logMessage("ERROR  : " + s);
    }
}

$$SHORTCODE$$.logWarning = function(s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_WARN) {
        $$SHORTCODE$$.logMessage("WARNING: " + s);
    }
}

$$SHORTCODE$$.logNote = function(s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_NOTE) {
        $$SHORTCODE$$.logMessage("NOTE   : " + s);
    }
}

$$SHORTCODE$$.logTrace = function(s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_TRACE) {
        $$SHORTCODE$$.logMessage("TRACE  : " + s);
    }
}

