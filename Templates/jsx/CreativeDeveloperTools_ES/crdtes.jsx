/**
 * Creative Developer Tools (CRDT) is a growing suite of tools aimed at script developers and plug-in developers for the Adobe Creative Cloud eco-system.<br>
 * <br>
 * Currently, it is at an alpha stage: the feature set is not frozen, and new features are added regularly.<br>
 * <br>
 * There are two different versions of CRDT: one for UXP/UXPScript and another for ExtendScript.<br>
 * <br>
 * The software is functional and useful, but without a doubt, there will be bugs and dragons…<br>
 * <br>
 * Features include:<br>
 * <br>
 * - Provides a unique machine GUID for each end-user computer<br>
 * - Provides a unique account GUID for each end user<br>
 * - Add licensing and activation features to your script<br>
 * - Protect sensitive source code and make it hard to reverse engineer<br>
 * - AES-256 encryption/decryption functions<br>
 * - Base64 encode and decode functions<br>
 * <br>
 * More to come! You can contact us on dev@rorohiko.com with feature request<br>
 * <br>
 * For downloading and installation info, visit<br>
 * <br>
 * https://CreativeDeveloperTools.com<br>
 *
 * @module crdtes
 * @namespace crdtes
 */

var crdtes = getPlatformGlobals().defineGlobalObject("crdtes");

