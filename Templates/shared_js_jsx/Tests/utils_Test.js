if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.Utils_Test = {};

function formattedGUID_test(input, expectedOutput) {

    var failure = "";

    var output = $$SHORTCODE$$.formattedGUID(input);
    if (output != expectedOutput) {
        failure = "$$SHORTCODE$$.formattedGUID(" + input + "): expected: '" + expectedOutput + "' but instead got: '" + output + "'\n";
    }

    return failure;
}

function canonicalGUID_test(input, expectedOutput) {

    var failure = "";

    var output = $$SHORTCODE$$.canonicalGUID(input);
    if (output != expectedOutput) {
        failure = "$$SHORTCODE$$.canonicalGUID(" + input + "): expected: '" + expectedOutput + "' but instead got: '" + output + "'\n";
    }

    return failure;
}

function canonicalNumber_test(input, expectedOutput) {

    var failure = "";

    var output = $$SHORTCODE$$.canonicalNumber(input);
    if (output != expectedOutput) {
        failure = "$$SHORTCODE$$.canonicalNumber(" + input + "): expected: '" + expectedOutput + "' but instead got: '" + output + "'\n";
    }

    return failure;
}

function resolvePlaceholders_test() {

    var failure = "";

    var obj = {
        "x{Placeholder}": "{Placeholder1}",
        "a": "{Placeholder}B",
        "c": "C{Placeholder1}B",
        "d": [ "{Placeholder}{Placeholder}", "C{Placeholder1}B{Placeholder}" ],
        "e": { 
            "f": "{Placeholder}{Placeholder}", 
            "g": "C{Placeholder1}B{Placeholder}" 
        }
    };

    var map = {
        "Placeholder": "XX",
        "Placeholder1": "YY",
    };

    var resolvedObj = $$SHORTCODE$$.resolvePlaceholders(map, obj);

    var expectedObj = {
        "xXX": "YY",
        "a": "XXB",
        "c": "CYYB",
        "d": [ "XXXX", "CYYBXX" ],
        "e": { 
            "f": "XXXX", 
            "g": "CYYBXX" 
        }
    };

    if (! $$SHORTCODE$$.jsEqual(resolvedObj, expectedObj)) {
        failure = "$$SHORTCODE$$.resolvePlaceholder did not resolve properly\n";
    }

    return failure;

}

function endsWith_test(haystack, needle, validity) {

    var failure = "";

    var output = $$SHORTCODE$$.endsWith(haystack, needle);
    if (output !== validity) {
        failure = "$$SHORTCODE$$.endsWith('" + haystack + "', '" + needle + "'): expected: '" + validity + "'\n";
    }

    return failure;
}

function startsWith_test(haystack, needle, validity) {

    var failure = "";

    var output = $$SHORTCODE$$.startsWith(haystack, needle);
    if (output !== validity) {
        failure = "$$SHORTCODE$$.endsWith('" + haystack + "', '" + needle + "'): expected: '" + validity + "'\n";
    }

    return failure;
}

function padLeft_test(s, c, len, validity) {

    var failure = "";

    var output = $$SHORTCODE$$.padLeft(s, c, len);
    if (output !== validity) {
        failure = "$$SHORTCODE$$.padLeft('" + s + "', '" + c + "', " + len + "): expected: '" + validity + "'\n";
    }

    return failure;
}

function padRight_test(s, c, len, validity) {

    var failure = "";

    var output = $$SHORTCODE$$.padRight(s, c, len);
    if (output !== validity) {
        failure = "$$SHORTCODE$$.padRight('" + s + "', '" + c + "', " + len + "): expected: '" + validity + "'\n";
    }

    return failure;
}

