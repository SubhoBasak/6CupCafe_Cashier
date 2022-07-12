import React from "react";
import { Badge } from "react-bootstrap";
import "./style.css";

const ProductCard = (props) => {
  if (props.qnt)
    return (
      <div
        className="product-card"
        onClick={() => {
          if (props.stock > 0) props.onClick();
        }}
      >
        <img
          src={process.env.REACT_APP_BASE_URL + "/static/" + props.pid + ".jpg"}
          alt="product"
        />
        <p>{props.name}</p>
        <p className="fw-bold text-danger">Qnt. {props.qnt}</p>
      </div>
    );

  return (
    <div
      className="product-card"
      onClick={() => {
        if (props.stock > 0) props.onClick();
      }}
    >
      <img
        src={process.env.REACT_APP_BASE_URL + "/static/" + props.pid + ".jpg"}
        alt="product"
      />
      <p>{props.name}</p>
      {props.stock ? (
        <Badge pill bg="warning" className="stock-out text-dark">
          Stock {props.stock}
        </Badge>
      ) : (
        <Badge pill bg="danger" className="stock-out">
          Out of Stock
        </Badge>
      )}
      <p className="fw-bold text-danger">Rs. {props.price}</p>
    </div>
  );
};

export default ProductCard;
