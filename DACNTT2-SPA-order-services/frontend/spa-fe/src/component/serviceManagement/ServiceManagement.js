import React from "react";
import ServicesList from "./ServicesList";
import EditServiceForm from "./EditService";
import { Switch, Route } from "react-router-dom";

const ServiceManagement = () => {
  let routes = (
    <Switch>
      <Route exact={true} path="/services/">
        <ServicesList />
      </Route>
      <Route exact={true} path="/services/edit-services">
        <EditServiceForm />
      </Route>
    </Switch>
  );
  return <>{routes}</>;
};

export default ServiceManagement;
