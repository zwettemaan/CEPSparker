/**
 * Creative Developer Tools (CRDT) ScriptUI helpers for ExtendScript.<br>
 * <br>
 * This module provides ScriptUI utilities that are not specific to one Adobe app.
 * @module crdtesScriptUI
 * @namespace crdtesScriptUI
 */

var crdtesScriptUI = getPlatformGlobals().defineGlobalObject("crdtesScriptUI");

const DEFAULT_PROGRESS_PALETTE_BOUNDS = [400, 400, 800, 480];
const DEFAULT_PROGRESS_BAR_BOUNDS = [10, 20, 390, 30];
const DEFAULT_PROGRESS_UPDATE_INTERVAL_MILLISECONDS = 4000;

/**
 * Create a ScriptUI progress palette.
 *
 * @function progressCreate
 * @memberOf crdtesScriptUI
 *
 * @param {object=} defaults - optional defaults:<br>
 * <code>{ title: "...", bounds: [left, top, right, bottom], progressBarBounds: [left, top, right, bottom], updateIntervalMilliseconds: number, minValue: number, maxValue: number, hidden: true/false }</code>
 * @returns {object|undefined} progress state object used by other progress helpers
 */
function progressCreate(defaults) {

    var retVal = undefined;

    crdtes.logEntry(arguments);

    do {

        try {
            var options = defaults || {};

            var bounds = options.bounds;
            if (! (bounds instanceof Array) || bounds.length != 4) {
                if (bounds !== undefined) {
                    crdtes.logError(arguments, "defaults.bounds must be [left, top, right, bottom]; using default bounds");
                }
                bounds = DEFAULT_PROGRESS_PALETTE_BOUNDS.slice(0);
            }

            var progressBarBounds = options.progressBarBounds;
            if (! (progressBarBounds instanceof Array) || progressBarBounds.length != 4) {
                if (progressBarBounds !== undefined) {
                    crdtes.logError(arguments, "defaults.progressBarBounds must be [left, top, right, bottom]; using default bounds");
                }
                progressBarBounds = DEFAULT_PROGRESS_BAR_BOUNDS.slice(0);
            }

            var updateIntervalMilliseconds = Number(options.updateIntervalMilliseconds);
            if (isNaN(updateIntervalMilliseconds) || updateIntervalMilliseconds <= 0) {
                if (options.updateIntervalMilliseconds !== undefined) {
                    crdtes.logError(arguments, "defaults.updateIntervalMilliseconds must be > 0; using default value");
                }
                updateIntervalMilliseconds = DEFAULT_PROGRESS_UPDATE_INTERVAL_MILLISECONDS;
            }

            var minValue = Number(options.minValue);
            if (isNaN(minValue)) {
                if (options.minValue !== undefined) {
                    crdtes.logError(arguments, "defaults.minValue must be numeric; using 0");
                }
                minValue = 0;
            }

            var maxValue = Number(options.maxValue);
            if (isNaN(maxValue)) {
                if (options.maxValue !== undefined) {
                    crdtes.logError(arguments, "defaults.maxValue must be numeric; using 100");
                }
                maxValue = 100;
            }

            if (maxValue <= minValue) {
                crdtes.logError(arguments, "defaults.maxValue must be > defaults.minValue; using 0..100");
                minValue = 0;
                maxValue = 100;
            }

            var title = "";
            if (options.title !== undefined && options.title !== null) {
                title = String(options.title);
            }

            var palette = new Window("palette", title, bounds);
            if (! palette) {
                crdtes.logError(arguments, "failed to create ScriptUI palette");
                break;
            }

            palette.orientation = "column";
            palette.alignChildren = "left";

            var progressBar = palette.add("progressbar", progressBarBounds.slice(0));
            if (! progressBar) {
                crdtes.logError(arguments, "failed to create ScriptUI progressbar");
                try {
                    palette.close();
                }
                catch (closeErr) {
                }
                break;
            }

            progressBar.minvalue = minValue;
            progressBar.maxvalue = maxValue;

            retVal = {
                palette: palette,
                progressBar: progressBar,
                hidden: true,
                title: title,
                valuePercent: 0,
                lastUpdateMilliseconds: null,
                updateIntervalMilliseconds: updateIntervalMilliseconds
            };

            var hidden = options.hidden;
            if (hidden === undefined) {
                hidden = false;
            }

            if (! hidden) {
                progressShow(retVal);
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
crdtesScriptUI.progressCreate = progressCreate;

/**
 * Close and dispose progress palette.
 *
 * @function progressClose
 * @memberOf crdtesScriptUI
 *
 * @param {object} progressState - object returned by <code>progressCreate</code>
 */
function progressClose(progressState) {

    crdtes.logEntry(arguments);

    do {

        try {
            if (! progressState) {
                crdtes.logError(arguments, "need progressState");
                break;
            }

            if (! progressState.palette) {
                crdtes.logError(arguments, "progressState has no palette");
                break;
            }

            progressState.palette.close();
            progressState.hidden = true;
            progressState.palette = undefined;
            progressState.progressBar = undefined;
        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    crdtes.logExit(arguments);
}
crdtesScriptUI.progressClose = progressClose;

/**
 * Show progress palette.
 *
 * @function progressShow
 * @memberOf crdtesScriptUI
 *
 * @param {object} progressState - object returned by <code>progressCreate</code>
 */
function progressShow(progressState) {

    crdtes.logEntry(arguments);

    do {

        try {
            if (! progressState) {
                crdtes.logError(arguments, "need progressState");
                break;
            }

            if (! progressState.palette) {
                crdtes.logError(arguments, "progressState has no palette");
                break;
            }

            if (! progressState.hidden) {
                break;
            }

            progressState.palette.show();
            progressState.hidden = false;

            progressUpdate(progressState);
        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    crdtes.logExit(arguments);
}
crdtesScriptUI.progressShow = progressShow;

/**
 * Hide progress palette.
 *
 * @function progressHide
 * @memberOf crdtesScriptUI
 *
 * @param {object} progressState - object returned by <code>progressCreate</code>
 */
function progressHide(progressState) {

    crdtes.logEntry(arguments);

    do {

        try {
            if (! progressState) {
                crdtes.logError(arguments, "need progressState");
                break;
            }

            if (! progressState.palette) {
                crdtes.logError(arguments, "progressState has no palette");
                break;
            }

            if (progressState.hidden) {
                break;
            }

            progressState.palette.hide();
            progressState.hidden = true;
        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    crdtes.logExit(arguments);
}
crdtesScriptUI.progressHide = progressHide;

/**
 * Set progress title and update UI.
 *
 * @function progressSetTitle
 * @memberOf crdtesScriptUI
 *
 * @param {object} progressState - object returned by <code>progressCreate</code>
 * @param {string} title - palette title
 */
function progressSetTitle(progressState, title) {

    crdtes.logEntry(arguments);

    do {

        try {
            if (! progressState) {
                crdtes.logError(arguments, "need progressState");
                break;
            }

            progressState.title = (title === undefined || title === null) ? "" : String(title);
            progressUpdate(progressState);
        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    crdtes.logExit(arguments);
}
crdtesScriptUI.progressSetTitle = progressSetTitle;

/**
 * Set progress value percent in [0,100] and update UI.
 *
 * @function progressSetValue
 * @memberOf crdtesScriptUI
 *
 * @param {object} progressState - object returned by <code>progressCreate</code>
 * @param {number} valuePercent - progress value 0..100
 */
function progressSetValue(progressState, valuePercent) {

    crdtes.logEntry(arguments);

    do {

        try {
            if (! progressState) {
                crdtes.logError(arguments, "need progressState");
                break;
            }

            var numericValue = Number(valuePercent);
            if (isNaN(numericValue)) {
                crdtes.logError(arguments, "valuePercent is not a number: " + valuePercent);
                break;
            }

            if (numericValue < 0) {
                numericValue = 0;
            }
            if (numericValue > 100) {
                numericValue = 100;
            }

            progressState.valuePercent = numericValue;
            progressUpdate(progressState);
        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    crdtes.logExit(arguments);
}
crdtesScriptUI.progressSetValue = progressSetValue;

/**
 * Update progress palette from state.
 *
 * @function progressUpdate
 * @memberOf crdtesScriptUI
 *
 * @param {object} progressState - object returned by <code>progressCreate</code>
 */
function progressUpdate(progressState) {

    crdtes.logEntry(arguments);

    do {

        try {
            if (! progressState) {
                crdtes.logError(arguments, "need progressState");
                break;
            }

            if (! progressState.palette) {
                crdtes.logError(arguments, "progressState has no palette");
                break;
            }

            if (! progressState.progressBar) {
                crdtes.logError(arguments, "progressState has no progressBar");
                break;
            }

            if (progressState.hidden) {
                break;
            }

            var palette = progressState.palette;
            var progressBar = progressState.progressBar;

            var modified = false;

            var title = (progressState.title === undefined || progressState.title === null) ? "" : String(progressState.title);
            if (palette.text != title) {
                palette.text = title;
                modified = true;
            }

            var valuePercent = Number(progressState.valuePercent);
            if (isNaN(valuePercent)) {
                crdtes.logError(arguments, "progressState.valuePercent is not a number: " + progressState.valuePercent);
                break;
            }

            if (valuePercent < 0) {
                valuePercent = 0;
            }
            if (valuePercent > 100) {
                valuePercent = 100;
            }

            valuePercent = Math.floor(valuePercent);
            if (progressBar.value != valuePercent) {
                progressBar.value = valuePercent;
                modified = true;
            }

            if (! modified) {
                break;
            }

            var nowMilliseconds = (new Date()).getTime();
            var lastUpdateMilliseconds = progressState.lastUpdateMilliseconds;
            var updateIntervalMilliseconds = progressState.updateIntervalMilliseconds;

            if (lastUpdateMilliseconds === null || nowMilliseconds - lastUpdateMilliseconds > updateIntervalMilliseconds) {
                if (app.processEvents) {
                    app.processEvents();
                }
                else if (palette.layout && palette.layout.layout) {
                    palette.layout.layout(true);
                    if (palette.layout.resize) {
                        palette.layout.resize();
                    }
                }
                else {
                    crdtes.logError(arguments, "no non-activating ScriptUI refresh method available");
                }

                progressState.lastUpdateMilliseconds = nowMilliseconds;
            }
        }
        catch (err) {
            crdtes.logError(arguments, "throws " + err);
        }
    }
    while (false);

    crdtes.logExit(arguments);
}
crdtesScriptUI.progressUpdate = progressUpdate;