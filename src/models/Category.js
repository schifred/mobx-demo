import { observable, action, computed, transaction } from "mobx";
import CategoryService from 'services/category';

let cache = [];
let loadByLevelFlags = {};

export default class Category extends CategoryService {
  @observable categories = [];

  async getCategory(params){
    const { cid, level } = params;

    let res = null;
    if ( level !== undefined ) res = this.getCategoryByLevel(level);
    else if ( cid !== undefined ) res = this.getCategoryByCid(cid);
    return res;
  }

  async getCategoryByLevel(level){
    if ( loadByLevelFlags[level] ){
      cache.map(this.insertToCategories);
      return this.categories;
    } else {
      const res = await super.getCategory({ level });
      if ( res && res.code === 200 && res.data ){
        loadByLevelFlags[level] = true;

        // 将多次数据变更合成一个事务，减少重绘的次数
        transaction(() => {
          res.data.map(item => {
            if ( !cache.some(it => it.id === item.id) )
              cache.push(item);
  
            this.insertToCategories(item);
          });
        });

        return res.data;
      };

      return null;
    };
  }

  @action
  async getCategoryByCid(cid){
    let cachedItem = cache.filter(item => item.id == cid)[0];
    if ( cachedItem ){
      this.insertToCategories(cachedItem);
      return this.categories;
    } else {
      const res = await super.getCategory({ cid });
      if ( res && res.code === 200 && res.data ){
        // 将多次数据变更合成一个事务，减少重绘的次数
        transaction(() => {
          res.data.map(item => {
            if ( !cache.some(it => it.id === item.id) )
              cache.push(item);

            this.insertToCategories(item);
          });
        });

        return res.data;
      };

      return null;
    };
  }

  @action
  insertToCategories = (category) => {
    if ( !this.categories.some(item => item.id == category.id) ){
      this.categories.push(category);
    };
  }

  @computed
  get categoriesTree(){
    let tree = [];
    this.categories.toJS().sort((a, b) => a.level - b.level).filter(item => {
      if ( item.level == 1 ){
        tree.push({
          value: item.id,
          label: item.name,
          isLeaf: false
        });
      } else if ( item.level == 2 ){
        let parent = tree.filter(it => it.value == item.parentId)[0];
        if ( !parent.children ) parent.children = [];
        parent.children.push({
          value: item.id,
          label: item.name
        });
      };
    });

    return tree;
  }
}
