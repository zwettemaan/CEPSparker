var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

if (! $$SHORTCODE$$.cepFS) {
    if ("undefined" != typeof cep && cep.fs) {
        $$SHORTCODE$$.cepFS = cep.fs;
    }
    else if ("undefined" != typeof window && window.cep && window.cep.fs) {
        $$SHORTCODE$$.cepFS = window.cep.fs;
    }
}

$$SHORTCODE$$.C.PLATFORM = $$SHORTCODE$$.C.CEP_JAVASCRIPT;
$$SHORTCODE$$.C.DIRECTORY_PATH_INIT_JS   = __dirname;

$$SHORTCODE$$.jsInterface = require("JSInterface");

$$SHORTCODE$$.csInterface = new CSInterface();
$$SHORTCODE$$.hostEnvironment = $$SHORTCODE$$.csInterface.getHostEnvironment();

$$SHORTCODE$$.init = function init() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    $$SHORTCODE$$.csInterface.evalScript(
        "$$SHORTCODE$$.triggerHostScriptJsxLoad()", 
        function() {
            getJavaScriptExtensionDirs_PRM().
            then(initHostScript_PRM).
            then(getInDesignInfo_PRM).
            then(getExtendScriptExtensionDirs_PRM).
            then(getLocale_PRM).
            then(wireUI_PRM).
            then(readPreferences_PRM).
            then(passCollectedInfoToExtendScript_PRM).
            then(savePreferences_PRM).
            then(updateUI_PRM).
            then(jsInterfaceInit_PRM).
            then(runTests_PRM);
        }
    );

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

if ($$SHORTCODE$$.S.MANUAL_START_FROM_CHROME) {
    console.log("Running in debug mode. Must call $$SHORTCODE$$.init() from the Chrome console");
}
else {
    $$SHORTCODE$$.init();
}

function closeExtension_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function closeExtensionPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        $$SHORTCODE$$.csInterface.closeExtension();
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;

}

function getExtendScriptExtensionDirs_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function getExtendScriptExtensionDirsPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        if ($$SHORTCODE$$.hostEnvironment.appId == "DRWV") {
            resolve();
        }
        else {
            var script = "JSON.stringify({'home': Folder('~').fsName, 'temp': Folder.temp.fsName })";

            $$SHORTCODE$$.csInterface.evalScript(
                script,
                function getExtendScriptExtensionDirsCallback(data) { 
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

                    $$SHORTCODE$$.logEntry(arguments);
                    $endif

                    try {
                        var dirs = JSON.parse(data);
                        
                        $$SHORTCODE$$.dirs.HOME = 
                            $$SHORTCODE$$.path.addTrailingSeparator(dirs.home);

                        $$SHORTCODE$$.dirs.TEMP = 
                            $$SHORTCODE$$.path.addTrailingSeparator(dirs.temp);

                        $$SHORTCODE$$.dirs.DOCUMENTS = 
                            $$SHORTCODE$$.dirs.HOME + 
                            "Documents" + 
                            $$SHORTCODE$$.path.SEPARATOR;

                        $$SHORTCODE$$.dirs.ADOBE_SCRIPT = 
                            $$SHORTCODE$$.dirs.DOCUMENTS + 
                            "Adobe Scripts" + 
                            $$SHORTCODE$$.path.SEPARATOR;

                        $$SHORTCODE$$.dirs.APP_SCRIPTS = 
                            $$SHORTCODE$$.dirs.ADOBE_SCRIPT + 
                            $$SHORTCODE$$.C.APP_NAME + 
                            $$SHORTCODE$$.path.SEPARATOR;

                        $$SHORTCODE$$.dirs.PROJECT_ROOT = 
                            File($.fileName).fsName + "/";
                            
                        resolve();
                    } 
                    catch (err) {
                        reject();
                    }

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit(arguments);

                    $endif
                }
            )
        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

$if "$$TARGET_APP$$" == "InDesign"
function getInDesignInfo_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function getInDesignInfoPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        if 
        (
            $$SHORTCODE$$.C.APP_ID != $$SHORTCODE$$.C.APP_CODE_INDESIGN
        &&
            $$SHORTCODE$$.C.APP_ID != $$SHORTCODE$$.C.APP_CODE_INCOPY
        ) {
            resolve();
        }
        else {
            var script = 'JSON.stringify({ "version": app.version, "serialNumber" : app.serialNumber });';
            $$SHORTCODE$$.csInterface.evalScript(
                script,
                function getInDesignInfoCallback(data) { 
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

                    $$SHORTCODE$$.logEntry(arguments);
                    $endif

                    var info = JSON.parse(data);
                    var version = parseInt(info.version.split(".")[0], 10);
                    if (! $$SHORTCODE$$.inDesignInfo) 
                    {
                        $$SHORTCODE$$.inDesignInfo = {};
                    }
                    $$SHORTCODE$$.inDesignInfo.version = "CS" + (version - 2);
                    $$SHORTCODE$$.inDesignInfo.serialNumber = info.serialNumber;

                    $$SHORTCODE$$.inDesignInfo.pluginPath = 
                        $$SHORTCODE$$.dirs.ADOBE_APPLICATION + 
                        "Plug-Ins" +
                        $$SHORTCODE$$.path.SEPARATOR;

                    resolve();

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit(arguments);

                    $endif
                }
            )
        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}
$endif

function getJavaScriptExtensionDirs_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function getJavaScriptExtensionDirsPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        if ($$SHORTCODE$$.DIRECTORY_PATH_INIT_JS) {
            $$SHORTCODE$$.dirs.projectRootDir = $$SHORTCODE$$.searchProjectRoot($$SHORTCODE$$.DIRECTORY_PATH_INIT_JS);
        } 
        else if ("undefined" != __dirname) {
            $$SHORTCODE$$.dirs.projectRootDir = $$SHORTCODE$$.searchProjectRoot(__dirname);
        }

        $$SHORTCODE$$.dirs.EXTENSIONS = 
            $$SHORTCODE$$.path.addTrailingSeparator(
                $$SHORTCODE$$.csInterface.getSystemPath(SystemPath.EXTENSION) +
                    $$SHORTCODE$$.path.SEPARATOR
            );

        $$SHORTCODE$$.dirs.APPLICATION_SUPPORT = 
            $$SHORTCODE$$.path.addTrailingSeparator(
                $$SHORTCODE$$.csInterface.getSystemPath(SystemPath.USER_DATA) +
                    $$SHORTCODE$$.path.SEPARATOR
            );

        if ($$SHORTCODE$$.isMac) {
            $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES = 
                $$SHORTCODE$$.path.dirname($$SHORTCODE$$.dirs.APPLICATION_SUPPORT) +
                    $$SHORTCODE$$.path.SEPARATOR +
                    "Preferences" +
                    $$SHORTCODE$$.path.SEPARATOR;
        }
        else {
            $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES = 
                $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.dirs.APPLICATION_SUPPORT);
        }

        $$SHORTCODE$$.dirs.PREFERENCES = 
            $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES +
            $$SHORTCODE$$.C.DIRNAME_PREFERENCES +
            $$SHORTCODE$$.path.SEPARATOR;

        var applicationDir = $$SHORTCODE$$.csInterface.getSystemPath(SystemPath.HOST_APPLICATION);
        if ($$SHORTCODE$$.isMac) {
            while (
                applicationDir != "" 
            && 
                $$SHORTCODE$$.path.filenameExtension(applicationDir) != "app"
            ) {
                applicationDir = $$SHORTCODE$$.path.dirname(applicationDir);
            }
        }
        applicationDir = $$SHORTCODE$$.path.dirname(applicationDir);

        $$SHORTCODE$$.dirs.ADOBE_APPLICATION = 
            applicationDir + 
            $$SHORTCODE$$.path.SEPARATOR;

        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

