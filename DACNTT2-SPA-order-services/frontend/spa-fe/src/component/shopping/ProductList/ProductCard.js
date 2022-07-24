import React from "react";
// import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <>
      <div className="card product-card">
        <div className="text-center">
          <img className=" card-img" src={props.srcImg} alt="Product Img" />
        </div>
        <div className="card-body">
          <h3 className="card-title text-center">{props.productName}</h3>
          <h5 className="card-title text-center">{props.salePrice} VND</h5>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
