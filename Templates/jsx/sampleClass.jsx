var xGlobal = {}; if ("undefined" != typeof global) { xGlobal = global; } else if ("undefined" != typeof $) { xGlobal = $.global; }
if (! xGlobal.$$SHORTCODE$$) {
    xGlobal.$$SHORTCODE$$ = {};
}
var $$SHORTCODE$$ = xGlobal.$$SHORTCODE$$;

$$SHORTCODE$$.SampleClass = SampleClass;

var ProtectedObjectClass = ParentClass;
var ParentClass = ParentClass;

ProtectedObjectClass.declareClass(ParentClass, "SampleClass");

function SampleClass(defaults) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var error = false;
    
    do {
        try {

            if (defaults == undefined) {
                
                this.readWriteSampleData_private_rw_ = undefined;
                this.readOnlySampleData_private_ro_ = undefined;

                $$SHORTCODE$$.SampleClass.parentClass.call(this); // Call superclass constructor  
                break;
            }

            defaults = $$SHORTCODE$$.Defaults.init(defaults);

            defaults.sampleData = "Sample Data";
            defaults.readOnlySampleData = "Read Only Sample Data";

            $$SHORTCODE$$.SampleClass.parentClass.call(this, defaults); // Call superclass constructor

            this.readWriteSampleData_private_rw_ = cursor;
            this.readOnlySampleData_private_ro_ = isTemplateElement;
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            error = true;
        }
    }
    while (false);
    
    this.error_private_ = this.error_private_ || error; // Factory will reject this object if error remains true

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.SampleClass.factory = function factory(defaults) { // Static

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = ParentClass.classFactory($$SHORTCODE$$.SampleClass, defaults); 

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal; 
}

$$SHORTCODE$$.SampleClass.prototype.sampleMethod = function sampleMethod(param) {

    var retVal; 
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = "param = " + param;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}


