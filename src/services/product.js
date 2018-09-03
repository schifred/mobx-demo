import { get, post, del } from 'utils/request';

export default class ProductService {
  async getProduct(params){
    const res = await get('/api/product', params);
    return res;
  }

  async getProducts(params){
    const res = await get('/api/products1111', params);
    return res;
  }

  async saveProduct(params){
    const res = await post('/api/product', params);
    return res;
  }

  async updateProduct(params){
    const res = await post('/api/product', params);
    return res;
  }

  async deleteProduct(params){
    const res = await del('/api/product', params);
    return res;
  }
}