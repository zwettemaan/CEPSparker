$$SHORTCODE$$.csInterface = new CSInterface();

function init() {

    getExtendScriptExtensionDirs_PRM().
$if "$$TARGETAPP$$" == "IDSN"
    then(getInDesignInfo_PRM).
$endif
    then(getJavaScriptExtensionDirs_PRM).
    then(getLocale_PRM).
    then(wireUI_PRM).
    then(readPreferences_PRM).
    then(updateUI_PRM);
}

if ($$SHORTCODE$$.S.MANUAL_START_FROM_CHROME) {
    console.log("Running in debug mode. Must call init() from the Chrome console");
}
else {
    init();
}

// ----------------

function closeExtension_PRM() {

    var promise = new Promise(function(resolve, reject) {
        window.__adobe_cep__.closeExtension();
        resolve();
    });

    return promise;

}

function getExtendScriptExtensionDirs_PRM() {

    var promise = new Promise(function(resolve, reject) {
        var script = "JSON.stringify({'home': Folder('~').fsName, 'temp': Folder.temp.fsName })";

        $$SHORTCODE$$.csInterface.evalScript(
            script,
            function(data) { 
                try {
                    var dirs = JSON.parse(data);
                    $$SHORTCODE$$.dirs.homeDir = dirs.home;
                    $$SHORTCODE$$.dirs.tempDir = dirs.temp;
                    resolve();
                } 
                catch (err) {
                    reject();
                }
            }
        );
    });

    return promise;
}

$if "$$TARGETAPP$$" == "IDSN"
function getInDesignInfo_PRM() {

    var promise = new Promise(function(resolve, reject) {
        var script = 'JSON.stringify({ "version": app.version, "serialNumber" : app.serialNumber });';
        $$SHORTCODE$$.csInterface.evalScript(
            script,
            function(data) { 
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
            }
        );
    });

    return promise;
}
$endif

function getJavaScriptExtensionDirs_PRM() {

    var promise = new Promise(function(resolve, reject) {
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
    });

    return promise;
}

function getLocale_PRM() {

    var promise = new Promise(function(resolve, reject) {
        var script = "JSON.stringify({'locale': app.locale })";

        $$SHORTCODE$$.csInterface.evalScript(
            script,
            function(data) { 
                var locale = JSON.parse(data);
                $$SHORTCODE$$.locale = locale;
                resolve();
            }
        );
    });

    return promise;
}

function readPreferences_PRM() {

    var promise = new Promise(function(resolve, reject) {
        var prefsFile = $$SHORTCODE$$.dirs.preferencesDir + TE.C.FILENAME_PREFERENCES;
        var result = cep.fs.readFile(prefsFile, cep.encoding.UTF8);
        setDefaultPreferences();
        if (result.err == cep.fs.NO_ERROR) {
            var loadedPrefs = JSON.parse(result.data);
            for (var key in loadedPrefs) {
                $$SHORTCODE$$.prefs[key] = loadedPrefs[key];
            }
        }
        resolve();
    });

    return promise;
}

function savePreferences_PRM() {

    var promise = new Promise(function(resolve, reject) {

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
    });

    return promise;

}

function setDefaultPreferences() {

    $$SHORTCODE$$.prefs = {};

    /* provide defaults for whatever preferences you want in $$SHORTCODE$$.prefs */
}

function updateUI_PRM() {

    var promise = new Promise(function(resolve, reject) {
        themeManager.init();
// TODO
        resolve();
    });

    return promise;
}

function wireUI_PRM() {

    var promise = new Promise(function(resolve, reject) {
// TODO
        resolve();
    });

    return promise;
}

