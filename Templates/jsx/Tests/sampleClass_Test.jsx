var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

(function() {

$$SHORTCODE$$.SampleClass_Test = {};

$$SHORTCODE$$.SampleClass_Test.test1 = function test1() {

    var failure = "";

    do {

        try {

            success = true;

            if (! success) {
                failure = "test1 failed\n";
            }

        }
        catch (err) {
            failure += "throws " + err;
        }
    }
    while (false);
        
    return failure;
}

$$SHORTCODE$$.SampleClass_Test.runTests = function runTests() {

    var testResults = "";
    
    do {

        try {

            testResults += $$SHORTCODE$$.SampleClass_Test.test1();

            if (! testResults) {
                testResults = "All tests passed\n";
            }
        }
        catch (err) {
            testResults += "throws " + err;
        }
    }
    while (false);

    testResults = "Running SampleClass_Test.jsx\n" + testResults;

    return testResults;
}

})();
