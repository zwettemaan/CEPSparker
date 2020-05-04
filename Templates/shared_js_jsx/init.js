//
// This code is shared between CEP/JavaScript and ExtendScript
//

if ($$SHORTCODE$$.checkMac()) {
    $$SHORTCODE$$.path.SEPARATOR = "/";
    $$SHORTCODE$$.path.OTHER_PLATFORM_SEPARATOR = "\\";
    $$SHORTCODE$$.isMac = true;
    $$SHORTCODE$$.isWindows = false;
}
else {
    $$SHORTCODE$$.path.SEPARATOR = "\\";
    $$SHORTCODE$$.path.OTHER_PLATFORM_SEPARATOR = "/";
    $$SHORTCODE$$.isMac = false;
    $$SHORTCODE$$.isWindows = true;
}

if (! $$SHORTCODE$$.dirs) {
    $$SHORTCODE$$.dirs = {};
}
