if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

(function() {

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

})();