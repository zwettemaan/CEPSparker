﻿//@include "Tests/standaloneInitDirs.jsx"
//@include "hostscript.jsx"

app.documents.everyItem().close(SaveOptions.NO);

$$SHORTCODE$$.initHostScript( $$SHORTCODE$$.C.APP_CODE_INDESIGN, $$SHORTCODE$$.dirs.projectDir);