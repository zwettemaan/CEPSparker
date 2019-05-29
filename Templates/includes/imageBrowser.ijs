    window.addEventListener('message', handleIFrameMessage);

    function handleIFrameMessage(event) {

        do {
            try {
            
                if ("undefined" == typeof(require)) {
                    $$SHORTCODE$$.logError("handleIFrameMessage: require() not defined. Make sure to use at least CEP 6.1");
                    break;
                }

                var fs = require("fs");
                var http = require("http");

                var message = JSON.parse(event.data);

                function download(url, destinationPath, callback) {

                    var file = fs.createWriteStream(destinationPath);

                    var request = http.get(url, function(response) {
                        response.pipe(file);
                        file.on('finish', function() {
                          file.close(callback);
                        });
                    }).on('error', function(err) { 
                        fs.unlink(destinationPath);
                        if (callback) {
                            $$SHORTCODE$$.logError("handleIFrameMessage: download error " + err.message);
                            callback(err.message);
                        }
                    });
                    
                };

                var url = message.url;
                var filePath = "/tmp/" + decodeURIComponent($$SHORTCODE$$.path.basename(url));
                var width = message.width;
                var height = message.height;
                var scaledWidth = 100;
                var scale = scaledWidth / width;
                var scaledHeight = scale * height;
                download(url, filePath, function(err) {
                    if (! err) {
                        $$SHORTCODE$$.csInterface.evalScript(
                            "$$SHORTCODE$$.placeImage(" + 
                                $$SHORTCODE$$.dQ(filePath) + "," + 
                                $$SHORTCODE$$.dQ(url) + "," + 
                                scaledWidth + "," + 
                                scaledHeight + ");"
                        );
                    }
                });
            }
            catch (err) {
                $$SHORTCODE$$.logError("handleIFrameMessage: throws " + err);
            }
        }
        while (false);
        
    }

