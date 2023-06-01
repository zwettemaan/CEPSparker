if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

(function() {

$$SHORTCODE$$.upcast = function upcast(pageItem) {

    var retVal = pageItem;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (! (retVal instanceof PageItem)) {
                break;          
            }

            retVal = pageItem.getElements()[0];
        }
        catch (err) 
        {
            retVal = pageItem;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();