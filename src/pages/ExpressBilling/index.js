import React from "react";
import {
  Col,
  Row,
  Button,
  Alert,
  ButtonGroup,
  Table,
  FormControl,
  Spinner,
} from "react-bootstrap";
import "./style.css";

// components
import ProductCard from "../../components/ProductCard";
import OrderItem from "../../components/OrderItem";
import { useNavigate } from "react-router-dom";

const ExpressBilling = () => {
  const [allProds, setAllProds] = React.useState([]);
  const [allCatg, setAllCatg] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  const [payMethod, setPayMethod] = React.useState(0);
  const [curCat, setCurCat] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [phone, setPhone] = React.useState("");
  const [cname, setCname] = React.useState("");
  const [note, setNote] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const newOrderApi = () => {
    const items = order.map((item) => ({
      pid: item.pid,
      qnt: item.qnt,
    }));

    fetch(process.env.REACT_APP_BASE_URL + "/sale", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, phone, cname, payMethod, orderType: 0 }),
    }).then((res) => {
      if (res.status === 200) {
        setOrder([]);
        setPhone("");
        setCname("");
        setNote("");
        setPayMethod(0);
      } else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  const phnOnChangeHandler = (e) => {
    if (e.target.value.length > 9 && !loading) {
      setLoading(true);
      fetch(
        process.env.REACT_APP_BASE_URL +
          "/customer?" +
          new URLSearchParams({ phone: e.target.value }),
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      ).then((res) => {
        setLoading(false);
        if (res.status === 200)
          res
            .json()
            .then((data) => (data ? setCname(data.name) : setCname("")));
        else if (res.status === 401 || res.status === 405)
          return navigate("/login");
        else return alert("Something went wrong! Please try again.");
      });
    }
    setPhone(e.target.value);
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    fetch(process.env.REACT_APP_BASE_URL + "/category", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200)
        res.json().then((data) => {
          setAllCatg(data);
          setCurCat(data[0] ? data[0]._id : "");
        });
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });

    fetch(process.env.REACT_APP_BASE_URL + "/product/cashier", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setAllProds(data));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <Row className="w-100 p-2">
      <Col lg="6" md="12" sm="12" className="p-2">
        <div className="cat-sel-btns d-flex p-2 border border-1 rounded">
          {allCatg.map((catg, index) => {
            return (
              <Button
                key={index}
                variant={curCat === catg._id ? "primary" : "outline-primary"}
                className="ms-2"
                onClick={() => setCurCat(catg._id)}
              >
                {catg.category}
              </Button>
            );
          })}
        </div>
        <div className="mt-2 d-flex flex-wrap justify-content-center p-2 border border-1 rounded">
          {allProds.map((prod, index) => {
            if (prod.category._id !== curCat) return <div key={index}></div>;
            else
              return (
                <ProductCard
                  key={index}
                  name={prod.name}
                  price={prod.price}
                  pid={prod._id}
                  onClick={() => {
                    setTotal(total + prod.price);
                    for (let i = 0; i < order.length; i++) {
                      if (order[i].pid === prod._id) {
                        order[i].qnt++;
                        order[i].amount += prod.price;
                        return setOrder([...order]);
                      }
                    }
                    setOrder([
                      ...order,
                      {
                        name: prod.name,
                        price: prod.price,
                        pid: prod._id,
                        qnt: 1,
                        amount: prod.price,
                      },
                    ]);
                  }}
                />
              );
          })}
        </div>
      </Col>
      <Col lg="6" md="12" sm="12">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <OrderItem
                key={index}
                pid={item.pid}
                name={item.name}
                rate={item.price}
                quantity={item.qnt}
                amount={item.amount}
                inc={() => {
                  for (let i = 0; i < order.length; i++) {
                    if (order[i].pid === item.pid) {
                      order[i].qnt++;
                      order[i].amount += item.price;
                      setTotal(total + item.price);
                      return setOrder([...order]);
                    }
                  }
                }}
                dec={() => {
                  for (let i = 0; i < order.length; i++) {
                    if (order[i].pid === item.pid) {
                      order[i].qnt--;
                      order[i].amount -= item.price;
                      setTotal(total - item.price);
                      return setOrder([...order]);
                    }
                  }
                }}
                remove={() =>
                  setOrder(
                    order.filter((oitem) => {
                      if (item.pid !== oitem.pid) return true;
                      else {
                        setTotal(total - oitem.amount);
                        return false;
                      }
                    })
                  )
                }
              />
            ))}
          </tbody>
        </Table>
        <Row className="w-100">
          <Col lg="6" md="6" sm="6" className="p-2">
            <div className="w-100 border border-1 rounded p-2">
              <p className="w-100 text-end">Total: {total}</p>
              <p className="w-100 text-end">GST: 18%</p>
              <Alert className="text-end">Grand total: 1180</Alert>
            </div>
          </Col>
          <Col
            lg="6"
            md="6"
            sm="6"
            className="p-2 d-flex flex-column align-items-end"
          >
            <FormControl
              pattern="[0-9]*"
              maxLength="13"
              placeholder="Customer mobile number"
              value={phone}
              onChange={phnOnChangeHandler}
              autoComplete="customerNum"
            />
            {loading ? (
              <Spinner animation="grow" />
            ) : (
              <FormControl
                type="text"
                maxLength="100"
                placeholder="Customer name"
                value={cname}
                className="mt-2"
                autoComplete="customerVal"
                onChange={(e) => setCname(e.target.value)}
              />
            )}
            <FormControl
              type="text"
              placeholder="Note (optional)"
              className="mt-2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <p>Payment method :</p>
            <ButtonGroup>
              <Button
                variant={payMethod === 0 ? "primary" : "outline-primary"}
                onClick={() => setPayMethod(0)}
                disabled={order.length ? false : true}
              >
                Cash
              </Button>
              <Button
                variant={payMethod === 1 ? "primary" : "outline-primary"}
                onClick={() => setPayMethod(1)}
                disabled={order.length ? false : true}
              >
                Card
              </Button>
              <Button
                variant={payMethod === 2 ? "primary" : "outline-primary"}
                onClick={() => setPayMethod(2)}
                disabled={order.length ? false : true}
              >
                UPI
              </Button>
            </ButtonGroup>
            <Button
              className="my-3"
              variant="success"
              disabled={order.length ? false : true}
              onClick={newOrderApi}
            >
              Generate Bill
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ExpressBilling;