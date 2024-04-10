//
// This file contains Node/JS-specific js code - used for testing from the command line
//

var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

if (! $$SHORTCODE$$.os) {
    $$SHORTCODE$$.os = require('os');
}

if (! $$SHORTCODE$$.nodeFS) {
    $$SHORTCODE$$.nodeFS = require('fs');
}

$$SHORTCODE$$.checkMac = function checkMac() {
    
    // Overrides the definition in shared_js/utils.js when running from node.js command line

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = $$SHORTCODE$$.os.platform() === 'darwin';
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.logMessage = function(reportingFunctionArguments, message) {

   var savedInLogger = $$SHORTCODE$$.inLogger;

    do {
        try {

            if ($$SHORTCODE$$.inLogger) {
                break;
            }

            $$SHORTCODE$$.inLogger = true;
            
            var prefix = "";

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
            
            var consoleLogLine = prefix + message;
            console.log(consoleLogLine);
            
            if ($$SHORTCODE$$.nodeFS && $$SHORTCODE$$.S.LOG_TO_FILEPATH) {
                try {
                    $$SHORTCODE$$.nodeFS.writeFileSync(
                        $$SHORTCODE$$.S.LOG_TO_FILEPATH, 
                        consoleLogLine,
                        {
                            flag: 'a+',
                            encoding: 'utf8'
                        }
                    );
                } catch(err) {
                }                
            }            
        }
        catch (err) {        
        }
    }
    while (false);

    $$SHORTCODE$$.inLogger = savedInLogger;
}

