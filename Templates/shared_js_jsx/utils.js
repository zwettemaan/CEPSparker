//
// This code is shared between CEP/JavaScript and ExtendScript
//

$$SHORTCODE$$.shallowClone = function shallowClone(obj) 
{

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var retVal = {};
    for (var x in obj) 
    {
        retVal[x] = obj[x];
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

    return retVal;
}

$$SHORTCODE$$.deepClone = function deepClone(obj) 
{
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

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

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

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

$$SHORTCODE$$.logEntry = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Entry");
    }
}

$$SHORTCODE$$.logExit = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Exit");
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

$$SHORTCODE$$.logWarning = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_WARN) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "WARNING: " + s);
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

