import Attribute from "../models/Attribute";
import Category from "../models/Category";
import Product from "../models/Product";
import productList from "./product/list";

export default {
  'attribute': new Attribute(),
  'category': new Category(),
  'product': new Product(),
  'productList': productList
}