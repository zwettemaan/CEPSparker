//
// This file contains js code shared between web browser and CEP panel
//

if ("undefined" == typeof SPRK) {
    SPRK = {};
}

(function() {

if (! SPRK.crypto) {
    SPRK.crypto = require('crypto');
}
    
SPRK.hashString = function hashString(s) {    

    // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

    var retVal;

    retVal = 
        SPRK.crypto.createHmac('sha256', SPRK.S.SALT_HASH).
        update(s.toString()).
        digest('hex');

    return retVal;
}


})();