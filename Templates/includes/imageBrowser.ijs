    window.addEventListener('message', handleIFrameMessage);

    function handleIFrameMessage(event) {

        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
        $$SHORTCODE$$.logEntry(arguments);
        $endif

        do {
            try {
            
                if ("undefined" == typeof(require)) {
                    $$SHORTCODE$$.logError(arguments, "require() not defined. Make sure to use at least CEP 6.1");
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

                    var request = http.get(url, function(response) {

                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logEntry("http.get callback");
                        $endif

                        response.pipe(file);
                        file.on('finish', function() {
                          file.close(callback);
                        });

                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logExit("http.get callback");

                    })
                        $endif.on('error', function(err) { 

                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logEntry("http.get error callback");
                        $endif

                        fs.unlink(destinationPath);
                        if (callback) {
                            $$SHORTCODE$$.logError(arguments, "download error " + err.message);
                            callback(err.message);
                        }

                        $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                        $$SHORTCODE$$.logExit("http.get error callback");
                    })
                        $endif

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logExit(arguments);
                    $endif
                    
                };

                var url = message.url;
                var filePath = "/tmp/" + decodeURIComponent($$SHORTCODE$$.path.basename(url));
                var width = message.width;
                var height = message.height;
                var scaledWidth = 100;
                var scale = scaledWidth / width;
                var scaledHeight = scale * height;
                download(url, filePath, function(err) {

                    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
                    $$SHORTCODE$$.logEntry("download callback");
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
                    $$SHORTCODE$$.logExit("download callback");
                })
                    $endif
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

