// JSInterface.jsx is used both as a 'transportable' jsx file as well as an
// internal module for the ExtendScriptExtender. In the first case, it will
// try to contact its alter-ego in the 
//
//   $$EXTENSION_ID$$_Engine_Id
//
// engine, which is initiated from the ExtendScriptExtender extension.

var JSInterface = {};

JSInterface.loadPlugPlugLibrary = function(filePathJSONStr) {

    if (JSInterface.externalLibrary) {
        return;
    }

    try {
        JSInterface.externalLibrary = new ExternalObject("lib:PlugPlugExternalObject");
        return;
    }
    catch (err) {        
    }

    var filePath;
    if (filePathJSONStr) {
        filePath = JSON.parse(filePathJSONStr);
    }
    else {
        var crossEngineScript = 
            "#targetengine $$EXTENSION_ID$$_Engine_Id\n" + 
            "JSInterface.plugPlugLibraryPath;"

        filePath = app.doScript(crossEngineScript, ScriptLanguage.JAVASCRIPT);
    }

    try {
        var plugPlugLibraryFile = new File(filePath);
        if (plugPlugLibraryFile.exists) {
            JSInterface.plugPlugLibraryPath = filePath;
            JSInterface.externalLibrary = new ExternalObject("lib:" + plugPlugLibraryFile.fullName);
        }
    }
    catch (err) {
    }
}

//
// JSInterface.evalScript(scriptText [, data] [, callBack] )
//

JSInterface.evalScript = function(scriptText, param1, param2) {
    
    var callBack;
    var data;
    if (typeof param1 == 'function') {
        callBack = param1;
    }
    else {
        data = param1;
        callBack = param2;
    }

    JSInterface.loadPlugPlugLibrary();

    //
    // JSInterface.pending is a lookup table of scripts
    // callbacks in progress
    //

    if (! JSInterface.pending) {
        JSInterface.pending = {};
        JSInterface.pending.lastKey = 0;
    }

    var key = JSInterface.pending.lastKey + 1;
    JSInterface.pending.lastKey = key;
    key = $.engineName + ":" + key;

    var command = {
        scriptText: scriptText,
        data: data,
        key: key,
        engineName: $.engineName
    };

    var commandJSONStr = JSON.stringify(command);

    var csxsEvent = new CSXSEvent();
    csxsEvent.type = "com.rorohiko.extendExtendScript.evalScript";
    csxsEvent.scope = "APPLICATION";
    csxsEvent.data = commandJSONStr;
    csxsEvent.extensionId = "$$EXTENSION_BUNDLEID$$";
    csxsEvent.callBack = callBack;

    //
    // Stash it in the lookup table so we can retrieve it when
    // the callback returns
    //

    JSInterface.pending[key] = csxsEvent;

    csxsEvent.dispatch();
}

JSInterface.commandCompletion = function(retValJSONStr) {
    var retVal = JSON.parse(retValJSONStr);
    
    //
    // Check if this is the correct ExtendScript engine. 
    // If it is, handle the callback.
    // If not, pass it through to the correct engine.
    //
    var engineName = retVal.engineName;
    if (engineName == $.engineName) {
        var csxsEvent = JSInterface.pending[retVal.key];
        if (csxsEvent) {
            if (csxsEvent.callBack) {
                csxsEvent.callBack(retVal.returnData);
            }
            delete JSInterface.pending[retVal.key];
        }   
    }
    else {
        retValJSONStr = retValJSONStr.replace(/\\/g,'\\\\').replace(/'/g,"\\'")      

        var script = 
            "#targetengine " + engineName + "\n" + 
            "JSInterface.commandCompletion('" + retValJSONStr + "');"

        app.doScript(script, ScriptLanguage.JAVASCRIPT);
    }
}

/* 

ExtendExtendScript (EES) project

(c) 2017-2022 Rorohiko Ltd. - Kris Coppieters - kris@rorohiko.com

File: JSInterface.jsx

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
