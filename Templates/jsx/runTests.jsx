function getPlatformGlobals() {
    return $.global;
}

var platformGlobals = getPlatformGlobals();
platformGlobals.getPlatformGlobals = getPlatformGlobals;
platformGlobals.defineGlobalObject = function defineGlobalObject(globalName) {
    if (! platformGlobals[globalName]) {
        platformGlobals[globalName] = {};
    }
    return platformGlobals[globalName];
}

var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

//@include "CreativeDeveloperTools_ES/crdtesDLLLoader.jsx"
//@include "CreativeDeveloperTools_ES/crdtes.jsx"

crdtes.evalScript("Tests/standaloneInitDirs.jsx", $.fileName);
crdtes.evalScript("hostscript.jsx", $.fileName);

app.documents.everyItem().close(SaveOptions.NO);

$$SHORTCODE$$.initHostScript( $$SHORTCODE$$.C.APP_CODE_INDESIGN, $$SHORTCODE$$.dirs.projectDir);