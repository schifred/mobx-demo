export function mixin(ClsWillMixin){
  const protoWillMixin = ClsWillMixin.prototype;
  const protoKeys = Object.getOwnPropertyNames(protoWillMixin);
  const mixinKeys = protoKeys.filter(key => {
    return key !== 'constructor';
  });

  return function (Cls){
    const prototype = Cls.prototype;

    mixinKeys.map(key => {
      if ( !prototype[key] ) 
        addHiddenProp(prototype, key, protoWillMixin[key]);
    });

    return Cls;
  };
}

function addHiddenProp(object, propName, value) {
  Object.defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value
  })
}