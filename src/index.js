import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { HashRouter, Route } from 'react-router-dom';
import DevTools from "mobx-react-devtools";
import stores from "stores";

import Products from "pages/products";
import Product from "pages/product";

render(
  <Provider {...stores}>
    <HashRouter>
      <div>
        <Route path='/products' component={Products} />
        <Route path='/create' component={Product} />
        <Route path='/edit/:id' component={Product} />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);