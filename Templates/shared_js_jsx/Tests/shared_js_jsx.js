var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

if (! $$SHORTCODE$$.Tests) {
    $$SHORTCODE$$.Tests = {};
}

if (! $$SHORTCODE$$.Tests.shared_js_jsx) {
    $$SHORTCODE$$.Tests.shared_js_jsx = {};
}

var shared_js_jsx = $$SHORTCODE$$.Tests.shared_js_jsx;

shared_js_jsx.runTests = function runTests() {

    var testResults = "";

    testResults += $$SHORTCODE$$.Utils_Test.runTests();

    return testResults;
}

