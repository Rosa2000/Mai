import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";
import authHeader from "../../services/auth-header";

const baseURL = process.env.REACT_APP_URL_USERS_API;
const CreateUser = (props) => {
  const [roleNV, setRoleNV] = useState(false);
  const [redirectToUserList, setRedirectToUserList] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let form;

  const cancelBtn = () => {
    setRedirectToUserList(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let role = "KH";
    if (roleNV) {
      role = "NV";
    }
    axios
      .post(
        `${baseURL}/create`,
        {
          fullName: name,
          phone: phone,
          password: password,
          reEnterPassword: reEnterPassword,
          role: role,
        },
        {
          headers: { "x-access-token": authHeader() },
        }
      )
      .then((res) => {
        setErrorMsg("");
        console.log(res);
        console.log("SUCCESS");
        setRedirectToUserList(true);
      })
      .catch((error) => {
        let msg = "Connectivitiy problem";
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msg
        )
          msg = error.response.data.msg;

        setErrorMsg(msg);
        // setErrorMsg(error.response.data.msg);
        // console.log(error.response.data.msg);
      });
  };
  if (redirectToUserList) return <Redirect to="/users" />;
  form = (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label className="mb-1 ">
          <strong>Họ tên</strong>
        </label>
        <input
          required
          type="text"
          className="form-control"
          name="fullName"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="form-group">
        <label className="mb-1 ">
          <strong>Role</strong>
        </label>
        <div className="custom-control custom-switch">
          <input
            name="role"
            type="checkbox"
            className="custom-control-input"
            onChange={(e) => setRoleNV(true)}
            id="customSwitch1"
          />
          <label className="custom-control-label" for="customSwitch1">
            Bật để set role NV
          </label>
        </div>
      </div>
      {errorMsg && <div className="text-danger fs-12">{errorMsg}</div>}
      <div className="text-center mt-4">
        <input type="submit" className="btn btn-primary btn-block" />
      </div>
      <div className="text-center mt-4">
        <button onClick={cancelBtn} className="btn btn-danger btn-block">
          Cancel
        </button>
      </div>
    </form>
  );
  return (
    <>
      <div className="authincation h-100 p-meddle">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-9">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 ">Tạo tài khoản</h4>
                      {form}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
