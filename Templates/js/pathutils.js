//
// This file mirrors the API of jsx/pathUtils.jsx
//

if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = {};
}

$$SHORTCODE$$.path.exists = function exists(filepath) {

    $$SHORTCODE$$.logEntry(arguments);

    var stat = cep.fs.stat(filepath);
    var retVal = (stat.err == cep.fs.NO_ERROR);

    $$SHORTCODE$$.logExit(arguments);

    return retVal;
};

$$SHORTCODE$$.path.isDir = function isDir(filepath) {

    $$SHORTCODE$$.logEntry(arguments);

    var isDir = IsDirectory(filepath);

    $$SHORTCODE$$.logExit(arguments);

    return isDir;
};

$$SHORTCODE$$.path.mkdir = function mkdir(folderPath, separator) {

    $$SHORTCODE$$.logEntry(arguments);

    var err = cep.fs.ERR_INVALID_PARAMS;

    if (folderPath) {
        if ($$SHORTCODE$$.path.exists(folderPath)) {
            err = cep.fs.NO_ERROR;
        }
        else {
            var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);
            var err = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
            if (err == cep.fs.NO_ERROR) {
                var result = cep.fs.makedir(folderPath);
                err = result.err;           
            }

        }
    }

    $$SHORTCODE$$.logExit(arguments);
    
    return err;
};

