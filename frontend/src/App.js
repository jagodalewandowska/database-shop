import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import Navbar from "./Navbar";
import Producenci from "./components/Producenci";
import Klienci from "./components/Klienci";
import Zamowienia from "./components/Zamowienia";
import Koszyk from "./components/Koszyk";
import Produkt from "./components/Produkt";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
      <div>
        <Navbar
            currentUser={currentUser}
            logOut={logOut}
            showModeratorBoard={showModeratorBoard}
            showAdminBoard={showAdminBoard}
        />

        <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/producenci" element={<Producenci/>} />
          <Route path="/klienci" element={<Klienci/>} />
          <Route path="/zarejestrowani" element={<BoardAdmin/>} />
          <Route path="/zamowienia" element={<Zamowienia/>} />
          <Route path="/koszyk" element={<Koszyk/>} />
          <Route path="/produkt" element={<Produkt/>} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
