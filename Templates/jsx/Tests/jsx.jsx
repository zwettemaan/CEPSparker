var xGlobal = {}; if ("undefined" != typeof global) { xGlobal = global; } else if ("undefined" != typeof $) { xGlobal = $.global; }
if (! xGlobal.$$SHORTCODE$$) {
    xGlobal.$$SHORTCODE$$ = {};
}
var $$SHORTCODE$$ = xGlobal.$$SHORTCODE$$;

if (! $$SHORTCODE$$.Tests) {
    $$SHORTCODE$$.Tests = {};
}

if (! $$SHORTCODE$$.Tests.jsx) {
    $$SHORTCODE$$.Tests.jsx = {};
}

var jsx = $$SHORTCODE$$.Tests.jsx;

jsx.runTests = function runTests() {

    var testResults = "";

    testResults += $$SHORTCODE$$.SampleClass_Test.runTests();

    return testResults;
}
