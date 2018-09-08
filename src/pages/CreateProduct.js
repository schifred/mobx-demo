import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Collapse, Form, Input, Cascader, Select, Button } from 'antd';

const { Panel } = Collapse;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 8 } };
const tailFormItemLayout = { wrapperCol: { span: 8, offset: 4 } };

@inject('category')
@observer
class CategoryCascader extends Component{
  // componentDidMount(){
  //   const { category, value } = this.props;
  //   category.getCategory({ level: 1 });
  // }

  // componentWillReceiveProps(nextProps){
  //   const { value } = this.props;
  //   const { value: nextValue, category } = nextProps;
  //   if ( value !== nextValue ) 
  //     category.getCategory({ level: nextValue.length });
  // }

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

@inject('productEdit', 'category')
@observer
class CreateProduct extends Component {
  componentWillMount(){
    const { productEdit: product, match: { params: { id } } } = this.props;
    product.setId(id);
  }

  componentDidMount(){
    const { productEdit: product, category, form } = this.props;
    Promise.all([
      category.getCategory({ level: 1 }),
      product.getProduct()
    ]).then(([categories, productInfo]) => {
      const { cids } = productInfo;
      Promise.all([
        category.getCategory({ level: cids.length }),
        product.getAttributes()
      ]).then(res => {
        form.setFieldsValue(product.pageValues);
      })
    });
  }

  // 分类属性变更
  handleCategoryChange = value => {
    const len = value.length;
    if ( len == 2 ) this.loadAttributes(value[len - 1]);
  }

  // 提交数据
  onSubmit = () => {
    const { productEdit: product, form, match: { params: { id } } } = this.props;

    form.validateFields((errs, vals) => {
      if ( errs ) return;

      let attrValues = {};
      const { attrs, ...rest } = vals;
      Object.keys(attrs).map(key => {
        attrValues[key.slice(6)] = attrs[key];
      });

      // 将数据存入 store，准备提交
      product.set({
        ...rest,
        attrValues: attrValues
      });

      if ( id !== undefined ) product.saveProduct();
      else product.updateProduct(id);
    })
  }

  render(){
    const { productEdit: product, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header={product.id ? `编辑商品 id:${product.id}` : '创建商品'} key="1">
          <Form>
            <FormItem {...formItemLayout} label="商品名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入商品名称！' }],
              })(
                <Input placeholder="请输入商品名称" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="商品分类">
              {getFieldDecorator('cids', {
                rules: [{ required: true, message: '请选择商品分类！' }],
              })(
                <CategoryCascader placeholder="请选择商品分类" onChange={this.handleCategoryChange} />
              )}
            </FormItem>

            {
              product.attribute.attributes.map(attr => {
                return (
                  <FormItem {...formItemLayout} label={attr.name} key={attr.id}>
                    {getFieldDecorator(`attrs.attrId${attr.id}`, {
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
                rules: [{ 
                  required: true, message: '请输入商品单价！' 
                }, { 
                  pattern: /^([1-9](\d+)?|0)(\.\d{1,2})?$/, message: '请输入两位小数！'
                }],
              })(
                <Input placeholder="请输入商品单价" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="商品数量">
              {getFieldDecorator('num', {
                rules: [{ 
                  required: true, message: '请输入商品数量！' 
                }, { 
                  pattern: /^[1-9](\d+)?|0$/, message: '请输入两位整数！'
                }],
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
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Panel>
      </Collapse>
    );
  }
};

export default Form.create()(CreateProduct)