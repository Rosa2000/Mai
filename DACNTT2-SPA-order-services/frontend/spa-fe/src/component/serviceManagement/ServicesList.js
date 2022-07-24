import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import authHeader from "../../services/auth-header";
import ConfirmModal from "../confirmModal";

const baseURL = process.env.REACT_APP_URL_SERVICES_API;
const ServicesList = () => {
  const [serviceData, setServiceData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [service_ID, setService_ID] = useState();

  const columns = [
    {
      name: "SERVICE ID",
      selector: (row) => row.service_ID,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Tên dịch vụ",
      selector: (row) => row.serviceName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Loại dịch vụ",
      selector: (row) => row.category,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Giá",
      selector: (row) => row.price.toLocaleString() + " VND",
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Thời lượng",
      selector: (row) => row.duration + "'",
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Cập nhật",
      cell: (row) => (
        <Link
          to={{
            pathname: `/services/edit-services`,
            search: `?service_ID=${row.service_ID}`,
          }}
          className="btn btn-secondary shadow btn-xs sharp mr-2"
        >
          <i className="bi bi-pencil"></i>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: "100px",
    },
    {
      name: "Xoá",
      cell: (row) => (
        <button
          onClick={() => deleteClickService(row.service_ID)}
          className="btn btn-danger shadow btn-xs sharp"
        >
          <i className="bi bi-trash"></i>
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: "100px",
    },
  ];

  useEffect(() => {
    setLoading(false);
    getServiceData();
  }, [loading]);

  const getServiceData = async () => {
    axios
      .get(`${baseURL}/`, {
        headers: { "x-access-token": authHeader() },
      })
      .then((res) => {
        const data = res.data;
        setServiceData(data);
      })
      .catch((err) => {
        console.log("ERROR IN SERVICE LIST: ", err);
      });
  };

  const deleteClickService = (serviceID) => {
    setService_ID(serviceID);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleDeleteConfirmedClick = () => {
    axios
      .post(`${baseURL}/delete`, "", {
        headers: { "x-access-token": authHeader() },
        params: { service_ID: service_ID },
      })
      .then((res) => {
        setShowModal(false);
        setLoading(true);
      })
      .catch((err) => {
        console.log("DELETE PRODUCT ERR: ", err);
      });
  };
  return (
    <>
      <ConfirmModal
        title="Xoá dịch vụ"
        body="Bạn có chắc chắn muốn xoà dịch vụ này?"
        btnAction="OK, xoá đi..."
        btnCancel="Thôi, không xoá nữa :D"
        show={showModal}
        handleNoClicked={handleCloseModal}
        handleYesClicked={handleDeleteConfirmedClick}
      />
      <DataTable columns={columns} data={serviceData} pagination />
    </>
  );
};

export default ServicesList;
