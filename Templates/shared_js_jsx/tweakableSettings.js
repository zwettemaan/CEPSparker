//
// This code is shared between CEP/JavaScript and ExtendScript
//
//
// Tweakable Settings
//

var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

if (! $$SHORTCODE$$.S) {
    $$SHORTCODE$$.S = {}; // stash global settings here
}

// for hashing function
$$SHORTCODE$$.S.SALT_HASH                     = "dswa4343trtwer";

$$SHORTCODE$$.S.LOG_LEVEL                     = $$SHORTCODE$$.C.LOG_NONE;
$$SHORTCODE$$.S.RUN_TESTS                     = true;

$$SHORTCODE$$.S.MANUAL_START_FROM_CHROME      = false;

// LOG_TO_CHROME_CONSOLE also sends the ESTK log to the Chrome console window, 
// but I am using a trick: the log accumulates on the ESTK side until the JavaScript
// logger needs to output something, at which time it will fetch and output the ESTK
// log info too

$$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE         = false;
$$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE           = false;
$$SHORTCODE$$.S.LOG_TO_FILEPATH               = undefined; // file path or undefined
$if "$$STARTERCODE$$" == "ScriptRunner"
$$SHORTCODE$$.S.CHECK_SCRIPT_FOLDER_INTERVAL  = 3000; // MS
$endif
$if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = true;
$else
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = false;
$endif

/* Add any global settings, defaults... here */
