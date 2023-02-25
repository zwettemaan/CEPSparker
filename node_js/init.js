if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

if (! SPRK.C) {
    SPRK.C = {};
}

if (! SPRK.os) {
    SPRK.os = require('os');
}

if (! SPRK.path) {
    SPRK.path = require('path');
}

if (! SPRK.url) {
    SPRK.url = require('url');
}

SPRK.DIRECTORY_PATH_INIT_JS = __dirname;

SPRK.C.PLATFORM = SPRK.C.NODE_JAVASCRIPT;

// TODO needs to be a parameter on the command line
SPRK.C.APP_NAME = "InDesign";
SPRK.C.VERSION_INDESIGN = "2023";

SPRK.init = function init() {
    
    if (! SPRK.dirs) {
        SPRK.dirs = {};
    }

    if (! SPRK.dirs.projectRootDir) {
        if (SPRK.DIRECTORY_PATH_INIT_JS) {
            SPRK.dirs.projectRootDir = SPRK.searchProjectRoot(SPRK.DIRECTORY_PATH_INIT_JS);
        } 
        else if ("undefined" != __dirname) {
            SPRK.dirs.projectRootDir = SPRK.searchProjectRoot(__dirname);
        }
    }

    SPRK.dirs.homeDir = 
        SPRK.path.addTrailingSeparator(SPRK.os.homedir());

    SPRK.dirs.tempDir = 
        SPRK.path.addTrailingSeparator(SPRK.os.tmpdir());

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

    if (SPRK.checkMac()) {
        SPRK.dirs.appSupportDir = SPRK.dirs.homeDir + "Library/Application Support/"
        SPRK.dirs.extensionDir = SPRK.dirs.appSupportDir + "Adobe/CEP/extensions/";
        SPRK.dirs.systemPreferencesDir = SPRK.dirs.homeDir + "Library/";
        SPRK.dirs.applicationDir = "/Applications/Adobe " + SPRK.C.APP_NAME + " " + SPRK.C.VERSION_INDESIGN + "/";
    }
    else {
        SPRK.dirs.appSupportDir = SPRK.dirs.homeDir + "AppData\\Roaming\\"
        SPRK.dirs.extensionDir = SPRK.dirs.appSupportDir + "Adobe\\CEP\\extensions\\";
        SPRK.dirs.systemPreferencesDir = SPRK.dirs.appSupportDir;
        SPRK.dirs.applicationDir = "C:\\Program Files\\Adobe\\Adobe " + SPRK.C.APP_NAME + " " + SPRK.C.VERSION_INDESIGN + "\\";
    }

    SPRK.dirs.preferencesDir = 
        SPRK.dirs.systemPreferencesDir +
        SPRK.C.DIRNAME_PREFERENCES +
        SPRK.path.SEPARATOR;

}


})();