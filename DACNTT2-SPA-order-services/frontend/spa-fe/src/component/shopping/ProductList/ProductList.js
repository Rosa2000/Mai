import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import axios from "axios";
import authHeader from "../../../services/auth-header";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Pagination from "../../partials/Pagination";
const baseURL = process.env.REACT_APP_URL_SHOPPING_API;

const ProductList = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  let offset = searchParams.get("offset");

  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProduct, setToTalProduct] = useState();

  const productsPerPage = 8;

  if (!offset) {
    offset = 0;
  }

  useEffect(() => {
    // setPage();
    setCurrentPage(offset);
    getTotalProduct();
  }, [offset]);
  useEffect(() => {
    getProduct();
  }, [isLoading]);

  const getTotalProduct = () => {
    axios
      .get(`${baseURL}/total-product`, {
        headers: { "x-access-token": authHeader() },
      })
      .then((res) => {
        setToTalProduct(res.data.count);
        // setIsCounted(true);
      })
      .catch((err) => {
        console.log("ERR IN COUNTING TOTAL PRDUCT: ", err);
      });
  };

  let productCards;
  if (productData) {
    productCards = productData.map((product) => {
      let srcImg = product.URL_IMG.split(",");
      return (
        <div key={product.SKU} className="col-12 col-md-6 col-lg-3 mb-3">
          <Link
            to={{
              pathname: `/shopping/product-detail`,
              search: `?SKU=${product.SKU}`,
            }}
          >
            <ProductCard
              // SKU={product.SKU}
              srcImg={srcImg[0]}
              productName={product.productName}
              salePrice={product.salePrice}
            />
          </Link>
        </div>
      );
    });
  } else {
    productCards = <Spinner animation="border" variant="info" />;
  }

  const getProduct = async () => {
    axios
      .get(`${baseURL}/all-product`, {
        headers: { "x-access-token": authHeader() },
        params: {
          limit: productsPerPage,
          offset: currentPage,
        },
      })
      .then((res) => {
        const dataList = res.data;
        setProductData(dataList);
      })
      .catch((err) => {
        console.log("ERROR IN SHOPPING ALL PRODUCT: ", err);
      });
    setIsLoading(false);
  };

  const getNewPagination = () => {
    setIsLoading(true);
  };
  return (
    <>
      <div className="row">{productCards}</div>
      {/* <div className="fixed-bottom"> */}
      <Pagination
        onClick={getNewPagination}
        totalPage={totalProduct}
        itemPerPage={productsPerPage}
      />
      {/* </div> */}
    </>
  );
};

export default ProductList;
