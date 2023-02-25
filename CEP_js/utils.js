//
// This file mirrors the API of jsx/utils.jsx
//

if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

SPRK.getAppScriptList = function getAppScriptList() {

    var retVal;

    do {
        try {

            var scriptFilePathList = [];

            if (! SPRK.path.isDir(SPRK.dirs.appScriptsDir)) {
                break;
            }

            var readdirData = window.cep.fs.readdir(SPRK.dirs.appScriptsDir);
            if (readdirData.err) {
                break;
            }

            for (var fileIdx = 0; fileIdx < readdirData.data.length; fileIdx++) {
                var fileName = readdirData.data[fileIdx];
                var extension = SPRK.path.filenameExtension(fileName);
                if (extension == "jsx" || extension == "js") {
                    scriptFilePathList.push(SPRK.dirs.appScriptsDir + fileName);
                }
            }

            if (scriptFilePathList.length == 0) {
                break;
            }

            retVal = scriptFilePathList;
        }
        catch (err) {
           SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

    return retVal;
};

SPRK.logMessage = function(reportingFunctionArguments, message) {

   var savedInLogger = SPRK.inLogger;

    do {
        try {

            if (SPRK.inLogger) {
                break;
            }

            SPRK.inLogger = true;
            
            var prefix = "";

            if (SPRK.S.LOG_TO_CHROME_CONSOLE && SPRK.S.LOG_TO_ESTK_CONSOLE) {
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

            SPRK.csInterface.evalScript("SPRK.fetchAccumulatedESTKToChromeConsoleLog()", function(accumulatedESTKToJSLog) {
                if (SPRK.S.LOG_TO_CHROME_CONSOLE) {
                    if (accumulatedESTKToJSLog) {
                        console.log(accumulatedESTKToJSLog);
                    }
                    console.log(chromeLogLine);
                }
            });

            if (SPRK.S.LOG_TO_ESTK_CONSOLE) {
                SPRK.csInterface.evalScript("$.writeln(" + SPRK.sQ(chromeLogLine) + ");");
            }

            if (SPRK.S.LOG_TO_FILEPATH) {
                SPRK.csInterface.evalScript(
                    "(function(){" + 
                      "var f = File(" + SPRK.sQ(SPRK.S.LOG_TO_FILEPATH) + ");" +
                      "f.encoding = 'UTF-8';" +
                      "f.open('a');" + 
                      "f.writeln(" + SPRK.sQ(chromeLogLine) + ");" +
                      "f.close();" + 
                    "})();"
                );
            }

        }
        catch (err) {        
        }
    }
    while (false);

    SPRK.inLogger = savedInLogger;
}

SPRK.setPhotoshopPersistent = function setPhotoshopPersistent(in_isPersistent) {      

    if (in_isPersistent) {
        var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
    } else {
        var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
    }
    
    event.extensionId = SPRK.C.EXTENSION_ID;

    SPRK.csInterface.dispatchEvent(event);

}

})();