if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.receiveEventFromCEPToIFrame = function receiveEventFromCEPToIFrame(event) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (! event.eventType) {
                $$SHORTCODE$$.logError(arguments, "need eventType");
                break;
            }

            switch (event.eventType) {

            default:
                {
                    $$SHORTCODE$$.logError(arguments, "unhandled event type");
                }
                break;

            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE:
                {
                    if ("object" != typeof event.data) {
                        $$SHORTCODE$$.logError(arguments, "no prefs data in event");
                    }
                    else {
                        window.dispatchEvent(
                            new CustomEvent(
                                $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE, 
                                { 
                                    detail: {
                                        sharedPrefs: event.data 
                                    }
                                }
                            )
                        );
                    }
                }
                break;

            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE:
                {
                    if ("object" != typeof event.data) {
                        $$SHORTCODE$$.logError(arguments, "no placeholder data in event");
                    }
                    else {
                        window.dispatchEvent(
                            new CustomEvent(
                                $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE, 
                                { 
                                    detail: {
                                        placeholders: event.data 
                                    }
                                }
                            )
                        );
                    }
                }
                break;

            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_THEME_CHANGE:
                {
                    if ("object" != typeof event.data) {
                        $$SHORTCODE$$.logError(arguments, "no skinInfo data in event");
                    }
                    else {
                        $$SHORTCODE$$.updateThemeWithAppSkinInfo(event.data);                  
                    }
                }
                break;

            }
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.receiveEventFromIFrameToCEP = function receiveEventFromIFrameToCEP(event) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {
            if ("object" != typeof event) {
                $$SHORTCODE$$.logError(arguments, "need event object");
                break;
            }

            if (! event.eventType) {
                $$SHORTCODE$$.logError(arguments, "need eventType");
                break;
            }

            switch (event.eventType) {
            default:
                {
                    $$SHORTCODE$$.logError(arguments, "unhandled event type");
                }
                break;
            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_NEW_DOCUMENT:
                {
                    var esScript = "app.documents.add()";
                    $$SHORTCODE$$.csInterface.evalScript(esScript);
                }
                break;                                
            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_THEME_REQUEST:
                {
                    $$SHORTCODE$$.requestThemeInfo();
                }
                break;
            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_REQUEST:
                {
                    $$SHORTCODE$$.sendPlaceholdersFromCEPToIFrame();
                }
                break;
            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE:
                {
                    var data = event.data;
                    if ("object" != typeof data) {
                        $$SHORTCODE$$.logError(arguments, "need event.data object");
                        break;
                    }

                    var placeholders = data.placeholders;
                    if ("object" != typeof placeholders) {
                        $$SHORTCODE$$.logError(arguments, "need placeholders");
                        break;
                    }

                    $$SHORTCODE$$.prefs.placeholders = placeholders;

                    $$SHORTCODE$$.savePreferences().
                    then($$SHORTCODE$$.passPreferencesToExtendScript);
                }
                break;
            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_REQUEST:
                {
                    $$SHORTCODE$$.sendSharedPrefsFromCEPToIFrame();
                }
                break;
            case $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE:
                {
                    var data = event.data;
                    if ("object" != typeof data) {
                        $$SHORTCODE$$.logError(arguments, "need event.data object");
                        break;
                    }

                    var sharedPrefs = data.sharedPrefs;
                    if ("object" != typeof sharedPrefs) {
                        $$SHORTCODE$$.logError(arguments, "need sharedPrefs");
                        break;
                    }

                    if (! $$SHORTCODE$$.prefs.sharedPrefs) {
                        $$SHORTCODE$$.prefs.sharedPrefs = sharedPrefs;
                    }
                    else {
                        for (var attr in sharedPrefs) {
                            $$SHORTCODE$$.prefs.sharedPrefs[attr] = sharedPrefs[attr];
                        }
                    }

                    $$SHORTCODE$$.savePreferences().
                    then($$SHORTCODE$$.passPreferencesToExtendScript);
                }
                break;
            }
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.receiveMessageFromCEPToIFrame = function receiveMessageFromCEPToIFrame(event) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (event.origin !== $$SHORTCODE$$.C.EVENT_ORIGIN_CEP_PANEL) {
                $$SHORTCODE$$.logError(arguments, "event from unexpected origin: " + event.origin);
                break;
            }

            $$SHORTCODE$$.logNote(arguments, "received message " + JSON.stringify(event));

            var message = event.data;

            if ("object" == typeof(message)) {
                if ("eventType" in message) {
                    $$SHORTCODE$$.receiveEventFromCEPToIFrame(message);
                    break;
                }
            }

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.receiveMessageFromIFrameToCEP = function receiveMessageFromIFrameToCEP(event) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (event.origin !== $$SHORTCODE$$.C.EVENT_ORIGIN_UI_SERVER && event.origin != $$SHORTCODE$$.C.EVENT_ORIGIN_UI_DEBUG_SERVER) {
                $$SHORTCODE$$.logError(arguments, "event from unexpected origin: " + event.origin);
                break;
            }

            $$SHORTCODE$$.logNote(arguments, "received message " + JSON.stringify(event));

            var message = event.data;

            if ("object" == typeof(message)) {
                if ("eventType" in message) {
                    $$SHORTCODE$$.receiveEventFromIFrameToCEP(message);
                    break;
                }
            }

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.sendEventFromCEPToIFrame = function sendEventFromCEPToIFrame(eventType, data) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (eventType === undefined) {
                $$SHORTCODE$$.logError(arguments, "no eventType");
                break;
            }

            var event = {
                eventType: eventType,
                data: data
            };

            $$SHORTCODE$$.sendMessageFromCEPToIFrame(event);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.sendEventFromIFrameToCEP = function sendEventFromIFrameToCEP(eventType, data) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (eventType === undefined) {
                $$SHORTCODE$$.logError(arguments, "no eventType");
                break;
            }

            var event = {
                eventType: eventType,
                data: data
            };

            $$SHORTCODE$$.sendMessageFromIFrameToCEP(event);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.sendMessageFromCEPToIFrame = function sendMessageFromCEPToIFrame(data) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (data === undefined) {
                $$SHORTCODE$$.logError(arguments, "no data");
                break;
            }

            document.querySelector('#' + $$SHORTCODE$$.C.HTML_ID_IFRAME).contentWindow.postMessage(data, "*");
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.sendMessageFromIFrameToCEP = function sendMessageFromIFrameToCEP(data) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (data === undefined) {
                $$SHORTCODE$$.logError(arguments, "no data");
                break;
            }

            window.parent.postMessage(data, "*")
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.sendPlaceholdersFromCEPToIFrame = function sendPlaceholdersFromCEPToIFrame() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (! $$SHORTCODE$$.prefs.placeholders) {
                $$SHORTCODE$$.logError(arguments, "need $$SHORTCODE$$.prefs.placeholders");
                break;
            }

            $$SHORTCODE$$.sendEventFromCEPToIFrame($$SHORTCODE$$.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE, $$SHORTCODE$$.prefs.placeholders);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.sendSharedPrefsFromCEPToIFrame = function sendSharedPrefsFromCEPToIFrame() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if (! $$SHORTCODE$$.prefs.sharedPrefs) {
                $$SHORTCODE$$.logError(arguments, "need $$SHORTCODE$$.prefs.sharedPrefs");
                break;
            }

            $$SHORTCODE$$.sendEventFromCEPToIFrame($$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE, $$SHORTCODE$$.prefs.sharedPrefs);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.sendThemeChangeEventFromCEPToIFrame = function sendThemeChangeEventFromCEPToIFrame(skinInfo) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            if (skinInfo === undefined) {
                $$SHORTCODE$$.logError(arguments, "no skinInfo");
                break;
            }

            $$SHORTCODE$$.sendEventFromCEPToIFrame($$SHORTCODE$$.C.IFRAME_EVENT_TYPE_THEME_CHANGE, skinInfo);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.setupIFrameFromServer = function setupIFrameFromServer() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    window.addEventListener("message", $$SHORTCODE$$.receiveMessageFromCEPToIFrame, false);
    window.addEventListener($$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE, function PrefsExchangeEventListener(event) {

        if (! $$SHORTCODE$$.prefs) {
            $$SHORTCODE$$.prefs = {};
        }

        if (! $$SHORTCODE$$.prefs.sharedPrefs) {
            $$SHORTCODE$$.prefs.sharedPrefs = {};
        }

        if (event.detail.sharedPrefs) {
            for (var attr in event.detail.sharedPrefs) {
                $$SHORTCODE$$.prefs.sharedPrefs[attr] = event.detail.sharedPrefs[attr];
            }
        }

      });

    $$SHORTCODE$$.sendEventFromIFrameToCEP(
        $$SHORTCODE$$.C.IFRAME_EVENT_TYPE_SHARED_PREFS_REQUEST);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.setupIFrameInCEPPanel = function setupIFrameInCEPPanel() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            $('#' + $$SHORTCODE$$.C.HTML_ID_IFRAME_CONTAINER).html(
                '<iframe' + 
                ' id="' + $$SHORTCODE$$.C.HTML_ID_IFRAME + '"' + 
                ' src="' + $$SHORTCODE$$.C.HTML_SRC_IFRAME + '?' + $$SHORTCODE$$.randomGUID() + '"' +
                '>' + '</iframe>');

            window.addEventListener("message", $$SHORTCODE$$.receiveMessageFromIFrameToCEP, false);

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}
