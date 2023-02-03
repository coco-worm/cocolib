
const CALL_SUPER_DESTROY_REG_DEV = /\b\._super\b|destroy\s*\.\s*call\s*\(\s*\w+\s*[,|)]/;
const CACHE_KEY = '__ccclassCache__';

function checkCtorArgument (decorate) {
    return function (target) {
        if (typeof target === 'function') {
            // no parameter, target is ctor
            return decorate(target);
        }
        return function (ctor) {
            return decorate(ctor, target);
        };
    };
}

function getBaseClassWherePropertyDefined_DEV (propName:string, cls:any) {
    if (CC_DEV) {
        var res;
        for (; cls && cls.__props__ && cls.__props__.indexOf(propName) !== -1; cls = cls.$super) {
            res = cls;
        }
        if (!res) {
            cc.error('unknown error');
        }
        return res;
    }
}

function doValidateMethodWithProps_DEV (func:string, funcName:string, className:string, cls:any, base:any) {
    if (cls.__props__ && cls.__props__.indexOf(funcName) >= 0) {
        // find class that defines this method as a property
        var baseClassName = cc.js.getClassName(getBaseClassWherePropertyDefined_DEV(funcName, cls));
        cc.error(3648, className, funcName, baseClassName);
        return false;
    }
    if (funcName === 'destroy' &&
        cc.js.isChildClassOf(base, cc.Component) &&
        !CALL_SUPER_DESTROY_REG_DEV.test(func)
    ) {
        cc.error(`Overwriting '${funcName}' function in '${className}' class without calling super is not allowed. Call the super function in '${funcName}' please.`);
    }
};

// 
function createEditorDecorator (argCheckFunc, editorPropName, staticValue) {
    return argCheckFunc(function (ctor, decoratedValue) {
        var cache = getClassCache(ctor, editorPropName);
        if (cache) {
            var value = (staticValue !== undefined) ? staticValue : decoratedValue;
            var proto = getSubDict(cache, 'proto');
            getSubDict(proto, 'editor')[editorPropName] = value;
        }
    }, editorPropName);
}

function createDummyDecorator (argCheckFunc) {
    return argCheckFunc(fNOP);
}

function getClassCache (ctor, decoratorName?: string) {
    if (CC_DEV && cc.Class['_isCCClass'](ctor)) {
        cc.error('`@%s` should be used after @ccclass for class "%s"', decoratorName, cc.js.getClassName(ctor));
        return null;
    }
    return getSubDict(ctor, CACHE_KEY);
}

function getSubDict (obj, key) {
    return obj[key] || (obj[key] = {});
}

function fNOP (ctor) {
    return ctor;
}

// 

// function property (ctorProtoOrOptions, propName, desc) {
//     var options = null;
//     function normalized (ctorProto, propName, desc) {
//         var cache = getClassCache(ctorProto.constructor);
//         if (cache) {
//             var ccclassProto = getSubDict(cache, 'proto');
//             var properties = getSubDict(ccclassProto, 'properties');
//             genProperty(ctorProto.constructor, properties, propName, options, desc, cache);
//         }
//     }
//     if (typeof propName === 'undefined') {
//         options = ctorProtoOrOptions;
//         return normalized;
//     }
//     else {
//         normalized(ctorProtoOrOptions, propName, desc);
//     }
// }

// function getFullFormOfProperty (options, isES6Getset) {
//     var isLiteral = options && options.constructor === Object;
//     if (isLiteral) {
//         return null;
//     }
//     if (Array.isArray(options) && options.length > 0) {
//         return _wrapOptions(isES6Getset, [], options);
//     }
//     else if (typeof options === 'function') {
//         return _wrapOptions(isES6Getset, js.isChildClassOf(options, cc.ValueType) ? new options() : null, options);
//     }
//     else if (options instanceof Attrs.PrimitiveType) {
//         return _wrapOptions(isES6Getset, options.default);
//     }
//     else {
//         return _wrapOptions(isES6Getset, options);
//     }
// }

// function _wrapOptions (isES6Getset, _default, type) {
//     let res:any = isES6Getset ? { _short: true } : { _short: true, default: _default };
//     if (type) {
//         res.type = type;
//     }
//     return res;
// }

// function genProperty (ctor, properties, propName, options, desc, cache) {
//     var fullOptions;
//     var isGetset = desc && (desc.get || desc.set);
//     if (options) {
//         fullOptions = Preprocess.getFullFormOfProperty(options, isGetset);
//     }
//     var existsProperty = properties[propName];
//     var prop = cc.js.mixin(existsProperty || {}, fullOptions || options || {});

