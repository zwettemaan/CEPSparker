//
// Low-level REST API implementation for ExtendScript
//
// This API is implemented in JavaScript, and the ExtendScript implementation
// uses JSInterface to call on the JavaScript implementation
//
// This source file only contains glue code to mix and match the two API implementations
// 
// No mocks in this implementation: it is layered on top of the JavaScript 
// implementation, and the mocks are there. For mocks, see
// js/libs/restAPI.js
//

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

 if (! $$SHORTCODE$$.impl) {
    $$SHORTCODE$$.impl = {};
}

if (! $$SHORTCODE$$.impl.restAPI) {
    $$SHORTCODE$$.impl.restAPI = {};
}

$$SHORTCODE$$.impl.restAPI.getURL = function getURL(url, authorization, completedCallback) { 

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            var data = {
                url: url,
                authorization: authorization
            };

            JSInterface.evalScript(
                "var data = JSInterface.getData();" +
                "var pendingCommand = JSInterface.getPendingCommand();" +
                "pendingCommand.requestAsyncHandling();" +
                "$$SHORTCODE$$.restAPI.getURL(data.url, data.authorization, function(error, data) {" +
                    "pendingCommand.completionCallBack({" +
                        "error: error," + 
                        "data: data" +
                    "});" + 
                "});",
                data,
                function(result) {
                    if (completedCallback) {
                        completedCallback(result.error, result.data);
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

}

$$SHORTCODE$$.impl.restAPI.postURL = function postURL(url, authorization, postData, completedCallback) { 

    $$SHORTCODE$$.logEntry(arguments);

    do {
        try {

            var data = {
                url: url,
                authorization: authorization,
                postData: postData
            };

            JSInterface.evalScript(
                "var data = JSInterface.getData();" +
                "var pendingCommand = JSInterface.getPendingCommand();" +
                "pendingCommand.requestAsyncHandling();" +
                "$$SHORTCODE$$.restAPI.postURL(data.url, data.authorization, data.postData, function(error, data) {" +
                    "pendingCommand.completionCallBack({" +
                        "error: error," + 
                        "data: data" +
                    "});" + 
                "});",
                data,
                function(result) {
                    if (completedCallback) {
                        completedCallback(result.error, result.data);
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

}
