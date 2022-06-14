import React from "react";
import { Badge } from "react-bootstrap";
import "./style.css";

const ProductCard = (props) => {
  return (
    <div
      className="product-card"
      onClick={() => {
        if (props.stock) props.onClick();
      }}
    >
      <img
        src={process.env.REACT_APP_BASE_URL + "/static/" + props.pid + ".jpg"}
        alt="product"
      />
      <p>{props.name}</p>
      {props.stock ? null : (
        <Badge pill bg="danger" className="stock-out">
          Out of Stock
        </Badge>
      )}
      <p className="fw-bold text-danger">Rs. {props.price}</p>
    </div>
  );
};

export default ProductCard;
