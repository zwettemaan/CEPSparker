//
// This file mirrors the API of jsx/utils.jsx
//

$$SHORTCODE$$.checkMac = function() {
	return (window.navigator.platform.substr(0,3).toLowerCase() == "mac");
};

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
                console.log(prefix + s);
            }

            if ($$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
                $$SHORTCODE$$.csInterface.evalScript("$.writeln('" + $$SHORTCODE$$.sQ(prefix + s) + "');");
            }
        }
        catch (err) {        
        }
    }
    while (false);

    $$SHORTCODE$$.inLogger = savedInLogger;
}
