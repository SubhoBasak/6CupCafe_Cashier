import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style.css";

const PrintToken = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="print-bg">
      <div className="print-canvas">
        <h1>Inibila - An Ethiopian Edition</h1>
        <table className="mb-3">
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {state.order.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{data.name}</td>
                <td>{data.qnt}</td>
                <td>{data.price.toFixed(2)}</td>
                <td>{data.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="fs-3">
          Token : {state.token.toString().padStart(3, "0")}
        </p>
        <span>
          Steps to follow once your order is accepted:
          <br /> - Follow the display board to know your order status.
          <br /> - Once your order is ready, collect your order from the counter
          by exchanging your token with your order.
          <br /> - Enjoy your order, if any issues are faced visit the reception
          to solve it.
        </span>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <Button
          className="print-btn-hide mb-3"
          onClick={() => {
            window.print();
            navigate("/express_billing");
          }}
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default PrintToken;
