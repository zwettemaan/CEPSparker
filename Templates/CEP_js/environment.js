function getPlatformGlobals() {
    return global;
}

var platformGlobals = getPlatformGlobals();
platformGlobals.getPlatformGlobals = getPlatformGlobals;
platformGlobals.defineGlobalObject = function defineGlobalObject(globalName) {
    if (! platformGlobals[globalName]) {
        platformGlobals[globalName] = {};
    }
    return platformGlobals[globalName];
}

var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

$$SHORTCODE$$.C.CSS_ROOT                                 = "../css"
$$SHORTCODE$$.C.JS_ROOT                                  = "../CEP_js"
$$SHORTCODE$$.C.SHARED_JS_ROOT                           = "../shared_js"
$$SHORTCODE$$.C.SHARED_JS_JSX_ROOT                       = "../shared_js_jsx"

$$SHORTCODE$$.C.BROWSER_JAVASCRIPT                       = "Browser JavaScript";
$$SHORTCODE$$.C.CEP_JAVASCRIPT                           = "CEP JavaScript";
$$SHORTCODE$$.C.EXTENDSCRIPT                             = "ExtendScript";
$$SHORTCODE$$.C.NODE_JAVASCRIPT                          = "Node JavaScript";

$$SHORTCODE$$.C.PLATFORM                                 = $$SHORTCODE$$.C.CEP_JAVASCRIPT;