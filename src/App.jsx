import "./App.css";
import React from "react";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./pages/header/Header";
import Login from "./pages/register/Login";

import UserHomePage from "./pages/userHomePage/UserHomePage.jsx";
import AddOrder from "./pages/userHomePage/AddOrder";
import OrderDetails from "./pages/userHomePage/OrderDetails";

import ConfirmPage from "./pages/register/ConfirmPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route path="AddOrder" element={<AddOrder />} />
            <Route path="OrderDetails/:id" element={<OrderDetails />} />
            <Route path="userHomePage" element={<UserHomePage />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register/:Confirm" element={<ConfirmPage />} />
            <Route path="Register" element={<Register />} />
            <Route index element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
