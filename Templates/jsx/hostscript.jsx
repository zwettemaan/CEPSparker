$if "$$TARGET_APP$$" == "InDesign"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif
$if "$$TARGET_APP$$" == "Bridge"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif

function getPlatformGlobals() {
    return window;
}

var platformGlobals = getPlatformGlobals();
platformGlobals.getPlatformGlobals = getPlatformGlobals;
platformGlobals.defineGlobalObject = function defineGlobalObject(globalName) {
    if (! platformGlobals[globalName]) {
        platformGlobals[globalName] = {};
    }
    return platformGlobals[globalName];
}

var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

$$SHORTCODE$$.C.CSS_ROOT                                 = "/css"
$$SHORTCODE$$.C.JS_ROOT                                  = "/js"
$$SHORTCODE$$.C.SHARED_JS_ROOT                           = "/id_js"
$$SHORTCODE$$.C.SHARED_JS_JSX_ROOT                       = "/id_js_jsx"
$$SHORTCODE$$.C.BROWSER_JAVASCRIPT                       = "Browser JavaScript";
$$SHORTCODE$$.C.CEP_JAVASCRIPT                           = "CEP JavaScript";
$$SHORTCODE$$.C.EXTENDSCRIPT                             = "ExtendScript";
$$SHORTCODE$$.C.NODE_JAVASCRIPT                          = "Node JavaScript";

$$SHORTCODE$$.C.PLATFORM                                 = $$SHORTCODE$$.C.EXTENDSCRIPT;

//@include "CreativeDeveloperTools_ES/crdtesDLLLoader.jsx"
//@include "CreativeDeveloperTools_ES/crdtes.jsx"

crdtes.evalScript("json2.jsx", $.fileName);
crdtes.evalScript("JSInterface.jsx", $.fileName);

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
        crdtes.evalScript(scriptPath, extensionDir + "/dummy.jsx");
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


$$SHORTCODE$$.triggerHostScriptJsxLoad = function triggerHostScriptJsxLoad() {
    return true;
}

$if "$$STARTERCODE$$" == "ImageBrowser"

//@include "imageBrowser.jsx"

$endif

