//
// This file mirrors the API of js/pathUtils.js
//

if (! $$SHORTCODE$$.path) {
	$$SHORTCODE$$.path = {};
}

$$SHORTCODE$$.path.exists = function(filepath) {
    var f = File(filepath);
    return f.exists;
};

$$SHORTCODE$$.path.isDir = function(filepath) {
    
    // This casts to a File instead of a Folder if the
    // path references a file

    var folder = Folder(folderPath);
    return (folder instanceof Folder);
};

$$SHORTCODE$$.path.mkdir = function(folderPath, separator) {

    var success = false;

    do {
        try {
            if (! folderPath) {
                $$SHORTCODE$$.logError("$$SHORTCODE$$.path.mkdir: no folderPath");
                break;
            }

            if ($$SHORTCODE$$.path.exists(folderPath)) {
                success = true;
                break;
            }

            var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);
            success = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
            if (! success) {
                $$SHORTCODE$$.logError("$$SHORTCODE$$.path.mkdir: cannot create parent folder");
                break;
            }

            var folder = Folder(folderPath);
            folder.create();
            success = folder.exists;
        }
        catch (err) {
            $$SHORTCODE$$.logError("$$SHORTCODE$$.path.mkdir throws" + err);       
        }
    }
    while (false);
    
    return success;
};
