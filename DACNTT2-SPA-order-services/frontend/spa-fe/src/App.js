import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import AuthVerify from "./common/AuthVerify";
import { Switch, Route, Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_USERS_API;

// dotenv.config();
function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [role, setRole] = useState();
  const dispatch = useDispatch();
  const checkUserExists = () => {
    axios
      .get(`${baseURL}/find`, {
        params: { phone: currentUser.phone },
      })
      .then((res) => {
        // console.log("RES: ", res);
        const roleAccountExist = res.data.role;
        setRole(roleAccountExist);
      })
      .catch((err) => {
        console.log("ERROR IN APP: ", err);
        dispatch(logout());
      });
  };
  useEffect(() => {
    history.listen(
      (location) => {
        dispatch(clearMessage());
      },
      [dispatch]
    );
  });
  useEffect(() => {
    if (currentUser) {
      checkUserExists();
    }
  }, [currentUser]);
  const logOut = () => {
    dispatch(logout());
  };
  // console.log(role);
  let routes;
  if (role) {
    routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/">
          <Dashboard logOut={logOut} role={role} />
        </Route>
      </Switch>
    );
  } else {
    routes = <Route path="/" component={Login} />;
  }

  return (
    <Router history={history}>
      <div className="vh-100">{routes}</div>
      <AuthVerify logOut={logOut} />
    </Router>
  );
}

export default App;
