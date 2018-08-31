import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Collapse, Button } from 'antd';
import CategoryText from './components/CategoryText';

const { Panel } = Collapse;

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
    
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header={`商品详情 id:${product.id}`} key="1">
          <div>商品名称：{product.name}</div>
          <div>商品分类：<CategoryText product={product} /></div>
          <div>商品属性：<CategoryText product={product} /></div>
          <div>商品单价：{product.price}</div>
          <div>商品数量：{product.num}</div>
          <div>商品描述：{product.desc}</div>

          <div>
            <Button style={{marginTop: '10px'}} type='primary'>
              <Link to='/products'>返回列表</Link>
            </Button>
            <Button style={{marginTop: '10px', marginLeft: '10px'}}>
              <Link to={`/edit/${product.id}`}>编辑</Link>
            </Button>
          </div>
        </Panel>
      </Collapse>
    )
  }
}