function getLocale_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function getLocalePromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        if (
            $$SHORTCODE$$.hostEnvironment.appId == "DRWV"
        ||
            $$SHORTCODE$$.hostEnvironment.appId == "PPRO"
        ||
            $$SHORTCODE$$.hostEnvironment.appId == "AEFT"
        ) {
            resolve();
        }
        else {
            var script = "JSON.stringify({'locale': app.locale.toString() })";

            $$SHORTCODE$$.csInterface.evalScript(
                script,
                function getLocaleCallback(data) { 
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

                    $$SHORTCODE$$.logEntry(arguments);
                    $endif

                    var locale = JSON.parse(data);
                    $$SHORTCODE$$.locale = locale;
                    resolve();

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit(arguments);

                    $endif
                }
            )

        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

function initHostScript_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    // Function mapAppId(): convert short app code to readable app name 
    // Auto-generated from appMap.json data

    $$APP_MAPPER_SCRIPT$$

    $$SHORTCODE$$.C.APP_ID = $$SHORTCODE$$.hostEnvironment.appId;
    $$SHORTCODE$$.C.APP_NAME = mapAppId($$SHORTCODE$$.C.APP_ID);

    var promise = new Promise(function initHostScriptPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        // Convert short code to readable app name based on appMap.json data

        var script = "$$SHORTCODE$$.initHostScript(" + $$SHORTCODE$$.dQ($$SHORTCODE$$.C.APP_ID) + "," + $$SHORTCODE$$.dQ($$SHORTCODE$$.dirs.EXTENSIONS) + ", true)";
        $$SHORTCODE$$.csInterface.evalScript(
            script,
            function initHostScriptCallback() {
                $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

                $$SHORTCODE$$.logEntry(arguments);
                $endif

                resolve();

                $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                $$SHORTCODE$$.logExit(arguments);

                $endif
            }
        );

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

function jsInterfaceInit_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function jsInterfaceInitPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        $$SHORTCODE$$.jsInterface.init();
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}
 
function passCollectedInfoToExtendScript_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function passCollectedInfoToExtendScriptPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        $$SHORTCODE$$.csInterface.evalScript(
            "$$SHORTCODE$$.prefs = JSON.parse(" + $$SHORTCODE$$.sQ(JSON.stringify($$SHORTCODE$$.prefs)) + ");" + 
            "$$SHORTCODE$$.dirs = JSON.parse(" + $$SHORTCODE$$.sQ(JSON.stringify($$SHORTCODE$$.dirs)) + ");",
            function passCollectedInfoToExtendScriptCallback() {
                $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

                $$SHORTCODE$$.logEntry(arguments);
                $endif
                
                resolve();

                $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                $$SHORTCODE$$.logExit(arguments);

                $endif
            });

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

function readPreferences_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function readPreferencesPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        setDefaultPreferences();
        try {
            var prefsFile = $$SHORTCODE$$.dirs.PREFERENCES + $$SHORTCODE$$.C.FILENAME_PREFERENCES;
            var result = cep.fs.readFile(prefsFile, cep.encoding.UTF8);
            if (result.err == cep.fs.NO_ERROR) {
                var loadedPrefs = JSON.parse(result.data);
                for (var key in loadedPrefs) {
                    $$SHORTCODE$$.prefs[key] = loadedPrefs[key];
                }
            }
        }
        catch (err) {
            $$SHORTCODE$$.logWarning(arguments, "throws " + err);
        }
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

function savePreferences_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function savePreferencesPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        var err = cep.fs.NO_ERROR;

        if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.PREFERENCES)) {
            err = $$SHORTCODE$$.path.mkdir($$SHORTCODE$$.dirs.PREFERENCES);
        }

        if (err == cep.fs.NO_ERROR) {
            var prefsFile = $$SHORTCODE$$.dirs.PREFERENCES + $$SHORTCODE$$.C.FILENAME_PREFERENCES;
            var jsonPrefs = JSON.stringify($$SHORTCODE$$.prefs);       
            var result = cep.fs.writeFile(prefsFile, jsonPrefs, cep.encoding.UTF8);
            err = result.err;
        }
        
        if (err == cep.fs.NO_ERROR) {
            resolve();
        }
        else {
            reject(result.err);
        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;

}

