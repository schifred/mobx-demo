import { observable, action } from "mobx";
import Product from 'models/Product';

class Products {
  @observable products = [];
  
  @action
  async getProducts(){
    this.products = [];
    const res = await Product.getProducts();
    (res || []).map(item => {
      this.products.push(new Product(item));
    });

    return res;
  }
};

export default new Products();