//
// This file mirrors the API of CEP_js/utils.js or shared_js/utils.js
//

var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

$$SHORTCODE$$.appendLineToUTF8TextFile = function(filePath, line) {

    try {
        var textFile = File(filePath);
        textFile.open("a");
        textFile.encoding = "UTF8";
        textFile.writeln(line);
        textFile.close();
    }
    catch (err) {        
    }
}

$$SHORTCODE$$.checkMac = function checkMac() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var retVal = $.os.substr(0,3) == "Mac";

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

if ($$SHORTCODE$$.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG === undefined) {
    $$SHORTCODE$$.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG = "";
}

// Call this from JavaScript side via CSInterface

$$SHORTCODE$$.fetchAccumulatedESTKToChromeConsoleLog = function() {

    var retVal = $$SHORTCODE$$.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG;

    $$SHORTCODE$$.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG = "";

    return retVal;
};

$$SHORTCODE$$.logMessage = function(reportingFunctionArguments, message) {

    var savedInLogger = $$SHORTCODE$$.inLogger;

    do {
        try {

            if ($$SHORTCODE$$.inLogger) {
                break;
            }
            
            $$SHORTCODE$$.inLogger = true;
            
            var prefix = "";

            if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE && $$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                // Make sure we can tell the difference between the message origins
                prefix += "ES>>";
            }

            if (! message) {

                  message = reportingFunctionArguments;
                  reportingFunctionArguments = undefined;

            }
            else if (reportingFunctionArguments) {

                if ("string" == typeof reportingFunctionArguments) {

                    prefix += reportingFunctionArguments + ": ";
                    
                }
                else {

                    var reportingFunctionName;
                    try {
                        reportingFunctionName = reportingFunctionArguments.callee.toString().match(/function ([^\(]+)/)[1];
                    }
                    catch (err) {
                        reportingFunctionName = "[anonymous function]";
                    }
                    prefix += reportingFunctionName + ": ";

                }
            }
            
            var estkLogLine = prefix + message;
                    
            if ($$SHORTCODE$$.S.LOG_TO_FILEPATH) {
                $$SHORTCODE$$.appendLineToUTF8TextFile($$SHORTCODE$$.S.LOG_TO_FILEPATH, estkLogLine);
            }

            if ($$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                $.writeln(estkLogLine); 
            }

            if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE) {

                if ("string" != typeof $$SHORTCODE$$.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG) {
                    $$SHORTCODE$$.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG = "";
                }

                $$SHORTCODE$$.ACCUMULATED_ESTK_TO_CHROME_CONSOLE_LOG += estkLogLine + "\n";
            }

        }
        catch (err) {
        }
    }
    while (false);

    $$SHORTCODE$$.inLogger = savedInLogger;
}

$$SHORTCODE$$.upcast = function upcast(pageItem) {

    var retVal = pageItem;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (! (retVal instanceof PageItem)) {
                break;          
            }

            retVal = pageItem.getElements()[0];
        }
        catch (err) 
        {
            retVal = pageItem;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}
