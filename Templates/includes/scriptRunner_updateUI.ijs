        var scriptList = $$SHORTCODE$$.getAppScriptList();
        $$SHORTCODE$$.SCRIPT_LIST = scriptList;

        var $uiScriptList = $('#$$SHORTCODE$$list');
        $uiScriptList.find('option').remove();

        for (var scriptIdx = 0; scriptIdx < scriptList.length; scriptIdx++) {
            var scriptFilePath = scriptList[scriptIdx];
            $uiScriptList.append(
                '<option id="ScriptFile_' + scriptIdx + '">' + 
                    $$SHORTCODE$$.path.basename(scriptFilePath) + 
                '</option>');
        }

