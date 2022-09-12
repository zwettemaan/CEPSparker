$if "$$TARGET_APP$$" == "InDesign"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif
$if "$$TARGET_APP$$" == "Bridge"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif

var dreamweaver;
var app;

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

$$SHORTCODE$$.C.JAVASCRIPT = "JavaScript";
$$SHORTCODE$$.C.EXTENDSCRIPT = "ExtendScript";

$$SHORTCODE$$.C.PLATFORM = $$SHORTCODE$$.C.EXTENDSCRIPT;

//@include "json2.jsx"
//@include "JSInterface.jsx", 

$$SHORTCODE$$.LOG_CRITICAL_ERRORS = false;

$$SHORTCODE$$.relativeFilePathsToLoad = [
		"shared_js_jsx/globals.js",
		"shared_js_jsx/tweakableSettings.js",
		"shared_js_jsx/utils.js",
		"jsx/utils.jsx",
		"jsx/shared_js_jsx/pathUtils.js",
		"jsx/pathUtils.jsx",
		"jsx/shared_js_jsx/init.js",
		"jsx/init.jsx"
];

$$SHORTCODE$$.errorBeforeLoggingAvailable = function(error) {

	if ($$SHORTCODE$$.logError) {
		$$SHORTCODE$$.logError(error);
	}
	else if ($$SHORTCODE$$.LOG_CRITICAL_ERRORS) {

		try {

			var f = File(Folder.desktop + "/criticalErrors.log");
			f.open("a");
			f.writeln(error);
			f.close();

		}
		catch (err) {

			try {
				console.log(error);
			}
			catch (err) {	
			}

		}
	}
}

if (dreamweaver) {

	$$SHORTCODE$$.loadScript = function(extensionDir, scriptPath) {
		try {
			var fullPath = extensionDir + scriptPath;
			var script = DWfile.read(fullPath);
			eval(script);
		}
		catch (err) {			
			$$SHORTCODE$$.errorBeforeLoggingAvailable("hostscript.jsx loadScript throws " + err + " for " + fullPath);	
		}
	}

}
else {

	$$SHORTCODE$$.loadScript = function(extensionDir, scriptPath) {
		try {
			var fullPath = extensionDir + scriptPath;
			var file = File(fullPath);
			file.open("r");
			var script = file.read();
			file.close();
			eval(script);
		}
		catch (err) {			
			$$SHORTCODE$$.errorBeforeLoggingAvailable("hostscript.jsx loadScript throws " + err + " for " + fullPath);	
		}
	}

}

$$SHORTCODE$$.initHostScript = function initHostScript(extensionDir) {

	for (var idx = 0; idx < $$SHORTCODE$$.relativeFilePathsToLoad.length; idx++) {
		var filePath = $$SHORTCODE$$.relativeFilePathsToLoad[idx];
		$$SHORTCODE$$.loadScript(extensionDir, filePath);
	}

}


$if "$$STARTERCODE$$" == "ImageBrowser"

//@include "imageBrowser.jsx"

$endif

