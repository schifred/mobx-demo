import $i18n from './$i18n';

// 将类 MixinCls 中的原型方法注入到 Cls 类中
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
};

// 将实例属性的文案灌入为模型的静态 labels 属性
export function mixinLocale(prefix){
  return function (Cls){
    const prototype = Cls.prototype;
    let properties = Object.keys(prototype);

    let labels = {};
    properties.map(propertyName => {
      addEnumerableProp(labels, propertyName, () => {
        return $i18n(`${prefix}.${propertyName}`);
      });
    });
    Cls.labels = labels;

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
};

function addEnumerableProp(object, propName, get) {
  Object.defineProperty(object, propName, {
    enumerable: true,
    configurable: true,
    get
  })
};