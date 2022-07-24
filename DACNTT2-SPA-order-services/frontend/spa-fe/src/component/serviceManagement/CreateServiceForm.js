import React, { useState } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";

const baseURL = process.env.REACT_APP_URL_SERVICES_API;

const CreateServiceForm = () => {
  const [serviceInfo, setServiceInfo] = useState({
    service_ID: "",
    serviceName: "",
    category: "",
    price: 0,
    duration: 0,
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  // onChange handler
  const handleFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...serviceInfo };
    newFormData[fieldName] = fieldValue;
    setServiceInfo(newFormData);
  };

  //submit
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        `${baseURL}/create`,
        {
          service_ID: serviceInfo.service_ID,
          serviceName: serviceInfo.serviceName,
          category: serviceInfo.category,
          price: serviceInfo.price,
          duration: serviceInfo.duration,
          description: serviceInfo.description,
        },
        {
          headers: { "x-access-token": authHeader() },
        }
      )
      .then((res) => {
        // setIsLoading(true);
        setServiceInfo({
          service_ID: "",
          serviceName: "",
          category: "",
          price: 0,
          duration: 0,
          description: "",
        });
        window.location.reload();
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
    // console.log("SUBMITED");
  };
  const form = (
    <form onSubmit={submitHandler}>
      {errorMsg && (
        <div className="text-center text-danger fs-12">{errorMsg}</div>
      )}
      <div className="form-group ">
        <label>Mã dịch vụ</label>
        <input
          onChange={handleFormChange}
          required
          name="service_ID"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group ">
        <label>Tên dịch vụ</label>
        <input
          onChange={handleFormChange}
          required
          name="serviceName"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group ">
        <label>Loại dịch vụ</label>
        <select
          required
          onChange={handleFormChange}
          defaultValue="choose"
          name="category"
          className="form-control"
        >
          <option value="choose" disabled>
            Chọn...
          </option>
          <option value="chăm sóc da">Chăm sóc da</option>
          <option value="sức khoẻ">Sức khoẻ</option>
          <option value="chăm sóc cơ thể">Chăm sóc cơ thể</option>
          <option value="gói dịch vụ">Gói dịch vụ</option>
        </select>
      </div>
      <div className="form-group">
        <label>Giá</label>
        <input
          onChange={handleFormChange}
          min="1"
          required
          name="price"
          type="number"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Thời gian làm</label>
        <input
          onChange={handleFormChange}
          min="1"
          required
          name="duration"
          type="number"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          onChange={handleFormChange}
          name="description"
          className="form-control"
          rows="3"
        ></textarea>
      </div>
      <div className="row justify-content-center">
        <button
          type="submit"
          className="btn btn-primary mx-auto col-12 col-md-5 "
        >
          Tạo sản phẩm
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
              {/* <ConfirmModal
                title="Tạo sản phẩm"
                body="Tạo sản phẩm hoàn tất"
                btnAction="Quay về danh sách sản phẩm"
                btnCancel="Tạo thêm"
                show={showModal}
                // handleCloseModal={handleReload}
                handleNoClicked={handleReload}
                handleYesClicked={handleRedirectToProductList}
              /> */}
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h4 className="text-center mb-4 ">Tạo dịch vụ</h4>
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

export default CreateServiceForm;
