import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Table, Modal } from 'antd';
import ProductForm from './ProductForm';

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
  state = {
    visible: false,
    product: null
  }

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
        <a href="javascript:;" 
          onClick={() => { this.showModel(product) }} style={{marginRight: '10px'}}>配置</a>
        <a href="javascript:;" onClick={() => { product.deleteProduct() }}>删除</a>
      </span>
    ),
  }];

  componentWillMount(){
    this.props.products.getProducts();
  }

  showModel = product => {
    this.setState({
      visible: true,
      product
    });
  }

  saveProduct = () => {
    const { product } = this.state;
    this.form.validateFields(async (errs, values) => {
      if ( errs ) return;

      product.set(values);
      const res = await product.saveProduct();
      this.hideModel();
    });
  }

  hideModel = () => {
    this.setState({
      visible: false,
      product: null
    });
  }

  render(){
    const { products } = this.props.products;
    const { visible, product } = this.state;

    return (
      <div>
        <Table size="small" rowKey='id' columns={this.columns} dataSource={products.toJS()} />
        <Modal title="配置商品" visible={visible} onOk={this.saveProduct} onCancel={this.hideModel}>
          <ProductForm ref={c => { if ( c ) this.form = c }} dataSource={product} />
        </Modal>
      </div>
    );
  }
};
