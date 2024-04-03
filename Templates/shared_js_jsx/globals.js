//
// This code is shared between CEP/JavaScript and ExtendScript
//

// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {}; // stash constants here   
}

$$SHORTCODE$$.C.HTML_ID_IFRAME                           = "$$SHORTCODE$$_iFrame";
$$SHORTCODE$$.C.HTML_ID_IFRAME_CONTAINER                 = "$$SHORTCODE$$_iFrameWrapper";
$$SHORTCODE$$.C.HTML_SRC_IFRAME                          = "http://localhost:$$IFRAME_UI_PORT$$/panelUI.html";

$$SHORTCODE$$.C.BROWSER_JAVASCRIPT                       = "Browser JavaScript";
$$SHORTCODE$$.C.CEP_JAVASCRIPT                           = "CEP JavaScript";
$$SHORTCODE$$.C.EXTENDSCRIPT                             = "ExtendScript";
$$SHORTCODE$$.C.NODE_JAVASCRIPT                          = "Node JavaScript";

$$SHORTCODE$$.C.TARGET_DIRNAME                           = "$$TARGET_DIRNAME$$";
$$SHORTCODE$$.C.DIRNAME_PREFERENCES                      = "$$TARGET_DIRNAME$$";
$$SHORTCODE$$.C.FILENAME_PREFERENCES                     = "$$PREFS_FILENAME$$";
$$SHORTCODE$$.C.EXTENSION_ID                             = "$$EXTENSION_ID$$";

$$SHORTCODE$$.C.LOG_NONE                                 = 0;
$$SHORTCODE$$.C.LOG_ERROR                                = 1;
$$SHORTCODE$$.C.LOG_WARN                                 = 2;
$$SHORTCODE$$.C.LOG_NOTE                                 = 3;
$$SHORTCODE$$.C.LOG_TRACE                                = 4;

$$SHORTCODE$$.C.APP_CODE_INDESIGN                        = "IDSN";
$$SHORTCODE$$.C.APP_CODE_INCOPY                          = "AICY";
$$SHORTCODE$$.C.APP_CODE_PHOTOSHOP_OLD                   = "PHSP";
$$SHORTCODE$$.C.APP_CODE_PHOTOSHOP                       = "PHXS";
$$SHORTCODE$$.C.APP_CODE_ILLUSTRATOR                     = "ILST";
$$SHORTCODE$$.C.APP_CODE_PREMIERE_PRO                    = "PPRO";
$$SHORTCODE$$.C.APP_CODE_AFTER_EFFECTS                   = "AEFT";
$$SHORTCODE$$.C.APP_CODE_PRELUDE                         = "PRLD";
$$SHORTCODE$$.C.APP_CODE_FLASH_PRO                       = "FLPR";
$$SHORTCODE$$.C.APP_CODE_DREAMWEAVER                     = "DRWV";
$$SHORTCODE$$.C.APP_CODE_BRIDGE                          = "KBRG";

$$SHORTCODE$$.C.ENCODING_UTF8                            = "utf8";

$if "$$STARTERCODE$$" == "IFrameUIServer"
$$SHORTCODE$$.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE  = "placeholdersExchange";
$$SHORTCODE$$.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_REQUEST   = "placeholdersRequest";
$$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE  = "sharedPrefsExchange";
$$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_REQUEST   = "sharedPrefsRequest";
$$SHORTCODE$$.C.IFRAME_EVENT_TYPE_THEME_CHANGE           = "themeChange";
$$SHORTCODE$$.C.IFRAME_EVENT_TYPE_THEME_REQUEST          = "themeRequest";
$$SHORTCODE$$.C.IFRAME_EVENT_TYPE_NEW_DOCUMENT           = "newdocument";

// Adjust EVENT_ORIGIN_UI_SERVER to the real server info.
$$SHORTCODE$$.C.EVENT_ORIGIN_UI_SERVER        = "http://localhost:$$IFRAME_UI_PORT$$";
$$SHORTCODE$$.C.EVENT_ORIGIN_UI_DEBUG_SERVER  = "http://localhost:$$IFRAME_UI_PORT$$";
$$SHORTCODE$$.C.EVENT_ORIGIN_CEP_PANEL        = "";

$endif

/* Add any global constants */
