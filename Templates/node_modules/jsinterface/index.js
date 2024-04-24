/* 

ExtendExtendScript (EES) project

(c) 2017-2024 Rorohiko Ltd. - Kris Coppieters - kris@rorohiko.com

File: JSInterface/index.js

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Rorohiko Ltd., nor the names of its contributors
  may be used to endorse or promote products derived from this software without
  specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
THE POSSIBILITY OF SUCH DAMAGE.

==============================================
*/

'use strict';

var Logger;
if ($$SHORTCODE$$ && ("undefined" == typeof Logger || ! Logger) ) {
    Logger = $$SHORTCODE$$;
}

var path = require("path");
var os = require("os");
var fs = require("fs");
var process = require("process");

var JSInterface = {};

var gCSInterface = new CSInterface();
var gInitialized = false;
var gPluginList = [];

module.exports = JSInterface;

JSInterface.init = init;
function init() {

    if (! gInitialized) {

        gInitialized = true;
        setupJSInterfaceCommandListener();
        setupPlugins();
    }

    return gPluginList;
}

JSInterface.getData = getData;
function getData() {
    return (window.jsInterface_pendingCommand ? window.jsInterface_pendingCommand.data: undefined);
}

JSInterface.getPendingCommand = getPendingCommand;
function getPendingCommand() {
    return window.jsInterface_pendingCommand;
}

function setupJSInterfaceCommandListener() {

    Logger.logTrace("Installing event handler for com.rorohiko.extendExtendScript.evalScript");
    gCSInterface.addEventListener("com.rorohiko.extendExtendScript.evalScript", function(event) {

        do {
            try {
                Logger.logTrace("Handling event com.rorohiko.extendExtendScript.evalScript");
                
                if (! event) {
                    Logger.logError("event is missing");
                    break;
                }

                var command = event.data;
                if (! command) {
                    Logger.logError("command is missing");
                    break;
                }

                var pendingCommand = {};

                pendingCommand.scriptText = command.scriptText;
                pendingCommand.data = command.data;
                pendingCommand.key = command.key;
                pendingCommand.engineName = command.engineName;

                var retVal = {
                    key: pendingCommand.key,
                    engineName: pendingCommand.engineName
                };

                pendingCommand.requestAsyncHandling = function() {
                    pendingCommand.willTriggerCompletion = true;
                };

                pendingCommand.completionCallBack = function(returnData) {

                    do {
                        if (pendingCommand.completed) {
                            Logger.logWarning("pendingCommand.completionCallBack called a second time");
                            break;
                        }

                        pendingCommand.completed = true;

                        retVal.returnData = returnData;

                        var retValJSONStr = JSON.stringify(retVal).replace(/\\/g,"\\\\").replace(/'/g,"\\'");

                        var script = "JSInterface.commandCompletion('" + retValJSONStr + "')";
                        gCSInterface.evalScript(script);
                    }
                    while (false);
                };

                var savedPendingCommand = window.jsInterface_pendingCommand;
                window.jsInterface_pendingCommand = pendingCommand;
                var returnData = eval(pendingCommand.scriptText);
                window.jsInterface_pendingCommand = savedPendingCommand;

                if (! pendingCommand.willTriggerCompletion) {
                    pendingCommand.completionCallBack(returnData);
                }
            }
            catch (err) {               
                Logger.logError("setupJSInterfaceCommandListener throws " + err);
            }
        }
        while (false);
    });
}

function setupPlugins() {

    do {
        try {
            
            JSInterface.plugins = {};

            var pluginDir = __dirname + "/plugins/";
            if (! fs.existsSync(pluginDir)) {
                break;
            }

            var files = fs.readdirSync(pluginDir);
            for (var fileIdx in files) {
                try {
                    var name = files[fileIdx];
                    var fullPath = pluginDir + name;
                    if (! fs.statSync(fullPath).isDirectory()) {
                        if (name.substr(-3) == '.js') {
                            name = name.substr(0,name.length - 3);
                            var pluginExports = require(fullPath);
                            if (typeof pluginExports == 'function') {
                                JSInterface.plugins[name] = pluginExports;
                            }
                            else {
                                for (var key in pluginExports) {
                                    JSInterface.plugins[key] = pluginExports[key];
                                }
                            }
                        }
                    }
                }
                catch (err) {
                    Logger.logError("setupPlugins loop throws " + err);
                }
            }
        }
        catch (err) {            
            Logger.logError("setupPlugins throws " + err);
        }
    }
    while (false);

}
