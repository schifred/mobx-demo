import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Table } from 'antd';

// 远程获取的数组项数据需要重新设置观察者，以驱动视图更新
@observer
class CategoryText extends Component{
  componentWillMount(){
    const { product } = this.props;
    product.getCategories();
  }

  render(){
    const { product } = this.props;
    return product.categoryTexts;
  }
};

@inject('products')
@observer
export default class ProductList extends Component {
  columns = [{
    title: '商品id',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '分类',
    dataIndex: 'categories',
    key: 'categories',
    render: (categories, product) => {
      return <CategoryText product={product}/>
    }
  }, {
    title: '价格',
    dataIndex: 'price',
    key: 'price'
  }, {
    title: '数量',
    dataIndex: 'num',
    key: 'num'
  }, {
    title: '状态',
    dataIndex: 'statusText',
    key: 'statusText'
  }, {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc'
  }, {
    title: '操作',
    key: 'action',
    render: (text, product) => (
      <span>
        <a href="javascript:;" style={{marginRight: '10px'}}>详情</a>
        <Link to={`edit/${product.id}`} style={{marginRight: '10px'}}>编辑</Link>
        <a href="javascript:;" onClick={() => { product.deleteProduct() }}>删除</a>
      </span>
    ),
  }];

  componentWillMount(){
    this.props.products.getProducts();
  }

  render(){
    const { products } = this.props.products;

    return <Table size="small" rowKey='id' columns={this.columns} dataSource={products.toJS()} />;
  }
};
