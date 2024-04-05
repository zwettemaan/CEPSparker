$if "$$TARGET_APP$$" == "InDesign"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif
$if "$$TARGET_APP$$" == "Bridge"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif

var app;

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

$$SHORTCODE$$.C.PLATFORM = $$SHORTCODE$$.C.EXTENDSCRIPT;

//@include "json2.jsx"
//@include "JSInterface.jsx", 

$$SHORTCODE$$.LOG_CRITICAL_ERRORS = false;

$$SHORTCODE$$.relativeFilePathsToLoad = [
    "shared_js_jsx/globals.js",
    "shared_js_jsx/tweakableSettings.js",
    "shared_js_jsx/Tests/utils_Test.js",
    "shared_js_jsx/utils.js",
    "jsx/utils.jsx",
    "shared_js_jsx/pathUtils.js",
    "jsx/pathUtils.jsx",
    "shared_js_jsx/protectedObject.js",
    "shared_js_jsx/tests.js",
    "shared_js_jsx/init.js",
    "jsx/init.jsx"
];

$$SHORTCODE$$.idsnOnlyRelativeFilePathsToLoad = [
        "jsx/idUtils.jsx"
];

$$SHORTCODE$$.errorBeforeLoggingAvailable = function(error) {

    if ($$SHORTCODE$$.logError) {
        $$SHORTCODE$$.logError(error);
    }
    else if ($$SHORTCODE$$.LOG_CRITICAL_ERRORS) {

        try {

            var f = File(Folder.desktop + "/criticalErrors.log");
            f.open("a");
            f.writeln(error);
            f.close();

        }
        catch (err) {

            try {
                console.log(error);
            }
            catch (err) {   
            }

        }
    }
}

$$SHORTCODE$$.loadScript = function(extensionDir, scriptPath, appId) {

    if (appId) {
        $$SHORTCODE$$.C.APP_ID = appId;
    }

    try {
        var fullPath = extensionDir + scriptPath;
        if (appId == "DRWV") {
            var script = DWfile.read(fullPath);
            eval(script);
        }
        else if ($$SHORTCODE$$.C.APP_ID == $$SHORTCODE$$.C.APP_CODE_INDESIGN || $$SHORTCODE$$.C.APP_ID == $$SHORTCODE$$.C.APP_CODE_INCOPY) {
            var file = File(fullPath);
            app.doScript(file, ScriptLanguage.JAVASCRIPT, [], UndoModes.FAST_ENTIRE_SCRIPT);
        }
        else {
            var file = File(fullPath);
            file.open("r");
            var script = file.read();
            file.close();
            eval(script);
        }
    }
    catch (err) {           
        $$SHORTCODE$$.errorBeforeLoggingAvailable("hostscript.jsx loadScript throws " + err + " for " + fullPath);  
    }
}

$$SHORTCODE$$.initHostScript = function initHostScript(appId, extensionDir, disableTests) {

    for (var idx = 0; idx < $$SHORTCODE$$.relativeFilePathsToLoad.length; idx++) {
        var filePath = $$SHORTCODE$$.relativeFilePathsToLoad[idx];
        $$SHORTCODE$$.loadScript(extensionDir, filePath, appId);
    }

    if (appId == $$SHORTCODE$$.C.APP_CODE_INDESIGN || appId == $$SHORTCODE$$.C.APP_CODE_INCOPY) {
        for (var idx = 0; idx < $$SHORTCODE$$.idsnOnlyRelativeFilePathsToLoad.length; idx++) {
            var filePath = $$SHORTCODE$$.idsnOnlyRelativeFilePathsToLoad[idx];
            $$SHORTCODE$$.loadScript(extensionDir, filePath, appId);
        }
    }

    if ($$SHORTCODE$$.S.RUN_TESTS && ! disableTests) {

        $.writeln("Start tests - test results (if any) follow:\n");

        var testResults = $$SHORTCODE$$.runTests();
        if (testResults) $.writeln(testResults);

        $.writeln("Completed tests");    
    }

}


$if "$$STARTERCODE$$" == "ImageBrowser"

//@include "imageBrowser.jsx"

$endif

