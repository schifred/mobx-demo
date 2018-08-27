import { observable, action } from "mobx";
import CategoryService from 'services/category';

let cache = {};

export default class Category extends CategoryService {
  @action
  async getCategory(params){
    const { cid } = params;
    if ( !!cache[cid] ) return [cache[cid]];

    const res = await super.getCategory(params);
    if ( res && res.code === 200 && res.data ){
      res.data.map(item => {
        const { id } = item;
        if ( !cache[id] ) cache[id] = item;
      });

      return res.data;
    } else {
      return null;
    };
  }
}
