crdtes.evalScript("Tests/standaloneInitDirs.jsx", $.fileName);
crdtes.evalScript("hostscript.jsx", $.fileName);

app.documents.everyItem().close(SaveOptions.NO);

$$SHORTCODE$$.initHostScript( $$SHORTCODE$$.C.APP_CODE_INDESIGN, $$SHORTCODE$$.dirs.projectDir);