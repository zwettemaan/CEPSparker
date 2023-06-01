//
// This file contains a bunch of general tests using a standalone node.js
//
// node runTests.js
//

var runTests = require('runtests');

// The tests trigger logger events, which are expected and not relevant
// Suppress log output.
$$SHORTCODE$$.S.LOG_LEVEL = 0;

runTests();