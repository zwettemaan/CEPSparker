//
// This file contains js code for web browser
//

if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

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
            
            var chromeLogLine = prefix + message;
            console.log(chromeLogLine);
        }
        catch (err) {        
        }
    }
    while (false);

    SPRK.inLogger = savedInLogger;
}

})();