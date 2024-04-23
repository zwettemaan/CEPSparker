var LOAD_DEBUG_CRDT_ES;
var CRDT_ES;
var TIGHTENER;
var IS_INDESIGN_SERVER;
//var DEBUG_LIBPATH64_OVERRIDE = "/Users/kris/Documents/Controlled/Rorohiko/TightenerComponents/TightenerDLL/Xcode/Compiled/Debug/TightenerESDLL_x64D.framework";

function getPlatformGlobals() {
    return $.global;
}

var platformGlobals = getPlatformGlobals();
platformGlobals.getPlatformGlobals = getPlatformGlobals;
platformGlobals.defineGlobalObject = function defineGlobalObject(globalName) {
    if (! platformGlobals[globalName]) {
        platformGlobals[globalName] = {};
    }
    return platformGlobals[globalName];
}

if (LOAD_DEBUG_CRDT_ES || "undefined" == typeof(CRDT_ES)) {

    CRDT_ES = function() {

        var scriptFolder = File($.fileName).parent;
        Folder.current = scriptFolder;

        var lib = undefined;
        var isDebug = LOAD_DEBUG_CRDT_ES;
        var configSuffix = (isDebug ? "D" : "R");

        var isWin = (File.fs == "Windows");
        var fileNameExtension = (isWin) ? ".dll" : ".framework";
        var x64Suffix = "_x64";
        var libFileName = "TightenerESDLL";

        var lib64Filename = libFileName + x64Suffix + configSuffix + fileNameExtension;

        var libPath64;
        if (isDebug) {
            if (DEBUG_LIBPATH64_OVERRIDE) {
                libPath64 = DEBUG_LIBPATH64_OVERRIDE;
            }
            else {
                if (isWin) {
                    libPath64 = Folder.current.parent.parent.parent.fsName + "/TightenerDLL/VisualStudio/Compiled/x64/esdlldebug/" + lib64Filename;
                }
                else {
                    libPath64 = Folder.current.parent.parent.parent.fsName + "/TightenerDLL/Xcode/Compiled/Debug/" + lib64Filename;
                }
            }
        }
        else {
            var appSideCRDT_ES = Folder(app.filePath + "/Scripts/CreativeDeveloperTools_ES/");
            if (isWin) {
                libPath64 = appSideCRDT_ES + "win64/" + lib64Filename;
                if (! File(libPath64).exists) {
                    libPath64 = Folder.current.fsName + "\\win64\\" + lib64Filename;
                }
            }
            else {
                libPath64 = appSideCRDT_ES + "mac64/" + lib64Filename;
                if (! File(libPath64).exists) {
                    libPath64 = Folder.current.fsName + "/mac64/" + lib64Filename;
                }
            }
        }

        function tryLib(libPath) {
            var file = new File(libPath);
            var lib = undefined;
            if (file.exists) {
                try {
                    lib = new ExternalObject("lib:" + file.fsName);
                }
                catch (err) {
                }
            }
            return lib;
        }

        // Use previously loaded lib, if any
        lib = CRDT_ES.lib;
        if (! lib) {
            lib = tryLib(libPath64);
            CRDT_ES.lib = lib;
        }

        // Re-enable CRDT_ES (set disable = false) in case it was disabled at the
        // end of the previous script run to protect from
        // ESTK crashes
        if (lib) {
            lib.disable(false);
        }

        TIGHTENER = lib;
        return lib;
    };

}

if (CRDT_ES.isInDesignServer === undefined) {
    CRDT_ES.isInDesignServer = false;
    try {
        if ("serverSettings" in app && app.name.toLowerCase().indexOf("indesign") >= 0) {
            CRDT_ES.isInDesignServer = true;
        }
    }
    catch (err) {}
}

$.global.crdtesDLL = CRDT_ES();
