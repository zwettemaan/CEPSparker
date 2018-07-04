if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = {};
}

$$SHORTCODE$$.path.exists = function(filepath) {
    var stat = cep.fs.stat(filepath);
    return (stat.err == cep.fs.NO_ERROR);
};

$$SHORTCODE$$.path.mkdir = function(folderPath, separator) {

    var err = cep.fs.ERR_INVALID_PARAMS;

    if (folderPath) {
        if (path.exists(folderPath)) {
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
    return err;
};

$$SHORTCODE$$.path.isDir = function(filepath) {
    var isDir = IsDirectory(filepath);
    return isDir;
};
