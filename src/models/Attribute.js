import { observable, action, computed, transaction } from "mobx";
import AttributeService from 'services/attribute';

let cache = [];

export default class Attribute extends AttributeService {
  @observable attributes = [];

  @action
  setAttrValues(attrValues){
    this.attrValues = attrValues;
  }

  @action
  async getAttributes(params){
    const res = await super.getAttributes(params);
    if ( res && res.code == 200 && res.data ){
      this.attributes = res.data;
      return res.data;
    };
    
    return null;
  }
}
