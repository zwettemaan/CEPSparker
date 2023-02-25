if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

SPRK.receiveEventFromCEPToIFrame = function receiveEventFromCEPToIFrame(event) {

    do {
        try {

            if (! event.eventType) {
                SPRK.logError(arguments, "need eventType");
                break;
            }

            switch (event.eventType) {

            default:
                {
                    SPRK.logError(arguments, "unhandled event type");
                }
                break;

            case SPRK.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE:
                {
                    if ("object" != typeof event.data) {
                        SPRK.logError(arguments, "no prefs data in event");
                    }
                    else {
                        window.dispatchEvent(
                            new CustomEvent(
                                SPRK.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE, 
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

            case SPRK.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE:
                {
                    if ("object" != typeof event.data) {
                        SPRK.logError(arguments, "no placeholder data in event");
                    }
                    else {
                        window.dispatchEvent(
                            new CustomEvent(
                                SPRK.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE, 
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

            case SPRK.C.IFRAME_EVENT_TYPE_THEME_CHANGE:
                {
                    if ("object" != typeof event.data) {
                        SPRK.logError(arguments, "no skinInfo data in event");
                    }
                    else {
                        SPRK.updateThemeWithAppSkinInfo(event.data);                  
                    }
                }
                break;

            }
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.receiveEventFromIFrameToCEP = function receiveEventFromIFrameToCEP(event) {

    do {
        try {
            if ("object" != typeof event) {
                SPRK.logError(arguments, "need event object");
                break;
            }

            if (! event.eventType) {
                SPRK.logError(arguments, "need eventType");
                break;
            }

            switch (event.eventType) {
            default:
                {
                    SPRK.logError(arguments, "unhandled event type");
                }
                break;
            case SPRK.C.IFRAME_EVENT_TYPE_THEME_REQUEST:
                {
                    SPRK.requestThemeInfo();
                }
                break;
            case SPRK.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_REQUEST:
                {
                    SPRK.sendPlaceholdersFromCEPToIFrame();
                }
                break;
            case SPRK.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE:
                {
                    var data = event.data;
                    if ("object" != typeof data) {
                        SPRK.logError(arguments, "need event.data object");
                        break;
                    }

                    var placeholders = data.placeholders;
                    if ("object" != typeof placeholders) {
                        SPRK.logError(arguments, "need placeholders");
                        break;
                    }

                    SPRK.prefs.placeholders = placeholders;

                    SPRK.savePreferences().
                    then(SPRK.passPreferencesToExtendScript);
                }
                break;
            case SPRK.C.IFRAME_EVENT_TYPE_SHARED_PREFS_REQUEST:
                {
                    SPRK.sendSharedPrefsFromCEPToIFrame();
                }
                break;
            case SPRK.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE:
                {
                    var data = event.data;
                    if ("object" != typeof data) {
                        SPRK.logError(arguments, "need event.data object");
                        break;
                    }

                    var sharedPrefs = data.sharedPrefs;
                    if ("object" != typeof sharedPrefs) {
                        SPRK.logError(arguments, "need sharedPrefs");
                        break;
                    }

                    if (! SPRK.prefs.sharedPrefs) {
                        SPRK.prefs.sharedPrefs = sharedPrefs;
                    }
                    else {
                        for (var attr in sharedPrefs) {
                            SPRK.prefs.sharedPrefs[attr] = sharedPrefs[attr];
                        }
                    }

                    SPRK.savePreferences().
                    then(SPRK.passPreferencesToExtendScript);
                }
                break;
            }
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.receiveMessageFromCEPToIFrame = function receiveMessageFromCEPToIFrame(event) {

    do {
        try {

            if (event.origin !== SPRK.C.EVENT_ORIGIN_CEP_PANEL) {
                SPRK.logError(arguments, "event from unexpected origin: " + event.origin);
                break;
            }

            SPRK.logNote(arguments, "received message " + JSON.stringify(event));

            var message = event.data;

            if ("object" == typeof(message)) {
                if ("eventType" in message) {
                    SPRK.receiveEventFromCEPToIFrame(message);
                    break;
                }
            }

        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.receiveMessageFromIFrameToCEP = function receiveMessageFromIFrameToCEP(event) {

    do {
        try {

            if (event.origin !== SPRK.C.EVENT_ORIGIN_UI_SERVER && event.origin != SPRK.C.EVENT_ORIGIN_UI_DEBUG_SERVER) {
                SPRK.logError(arguments, "event from unexpected origin: " + event.origin);
                break;
            }

            SPRK.logNote(arguments, "received message " + JSON.stringify(event));

            var message = event.data;

            if ("object" == typeof(message)) {
                if ("eventType" in message) {
                    SPRK.receiveEventFromIFrameToCEP(message);
                    break;
                }
            }

        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.sendEventFromCEPToIFrame = function sendEventFromCEPToIFrame(eventType, data) {

    do {
        try {

            if (eventType === undefined) {
                SPRK.logError(arguments, "no eventType");
                break;
            }

            var event = {
                eventType: eventType,
                data: data
            };

            SPRK.sendMessageFromCEPToIFrame(event);
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.sendEventFromIFrameToCEP = function sendEventFromIFrameToCEP(eventType, data) {

    do {
        try {

            if (eventType === undefined) {
                SPRK.logError(arguments, "no eventType");
                break;
            }

            var event = {
                eventType: eventType,
                data: data
            };

            SPRK.sendMessageFromIFrameToCEP(event);
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.sendMessageFromCEPToIFrame = function sendMessageFromCEPToIFrame(data) {

    do {
        try {

            if (data === undefined) {
                SPRK.logError(arguments, "no data");
                break;
            }

            document.querySelector('#' + SPRK.C.HTML_ID_IFRAME).contentWindow.postMessage(data, "*");
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.sendMessageFromIFrameToCEP = function sendMessageFromIFrameToCEP(data) {

    do {
        try {

            if (data === undefined) {
                SPRK.logError(arguments, "no data");
                break;
            }

            window.parent.postMessage(data, "*")
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.sendPlaceholdersFromCEPToIFrame = function sendPlaceholdersFromCEPToIFrame() {

    do {
        try {

            if (! SPRK.prefs.placeholders) {
                SPRK.logError(arguments, "need SPRK.prefs.placeholders");
                break;
            }

            SPRK.sendEventFromCEPToIFrame(SPRK.C.IFRAME_EVENT_TYPE_PLACEHOLDERS_EXCHANGE, SPRK.prefs.placeholders);
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.sendSharedPrefsFromCEPToIFrame = function sendSharedPrefsFromCEPToIFrame() {

    do {
        try {

            if (! SPRK.prefs.sharedPrefs) {
                SPRK.logError(arguments, "need SPRK.prefs.sharedPrefs");
                break;
            }

            SPRK.sendEventFromCEPToIFrame(SPRK.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE, SPRK.prefs.sharedPrefs);
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.sendThemeChangeEventFromCEPToIFrame = function sendThemeChangeEventFromCEPToIFrame(skinInfo) {

    do {

        try {

            if (skinInfo === undefined) {
                SPRK.logError(arguments, "no skinInfo");
                break;
            }

            SPRK.sendEventFromCEPToIFrame(SPRK.C.IFRAME_EVENT_TYPE_THEME_CHANGE, skinInfo);
        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

SPRK.setupIFrameFromServer = function setupIFrameFromServer() {

    window.addEventListener("message", SPRK.receiveMessageFromCEPToIFrame, false);
    window.addEventListener(SPRK.C.IFRAME_EVENT_TYPE_SHARED_PREFS_EXCHANGE, function PrefsExchangeEventListener(event) {

        if (! SPRK.prefs) {
            SPRK.prefs = {};
        }

        if (! SPRK.prefs.sharedPrefs) {
            SPRK.prefs.sharedPrefs = {};
        }

        if (event.detail.sharedPrefs) {
            for (var attr in event.detail.sharedPrefs) {
                SPRK.prefs.sharedPrefs[attr] = event.detail.sharedPrefs[attr];
            }
        }

      });

    SPRK.sendEventFromIFrameToCEP(
        SPRK.C.IFRAME_EVENT_TYPE_SHARED_PREFS_REQUEST);

}

SPRK.setupIFrameInCEPPanel = function setupIFrameInCEPPanel() {

    do {

        try {

            $('#' + SPRK.C.HTML_ID_IFRAME_CONTAINER).html(
                '<iframe' + 
                ' id="' + SPRK.C.HTML_ID_IFRAME + '"' + 
                ' src="' + SPRK.C.HTML_SRC_IFRAME + '?' + SPRK.randomGUID() + '"' +
                '>' + '</iframe>');

            window.addEventListener("message", SPRK.receiveMessageFromIFrameToCEP, false);

        }
        catch (err) {
            SPRK.logError(arguments, "throws " + err);
        }
    }
    while (false);

}

})();