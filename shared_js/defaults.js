//
// This code is shared between CEP/JavaScript and ExtendScript
//

// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function(){

SPRK.Defaults = {};

SPRK.Defaults.init = function init(initDefaults) {
    var retVal;

    if (initDefaults == undefined) {
        retVal = {};
    }
    else {
        retVal = SPRK.shallowClone(initDefaults);
    }

    return retVal;
}

})();