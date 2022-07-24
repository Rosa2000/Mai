import React from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
  try {
    // console.log("ATOB");
    // console.log(JSON.parse(atob(token.split(".")[1])));
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  props.history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      if (!decodedJwt) {
        console.log("TOKEN EXPIRED NULL");
        props.logOut();
      }
      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("TOKEN EXPIREDIN: ", new Date(decodedJwt.exp * 1000));
        props.logOut();
      }
    }
  });
  return <div></div>;
};
export default withRouter(AuthVerify);
//withRouter là 1 higher order component pass current location, history props tới component được wrapped
// hiểu đơn giản là kết nối component tới router
