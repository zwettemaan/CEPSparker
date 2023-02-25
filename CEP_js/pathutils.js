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

SPRK.path.exists = function exists(filepath) {

    var retVal;

    var stat = cep.fs.stat(filepath);
    retVal = (stat.err == cep.fs.NO_ERROR);

    return retVal;
}

SPRK.path.isDir = function isDir(filepath) {

    var stat = cep.fs.stat(filepath);
    var retVal = (stat.err == cep.fs.NO_ERROR) && stat.data.isDirectory();

    return isDir;
}

SPRK.path.mkdir = function mkdir(folderPath, separator) {

    var err = cep.fs.ERR_INVALID_PARAMS;

    if (folderPath) {
        if (SPRK.path.exists(folderPath)) {
            err = cep.fs.NO_ERROR;
        }
        else {
            var parentFolderPath = SPRK.path.dirname(folderPath, separator);
            var err = SPRK.path.mkdir(parentFolderPath, separator);
            if (err == cep.fs.NO_ERROR) {
                var result = cep.fs.makedir(folderPath);
                err = result.err;           
            }

        }
    }

    return err;
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

        var readdirData = SPRK.cepFS.readdir(path);
        if (readdirData.err) {
            break;
        }

        retVal = readdirData.data;
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
            optionalEncoding = cep.encoding.UTF8;
        }

        var readData = SPRK.cepFS.readFile(path, optionalEncoding);

        if (! readData || readData.err) {
            break;
        }

        retVal = readData.data;
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

        retVal = SPRK.cepFS.stat(path);
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

        SPRK.cepFS.deleteFile(path);
    }
    while (false);

}

SPRK.path.writeFile = function writeFile(path, contents, optionalEncoding) {

    var retVal;
    
    do {

        if (! path) {
            break;
        }

        if (! optionalEncoding || optionalEncoding == SPRK.C.ENCODING_UTF8) {
            optionalEncoding = cep.encoding.UTF8;
        }

        var result = SPRK.cepFS.writeFile(path, contents, optionalEncoding);
        retVal = result.err;
    }
    while (false);

    return retVal;
}
})();