if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

if (! SPRK.C) {
    SPRK.C = {};
}

if (! SPRK.cepFS) {
    if ("undefined" != typeof cep && cep.fs) {
        SPRK.cepFS = cep.fs;
    }
    else if ("undefined" != typeof window && window.cep && window.cep.fs) {
        SPRK.cepFS = window.cep.fs;
    }
}

SPRK.C.PLATFORM = SPRK.C.CEP_JAVASCRIPT;
SPRK.C.DIRECTORY_PATH_INIT_JS   = __dirname;

SPRK.jsInterface = require("JSInterface");

SPRK.csInterface = new CSInterface();
SPRK.hostEnvironment = SPRK.csInterface.getHostEnvironment();

SPRK.init = function init() {

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
    then(jsInterfaceInit_PRM);

}

if (SPRK.S.MANUAL_START_FROM_CHROME) {
    console.log("Running in debug mode. Must call init() from the Chrome console");
}
else {
    SPRK.init();
}

function closeExtension_PRM() {

    var promise = new Promise(function closeExtensionPromise(resolve, reject) {

        SPRK.csInterface.closeExtension();
        resolve();

    });

    return promise;

}

function getExtendScriptExtensionDirs_PRM() {

    var promise = new Promise(function getExtendScriptExtensionDirsPromise(resolve, reject) {

        if (SPRK.hostEnvironment.appId == "DRWV") {
            resolve();
        }
        else {
            var script = "JSON.stringify({'home': Folder('~').fsName, 'temp': Folder.temp.fsName })";

            SPRK.csInterface.evalScript(
                script,
                function getExtendScriptExtensionDirsCallback(data) { 

                    try {
                        var dirs = JSON.parse(data);
                        
                        SPRK.dirs.homeDir = 
                            SPRK.path.addTrailingSeparator(dirs.home);

                        SPRK.dirs.tempDir = 
                            SPRK.path.addTrailingSeparator(dirs.temp);

                        SPRK.dirs.documentsDir = 
                            SPRK.dirs.homeDir + 
                            "Documents" + 
                            SPRK.path.SEPARATOR;

                        SPRK.dirs.adobeScriptsDir = 
                            SPRK.dirs.documentsDir + 
                            "Adobe Scripts" + 
                            SPRK.path.SEPARATOR;

                        SPRK.dirs.appScriptsDir = 
                            SPRK.dirs.adobeScriptsDir + 
                            SPRK.C.APP_NAME + 
                            SPRK.path.SEPARATOR;

                        resolve();
                    } 
                    catch (err) {
                        reject();
                    }

                }
            )
        }

    });

    return promise;
}

function getInDesignInfo_PRM() {

    var promise = new Promise(function getInDesignInfoPromise(resolve, reject) {

        if 
        (
            SPRK.C.APP_ID != SPRK.C.APP_CODE_INDESIGN
        &&
            SPRK.C.APP_ID != SPRK.C.APP_CODE_INCOPY
        ) {
            resolve();
        }
        else {
            var script = 'JSON.stringify({ "version": app.version, "serialNumber" : app.serialNumber });';
            SPRK.csInterface.evalScript(
                script,
                function getInDesignInfoCallback(data) { 

                    var info = JSON.parse(data);
                    var version = parseInt(info.version.split(".")[0], 10);
                    if (! SPRK.inDesignInfo) 
                    {
                        SPRK.inDesignInfo = {};
                    }
                    SPRK.inDesignInfo.version = "CS" + (version - 2);
                    SPRK.inDesignInfo.serialNumber = info.serialNumber;

                    SPRK.inDesignInfo.pluginPath = 
                        SPRK.dirs.applicationDir + 
                        "Plug-Ins" +
                        SPRK.path.SEPARATOR;

                    resolve();

                }
            )
        }

    });

    return promise;
}

function getJavaScriptExtensionDirs_PRM() {

    var promise = new Promise(function getJavaScriptExtensionDirsPromise(resolve, reject) {

        if (SPRK.DIRECTORY_PATH_INIT_JS) {
            SPRK.dirs.projectRootDir = SPRK.searchProjectRoot(SPRK.DIRECTORY_PATH_INIT_JS);
        } 
        else if ("undefined" != __dirname) {
            SPRK.dirs.projectRootDir = SPRK.searchProjectRoot(__dirname);
        }

        SPRK.dirs.extensionDir = 
            SPRK.path.addTrailingSeparator(
                SPRK.csInterface.getSystemPath(SystemPath.EXTENSION) +
                    SPRK.path.SEPARATOR
            );

        SPRK.dirs.appSupportDir = 
            SPRK.path.addTrailingSeparator(
                SPRK.csInterface.getSystemPath(SystemPath.USER_DATA) +
                    SPRK.path.SEPARATOR
            );

        if (SPRK.isMac) {
            SPRK.dirs.systemPreferencesDir = 
                SPRK.path.dirname(SPRK.dirs.appSupportDir) +
                    SPRK.path.SEPARATOR +
                    "Preferences" +
                    SPRK.path.SEPARATOR;
        }
        else {
            SPRK.dirs.systemPreferencesDir = 
                SPRK.path.addTrailingSeparator(SPRK.dirs.appSupportDir);
        }

        SPRK.dirs.preferencesDir = 
            SPRK.dirs.systemPreferencesDir +
            SPRK.C.DIRNAME_PREFERENCES +
            SPRK.path.SEPARATOR;

        var applicationDir = SPRK.csInterface.getSystemPath(SystemPath.HOST_APPLICATION);
        if (SPRK.isMac) {
            while (
                applicationDir != "" 
            && 
                SPRK.path.filenameExtension(applicationDir) != "app"
            ) {
                applicationDir = SPRK.path.dirname(applicationDir);
            }
        }
        applicationDir = SPRK.path.dirname(applicationDir);

        SPRK.dirs.applicationDir = 
            applicationDir + 
            SPRK.path.SEPARATOR;

        resolve();

    });

    return promise;
}

