import { get } from 'utils/request';

export default class CategoryService {
  async getCategory(params){
    const res = await get(`/api/category`, params);
    return res;
  }
}