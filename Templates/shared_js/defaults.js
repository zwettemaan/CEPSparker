//
// This code is shared between CEP/JavaScript and ExtendScript
//

var xGlobal = {}; if ("undefined" != typeof global) { xGlobal = global; } else if ("undefined" != typeof $) { xGlobal = $.global; }
if (! xGlobal.$$SHORTCODE$$) {
    xGlobal.$$SHORTCODE$$ = {};
}
var $$SHORTCODE$$ = xGlobal.$$SHORTCODE$$;

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
