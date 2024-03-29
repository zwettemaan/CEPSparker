/*
Plugins to ExtendExtendScript are modules exporting functions of any kind.

The export can be either a function or an object with functions

Asynchronous functions need some special glue. They should start by immediately 
requesting and saving

    JSInterface.getPendingCommand()

e.g. 

    var pendingCommand = JSInterface.getPendingCommand();

On completion of the async functionality the function needs to 
call 

    pendingCommand.completionCallBack(whatever return data)

Finally, just before the asynchronous function returns, it needs to call 

    pendingCommand.requestAsyncHandling()

This promises the JSInterface code that the code will eventually call  

    pendingCommand.completionCallBack(whatever return data)

with the return data when it is complete.

*/

var getURL = require("geturl");
var JSInterface = require("jsinterface");

GetURLPlugin = {};
module.exports = GetURLPlugin;

//
// Will provide JSInterface.plugins.getURL(url [, destinationFilePath])
//
// If destinationFilePath is set, the returned data will be stored in this file
//
// If destinationFilePath is left undefined, the returned data is passed to 
//
//   pendingCommand.completionCallBack(returnData)
//

GetURLPlugin.getURL = function(remoteURL, destinationFilePath) {

    var pendingCommand = JSInterface.getPendingCommand();
    
    try {
        getURL(remoteURL, destinationFilePath, function(result) {
            if (pendingCommand && pendingCommand.completionCallBack) {
                pendingCommand.completionCallBack(result.data);
            }
        });
        isWiredForAsyncCallBack = true;
    }
    catch (err) {
        Logger.logError("getURLPlugin throws " + err);
    }

    if (isWiredForAsyncCallBack) {
        if (pendingCommand && pendingCommand.requestAsyncHandling) {
            pendingCommand.requestAsyncHandling();
        }
    }

}

/* 

ExtendExtendScript (EES) project

(c) 2017-2019 Rorohiko Ltd. - Kris Coppieters - kris@rorohiko.com

Plugin File: GetURLPlugin.js

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
