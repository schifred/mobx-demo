import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import CategoryText from './components/CategoryText';
import { Table, Button } from 'antd';
import $i18n from "utils/$i18n";

@inject('products')
@observer
export default class ProductList extends Component {
  columns = [{
    title: $i18n('model.product.id'),
    dataIndex: 'id',
    key: 'id'
  }, {
    title: $i18n('model.product.name'),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: $i18n('model.product.categories'),
    dataIndex: 'categories',
    key: 'categories',
    render: (categories, product) => {
      return <CategoryText product={product}/>
    }
  }, {
    title: $i18n('model.product.price'),
    dataIndex: 'price',
    key: 'price'
  }, {
    title: $i18n('model.product.num'),
    dataIndex: 'num',
    key: 'num'
  }, {
    title: $i18n('model.product.status'),
    dataIndex: 'statusText',
    key: 'statusText'
  }, {
    title: $i18n('model.product.desc'),
    dataIndex: 'desc',
    key: 'desc'
  }, {
    title: $i18n('handler.handle'),
    key: 'action',
    render: (text, product) => (
      <span>
        <Link to={`/detail/${product.id}`} style={{marginRight: '10px'}}>{$i18n('handler.detail')}</Link>
        <Link to={`/edit/${product.id}`} style={{marginRight: '10px'}}>{$i18n('handler.edit')}</Link>
        <a href="javascript:;" onClick={() => { product.deleteProduct() }}>{$i18n('handler.delete')}</a>
      </span>
    ),
  }];

  componentWillMount(){
    this.props.products.getProducts();
  }

  render(){
    const { products } = this.props.products;

    return (
      <div>
        <Button style={{marginBottom: '15px'}} type='primary'>
          <Link to={'/create'}>创建商品</Link>
        </Button>
        <Table size="small" rowKey='id' columns={this.columns} dataSource={products.toJS()} />
      </div>
    );
  }
};
