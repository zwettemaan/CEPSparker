//
// Mock Router API
//
// This code is shared between CEP/JavaScript and ExtendScript
// 
// This file is an interface as well as an implementation
//
// All APIs can have optional mock implementations ($$SHORTCODE$$.SOMEAPI.impl.function vs $$SHORTCODE$$.SOMEAPI.mock.function)
//
// This router allows us to switch the use of mocks on or off globally, per API, or per function
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

/**
 * `$$SHORTCODE$$.mockRouterAPI` allows us to switch between 'real' and 'mock' versions
 * of an API
 * 
 * Mocks can be enabled globally (all APIs and all endpoints), or just for a few
 * selected APIs, or for individual end points. Enabling a mock will cause the mock
 * version of the implementation to be used rather than a real version.
 * 
 * Mock versions of endpoints are allowed to be missing - when mocks are enabled, but no mock
 * version of an endpoint is provided, the framework will use the 'real' implementation
 * instead.
 * 
 * The mockRouterAPI is used in the interfaces for APIs; it will be routing the 
 * call into the interface to either the mock or the real implementation.
 * 
 * See serverListAPI for an example API that has mocks enabled in the JavaScript 
 * implementation file
 * 
 * @namespace $$SHORTCODE$$.mockRouterAPI
 */

if (! $$SHORTCODE$$.mockRouterAPI) {
    $$SHORTCODE$$.mockRouterAPI = {};
    $$SHORTCODE$$.mockRouterAPI.name = "mockRouterAPI";
}

/**
 * Enable/disable the use of mocks
 * 
 * @function $$SHORTCODE$$.mockRouterAPI.enableMocksGlobally
 * 
 * @param {boolean} enabled - enable or disable 
 * @param {function} completedCallback - `function(error)`
 */

 $$SHORTCODE$$.mockRouterAPI.enableMocksGlobally = function enableMocksGlobally(enable, completedCallback) { 

    var error;
    var finallyCallback = completedCallback;

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            if (enable === undefined) {
                error = "need enable parameter";
                break;
            }

            $$SHORTCODE$$.mockRouterAPI.mocksGloballyEnabled = enable;

            var script = 
                "$$SHORTCODE$$.mockRouterAPI.mocksGloballyEnabled = " + (enable ? "true" : "false");

            var handOverCallback = finallyCallback;
            finallyCallback = undefined;
            $$SHORTCODE$$.crossRunScript(
                script, 
                function(result) {
                    var error;
                    if (! result) {
                        error = "no result";
                    }
                    else if (result.jsError || result.esError) {
                        error = "script error";
                    }
                    if (handOverCallback) {
                        handOverCallback(error);
                    }
                }
            );

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $$SHORTCODE$$.logExit(arguments);

    if (error) {
        $$SHORTCODE$$.logError(arguments, error);
    }
    
    if (finallyCallback) {
        finallyCallback(error);
    }

}

/**
 * Enable/disable the use of mocks for a particular API
 * 
 * @function $$SHORTCODE$$.mockRouterAPI.enableMocksForAPI
 * 
 * @param {string} api - name of API (e.g. "serverListAPI")
 * @param {boolean} enabled - enable or disable 
 * @param {function} completedCallback - `function(error)`
 */

$$SHORTCODE$$.mockRouterAPI.enableMocksForAPI = function enableMocksForAPI(api, enable, completedCallback) { 

    var error;
    var finallyCallback = completedCallback;

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            if (! api || "string" != typeof api) {
                error = "need api parameter";
                break;
            }

            var API = $$SHORTCODE$$[api];
            if (! API) {
                error = "unknown api";
                break;
            }

            if (enable === undefined) {
                error = "need enable parameter";
                break;
            }

            var script = 
                "if (! $$SHORTCODE$$.mockEnabledByAPI) {" +
                    "$$SHORTCODE$$.mockEnabledByAPI = {};" +
                "}" +
                "$$SHORTCODE$$.mockEnabledByAPI[" + $$SHORTCODE$$.dQ(api) + "] = " + (enable ? "true" : "false");

            var handOverCallback = finallyCallback;
            finallyCallback = undefined;
            $$SHORTCODE$$.crossRunScript(
                script, 
                function(result) {
                    var error;
                    if (! result) {
                        error = "no result";
                    }
                    else if (result.jsError || result.esError) {
                        error = "script error";
                    }
                    if (handOverCallback) {
                        handOverCallback(error);
                    }
                }
            );

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $$SHORTCODE$$.logExit(arguments);

    if (error) {
        $$SHORTCODE$$.logError(arguments, error);
    }

    if (finallyCallback) {
        finallyCallback(error);
    }
}

