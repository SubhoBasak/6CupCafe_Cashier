import React from "react";
import { Button, FormControl, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TokenSetting = () => {
  const [start, setStart] = React.useState("");

  const navigate = useNavigate();

  const resetTokenApi = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/token", {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start }),
    }).then((res) => {
      if (res.status === 200) return alert("Token reset successfully");
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  };

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/token", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      if (res.status === 200) res.json().then((data) => setStart(data.start));
      else if (res.status === 401 || res.status === 405)
        return navigate("/login");
      else return alert("Something went wrong! Please try again.");
    });
  }, [navigate]);

  return (
    <div className="container mt-4 mx-auto p-2 border border-1 rounded">
      <div>
        <p className="w-100 text-center text-warning fs-4">Token</p>
        <hr />
        <Form className="d-flex" onSubmit={resetTokenApi}>
          <FormControl
            className="flex-grow-1"
            placeholder="Enter the starting token number"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <Button type="submit" variant="outline-success" className="ms-2">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TokenSetting;
