import React from "react";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

const Appbar = () => {
  return (
    <>
      <div className="nav-title-bar d-flex align-items-center">
        <img src={require("../../assets/images/logo.png")} alt="logo" />
        <p className="fs-4 text-light my-0 ms-3 fw-light">
          <strong>Inibila - An Ethiopian Edition</strong>
        </p>
        <div className="flex-grow-1 d-flex justify-content-end">
          <Button
            variant="outline-light"
            className="me-2"
            onClick={() => {
              if (window.confirm("Do you really want to log out?")) {
                localStorage.removeItem("token");
                window.location.reload();
              }
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Link to="/express_billing" className="nav-link">
            Express Billing
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/home_delivery" className="nav-link">
            Home Delivery
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/last_orders" className="nav-link">
            Last Orders
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/token" className="nav-link">
            Token
          </Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Appbar;