/**
 * Enable/disable the use of mocks for a particular endpoint in a particular API
 * 
 * @function $$SHORTCODE$$.mockRouterAPI.enableMockForEndpoint
 * 
 * @param {string} api - name of API (e.g. "serverListAPI")
 * @param {string} endpoint - name of endpoint (e.g. "addServer")
 * @param {boolean} enabled - enable or disable 
 * @param {function} completedCallback - `function(error)`
 */

 $$SHORTCODE$$.mockRouterAPI.enableMockForEndpoint = function enableMockForEndpoint(api, endpoint, enable, completedCallback) { 

    var error;

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            if (! api || "string" != typeof api) {
                error = "need api parameter";
                break;
            }

            var API = $$SHORTCODE$$[api];
            if (! API) {
                error = "unknown api " + api;
                break;
            }

            if (! endpoint || "string" != typeof endpoint) {
                error = "need endpoint parameter";
                break;
            }

            var fEndpoint = API[endpoint];
            if (! fEndpoint) {
                error = "unknown endpoint " + api + "." + endpoint;
                break;
            }

            if (enable === undefined) {
                error = "need enable parameter";
                break;
            }

            var script = 
                "var mockEnabledByEndpointByAPI = $$SHORTCODE$$.mockEnabledByEndpointByAPI;" + 
                "if (! mockEnabledByEndpointByAPI) {" + 
                    "mockEnabledByEndpointByAPI = {};" + 
                    "$$SHORTCODE$$.mockEnabledByEndpointByAPI = mockEnabledByEndpointByAPI;" + 
                "}" + 
                "var mockEnabledByEndpoint = mockEnabledByEndpointByAPI[" + $$SHORTCODE$$.dQ(api) + "];" + 
                "if (! mockEnabledByEndpoint) {" +
                "mockEnabledByEndpoint = {};" + 
                    "mockEnabledByEndpointByAPI[" + $$SHORTCODE$$.dQ(api) + "] = mockEnabledByEndpoint;" + 
                "}" +
                "mockEnabledByEndpoint[" + $$SHORTCODE$$.dQ(endPoint) + "] = " + (enable ? "true" : "false");

            var handOverCallback = finallyCallback;
            finallyCallback = undefined;
            $$SHORTCODE$$.crossRunScript(
                script, 
                function(result) {
                    var error;
                    if (! result) {
                        error = "no result";
                    }
                    else if (result.jsError || result.esError) {
                        error = "script error";
                    }
                    if (handOverCallback) {
                        handOverCallback(error);
                    }
                }
            );

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $$SHORTCODE$$.logExit(arguments);

    if (error) {
        $$SHORTCODE$$.logError(arguments, error);
    }

    if (completedCallback) {
        completedCallback(error);
    }

}

/*
* Route a call to an endpoint to the real endpoint or to a mock
* 
* @function $$SHORTCODE$$.mockRouterAPI.routeAPICall
* 
* @param {string} api - name of API (e.g. "serverListAPI")
* @param {string} endpoint - name of endpoint (e.g. "addServer")
* @param {function} completedCallback - `function(error)`
* @param {any=} param1 - additional parameters to be passed into endpoint
*/

$$SHORTCODE$$.mockRouterAPI.routeAPICall = function routeAPICall(api, endpoint, completedCallback) { 

    // Support dual interface in ExtendScript: both sync and async can work
    // either by returning retVal or via callback(error, retVal)

    var error;
    var retVal; // Only useful in ExtendScript

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            if (! api || "string" != typeof api) {
                error = "need api parameter";
                break;
            }

            var API = $$SHORTCODE$$[api];
            if (! API) {
                error = "unknown api";
                break;
            }

            var allImplementations = $$SHORTCODE$$.impl;
            if (! allImplementations) {
                error = "implementations are all missing";
                break;
            }

            var impl = allImplementations[api];
            if (! impl) {
                error = "implementation for API is missing";
                break;
            }

            if (! endpoint || "string" != typeof endpoint) {
                error = "need endpoint parameter";
                break;
            }

            var fEndpoint = API[endpoint];
            if (! fEndpoint) {
                error = "unknown endpoint " + api + "." + endpoint;
                break;
            }

            var fEndpointImpl = impl[endpoint];
            if (! fEndpointImpl) {
                error =  "unknown endpoint implementation " + api + ".impl." + endpoint;
                break;
            }

            var fEndpointMock = undefined;

            var allMocks = $$SHORTCODE$$.mock;
            var mockIsMissingNote = "";
            if (! allMocks) {
                mockIsMissingNote = "could not find any mocks";
            }
            else {
                var mocks = allMocks[api];
                if (! mocks) {
                    mockIsMissingNote = "could not find any mocks for api " + api;
                }
                else {
                    fEndpointMock = mocks[endpoint];
                    if (! fEndpointMock) {
                        mockIsMissingNote = "could not find a mock for endpoint " + api + "." + endpoint;
                    }
                }
            }

            var isMockEnabled = $$SHORTCODE$$.mockRouterAPI.mocksGloballyEnabled;
            if (! isMockEnabled) {
                isMockEnabled = 
                    (
                        $$SHORTCODE$$.mockEnabledByAPI 
                    && 
                        $$SHORTCODE$$.mockEnabledByAPI[api]
                    );
                if (! isMockEnabled) {
                    isMockEnabled = 
                    (
                        $$SHORTCODE$$.mockEnabledByEndpointByAPI 
                    && 
                        $$SHORTCODE$$.mockEnabledByEndpointByAPI[api]
                    && 
                        $$SHORTCODE$$.mockEnabledByEndpointByAPI[api][endpoint]
                    );
                }
            }

            fEndpointToCall = fEndpointImpl;
            if (isMockEnabled) {
                if (! fEndpointMock) {
                    $$SHORTCODE$$.logTrace(arguments, mockIsMissingNote);
                }
                else {
                    fEndpointToCall = fEndpointMock;
                }
            }

            var apiArguments = [];
            for (var idx = 3; idx < arguments.length; idx++) {
                apiArguments.push(arguments[idx]);
            }

            if (completedCallback) {
                // The callback will be called by the endpoint when it is done
                apiArguments.push(completedCallback);
                // Set callback to undefined to make sure we don't call it a second time at the end of 
                // this method
                completedCallback = undefined;
            }

            retVal = fEndpointToCall.apply(undefined, apiArguments);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $$SHORTCODE$$.logExit(arguments);

    if (error) {
        $$SHORTCODE$$.logError(arguments, error);
    }

    if (completedCallback) {
        completedCallback(error);
    }

    return retVal;
}
