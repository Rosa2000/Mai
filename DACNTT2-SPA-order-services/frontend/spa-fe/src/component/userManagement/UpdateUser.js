import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import authHeader from "../../services/auth-header";
const baseURL = process.env.REACT_APP_URL_USERS_API;
const UpdateUser = (props) => {
  const [roleNV, setRoleNV] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [redirectToUserList, setRedirectToUserList] = useState(false);
  const [imageFile, setImageFile] = useState();

  const data = props.phoneParam;

  //edit data
  const [accountData, setAccountData] = useState({
    fullName: "",
    phoneNum: "",
    password: "",
    role: "",
    avatar: "",
  });
  useEffect(() => {
    getAccountInfo();
  }, []);
  let form;

  const getAccountInfo = async () => {
    axios
      .get(
        `${baseURL}/find`,
        { headers: { "x-access-token": authHeader() }, params: { phone: data } }
        // {
        //   params: { phone: data },
        // }
      )
      // .get(`${baseURL}/`, { headers: authHeader() })

      .then((res) => {
        setAccountData(res.data);
        if (res.data.role === "NV") {
          setRoleNV(true);
        }
      })
      .catch((err) => {
        console.log("ERROR IN UPDATE USER: ", err);
      });
  };

  //EDIT INPUT CHANGE
  // edit  data

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    // console.log("NAME: ", fieldName);
    // console.log("VALUE: ", fieldValue);
    const newFormData = { ...accountData };
    newFormData[fieldName] = fieldValue;
    console.log(newFormData);
    setAccountData(newFormData);
  };

  const cancelBtn = () => {
    setRedirectToUserList(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let role = "KH";
    if (roleNV) {
      role = "NV";
    }
    // console.log()
    console.log("SUBMITED");
    axios
      .post(
        `${baseURL}/update`,
        {
          fullName: accountData.fullName,
          phone: accountData.phoneNum,
          // password: accountData.password,
          // reEnterPassword: accountData.reEnterPassword,
          avatar: imageFile,
          role: role,
        },
        {
          params: { phone: data },
          headers: {
            "x-access-token": authHeader(),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setErrorMsg("");
        console.log(res);
        console.log("SUCCESS");
        // navigate("/login");
        setRedirectToUserList(true);
        // return <Redirect path="/signin" />;
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
    console.log(accountData);
  };
  const handleUploadImg = (e) => {
    setImageFile(e.target.files[0]);
    console.log(e.target.files[0]);
    // console.log(imageFile);
  };
  if (redirectToUserList) return <Redirect to="/users" />;

  form = (
    <form onSubmit={submitHandler}>
      <div className="text-center">
        <label>
          <input
            onChange={handleUploadImg}
            type="file"
            name="avatar"
            style={{ display: "none" }}
          />
          <img
            className="rounded-circle form-avatar"
            src={accountData.avatar}
            alt="avatar"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="mb-1 ">
          <strong>Họ tên</strong>
        </label>
        <input
          value={accountData.fullName}
          required
          type="text"
          className="form-control"
          name="fullName"
          onChange={handleEditFormChange}
          //   onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="mb-1 ">
          <strong>Số điện thoại</strong>
        </label>
        <input
          value={accountData.phoneNum}
          required
          type="text"
          className="form-control"
          name="phoneNum"
          onChange={handleEditFormChange}

          //   onChange={(e) => setPhone(e.target.value)}
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
            // {accountData.role == "NV"}
            checked={roleNV}
            // onChange={handleEditFormChange}
            onChange={(e) => setRoleNV(!roleNV)}
            id="customSwitch1"
          />
          <label className="custom-control-label" for="customSwitch1">
            Bật để set role NV
          </label>
        </div>
        <Link
          to={{
            pathname: `change-password`,
            search: `?phone=${accountData.phoneNum}`,
          }}
        >
          Đổi mất khẩu tài khoản
        </Link>
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
    // <></>
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
                      <h4 className="text-center mb-4 ">Cập nhật tài khoản</h4>
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

export default UpdateUser;
