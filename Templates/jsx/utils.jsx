//
// This file mirrors the API of js/utils.js
//

$$SHORTCODE$$.checkMac = function() {
    return $.os.substr(0,3) == "Mac";
};

$$SHORTCODE$$.logMessage = function(message) {

    if (! $$SHORTCODE$$.inLogger) {

        $$SHORTCODE$$.inLogger = true;
        
        var prefix = "";

        if ($$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE && $$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
            // Make sure we can tell the difference between the message origins
            prefix += "ES>>";
        }

        if ($$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE) {
            $.writeln(prefix + message); 
        }        
    }

    $$SHORTCODE$$.inLogger = false;
}
