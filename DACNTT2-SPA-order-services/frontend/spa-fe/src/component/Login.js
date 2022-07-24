import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../actions/auth";

import loginbg from "../images/background/lg-bg.jpeg";

const Login = (props) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(phone, password)).then(() => {
      props.history.push("/dashboard");
    });
  };
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div
      className="authincation h-100 p-meddle"
      style={{
        background: "url(" + loginbg + ") no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="authincation h-100 p-meddle">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 ">Đăng nhập</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <label className="mb-1 ">
                            <strong>Số điện thoại</strong>
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-1 ">
                            <strong>Password</strong>
                          </label>
                          <input
                            required
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        {message && (
                          <div className="text-danger fs-12">{message}</div>
                        )}
                        <div className="text-center mt-4">
                          <input
                            type="submit"
                            className="btn btn-primary btn-block"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