(function() {

/**
 * The Tightener daemon provides persistent named scopes (similar to persistent ExtendScript engines).<br>
 * <br>
 * When executing multiple TQL scripts in succession a named scope will retain any globals that<br>
 * were defined by a previous script.<br>
 *
 * @constant {string} TQL_SCOPE_NAME_DEFAULT
 */
const TQL_SCOPE_NAME_DEFAULT = "defaultScope";

const LOCALE_EN_US                             = "en_US";

const DEFAULT_LOCALE                           = LOCALE_EN_US;

const STATE_IDLE                               =  0;
const STATE_SEEN_OPEN_SQUARE_BRACKET           =  1;
const STATE_SEEN_NON_WHITE                     =  2;
const STATE_AFTER_NON_WHITE                    =  3;
const STATE_SEEN_EQUAL                         =  4;
const STATE_ERROR                              =  5;
const STATE_SEEN_CLOSE_SQUARE_BRACKET          =  6;
const STATE_IN_COMMENT                         =  7;

const REGEXP_TRIM                              = /^\s*(\S?.*?)\s*$/;
const REGEXP_TRIM_REPLACE                      = "$1";
const REGEXP_DESPACE                           = /\s+/g;
const REGEXP_DESPACE_REPLACE                   = "";
const REGEXP_ALPHA_ONLY                        = /[^-a-zA-Z0-9_$]+/g;
const REGEXP_ALPHA_ONLY_REPLACE                = "";
const REGEXP_SECTION_NAME_ONLY                 = /[^-a-zA-Z0-9_$:]+/g;
const REGEXP_SECTION_NAME_ONLY_REPLACE         = "";
const REGEXP_NUMBER_ONLY                       = /^([\d\.]+).*$/;
const REGEXP_NUMBER_ONLY_REPLACE               = "$1";
const REGEXP_UNIT_ONLY                         = /^[\d\.]+\s*(.*)$/;
const REGEXP_UNIT_ONLY_REPLACE                 = "$1";
const REGEXP_PICAS                             = /^([\d]+)p(([\d]*)(\.([\d]+)?)?)?$/;
const REGEXP_PICAS_REPLACE                     = "$1";
const REGEXP_PICAS_POINTS_REPLACE              = "$2";
const REGEXP_CICEROS                           = /^([\d]+)c(([\d]*)(\.([\d]+)?)?)?$/;
const REGEXP_CICEROS_REPLACE                   = "$1";
const REGEXP_CICEROS_POINTS_REPLACE            = "$2";

var LOCALE_STRINGS                             = {};

crdtes.LOCALE                                  = DEFAULT_LOCALE;
crdtes.LOCALE_STRINGS                          = LOCALE_STRINGS;
crdtes.LOCALE_EN_US                            = LOCALE_EN_US;

/**
 * <code>crdtes.UNIT_NAME_NONE</code> represents unit-less values.
 */
crdtes.UNIT_NAME_NONE                           = "NONE";

/**
 * <code>crdtes.UNIT_NAME_INCH</code> for inches.
 */
crdtes.UNIT_NAME_INCH                           = "\"";

/**
 * <code>crdtes.UNIT_NAME_CM</code> for centimeters
 */
crdtes.UNIT_NAME_CM                             = "cm";

/**
 * <code>crdtes.UNIT_NAME_MM</code> for millimeters
 */
crdtes.UNIT_NAME_MM                             = "mm";

/**
 * <code>crdtes.UNIT_NAME_CICERO</code> for ciceros
 */
crdtes.UNIT_NAME_CICERO                         = "cicero";

/**
 * <code>crdtes.UNIT_NAME_PICA</code> for picas
 */
crdtes.UNIT_NAME_PICA                           = "pica";

/**
 * <code>crdtes.UNIT_NAME_PIXEL</code> for pixels
 */
crdtes.UNIT_NAME_PIXEL                          = "px";

/**
 * <code>crdtes.UNIT_NAME_POINT</code> for points
 */
crdtes.UNIT_NAME_POINT                          = "pt";

crdtes.IS_MAC = $.os.substring(0,3).toLowerCase() == "mac";
crdtes.IS_WINDOWS = ! crdtes.IS_MAC;

/**
 * Setting log level to <code>crdtes.LOG_LEVEL_OFF</code> causes all log output to be suppressed.
 *
 * @constant {number} LOG_LEVEL_OFF
 *
 */
const LOG_LEVEL_OFF = 0;
crdtes.LOG_LEVEL_OFF = LOG_LEVEL_OFF;

/**
 * Setting log level to <code>crdtes.LOG_LEVEL_ERROR</code> causes all log output to be suppressed,<br>
 * except for errors.
 *
 * @constant {number} LOG_LEVEL_ERROR
 */
const LOG_LEVEL_ERROR = 1;
crdtes.LOG_LEVEL_ERROR = LOG_LEVEL_ERROR;

/**
 * Setting log level to <code>crdtes.LOG_LEVEL_WARNING</code> causes all log output to be suppressed,<br>
 * except for errors and warnings.
 *
 * @constant {number} LOG_LEVEL_WARNING
 */
const LOG_LEVEL_WARNING = 2;
crdtes.LOG_LEVEL_WARNING = LOG_LEVEL_WARNING;

/**
 * Setting log level to <code>crdtes.LOG_LEVEL_NOTE</code> causes all log output to be suppressed,<br>
 * except for errors, warnings and notes.
 *
 * @constant {number} LOG_LEVEL_NOTE
 */
const LOG_LEVEL_NOTE = 3;
crdtes.LOG_LEVEL_NOTE = LOG_LEVEL_NOTE;

/**
 * Setting log level to <code>crdtes.LOG_LEVEL_TRACE</code> causes all log output to be output.
 *
 * @constant {number} LOG_LEVEL_TRACE
 */
const LOG_LEVEL_TRACE = 4;
crdtes.LOG_LEVEL_TRACE = LOG_LEVEL_TRACE;

// Symbolic params to `getDir()`

/**
 * Pass <code>crdtes.DESKTOP_DIR</code> into <code>crdtes.getDir()</code> to get the path of the user's Desktop folder.
 *
 * @constant {string} DESKTOP_DIR
 */
crdtes.DESKTOP_DIR    = "DESKTOP_DIR";

/**
 * Pass <code>crdtes.DOCUMENTS_DIR</code> into <code>crdtes.getDir()</code> to get the path of the user's Documents folder.
 *
 * @constant {string} DOCUMENTS_DIR
 */
crdtes.DOCUMENTS_DIR  = "DOCUMENTS_DIR";

/**
 * Pass <code>crdtes.HOME_DIR</code> into <code>crdtes.getDir()</code> to get the path of the user's home folder.
 *
 * @constant {string} HOME_DIR
 */
crdtes.HOME_DIR       = "HOME_DIR";

/**
 * Pass <code>crdtes.LOG_DIR</code> into <code>crdtes.getDir()</code> to get the path of the Tightener logging folder.
 *
 * @constant {string} LOG_DIR
 */
crdtes.LOG_DIR        = "LOG_DIR";

/**
 * Pass <code>crdtes.SYSTEMDATA_DIR</code> into <code>crdtes.getDir()</code> to get the path of the system data folder<br>
 * (<code>%PROGRAMDATA%</code> or <code>/Library/Application Support</code>).
 *
 * @constant {string} SYSTEMDATA_DIR
 */
crdtes.SYSTEMDATA_DIR = "SYSTEMDATA_DIR";

/**
 * Pass <code>crdtes.TMP_DIR</code> into <code>crdtes.getDir()</code> to get the path of the temporary folder.
 *
 * @constant {string} TMP_DIR
 */
crdtes.TMP_DIR        = "TMP_DIR";

/**
 * Pass <code>crdtes.USERDATA_DIR</code> into <code>crdtes.getDir()</code> to get the path to the user data folder<br>
 * (<code>%APPDATA%</code> or <code>~/Library/Application Support</code>).
 *
 * @constant {string} USERDATA_DIR
 */
crdtes.USERDATA_DIR   = "USERDATA_DIR";

var LOG_LEVEL_STACK           = [];
var LOG_ENTRY_EXIT            = false;
var LOG_LEVEL                 = LOG_LEVEL_OFF;
var IN_LOGGER                 = false;
var LOG_TO_ESTK_CONSOLE       = true;
var LOG_TO_CRDT               = false;
var LOG_TO_FILEPATH           = undefined;

var SYS_INFO;

/**
 * Decode a string that was encoded using base64.
 *
 * @function base64decode
 * @memberof crdtes
 *
 * @param {string} base64Str - base64 encoded string
 * @returns {string} decoded string
 */
function base64decode(base64Str) {

    // ExtendScript DLL interface does not handle binary zeroes, we need to enquote and dequote
    // strings to be passed through the API

    var retVal = binaryUTF8ToStr(deQuote(crdtesDLL.base64decode(base64Str)));

    return retVal;
}
crdtes.base64decode = base64decode;

/**
 * Encode a string or an array of bytes using Base 64 encoding.
 *
 * @function base64encode
 * @memberof crdtes
 *
 * @param {string} str_or_ByteArr - either a string or an array containing bytes (0-255).
 * @returns {string} encoded string
 *
 */
function base64encode(str_or_ByteArr) {

    var byteArray;
    if ("string" == typeof(str_or_ByteArr)) {
        byteArray = strToUTF8(str_or_ByteArr);
    }
    else {
        byteArray = str_or_ByteArr;
    }

    // ExtendScript DLL interface does not handle binary zeroes in strings, we need to enquote and dequote
    // strings to be passed through the API

    var retVal = crdtesDLL.base64encode(dQ(byteArray));

    return retVal;
}
crdtes.base64encode = base64encode;

/**
 * Convert an array of bytes into string format. This string is UTF-16 internally, and<br>
 * we map one byte to one UTF-16 character. The resulting string might contain character values<br>
 * (<code>charCodeAt()</code>) that would be invalid in UTF8.<br>
 *
 * @function binaryToStr
 * @memberof crdtes
 *
 * @param {array} in_byteArray - an array containing UTF-16 values in the range 0-255
 * @returns {string} a string
 */
function binaryToStr(in_byteArray) {

    var retVal = "";

    try {
        var idx = 0;
        var len = in_byteArray.length;
        var c;
        while (idx < len) {
            // byte is a reserved word - so we use bite
            var bite = in_byteArray[idx];
            retVal += String.fromCharCode(bite);
        }
    }
    catch (err) {
        retVal = undefined;
    }

    return retVal;
}
crdtes.binaryToStr = binaryToStr;

/**
 * Decode an array of bytes that contains a UTF-8 encoded string.
 *
 * @function binaryUTF8ToStr
 * @memberof crdtes
 *
 * @param {array} in_byteArray - an array containing bytes (0-255) for a string that was encoded using UTF-8 encoding.
 * @returns {string} a string, or undefined if some invalid UTF-8 is encountered
 */
function binaryUTF8ToStr(in_byteArray) {

    var retVal = "";

    try {
        var idx = 0;
        var len = in_byteArray.length;
        var c;
        while (idx < len) {
            // byte is a reserved word - so we use bite
            var bite = in_byteArray[idx];
            idx++;
            var bit7 = bite >> 7;
            if (! bit7) {
                // U+0000 - U+007F
                c = String.fromCharCode(bite);
            }
            else {
                var bit6 = (bite & 0x7F) >> 6;
                if (! bit6) {
                    // Invalid
                    retVal = undefined;
                    break;
                }
                else {
                    var byte2 = in_byteArray[idx];
                    idx++;
                    var bit5 = (bite & 0x3F) >> 5;
                    if (! bit5) {
                        // U+0080 - U+07FF
                        c = String.fromCharCode(((bite & 0x1F) << 6) | (byte2 & 0x3F));
                    }
                    else {
                        var byte3 = in_byteArray[idx];
                        idx++;
                        var bit4 = (bite & 0x1F) >> 4;
                        if (! bit4) {
                            // U+0800 - U+FFFF
                            c = String.fromCharCode(((bite & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F));
                        }
                        else {
                            // Not handled U+10000 - U+10FFFF
                            retVal = undefined;
                            break;
                        }
                    }
                }
            }
            retVal += c;
        }
    }
    catch (err) {
        retVal = undefined;
    }

    return retVal;
}
crdtes.binaryUTF8ToStr = binaryUTF8ToStr;

// charCodeToUTF8__: internal function: convert a Unicode character code to a 1 to 3 byte UTF8 byte sequence
// returns undefined if invalid in_charCode

function charCodeToUTF8__(in_charCode) {

    var retVal = undefined;

    try {

        if (in_charCode <= 0x007F) {
            retVal = [];
            retVal.push(in_charCode);
        }
        else if (in_charCode <= 0x07FF) {
            var hi = 0xC0 + ((in_charCode >> 6) & 0x1F);
            var lo = 0x80 + ((in_charCode      )& 0x3F);
            retVal = [];
            retVal.push(hi);
            retVal.push(lo);
        }
        else {
            var hi =  0xE0 + ((in_charCode >> 12) & 0x1F);
            var mid = 0x80 + ((in_charCode >>  6) & 0x3F);
            var lo =  0x80 + ((in_charCode      ) & 0x3F);
            retVal = [];
            retVal.push(hi);
            retVal.push(mid);
            retVal.push(lo);
        }
    }
    catch (err) {
        // anything weird, we return undefined
        retVal = undefined;
    }

    return retVal;
}

/**
 * Configure the logger
 *
 * @function configLogger
 * @memberof crdtes
 *
 * @param {object} logInfo - object with logger setup info<code>{<br>
 *     logLevel: 0-4<br>
 *     logEntryExit: boolean<br>
 *     logToESTKConsole: boolean<br>
 *     logToCRDT: boolean<br>
 *     logToFilePath: undefined or a file path for logging<br>
 * }</code>
 *
 * @returns {boolean} success/failure
 */
function configLogger(logInfo) {

    var retVal = false;
    try {
        if (logInfo) {
            if ("logLevel" in logInfo) {
                LOG_LEVEL = logInfo.logLevel;
            }
            if ("logEntryExit" in logInfo) {
                LOG_ENTRY_EXIT = logInfo.logEntryExit;
            }
            if ("logToESTKConsole" in logInfo) {
                LOG_TO_ESTK_CONSOLE = logInfo.logToESTKConsole;
            }
            if ("logToCRDT" in logInfo) {
                LOG_TO_CRDT = logInfo.logToCRDT;
            }
            if ("logToFilePath" in logInfo) {
                LOG_TO_FILEPATH = logInfo.logToFilePath;
            }
            retVal = true;
        }
    }
    catch (err) {
    }

    return retVal;
}
crdtes.configLogger = configLogger;

/**
 * Reverse the operation of the <code>crdtes.encrypt()</code> function.
 *
 * Only available to paid developer accounts
 *
 * @function decrypt
 * @memberof crdtes
 *
 * @param {string} str_or_ByteArr - a string or an array of bytes
 * @param {string} aesKey - a string or an array of bytes
 * @returns {array} an array of bytes
 */

function decrypt(str_or_ByteArr, aesKey, aesIV) {

    var byteArray;
    if ("string" == typeof(str_or_ByteArr)) {
        byteArray = strToUTF8(str_or_ByteArr);
    }
    else {
        byteArray = str_or_ByteArr;
    }

    if (! aesIV) {
        aesIV = aesKey;
    }

    var aesKeyByteArray = strToUTF8(aesKey);
    var aesIVByteArray = strToUTF8(aesIV);

    // ExtendScript DLL interface does not handle binary zeroes in strings, we need to enquote and dequote
    // strings to be passed through the API

    var retVal = binaryUTF8ToStr(deQuote(crdtesDLL.decryptStr(dQ(byteArray), dQ(aesKeyByteArray), dQ(aesIVByteArray))));

    return retVal;
}
crdtes.decrypt = decrypt;

/**
 * Reverse the operation of <code>crdtes.dQ()</code> or <code>crdtes.sQ()</code>.
 *
 * @function deQuote
 * @memberof crdtes
 *
 * @param {string} quotedString - a quoted string
 * @returns {array} a byte array. If the quoted string contains any <code>\uHHHH</code> codes, these are first re-encoded<br>
 * using UTF-8 before storing them into the byte array.
 */
function deQuote(quotedString) {

    var retVal = [];

    do {

        var qLen = quotedString.length;
        if (qLen < 2) {
            break;
        }

        var quoteChar = quotedString.charAt(0);
        qLen -= 1;
        if (quoteChar != quotedString.charAt(qLen)) {
            break;
        }

        if (quoteChar != '"' && quoteChar != "'") {
            break;
        }

        var buffer = [];
        var state = 0;
        var cCode = 0;
        for (charIdx = 1; charIdx < qLen; charIdx++) {

            if (state == -1) {
                break;
            }

            var c = quotedString.charAt(charIdx);
            switch (state) {
            case 0:
                if (c == '\\') {
                    state = 1;
                }
                else {
                    buffer.push(c.charCodeAt(0));
                }
                break;
            case 1:
                if (c == 'x') {
                    // state 2->3->0
                    state = 2;
                }
                else if (c == 'u') {
                    // state 4->5->6->7->0
                    state = 4;
                }
                else if (c == 't') {
                    buffer.push(0x09);
                    state = 0;
                }
                else if (c == 'r') {
                    buffer.push(0x0D);
                    state = 0;
                }
                else if (c == 'n') {
                    buffer.push(0x0A);
                    state = 0;
                }
                else {
                    buffer.push(c.charCodeAt(0));
                    state = 0;
                }
                break;
            case 2:
            case 4:
                if (c >= '0' && c <= '9') {
                    cCode = c.charCodeAt(0)      - 0x30;
                    state++;
                }
                else if (c >= 'A' && c <= 'F') {
                    cCode = c.charCodeAt(0) + 10 - 0x41;
                    state++;
                }
                else if (c >= 'a' && c <= 'f') {
                    cCode = c.charCodeAt(0) + 10 - 0x61;
                    state++;
                }
                else {
                    state = -1;
                }
                break;
            case 3:
            case 5:
            case 6:
            case 7:

                if (c >= '0' && c <= '9') {
                    cCode = (cCode << 4) + c.charCodeAt(0)      - 0x30;
                }
                else if (c >= 'A' && c <= 'F') {
                    cCode = (cCode << 4) + c.charCodeAt(0) + 10 - 0x41;
                }
                else if (c >= 'a' && c <= 'f') {
                    cCode = (cCode << 4) + c.charCodeAt(0) + 10 - 0x61;
                }
                else {
                    state = -1;
                }

                if (state == 3)  {
                    // Done with \xHH
                    buffer.push(cCode);
                    state = 0;
                }
                else if (state == 7) {
                    // Done with \uHHHHH - convert using UTF-8
                    var bytes = charCodeToUTF8__(cCode);
                    if (! bytes) {
                        state = -1
                    }
                    else {
                        for (var byteIdx = 0; byteIdx < bytes.length; byteIdx++) {
                            buffer.push(bytes[byteIdx]);
                        }
                        state = 0;
                    }
                }
                else {
                    // Next state: 2->3, 4->5->6->7
                    state++;
                }
                break;
            }
        }
    }
    while (false);

    if (state == 0) {
        retVal = buffer;
    }

    return retVal;
}
crdtes.deQuote = deQuote;

/**
 * Create a directory.<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function dirCreate
 * @memberof crdtes
 *
 * @param {string} filePath
 * @returns {array} list if items in directory
 */

function dirCreate(filePath) {

    var retVal = evalTQL("dirCreate(" + dQ(filePath) + ")");

    return retVal;
}
crdtes.dirCreate = dirCreate;

/**
 * Delete a directory.<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function dirDelete
 * @memberof crdtes
 *
 * @param {string} filePath
 * @param {boolean} recurse
 * @returns {boolean} success or failure
 */

function dirDelete(filePath, recurse) {

    var retVal;

    retVal = evalTQL("dirDelete(" + dQ(filePath) + "," + (recurse ? "true" : "false") + ")");

    return retVal;
}
crdtes.dirDelete = dirDelete;

/**
 * Verify whether a directory exists. Will return <code>false</code> if the path points to a file (instead of a directory).<br>
 * <br>
 * Also see <code>crdtes.fileExists()</code>.<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function dirExists
 * @memberof crdtes
 *
 * @param {string} dirPath - a path to a directory
 * @returns {boolean} true or false
 */

function dirExists(dirPath) {

    var retVal = evalTQL("dirExists(" + dQ(dirPath) + ")");

    return retVal;
}
crdtes.dirExists = dirExists;

/**
 * Scan a directory.<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function dirScan
 * @memberof crdtes
 *
 * @param {string} filePath
 * @returns {array} list if items in directory
 */

function dirScan(filePath) {

    var retVal = evalTQL("dirScan(" + dQ(filePath) + ")");

    return retVal;
}
crdtes.dirScan = dirScan;

/**
 * Wrap a string or a byte array into double quotes, encoding any binary data as a string.<br>
 * Knows how to handle Unicode characters or binary zeroes.<br>
 * <br>
 * When the input is a string, high Unicode characters are encoded as `\uHHHH`.<br>
 * <br>
 * When the input is a byte array, all bytes are encoded as characters or as `\xHH` escape sequences.
 *
 * @function dQ
 * @memberof crdtes
 *
 * @param {string} str_or_ByteArr - a Unicode string or an array of bytes
 * @returns {string} a string enclosed in double quotes. This string is pure 7-bit<br>
 * ASCII and can be inserted into generated script code<br>
 * Example:<br>
 * <code>var script = "a=b(" + crdtes.dQ(somedata) + ");";</code>
 */
function dQ(str_or_ByteArr) {
    return enQuote__(str_or_ByteArr, "\"");
}
crdtes.dQ = dQ;

/**
 * Encrypt a string or array of bytes using a key. A random salt is added into the mix,<br>
 * so even when passing in the same parameter values, the result will be different every time.<br>
 * <br>
 * Only available to paid developer accounts
 *
 * @function encrypt
 * @memberof crdtes
 *
 * @param {string} str_or_ByteArr - a string or an array of bytes
 * @param {string} aesKey - a string or an array of bytes
 * @returns {string} a base-64 encoded encrypted string.
 */

function encrypt(str_or_ByteArr, aesKey, aesIV) {

    var retVal;

    var s;
    if ("string" == typeof(str_or_ByteArr)) {
        s = str_or_ByteArr;
    }
    else {
        s = binaryToStr(str_or_ByteArr);
    }

    var aesKeyByteArray = strToUTF8(aesKey);

    var aesIVByteArray;
    if (! aesIV) {
        aesIVByteArray = aesKeyByteArray;
    }
    else {
        aesIVByteArray = strToUTF8(aesIV);
    }

    // result is not quoted - it's plain base64
    var retVal = crdtesDLL.encryptStr(dQ(s), dQ(aesKeyByteArray), dQ(aesIVByteArray));

    return retVal;
}
crdtes.encrypt = encrypt;

//
// enQuote__: Internal helper function. Escape and wrap a string in quotes
//
function enQuote__(str_or_ByteArr, quoteChar) {

    var retVal = "";

    var quoteCharCode = quoteChar.charCodeAt(0);

    var isString = ("string" == typeof str_or_ByteArr);
    var escapedS = "";
    var sLen = str_or_ByteArr.length;
    for (var charIdx = 0; charIdx < sLen; charIdx++) {
        var cCode;
        if (isString) {
            cCode = str_or_ByteArr.charCodeAt(charIdx);
        }
        else {
            cCode = str_or_ByteArr[charIdx];
        }
        if (cCode == 0x5C) {
            escapedS += '\\\\';
        }
        else if (cCode == quoteCharCode) {
            escapedS += '\\' + quoteChar;
        }
        else if (cCode == 0x0A) {
            escapedS += '\\n';
        }
        else if (cCode == 0x0D) {
            escapedS += '\\r';
        }
        else if (cCode == 0x09) {
            escapedS += '\\t';
        }
        else if (cCode < 32 || cCode == 0x7F || (! isString && cCode >= 0x80)) {
            escapedS += "\\x" + toHex(cCode, 2);
        }
        else if (isString && cCode >= 0x80) {
            escapedS += "\\u" + toHex(cCode, 4);
        }
        else {
            escapedS += String.fromCharCode(cCode);
        }
    }

    retVal = quoteChar + escapedS + quoteChar;

    return retVal;
}

/**
 * Evaluate a script file. If the unencrypted script file is not available (`.jsx` or `.js`),<br>
 * use crdtesDLL to try and run an `.ejsx` or `.ejs` file.
 *
 * @function evalScript
 * @memberof crdtes
 *
 * @param {string} scriptName - the name of the script to run, without file name extension or parent directory
 * @param {string} parentScriptFile - the name of the script from which we're calling this (pass in <code>$.fileName</code>).<br>
 * If this is missing, evaluate the path relative to the parent of CreativeDeveloperTools_ES
 * @returns {any} the returned value
 */
function evalScript(scriptName, parentScriptFile) {

    var retVal = undefined;

    try {

        var parentScriptFolder;
        if (! parentScriptFile) {
            // Use parent of parent of crdtes.jsx
            parentScriptFolder = File($.fileName).parent.parent;
        }
        else {
            if ("string" == typeof(parentScriptFile)) {
                parentScriptFile = File(parentScriptFile);
            }
            parentScriptFolder = parentScriptFile.parent;
        }

        var hasEncryptedFileNameExtension = false;
        var hasJSFileNameExtension = false;
        var hasJSXFileNameExtension = false;
        var scriptNameWithoutExtension = scriptName;

        var splitScriptName = scriptName.split(".");
        if (splitScriptName.length > 1) {
            var fileNameExtension = splitScriptName.pop().toLowerCase();
            if (fileNameExtension == "js") {
                hasJSFileNameExtension = true;
                scriptNameWithoutExtension = splitScriptName.join(".");
            }
            else if (fileNameExtension == "ejs") {
                hasEncryptedFileNameExtension = true;
                hasJSFileNameExtension = true;
                scriptNameWithoutExtension = splitScriptName.join(".");
            }
            else if (fileNameExtension == "jsx") {
                hasJSXFileNameExtension = true;
                scriptNameWithoutExtension = splitScriptName.join(".");
            }
            else if (fileNameExtension == "ejsx") {
                hasEncryptedFileNameExtension = true;
                hasJSXFileNameExtension = true;
                scriptNameWithoutExtension = splitScriptName.join(".");
            }
        }

        var unencryptedScriptFile = undefined;
        if (hasJSXFileNameExtension) {
            unencryptedScriptFile = File(parentScriptFolder + "/" + scriptNameWithoutExtension + ".jsx");
            if (! unencryptedScriptFile.exists) {
                unencryptedScriptFile = undefined;
            }
        }
        else if (hasJSFileNameExtension) {
            unencryptedScriptFile = File(parentScriptFolder + "/" + scriptNameWithoutExtension + ".js");
            if (! unencryptedScriptFile.exists) {
                unencryptedScriptFile = undefined;
            }
        }
        else {
            var unencryptedScriptFile = File(parentScriptFolder + "/" + scriptNameWithoutExtension + ".jsx");
            if (! unencryptedScriptFile.exists) {
                unencryptedScriptFile = File(parentScriptFolder + "/" + scriptNameWithoutExtension + ".js");
                if (! unencryptedScriptFile.exists) {
                    unencryptedScriptFile = undefined;
                }
            }
        }

        if (unencryptedScriptFile) {
            crdtes.IS_DEBUGGING = true;
            var nearlyForever = 365*24*3600*1000;
            $.evalFile(unencryptedScriptFile,nearlyForever);
        }
        else {
            crdtes.IS_DEBUGGING = false;
            crdtesDLL.evalScript(scriptNameWithoutExtension, parentScriptFolder.fsName);
        }

    }
    catch (e) {
    }

    return retVal;
}
crdtes.evalScript = evalScript;

/**
 * Send a TQL script to the DLL
 *
 * @function evalTQL
 * @memberof crdtes
 *
 * @param {string} tqlScript - a script to run
 * @param {string} tqlScopeName - a scope name to use. Such scope can be used to pass data between different processes
 * @returns {any} the returned value
 */
function evalTQL(tqlScript, tqlScopeName) {

    var retVal = undefined;

    try {

        if (! tqlScopeName) {
            tqlScopeName = TQL_SCOPE_NAME_DEFAULT;
        }

        var result = crdtesDLL.evalTQL(tqlScript, tqlScopeName);
        eval("retVal = " + result);
    } catch (e) {
    }

    return retVal;
}
crdtes.evalTQL = evalTQL;

/**
 * Close a currently open file.<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT<br>
 *
 * @function fileClose
 * @memberof crdtes
 *
 * @param {number} fileHandle - a file handle as returned by <code>crdtes.fileOpen()</code>.
 * @returns {boolean} success or failure
 */

function fileClose(fileHandle) {

    var retVal = evalTQL("fileClose(" + fileHandle + ")");

    return retVal;
}
crdtes.fileClose = fileClose;

/**
 * Delete a file<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function fileDelete
 * @memberof crdtes
 *
 * @param {string} filePath
 * @returns {boolean} success or failure
 */

function fileDelete(filePath) {

    var retVal = evalTQL("fileDelete(" + dQ(filePath) + ")");

    return retVal;
}
crdtes.fileDelete = fileDelete;

/**
 * Check if a file exists. Will return <code>false</code> if the file path points to a directory.<br>
 * <br>
 * Also see <code>crdtes.dirExists()</code>.<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function fileExists
 * @memberof crdtes
 *
 * @param {string} filePath
 * @returns {boolean} existence of file
 */

function fileExists(filePath) {

    var retVal = evalTQL("fileExists(" + dQ(filePath) + ")");

    return retVal;
}
crdtes.fileExists = fileExists;

/**
 * Open a binary file and return a handle.<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT<br>
 *
 * @function fileOpen
 * @memberof crdtes
 *
 * @param {string} fileName - a native full file path to the file
 * @param {string} mode - one of <code>'a'</code>, <code>'r'</code>, <code>'w'</code> (append, read, write)
 * @returns {number} file handle
 */

function fileOpen(fileName, mode) {

    var retVal;

    if (mode) {
        retVal = evalTQL("fileOpen(" + dQ(fileName) + "," + dQ(mode) + ")");
    }
    else {
        retVal = evalTQL("fileOpen(" + dQ(fileName) + ")");
    }

    return retVal;
}
crdtes.fileOpen = fileOpen;

/**
 * Read a file into memory<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function fileRead
 * @memberof crdtes
 *
 * @param {number} fileHandle - a file handle as returned by <code>crdtes.fileOpen()</code>.
 * @param {boolean} isBinary - whether the file is considered a binary file (as opposed to a UTF-8 text file)
 * @returns {any} either a byte array or a string
 */

function fileRead(fileHandle, isBinary) {

    var retVal;

    var response = evalTQL("fileRead(" + fileHandle + ")");
    if ("string" == typeof response) {
        response = unwrapUTF16ToUTF8__(response, isBinary);
    }

    retVal = response;

    return retVal;
}
crdtes.fileRead = fileRead;

/**
 * Binary write to a file. Strings are written as UTF-8<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function fileWrite
 * @memberof crdtes
 *
 * @param {number} fileHandle - a file handle as returned by <code>crdtes.fileOpen()</code>.
 * @param {string} str_or_ByteArr - data to write to the file
 * @returns {boolean} success or failure
 */

function fileWrite(fileHandle, str_or_ByteArr) {

    var byteArray;
    if ("string" == typeof str_or_ByteArr) {
        byteArray = strToUTF8(str_or_ByteArr);
    }
    else {
        byteArray = str_or_ByteArr;
    }

    var retVal = evalTQL("fileWrite(" + fileHandle + "," + dQ(byteArray) + ")");
    return retVal;
}
crdtes.fileWrite = fileWrite;

/**
 * Determine whether, or which, features of some software or module are currently activated or not
 *
 * @function getCapability
 * @memberof crdtes
 *
 * @param {string} issuer - a GUID identifier for the developer account as seen in the PluginInstaller
 * @param {string} capabilityCode - a code for the software features to be activated (as determined by<br>
 * the developer who owns the account).<br>
 * <code>capabilityCode</code> is not the same as <code>orderProductCode</code> - there can be multiple <code>orderProductCode</code> associated with
 * a single <code>capabilityCode</code> (e.g. <code>capabilityCode</code>: 'XYZ', <code>orderProductCode</code>: 'XYZ_1YEAR', 'XYZ_2YEAR'...).
 * @param {string} encryptionKey - the secret encryption key (created by the developer) needed to decode<br>
 * the capability data. As a developer you want to make sure this encryptionKey is obfuscated and only contained<br>
 * within encrypted script code.
 * @returns {string} either <code>"NOT_ACTIVATED"</code> or a JSON structure with capability data (customer GUID, decrypted developer-provided data from the activation file).
 */
function getCapability(issuer, capabilityCode, encryptionKey) {

    var retVal = crdtesDLL.getCapability(issuer, capabilityCode, encryptionKey);

    return retVal;
}
crdtes.getCapability = getCapability;

/**
 * Get the path of a system directory<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT<br>
 *
 * @function getDir
 * @memberof crdtes
 *
 * @param {string} dirTag - a tag representing the dir:<br>
 * <code><br>
 *    crdtes.DESKTOP_DIR<br>
 *    crdtes.DOCUMENTS_DIR<br>
 *    crdtes.HOME_DIR<br>
 *    crdtes.LOG_DIR<br>
 *    crdtes.SYSTEMDATA_DIR<br>
 *    crdtes.TMP_DIR<br>
 *    crdtes.USERDATA_DIR<br>
 * </code>
 * @returns {string} file path of dir or <code>undefined</code>. Directory paths include a trailing slash or backslash
 */
function getDir(dirTag) {

    var retVal;

    var sysInfo = getSysInfo__();
    if (dirTag in sysInfo) {
        retVal = sysInfo[dirTag];
    }

    return retVal;
}
crdtes.getDir = getDir;

/**
 * Access the environment<br>
 * <br>
 * Not restricted by the UXP security sandbox. Not needed for pure ExtendScript -<br>
 * provided to offer some compatibility with the UXP version of CRDT
 *
 * @function getEnvironment
 * @memberof crdtes
 *
 * @param {string} envVarName - name of environment variable
 * @returns {string} environment variable value
 */
function getEnvironment(envVarName) {

    var retVal = $.getenv(envVarName);

    return retVal;
}
crdtes.getEnvironment = getEnvironment;

/**
 * Interpret a value extracted from some INI data as a boolean. Things like <code>y, n, yes, no, true, false, t, f, 0, 1</code>
 *
 * @function getBooleanFromINI
 * @memberof crdtes
 *
 * @param {string} in_value - ini value
 * @returns {boolean} value
 */

function getBooleanFromINI(in_value) {
    var retVal = false;

    if (in_value) {
        var value = (in_value + "").replace(REGEXP_TRIM, REGEXP_TRIM_REPLACE);
        var firstChar = value.charAt(0).toLowerCase();
        var firstValue = parseInt(firstChar, 10);
        retVal = firstChar == "y" || firstChar == "t" || (! isNaN(firstValue) && firstValue != 0);
    }

    return retVal;
}
crdtes.getBooleanFromINI = getBooleanFromINI;

/**
 * Interpret a string extracted from some INI data as a floating point value, followed by an optional unit<br>
 * If there is no unit, then no conversion is performed.
 *
 * @function getFloatWithUnitFromINI
 * @memberof crdtes
 *
 * @param {string} in_valueStr - ini value
 * @param {string} in_convertToUnit - unit to convert to
 * @returns {number} value
 */

function getFloatWithUnitFromINI(in_valueStr, in_convertToUnit) {

    var retVal = 0.0;

    do {

        if (! in_valueStr) {
            break;
        }

        var convertToUnit;
        if (in_convertToUnit) {
            convertToUnit = in_convertToUnit;
        }
        else {
            convertToUnit = crdtes.UNIT_NAME_NONE;
        }

        var sign = 1.0;

        var valueStr = in_valueStr.replace(REGEXP_DESPACE, REGEXP_DESPACE_REPLACE).toLowerCase();

        var firstChar = valueStr.charAt(0);
        if (firstChar == '-') {
            valueStr = valueStr.substring(1);
            sign = -1.0;
        }
        else if (firstChar == '+') {
            valueStr = valueStr.substring(1);
        }

        var picas = undefined;
        var ciceros = undefined;
        if (valueStr.match(REGEXP_PICAS)) {
            picas = parseInt(valueStr.replace(REGEXP_PICAS, REGEXP_PICAS_REPLACE), 10);
            valueStr = valueStr.replace(REGEXP_PICAS, REGEXP_PICAS_POINTS_REPLACE);
        }
        else if (valueStr.match(REGEXP_CICEROS)) {
            ciceros = parseInt(valueStr.replace(REGEXP_CICEROS, REGEXP_CICEROS_REPLACE), 10);
            valueStr = valueStr.replace(REGEXP_CICEROS, REGEXP_CICEROS_POINTS_REPLACE);
        }

        var numberOnly = valueStr.replace(REGEXP_NUMBER_ONLY, REGEXP_NUMBER_ONLY_REPLACE);
        numberOnly = parseFloat(numberOnly);
        if (isNaN(numberOnly)) {
            numberOnly = 0.0;
        }

        var fromUnit;
        if (picas !== undefined) {
            fromUnit = crdtes.UNIT_NAME_PICA;
            numberOnly = picas + numberOnly / 6.0;
        }
        else if (ciceros !== undefined) {
            fromUnit = crdtes.UNIT_NAME_CICERO;
            numberOnly = ciceros + numberOnly / 6.0;
        }
        else {
            var unitOnly = valueStr.replace(REGEXP_UNIT_ONLY, REGEXP_UNIT_ONLY_REPLACE);
            fromUnit = crdtes.getUnitFromINI(unitOnly);
        }

        var conversion = 1.0;
        if (fromUnit != crdtes.UNIT_NAME_NONE && convertToUnit != crdtes.UNIT_NAME_NONE) {
            conversion = crdtes.unitToInchFactor(fromUnit) / crdtes.unitToInchFactor(convertToUnit);
        }

        retVal = sign * numberOnly * conversion;
    }
    while (false);

    return retVal;
}
crdtes.getFloatWithUnitFromINI = getFloatWithUnitFromINI;

/**
 * Interpret a string extracted from some INI data as an array with float values (e.g. <code>"[ 255, 128.2, 1.7]"</code> )
 *
 * @function getFloatValuesFromINI
 * @memberof crdtes
 *
 * @param {string} in_valueStr - ini value
 * @returns {array} array of numbers or undefined
 */

function getFloatValuesFromINI(in_valueStr) {

    var retVal = undefined;

    do {

        if (! in_valueStr) {
            break;
        }

        var floatValues = [];
        var values = in_valueStr.split(",");
        for (var idx = 0; idx < values.length; idx++) {
            var value = values[idx].replace(REGEXP_TRIM, REGEXP_TRIM_REPLACE);
            if (! value) {
                value = 0;
            }
            else {
                value = parseFloat(values[idx]);
                if (isNaN(value)) {
                    floatValues = undefined;
                    break;
                }
            }

            floatValues.push(value);
        }

        retVal = floatValues;
    }
    while (false);

    return retVal;
}
crdtes.getFloatValuesFromINI = getFloatValuesFromINI;

/**
 * Interpret a string extracted from some INI data as an array with int values (e.g. <code>"[ 255, 128, 1]"</code> )
 *
 * @function getIntValuesFromINI
 * @memberof crdtes
 *
 * @param {string} in_valueStr - ini value
 * @returns {array} array of ints or undefined
 */

function getIntValuesFromINI(in_valueStr) {

    var retVal = undefined;

    do {

        if (! in_valueStr) {
            break;
        }

        var intValues = [];
        var values = in_valueStr.split(",");
        for (var idx = 0; idx < values.length; idx++) {
            var value = values[idx].replace(REGEXP_TRIM, REGEXP_TRIM_REPLACE);
            if (! value) {
                value = 0;
            }
            else {
                value = parseInt(values[idx], 10);
                if (isNaN(value)) {
                    intValues = undefined;
                    break;
                }
            }

            intValues.push(value);
        }

        retVal = intValues;
    }
    while (false);

    return retVal;
}
crdtes.getIntValuesFromINI = getIntValuesFromINI;

/**
 * Interpret a string extracted from some INI data as a unit name
 *
 * @function getUnitFromINI
 * @memberof crdtes
 *
 * @param {string} in_value - ini value
 * @param {string} in_defaultUnit - default to use if no match is found
 * @returns {string} value
 */

function getUnitFromINI(in_value, in_defaultUnit) {

    var defaultUnit = (in_defaultUnit !== undefined) ? in_defaultUnit : crdtes.UNIT_NAME_NONE;

    var retVal = defaultUnit;

    var value = (in_value + "").replace(REGEXP_TRIM, REGEXP_TRIM_REPLACE).toLowerCase();

    if (value == "\"" || value.substring(0,2) == "in") {
        retVal = crdtes.UNIT_NAME_INCH;
    }
    else if (value == "cm" || value == "cms" || value.substr(0,4) == "cent") {
        retVal = crdtes.UNIT_NAME_CM;
    }
    else if (value == "mm" || value == "mms" || value.substr(0,4) == "mill") {
        retVal = crdtes.UNIT_NAME_MM;
    }
    else if (value.substring(0,3) == "cic") {
        retVal = crdtes.UNIT_NAME_CICERO;
    }
    else if (value.substring(0,3) == "pic") {
        retVal = crdtes.UNIT_NAME_PICA;
    }
    else if (value.substring(0,3) == "pix" || value == "px") {
        retVal = crdtes.UNIT_NAME_PIXEL;
    }
    else if (value.substring(0,3) == "poi" || value == "pt") {
        retVal = crdtes.UNIT_NAME_POINT;
    }

    return retVal;
}
crdtes.getUnitFromINI = getUnitFromINI;

/**
 * Get file path to PluginInstaller if it is installed
 *
 * @function getPluginInstallerPath
 * @memberof crdtes
 *
 * @returns {string} file path
*/

function getPluginInstallerPath() {

    var retVal = crdtesDLL.getPluginInstallerPath();

    return retVal;
}
crdtes.getPluginInstallerPath = getPluginInstallerPath;

/**
 * Fetch some persistent data
 *
 * Only available to paid developer accounts
 *
 * @function getPersistData
 * @memberof crdtes
 *
 * @param {string} issuer - a GUID identifier for the developer account as seen in the PluginInstaller
 * @param {string} attribute - an attribute name for the data
 * @param {string} password - the password (created by the developer) needed to decode the persistent data
 * @returns {string} whatever persistent data is stored for the given attribute
 */
function getPersistData(issuer, attribute, password) {

    var retVal = crdtesDLL.getPersistData(issuer, attribute, password);

    return retVal;
}
crdtes.getPersistData = getPersistData;

// Internal function getSysInfo__: fetch the whole Tightener sysInfo structure

function getSysInfo__() {

    var retVal;

    if (! SYS_INFO) {
        SYS_INFO = evalTQL("sysInfo()");
    }

    retVal = SYS_INFO;

    return retVal;
}

/**
 * Calculate an integer power of an int value. Avoids using floating point, so<br>
 * should not have any floating-point round-off errors. `Math.pow()` will probably<br>
 * give the exact same result, but I am doubtful that some implementations might internally use `log` and `exp`<br>
 * to handle `Math.pow()`
 *
 * @function intPow
 * @memberof crdtes
 *
 * @param {number} i - Integer base
 * @param {number} intPower - integer power
 * @returns {number} i ^ intPower
 */

function intPow(i, intPower) {

    var retVal;
    if (Math.floor(intPower) != intPower) {
        // Must be integer
        retVal = undefined;
    }
    else if (intPower == 0) {
        // Handle power of 0: 0^0 is not a number
        if (i == 0) {
            retVal = NaN;
        }
        else {
            retVal = 1;
        }
    }
    else if (i == 1) {
        // Multiplying 1 with itself is 1
        retVal = 1;
    }
    else if (intPower == 1) {
        // i ^ 1 is i
        retVal = i;
    }
    else if (intPower < 0) {
        // i^-x is 1/(i^x)
        retVal = 1/intPow(i, -intPower);
    }
    else {
        // Divide and conquer
        var halfIntPower = intPower >> 1;
        var otherHalfIntPower = intPower - halfIntPower;
        var part1 = intPow(i, halfIntPower);
        var part2;
        if (halfIntPower == otherHalfIntPower) {
            part2 = part1;
        }
        else {
            part2 =  intPow(i, otherHalfIntPower);
        }
        retVal = part1 * part2;
    }

    return retVal;
}
crdtes.intPow = intPow;

/**
 * Determine the license level for CRDT: 0 = not, 1 = basic, 2 = full<br>
 * <br>
 * Some functions, marked with "Only available to paid developer accounts"<br>
 * will only work with level 2. Licensing function only work with level 1
 *
 * @function getCreativeDeveloperToolsLevel
 * @memberof crdtes
 *
 * @returns {number} 0, 1 or 2
 */
function getCreativeDeveloperToolsLevel() {

    var retVal = crdtesDLL.getCreativeDeveloperToolsLevel();

    return retVal;
}
crdtes.getCreativeDeveloperToolsLevel = getCreativeDeveloperToolsLevel;

/**
 * Extend or shorten a string to an exact length, adding <code>padChar</code> as needed
 *
 * @function leftPad
 * @memberof crdtes
 *
 * @param {string} s - string to be extended or shortened
 * @param {string} padChar - string to append repeatedly if length needs to extended
 * @param {number} len - desired result length
 * @returns {string} padded or shortened string
 */

function leftPad(s, padChar, len) {

    var retVal = undefined;

    do {
        try {

            retVal = s + "";
            if (retVal.length == len) {
                break;
            }

            if (retVal.length > len) {
                retVal = retVal.substring(retVal.length - len);
                break;
            }

            var padLength = len - retVal.length;

            var padding = new Array(padLength + 1).join(padChar)
            retVal = padding + retVal;
        }
        catch (err) {
        }
    }
    while (false);

    return retVal;
}
crdtes.leftPad = leftPad;

/**
 * Make a log entry of the call of a function. Pass in the <code>arguments</code> keyword as a parameter.
 *
 * @function logEntry
 * @memberof crdtes
 *
 * @param {array} reportingFunctionArguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name for the log
 */

function logEntry(reportingFunctionArguments) {
    if (LOG_ENTRY_EXIT) {
        logTrace(reportingFunctionArguments, "Entry");
    }
}
crdtes.logEntry = logEntry;

/**
 * Make a log entry of an error message. Pass in the <code>arguments</code> keyword as the first parameter.<br>
 * If the error level is below <code>crdtes.LOG_LEVEL_ERROR</code> nothing happens
 *
 * @function logError
 * @memberof crdtes
 *
 * @param {array} reportingFunctionArguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name for the log
 * @param {string} message - error message
 */
function logError(reportingFunctionArguments, message) {
    if (LOG_LEVEL >= LOG_LEVEL_ERROR) {
        if (! message) {
            message = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        logMessage(reportingFunctionArguments, LOG_LEVEL_ERROR, message);
    }
}
crdtes.logError = logError;

/**
 * Make a log entry of the exit of a function. Pass in the <code>arguments</code> keyword as a parameter.
 *
 * @function logExit
 * @memberof crdtes
 *
 * @param {array} reportingFunctionArguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name for the log
 */

function logExit(reportingFunctionArguments) {
    if (LOG_ENTRY_EXIT) {
        logTrace(reportingFunctionArguments, "Exit");
    }
}
crdtes.logExit = logExit;

/**
 * Extract the function name from its arguments
 *
 * @function functionNameFromArguments
 * @memberof crdtes
 *
 * @param {object} functionArguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name
 * @returns {string} function name
 */

function functionNameFromArguments(functionArguments) {

    var functionName;
    try {
        functionName = functionArguments.callee.toString().match(/function ([^\(]+)/)[1];
    }
    catch (err) {
        functionName = "[anonymous function]";
    }

    return functionName;

}
crdtes.functionNameFromArguments = functionNameFromArguments;


/**
 * Output a log message. Pass in the <code>arguments</code> keyword as the first parameter.
 *
 * @function logMessage
 * @memberof crdtes
 *
 * @param {array} reportingFunctionArguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name for the log
 * @param {number} logLevel - log level
 * @param {string} message - the note to output
 */

function logMessage(reportingFunctionArguments, logLevel, message) {

    var savedInLogger = IN_LOGGER;

    do {
        try {

            if (IN_LOGGER) {
                break;
            }

            IN_LOGGER = true;

            var functionPrefix = "";
            var functionName = "";

            if (! message) {

                message = reportingFunctionArguments;
                reportingFunctionArguments = undefined;

            }
            else if (reportingFunctionArguments) {

                if ("string" == typeof reportingFunctionArguments) {
                    functionName = reportingFunctionArguments;
                }
                else {
                    functionName = functionNameFromArguments(reportingFunctionArguments);
                }

                functionPrefix += functionName + ": ";

            }

            var now = new Date();
            var timePrefix =
                leftPad(now.getUTCDate(), "0", 2) +
                "-" +
                leftPad(now.getUTCMonth() + 1, "0", 2) +
                "-" +
                leftPad(now.getUTCFullYear(), "0", 4) +
                " " +
                leftPad(now.getUTCHours(), "0", 2) +
                ":" +
                leftPad(now.getUTCMinutes(), "0", 2) +
                ":" +
                leftPad(now.getUTCSeconds(), "0", 2) +
                "+00 ";

            var platformPrefix = "E ";

            var logLevelPrefix;
            switch (logLevel) {
                case LOG_LEVEL_ERROR:
                    logLevelPrefix = "ERROR";
                    break;
                case LOG_LEVEL_WARNING:
                    logLevelPrefix = "WARN ";
                    break;
                case LOG_LEVEL_NOTE:
                    logLevelPrefix = "NOTE ";
                    break;
                case LOG_LEVEL_TRACE:
                    logLevelPrefix = "TRACE";
                    break;
                default:
                    logLevelPrefix = "     ";
                    break;
            }

            var logLine = platformPrefix + timePrefix + "- " + logLevelPrefix + ": " + functionPrefix + message;

            if (LOG_TO_CRDT) {
                crdtesDLL.logMessage(logLevel, functionName, message)
            }

            if (LOG_TO_ESTK_CONSOLE) {
                $.writeln(logLine);
            }

            if (LOG_TO_FILEPATH) {
                var fileHandle = new File(LOG_TO_FILEPATH);
                fileHandle.open("a");
                fileHandle.writeln(logLine);
                fileHandle.close();
            }

        }
        catch (err) {
        }
    }
    while (false);

    IN_LOGGER = savedInLogger;
}
crdtes.logMessage = logMessage;

/**
 * Make a log entry of a note. Pass in the <code>arguments</code> keyword as the first parameter.<br>
 * If the error level is below <code>crdtes.LOG_LEVEL_NOTE</code> nothing happens
 *
 * @function logNote
 * @memberof crdtes
 *
 * @param {array} reportingFunctionArguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name for the log
 * @param {string} message - the note to output
 */
function logNote(reportingFunctionArguments, message) {
    if (LOG_LEVEL >= LOG_LEVEL_NOTE) {
        if (! message) {
            message = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        logMessage(reportingFunctionArguments, LOG_LEVEL_NOTE, message);
    }
}
crdtes.logNote = logNote;

/**
 * Emit a trace messsage into the log. Pass in the <code>arguments</code> keyword as the first parameter.<br>
 * If the error level is below <code>crdtes.LOG_LEVEL_TRACE</code> nothing happens
 *
 * @function logTrace
 * @memberof crdtes
 *
 * @param {array} reportingFunctionArguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name for the log
 * @param {string} message - the trace message to output
 */
function logTrace(reportingFunctionArguments, message) {
    if (LOG_LEVEL >= LOG_LEVEL_TRACE) {
        if (! message) {
            message = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        logMessage(reportingFunctionArguments, LOG_LEVEL_TRACE, message);
    }
}
crdtes.logTrace = logTrace;

/**
 * Emit a warning messsage into the log. Pass in the <code>arguments</code> keyword as the first parameter.<br>
 * If the error level is below <code>crdtes.LOG_LEVEL_WARNING</code> nothing happens
 *
 * @function logWarning
 * @memberof crdtes
 *
 * @param {array} arguments - pass in the current <code>arguments</code> to the function.<br>
 * This is used to determine the function's name for the log
 * @param {string} message - the warning message to output
 */
function logWarning(reportingFunctionArguments, message) {
    if (LOG_LEVEL >= LOG_LEVEL_WARNING) {
        if (! message) {
            message = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        logMessage(reportingFunctionArguments, LOG_LEVEL_WARNING, message);
    }
}
crdtes.logWarning = logWarning;

/**
 * The unique <code>GUID</code> of this computer<br>
 * <br>
 * Only available to paid developer accounts
 *
 * @function machineGUID
 * @memberof crdtes
 *
 * @returns {string} a <code>GUID</code> string
 */
function machineGUID() {

    var retVal = crdtesDLL.machineGUID();

    return retVal;
}
crdtes.machineGUID = machineGUID;

/**
 * Attempt to launch the PluginInstaller if it is installed
 *
 * @function pluginInstaller
 * @memberof crdtes
 *
 * @returns {boolean} success or failure
*/

function pluginInstaller() {

    var retVal = false;

    do {
        try {

            var pluginInstallerFilePath = crdtesDLL.getPluginInstallerPath();

            var pluginInstallerFile = File(pluginInstallerFilePath);

            if (crdtes.IS_WINDOWS) {
                // Need to set the PATH before launching. Using a wrapper .vbs file
                pluginInstallerFile = File(pluginInstallerFile.parent + "/PluginInstaller Resources/launchEmbeddedPluginInstaller.vbs");
            }

            if (pluginInstallerFile.exists) {
                retVal = pluginInstallerFile.execute();
            }
        }
        catch (err) {
        }
    }
    while (false);

    return retVal;
}
crdtes.pluginInstaller = pluginInstaller;

/**
 * Restore the log level to what it was when pushLogLevel was called
 *
 * @function popLogLevel
 * @memberof crdtes
 *
 * @returns {number} log level that was popped off the stack
 */

function popLogLevel() {

    var retVal;

    retVal = LOG_LEVEL;
    if (LOG_LEVEL_STACK.length > 0) {
        LOG_LEVEL = LOG_LEVEL_STACK.pop();
    }
    else {
        LOG_LEVEL = LOG_LEVEL_NONE;
    }

    return retVal;
}
crdtes.popLogLevel = popLogLevel;

/**
 * Save the previous log level and set a new log level
 *
 * @function pushLogLevel
 * @memberof crdtes
 *
 * @param {number} newLogLevel - new log level to set
 * @returns {number} previous log level
 */

function pushLogLevel(newLogLevel) {

    var retVal;

    retVal = LOG_LEVEL;
    LOG_LEVEL_STACK.push(LOG_LEVEL);
    LOG_LEVEL = newLogLevel;

    return retVal;
}
crdtes.pushLogLevel = pushLogLevel;

/**
 * Read a bunch of text and try to extract structured information in .INI format<br>
 * <br>
 * This function is lenient and is able to extract slightly mangled INI data from the text frame<br>
 * content of an InDesign text frame.<br>
 * <br>
 * This function knows how to handle curly quotes should they be present.<br>
 * <br>
 * The following flexibilities have been built-in:<br>
 * <br>
 * - Attribute names are case-insensitive and anything not <code>a-z 0-9</code> is ignored.<br>
 * Entries like <code>this or that = ...</code> or <code>thisOrThat = ...</code> or <code>this'orThat = ...</code> are<br>
 * all equivalent. Only letters and digits are retained, and converted to lowercase.<br>
 * <br>
 * - Attribute values can be quoted with either single, double, curly quotes.<br>
 * This often occurs because InDesign can be configured to convert normal quotes into<br>
 * curly quotes automatically.<br>
 * Attribute values without quotes are trimmed (e.g. <code>bla =    x  </code> is the same as <code>bla=x</code>)<br>
 * Spaces are retained in quoted attribute values.<br>
 * <br>
 * - Any text will be ignore if not properly formatted as either a section name or an attribute-value<br>
 * pair with an equal sign<br>
 * <br>
 * - Hard and soft returns are equivalent<br>
 * <br>
 * The return value is an object with the section names at the top level, and attribute names<br>
 * below that. The following .INI<br>
 * <code><br>
 * [My data]<br>
 * this is = " abc "<br>
 * that =      abc<br>
 * </code><br>
 * returns<br>
 * <code><br><br>
 * {<br>
 *   "mydata": {<br>
 *      "__rawSectionName": "My data",<br>
 *      "thisis": " abc ",<br>
 *      "that": "abc"<br>
 *   }<br>
 * }<br>
 * </code><br>
 * Duplicated sections and entries are automatically suffixed with a counter suffix - e.g.
 * <code><br>
 * [main]
 * a=1
 * a=2
 * a=3
 * </code><br>
 * is equivalent with
 * <code><br>
 * [main]
 * a=1
 * a_2=2
 * a_3=3
 * </code><br>
 * and
 * <code><br>
 * [a]
 * a=1
 * [a]
 * a=2<br>
 * </code><br>
 * is equivalent with
 * <code><br>
 * [a]
 * a=1
 * [a_2]
 * a=2<br>
 * </code><br>
 *
 * @function readINI
 * @memberof crdtes
 *
 * @param {string} in_text - raw text, which might or might not contain some INI-formatted data mixed with normal text
 * @returns {object} either the ini data or <code>undefined</code>.
 */

function readINI(in_text) {

    var retVal = undefined;

    do {
        try {

            if (! in_text) {
                break;
            }

            if ("string" != typeof in_text) {
                break;
            }

            var text = in_text + "\r";
            var state = STATE_IDLE;
            var attr;
            var value;
            var attrSpaceCount;
            var rawSectionName = "";
            var sectionName = "";
            var section;
            var attrCounters = {};
            var sectionCounters = {};

            for (var idx = 0; state != STATE_ERROR && idx < text.length; idx++) {
                var c = text.charAt(idx);
                switch (state) {
                    default:
                        LogError("ReadIni: unexpected state");
                        state = STATE_ERROR;
                        break;
                    case STATE_IDLE:
                        if (c == '[') {
                            state = STATE_SEEN_OPEN_SQUARE_BRACKET;
                            rawSectionName = "";
                        }
                        else if (c == '#') {
                            state = STATE_IN_COMMENT;
                        }
                        else if (c > ' ') {
                            attr = c;
                            attrSpaceCount = 0;
                            state = STATE_SEEN_NON_WHITE;
                        }
                        break;
                    case STATE_IN_COMMENT:
                    case STATE_SEEN_CLOSE_SQUARE_BRACKET:
                        if (c == '\r' || c == '\n') {
                            state = STATE_IDLE;
                        }
                        break;
                    case STATE_SEEN_OPEN_SQUARE_BRACKET:
                        if (c == ']') {
                            state = STATE_SEEN_CLOSE_SQUARE_BRACKET;
                            sectionName = rawSectionName.toLowerCase();
                            sectionName = sectionName.replace(REGEXP_DESPACE, REGEXP_DESPACE_REPLACE);
                            sectionName = sectionName.replace(REGEXP_SECTION_NAME_ONLY, REGEXP_SECTION_NAME_ONLY_REPLACE);
                            if (sectionName) {

                                if (! retVal) {
                                    retVal = {};
                                }

                                var sectionSuffix = "";
                                var sectionCounter = 1;
                                if (sectionName in sectionCounters) {
                                    sectionCounter = sectionCounters[sectionName];
                                    sectionCounter++;
                                    sectionSuffix = "_" + sectionCounter;
                                }
                                sectionCounters[sectionName] = sectionCounter;
                                sectionName += sectionSuffix;
                                retVal[sectionName] = {};
                                section = retVal[sectionName];
                                section.__rawSectionName = rawSectionName;
                                attrCounters = {};
                            }
                        }
                        else {
                            rawSectionName += c;
                        }
                        break;
                    case STATE_SEEN_NON_WHITE:
                        if (c == "=") {
                            value = "";
                            state = STATE_SEEN_EQUAL;
                        }
                        else if (c == '\r' || c == '\n') {
                            state = STATE_IDLE;
                        }
                        else if (c != " ") {
                            while (attrSpaceCount > 0) {
                                attr += " ";
                                attrSpaceCount--;
                            }
                            attr += c;
                        }
                        else {
                            attrSpaceCount++;
                        }
                        break;
                    case STATE_SEEN_EQUAL:
                        if (c != '\r' && c != '\n') {
                            value += c;
                        }
                        else {
                            value = value.replace(REGEXP_TRIM, REGEXP_TRIM_REPLACE);
                            if (value.length >= 2) {
                                var firstChar = value.charAt(0);
                                var lastChar = value.charAt(value.length - 1);
                                if (
                                    (firstChar == "\"" || firstChar == "“" || firstChar == "”")
                                &&
                                    (lastChar == "\"" || lastChar == "“" || lastChar == "”")
                                ) {
                                    value = value.substring(1, value.length - 1);
                                }
                                else if (
                                    (firstChar == "'" || firstChar == "‘" || firstChar == "’")
                                &&
                                    (lastChar == "'" || lastChar == "‘" || lastChar == "’")
                                ) {
                                    value = value.substring(1, value.length - 1);
                                }
                            }

                            if (section) {
                                attr = attr.replace(REGEXP_DESPACE, REGEXP_DESPACE_REPLACE).toLowerCase();
                                attr = attr.replace(REGEXP_ALPHA_ONLY, REGEXP_ALPHA_ONLY_REPLACE);
                                if (attr) {

                                    var attrSuffix = "";
                                    var attrCounter = 1;
                                    if (attr in attrCounters) {
                                        attrCounter = attrCounters[attr];
                                        attrCounter++;
                                        attrSuffix = "_" + attrCounter;
                                    }
                                    attrCounters[attr] = attrCounter;
                                    attr += attrSuffix;

                                    section[attr] = value;
                                }
                            }

                            state = STATE_IDLE;
                        }
                        break;
                }
            }
        }
        catch (err) {
        }
    }
    while (false);

    return retVal;
}
crdtes.readINI = readINI;

/**
 * Extend or shorten a string to an exact length, adding <code>padChar</code> as needed
 *
 * @function rightPad
 * @memberof crdtes
 *
 * @param {string} s - string to be extended or shortened
 * @param {string} padChar - string to append repeatedly if length needs to extended
 * @param {number} len - desired result length
 * @returns {string} padded or shortened string
 */

function rightPad(s, padChar, len) {

    var retVal = undefined;

    do {
        try {

            retVal = s + "";

            if (retVal.length == len) {
                break;
            }

            if (retVal.length > len) {
                retVal = retVal.substring(0, len);
                break;
            }

            var padLength = len - retVal.length;

            var padding = new Array(padLength + 1).join(padChar)
            retVal = retVal + padding;
        }
        catch (err) {
        }
    }
    while (false);

    return retVal;
}
crdtes.rightPad = rightPad;

/**
 * Fetch a localized string.
 *
 * @function S
 * @memberof crdtes
 *
 * @param {string} stringCode - a token for the string to be localized (e.g. BTN_OK)
 * @param {string=} locale - a locale. Optional - defaults to "en_US"
 * @returns {string} a localized string. If the stringCode is not found, returns the stringCode itself.
 */
function S(stringCode, locale) {

    var retVal = stringCode;

    do {

        try {
            if (! locale) {
                locale = DEFAULT_LOCALE;
            }

            if (! (stringCode in LOCALE_STRINGS)) {
                break;
            }

            var localeStrings = LOCALE_STRINGS[stringCode];
            if (locale in localeStrings) {
                retVal = localeStrings[locale]; 
            }
            else if (LOCALE_EN_US in localeStrings) {
                retVal = localeStrings[LOCALE_EN_US];
            }

        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    return retVal;
}
crdtes.S = S;

/**
 * Send in activation data to determine whether some software is currently activated or not.<br>
 * <br>
 * Needs to be followed by a <code>crdtes.sublicense()</code> call<br>
 *
 * @function setIssuer
 * @memberof crdtes
 *
 * @param {string} issuerGUID - a GUID identifier for the developer account as seen in the PluginInstaller
 * @param {string} issuerEmail - the email for the developer account as seen in the PluginInstaller
 * @returnss { boolean } - success or failure
 */
function setIssuer(issuerGUID, issuerEmail) {

    var retVal = crdtesDLL.setIssuer(issuerGUID, issuerEmail);

    return retVal;
}
crdtes.setIssuer = setIssuer;

/**
 * Store some persistent data (e.g. a time stamp to determine a demo version lapsing)<br>
 * <br>
 * Only available to paid developer accounts
 *
 * @function setPersistData
 * @memberof crdtes
 *
 * @param {string} issuer - a GUID identifier for the developer account as seen in the PluginInstaller
 * @param {string} attribute - an attribute name for the data
 * @param {string} password - the password (created by the developer) needed to decode the persistent data
 * @param {string} data - any data to persist
 * @returns {boolean} success or failure
 */
function setPersistData(issuer, attribute, password, data) {

    var retVal = crdtesDLL.setPersistData(issuer, attribute, password, data);

    return retVal;
}
crdtes.setPersistData = setPersistData;

/**
 * Wrap a string or a byte array into single quotes, encoding any binary data as a string.<br>
 * Knows how to handle Unicode characters or binary zeroes.<br>
 * <br>
 * When the input is a string, high Unicode characters are encoded as <code>\uHHHH</code><br>
 * <br>
 * When the input is a byte array, all bytes are encoded as <code>\xHH</code> escape sequences.
 *
 * @function sQ
 * @memberof crdtes
 *
 * @param {string} str_or_ByteArr - a Unicode string or an array of bytes
 * @returns {string} a string enclosed in double quotes. This string is pure 7-bit<br>
 * ASCII and can be used into generated script code<br>
 * Example:<br>
 * <code>var script = "a=b(" + crdtes.sQ(somedata) + ");";</code>
 */
function sQ(str_or_ByteArr) {
    return enQuote__(str_or_ByteArr, "'");
}
crdtes.sQ = sQ;

/**
 * Encode a string into an byte array using UTF-8
 *
 * @function strToUTF8
 * @memberof crdtes
 *
 * @param {string} in_s - a string
 * @returns { array } a byte array
 */
function strToUTF8(in_s) {

    var retVal = [];

    var idx = 0;
    var len = in_s.length;
    var cCode;
    while (idx < len) {
        cCode = in_s.charCodeAt(idx);
        idx++;
        var bytes = charCodeToUTF8__(cCode);
        if (! bytes) {
            retVal = undefined;
            break;
        }
        else {
            for (var byteIdx = 0; byteIdx < bytes.length; byteIdx++) {
                retVal.push(bytes[byteIdx]);
            }
        }
    }

    return retVal;
}
crdtes.strToUTF8 = strToUTF8;

/**
 * Encode a string into an byte array using the 8 lowest bits of each UTF-16 character
 *
 * @function strToBinary
 * @memberof crdtes
 *
 * @param {string} in_s - a string
 * @returns { array } a byte array
 */
function strToBinary(in_s) {

    var retVal = [];

    var idx = 0;
    var len = in_s.length;
    var cCode;
    while (idx < len) {
        cCode = in_s.charCodeAt(idx);
        idx++;
        var bite = (cCode & 0xFF);
        retVal.push(bite);
    }

    return retVal;
}
crdtes.strToBinary = strToBinary;

/**
 * Send in sublicense info generated in the PluginInstaller so we can determine whether some software is currently activated or not.<br>
 * <br>
 * Needs to be preceded by a <code>crdtes.setIssuer()</code> call.
 *
 * @function sublicense
 * @memberof crdtes
 *
 * @param {string} key - key needed to decode activation data
 * @param {string} activation - encrypted activation data
 * @returns { boolean } success or failure
 */
function sublicense(key, activation) {

    var retVal = crdtesDLL.sublicense(key, activation);

    return retVal;
}
crdtes.sublicense = sublicense;

/**
 * Convert an integer into a hex representation with a fixed number of digits.<br>
 * Negative numbers are converted using 2-s complement (so <code>-15</code> results in <code>0x01</code>)<br>
 *
 * @function toHex
 * @memberof crdtes
 *
 * @param {number} i - integer to convert to hex
 * @param {number} numDigits - How many digits. Defaults to 4 if omitted.
 * @returns { string } hex-encoded integer
 */
function toHex(i, numDigits) {

    if (! numDigits) {
        numDigits = 4;
    }

    if (i < 0) {
        var upper = intPow(2, numDigits*4);
        // Calculate 2's complement with numDigits if negative
        i = (intPow(2, numDigits*4) + i) & (upper - 1);
    }

    // Calculate and cache a long enough string of zeroes
    var zeroes = toHex.zeroes;
    if (! zeroes) {
        zeroes = "0";
    }
    while (zeroes.length < numDigits) {
        zeroes += zeroes;
    }
    toHex.zeroes = zeroes;

    var retVal = i.toString(16).toLowerCase(); // Probably always lowercase by default, but just in case...
    if (retVal.length > numDigits) {
        retVal = retVal.substring(retVal.length - numDigits);
    }
    else if (retVal.length < numDigits) {
        retVal = zeroes.substr(0, numDigits - retVal.length) + retVal;
    }

    return retVal;
}
crdtes.toHex = toHex;

/**
 * Conversion factor from a length unit into inches
 *
 * @function unitToInchFactor
 * @memberof crdtes
 *
 * @param {string} in_unit - unit name (<code>crdtes.UNIT_NAME...</code>)
 * @returns { number } conversion factor or <code>1.0</code> if unknown/not applicable
 */

function unitToInchFactor(in_unit) {

    var retVal = 1.0;

    switch (in_unit) {
        case crdtes.UNIT_NAME_CM:
            retVal = 1.0/2.54;
            break;
        case crdtes.UNIT_NAME_MM:
            retVal = 1.0/25.4;
            break;
        case crdtes.UNIT_NAME_CICERO:
            retVal = 0.17762;
            break;
        case crdtes.UNIT_NAME_PICA:
            retVal = 1.0/12.0;
            break;
        case crdtes.UNIT_NAME_PIXEL:
            retVal = 1.0/72.0;
            break;
        case crdtes.UNIT_NAME_POINT:
            retVal = 1.0/72.0;
            break;
    }

    return retVal;
}
crdtes.unitToInchFactor = unitToInchFactor;

function unwrapUTF16ToUTF8__(in_str, isBinary) {

    var retVal;

    // A UTF-8 encoded string or a byte array can be wrapped 'as-is' into a UTF-16 wrapper string, where each
    // 16-bit character in the UTF-16 wrapper corresponds to a single byte in the UTF-8 string or byte array.
    // In such a UTF-16 string all characters will have 0-255 charcode values and the high byte always 0.

    var byteArray = strToBinary(in_str);

    if (! isBinary) {
        retVal = binaryUTF8ToStr(byteArray);
    }
    else {
        retVal = byteArray;
    }

    return retVal;
}

})();