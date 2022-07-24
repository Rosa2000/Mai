import React from "react";
import ProductList from "./ProductList/ProductList";
import ProductDetail from "./ProductDetail/ProductDetail";

import { Switch, Route, useLocation } from "react-router-dom";

const AllProduct = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const SKU = searchParams.get("SKU");

  let routes = (
    <Switch>
      <Route exact={true} path="/shopping/">
        <ProductList />
      </Route>
      <Route exact={true} path="/shopping/product-detail">
        <ProductDetail SKU={SKU} />
      </Route>
    </Switch>
  );
  return <>{routes}</>;
};

export default AllProduct;
