var $$SHORTCODE$$ = getPlatformGlobals().defineGlobalObject("$$SHORTCODE$$");

(function() {

$$SHORTCODE$$.SampleDerivedClass = SampleDerivedClass;

var ProtectedObjectClass = $$SHORTCODE$$.ProtectedObject;
var ParentClass = $$SHORTCODE$$.SampleClass;

ProtectedObjectClass.declareClass(ParentClass, "SampleDerivedClass");

function SampleDerivedClass(defaults) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var error = false;
    
    do {
        try {

            if (defaults == undefined) {
                
                this.someMoreData_private_rw_ = undefined;

                $$SHORTCODE$$.SampleDerivedClass.parentClass.call(this); // Call superclass constructor  
                break;
            }

            defaults = $$SHORTCODE$$.Defaults.init(defaults);
            var someMoreData = defaults.someMoreData;
            defaults.someMoreData = undefined;

            $$SHORTCODE$$.SampleDerivedClass.parentClass.call(this, defaults); // Call superclass constructor

            this.someMoreData_private_rw_ = someMoreData;
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

$$SHORTCODE$$.SampleDerivedClass.factory = function factory(defaults) { // Static

    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = ParentClass.classFactory($$SHORTCODE$$.SampleDerivedClass, defaults); 

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal; 
}

// Override
$$SHORTCODE$$.SampleDerivedClass.prototype.sampleMethod = function sampleMethod(param) {

    var retVal; 
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = "+++" + $$SHORTCODE$$.SampleDerivedClass.parentClass.prototype.sampleMethod.call(param);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}


})();