$$SHORTCODE$$.Utils_Test.runTests = function runTests() {

    var testResults = "";

    testResults += resolvePlaceholders_test();
    
    testResults += padLeft_test(       "", "x", 0,             "");
    testResults += padLeft_test(       "", "x", 1,             "x");
    testResults += padLeft_test(       "", "x", 2,             "xx");
    testResults += padLeft_test(       "", "x", -1,            "");
    testResults += padRight_test(      "", "x", 0,             "");
    testResults += padRight_test(      "", "x", 1,             "x");
    testResults += padRight_test(      "", "x", 2,             "xx");
    testResults += padRight_test(      "", "x", -1,            "");
    testResults += padLeft_test(       "A", "x", 0,            "");
    testResults += padLeft_test(       "A", "x", 1,            "A");
    testResults += padLeft_test(       "A", "x", 2,            "xA");
    testResults += padLeft_test(       "A", "x", -1,           "");
    testResults += padRight_test(      "A", "x", 0,            "");
    testResults += padRight_test(      "A", "x", 1,            "A");
    testResults += padRight_test(      "A", "x", 2,            "Ax");
    testResults += padRight_test(      "A", "x", -1,           "");
    testResults += padLeft_test(       "AB", "x", 0,           "");
    testResults += padLeft_test(       "AB", "x", 1,           "B");
    testResults += padLeft_test(       "AB", "x", 2,           "AB");
    testResults += padLeft_test(       "AB", "x", 3,           "xAB");
    testResults += padLeft_test(       "AB", "x", -1,           "");
    testResults += padRight_test(      "AB", "x", 0,            "");
    testResults += padRight_test(      "AB", "x", 1,            "A");
    testResults += padRight_test(      "AB", "x", 2,            "AB");
    testResults += padRight_test(      "AB", "x", 3,            "ABx");
    testResults += padRight_test(      "AB", "x", -1,           "");

    testResults += canonicalNumber_test(     1,         "1");
    testResults += canonicalNumber_test(     0,         "0");
    testResults += canonicalNumber_test(    -1,        "-1");
    testResults += canonicalNumber_test(     1.1,       "0.1100000000e1");
    testResults += canonicalNumber_test(    -1.1,      "-0.1100000000e1");
    testResults += canonicalNumber_test( 10000.0,   "10000");
    testResults += canonicalNumber_test(-10000.0,  "-10000");
    testResults += canonicalNumber_test( 10000.1,       "0.1000010000e5");
    testResults += canonicalNumber_test(     0.00001,   "0.1000000000e-4");
    testResults += canonicalNumber_test(    -0.00001,  "-0.1000000000e-4");

    testResults += canonicalGUID_test(      null,                                     "");
    testResults += canonicalGUID_test(      [],                                       "");
    testResults += canonicalGUID_test(      {"a":1},                                  "");
    testResults += canonicalGUID_test(      [1,2,3],                                  "");
    testResults += canonicalGUID_test(      "1234567890abcdef1234567890ABCDEF",       "1234567890abcdef1234567890abcdef");
    testResults += canonicalGUID_test(      "786b47a0553e4ee2ac6d6f8b5d66f5e1",       "786b47a0553e4ee2ac6d6f8b5d66f5e1");
    testResults += canonicalGUID_test(      "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1",   "786b47a0553e4ee2ac6d6f8b5d66f5e1");
    testResults += canonicalGUID_test(      "786b47a0X553eY4ee2=ac6d_6f8b5d66f5e1",   "786b47a0553e4ee2ac6d6f8b5d66f5e1");
    testResults += canonicalGUID_test(      "786b47a0553g4ee2ac6d6f8b5d66f5e1",       "");
    testResults += canonicalGUID_test(      "786b47a0553e4ee2ac6d6f8b5d66f5e10000",   "786b47a0553e4ee2ac6d6f8b5d66f5e1");
    testResults += canonicalGUID_test(      "786b47a0553e4ee2ac6d6f8b5d66f5e10XXX",   "786b47a0553e4ee2ac6d6f8b5d66f5e1");
    testResults += canonicalGUID_test(      "786b47a055--3e4ee2ac6d6f8b5d66f5e10XXX", "786b47a0553e4ee2ac6d6f8b5d66f5e1");
    testResults += canonicalGUID_test(      "a0b1c2d3-e4f5-0617-2839-4A5B6C7D8E9F",   "a0b1c2d3e4f5061728394a5b6c7d8e9f");

    testResults += formattedGUID_test(      "786b47a0553e4ee2ac6d6f8b5d66f5e1",       "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1");
    testResults += formattedGUID_test(      "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1",   "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1");
    testResults += formattedGUID_test(      "786b47a0X553eY4ee2=ac6d_6f8b5d66f5e1",   "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1");
    testResults += formattedGUID_test(      "786b47a0553g4ee2ac6d6f8b5d66f5e1",       "");
    testResults += formattedGUID_test(      "786b47a0553e4ee2ac6d6f8b5d66f5e10000",   "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1");
    testResults += formattedGUID_test(      "786b47a0553e4ee2ac6d6f8b5d66f5e10XXX",   "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1");
    testResults += formattedGUID_test(      "786b47a055--3e4ee2ac6d6f8b5d66f5e10XXX", "786b47a0-553e-4ee2-ac6d-6f8b5d66f5e1");
    testResults += formattedGUID_test(      "a0b1c2d3-e4f5-0617-2839-4A5B6C7D8E9F",   "a0b1c2d3-e4f5-0617-2839-4a5b6c7d8e9f");


    testResults += startsWith_test("",                 "",     true);
    testResults += startsWith_test("a",                "a",    true);
    testResults += startsWith_test("aa",               "a",    true);
    testResults += startsWith_test("this",             "this", true);
    testResults += startsWith_test("this is a test",   "this", true);

    testResults += startsWith_test("",                 "a",    false);
    testResults += startsWith_test("a",                "ba",   false);
    testResults += startsWith_test("a",                "aa",   false);
    testResults += startsWith_test("this",             "thos", false);
    testResults += startsWith_test("this is a test",   "thos", false);

    testResults += endsWith_test(  "",                 "",     true);
    testResults += endsWith_test(  "a",                "a",    true);
    testResults += endsWith_test(  "aa",               "a",    true);
    testResults += endsWith_test(  "this",             "this", true);
    testResults += endsWith_test(  "a test, this",     "this", true);

    testResults += endsWith_test(  "",                 "a",    false);
    testResults += endsWith_test(  "a",                "ba",   false);
    testResults += endsWith_test(  "a",                "aa",   false);
    testResults += endsWith_test(  "this",             "thos", false);
    testResults += endsWith_test(  "a test, this",     "thos", false);

    if (! testResults) {
        testResults = "All tests passed\n";
    }

    testResults = "Running Utils_Test.js\n" + testResults;

    return testResults;
}