function setDefaultPreferences() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! $$SHORTCODE$$.prefs) {
        $$SHORTCODE$$.prefs = {};
    }

    /* provide defaults for whatever preferences you want in $$SHORTCODE$$.prefs */

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

function runTests_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function runTests(resolve, reject) {

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry(arguments);
        $endif

        if (! $$SHORTCODE$$.S.RUN_TESTS) {
            resolve();
        }
        else {
            
            var combinedTestResults = "";

            $$SHORTCODE$$.logNote(arguments, "Start tests - test results (if any) follow");

            $$SHORTCODE$$.crossRunScript(
                "$$SHORTCODE$$.pushLogLevel($$SHORTCODE$$.C.LOG_NONE)",
                function() {
            
                    var testResults = $$SHORTCODE$$.runTests();
                    if (testResults) {
                        combinedTestResults += "CEP/JS tests:\n" + testResults + "\n";
                    }
                    else {
                        combinedTestResults += "CEP/JS tests: nothing to report\n";
                    }
                    
                    $$SHORTCODE$$.csInterface.evalScript(
                        "$$SHORTCODE$$.runTests()", 
                        function extendScriptTestResultsCallback(testResults) {
        
                            if (testResults) {
                                combinedTestResults += "ExtendScript Tests:\n" + testResults + "\n";
                            }
                            else {
                                combinedTestResults += "ExtendScript Tests: nothing to report\n";
                            }
        
                            $$SHORTCODE$$.crossRunScript(
                                "$$SHORTCODE$$.popLogLevel()",
                                function restoreLogLevel() {                
                                    
                                    $$SHORTCODE$$.logNote(arguments, combinedTestResults);
                                    $$SHORTCODE$$.logNote(arguments, "Completed tests");      

                                    resolve();
                                }
                            );
                        }
                    );
                }
            )            
        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);
        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

function updateUI_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function updateUIPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry(arguments);
        $endif

$if "$$STARTERCODE$$" == "ScriptRunner"
$include "scriptRunner_updateUI.ijs"    
$endif
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);
        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

function wireUI_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function wireUIPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

        $$SHORTCODE$$.logEntry(arguments);
        $endif

        themeManager.init();

        // $$SHORTCODE$$.csInterface.resizeContent($$PANELWIDTH$$, $$PANELHEIGHT$$);
$if "$$STARTERCODE$$" == "ImageBrowser"
$include "imageBrowser.ijs"    
$endif
$if "$$STARTERCODE$$" == "IFrameUIServer"
$include "iFrameUIClient.ijs"    
$endif
$if "$$STARTERCODE$$" == "ScriptRunner"
$include "scriptRunner_wireUI.ijs"        
$endif
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif       
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;
}

