$$SHORTCODE$$.csInterface = new CSInterface();
$$SHORTCODE$$.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());

function init() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    getJavaScriptExtensionDirs_PRM().
    then(initHostScript_PRM).
    then(getInDesignInfo_PRM).
    then(getExtendScriptExtensionDirs_PRM).
    then(getLocale_PRM).
    then(wireUI_PRM).
    then(readPreferences_PRM).
    then(passCollectedInfoToExtendScript_PRM).
    then(savePreferences_PRM).
    then(updateUI_PRM);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif
}

if ($$SHORTCODE$$.S.MANUAL_START_FROM_CHROME) {
    console.log("Running in debug mode. Must call init() from the Chrome console");
}
else {
    init();
}

// ----------------

function closeExtension_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("closeExtension_PRM callback");
        $endif

        window.__adobe_cep__.closeExtension();
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("closeExtension_PRM callback");
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

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("getExtendScriptExtensionDirs_PRM callback");
        $endif

        if ($$SHORTCODE$$.hostEnvironment.appId == "DRWV") {
            resolve();
        }
        else {
            var script = "JSON.stringify({'home': Folder('~').fsName, 'temp': Folder.temp.fsName })";

            $$SHORTCODE$$.csInterface.evalScript(
                script,
                function(data) { 
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logEntry("getExtendScriptExtensionDirs_PRM evalScript callback");
                    $endif

                    try {
                        var dirs = JSON.parse(data);
                        $$SHORTCODE$$.dirs.homeDir = dirs.home;
                        $$SHORTCODE$$.dirs.tempDir = dirs.temp;
                        resolve();
                    } 
                    catch (err) {
                        reject();
                    }

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit("getExtendScriptExtensionDirs_PRM evalScript callback");
                    $endif
                }
            )
        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("getExtendScriptExtensionDirs_PRM callback");
        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif
    return promise;
}

function getInDesignInfo_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("getInDesignInfo_PRM callback");
        $endif

        if ($$SHORTCODE$$.hostEnvironment.appId != "IDSN") {
            resolve();
        }
        else {
            var script = 'JSON.stringify({ "version": app.version, "serialNumber" : app.serialNumber });';
            $$SHORTCODE$$.csInterface.evalScript(
                script,
                function(data) { 
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logEntry("getInDesignInfo_PRM evalScript callback");
                    $endif

                    var info = JSON.parse(data);
                    var version = parseInt(info.version.split(".")[0], 10);
                    if (! $$SHORTCODE$$.inDesignInfo) 
                    {
                        $$SHORTCODE$$.inDesignInfo = {};
                    }
                    $$SHORTCODE$$.inDesignInfo.version = "CS" + (version - 2);
                    $$SHORTCODE$$.inDesignInfo.serialNumber = info.serialNumber;
                    var applicationDir = $$SHORTCODE$$.csInterface.getSystemPath(SystemPath.HOST_APPLICATION);
                    if ($$SHORTCODE$$.isMac) {
                        while (applicationDir != "" && $$SHORTCODE$$.path.filenameExtension(applicationDir) != "app") {
                            applicationDir = $$SHORTCODE$$.path.dirname(applicationDir);
                        }
                    }
                    applicationDir = $$SHORTCODE$$.path.dirname(applicationDir);
                    $$SHORTCODE$$.inDesignInfo.pluginPath = applicationDir + "/Plug-Ins";
                    resolve();

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit("getInDesignInfo_PRM evalScript callback");
                    $endif
                }
            )
        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("getInDesignInfo_PRM callback");
        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif
    return promise;
}

function getJavaScriptExtensionDirs_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("getJavaScriptExtensionDirs_PRM callback");
        $endif

        $$SHORTCODE$$.dirs.extensionDir = $$SHORTCODE$$.csInterface.getSystemPath(SystemPath.EXTENSION) + "/";
        $$SHORTCODE$$.dirs.appSupportDir = $$SHORTCODE$$.csInterface.getSystemPath(SystemPath.USER_DATA) + "/";
        if ($$SHORTCODE$$.isMac) {
            $$SHORTCODE$$.dirs.systemPreferencesDir = $$SHORTCODE$$.path.dirname($$SHORTCODE$$.dirs.appSupportDir) + "/Preferences/";
        }
        else {
            $$SHORTCODE$$.dirs.systemPreferencesDir = $$SHORTCODE$$.dirs.appSupportDir;
        }
        $$SHORTCODE$$.dirs.preferencesDir = $$SHORTCODE$$.dirs.systemPreferencesDir + $$SHORTCODE$$.C.DIRNAME_PREFERENCES + "/";
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("getJavaScriptExtensionDirs_PRM callback");
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

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("getLocale_PRM callback");
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
                function(data) { 
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logEntry("getLocale_PRM evalScript callback");
                    $endif

                    var locale = JSON.parse(data);
                    $$SHORTCODE$$.locale = locale;
                    resolve();

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit("getLocale_PRM evalScript callback");
                    $endif
                }
            )

        }

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("getLocale_PRM callback");
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

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("initHostScript_PRM callback");
        $endif

        var script = "$$SHORTCODE$$.initHostScript(" + $$SHORTCODE$$.dQ($$SHORTCODE$$.dirs.extensionDir) + ")";
        $$SHORTCODE$$.csInterface.evalScript(
            script,
            resolve
        );

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("initHostScript_PRM callback");
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

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("passCollectedInfoToExtendScript_PRM callback");
        $endif

        $$SHORTCODE$$.csInterface.evalScript(
            "$$SHORTCODE$$.prefs = JSON.parse(" + $$SHORTCODE$$.sQ(JSON.stringify($$SHORTCODE$$.prefs)) + ");" + 
            "$$SHORTCODE$$.dirs = JSON.parse(" + $$SHORTCODE$$.sQ(JSON.stringify($$SHORTCODE$$.dirs)) + ");",
            function() {

                $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                $$SHORTCODE$$.logEntry("passCollectedInfoToExtendScript_PRM evalScript callback");
                $endif
                
                resolve();

                $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                $$SHORTCODE$$.logExit("passCollectedInfoToExtendScript_PRM evalScript callback");
                $endif
            });

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("passCollectedInfoToExtendScript_PRM callback");
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

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("readPreferences_PRM callback");
        $endif

        setDefaultPreferences();
        try {
            var prefsFile = $$SHORTCODE$$.dirs.preferencesDir + $$SHORTCODE$$.C.FILENAME_PREFERENCES;
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
        $$SHORTCODE$$.logExit("readPreferences_PRM callback");
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

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("savePreferences_PRM callback");
        $endif

        var err = cep.fs.NO_ERROR;

        if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.preferencesDir)) {
            err = $$SHORTCODE$$.path.mkdir($$SHORTCODE$$.dirs.preferencesDir);
        }

        if (err == cep.fs.NO_ERROR) {
            var prefsFile = $$SHORTCODE$$.dirs.preferencesDir + $$SHORTCODE$$.C.FILENAME_PREFERENCES;
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
        $$SHORTCODE$$.logExit("savePreferences_PRM callback");
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

function updateUI_PRM() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("updateUI_PRM callback");
        $endif

        themeManager.init();
// TODO
        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("updateUI_PRM callback");
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

    var promise = new Promise(function(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry("wireUI_PRM callback");
        $endif

$if "$$STARTERCODE$$" == "ImageBrowser"

$include "imageBrowser.ijs"
        
$endif

$if "$$STARTERCODE$$" == "ScriptRunner"

$include "scriptRunner.ijs"
        
$endif

        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit("wireUI_PRM callback");
        $endif       
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif
    return promise;
}
