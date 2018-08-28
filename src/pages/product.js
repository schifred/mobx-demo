import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Form, Input, Cascader, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

@inject('category')
@observer
class CategoryCascader extends Component{
  componentDidMount(){
    const { category } = this.props;
    category.getCategory({ level: 1 });
  }

  loadData = (selectedOptions) => {
    const { category } = this.props;
    category.getCategory({ level: selectedOptions.length + 1 });
  }

  render(){
    const { category, ...rest } = this.props;
    return <Cascader {...rest} loadData={this.loadData} changeOnSelect 
      options={category.categoriesTree} />;
  }
};

@inject('product', 'category')
@observer
class ProductForm extends Component {
  componentDidMount(){
    const { product } = this.props;
    product.getProduct();
    // form.setFieldsValue(dataSource.get());
  }

  handleCategoryChange = value => {
    const { product } = this.props;
    const len = value.length;
    if ( len == 2 ) product.getAttributes(value[len - 1]);
  }

  render(){
    const { product, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form>
        <FormItem {...formItemLayout} label="商品名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入商品名称！' }],
          })(
            <Input placeholder="请输入商品名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="商品分类">
          {getFieldDecorator('classify', {
            rules: [{ required: true, message: '请选择商品分类！' }],
          })(
            <CategoryCascader placeholder="请选择商品分类" onChange={this.handleCategoryChange} />
          )}
        </FormItem>

        {
          product.attrs.attributes.map(attr => {
            return (
              <FormItem {...formItemLayout} label={attr.name} key={attr.id}>
                {getFieldDecorator(`attrs.${attr.id}`, {
                  rules: [{ required: true, message: `请选择${attr.name}！` }],
                })(
                  <Select mode="multiple" placeholder={`请选择${attr.name}！`}>
                    {
                      attr.values.map(item => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            )
          })
        }

        <FormItem {...formItemLayout} label="商品单价">
          {getFieldDecorator('price', {
            rules: [{ required: true, message: '请输入商品单价！' }],
          })(
            <Input placeholder="请输入商品单价" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="商品数量">
          {getFieldDecorator('num', {
            rules: [{ required: true, message: '请输入商品数量！' }],
          })(
            <Input placeholder="请输入商品数量" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="商品描述">
          {getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入商品描述！' }],
          })(
            <Input type='textarea' placeholder="请输入商品描述" />
          )}
        </FormItem>
      </Form>
    );
  }
};

export default Form.create()(ProductForm)