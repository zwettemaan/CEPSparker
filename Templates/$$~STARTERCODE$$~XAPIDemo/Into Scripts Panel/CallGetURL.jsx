// Need to run in a persistent engine for callbacks to work

//@targetengine $$EXTENSION_ID$$_Engine_Id

// Some sample ExtendScript code. Fetch a URL over https and display in an alert

function handleData(error, data) { 
    if (error) {
        alert("Error:" + error);
    }
    else {
        alert(JSON.stringify(data));
    }
}

var url = "https://jsonplaceholder.typicode.com/todos/1";
$$SHORTCODE$$.getURLAPI.getURL(url, undefined, handleData);
