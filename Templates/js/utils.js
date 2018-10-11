//
// This file mirrors the API of jsx/utils.jsx
//

$$SHORTCODE$$.checkMac = function() {
	return (window.navigator.platform.substr(0,3).toLowerCase() == "mac");
};

$$SHORTCODE$$.logMessage = function(message) {

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

// For Adobe Illustrator; debuggable replacement for CSInterface.evalScript

$$SHORTCODE$$.evalScript_AI_DEBUG = function(script, callback, timeoutMS) {

    do {

        if (! timeoutMS) {            
            timeoutMS = $$SHORTCODE$$.S.AI_DEFAULT_SCRIPT_DEBUG_TIMEOUT_MS;
        }
        
        var applicationPath = $$SHORTCODE$$.csInterface.getSystemPath(SystemPath.HOST_APPLICATION);
        if (! $$SHORTCODE$$.path.exists(applicationPath)) {
            $$SHORTCODE$$.logError("evalScript_AI_DEBUG: cannot find Illustrator app");
            break;
        }        
        if ($$SHORTCODE$$.isMac) {
            while (applicationPath != "" && $$SHORTCODE$$.path.filenameExtension(applicationPath) != "app") {
                applicationPath = $$SHORTCODE$$.path.dirname(applicationPath);
            }
        }

        var sessionGUID = $$SHORTCODE$$.newGuid();
        var tmpScriptPath = $$SHORTCODE$$.S.AI_SCRIPT_DEBUG_TMPFILE_PREFIX + sessionGUID + ".js";
        var tmpOutputPath = $$SHORTCODE$$.S.AI_SCRIPT_DEBUG_TMPFILE_PREFIX + sessionGUID + ".json";
        var result = cep.fs.writeFile(tmpScriptPath, script, cep.encoding.UTF8);
        if (result.err !== cep.fs.NO_ERROR) {
            $$SHORTCODE$$.logError("evalScript_AI_DEBUG: cannot write script to temp file");
            break;
        }

        var commandFile = $$SHORTCODE$$.dirs.extensionDir + $$SHORTCODE$$.S.AI_SCRIPT_DEBUG_COMMAND_MAC;
        var command = '"' + commandFile + '" "' + tmpScriptPath + '" "' + applicationPath + '" "' + tmpOutputPath + '"';
        result = cep.process.createProcess(
            "/bin/bash",
            "-c",
            command);
        if (result.err !== cep.fs.NO_ERROR) {
            $$SHORTCODE$$.logError("evalScript_AI_DEBUG: cannot launch script");
            break;
        }

        var now = new Date();
        var nowMS = now.getTime();
        var whenTimeoutMS = nowMS + timeoutMS; 

        var waitForScriptToDisappear = function() {
            now = new Date();
            nowMS = now.getTime();
            if (
                ! $$SHORTCODE$$.path.exists(tmpScriptPath)
            ) {
                var data = undefined;
                if ($$SHORTCODE$$.path.exists(tmpOutputPath)) {
                    result = window.cep.fs.readFile(tmpOutputPath);
                    if (result.err === cep.fs.NO_ERROR) {
                        data = result.data;
                    }
                    else {
                        $$SHORTCODE$$.logError("evalScript_AI_DEBUG: no output");
                    }
                    result = cep.fs.deleteFile(tmpOutputPath);
                    if (result.err !== cep.fs.NO_ERROR) {
                        $$SHORTCODE$$.logError("evalScript_AI_DEBUG: failed to delete old output");
                    }
                }
                if (callback) {
                    callback(data);
                }
            }
            else if (
                nowMS < whenTimeoutMS
            ) {
                setTimeout(
                    waitForScriptToDisappear,
                    $$SHORTCODE$$.S.AI_SCRIPT_DEBUG_SLEEP_MS);
            }
            else {
                $$SHORTCODE$$.logError("evalScript_AI_DEBUG: timed out waiting for tmp script to disappear");
            }
        };

        var waitForOutputToAppear = function() {
            now = new Date();
            nowMS = now.getTime();
            if (
                $$SHORTCODE$$.path.exists(tmpOutputPath)
            ) {
                setTimeout(
                    waitForScriptToDisappear,
                    $$SHORTCODE$$.S.AI_SCRIPT_DEBUG_SLEEP_MS);
            }
            else if (
                nowMS < whenTimeoutMS
            ) {
                setTimeout(
                    waitForOutputToAppear,
                    $$SHORTCODE$$.S.AI_SCRIPT_DEBUG_SLEEP_MS);
            }
            else {
                $$SHORTCODE$$.logWarning("evalScript_AI_DEBUG: timed out waiting for output to appear");
                setTimeout(
                    waitForScriptToDisappear,
                    $$SHORTCODE$$.S.AI_SCRIPT_DEBUG_SLEEP_MS);
            }
        };

        setTimeout(
            waitForOutputToAppear,
            0);

    }
    while (false);

}