import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";

// import TodoList from "./components/TodoList";
// import TodoListModel from "./models/TodoListModel";
// import TodoModel from "./models/TodoModel";

import ProductList from "./components/ProductList";
import Product from "./models/Product";
import Products from "./models/Products";
import Category from "./models/Category";

const store = {
  'product': new Product(),
  'products': new Products(),
  'category': new Category()
};

render(
  <Provider {...store}>
    <ProductList />
  </Provider>,
  document.getElementById("root")
);

// store.addTodo("Get Coffee");
// store.addTodo("Write simpler code");
// store.todos[0].finished = true;

// setTimeout(() => {
//   store.addTodo("Get a cookie as well");
// }, 2000);

// // playing around in the console
// window.store = store;
