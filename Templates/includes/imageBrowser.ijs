    $$SHORTCODE$$.sendIFrameMessage = function(messageText) {

        var messageObj = {
            text: messageText
        };

        if (window.frames.length > 0) {
            window.frames[0].postMessage(JSON.stringify(messageObj), "*");
        }
        else {
            var interval = setInterval(function() {
                if (window.frames.length > 0) {
                    window.frames[0].postMessage(JSON.stringify(messageObj), "*");
                    clearInterval(interval);
                }
            },
            1000);
        }
    }

    if (! window.handleIFrameMessageInstalled) {
        window.handleIFrameMessageInstalled = true;        
        window.addEventListener('message', handleIFrameMessage);
    }
    
    function handleIFrameMessage(event) {

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry(arguments);
        $endif

        do {
            try {
            
                if ("undefined" == typeof(require)) {
                    var errorMsg = "require() not defined. Make sure to use at least CEP 6.1";
                    $$SHORTCODE$$.logError(arguments, errorMsg);
                    alert(errorMsg);
                    break;
                }

                var fs = require("fs");
                var http = require("http");

                var message = JSON.parse(event.data);

                function download(url, destinationPath, callback) {
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logEntry(arguments);
                    $endif

                    var file = fs.createWriteStream(destinationPath);

                    var request = http.get(url, function httpGetCallback(response) {
                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logEntry(arguments);
                        $endif

                        response.pipe(file);
                        file.on('finish', function() {
                          file.close(callback);
                        });

                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logExit(arguments);
                        $endif                        
                    }).on('error', function httpOnErrorCallback(err) { 
                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logEntry(arguments);
                        $endif

                        fs.unlink(destinationPath);
                        if (callback) {
                            $$SHORTCODE$$.logError(arguments, "download error " + err.message);
                            callback(err.message);
                        }

                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logExit(arguments);
                        $endif
                    })

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit(arguments);
                    $endif                    
                };

                var url = message.url;
                var filePath = $$SHORTCODE$$.dirs.tempDir + decodeURIComponent($$SHORTCODE$$.path.basename(url, "/"));
                var width = message.width;
                var height = message.height;
                var scaledWidth = 100;
                var scale = scaledWidth / width;
                var scaledHeight = scale * height;
                download(url, filePath, function downloadCallback(err) {
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logEntry(arguments);
                    $endif

                    if (! err) {
                        $$SHORTCODE$$.csInterface.evalScript(
                            "$$SHORTCODE$$.placeImage(" + 
                                $$SHORTCODE$$.dQ(filePath) + "," + 
                                $$SHORTCODE$$.dQ(url) + "," + 
                                scaledWidth + "," + 
                                scaledHeight + ");"
                        );
                    }
                    
                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit(arguments);
                    $endif
                })
            }
            catch (err) {
                $$SHORTCODE$$.logError(arguments, "throws " + err);
            }
        }
        while (false);

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logExit(arguments);
        $endif        
    }

    $$SHORTCODE$$.sendIFrameMessage("This is data sent from the panel to the iFrame");
