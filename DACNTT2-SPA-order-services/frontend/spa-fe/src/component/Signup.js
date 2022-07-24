import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";

import loginbg from "../images/background/lg-bg.jpeg";
const baseURL = process.env.REACT_APP_URL_USERS_API;
// console.log(baseURL);
const Signup = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(`${baseURL}/create`, {
        phone: phone,
        password: password,
        reEnterPassword: reEnterPassword,
      })
      .then((res) => {
        setErrorMsg("");
        console.log(res);
        console.log("SUCCESS");
        // navigate("/login");
        setRedirectToLogin(true);
        // return <Redirect path="/signin" />;
      })
      .catch((error) => {
        setErrorMsg(error.response.data.msg);
        console.log(error.response.data.msg);
      });
  };
  if (redirectToLogin) return <Redirect to="/login" />;

  // console.log(phone);
  // console.log(password);
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
                      <h4 className="text-center mb-4 ">Tạo tài khoản</h4>
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
                        <div className="form-group">
                          <label className="mb-1 ">
                            <strong>Nhập lại Password</strong>
                          </label>
                          <input
                            required
                            type="password"
                            className="form-control"
                            onChange={(e) => setReEnterPassword(e.target.value)}
                          />
                        </div>
                        {errorMsg && (
                          <div className="text-danger fs-12">{errorMsg}</div>
                        )}
                        <div className="text-center mt-4">
                          <input
                            type="submit"
                            className="btn btn-primary btn-block"
                          />
                        </div>
                      </form>
                      <div className="new-account mt-3 ">
                        <p>
                          Đã có tài khoản?{" "}
                          <a className="text-primary" href="/login">
                            Đăng nhập
                          </a>
                        </p>
                      </div>
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

export default Signup;
