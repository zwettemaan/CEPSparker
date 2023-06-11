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

    $$SHORTCODE$$.dirs.HOME = 
        $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.os.homedir());

    $$SHORTCODE$$.dirs.TEMP = 
        $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.os.tmpdir());

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

    if ($$SHORTCODE$$.checkMac()) {
        $$SHORTCODE$$.dirs.APPLICATION_SUPPORT = $$SHORTCODE$$.dirs.HOME + "Library/Application Support/"
        $$SHORTCODE$$.dirs.EXTENSIONS = $$SHORTCODE$$.dirs.APPLICATION_SUPPORT + "Adobe/CEP/extensions/";
        $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES = $$SHORTCODE$$.dirs.HOME + "Library/";
        $$SHORTCODE$$.dirs.ADOBE_APPLICATION = "/Applications/Adobe " + $$SHORTCODE$$.C.APP_NAME + " " + $$SHORTCODE$$.C.VERSION_INDESIGN + "/";
    }
    else {
        $$SHORTCODE$$.dirs.APPLICATION_SUPPORT = $$SHORTCODE$$.dirs.HOME + "AppData\\Roaming\\"
        $$SHORTCODE$$.dirs.EXTENSIONS = $$SHORTCODE$$.dirs.APPLICATION_SUPPORT + "Adobe\\CEP\\extensions\\";
        $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES = $$SHORTCODE$$.dirs.APPLICATION_SUPPORT;
        $$SHORTCODE$$.dirs.ADOBE_APPLICATION = "C:\\Program Files\\Adobe\\Adobe " + $$SHORTCODE$$.C.APP_NAME + " " + $$SHORTCODE$$.C.VERSION_INDESIGN + "\\";
    }

    $$SHORTCODE$$.dirs.PREFERENCES = 
        $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES +
        $$SHORTCODE$$.C.DIRNAME_PREFERENCES +
        $$SHORTCODE$$.path.SEPARATOR;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}
