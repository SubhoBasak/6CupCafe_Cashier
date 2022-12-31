import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, FormLabel, FormControl, Button } from "react-bootstrap";

import ProductCard from "../../components/ProductCard";

const TODAY = new Date();

TODAY.setDate(TODAY.getDate() + 1);
const DATE_TO =
  TODAY.getFullYear() +
  "-" +
  (TODAY.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  TODAY.getDate().toString().padStart(2, "0");

TODAY.setMonth(TODAY.getMonth() - 1);
const DATE_FROM =
  TODAY.getFullYear() +
  "-" +
  (TODAY.getMonth() + 1).toString().padStart(2, "0") +
  "-01";

const Orders = () => {
  const [start, setStart] = React.useState(DATE_FROM);
  const [end, setEnd] = React.useState(DATE_TO);
  const [orders, setOrders] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/sale/all?" +
        new URLSearchParams({ start, end }),
      {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      }
    ).then((res) => {
      if (res.status === 200) res.json().then((data) => setOrders(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate, reload]);

  return (
    <>
      <div className="d-flex align-items-center p-3 border border-1 m-3">
        <FormLabel className="text-dark fw-bold text-nowrap mx-3">
          Start Date
        </FormLabel>
        <FormControl
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <FormLabel className="text-dark fw-bold text-nowrap mx-3">
          End Date
        </FormLabel>
        <FormControl
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <Button className="ms-2 text-nowrap" onClick={() => setReload(!reload)}>
          Get Report
        </Button>
      </div>
      <div className="p-2">
        {orders.map((order, index) => (
          <div
            className="border border-1 border-danger mb-5 rounded d-flex flex-wrap p-2"
            key={index}
          >
            <div className="w-100 p-2 fs-5 d-flex flex-wrap">
              <ul>
                <li>
                  <strong>Order type : </strong>
                  {order.orderType === 0 ? "Express billing" : "Home delivery"}
                </li>
                <li>
                  <strong>Date : </strong>
                  {new Date(order.date).toLocaleString()}
                </li>
                <li>
                  <strong>Total : </strong>
                  {order.total}
                </li>
                {order.token ? (
                  <li>
                    <strong>Token : </strong>
                    {order.token}
                  </li>
                ) : null}
                <li>
                  <strong>Pay method : </strong>
                  {order.payMethod === 0
                    ? "Cash"
                    : order.payMethod === 1
                    ? "Card"
                    : "UPI"}
                </li>
                {order.customer ? (
                  <>
                    <li>
                      <strong>Customer name : </strong>
                      {order.customer.name}
                    </li>
                    <li>
                      <strong>Customer phone : </strong>
                      {order.customer.phone}
                    </li>
                  </>
                ) : null}
                {order.delivery ? (
                  <li>
                    <strong>Delivery : </strong>
                    {order.delivery.name}
                  </li>
                ) : (
                  <li>
                    <strong>Parcel : </strong>
                    {order.parcel ? "Yes" : "No"}
                  </li>
                )}
                {order.address ? (
                  <li>
                    <strong>Address : </strong>
                    {order.address}
                  </li>
                ) : null}
              </ul>
              <hr className="w-100 my-0" />
            </div>
            {order.note ? (
              <Alert variant="secondary" className="w-100 my-3 p-2">
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
                    stock={item.quantity}
                    history
                  />
                );
              else return <p>Item deleted</p>;
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
