import React from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../components/ProductCard";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(process.env.REACT_APP_BASE_URL + "/sale/last_orders", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setOrders(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <div className="p-2">
      {orders.map((order, index) => (
        <div
          className="border border-1 mb-3 rounded d-flex flex-wrap p-2"
          key={index}
        >
          <div className="w-100 p-2 fs-5 d-flex flex-wrap">
            <Alert className="ms-2 p-1 px-2 fs-6">
              {new Date(order.date).toLocaleString()}
            </Alert>
            <Alert variant="danger" className="ms-2 p-1 px-2 fs-6">
              Token: {order.token.toString().padStart(3, "0")}
            </Alert>
            {order.customer && order.customer.name ? (
              <>
                <Alert variant="success" className="ms-2 p-1 px-2 fs-6">
                  {order.customer.name}
                </Alert>
                <Alert variant="warning" className="ms-2 p-1 px-2 fs-6">
                  {order.customer.phone}
                </Alert>
              </>
            ) : null}
            <hr className="w-100 my-0" />
          </div>
          {order.items.map((item, index) => (
            <ProductCard
              key={index}
              pid={item.item._id}
              name={item.item.name}
              qnt={item.quantity}
              price={item.price}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
