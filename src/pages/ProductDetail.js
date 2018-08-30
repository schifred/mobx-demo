import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

@inject('product', 'category')
@observer
export default class ProductDetail extends Component {
  componentDidMount(){
    const { product, category, form, match: { params: { id } } } = this.props;
    Promise.all([
      category.getCategory({ level: 1 }),
      product.getProduct(id)
    ]).then(([categories, productInfo]) => {
      const { cids } = productInfo;
      Promise.all([
        category.getCategory({ level: cids.length }),
        this.loadAttributes(cids[cids.length - 1])
      ]).then(res => {
        product.set(productInfo);
      })
    })
  }

  // 通过 cid 加载商品属性，用于显示商品属性表单项
  async loadAttributes(cid){
    const { product } = this.props;
    if ( cid ) return await product.getAttributes(cid);
  }

  render(){
    const { product } = this.props;
    console.log(product)
    return (
      <div>
        <span>商品名称：</span>
      </div>
    )
  }
}