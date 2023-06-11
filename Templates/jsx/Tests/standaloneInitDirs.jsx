if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.dirs) {
    $$SHORTCODE$$.dirs = {};
}

$$SHORTCODE$$.PROJECT_NAME = ""
$$SHORTCODE$$.dirs.EXTENSIONS = 
    Folder(
        Folder.userData + "/" + 
        "Adobe" + "/" + 
        "CEP" + "/" + 
        "extensions" + "/" + 
        "$$TARGET_DIRNAME$$"
    ).fsName + "/";
    
$$SHORTCODE$$.dirs.TEMP = Folder.temp.fsName + "/";

(function() {
    if ($.fileName) {
        var file = File($.fileName);
        if (file.exists) {
            var projectDir = file.parent.parent.parent.fsName + "/";
            if (Folder(projectDir).displayName.toLowerCase() == "$$TARGET_DIRNAME$$") {
                $$SHORTCODE$$.dirs.projectDir = projectDir;
            }            
        }
    }
})();