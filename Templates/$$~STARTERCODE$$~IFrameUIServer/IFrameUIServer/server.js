var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = process.argv[2] || $$IFRAME_UI_PORT$$;

var serverDir = process.cwd();
var rootDir = path.join(serverDir, "root");
var includesDir = path.join(serverDir, "includes");
var nodeJSDir = path.join(serverDir, "../node_js");
var sharedJSDir = path.join(serverDir, "../shared_js");
var sharedJSJSXDir = path.join(serverDir, "../shared_js_jsx");

var contentTypesByExtension = {
    '.html':  'text/html',
    '.css':   'text/css',
    '.js':    'text/javascript',
    '.json':  'text/json',
    '.svg':   'image/svg+xml',
    '.gif':   'image/gif',
    '.jpg':   'image/jpeg',
    '.png':   'image/png',
    '.tif':   'image/tiff',
    '.tiff':  'image/tiff',
    '.pdf':   'application/pdf',
    '.eps':   'application/postscript'
};

function startsWith(s, start) {
    return s.substr(0, start.length) == start;
}

http.createServer(function (request, response) {

    function sendFile(filePath) {

        fs.readFile(filePath, 'binary', function (err, fileContents) {

            do {

                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write(err + '\n');
                    response.end();
                }

                var headers = {};
                var contentType = contentTypesByExtension[path.extname(filePath)];
                if (contentType) {
                    headers['Content-Type'] = contentType;
                }

                response.writeHead(200, headers);
                response.write(fileContents, 'binary');
                response.end();

            }
            while (false);

        });

    }

    function errorPage() {
        outFileName = path.join(rootDir, '/404.html');
        sendFile(outFileName);
    } 

    do {

        var encodedURI = url.parse(request.url).pathname
        var decodedURI = decodeURIComponent(encodedURI);

        var decodedURI = decodedURI.split("/");
        var cleanedURI = "";
        for (var idx = 0; idx < decodedURI.length; idx++) {
            var segment = decodedURI[idx];
            if (segment != "" && segment.charAt(0) != ".") {
                cleanedURI += "/" + segment;
            }
        }

        if (! cleanedURI) {
            errorPage();
            break;
        }

        var baseDir = rootDir;
        if (startsWith(cleanedURI, "/css/") || startsWith(cleanedURI, "/browser_js/") || startsWith(cleanedURI, "/shared_js_jsx/") || startsWith(cleanedURI, "/shared_js/")) {
            baseDir = serverDir + "/../";
        }

        var fileOrDirPath = path.join(baseDir, cleanedURI);
        console.log(fileOrDirPath);

        fs.stat(fileOrDirPath, function(err, stats) {

            if (err) {
                errorPage();
            }
            else if (! stats.isDirectory()) {
                sendFile(fileOrDirPath);
            }
            else {
                errorPage();
            }
        });

        
    }
    while (false);

}).listen(parseInt(port, 10));

// Message to display when server is started
console.log('Server running at\n  => http://localhost:' + port + '/\n^C to quit');
