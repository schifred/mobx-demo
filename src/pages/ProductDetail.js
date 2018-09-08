import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Collapse, Button } from 'antd';
import CategoryText from './components/CategoryText';
import $i18n from "utils/$i18n";

const { Panel } = Collapse;

@inject('productDetail', 'category')
@observer
export default class ProductDetail extends Component {
  componentDidMount(){
    const { productDetail: product, category, match: { params: { id } } } = this.props;
    product.getProduct(id).then(res => {
      if ( !res ) return;
      product.getCategories();
      product.getAttributes();
    });
    // Promise.all([
    //   category.getCategory({ level: 1 }),
    //   product.getProduct(id)
    // ]).then(([categories, productInfo]) => {
    //   const { cids } = productInfo;
    //   Promise.all([
    //     category.getCategory({ level: cids.length }),
    //     this.loadAttributes(cids[cids.length - 1])
    //   ]).then(res => {
    //     product.setValues(productInfo);
    //   })
    // })
  }

  render(){
    const { productDetail: product } = this.props;

    console.log(product.attributes.toJS())
    
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header={`${$i18n('text.product')}${$i18n('text.detail')} id:${product.id}`} key="1">
          <div>{$i18n('model.product.name')}：{product.name}</div>
          <div>{$i18n('model.product.categories')}：<CategoryText product={product} /></div>
          <div>{$i18n('model.product.attrs')}：<CategoryText product={product} /></div>
          <div>{$i18n('model.product.price')}：{product.price}</div>
          <div>{$i18n('model.product.num')}：{product.num}</div>
          <div>{$i18n('model.product.desc')}：{product.desc}</div>

          <div>
            <Button style={{marginTop: '10px'}} type='primary'>
              <Link to='/products'>{$i18n('action.return')}{$i18n('text.list')}</Link>
            </Button>
            <Button style={{marginTop: '10px', marginLeft: '10px'}}>
              <Link to={`/edit/${product.id}`}>{$i18n('action.edit')}</Link>
            </Button>
          </div>
        </Panel>
      </Collapse>
    )
  }
}