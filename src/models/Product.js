import { observable, action, computed } from "mobx";
import ProductService from 'services/product';
import CategoryService from 'services/category';
import { mixin } from 'utils/decorator';

const StatusList = [{
  text: '下架', value: 'offline'
}, {
  text: '上架', value: 'online'
}]

@mixin(CategoryService)
export default class Product extends ProductService {
  static StatusList = StatusList;

  @observable id;// 商品 id
  @observable name;// 商品名称
  @observable cids;// 商品分类
  @observable attrs = [];// 商品属性
  @observable num;// 库存
  @observable price;// 价格
  @observable pic_url;// 图片
  @observable desc;// 描述
  @observable status;// 状态

  constructor(props){
    super(props);
    this.set(props);
  }

  set(data){
    if ( arguments.length > 1 ){
      let name = arguments[0];
      let value = arguments[1];

      if ( typeof name === 'string' ) this[name] = value;
    } else if ( typeof data === 'object' ){
      this.id = data.id;
      this.name = data.name;
      this.cids = data.cids;
      this.attrs = data.attrs;
      this.num = data.num;
      this.price = data.price;
      this.pic_url = data.pic_url;
      this.desc = data.desc;
      this.status = data.status;
    };
  }

  reset(){
    this.set({});
  }

  get(){
    return {
      id: this.id,
      name: this.name,
      cids: this.cids,
      attrs: this.attrs,
      num: this.num,
      price: this.price,
      pic_url: this.pic_url,
      desc: this.desc,
      status: this.status
    };
  }

  // 获取商品分类文案
  @computed
  get categoryTexts(){
    let text = '';
    // ClassifyList.some(item => {
    //   if ( item.value === this.classify ){
    //     text = item.text;
    //     return true;
    //   };
    // });

    return text;
  }
  
  @action
  async getProduct(){
    this.reset();
    const res = await super.getProduct({ id: this.id });
    const { data } = res || {};
    if ( data ) this.set(data);
    return res;
  }
  
  @action
  async saveProduct(){
    const params = this.get();
    const res = await super.saveProduct(params);
    return res;
  }
  
  @action
  async updateProduct(){
    const params = this.get();
    const res = await super.updateProduct(params);
    return res;
  }
  
  @action
  async deleteProduct(){
    const res = await super.deleteProduct({ id: this.id });
    const { data } = res || {};
    if ( data ) this.reset();
    return res;
  }
}
