import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Appbar from "./components/Appbar";

import ExpressBilling from "./pages/ExpressBilling";
import HomeDelivery from "./pages/HomeDelivery";
import LastOrders from "./pages/LastOrders";
import Login from "./pages/Login";
import Token from "./pages/Token";

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/" element={<ExpressBilling />} />
        <Route path="/home_delivery" element={<HomeDelivery />} />
        <Route path="/last_orders" element={<LastOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/token" element={<Token />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
