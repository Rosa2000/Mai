import React, { useState, useEffect } from "react";
import "./ProductDetail.css";

import { Button, Nav, Tab } from "react-bootstrap";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import ConfirmModal from "../../confirmModal";
import { Redirect } from "react-router-dom";
const baseURLProduct = process.env.REACT_APP_URL_PRODUCTS_API;
const baseURLOrder = process.env.REACT_APP_URL_ORDERS_API;

const ProductDetail = (props) => {
  const SKU = props.SKU;
  const [productInfo, setProductInfo] = useState({
    productName: "",
    SKU: "",
    salePrice: 0,
    brand: "",
    description: "",
    user_manual: "",
  });
  const [previewImg, setPreviewImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [redirectToShopping, setRedirectToShopping] = useState(false);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    axios
      .get(`${baseURLProduct}/get-product`, {
        headers: { "x-access-token": authHeader() },
        params: { SKU: SKU },
      })
      .then((res) => {
        setProductInfo(res.data);
        // HANDLE IMG
        if (res.data && res.data.URL_IMG) {
          let URL_FILES = res.data.URL_IMG.split(",");
          setPreviewImg(URL_FILES);
        }
        // console.log("GET PRODUCT DETAIL: ", res);
      });
  };
  let tabPanel = <></>;
  let navItem = <></>;
  if (previewImg) {
    tabPanel = previewImg.map((src, i) => {
      return (
        <>
          <Tab.Pane key={i} eventKey={i}>
            <img className="img-fluid" src={src} alt="" />
          </Tab.Pane>
        </>
      );
    });
    navItem = previewImg.map((src, i) => {
      return (
        <>
          <Nav.Item as="li">
            <Nav.Link as="a" eventKey={i} to={i}>
              <img className="img-fluid" src={src} alt="" width={50} />
            </Nav.Link>
          </Nav.Item>
        </>
      );
    });
  }
  // Modal handling
  let bodyModal = `Bạn chắc mua ${quantity} ${productInfo.productName} không?`;
  const CancelModal = () => {
    setShowModal(false);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  // Handle change quantity input
  const changequantity = (event) => {
    setQuantity(event.target.value);
  };
  const CreateOrder = () => {
    axios
      .post(
        `${baseURLOrder}/create`,
        {
          SKU: SKU,
          quantity: quantity,
        },
        {
          headers: { "x-access-token": authHeader() },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log("ERR IN PRODUCT DETAIL Create Order: ", err);
      });
    // history.back();
    setRedirectToShopping(true);
  };

  if (redirectToShopping) {
    return <Redirect to="/shopping" />;
  }

  return (
    <div className="row">
      <ConfirmModal
        title="Mua sản phẩm"
        body={bodyModal}
        btnAction="Mua ngay"
        btnCancel="Cancel"
        show={showModal}
        handleCloseModal={CancelModal}
        handleNoClicked={CancelModal}
        handleYesClicked={CreateOrder}
      />
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                {/* Tab panes */}
                <Tab.Container defaultActiveKey="0">
                  <Tab.Content>{tabPanel}</Tab.Content>
                  <div className="product-nav-img tab-slide-content new-arrival-product mb-4 mb-xl-0">
                    {/* Nav tabs */}
                    <Nav
                      as="ul"
                      className="nav slide-item-list mt-3"
                      role="tablist"
                    >
                      {navItem}
                    </Nav>
                  </div>
                </Tab.Container>
              </div>
              {/*Tab slider End*/}

              <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                <div className="product-detail-content">
                  <div className="new-arrival-content pr">
                    <h3>{productInfo.productName}</h3>
                    <div className="d-table mb-2">
                      <p className="price float-left d-block">
                        <strong>
                          {productInfo.salePrice.toLocaleString()} VND
                        </strong>
                      </p>
                    </div>

                    <p>
                      <strong>Mã sản phẩm:</strong>{" "}
                      <span className="item">{productInfo.SKU}</span>{" "}
                    </p>
                    <p>
                      <strong>Thương hiệu</strong>{" "}
                      <span className="item">{productInfo.brand}</span>
                    </p>
                    <p className="text-content">{productInfo.description}</p>

                    {/*Quantity start*/}
                    <div className="col-2 px-0">
                      <input
                        type="number"
                        name="num"
                        className="form-control input-btn input-number"
                        defaultValue={1}
                        onChange={changequantity}
                      />
                    </div>
                    {/*Quanatity End*/}
                    <div className="mt-3">
                      <Button
                        disabled={quantity <= 0 ? true : false}
                        onClick={showModalHandler}
                        className="btn btn-primary btn-lg"
                      >
                        Mua ngay
                      </Button>
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

export default ProductDetail;
