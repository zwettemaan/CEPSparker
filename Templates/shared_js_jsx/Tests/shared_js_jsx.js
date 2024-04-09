var xGlobal = {}; if ("undefined" != typeof global) { xGlobal = global; } else if ("undefined" != typeof $) { xGlobal = $.global; }
if (! xGlobal.$$SHORTCODE$$) {
    xGlobal.$$SHORTCODE$$ = {};
}
var $$SHORTCODE$$ = xGlobal.$$SHORTCODE$$;
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
};

