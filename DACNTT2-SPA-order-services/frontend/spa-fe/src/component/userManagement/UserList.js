import React, { useState, useEffect } from "react";
// import Editable from "../Edittable/Edittable";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import authHeader from "../../services/auth-header";
import UserItem from "./UserItem";
import ConfirmModal from "../confirmModal";

const baseURL = process.env.REACT_APP_URL_USERS_API;

const UserList = () => {
  //state
  const [users, setUsersList] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [phoneState, setPhone] = useState("");
  const [redirectToUserList, setRedirectToUserList] = useState(false);

  //------------

  // GET API
  useEffect(() => {
    getusersListList();
  }, []);

  const getusersListList = async () => {
    axios
      .get(`${baseURL}/`, { headers: { "x-access-token": authHeader() } })
      .then((res) => {
        const tmp = res.data;
        setUsersList(tmp);
      })
      .catch((err) => {
        console.log("ERROR IN USERLIST COMPONENT: ", err);
      });
    setRedirectToUserList(false);
    // console.log(users);
    // setAvatar(users.avatar);
  };
  //------
  // console.log("USERS LIST: ", users);

  //delete
  const handleDeleteConfirmedClick = () => {
    axios({
      method: "post",
      url: `${baseURL}/delete`,
      params: { phone: phoneState },
      headers: { "x-access-token": authHeader() },
    }).then((res) => {
      setShowModal(false);
      // setRedirectToUserList(true);
      window.location.reload();
    });
  };
  const handleCloseModal = () => setShowModal(false);
  // const handleShowModal = () => setShowModal(true);
  const handleDeleteClick = (userPhone) => {
    // console.log("DELETE CLICKED PHONE: ", userPhone);
    setPhone(userPhone);
    setShowModal(true);
  };

  // console.log(editFormData);
  if (redirectToUserList) {
    // setRedirectToUserList(false);
    return <Redirect to="/users" />;
  }

  let tableJSX = <p>No usersLists</p>;
  if (users) {
    tableJSX = <UserItem users={users} handleDeleteClick={handleDeleteClick} />;
  }

  return (
    <>
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Thông tin tài khoản</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <ConfirmModal
                  title="Xoá tài khoản"
                  body="Bạn có chắc chắn muốn xoà tài khoản này?"
                  btnAction="OK, xoá đi..."
                  btnCancel="Thôi, không xoá nữa :D"
                  show={showModal}
                  handleCloseModal={handleDeleteClick}
                  handleNoClicked={handleCloseModal}
                  handleYesClicked={handleDeleteConfirmedClick}
                />
                {tableJSX}
              </div>
              <div className="justify-content-end d-flex mt-3">
                <Link to={"users/create-user"}>
                  <Button className="mr-2" variant="info btn-danger light">
                    <span className="btn-icon-left text-danger">
                      <i className="fa fa-plus color-danger" />
                    </span>
                    Add
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
