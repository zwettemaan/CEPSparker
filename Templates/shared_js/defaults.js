//
// This code is shared between CEP/JavaScript and ExtendScript
//

// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.Defaults = {};

$$SHORTCODE$$.Defaults.init = function init(initDefaults) {
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (initDefaults == undefined) {
        retVal = {};
    }
    else {
        retVal = $$SHORTCODE$$.shallowClone(initDefaults);
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}
