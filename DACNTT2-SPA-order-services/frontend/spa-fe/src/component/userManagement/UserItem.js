import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const UserItem = (props) => {
  let users = props.users;
  // const handleDeleteClick = props.handleDeleteClick;
  return (
    <>
      <table id="example" className="display w-100 dataTable">
        <thead>
          <tr>
            <th></th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((content) => (
            <tr key={content.id}>
              <td>
                <img
                  className="rounded-circle"
                  width="35"
                  height="35"
                  // src="images/avatar/1.jpg"
                  src={content.avatar}
                  alt="avatar"
                />
              </td>
              <td>{content.fullName}</td>
              <td>
                <strong>{content.phoneNum}</strong>
              </td>
              <td>{content.role}</td>

              <td>
                <div className="d-flex">
                  <Link
                    className="btn btn-secondary shadow btn-xs sharp mr-2 colorWhite"
                    to={{
                      pathname: `/users/update-user`,
                      search: `?phone=${content.phoneNum}`,
                      // query: `${content.phoneNum}`,
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <Button
                    className="btn btn-danger shadow btn-xs sharp"
                    onClick={() => props.handleDeleteClick(content.phoneNum)}
                    // onClick={() => handleShowModal}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserItem;
