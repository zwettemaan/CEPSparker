    $("#btnRun").click(function(evt) {
    	var scriptText = $("#txtScript").val();
        var quotedScriptText = $$SHORTCODE$$.dQ(scriptText);
        var scriptReturningJSONOfEval = "JSON.stringify(eval(" + quotedScriptText + "))";
        $$SHORTCODE$$.csInterface.evalScript(scriptReturningJSONOfEval, function(dataJSON) {
            try {
                var dataObject = JSON.parse(dataJSON);
                var readableJSON = JSON.stringify(dataObject, null, "\t");
            }
            catch (err) {
                readableJSON = dataJSON;
            }
            $("#txtReturnData").text(readableJSON);
        });
    });