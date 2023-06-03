if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

if (! $$SHORTCODE$$.os) {
    $$SHORTCODE$$.os = require('os');
}

if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = require('path');
}

if (! $$SHORTCODE$$.url) {
    $$SHORTCODE$$.url = require('url');
}

$$SHORTCODE$$.DIRECTORY_PATH_INIT_JS = __dirname;

$$SHORTCODE$$.C.PLATFORM = $$SHORTCODE$$.C.NODE_JAVASCRIPT;

// TODO needs to be a parameter on the command line
$$SHORTCODE$$.C.APP_NAME = "InDesign";
$$SHORTCODE$$.C.VERSION_INDESIGN = "2023";

$$SHORTCODE$$.init = function init() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif
    
    if (! $$SHORTCODE$$.dirs) {
        $$SHORTCODE$$.dirs = {};
    }

    if (! $$SHORTCODE$$.dirs.projectRootDir) {
        if ($$SHORTCODE$$.DIRECTORY_PATH_INIT_JS) {
            $$SHORTCODE$$.dirs.projectRootDir = $$SHORTCODE$$.searchProjectRoot($$SHORTCODE$$.DIRECTORY_PATH_INIT_JS);
        } 
        else if ("undefined" != __dirname) {
            $$SHORTCODE$$.dirs.projectRootDir = $$SHORTCODE$$.searchProjectRoot(__dirname);
        }
    }

    $$SHORTCODE$$.dirs.homeDir = 
        $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.os.homedir());

    $$SHORTCODE$$.dirs.tempDir = 
        $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.os.tmpdir());

    $$SHORTCODE$$.dirs.documentsDir = 
        $$SHORTCODE$$.dirs.homeDir + 
        "Documents" + 
        $$SHORTCODE$$.path.SEPARATOR;

    $$SHORTCODE$$.dirs.adobeScriptsDir = 
        $$SHORTCODE$$.dirs.documentsDir + 
        "Adobe Scripts" + 
        $$SHORTCODE$$.path.SEPARATOR;

    $$SHORTCODE$$.dirs.appScriptsDir = 
        $$SHORTCODE$$.dirs.adobeScriptsDir + 
        $$SHORTCODE$$.C.APP_NAME + 
        $$SHORTCODE$$.path.SEPARATOR;

    if ($$SHORTCODE$$.checkMac()) {
        $$SHORTCODE$$.dirs.appSupportDir = $$SHORTCODE$$.dirs.homeDir + "Library/Application Support/"
        $$SHORTCODE$$.dirs.extensionDir = $$SHORTCODE$$.dirs.appSupportDir + "Adobe/CEP/extensions/";
        $$SHORTCODE$$.dirs.systemPreferencesDir = $$SHORTCODE$$.dirs.homeDir + "Library/";
        $$SHORTCODE$$.dirs.applicationDir = "/Applications/Adobe " + $$SHORTCODE$$.C.APP_NAME + " " + $$SHORTCODE$$.C.VERSION_INDESIGN + "/";
    }
    else {
        $$SHORTCODE$$.dirs.appSupportDir = $$SHORTCODE$$.dirs.homeDir + "AppData\\Roaming\\"
        $$SHORTCODE$$.dirs.extensionDir = $$SHORTCODE$$.dirs.appSupportDir + "Adobe\\CEP\\extensions\\";
        $$SHORTCODE$$.dirs.systemPreferencesDir = $$SHORTCODE$$.dirs.appSupportDir;
        $$SHORTCODE$$.dirs.applicationDir = "C:\\Program Files\\Adobe\\Adobe " + $$SHORTCODE$$.C.APP_NAME + " " + $$SHORTCODE$$.C.VERSION_INDESIGN + "\\";
    }

    $$SHORTCODE$$.dirs.preferencesDir = 
        $$SHORTCODE$$.dirs.systemPreferencesDir +
        $$SHORTCODE$$.C.DIRNAME_PREFERENCES +
        $$SHORTCODE$$.path.SEPARATOR;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}
