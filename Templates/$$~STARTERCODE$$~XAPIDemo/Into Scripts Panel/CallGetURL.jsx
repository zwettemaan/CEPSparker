// Need to run in a persistent engine for callbacks to work

#targetengine TestSomewhere
#include "json2.jsx"

// Some sample ExtendScript code. Fetch a URL over https and display in an alert

function handleData(error, data) { 
    if (error) {
        alert("Error:" + error);
    }
    else {
        alert(data);
    }
}

var url = "https://www.rorohiko.com/welcome.msg";
$$SHORTCODE$$.getURLAPI.getURL(url, undefined, handleData);
