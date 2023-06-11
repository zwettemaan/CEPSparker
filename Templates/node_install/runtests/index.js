
module.exports = runTests;

require("../../shared_js_jsx/globals.js");
require("../../shared_js_jsx/tweakableSettings.js");
require("../../shared_js_jsx/utils.js");
require("../../shared_js/utils.js");
require("../../shared_js/cryptoUtils.js");
require("../../shared_js_jsx/pathUtils.js");
require("../../node_js/pathUtils.js");

require("../../node_js/utils.js");
require("../../node_js/init.js");

require("../../shared_js/init.js");
require("../../shared_js_jsx/init.js");

require("../../shared_js_jsx/Tests/utils_Test.js");
require("../../shared_js_jsx/Tests/shared_js_jsx.js");

require("../../shared_js/Tests/shared_js.js");

require("../../node_js/Tests/node_js.js");

require("../../shared_js_jsx/tests.js");


function runTests() {

    $$SHORTCODE$$.init();

    $$SHORTCODE$$.logNote(arguments, "Start tests - list of failures (if any) follows:\n");

    var testResults;

    testResults = $$SHORTCODE$$.runTests();
    if (testResults) {
        $$SHORTCODE$$.logNote(arguments, testResults);
    }

    $$SHORTCODE$$.logNote(arguments, "Completed tests");

}