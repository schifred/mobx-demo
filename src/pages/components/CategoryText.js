import { Component } from "react";
import { observer } from "mobx-react";

// 远程获取的数组项数据需要重新设置观察者，以驱动视图更新
@observer
export default class CategoryText extends Component{
  componentWillMount(){
    const { product } = this.props;
    product.getCategories();
  }

  render(){
    const { product } = this.props;
    return product.categoryTexts;
  }
};