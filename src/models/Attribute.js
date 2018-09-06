import { observable, action, computed, transaction } from "mobx";
import AttributeService from 'services/attribute';

export default class Attribute extends AttributeService {
  @observable attributes = [];

  @action
  setAttrValues(attrValues){
    this.attrValues = attrValues;
  }

  @action
  async getAttributes(params){
    const res = await super.getAttributes(params);
    if ( res ){
      this.attributes = res;
    };
    
    return res;
  }
}
