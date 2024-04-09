//
// This code is shared between CEP/JavaScript and ExtendScript
//

var xGlobal = {}; if ("undefined" != typeof global) { xGlobal = global; } else if ("undefined" != typeof $) { xGlobal = $.global; }
if (! xGlobal.$$SHORTCODE$$) {
    xGlobal.$$SHORTCODE$$ = {};
}
var $$SHORTCODE$$ = xGlobal.$$SHORTCODE$$;

$$SHORTCODE$$.runTests = function runTests() {

    var testResults = "";

    if ($$SHORTCODE$$.C.PLATFORM == $$SHORTCODE$$.C.EXTENDSCRIPT) {
        testResults += $$SHORTCODE$$.Tests.shared_js_jsx.runTests();
        testResults += $$SHORTCODE$$.Tests.jsx.runTests();
    }

    if ($$SHORTCODE$$.C.PLATFORM == $$SHORTCODE$$.C.CEP_JAVASCRIPT) {
        testResults += $$SHORTCODE$$.Tests.shared_js_jsx.runTests();
        testResults += $$SHORTCODE$$.Tests.shared_js.runTests();
        testResults += $$SHORTCODE$$.Tests.CEP_js.runTests();
    }

    if ($$SHORTCODE$$.C.PLATFORM == $$SHORTCODE$$.C.NODE_JAVASCRIPT) {
        testResults += $$SHORTCODE$$.Tests.shared_js_jsx.runTests();
        testResults += $$SHORTCODE$$.Tests.shared_js.runTests();
        testResults += $$SHORTCODE$$.Tests.node_js.runTests();
    }

    if ($$SHORTCODE$$.C.PLATFORM == $$SHORTCODE$$.C.BROWSER_JAVASCRIPT) {
        testResults += $$SHORTCODE$$.Tests.shared_js_jsx.runTests();
        testResults += $$SHORTCODE$$.Tests.shared_js.runTests();
        testResults += $$SHORTCODE$$.Tests.browser_js.runTests();
    }

    return testResults;
}
