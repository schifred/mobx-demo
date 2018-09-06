import { observable, action, computed } from "mobx";
import Product from 'models/Product';

// 直接与页面交互的 model
class ProductEdit {
  @observable product = new Product();
  
  @action
  async getProduct(){
    this.product = {};
    const res = await Product.get();
    if ( res ) this.product = new Product(res);

    return res;
  }
  
  @computed
  get values(){
    const { name, cids, attrValues, num, price, desc } = this.product;

    let attrs = {};
    Object.keys(attrValues).map(attrId => {
      attrs[`attrId${attrId}`] = attrValues[attrId];
    });

    return {
      name,
      cids,
      attrs,
      num,
      price,
      desc
    };
  }
};

export default new ProductEdit();