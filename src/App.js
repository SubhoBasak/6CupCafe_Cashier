import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Appbar from "./components/Appbar";

import ExpressBilling from "./pages/ExpressBilling";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/express_billing" element={<ExpressBilling />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
