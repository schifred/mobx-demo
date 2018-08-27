import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";

import ProductList from "components/ProductList";
import stores from "stores";

render(
  <Provider {...stores}>
    <ProductList />
  </Provider>,
  document.getElementById("root")
);