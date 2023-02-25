if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

if (! SPRK.C) {
    SPRK.C = {};
}

SPRK.C.PLATFORM = SPRK.C.BROWSER_JAVASCRIPT;

SPRK.C.TIME_INTERVAL_WAIT_FOR_CODE_MILLISECONDS = 1000;

SPRK.waitForIFrameToLoad = function waitForIFrameToLoad() {

    if (SPRK.setupIFrameFromServer) {
        SPRK.setupIFrameFromServer();
    }
    else {
        setTimeout(SPRK.waitForIFrameToLoad, SPRK.C.TIME_INTERVAL_WAIT_FOR_CODE_MILLISECONDS);
    }
}

SPRK.init = function init() {
    window.onload = function SPRKInitOnLoad(event) {
        setTimeout(SPRK.waitForIFrameToLoad, SPRK.C.TIME_INTERVAL_WAIT_FOR_CODE_MILLISECONDS);
    };
}

// ----------------

function setupIFrameFromServer() {

    var promise = new Promise(function setupIFrameFromServerPromise(resolve, reject) {

        SPRK.setupIFrameFromServer();

        resolve();

    });

    return promise;

}

})();

SPRK.init();