//     if (isGetset) {
//         // typescript or babel
//         if (CC_DEV && options && ((fullOptions || options).get || (fullOptions || options).set)) {
//             var errorProps = getSubDict(cache, 'errorProps');
//             if (!errorProps[propName]) {
//                 errorProps[propName] = true;
//                 cc.warn(3655, propName, cc.js.getClassName(ctor), propName, propName);
//             }
//         }
//         if (desc.get) {
//             prop.get = desc.get;
//         }
//         if (desc.set) {
//             prop.set = desc.set;
//         }
//     }
//     else {
//         if (CC_DEV && (prop.get || prop.set)) {
//             // @property({
//             //     get () { ... },
//             //     set (...) { ... },
//             // })
//             // value;
//             cc.error(3655, propName, cc.js.getClassName(ctor), propName, propName);
//             return;
//         }
//         // member variables
//         var defaultValue = undefined;
//         var isDefaultValueSpecified = false;
//         if (desc) {
//             // babel
//             if (desc.initializer) {
//                 // @property(...)
//                 // value = null;
//                 defaultValue = getDefaultFromInitializer(desc.initializer);
//                 isDefaultValueSpecified = true;
//             }
//             else {
//                 // @property(...)
//                 // value;
//             }
//         }
//         else {
//             // typescript
//             var actualDefaultValues = cache.default || (cache.default = extractActualDefaultValues(ctor));
//             if (actualDefaultValues.hasOwnProperty(propName)) {
//                 // @property(...)
//                 // value = null;
//                 defaultValue = actualDefaultValues[propName];
//                 isDefaultValueSpecified = true;
//             }
//             else {
//                 // @property(...)
//                 // value;
//             }
//         }

//         if ((CC_EDITOR && !Editor.isBuilder) || CC_TEST) {
//             if (!fullOptions && options && options.hasOwnProperty('default')) {
//                 cc.warn(3653, propName, cc.js.getClassName(ctor));
//                 // prop.default = options.default;
//             }
//             else if (!isDefaultValueSpecified) {
//                 cc.warn(3654, cc.js.getClassName(ctor), propName);
//                 // prop.default = fullOptions.hasOwnProperty('default') ? fullOptions.default : undefined;
//             }
//         }
//         prop.default = defaultValue;
//     }
//     properties[propName] = prop;
// }

export namespace gamify {
    
    export const activity = (function(){
        return function (klass:any, propertyKey: string, descriptor: PropertyDescriptor) {     
            
            cc.js.set(descriptor.value.prototype, '_isActivity_', ()=>true)
            // const dest:any = cc.js.getPropertyDescriptor(klass, propertyKey);
            // const ctor:any = klass.constructor;            
            // cc.log('Class:: ' + cc.js.getClassName(klass) + ' -function: ' + propertyKey + ' -dest: ' + JSON.stringify(descriptor) + ' -properties: ' + JSON.stringify(klass.properties))
        };
    })()
    
    export const Gamify = checkCtorArgument(function (ctor:any, name:string) {
        // if (FIX_BABEL6) {
        //     eval('if(typeof _classCallCheck==="function"){_classCallCheck=function(){};}');
        // }
        var base = cc.js.getSuper(ctor);
        if (base === Object) {
            base = null;
        }
    
        var proto = {
            name,
            extends: base,
            ctor,
            __ES6__: true,
        };
        var cache = ctor[CACHE_KEY];
        if (cache) {
            var decoratedProto = cache.proto;
            if (decoratedProto) {
                // decoratedProto.properties = createProperties(ctor, decoratedProto.properties);
                cc.js.mixin(proto, decoratedProto);
            }
            ctor[CACHE_KEY] = undefined;
        }
    
        var res = cc.Class(proto);
    
        // validate methods
        if (CC_DEV) {
            var propNames = Object.getOwnPropertyNames(ctor.prototype);
            for (var i = 0; i < propNames.length; ++i) {
                var prop = propNames[i];
                if (prop !== 'constructor') {
                    var desc = Object.getOwnPropertyDescriptor(ctor.prototype, prop);
                    var func = desc && desc.value;
                    if (typeof func === 'function') {
                        doValidateMethodWithProps_DEV(func, prop, cc.js.getClassName(ctor), ctor, base);
                    }
                }
            }
        }
    
        return res;
    });
}