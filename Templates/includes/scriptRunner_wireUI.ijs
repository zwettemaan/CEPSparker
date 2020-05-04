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

        $("#btnRunSelected").click(function(evt) {
            var selectedScriptID = $("#$$SHORTCODE$$list option:selected").attr('id');
            // e.g. ScriptFile_12 
            var selectedScriptIdx = parseInt(selectedScriptID.split("_")[1], 10);
            var selectedScriptPath = $$SHORTCODE$$.SCRIPT_LIST[selectedScriptIdx];
            var script = 
                "(function(){\n" + 
                "    var retVal;\n" +
                "    try {\n" +
                "        var scriptFile = File(" + $$SHORTCODE$$.dQ(selectedScriptPath) + ");\n" +
                "        if (scriptFile.exists) {\n" +
                "           scriptFile.open('r');\n" +
                "           scriptFile.encoding = 'UTF8';\n" +
                "           var script = scriptFile.read();\n" +
                "           scriptFile.close();\n" +
                "           retVal = eval(script);\n" +
                "        }\n" + 
                "    }\n" + 
                "    catch (err) {\n" + 
                "       retVal = err.toString();\n" + 
                "    }\n" + 
                "    return retVal;\n" + 
                "})();";
            $$SHORTCODE$$.csInterface.evalScript(script);
        });

        $$SHORTCODE$$.csInterface.addEventListener(
            "applicationActivate",
            function() {
                updateUI_PRM().then();
            }
        );