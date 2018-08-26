import { observable, action } from "mobx";
import CategoryService from 'services/category';

export default class Category extends CategoryService {
  @action
  async getCategory(params){
    const res = await super.getCategory(params);
    const { data } = res || {};
    return res;
  }
}
