import Attribute from "../models/Attribute";
import Category from "../models/Category";
import Product from "../models/Product";
import products from "./products";

export default {
  'attribute': new Attribute(),
  'category': new Category(),
  'product': new Product(),
  'products': products
}