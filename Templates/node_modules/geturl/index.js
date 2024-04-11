/*

ExtendExtendScript (EES) project

(c) 2017-2019 Rorohiko Ltd. - Kris Coppieters - kris@rorohiko.com

File: GetURL/index.js

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

var http = require("http");
var https = require("https");
var fs = require("fs");
var url = require("url");
var Buffer = require('buffer').Buffer;

//
// getURL(url [, destinationFilePath], completionCallBack)
//
// If an error occurs, and completionCallBack is called with param = { error: error }
//
// If destinationFilePath is set, the returned data will be stored in this file
// and completionCallBack is called with param = { destinationFilePath: destinationFilePath, error: 0 }
//
// If destinationFilePath is left undefined, the returned data is passed to
// and completionCallBack is called with param = { data: data, error : 0 }
//

module.exports = function(remoteURL, param1, param2) {

	var method = 'GET';

	var isWiredForAsyncCallBack = false;
	var destinationFile;
	var completionCallBack;

	do {

		try {

			if (! remoteURL) {
				break;
			}

			if (typeof param1 == 'function') {
				completionCallBack = param1;
				destinationFile = undefined;
			}
			else {
				completionCallBack = param2;
				destinationFile = param1;
			}

			var protocol;
			if (remoteURL.match(/^https:\/\//)) {
				protocol = https;
			}
			else {
				protocol = http;
			}

			var parsedURL = url.parse(remoteURL);
			parsedURL.method = method;
			parsedURL.headers = {
			};

			var state = {
				data: [],
				isWriting: false,
				isFirstChunk: false,
				errorEncountered: false,
				completed: false,
				error: 0
			};

			protocol.get(parsedURL, function(response) {

				response.setEncoding('binary');

				function checkForCompletion() {
					if (! state.completed && state.endReached) {
						state.completed = true;
						var success = ! state.errorEncountered;
						if (destinationFile) {
							state.data = undefined;
						}
						else if (state.data && state.data.length > 0) {
							state.data = state.data.join("");
						}
						if (completionCallBack) {
							completionCallBack({
								data: state.data,
								error: state.error
							});
						}
					}
				}

				function writeChunk() {

					do {
						if (state.completed) {
							break;
						}

						if (state.data.length <= 0) {
							break;
						}

				    	if (state.isWriting) {
				    		break;
				      	}

						if (state.errorEncountered) {
							state.data = [];
							break;
						}

						chunk = state.data[0];
						state.data.splice(0, 1);

						if (state.isFirstChunk) {
							state.isFirstChunk = false;
				    		state.isWriting = true;
							fs.writeFile(state.assetPath, chunk, 'binary', function(err) {
								state.isWriting = false;
								if (err) {
									state.errorEncountered = true;
						    	}
								writeChunk();
							});
							break;
						}

						state.isWriting = true;
						fs.appendFile(state.assetPath, chunk, 'binary', function(err) {
							state.isWriting = false;
							if (err) {
								state.errorEncountered = true;
					    	}
							writeChunk();
						});
					}
					while (false);
					checkForCompletion();
				}

				function handleChunk(chunk) {
					if (state.errorEncountered) {
						state.data = [];
						checkForCompletion();
					}
					else if (chunk.length > 0) {
						state.data.push(chunk);
						if (destinationFile) {
					  		writeChunk();
						}
				  	}
				}

				response.on('data', function(chunk) {
					handleChunk(chunk);
				});

				response.on('error', function(error) {
					state.errorEncountered = true;
					state.error = error;
				});

				response.on('end', function() {
					state.endReached = true;
					checkForCompletion();
				});

			});

			isWiredForAsyncCallBack = true;
		}
		catch (err) {
			Logger.logError("getURL throws " + err);
		}
	}
	while (false);

	if (! isWiredForAsyncCallBack) {
		if (completionCallBack) {
			completionCallBack({
				error: "Failed to set up async callback"
			});
		}
	}

}

