import React from "react";
import "./style.css";

const ProductCard = (props) => {
  return (
    <div className="product-card" onClick={props.onClick}>
      <img
        src={process.env.REACT_APP_BASE_URL + "/static/" + props.pid + ".jpg"}
        alt="product"
      />
      <p>{props.name}</p>
      <p className="fw-bold text-danger">Rs. {props.price}</p>
    </div>
  );
};

export default ProductCard;