function getLocale_PRM() {

    var promise = new Promise(function getLocalePromise(resolve, reject) {

        if (
            SPRK.hostEnvironment.appId == "DRWV"
        ||
            SPRK.hostEnvironment.appId == "PPRO"
        ||
            SPRK.hostEnvironment.appId == "AEFT"
        ) {
            resolve();
        }
        else {
            var script = "JSON.stringify({'locale': app.locale.toString() })";

            SPRK.csInterface.evalScript(
                script,
                function getLocaleCallback(data) { 

                    var locale = JSON.parse(data);
                    SPRK.locale = locale;
                    resolve();

                }
            )

        }

    });

    return promise;
}

function initHostScript_PRM() {

    // Function mapAppId(): convert short app code to readable app name 
    // Auto-generated from appMap.json data

    function mapAppId(appId) {var retVal;switch (appId) {case "KBRG":retVal = "Bridge";break;case "DRWV":retVal = "Dreamweaver";break;case "AICY":retVal = "InCopy";break;case "IDSN":retVal = "InDesign";break;case "ILST":retVal = "Illustrator";break;case "PHXS":case "PHSH":retVal = "Photoshop";break;case "PPRO":retVal = "Premiere Pro";break;}return retVal;}

    SPRK.C.APP_ID = SPRK.hostEnvironment.appId;
    SPRK.C.APP_NAME = mapAppId(SPRK.C.APP_ID);

    var promise = new Promise(function initHostScriptPromise(resolve, reject) {

        // Convert short code to readable app name based on appMap.json data

        var script = "SPRK.initHostScript(" + SPRK.dQ(SPRK.C.APP_ID) + "," + SPRK.dQ(SPRK.dirs.extensionDir) + ")";
        SPRK.csInterface.evalScript(
            script,
            function initHostScriptCallback() {

                resolve();

            }
        );

    });

    return promise;
}

function jsInterfaceInit_PRM() {

    var promise = new Promise(function jsInterfaceInitPromise(resolve, reject) {

        SPRK.jsInterface.init();
        resolve();

    });

    return promise;
}
 
function passCollectedInfoToExtendScript_PRM() {

    var promise = new Promise(function passCollectedInfoToExtendScriptPromise(resolve, reject) {

        SPRK.csInterface.evalScript(
            "SPRK.prefs = JSON.parse(" + SPRK.sQ(JSON.stringify(SPRK.prefs)) + ");" + 
            "SPRK.dirs = JSON.parse(" + SPRK.sQ(JSON.stringify(SPRK.dirs)) + ");",
            function passCollectedInfoToExtendScriptCallback() {
                
                resolve();

            });

    });

    return promise;
}

function readPreferences_PRM() {

    var promise = new Promise(function readPreferencesPromise(resolve, reject) {

        setDefaultPreferences();
        try {
            var prefsFile = SPRK.dirs.preferencesDir + SPRK.C.FILENAME_PREFERENCES;
            var result = cep.fs.readFile(prefsFile, cep.encoding.UTF8);
            if (result.err == cep.fs.NO_ERROR) {
                var loadedPrefs = JSON.parse(result.data);
                for (var key in loadedPrefs) {
                    SPRK.prefs[key] = loadedPrefs[key];
                }
            }
        }
        catch (err) {
            SPRK.logWarning(arguments, "throws " + err);
        }
        resolve();

    });

    return promise;
}

function savePreferences_PRM() {

    var promise = new Promise(function savePreferencesPromise(resolve, reject) {

        var err = cep.fs.NO_ERROR;

        if (! SPRK.path.exists(SPRK.dirs.preferencesDir)) {
            err = SPRK.path.mkdir(SPRK.dirs.preferencesDir);
        }

        if (err == cep.fs.NO_ERROR) {
            var prefsFile = SPRK.dirs.preferencesDir + SPRK.C.FILENAME_PREFERENCES;
            var jsonPrefs = JSON.stringify(SPRK.prefs);       
            var result = cep.fs.writeFile(prefsFile, jsonPrefs, cep.encoding.UTF8);
            err = result.err;
        }
        
        if (err == cep.fs.NO_ERROR) {
            resolve();
        }
        else {
            reject(result.err);
        }

    });

    return promise;

}

function setDefaultPreferences() {

    if (! SPRK.prefs) {
        SPRK.prefs = {};
    }

    /* provide defaults for whatever preferences you want in SPRK.prefs */

}

function updateUI_PRM() {

    var promise = new Promise(function updateUIPromise(resolve, reject) {

        resolve();

    });

    return promise;
}

function wireUI_PRM() {

    var promise = new Promise(function wireUIPromise(resolve, reject) {

        themeManager.init();

        // SPRK.csInterface.resizeContent(570, 600);
SPRK.setupIFrameInCEPPanel();

        resolve();

    });

    return promise;
}

})();