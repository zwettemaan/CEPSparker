//
// This file mirrors the API of jsx/utils.jsx
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

(function() {

$$SHORTCODE$$.getAppScriptList = function getAppScriptList() {

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            var scriptFilePathList = [];

            if (! $$SHORTCODE$$.path.isDir($$SHORTCODE$$.dirs.appScriptsDir)) {
                break;
            }

            var readdirData = window.cep.fs.readdir($$SHORTCODE$$.dirs.appScriptsDir);
            if (readdirData.err) {
                break;
            }

            for (var fileIdx = 0; fileIdx < readdirData.data.length; fileIdx++) {
                var fileName = readdirData.data[fileIdx];
                var extension = $$SHORTCODE$$.path.filenameExtension(fileName);
                if (extension == "jsx" || extension == "js") {
                    scriptFilePathList.push($$SHORTCODE$$.dirs.appScriptsDir + fileName);
                }
            }

            if (scriptFilePathList.length == 0) {
                break;
            }

            retVal = scriptFilePathList;
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
};

<<<<<<< HEAD:Templates/js/utils.js
$$SHORTCODE$$.checkMac = function checkMac() {
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = (window.navigator.platform.substr(0,3).toLowerCase() == "mac");

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

=======
>>>>>>> CEPSparker_v2:Templates/CEP_js/utils.js
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
            
            var chromeLogLine = prefix + message;

            $$SHORTCODE$$.csInterface.evalScript("$$SHORTCODE$$.fetchAccumulatedESTKToChromeConsoleLog()", function(accumulatedESTKToJSLog) {
                if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE) {
                    if (accumulatedESTKToJSLog) {
                        console.log(accumulatedESTKToJSLog);
                    }
                    console.log(chromeLogLine);
                }
            });

            if ($$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                $$SHORTCODE$$.csInterface.evalScript("$.writeln(" + $$SHORTCODE$$.sQ(chromeLogLine) + ");");
            }

            if ($$SHORTCODE$$.S.LOG_TO_FILEPATH) {
                $$SHORTCODE$$.csInterface.evalScript(
                    "(function(){" + 
                      "var f = File(" + $$SHORTCODE$$.sQ($$SHORTCODE$$.S.LOG_TO_FILEPATH) + ");" +
                      "f.encoding = 'UTF-8';" +
                      "f.open('a');" + 
                      "f.writeln(" + $$SHORTCODE$$.sQ(chromeLogLine) + ");" +
                      "f.close();" + 
                    "})();"
                );
            }

        }
        catch (err) {        
        }
    }
    while (false);

    $$SHORTCODE$$.inLogger = savedInLogger;
}

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

})();