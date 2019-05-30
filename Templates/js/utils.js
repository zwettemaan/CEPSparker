//
// This file mirrors the API of jsx/utils.jsx
//

$$SHORTCODE$$.checkMac = function() {
	return (window.navigator.platform.substr(0,3).toLowerCase() == "mac");
};

$$SHORTCODE$$.setPhotoshopPersistent = function(in_isPersistent) {
    
    if (in_isPersistent) {
        var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
    } else {
        var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
    }
    event.extensionId = $$SHORTCODE$$.C.EXTENSION_ID;
    $$SHORTCODE$$.csInterface.dispatchEvent(event);
}
 
$$SHORTCODE$$.logMessage = function(message) {

   var savedInLogger = $$SHORTCODE$$.inLogger;

    do {
        try {

            if ($$SHORTCODE$$.inLogger) {
                break;
            }

            $$SHORTCODE$$.inLogger = true;
            
            var prefix = "";

            if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE && $$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                // Make sure we can tell the difference between the message origins
                prefix += "JS>>";
            }

            if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE) {
                console.log(prefix + message);
            }

            if ($$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                $$SHORTCODE$$.csInterface.evalScript("$.writeln('" + $$SHORTCODE$$.sQ(prefix + message) + "');");
            }
        }
        catch (err) {        
        }
    }
    while (false);

    $$SHORTCODE$$.inLogger = savedInLogger;
}
