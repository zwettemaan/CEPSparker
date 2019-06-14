    window.addEventListener('message', handleIFrameMessage);

    function handleIFrameMessage(event) {

        $$SHORTCODE$$.logEntry(arguments);

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

                    $$SHORTCODE$$.logEntry(arguments);

                    var file = fs.createWriteStream(destinationPath);

                    var request = http.get(url, function(response) {

                        $$SHORTCODE$$.logEntry("http.get callback");

                        response.pipe(file);
                        file.on('finish', function() {
                          file.close(callback);
                        });

                        $$SHORTCODE$$.logExit("http.get callback");

                    }).on('error', function(err) { 

                        $$SHORTCODE$$.logEntry("http.get error callback");

                        fs.unlink(destinationPath);
                        if (callback) {
                            $$SHORTCODE$$.logError(arguments, "download error " + err.message);
                            callback(err.message);
                        }

                        $$SHORTCODE$$.logExit("http.get error callback");
                    });

                    $$SHORTCODE$$.logExit(arguments);
                    
                };

                var url = message.url;
                var filePath = "/tmp/" + decodeURIComponent($$SHORTCODE$$.path.basename(url));
                var width = message.width;
                var height = message.height;
                var scaledWidth = 100;
                var scale = scaledWidth / width;
                var scaledHeight = scale * height;
                download(url, filePath, function(err) {

                    $$SHORTCODE$$.logEntry("download callback");

                    if (! err) {
                        $$SHORTCODE$$.csInterface.evalScript(
                            "$$SHORTCODE$$.placeImage(" + 
                                $$SHORTCODE$$.dQ(filePath) + "," + 
                                $$SHORTCODE$$.dQ(url) + "," + 
                                scaledWidth + "," + 
                                scaledHeight + ");"
                        );
                    }
                    
                    $$SHORTCODE$$.logExit("download callback");
                });
            }
            catch (err) {
                $$SHORTCODE$$.logError(arguments, "throws " + err);
            }
        }
        while (false);

        $$SHORTCODE$$.logExit(arguments);        
    }

