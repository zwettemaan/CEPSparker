$if "$$TARGETAPP$$" == "IDSN"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif
$if "$$TARGETAPP$$" == "KBRG"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif
$if "$$TARGETAPP$$" == "MULTIPLE"
//@targetengine $$EXTENSION_ID$$_Engine_Id
$endif

var dreamweaver;
var app;

var $$SHORTCODE$$;
if (! $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.LOG_CRITICAL_ERRORS = false;

$$SHORTCODE$$.relativeFilePathsToLoad = [
		"jsx/json2.jsx",
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
		var fullPath = extensionDir + scriptPath;
		var script = DWfile.read(fullPath);
		try {
			eval(script);
		}
		catch (err) {			
			$$SHORTCODE$$.errorBeforeLoggingAvailable("hostscript.jsx loadScript throws " + err + " for " + fullPath);	
		}
	}

}
else {

	$$SHORTCODE$$.loadScript = function(extensionDir, scriptPath) {
		var fullPath = extensionDir + scriptPath;
		try {
			$.evalFile(fullPath);
		}
		catch (err) {
			$$SHORTCODE$$.errorBeforeLoggingAvailable("hostscript.jsx loadScript throws " + err + " for " + fullPath);	
		}
	}

}

$$SHORTCODE$$.initHostScript = function(extensionDir) {

	for (var idx = 0; idx < $$SHORTCODE$$.relativeFilePathsToLoad.length; idx++) {
		var filePath = $$SHORTCODE$$.relativeFilePathsToLoad[idx];
		$$SHORTCODE$$.loadScript(extensionDir, filePath);
	}

}


$if "$$STARTERCODE$$" == "ImageBrowser"

//@include "imageBrowser.jsx"

$endif

