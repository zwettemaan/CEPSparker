//
// This file mirrors the API of js/pathUtils.js
//

if (! $$SHORTCODE$$.path) {
	$$SHORTCODE$$.path = {};
}

$$SHORTCODE$$.path.exists = function exists(filepath) {

    $$SHORTCODE$$.logEntry(arguments);

    var f = File(filepath);
    var retVal = f.exists;

    $$SHORTCODE$$.logExit(arguments);

    return retVal;
};

$$SHORTCODE$$.path.isDir = function isDir(filepath) {

    $$SHORTCODE$$.logEntry(arguments);
    
    // This casts to a File instead of a Folder if the
    // path references a file

    var folder = Folder(folderPath);

    var retVal = (folder instanceof Folder);

    $$SHORTCODE$$.logExit(arguments);

    return retVal;
};

$$SHORTCODE$$.path.mkdir = function mkdir(folderPath, separator) {

    var success = false;

    do {
        try {
            if (! folderPath) {
                $$SHORTCODE$$.logError(arguments, "no folderPath");
                break;
            }

            if ($$SHORTCODE$$.path.exists(folderPath)) {
                success = true;
                break;
            }

            var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);
            success = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
            if (! success) {
                $$SHORTCODE$$.logError(arguments, "cannot create parent folder");
                break;
            }

            var folder = Folder(folderPath);
            folder.create();
            success = folder.exists;
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws" + err);       
        }
    }
    while (false);
    
    return success;
};
