//
// This file contains a bunch of general tests using a standalone node.js
//
// node runTests.js
//

// Lives in the current directory
let environment = require('./environment');

// Lives in node_modules, pulls in $$SHORTCODE$$ global object and tests
let runTests = require('runtests');

$$SHORTCODE$$.pushLogLevel($$SHORTCODE$$.C.LOG_NOTE);

runTests();