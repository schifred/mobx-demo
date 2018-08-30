import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { HashRouter, Route } from 'react-router-dom';
import DevTools from "mobx-react-devtools";
import stores from "stores";

import ProductList from "pages/ProductList";
import CreateProduct from "pages/CreateProduct";
import ProductDetail from "pages/ProductDetail";

render(
  <Provider {...stores}>
    <HashRouter>
      <div>
        <Route path='/products' component={ProductList} />
        <Route path='/create' component={CreateProduct} />
        <Route path='/edit/:id' component={CreateProduct} />
        <Route path='/detail/:id' component={ProductDetail} />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);