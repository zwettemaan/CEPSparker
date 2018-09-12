//
// This code is shared between CEP/JavaScript and ExtendScript
//
//
// Tweakable Settings
//

if (! $$SHORTCODE$$.S) {
	$$SHORTCODE$$.S = {}; // stash global settings here
}

$$SHORTCODE$$.S.LOG_LEVEL                     = $$SHORTCODE$$.C.LOG_NONE;

$$SHORTCODE$$.S.MANUAL_START_FROM_CHROME      = false;
$$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE         = false;
$$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE           = false;
$$SHORTCODE$$.S.LOG_TO_FILEPATH               = undefined; // file path or undefined

$$SHORTCODE$$.S.AI_DEFAULT_SCRIPT_DEBUG_TIMEOUT_MS = 10000;
$$SHORTCODE$$.S.AI_SCRIPT_DEBUG_SLEEP_MS           = 100;
$$SHORTCODE$$.S.AI_SCRIPT_DEBUG_COMMAND_MAC        = "Mac/launchAIScript.command";
$$SHORTCODE$$.S.AI_SCRIPT_DEBUG_TMPFILE_PREFIX     = "/tmp/evalScript_AI_DEBUG";

/* Add any global settings, defaults... here */
