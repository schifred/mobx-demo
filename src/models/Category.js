import { observable, action, computed, transaction } from "mobx";
import CategoryService from 'services/category';

export default class Category extends CategoryService {
  @observable categories = [];

  async getCategory(params){
    const res = await super.getCategory(params);
    if ( res ){
      // 将多次数据变更合成一个事务，减少重绘的次数
      transaction(() => {
        res.map(item => {
          this.insertToCategories(item);
        });
      });
    };

    return res;
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
