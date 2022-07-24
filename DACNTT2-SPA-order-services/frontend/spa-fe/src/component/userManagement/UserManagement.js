import React from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import ChangePassword from "./ChangePassword";
import { Switch, Route, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

const UserManagement = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const phone = searchParams.get("phone");

  let routes = (
    <Switch>
      <Route exact={true} path="/users">
        <UserList />
      </Route>
      <Route exact={true} path="/users/create-user">
        <CreateUser />
      </Route>
      <Route path="/users/update-user">
        <UpdateUser phoneParam={phone} />
      </Route>
      <Route path="/users/change-password">
        <ChangePassword phoneParam={phone} />
      </Route>
    </Switch>
  );
  return (
    <>
      {routes}
      {/* <CreateUser /> */}
    </>
  );
};

export default UserManagement;
