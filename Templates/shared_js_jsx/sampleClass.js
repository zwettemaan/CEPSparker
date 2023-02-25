if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

(function() {

$$SHORTCODE$$.SampleClass = SampleClass;

var ProtectedObjectClass = $$SHORTCODE$$.ProtectedObject;
var ParentClass = $$SHORTCODE$$.ProtectedObject;

ProtectedObjectClass.declareClass(ParentClass, "SampleClass");

function SampleClass(defaults) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var error = false;
    
    do {
        try {

            if (defaults == undefined) {
                
                this.sampleData_private_rw_ = undefined;
                this.readOnlySampleData_private_ro_ = undefined;

                $$SHORTCODE$$.SampleClass.parentClass.call(this); // Call superclass constructor  
                break;
            }

            defaults = $$SHORTCODE$$.Defaults.init(defaults);
            var sampleData = defaults.sampleData;
            defaults.sampleData = undefined;
            var readOnlySampleData = defaults.readOnlySampleData;
            defaults.readOnlySampleData = undefined;

            defaults = $$SHORTCODE$$.Defaults.init(defaults);

            $$SHORTCODE$$.SampleClass.parentClass.call(this, defaults); // Call superclass constructor

            this.sampleData_private_rw_ = sampleData;
            this.readOnlySampleData_private_ro_ = readOnlySampleData;
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

$$SHORTCODE$$.SampleClass.prototype.otherMethod_protected_ = function otherMethod(param) {

    var retVal; 
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = "otherMethod param = " + param;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}


})();

