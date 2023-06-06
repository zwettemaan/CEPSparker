// Need to run in a persistent engine for callbacks to work
// Make sure to add JSInterface.jsx and json2.jsx

#targetengine TestSomewhere
#include "json2.jsx"
#include "JSInterface.jsx"

// Some sample ExtendScript code. Fetch a URL over https and display in an alert

//
// JSInterface.evalScript(scriptText [, data] [, callBack] )
//
// On the JS side, you can retrieve the data through:
//
// var data = JSInterface.getData();
//

function handleData(data) { 
  alert(data);
}

var url = "https://www.rorohiko.com/welcome.msg";
JSInterface.evalScript("JSInterface.plugins.getURL(JSInterface.getData())", url, handleData);



/* 
=======================================

ExtendExtendScript (EES) project

(c) 2017-2019 Rorohiko Ltd. - Kris Coppieters - kris@rorohiko.com

File: CallGetURL.jsx

  Sample ExtendScript code which calls some JavaScript code and retrieves
  the result via a callback. 

  Precondition for this example to work: the ExtendExtendScript extension
  needs to be installed in InDesign

  This example consists of three files:

  	 CallGetURL.jsx
  	 JSInterface.jsx
  	 json2.jsx

  which are co-dependent but self-sufficient - you can copy the example 
  folder into your InDesign scripts folder and CallGetURL will run without 
  needing any other files to be copied (assuming the ExtendScriptExtender 
  extension has been installed, of course).

  When run, the code will establish a link to the ExtendScriptExtender 
  engine and JavaScript modules and interact with them.

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

*/

