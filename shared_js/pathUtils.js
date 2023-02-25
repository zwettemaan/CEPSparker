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

if (SPRK.C.PLATFORM == SPRK.C.CEP_JAVASCRIPT || SPRK.C.PLATFORM == SPRK.C.NODE_JAVASCRIPT) {

    if (! SPRK.cepFS) {
        if ("undefined" != typeof cep && cep.fs) {
            SPRK.cepFS = cep.fs;
        }
        else if ("undefined" != typeof window && window.cep) {
            SPRK.cepFS = window.cep.fs;
        }
    }

    if (! SPRK.nodeFS) {
        SPRK.nodeFS = require('fs');
    }

    SPRK.path.exists = function exists(filepath) {

        var retVal;

        var stat = SPRK.cepFS.stat(filepath);
        retVal = (stat.err == SPRK.NO_ERROR);

        return retVal;
    }

    SPRK.path.isDir = function isDir(filepath) {

        var stat = SPRK.cepFS.stat(filepath);
        var retVal = (stat.err == SPRK.NO_ERROR) && stat.data.isDirectory();

        return isDir;
    }

    SPRK.path.mkdir = function mkdir(folderPath, separator) {

        var err = SPRK.cepFS.ERR_INVALID_PARAMS;

        if (folderPath) {
            if (SPRK.path.exists(folderPath)) {
                err = SPRK.NO_ERROR;
            }
            else {
                var parentFolderPath = SPRK.path.dirname(folderPath, separator);
                var err = SPRK.path.mkdir(parentFolderPath, separator);
                if (err == SPRK.NO_ERROR) {
                    var result = SPRK.cepFS.makedir(folderPath);
                    err = result.err;           
                }

            }
        }

        return err;
    }

}

})();