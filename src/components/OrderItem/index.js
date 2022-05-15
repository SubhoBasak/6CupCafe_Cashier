import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "./style.css";

const OrderItem = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td className="fw-light">{props.rate}</td>
      <td className="fw-light">
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            onClick={props.dec}
            disabled={props.quantity === 1 ? true : false}
          >
            -
          </Button>
          <Button variant="outline-secondary">{props.quantity}</Button>
          <Button variant="outline-secondary" onClick={props.inc}>
            +
          </Button>
        </ButtonGroup>
      </td>
      <td className="fw-light">{props.amount}</td>
      <td className="fw-light">
        <Button variant="outline-danger" onClick={props.remove}>
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default OrderItem;
