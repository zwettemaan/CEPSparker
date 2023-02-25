//
// This code is shared between CEP/JavaScript, ExtendScript and Browser JavaScript
//

if (SPRK.C.PLATFORM == SPRK.C.BROWSER_JAVASCRIPT) {
    SPRK.path.SEPARATOR = "/";
    SPRK.path.OTHER_PLATFORM_SEPARATOR = "\\";
    SPRK.isMac = false;
    SPRK.isWindows = false;
}
else if (SPRK.checkMac()) {
    SPRK.path.SEPARATOR = "/";
    SPRK.path.OTHER_PLATFORM_SEPARATOR = "\\";
    SPRK.isMac = true;
    SPRK.isWindows = false;
}
else {
    SPRK.path.SEPARATOR = "\\";
    SPRK.path.OTHER_PLATFORM_SEPARATOR = "/";
    SPRK.isMac = false;
    SPRK.isWindows = true;
}

if (! SPRK.dirs) {
    SPRK.dirs = {};
}
