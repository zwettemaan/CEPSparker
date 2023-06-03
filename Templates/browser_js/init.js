if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

$$SHORTCODE$$.C.PLATFORM = $$SHORTCODE$$.C.BROWSER_JAVASCRIPT;

$$SHORTCODE$$.C.TIME_INTERVAL_WAIT_FOR_CODE_MILLISECONDS = 1000;

$$SHORTCODE$$.waitForIFrameToLoad = function waitForIFrameToLoad() {

    if ($$SHORTCODE$$.setupIFrameFromServer) {
        $$SHORTCODE$$.setupIFrameFromServer();
    }
    else {
        setTimeout($$SHORTCODE$$.waitForIFrameToLoad, $$SHORTCODE$$.C.TIME_INTERVAL_WAIT_FOR_CODE_MILLISECONDS);
    }
}

$$SHORTCODE$$.init = function init() {
    window.onload = function $$SHORTCODE$$InitOnLoad(event) {
        setTimeout($$SHORTCODE$$.waitForIFrameToLoad, $$SHORTCODE$$.C.TIME_INTERVAL_WAIT_FOR_CODE_MILLISECONDS);
    };
}

// ----------------

function setupIFrameFromServer() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var promise = new Promise(function setupIFrameFromServerPromise(resolve, reject) {
        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry(arguments);

        $endif

        $$SHORTCODE$$.setupIFrameFromServer();

        resolve();

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);

        $endif
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return promise;

}

$$SHORTCODE$$.init();