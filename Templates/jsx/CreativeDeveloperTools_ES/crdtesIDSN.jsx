/**
 * Creative Developer Tools (CRDT) is a growing suite of tools aimed at script developers<br>
 * and plug-in developers for the Adobe Creative Cloud eco-system.<br>
 * <br>
 * This module provides functions that are specific to Adobe InDesign.
 * @module crdtesIDSN
 * @namespace crdtesIDSN
 * 
 */

var crdtesIDSN = getPlatformGlobals().defineGlobalObject("crdtesIDSN");

/**
 * Convert an InDesign collection into a pure JavaScript array
 *
 * @function collectionToArray
 * @memberOf crdtesIDSN
 *
 * @param {Collection} coll - an InDesign collection
 * @returns array with the collection elements
 */

function collectionToArray(coll) {

    var retVal = undefined;

    crdtes.logEntry(arguments);

    do {

        try {

            if (! coll) {
                crdtes.logError(arguments, "need coll");
                break; 
            }

            if (coll instanceof Array) {
                retVal = coll.slice(0);
            }
            else {
                retVal = coll.everyItem().getElements().slice(0); 
                if (! (retVal instanceof Array)) {
                    crdtes.logError(arguments, "failed to convert collection into array");
                }
            }

        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    crdtes.logExit(arguments);

    return retVal;
}
crdtesIDSN.collectionToArray = collectionToArray;