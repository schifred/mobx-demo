import { observable, action, computed, transaction } from "mobx";
import ProductService from 'services/product';
import Product from './Product';

export default class Products extends ProductService {
  @observable products = [];
  
  @action
  async getProducts(){
    this.products = [];
    const res = await super.getProducts({ id: this.id });
    const { data } = res || {};
    if ( data ){
      data.map(item => {
        this.products.push(new Product(item));
      });
    };

    return res;
  }
};