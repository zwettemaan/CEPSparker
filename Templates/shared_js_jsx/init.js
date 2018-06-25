if ($$SHORTCODE$$.checkMac()) {
	$$SHORTCODE$$.path.SEPARATOR = "/";
    $$SHORTCODE$$.isMac = true;
    $$SHORTCODE$$.isWindows = false;
}
else {
	$$SHORTCODE$$.path.SEPARATOR = "\\";
    $$SHORTCODE$$.isMac = false;
    $$SHORTCODE$$.isWindows = true;
}

$$SHORTCODE$$.dirs = {};
