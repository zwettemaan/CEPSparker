const fs = require('fs');
const path = require('path');
const { env } = require('process');

let environment = {};

module.exports = environment;

environment.getPlatformGlobals = function getPlatformGlobals() {
    return global;
}

environment.defineGlobalObject = function defineGlobalObject(globalName) {
    if (! platformGlobals[globalName]) {
        platformGlobals[globalName] = {};
    }
    return platformGlobals[globalName];
}

environment.include = function include(relativePath) {
    // Create an error to capture the stack trace
    const err = new Error();

    // Get the caller file path from the stack trace
    const stackLines = err.stack.split('\n');
    const callerLine = stackLines[2]; // The caller line should be the third line in the stack trace

    // Extract the file path using a regular expression
    const callerPathMatch = callerLine.match(/\((.*):\d+:\d+\)/);
    if (! callerPathMatch) {
        throw new Error('Could not determine caller file path');
    }

    const callerPath = callerPathMatch[1];
    const callerDir = path.dirname(callerPath);

    // Resolve the full path of the file to include
    const fullPath = path.join(callerDir, relativePath);

    // Read and execute the file content
    const script = fs.readFileSync(fullPath, 'utf8');
    eval(script);
}

// Create a few global functions
let platformGlobals = environment.getPlatformGlobals();
platformGlobals.include = environment.include;
platformGlobals.getPlatformGlobals = environment.getPlatformGlobals;
platformGlobals.defineGlobalObject = environment.defineGlobalObject;

var $$SHORTCODE$$ = environment.defineGlobalObject("$$SHORTCODE$$");

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

$$SHORTCODE$$.C.BROWSER_JAVASCRIPT                       = "Browser JavaScript";
$$SHORTCODE$$.C.CEP_JAVASCRIPT                           = "CEP JavaScript";
$$SHORTCODE$$.C.EXTENDSCRIPT                             = "ExtendScript";
$$SHORTCODE$$.C.NODE_JAVASCRIPT                          = "Node JavaScript";

$$SHORTCODE$$.C.PLATFORM                                 = $$SHORTCODE$$.C.NODE_JAVASCRIPT;