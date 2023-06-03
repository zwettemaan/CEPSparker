//
// This file contains js code shared between web browser and CEP panel
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.crypto) {
    $$SHORTCODE$$.crypto = require('crypto');
}
    
$$SHORTCODE$$.hashString = function hashString(s) {    

    // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = 
        $$SHORTCODE$$.crypto.createHmac('sha256', $$SHORTCODE$$.S.SALT_HASH).
        update(s.toString()).
        digest('hex');

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}
