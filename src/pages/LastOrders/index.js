import React from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../components/ProductCard";
import ComboList from "../../components/ComboList";

const Orders = () => {
  const [reload, setReload] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [combo, setCombo] = React.useState("");

  const navigate = useNavigate();

  const showToken = (token) => {
    if (token)
      return (
        <Alert variant="danger" className="ms-2 p-1 px-2 fs-6">
          Token: {token.toString().padStart(3, "0")}
        </Alert>
      );
    else return <></>;
  };
  
  // const curStatus = (code)=>{
  //   if(code === 0){
  //     return "Order Placed"
  //   }
  //   else if(code === 1){
  //     return "Order Accepted"
  //   }
  //   else if(code === 2){
  //     return "Order Completed"
  //   }
  // }
  
  const autoreload = setInterval(()=>{setReload(!reload)}, 5000)
  const autof =()=>{clearInterval(autoreload, 1000)}
  setInterval(()=>{autof()}, 7000)
  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(process.env.REACT_APP_BASE_URL + "/sale", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setOrders(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate, reload]);
  return (
    <div className="p-2">
      {orders.map((order, index) => (
        <div
          className="border border-1 mb-3 rounded d-flex flex-wrap p-2"
          key={index}
        >
          <div className="w-100 p-2 fs-5 d-flex flex-wrap">
            <Alert className="ms-2 p-1 px-2 fs-6">
              Order time: {new Date(order.date).toLocaleString()}
            </Alert>
            {order.completeTime ? (
              <Alert className="ms-2 p-1 px-2 fs-6" variant="danger">
                Complete time: {new Date(order.completeTime).toLocaleString()}
              </Alert>
            ) : null}
            {showToken(order.token)}
            {order.parcel === true ? (
              <Alert className="ms-2 p-1 px-2 fs-6" variant="warning">
                Parcel
              </Alert>
            ) : null}
            <Alert variant="info" className="ms-2 p-1 px-2 fs-6">
              Status: {order.status === 0 ? "Order placed" : "Order completed"}
            </Alert>
            {order.customer && order.customer.name ? (
              <>
                <Alert variant="success" className="ms-2 p-1 px-2 fs-6">
                  Name: {order.customer.name}
                </Alert>
                <Alert variant="warning" className="ms-2 p-1 px-2 fs-6">
                  Phone: {order.customer.phone}
                </Alert>
              </>
            ) : null}
            {order.orderType === 1 ? (
              <Alert className="ms-2 p-1 px-2 fs-6" variant="danger">
                Parcel : {order.delivery.name}
              </Alert>
            ) : null}
            <hr className="w-100 my-0" />
          </div>
          {order.address ? (
            <Alert variant="primary" className="w-100 my-1 p-2">
              <strong>Address: </strong> {order.address}
            </Alert>
          ) : null}
          {order.note ? (
            <Alert variant="secondary" className="w-100 my-1 p-2">
              <strong>Note: </strong>
              {order.note}
            </Alert>
          ) : null}
          {order.items.map((item, index) => {
            if (item.item && item.item._id)
              return (
                <ProductCard
                  key={index}
                  pid={item.item._id}
                  name={item.item.name}
                  qnt={item.quantity}
                  price={item.price}
                  comb={item.item.note ? true : false}
                  showCombo={() => setCombo(item.item.note)}
                />
              );
            else return <p>Item deleted</p>;
          })}
        </div>
      ))}
      <ComboList show={combo !== ""} close={() => setCombo("")} note={combo} />
    </div>
  );
};

export default Orders;
