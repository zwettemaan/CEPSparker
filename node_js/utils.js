//
// This file contains Node/JS-specific js code - used for testing from the command line
//

if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

if (! SPRK.os) {
    SPRK.os = require('os');
}

if (! SPRK.nodeFS) {
    SPRK.nodeFS = require('fs');
}

SPRK.checkMac = function checkMac() {
    
    // Overrides the definition in shared_js/utils.js when running from node.js command line

    var retVal;

    retVal = SPRK.os.platform() === 'darwin';
    
    return retVal;
}

SPRK.logMessage = function(reportingFunctionArguments, message) {

   var savedInLogger = SPRK.inLogger;

    do {
        try {

            if (SPRK.inLogger) {
                break;
            }

            SPRK.inLogger = true;
            
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
            
            if (SPRK.nodeFS && SPRK.S.LOG_TO_FILEPATH) {
                try {
                    SPRK.nodeFS.writeFileSync(
                        SPRK.S.LOG_TO_FILEPATH, 
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

    SPRK.inLogger = savedInLogger;
}

})();