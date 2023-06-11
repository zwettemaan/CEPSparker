//
// This code is shared between CEP/JavaScript and ExtendScript
// 
// This is an interface file
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

/**
 * `$$SHORTCODE$$.getURLAPI` is a low-level API which handles accessing RESTful URLs
 * 
 * This API is layered on top of `$$SHORTCODE$$.tokenAPI` to manage logins and token access
 * 
 * The 'native' environment for this API is CEP/JavaScript - ExtendScript does not
 * have the necessary facilities to implement this API.
 * 
 * The ExtendScript implementations will 'call through' into the CEP/JavaScript implementations
 * via the JSInterface.
 * 
 * @namespace $$SHORTCODE$$.getURLAPI
 */

if (! $$SHORTCODE$$.getURLAPI) {
    $$SHORTCODE$$.getURLAPI = {};
    $$SHORTCODE$$.getURLAPI.name = "getURLAPI";
}


// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

$$SHORTCODE$$.getURLAPI.HTTP_STATUS_CODE_OK             = 200;
$$SHORTCODE$$.getURLAPI.HTTP_STATUS_CODE_BAD_REQUEST    = 400;
$$SHORTCODE$$.getURLAPI.HTTP_STATUS_CODE_UNAUTHORIZED   = 401;
//... add more as needed

/**
 * 
 * @function $$SHORTCODE$$.getURLAPI.getURL
 * 
 * @param {string} url - the url to get
 * @param {string} authorization - authorization token
 * @param {function} completedCallback - `function(error, replyData)`<br/>
 * if `error` then `replyData` is `undefined`
 */

$$SHORTCODE$$.getURLAPI.getURL = function getURL(url, authorization, completedCallback) { 

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {
            var endpoint = $$SHORTCODE$$.getFunctionName(arguments);
            $$SHORTCODE$$.mockRouterAPI.routeAPICall($$SHORTCODE$$.getURLAPI.name, endpoint, completedCallback, url, authorization);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $$SHORTCODE$$.logExit(arguments);

}

/**
 * 
 * @function $$SHORTCODE$$.getURLAPI.postURL
 * 
 * @param {string} url - the url to get
 * @param {string} authorization - authorization token
 * @param {string} postData - the data to be posted. This data will be JSON-encoded into the POST 
 * @param {function} completedCallback - `function(error, replyData)`<br/>
 * if `error` then `data` is `undefined`
 */

$$SHORTCODE$$.getURLAPI.postURL = function postURL(url, authorization, postData, completedCallback) { 

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {
            var endpoint = $$SHORTCODE$$.getFunctionName(arguments);
            $$SHORTCODE$$.mockRouterAPI.routeAPICall($$SHORTCODE$$.getURLAPI.name, endpoint, completedCallback, url, authorization, postData);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $$SHORTCODE$$.logExit(arguments);

}
