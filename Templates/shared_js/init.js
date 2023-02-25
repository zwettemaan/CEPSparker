//
// This code is shared between CEP/JavaScript, ExtendScript and Browser JavaScript
//

if ($$SHORTCODE$$.C.PLATFORM == $$SHORTCODE$$.C.BROWSER_JAVASCRIPT) {
    $$SHORTCODE$$.path.SEPARATOR = "/";
    $$SHORTCODE$$.path.OTHER_PLATFORM_SEPARATOR = "\\";
    $$SHORTCODE$$.isMac = false;
    $$SHORTCODE$$.isWindows = false;
}
else if ($$SHORTCODE$$.checkMac()) {
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
