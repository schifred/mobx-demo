import React, { Component } from "react";
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class ProductForm extends Component {
  componentDidMount(){
    const { dataSource, form } = this.props;
    form.setFieldsValue(dataSource.get());
  }

  // 针对 Form 实例始终存在的问题
  componentWillReceiveProps(nextProps){
    const { dataSource, form } = this.props;
    const { dataSource: nextDataSource } = nextProps;
    if ( dataSource !== nextDataSource && nextDataSource ) form.setFieldsValue(nextDataSource.get());
  }

  render(){
    const { dataSource, form } = this.props;
    const { getFieldDecorator } = form;
    const { constructor: { ClassifyList = [] } } = dataSource || {};

    return (
      <Form>
        <FormItem label="商品名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入商品名称！' }],
          })(
            <Input placeholder="请输入商品名称" />
          )}
        </FormItem>
        <FormItem label="商品分类">
          {getFieldDecorator('classify', {
            rules: [{ required: true, message: '请选择商品分类！' }],
          })(
            <Select placeholder="请选择商品分类">
              {
                ClassifyList.map(item => <Option value={item.value} key={item.value}>{item.text}</Option>)
              }
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
};

export default Form.create()(ProductForm)