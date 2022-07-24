import axios from "axios";
import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import authHeader from "../../services/auth-header";

const baseURL = process.env.REACT_APP_URL_ORDERS_API;

const ProductOrderList = () => {
  const [orderData, setOrderData] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getOrder();
    setInterval(() => {
      setOrderData();
      getOrder();
    }, 10000);
  }, []);

  const getOrder = () => {
    axios
      .get(`${baseURL}/`, {
        headers: { "x-access-token": authHeader() },
      })
      .then((res) => {
        const data = res.data;
        setOrderData(data);
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

  const columns = [
    {
      name: "Ngày tạo đơn",
      selector: (row) => new Date(row.date_of_payment).toLocaleString("vi-VN"),
      sortable: true,
      maxWidth: "300px",
      //   maxWidth: "200px",
    },
    {
      name: "Mã đơn",
      selector: (row) => row.orderID,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "SDT khách hàng",
      selector: (row) => row.customer_phone,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Mã sản phẩm",
      selector: (row) => row.SKU,
      sortable: true,
      maxWidth: "200px",
    },

    {
      name: "Số lượng",
      selector: (row) => row.quantity,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Thành tiền",
      selector: (row) => row.amount.toLocaleString() + " VND",
      sortable: true,
      maxWidth: "200px",
    },
  ];

  return (
    <>
      {errorMsg && (
        <div className="text-center text-danger fs-12">{errorMsg}</div>
      )}
      {orderData && <DataTable columns={columns} data={orderData} pagination />}
    </>
  );
};

export default ProductOrderList;
