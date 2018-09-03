import { get } from 'utils/request';

export default class CategoryService {
  async getCategory(params){
    const res = await get(`/api/category`, params);
    return res;
  }

  // 在 service 层将 getCategory 拆分成多个针对请求的微处理接口
  async getCategoryByLevel(level){
    const res = await this.getCategory({ level });
    return res;
  }

  async getCategoryByCid(cid){
    const res = await this.getCategory({ cid });
    return res;
  }
}