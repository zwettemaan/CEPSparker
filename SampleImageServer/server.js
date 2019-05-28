var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = process.argv[2] || 8000;

var serverDir = process.cwd();
var rootDir = path.join(serverDir, "root");
var includesDir = path.join(serverDir, "includes");
var jsDir = path.join(serverDir, "../js");

var htmlPrefixFilePath = path.join(includesDir, "prefix.ihtml");
var htmlPrefix = fs.readFileSync(htmlPrefixFilePath, "utf8");

var htmlSuffixFilePath = path.join(includesDir, "suffix.ihtml");
var htmlSuffix = fs.readFileSync(htmlSuffixFilePath, "utf8");

var contentTypesByExtension = {
    '.html':  'text/html',
    '.css':   'text/css',
    '.js':    'text/javascript',
    '.json':  'text/json',
    '.svg':   'image/svg+xml',
    '.gif':   'image/gif',
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

    function showImagesInDir(encodedURI, dirPath) {

        fs.readdir(dirPath, function(err, files) {
            if (err) {
                errorPage();
            }
            else {

                var htmlOutput = htmlPrefix + "\n";

                for (var idx = 0; idx < files.length; idx++) {
                    var fileName = files[idx];
                    if (fileName.charAt(0) != ".") {
                        htmlOutput += 
                            "<p><img src=\"" + 
                            encodedURI + "/" + 
                            encodeURIComponent(files[idx]) + 
                            "\" width=\"64\" onclick=\"handleImageClick(this);\"/></p>\n";
                    }
                }

                htmlOutput += htmlSuffix + "\n";

                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(htmlOutput + '\n');
                response.end();
            }
        });


    }


    do {

        var encodedURI = url.parse(request.url).pathname
        var decodedURI = decodeURIComponent(encodedURI);

        var baseDir = rootDir;
        if (startsWith(decodedURI, "/js/") || startsWith(decodedURI, "/css/") || startsWith(decodedURI, "/shared_js_jsx/")) {
            baseDir = serverDir + "/../";
        }

        var fileOrDirPath = path.join(baseDir, decodedURI);
        console.log("Serving\n  " + fileOrDirPath);

        fs.stat(fileOrDirPath, function(err, stats) {

            if (err) {
                errorPage();
            }
            else if (! stats.isDirectory()) {
                sendFile(fileOrDirPath);
            }
            else {
                showImagesInDir(encodedURI, fileOrDirPath);
            }
        });

        
    }
    while (false);

}).listen(parseInt(port, 10));

// Message to display when server is started
console.log('Server running at\n  => http://localhost:' + port + '/\n^C to quit');
