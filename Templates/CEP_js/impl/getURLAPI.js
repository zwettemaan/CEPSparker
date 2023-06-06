//
// Low-level REST API implementation for JavaScript
//
// This API is implemented in JavaScript, and the ExtendScript implementation
// uses JSInterface to call on the JavaScript implementation
//
// This file contains the actual implementation of the API, as well as mock
// implementations.
// 

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.impl) {
    $$SHORTCODE$$.impl = {};
}

if (! $$SHORTCODE$$.impl.getURLAPI) {
    $$SHORTCODE$$.impl.getURLAPI = {};
}

// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState

var EVENT_READY_STATE_CHANGE = "readystatechange";

var READY_STATE_UNSENT           = 0;
var READY_STATE_OPENED           = 1;
var READY_STATE_HEADERS_RECEIVED = 2;
var READY_STATE_LOADING          = 3;
var READY_STATE_DONE             = 4;

var METHOD_GET                   = "GET";
var METHOD_POST                  = "POST";

var HEADER_AUTHORIZATION         = "Authorization";
var HEADER_CONTENT_TYPE          = "Content-Type";

var HEADER_CONTENT_TYPE_JSON     = "application/json;charset=UTF-8";

$$SHORTCODE$$.impl.getURLAPI.getURL = function getURL(url, authorization, completedCallback) { 

    var error;

    var finallyCallback = completedCallback;

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
        
            xhr.addEventListener(
                EVENT_READY_STATE_CHANGE, 
                handleReadyStateChange);

            xhr.open(METHOD_GET, url);
        
            xhr.setRequestHeader(HEADER_AUTHORIZATION, authorization);

            finallyCallback = undefined;
            xhr.send();
        }
        catch (err) {
            error = "throws " + err;
        }
    }
    while (false);

    if (error) {
        $$SHORTCODE$$.logError(arguments, error);
    }

    if (finallyCallback) {
        finallyCallback(error, undefined);
    }

    $$SHORTCODE$$.logExit(arguments);

    //-- 

    function handleReadyStateChange() {

        if (this.readyState === READY_STATE_DONE) {

            var error;
            var retVal;
    
            var finallyCallback = completedCallback;

            try {
                var replyDataJSON = this.responseText;
                retVal = JSON.parse(replyDataJSON);
            }
            catch (err) {
                retVal = undefined;
                error = "returned replyData for url " + url + " is probably not JSON. Returned replyData is " + replyDataJSON;
            }

            if (finallyCallback) {
                finallyCallback(error, retVal);
            }
        }

        $$SHORTCODE$$.logExit(arguments);    
    }    

}

$$SHORTCODE$$.impl.getURLAPI.postURL = function postURL(url, authorization, postData, completedCallback) { 

    var error;

    var finallyCallback = completedCallback;

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
        
            xhr.addEventListener(
                EVENT_READY_STATE_CHANGE,
                handleReadyStateChange);

            xhr.open(METHOD_POST, url);
            if (authorization) {
                xhr.setRequestHeader(HEADER_AUTHORIZATION, authorization);
            }
            xhr.setRequestHeader(HEADER_CONTENT_TYPE, HEADER_CONTENT_TYPE_JSON);

            var postDataJSON = "";
            if (postData) {
                postDataJSON = JSON.stringify(postData);
            }

            finallyCallback = undefined;
            xhr.send(postDataJSON);
        }
        catch (err) {
            error = "throws " + err;
        }
    }
    while (false);

    if (error) {
        $$SHORTCODE$$.logError(arguments, error);
    }

    if (finallyCallback) {
        finallyCallback(error, undefined);
    }

    $$SHORTCODE$$.logExit(arguments);

    //-- 

    function handleReadyStateChange() {

        if (this.readyState === READY_STATE_DONE) {

            var error;
            var retVal;
    
            var finallyCallback = completedCallback;

            try {
                var replyDataJSON = this.responseText;
                retVal = JSON.parse(replyDataJSON);
            }
            catch (err) {
                retVal = undefined;
                error = "returned replyData for url " + url + " is probably not JSON. Returned replyData is " + replyDataJSON;
            }

            if (finallyCallback) {
                finallyCallback(error, retVal);
            }
        }

        $$SHORTCODE$$.logExit(arguments);    
    }    

}


