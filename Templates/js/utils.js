//
// This file mirrors the API of jsx/utils.jsx
//

$$SHORTCODE$$.checkMac = function checkMac() {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var retVal = (window.navigator.platform.substr(0,3).toLowerCase() == "mac");

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif

	return retVal;
};

$$SHORTCODE$$.setPhotoshopPersistent = function setPhotoshopPersistent(in_isPersistent) {
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (in_isPersistent) {
        var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
    } else {
        var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
    }
    
    event.extensionId = $$SHORTCODE$$.C.EXTENSION_ID;

    $$SHORTCODE$$.csInterface.dispatchEvent(event);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif
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

            if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE && $$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                // Make sure we can tell the difference between the message origins
                prefix += "JS>>";
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
            
            if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE) {
                console.log(prefix + message);
            }

            if ($$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                $$SHORTCODE$$.csInterface.evalScript("$.writeln('" + $$SHORTCODE$$.sQ(prefix + message) + "');");
            }
        }
        catch (err) {        
        }
    }
    while (false);

    $$SHORTCODE$$.inLogger = savedInLogger;
}
