export function mixin(MixinCls){
  const mixinPrototype = MixinCls.prototype;
  let mixinProperties = Object.getOwnPropertyNames(mixinPrototype);
  mixinProperties = mixinProperties.filter(key => {
    return key !== 'constructor';
  });

  return function (Cls){
    const prototype = Cls.prototype;

    mixinProperties.map(propertyName => {
      if ( !prototype[propertyName] ) 
        addHiddenProp(prototype, propertyName, mixinPrototype[propertyName]);
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