import axios from "axios";
import React, { useState } from "react";
import authHeader from "../../services/auth-header";
import { Redirect } from "react-router-dom";
const baseURL = process.env.REACT_APP_URL_USERS_API;

const ChangePassword = (props) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    reEnterNewPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [redirectToUserList, setRedirectToUserList] = useState(false);

  const phone = props.phoneParam;
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        `${baseURL}/changePasswordFromAdmin`,
        {
          currentPassword: passwordForm.currentPassword,
          reEnterNewPassword: passwordForm.reEnterNewPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          params: { phone: phone },
          headers: {
            "x-access-token": authHeader(),
          },
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
      });
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...passwordForm };
    newFormData[fieldName] = fieldValue;
    setPasswordForm(newFormData);
  };
  console.log("PASSWORD FORM: ", passwordForm);

  const cancelBtn = () => {
    setRedirectToUserList(true);
  };
  if (redirectToUserList) return <Redirect to="/users" />;
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
                      <h4 className="text-center mb-4 ">Cập nhật tài khoản</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <label className="mb-1 ">
                            <strong>Password hiện tại </strong>
                          </label>
                          <input
                            required
                            name="currentPassword"
                            type="password"
                            className="form-control"
                            onChange={handleEditFormChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-1 ">
                            <strong>Password mới</strong>
                          </label>
                          <input
                            name="newPassword"
                            required
                            type="password"
                            className="form-control"
                            onChange={handleEditFormChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-1 ">
                            <strong>Nhập lại Password mới</strong>
                          </label>
                          <input
                            name="reEnterNewPassword"
                            required
                            type="password"
                            className="form-control"
                            onChange={handleEditFormChange}
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
                        <div className="text-center mt-4">
                          <button
                            onClick={cancelBtn}
                            className="btn btn-danger btn-block"
                          >
                            Cancel
                          </button>
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
    </>
  );
};

export default ChangePassword;
