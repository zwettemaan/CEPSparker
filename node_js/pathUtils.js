//
// This file mirrors the API of jsx/pathUtils.jsx
//

if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {
    
if (! SPRK.path) {
    SPRK.path = {};
}

if (! SPRK.nodeFS) {
    SPRK.nodeFS = require('fs');
}

SPRK.path.exists = function exists(filePath) {

    var retVal;

    do {

        try {
            var stat = 
            SPRK.nodeFS.statSync(filePath);            
            retVal = true;
        }
        catch (err) {            
        }

    }
    while (false);

    return retVal;
}

SPRK.path.isDir = function isDir(filePath) {

    var retVal;

    do {


        try {
            var stat = SPRK.nodeFS.statSync(filePath);            
            retVal = stat.isDirectory();
        }
        catch (err) {            
        }
    }
    while (false);

    return retVal;
}

SPRK.path.mkdir = function mkdir(folderPath, separator) {

    var retVal;

    do {

        if (! folderPath) {
            retVal = "no folder path";
            break;
        }

        if (SPRK.path.exists(folderPath)) {
            break;
        }

        var parentFolderPath = SPRK.path.dirname(folderPath, separator);

        retVal = SPRK.path.mkdir(parentFolderPath, separator);
        if (retVal) {
            break;
        }
        
        retVal = SPRK.nodeFS.mkdirSync(folderPath);

    }
    while (false);

    return retVal;
}

SPRK.path.readdir = function readdir(path) {

    var retVal;

    do {

        if (! path) {
            break;
        }

        if (! SPRK.path.exists(path)) {
            break;
        }

        retVal = SPRK.nodeFS.readdirSync(path);
    }
    while (false);

    return retVal;
}

SPRK.path.readFile = function readFile(path, optionalEncoding) {

    var retVal;

    do {

        if (! path) {
            break;
        }

        if (! SPRK.path.exists(path)) {
            break;
        }

        if (! optionalEncoding || optionalEncoding == SPRK.C.ENCODING_UTF8) {
            optionalEncoding = "utf8";
        }

        var options = {
            encoding: optionalEncoding
        };

        retVal = SPRK.nodeFS.readFileSync(path, options);
    }
    while (false);

    return retVal;
}

SPRK.path.stat = function stat(path) {

    var retVal;

    do {

        if (! path) {
            break;
        }

        if (! SPRK.path.exists(path)) {
            break;
        }

        retVal = SPRK.nodeFS.statSync(path);
    }
    while (false);

    return retVal;
}

SPRK.path.unlink = function unlink(path) {

    do {

        if (! path) {
            retVal = "no path";
            break;
        }

        if (! SPRK.path.exists(path)) {
            break;
        }

        SPRK.nodeFS.unlinkSync(path);
    }
    while (false);

}

SPRK.path.writeFile = function writeFile(path, contents, optionalEncoding) {

    var retVal;

    do {

        try  {

            retVal = -1;

            if (! path) {
                break;
            }

            if (! optionalEncoding || optionalEncoding == SPRK.C.ENCODING_UTF8) {
                optionalEncoding = "utf8";
            }

            var options = {
                encoding: optionalEncoding
            };

            SPRK.nodeFS.writeFileSync(path, contents, options);

            retVal = 0;
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

    return retVal;
}

})();