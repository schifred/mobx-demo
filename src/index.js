import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { createHashHistory } from 'history';
import { Router, Route } from 'react-router';
import DevTools from "mobx-react-devtools";
import stores from "stores";

import ProductList from "components/ProductList";
import Product from "pages/product";

render(
  <Provider {...stores}>
    <Router history={createHashHistory()}>
      <div>
        <Route path='/products' component={ProductList} />
        <Route path='/create' component={Product} />
        <Route path='/edit/:id' component={Product} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);