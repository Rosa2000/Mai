import React from "react";
import ProductDataTable from "./ProductDataTable";
import EditProductForm from "./EditProductForm";
import { Switch, Route } from "react-router-dom";

const ProductManagementList = () => {
  let routes = (
    <Switch>
      <Route exact={true} path="/products/">
        <ProductDataTable />
      </Route>
      <Route exact={true} path="/products/edit-product">
        <EditProductForm />
      </Route>
    </Switch>
  );
  return <>{routes}</>;
};

export default ProductManagementList;
