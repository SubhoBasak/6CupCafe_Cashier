import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style.css";

const Print = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  function calcGt() {
    let sum = state.total;
    state.taxes.map((tax) => {
      sum += (state.total * tax.tax) / 100;
      return null;
    });

    if (state.selDisc !== "NA") {
      const disc = state.allDisc.find((data) => data._id === state.selDisc);
      if (disc !== null)
        if (disc.mode) sum = (sum * (100 - disc.disc)) / 100;
        else sum -= disc.disc;
    }

    if (sum < 0) sum = 0;

    return Math.round(sum).toFixed(2);
  }

  function getDisc() {
    if (state.selDisc !== "NA") {
      const disc = state.allDisc.find((data) => data._id === state.selDisc);
      if (disc !== null)
        if (disc.mode)
          return (
            <div className="w-100 d-flex pe-4 m-0">
              <p className="w-75 text-end mb-0">Discount : </p>
              <p className="w-25 text-start ps-2 mb-0">
                - {disc.disc.toFixed(2)} %
              </p>
            </div>
          );
        else
          return (
            <div className="w-100 d-flex pe-4 m-0">
              <p className="w-75 text-end mb-0">Discount : </p>
              <p className="w-25 text-start ps-2 mb-0">
                -{disc.disc.toFixed(2)}
              </p>
            </div>
          );
    } else return <></>;
  }

  return (
    <div className="print-bg">
      <div className="print-canvas">
        <img src={require("../../assets/images/logo.png")} alt="logo" />
        <h1>Inibila - An Ethiopian Edition</h1>
        <p>
          3/A/1 DR. BN JOT SARANI, SERAMPORE - 712201
          <br />
          LANDMARK - NEAR HEAD POST OFFICE
        </p>
        <h1>INVOICE</h1>
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

        <div className="w-100 d-flex pe-4 m-0">
          <p className="w-75 text-end mb-0">Total : </p>
          <p className="w-25 text-start ps-2 mb-0">{state.total.toFixed(2)}</p>
        </div>
        {state.taxes.map((data, index) => (
          <div key={index} className="w-100 d-flex pe-4 m-0">
            <p className="w-75 text-end mb-0">{data.name} : </p>
            <p className="w-25 text-start ps-2 mb-0">{data.tax}%</p>
          </div>
        ))}
        {getDisc()}
        <div className="w-100 d-flex pe-4 m-0 fw-bold">
          <p className="w-75 text-end mb-0">Grand total : </p>
          <p className="w-25 text-start ps-2 mb-0">{calcGt()}</p>
        </div>
        <p className="mt-3">Thank You! Visit again.</p>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <Button
          className="print-btn-hide mb-3"
          onClick={() => {
            window.print();
            if (state.homeDelv) return navigate("/express_billing");
            else
              return navigate("/print_token", {
                state: { token: state.token },
              });
          }}
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default Print;
