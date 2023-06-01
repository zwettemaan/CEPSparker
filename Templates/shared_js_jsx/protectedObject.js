//
// This code is shared between CEP/JavaScript and ExtendScript
//

// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

var Class = Function; // Alias for readability - ... instanceof Class instead of ... instanceof Function

(function(){

$$SHORTCODE$$.ProtectedObject = ProtectedObject;

$$SHORTCODE$$.ProtectedObject.kAttribSuffix_GetterAndSetter = "_private_rw_"; // members that need a getter and a setter
$$SHORTCODE$$.ProtectedObject.kAttribSuffix_Getter          = "_private_ro_"; // members that need a getter only
$$SHORTCODE$$.ProtectedObject.kAttribSuffix_Setter          = "_private_wo_"; // members that need a setter only
$$SHORTCODE$$.ProtectedObject.kAttribSuffix_Internal        = "_private_";    // members that have no getter nor setter

$$SHORTCODE$$.ProtectedObject.prototype.constructor = $$SHORTCODE$$.ProtectedObject;
$$SHORTCODE$$.ProtectedObject.nextUniqueId = 1;

$$SHORTCODE$$.ProtectedObject.classNameToClassDictionary_private_ = {};
$$SHORTCODE$$.ProtectedObject.nestedClassNameToClassDictionary_private_ = {};
$$SHORTCODE$$.ProtectedObject.uniqueClassNameToClassDictionary_private_ = {};

function ProtectedObject(defaults) // Constructor
{
    var error = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            if (defaults == undefined)
            {
                this.id_private_ro_ = undefined;
                this.error_private_ = undefined;
                break;
            }

            for (var attr in defaults)
            {
                var value = defaults[attr];
                if (value !== undefined)
                {
                    this.setAttrib(attr, defaults[attr]);
                }
            }
            
            this.id_private_ro_ = $$SHORTCODE$$.ProtectedObject.nextUniqueId++;
        }
        catch (err)
        {
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

$$SHORTCODE$$.ProtectedObject.classFactory = function classFactory(Class, defaults)
{
    var retVal = null;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif
    do
    {
        try
        {
            if (Class.emptyObject == undefined)
            {
                Class.emptyObject = new Class();
                Class.emptyObject.getterSetterGenerate_protected_();
            }

            if (defaults == undefined)
            {
                retVal = Class.emptyObject;
                break;
            }

            retVal = new Class(defaults);
            if (retVal.error_private_)
            {
                retVal = null;
            }
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.factory = function factory(defaults) { // Static
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = $$SHORTCODE$$.ProtectedObject.classFactory($$SHORTCODE$$.ProtectedObject, defaults); 

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.declareClass = function declareClass(parentClass, newClassName, uniqueClassName) {// Static
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            var newClass = eval("$$SHORTCODE$$." + newClassName);
            newClass.parentClass = parentClass;
            if (parentClass == $$SHORTCODE$$.ProtectedObject)
            {
                newClass.nestedClassName = newClassName;    
            }
            else
            {
                newClass.nestedClassName = parentClass.nestedClassName + "." + newClassName;
            }

            newClass.prototype = new parentClass();
            newClass.prototype.constructor = newClass;
            newClass.prototype.className_private_ = newClassName;
            parentClass[newClassName] = newClass;

            var namedClasses = $$SHORTCODE$$.ProtectedObject.classNameToClassDictionary_private_[newClassName];
            if (namedClasses == undefined)
            {
                namedClasses = [];
                $$SHORTCODE$$.ProtectedObject.classNameToClassDictionary_private_[newClassName] = namedClasses;
            }
            namedClasses.push(newClass);

            if (uniqueClassName != undefined)
            {
                newClass.uniqueClassName = uniqueClassName;
                if ($$SHORTCODE$$.ProtectedObject.uniqueClassNameToClassDictionary_private_[uniqueClassName] != undefined)
                {
                    $$SHORTCODE$$.logError(arguments, "duplicate unique class name " + uniqueClassName + " for " + newClass);
                }
                else
                {
                    $$SHORTCODE$$.ProtectedObject.uniqueClassNameToClassDictionary_private_[uniqueClassName] = newClass;
                }
            }

            if ($$SHORTCODE$$.ProtectedObject.nestedClassNameToClassDictionary_private_[newClass.nestedClassName] != undefined)
            {
                $$SHORTCODE$$.logError(arguments, "duplicate nested class name " + newClass.nestedClassName + " for " + newClass);
            }
            else
            {
                $$SHORTCODE$$.ProtectedObject.nestedClassNameToClassDictionary_private_[newClass.nestedClassName] = newClass;
            }
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.ProtectedObject.prototype.getAttrib = function getAttrib(attrib) {

    var value = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            value = this.getAttrib_protected_(attrib);
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);          
        }
    }   
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif    
    return value;
}

$$SHORTCODE$$.ProtectedObject.prototype.getAttrib_protected_ = function getAttrib_protected_(attrib) { // Override

    var value = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            var suffix = this.getSuffix_private_(attrib);           
            value = this[attrib + suffix];
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);           
        }
    }   
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif    
    return value;
}

$$SHORTCODE$$.ProtectedObject.prototype.getClass = function getClass() {

    var retVal = null;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            retVal = this.constructor;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.prototype.getClassName = function getClassName() {

    var retVal = "";
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            retVal = this.className_private_;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.getClassByNestedClassName = function getClassByNestedClassName(nestedClassName) { // Static

    var retVal = null;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif
    
    do
    {
        try
        {
            retVal = $$SHORTCODE$$.ProtectedObject.nestedClassNameToClassDictionary_private_[nestedClassName];
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.getClassByUniqueClassName = function getClassByUniqueClassName(uniqueClassName) { // Static

    var retVal = null;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            retVal = $$SHORTCODE$$.ProtectedObject.uniqueClassNameToClassDictionary_private_[uniqueClassName];
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.getClassesByName = function getClassesByName(className) { // Static

    var retVal = [];
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif
    
    do
    {
        try
        {
            var namedClasses = $$SHORTCODE$$.ProtectedObject.classNameToClassDictionary_private_[className];
            if (namedClasses == undefined)
            {
                break;
            }

            retVal = namedClasses;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.prototype.getNestedClassName = function getNestedClassName() {

    var retVal = "";
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif
    
    do
    {
        try
        {
            var cls = this.getClass();
            if (! (cls instanceof Class))
            {
                $$SHORTCODE$$.logError(arguments, "need class");
                break;
            }

            retVal = cls.nestedClassName;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.prototype.getSuffix_private_ = function getSuffix_private_(searchAttrib) {
    
    var suffix = "";
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            do
            {
                suffix = this.constructor.prototype[searchAttrib + "_suffix"];
                if (suffix != undefined)
                {
                    break;
                }
                
                var needsGetter = false;
                var needsSetter = false;
                var needsInternal = false;
                
                var searchAttribGetterSetter = searchAttrib + $$SHORTCODE$$.ProtectedObject.kAttribSuffix_GetterAndSetter;
                var searchAttribGetter = searchAttrib + $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Getter;
                var searchAttribSetter = searchAttrib + $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Setter;
                var searchAttribInternal = searchAttrib + $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Internal;
                                
                if (searchAttribGetterSetter in this)
                {
                    needsGetter = true;
                    needsSetter = true;
                }
            
                if (searchAttribGetter in this)
                {
                    needsGetter = true;
                }
            
                if (searchAttribSetter in this)
                {
                    needsSetter = true;
                }
            
                if (searchAttribInternal in this)
                {
                    needsInternal = true;
                }

                if (this.constructor.emptyObject != undefined)
                {
                    if (searchAttribGetterSetter in this.constructor.emptyObject)
                    {
                        needsGetter = true;
                        needsSetter = true;
                    }
                
                    if (searchAttribGetter in this.constructor.emptyObject)
                    {
                        needsGetter = true;
                    }
                
                    if (searchAttribSetter in this.constructor.emptyObject)
                    {
                        needsSetter = true;
                    }
                
                    if (searchAttribInternal in this.constructor.emptyObject)
                    {
                        needsInternal = true;
                    }
                }
                
                if (needsGetter && needsSetter)
                {
                    suffix = $$SHORTCODE$$.ProtectedObject.kAttribSuffix_GetterAndSetter;
                }
                else if (needsGetter)
                {
                    suffix = $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Getter;
                }
                else if (needsSetter)
                {
                    suffix = $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Setter;
                }
                else if (needsInternal)
                {
                    suffix = $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Internal;
                }
                else
                {
                    suffix = "";
                }
            }
            while (false);
            
            this.constructor.prototype[searchAttrib + "_suffix"] = suffix;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);         
        }
    }   
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return suffix;
}

$$SHORTCODE$$.ProtectedObject.prototype.getterSetterGenerate_protected_ = function getterSetterGenerate_protected_()
{
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            var className = this.className_private_;
            for (var attrib in this)
            {
                var needsGetter = false;
                var needsSetter = false;
                var suffix;
                do
                {
                    suffix = $$SHORTCODE$$.ProtectedObject.kAttribSuffix_GetterAndSetter;
                    if ($$SHORTCODE$$.endsWith(attrib, suffix))
                    {
                        needsGetter = true;
                        needsSetter = true;
                        break;
                    }
                
                    suffix = $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Getter;
                    if ($$SHORTCODE$$.endsWith(attrib, suffix))
                    {
                        needsGetter = true;
                        break;
                    }
                
                    suffix = $$SHORTCODE$$.ProtectedObject.kAttribSuffix_Setter;
                    if ($$SHORTCODE$$.endsWith(attrib, suffix))
                    {
                        needsSetter = true;
                        break;
                    }
                }
                while (false);
                

                if (needsGetter || needsSetter)
                {                   
                    var attribName = attrib.substr(0,attrib.length - suffix.length);
                
                    var attribName = attribName.charAt(0).toUpperCase() + attribName.substr(1);
                    var setterAndGetterCode = "";
                    if (needsSetter)
                    {
                        setterAndGetterCode += 
                            "if ($$SHORTCODE$$." + className + ".prototype.set" + attribName + " == undefined) {" +
                            "$$SHORTCODE$$." + className + ".prototype.set" + attribName + " = function(value) { this." + attrib + " = value; };" +
                            "}";
                    }
                    if (needsGetter)
                    {
                        setterAndGetterCode += 
                            "if ($$SHORTCODE$$." + className + ".prototype.get" + attribName + " == undefined) {" +
                            "$$SHORTCODE$$." + className + ".prototype.get" + attribName + " = function() { return this." + attrib + "; };" +
                            "}";
                    }
                    eval(setterAndGetterCode);
                }
            }
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);            
        }
    }   
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.ProtectedObject.isRelatedClass = function(class1, class2) {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            retVal = $$SHORTCODE$$.ProtectedObject.isSubClassOf(class1, class2) || $$SHORTCODE$$.ProtectedObject.isSubClassOf(class2, class1);
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.isSubClassOf = function(parentClass, subClass) {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            if (! (parentClass instanceof Class))
            {
                $$SHORTCODE$$.logError(arguments, "needs parentClass");
                break;
            }

            if (! (subClass instanceof Class))
            {
                $$SHORTCODE$$.logError(arguments, "needs subClass");
                break;
            }

            if (subClass == parentClass)
            {
                retVal = true;
                break;
            }

            if (! (subClass.prototype instanceof parentClass))
            {
                break;
            }

            retVal = true;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.ProtectedObject.prototype.setAttrib = function(attrib, value) {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            this.setAttrib_protected_(attrib, value);
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);          
        }
    }   
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.ProtectedObject.prototype.setAttrib_protected_ = function(attrib, value) { // Override
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do
    {
        try
        {
            var suffix = this.getSuffix_private_(attrib);           
            this[attrib + suffix] = value;
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);           
        }
    }   
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.ProtectedObject.prototype.toString = function() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var retVal = null;
    do
    {
        try
        {
            retVal = this.className_private_;

            var id = this.getId();
            if (id == undefined)
            {
                retVal += " (prototype)";
            }
            else
            {
                retVal += " " + id;
            }
        }
        catch (err)
        {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})(); // Wrapper


