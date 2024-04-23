var crdtes = getPlatformGlobals().defineGlobalObject("crdtes");

(function() {

// Test string contains binary zero and high-Unicode characters
const TEST_STRING           = "Hello World☜✿\x00\x7Féøo";
const TEST_STRING_AS_BASE64 = "SGVsbG8gV29ybGTimJzinL8Af8Opw7hv";

const TEST_DIR_NAME         = "crdtes_test_thisIsATestDir_feelFreeToDelete";
const TEST_FILE1_NAME       = "testFile1.txt";
const TEST_FILE2_NAME       = "testFile2.txt";
const TEST_KEY              = "my secret key";

const TEST_INI              =
"# Sample Configuration. Copy This Frame!\n" +
"\n" + 
"[Size Labels Configuration]\n" + 
"\n" + 
"# These features are available in the ‘free’ version\n" + 
"# of SizeLabels\n" + 
"\n" + 
"horizontal unit = inch\n" + 
"vertical unit = inch\n" + 
"label frame width = 2.5 inch\n" + 
"label frame height = 0.25 inch\n" + 
"don’t label frames below width = 0.1 inch\n" + 
"don’t label frames below height = 0.1 inch\n" + 
"add image filename to label = yes\n" + 
"\n" + 
"# The following features are only available in the\n" + 
"# ‘Pro’ version and during the 30-day trial period.\n" + 
"# Use the PluginInstaller to order licenses for \n" + 
"# US$ 4.00/seat/year \n" + 
"\n" + 
"lock layer = yes\n" + 
"scale = 1.0\n" + 
"add unit names = yes\n" + 
"override horizontal unit name = \n" + 
"override vertical unit name = \n" + 
"prefix horizontal with =\n" + 
"prefix vertical with =\n" + 
"label nested frames = no\n" + 
"omit image frames = no\n" + 
"omit text frames = no\n" + 
"omit other frames = no\n" + 
"ignore frame with script label = “ignore”\n" + 
"round to decimals = 2\n" + 
"swap width and height = yes\n" + 
"separator between image name and size = “ - “\n" + 
"separator between width and height = “ x “\n" + 
"layer name for labels = “SizeLabels” \n" + 
"apply label stylename = “SizeLabelStyle”\n" + 
"apply label object styleName = “SizeLabelObjectStyle”";

function testBase64() {

    var retVal = true;

    var s = TEST_STRING;
    var s64 = crdtes.base64encode(s);
    if (s64 != TEST_STRING_AS_BASE64) {
        crdtes.logError(arguments, "failed to crdtes.base64encode()");
        retVal = false;
    }

    var sRoundTrip = crdtes.base64decode(s64);
    if (s != sRoundTrip) {
        crdtes.logError(arguments, "failed to crdtes.base64decode()");
        retVal = false;
    }

    return retVal;
}

function testDirs() {

    var retVal = true;

    var desktopDir = crdtes.getDir(crdtes.DESKTOP_DIR);
    var desktopDirExists = crdtes.dirExists(desktopDir);
    if (! desktopDirExists) {
        crdtes.logError(arguments, "failed to verify existence of desktop dir");
        retVal = false;
    }

    var testDirPath = desktopDir + TEST_DIR_NAME + "/";
    var testDirExists = crdtes.dirExists(testDirPath);
    if (testDirExists) {
        crdtes.logError(arguments, "testDir unexpectedly exists");
        retVal = false;
    }
    else {
        crdtes.dirCreate(testDirPath);
        testDirExists = crdtes.dirExists(testDirPath);
    }
    if (! testDirExists) {
        crdtes.logError(arguments, "testDir unexpectedly does not exists");
        retVal = false;
    }

    var testFilePath = testDirPath + TEST_FILE1_NAME;

    var testFilePath2 = testDirPath + TEST_FILE2_NAME;

    var fileContentAsString = TEST_STRING;
    var fileContentAsUTF8 = crdtes.strToUTF8(fileContentAsString);

    var writeFileHandle1 = crdtes.fileOpen(testFilePath, "w");
    crdtes.fileWrite(writeFileHandle1, fileContentAsString);
    crdtes.fileClose(writeFileHandle1);

    var writeFileHandle2 = crdtes.fileOpen(testFilePath2, "w");
    crdtes.fileWrite(writeFileHandle2, fileContentAsUTF8);
    crdtes.fileClose(writeFileHandle2);

    var readFileHandle1 = crdtes.fileOpen(testFilePath, "r");
    var binaryReadContent = crdtes.fileRead(readFileHandle1, true);
    crdtes.fileClose(readFileHandle1);

    var readFileHandle2 = crdtes.fileOpen(testFilePath, "r");
    var stringReadContent = crdtes.fileRead(readFileHandle2, false);
    crdtes.fileClose(readFileHandle2);

    var readFileHandle3 = crdtes.fileOpen(testFilePath2, "r");
    var file2ReadContent = crdtes.fileRead(readFileHandle3, false);
    crdtes.fileClose(readFileHandle3);

    if (fileContentAsString != stringReadContent) {
        crdtes.logError(arguments, "failed to read file as string '" + stringReadContent + "' <> '" + fileContentAsString + "'");
        retVal = false;
    }

    if (fileContentAsString != file2ReadContent) {
        crdtes.logError(arguments, "failed to read UTF8 file as string '" + fileContentAsString + "' <> '" + file2ReadContent + "'");
        retVal = false;
    }

    var alternateStringReadContent = crdtes.binaryUTF8ToStr(binaryReadContent);
    if (fileContentAsString != alternateStringReadContent) {
        crdtes.logError(arguments, "failed to read file as binary then string '" + fileContentAsString + "' <> '" + file2ReadContent + "'");
        retVal = false;
    }

    var desktopFiles = crdtes.dirScan(testDirPath);
    var foundTestFile = false;
    for (var idx = 0; ! foundTestFile && idx < desktopFiles.length; idx++) {
        var fileName = desktopFiles[idx];
        foundTestFile = TEST_FILE1_NAME == fileName;
    }

    if (! foundTestFile) {
        crdtes.logError(arguments, "failed to find test file on Desktop");
        retVal = false;
    }

    var fileExists = crdtes.fileExists(testFilePath);
    if (! fileExists) {
        crdtes.logError(arguments, "fileExists failed");
        retVal = false;
    }

    var fileAsDirExists = crdtes.dirExists(testFilePath);
    if (fileAsDirExists) {
        crdtes.logError(arguments, "dirExists should not return 'true' on a file (instead of a dir)");
        retVal = false;
    }

    var success = crdtes.fileDelete(testFilePath);
    if (! success) {
        crdtes.logError(arguments, "fileDelete should return true");
        retVal = false;
    }

    var tryAgainSuccess = crdtes.fileDelete(testFilePath);
    if (tryAgainSuccess) {
        crdtes.logError(arguments, "second fileDelete on same file should return false");
        retVal = false;
    }

    var deletedFileExists = crdtes.fileExists(testFilePath);
    if (deletedFileExists) {
        crdtes.logError(arguments, "file should not exist any more");
        retVal = false;
    }

    // Should fail because second file is still in there
    crdtes.dirDelete(testDirPath);

    testDirExists = crdtes.dirExists(testDirPath);
    if (! testDirExists) {
        crdtes.logError(arguments, "testDir should not disappear as it is not empty");
        retVal = false;
    }

    // Recursive should succeed
    crdtes.dirDelete(testDirPath, true);

    testDirExists = crdtes.dirExists(testDirPath);
    if (testDirExists) {
        crdtes.logError(arguments, "testDir should disappear with recursive delete");
        retVal = false;
    }

    return retVal;
}

function testEncrypt() {

    var retVal = true;

    var s = TEST_STRING;
    var s1 = crdtes.encrypt(s, TEST_KEY);
    var s2 = crdtes.encrypt(s, TEST_KEY);
    if (s1 == s2) {
        crdtes.logError(arguments, "Encrypting the same string twice should give a different result");
        retVal = false;
    }

    var sRoundTrip1 = crdtes.decrypt(s1, TEST_KEY);
    if (sRoundTrip1 != s) {
        crdtes.logError(arguments, "failed to decrypt s1");
        retVal = false;
    }

    var sRoundTrip2 = crdtes.decrypt(s2, TEST_KEY);
    if (sRoundTrip2 != s) {
        crdtes.logError(arguments, "failed to decrypt s2");
        retVal = false;
    }

    return retVal;
}

function testEnvironment() {

    var retVal = true;

    var homeDir = crdtes.getDir(crdtes.HOME_DIR);
    var homeDirExists = crdtes.dirExists(homeDir);
    if (! homeDirExists) {
        crdtes.logError(arguments, "failed to verify existence of home dir");
        retVal = false;
    }

    var environmentHomeDirVariableName;
    var separator;
    if (crdtes.IS_MAC) {
        environmentHomeDirVariableName = "HOME";
        separator = "/";
    }
    else {
        environmentHomeDirVariableName = "USERPROFILE";
        separator = "\\";
    }
    var environmentHomeDir = crdtes.getEnvironment(environmentHomeDirVariableName);

    var homeDirSplit = homeDir.split(separator);
    var homeDirSegmentIdx = homeDirSplit.length;

    var environmentHomeDirSplit = environmentHomeDir.split(separator);
    var environmentDirSegmentIdx = environmentHomeDirSplit.length;

    var matchSucceeded = false;
    var matchFailed = false;

    // Verify the directory paths match - allow for double separators and
    // terminal separators, so we don't need an exact match
    while  (! matchSucceeded && ! matchFailed) {

        // Skip over empty segments in either path

        do {
            homeDirSegmentIdx--;
        }
        while (homeDirSegmentIdx >= 0 && homeDirSplit[homeDirSegmentIdx] == "");

        do {
            environmentDirSegmentIdx--;
        }
        while (environmentDirSegmentIdx >= 0 && environmentHomeDirSplit[environmentDirSegmentIdx] == "");

        if (homeDirSegmentIdx < 0 && environmentDirSegmentIdx < 0) {
            // If we managed to compare all segments and it all matched, we've found a match
            matchSucceeded = true;
        }
        else if (homeDirSegmentIdx < 0 || environmentDirSegmentIdx < 0) {
            // If one has more non-empty segments than the other, it cannot be a match
            matchFailed = true;
        }
        else if (homeDirSplit[homeDirSegmentIdx] != environmentHomeDirSplit[environmentDirSegmentIdx]) {
            // If we find a non-matching segment, it cannot be a match
            matchFailed = true;
        }
        // else, keep going, look at the next segment
    }

    if (! matchSucceeded) {
        crdtes.logError(arguments, "HOME_DIR " + homeDir + " does not match env. var " + environmentHomeDirVariableName + " = " + environmentHomeDir);
        retVal = false;
    }

    return retVal;
}

function testINI() {

    var retVal = true;

    do {

        try {

            if (crdtes.getUnitFromINI("cm") != crdtes.UNIT_NAME_CM) {
                crdtes.logError(arguments, "cm unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("centimeter") != crdtes.UNIT_NAME_CM) {
                crdtes.logError(arguments, "cm unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("centimeters") != crdtes.UNIT_NAME_CM) {
                crdtes.logError(arguments, "cm unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("mm") != crdtes.UNIT_NAME_MM) {
                crdtes.logError(arguments, "mm unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("millimeter") != crdtes.UNIT_NAME_MM) {
                crdtes.logError(arguments, "mm unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("millimeters") != crdtes.UNIT_NAME_MM) {
                crdtes.logError(arguments, "mm unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("pica") != crdtes.UNIT_NAME_PICA) {
                crdtes.logError(arguments, "pica unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("picas") != crdtes.UNIT_NAME_PICA) {
                crdtes.logError(arguments, "pica unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("cicero") != crdtes.UNIT_NAME_CICERO) {
                crdtes.logError(arguments, "cicero unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("ciceros") != crdtes.UNIT_NAME_CICERO) {
                crdtes.logError(arguments, "cicero unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("px") != crdtes.UNIT_NAME_PIXEL) {
                crdtes.logError(arguments, "pixel unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("pixel") != crdtes.UNIT_NAME_PIXEL) {
                crdtes.logError(arguments, "pixel unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("pixels") != crdtes.UNIT_NAME_PIXEL) {
                crdtes.logError(arguments, "pixel unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("pt") != crdtes.UNIT_NAME_POINT) {
                crdtes.logError(arguments, "point unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("point") != crdtes.UNIT_NAME_POINT) {
                crdtes.logError(arguments, "point unit incorrect");
                retVal = false;
            }

            if (crdtes.getUnitFromINI("points") != crdtes.UNIT_NAME_POINT) {
                crdtes.logError(arguments, "point unit incorrect");
                retVal = false;
            }

            if (Math.abs(crdtes.getFloatWithUnitFromINI("2p1.3", crdtes.UNIT_NAME_INCH) - (2*6 + 1.3)/72) > 0.00001) {
                crdtes.logError(arguments, "2p1.3 value incorrect in TEST_INI");
                retVal = false;
            }

            if (Math.abs(crdtes.getFloatWithUnitFromINI("2c1.3", crdtes.UNIT_NAME_INCH) - (2*6 + 1.3)/6.0 * 0.17762) > 0.00001) {
                crdtes.logError(arguments, "2c1.3 attr value incorrect in TEST_INI");
                retVal = false;
            }

            if (Math.abs(crdtes.getFloatWithUnitFromINI("1\"", crdtes.UNIT_NAME_CM) - 2.54) > 0.00001) {
                crdtes.logError(arguments, "1\" attr value incorrect in TEST_INI");
                retVal = false;
            }

            if (Math.abs(crdtes.getFloatWithUnitFromINI("-2.54cm", crdtes.UNIT_NAME_INCH) - (-1.0)) > 0.00001) {
                crdtes.logError(arguments, "1\" attr value incorrect in TEST_INI");
                retVal = false;
            }

            var ini = crdtes.readINI(TEST_INI);
            if (! ("sizelabelsconfiguration" in ini)) {
                crdtes.logError(arguments, "section missing in TEST_INI");
                retVal = false;
                break;
            }

            var section = ini.sizelabelsconfiguration;
            if (section) {

                if (! ("applylabelobjectstylename" in section)) {
                    crdtes.logError(arguments, "applylabelobjectstylename attr missing in TEST_INI");
                    retVal = false;
                    break;
                }

                if (section.applylabelobjectstylename != "SizeLabelObjectStyle") {
                    crdtes.logError(arguments, "applylabelobjectstylename attr value incorrect in TEST_INI");
                    retVal = false;
                }

                if (! ("locklayer" in section)) {
                    crdtes.logError(arguments, "locklayer attr missing in TEST_INI");
                    retVal = false;
                    break;
                }

                if (section.locklayer != "yes") {
                    crdtes.logError(arguments, "locklayer attr value incorrect in TEST_INI");
                    retVal = false;
                }

                if (! crdtes.getBooleanFromINI(section.locklayer)) {
                    crdtes.logError(arguments, "locklayer boolean attr value incorrect in TEST_INI");
                    retVal = false;
                }

                if (crdtes.getBooleanFromINI(section.labelnestedframes)) {
                    crdtes.logError(arguments, "labelnestedframes boolean attr value incorrect in TEST_INI");
                    retVal = false;
                }

                if (Math.abs(crdtes.getFloatWithUnitFromINI(section.dontlabelframesbelowwidth, crdtes.UNIT_NAME_INCH) - 0.1) > 0.00001) {
                    crdtes.logError(arguments, "dontlabelframesbelowwidth inches attr value incorrect in TEST_INI");
                    retVal = false;
                }

                if (Math.abs(crdtes.getFloatWithUnitFromINI(section.labelframewidth, crdtes.UNIT_NAME_CM) - 6.35) > 0.00001) {
                    crdtes.logError(arguments, "labelframewidth cm attr value incorrect in TEST_INI");
                    retVal = false;
                }

                if (crdtes.getUnitFromINI(section.horizontalunit) != crdtes.UNIT_NAME_INCH) {
                    crdtes.logError(arguments, "horizontalunit attr value incorrect in TEST_INI");
                    retVal = false;
                }

                if (crdtes.getUnitFromINI("cm") != crdtes.UNIT_NAME_CM) {
                    crdtes.logError(arguments, "cm unit incorrect");
                    retVal = false;
                }
            }
        }
        catch (err) {   
            crdtes.logError(arguments, "throws " + err);
            retVal = false;     
        }
    }
    while (false);

    return retVal;
}

function testIntPow() {

    var retVal = true;

    var x = crdtes.intPow(2, 10);
    if (x != 1024) {
        crdtes.logError(arguments, "2^10 intPow failed");
        retVal = false;
    }

    x = crdtes.intPow(-2, 11);
    if (x != -2048) {
        crdtes.logError(arguments, "(-2)^11 intPow failed");
        retVal = false;
    }

    x = crdtes.intPow(0,0);
    if (! isNaN(x)) {
        crdtes.logError(arguments, "0^0 intPow failed");
        retVal = false;
    }

    return retVal;

}

function testLeftRightPad() {

    var retVal = true;

    var s = "1234567890";
    if (crdtes.rightPad(s, "x", 12) != s + "xx") {
        crdtes.logError(arguments, "rightPad extension fails");
        retVal = false;
    }

    if (crdtes.rightPad(s, "x", 10) != s) {
        crdtes.logError(arguments, "rightPad non-extension fails");
        retVal = false;
    }

    if (crdtes.rightPad(s, "x", 8) != s.substring(0, 8)) {
        crdtes.logError(arguments, "rightPad reduction fails");
        retVal = false;
    }

    if (crdtes.rightPad("", "x", 8) != "xxxxxxxx") {
        crdtes.logError(arguments, "rightPad empty fails");
        retVal = false;
    }

    if (crdtes.leftPad(s, "x", 12) != "xx" + s) {
        crdtes.logError(arguments, "leftPad extension fails");
        retVal = false;
    }

    if (crdtes.leftPad(s, "x", 10) != s) {
        crdtes.logError(arguments, "leftPad non-extension fails");
        retVal = false;
    }

    if (crdtes.leftPad(s, "x", 8) != s.substring(2)) {
        crdtes.logError(arguments, "leftPad reduction fails");
        retVal = false;
    }

    if (crdtes.leftPad("", "x", 8) != "xxxxxxxx") {
        crdtes.logError(arguments, "leftPad empty fails");
        retVal = false;
    }

    return retVal;
}

function testQuoteDequote() {

    var retVal = true;

    var s = crdtes.dQ("");
    if (s != "\"\"") {
        crdtes.logError(arguments, "failed to crdtes.dQ(\"\")");
        retVal = false;
    }

    s = crdtes.dQ('');
    if (s != "\"\"") {
        crdtes.logError(arguments, "failed to crdtes.dQ('')");
        retVal = false;
    }

    s = crdtes.sQ("");
    if (s != "''") {
        crdtes.logError(arguments, "failed to crdtes.sQ(\"\")");
        retVal = false;
    }

    s = crdtes.sQ('');
    if (s != "''") {
        crdtes.logError(arguments, "failed to crdtes.sQ('')");
        retVal = false;
    }

    s = crdtes.dQ("abc'\"\x00\n\r\t\x0a\x0d\x09\u0061\u007f\x80\u0080\u0123\u07ff\u1000\u7fff");
    if (s != "\"abc'\\\"\\x00\\n\\r\\t\\n\\r\\ta\\x7f\\u0080\\u0080\\u0123\\u07ff\\u1000\\u7fff\"") {
        crdtes.logError(arguments, "failed crdtes.dQ complex string");
        retVal = false;
    }

    s = crdtes.sQ("abc'\"\x00\n\r\t\x0a\x0d\x09\u0061\u007f\x80\u0080\u0123\u07ff\u1000\u7fff");
    if (s != "'abc\\'\"\\x00\\n\\r\\t\\n\\r\\ta\\x7f\\u0080\\u0080\\u0123\\u07ff\\u1000\\u7fff'") {
        crdtes.logError(arguments, "failed crdtes.sQ complex string");
        retVal = false;
    }

    // Byte array can contain 0x80 or 0xFF, which would not occur in a UTF-8 string as \u0080 is encoded
    // into a 2-byte sequence.

    s = crdtes.dQ([0x61, 0x62, 0x63, 0x27, 0x22, 0x00, 0x0A, 0x0D, 0x09, 0x61, 0x7f, 0x80, 0xFF]);
    if (s != "\"abc'\\\"\\x00\\n\\r\\ta\\x7f\\x80\\xff\"") {
        crdtes.logError(arguments, "failed crdtes.dQ complex byte array");
        retVal = false;
    }

    s = crdtes.sQ([0x61, 0x62, 0x63, 0x27, 0x22, 0x00, 0x0A, 0x0D, 0x09, 0x61, 0x7f, 0x80, 0xFF]);
    if (s != "'abc\\'\"\\x00\\n\\r\\ta\\x7f\\x80\\xff'") {
        crdtes.logError(arguments, "failed crdtes.sQ complex byte array");
        retVal = false;
    }

    s = [];
    for (var idx = 0; idx < 256; idx++) {
        s.push(idx);
    }

    s = crdtes.sQ(s);
    if (s != "'\\x00\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x08\\t\\n\\x0b\\x0c\\r\\x0e\\x0f\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1a\\x1b\\x1c\\x1d\\x1e\\x1f !\"#$%&\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\\x7f\\x80\\x81\\x82\\x83\\x84\\x85\\x86\\x87\\x88\\x89\\x8a\\x8b\\x8c\\x8d\\x8e\\x8f\\x90\\x91\\x92\\x93\\x94\\x95\\x96\\x97\\x98\\x99\\x9a\\x9b\\x9c\\x9d\\x9e\\x9f\\xa0\\xa1\\xa2\\xa3\\xa4\\xa5\\xa6\\xa7\\xa8\\xa9\\xaa\\xab\\xac\\xad\\xae\\xaf\\xb0\\xb1\\xb2\\xb3\\xb4\\xb5\\xb6\\xb7\\xb8\\xb9\\xba\\xbb\\xbc\\xbd\\xbe\\xbf\\xc0\\xc1\\xc2\\xc3\\xc4\\xc5\\xc6\\xc7\\xc8\\xc9\\xca\\xcb\\xcc\\xcd\\xce\\xcf\\xd0\\xd1\\xd2\\xd3\\xd4\\xd5\\xd6\\xd7\\xd8\\xd9\\xda\\xdb\\xdc\\xdd\\xde\\xdf\\xe0\\xe1\\xe2\\xe3\\xe4\\xe5\\xe6\\xe7\\xe8\\xe9\\xea\\xeb\\xec\\xed\\xee\\xef\\xf0\\xf1\\xf2\\xf3\\xf4\\xf5\\xf6\\xf7\\xf8\\xf9\\xfa\\xfb\\xfc\\xfd\\xfe\\xff'") {
        crdtes.logError(arguments, "failed crdtes.sQ byte array with all bytes 0-255");
        retVal = false;
    }

    s = crdtes.deQuote(s);
    var isOK = true;
    if (s.length != 256) {
        crdtes.logError(arguments, "crdtes.deQuote wrong length");
        retVal = false;
    }
    else {
        for (var idx = 0; idx < 256; idx++) {
            if (s[idx] != idx) {
                crdtes.logError(arguments, "crdtes.deQuote wrong byte #" + idx);
                retVal = false;
                break;
            }
        }
    }

    return retVal;
}

function testPersistData() {

    var retVal = true;

    do {
        var sampleIssuerGUID = "3a0c0e2dfa2a4b24b4e5a6a97c2a4cdd";
        var sampleDataKey = "My Data";
        var key = "My" + "secret";

        var now = new Date();
        var nowTimestamp = now.getTime();

        var persistData = crdtes.getPersistData(sampleIssuerGUID, sampleDataKey, key);
        var newPersistData = nowTimestamp + "\t" + (nowTimestamp + 1000);
        if (! persistData) {
            persistData = newPersistData;
            crdtes.setPersistData(sampleIssuerGUID, sampleDataKey, key, persistData);
        }

        var splitTimestamps = persistData.split("\t");
        if (splitTimestamps.length != 2) {
            crdtes.logError(arguments, "failed to split timestamps");
            retVal = false;
            break;
        }

        crdtes.setPersistData(sampleIssuerGUID, sampleDataKey, key, newPersistData);

        var lastSavedTimestamp = parseInt(splitTimestamps[0]);
        var lastSavedTimestampPlus1000 = parseInt(splitTimestamps[1]);
        if (lastSavedTimestamp + 1000 != lastSavedTimestampPlus1000) {
            crdtes.logError(arguments, "failed to match timestamps");
            retVal = false;
            break;
        }

        var secondsSinceLastRun = nowTimestamp - lastSavedTimestamp;
        if (secondsSinceLastRun < 0) {
            crdtes.logError(arguments, "invalid secondsSinceLastRun");
            retVal = false;
            break;
        }

    }
    while (false);

    return retVal;
}

function testToHex() {

    var retVal = true;

    if (crdtes.toHex(10, 2) != "0a") {
        crdtes.logError(arguments, "toHex(10,2) failed");
        retVal = false;
    }

    // 2-s complement
    if (crdtes.toHex(-10, 2) != "f6") {
        crdtes.logError(arguments, "toHex(-10,2) failed");
        retVal = false;
    }

    if (crdtes.toHex(65535, 2) != "ff") {
        crdtes.logError(arguments, "toHex(65535,2) failed");
        retVal = false;
    }

    if (crdtes.toHex(-65535, 2) != "01") {
        crdtes.logError(arguments, "toHex(-65535,2) failed");
        retVal = false;
    }

    return retVal;
}

function testUTFRoundTrip() {

    var retVal = true;

    var s = TEST_STRING;
    var bytes = crdtes.strToUTF8(s);
    var sRoundTrip = crdtes.binaryUTF8ToStr(bytes);
    if (s != sRoundTrip) {
        crdtes.logError(arguments, "failed to round trip a string to UTF8 and back");
        retVal = false;
    }

    return retVal;
}

var tests = [
    testBase64,
    testDirs,
    testEncrypt,
    testEnvironment,
    testINI,
    testIntPow,
    testLeftRightPad,
    testPersistData,
    testQuoteDequote,
    testToHex,
    testUTFRoundTrip
];

function runTests() {

    crdtes.pushLogLevel(crdtes.LOG_LEVEL_NOTE);

    try {
        crdtes.logNote(arguments, "Starting crdtes_test");

        var success = true;

        for (var idx = 0; idx < tests.length; idx++) {
            try {
                var ftn = tests[idx];
                var result = ftn();
                if (! result) {
                    crdtes.logError(arguments, "failed test " + ftn.name);
                }
                else {
                    crdtes.logNote(arguments, "passed test " + ftn.name);
                }
            }
            catch (err) {
                crdtes.logError(arguments, "throws " + err + " for test idx " + idx);
                result = false;
            }

            success = result && success;
        }
    }
    catch (err) {
        crdtes.logError(arguments, "throws " + err);
    }

    crdtes.logNote(arguments, "crdtes_test complete");

    crdtes.popLogLevel();

    return success;
}
crdtes.runTests = runTests;

})();