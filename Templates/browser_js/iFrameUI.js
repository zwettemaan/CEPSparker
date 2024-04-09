var xGlobal = {}; if ("undefined" != typeof global) { xGlobal = global; } else if ("undefined" != typeof $) { xGlobal = $.global; }
if (! xGlobal.$$SHORTCODE$$) {
    xGlobal.$$SHORTCODE$$ = {};
}
var $$SHORTCODE$$ = xGlobal.$$SHORTCODE$$;

$$SHORTCODE$$.btnNewDocument = function btnNewDocument() {

    $$SHORTCODE$$.sendEventFromIFrameToCEP($$SHORTCODE$$.C.IFRAME_EVENT_TYPE_NEW_DOCUMENT);
}
