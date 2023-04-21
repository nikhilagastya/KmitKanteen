/* eslint-disable react/jsx-no-undef */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logos.png"
import name from "../logoName.png";


// import Badge from "@material-ui/core/Badge";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { color } from "@mui/system";
export default function Navbar(props) {
  const [cartView, setCartView] = useState(false);
  localStorage.setItem("temp", "first");
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("User");

    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();
  return (
    <div >

      <nav
        className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm  navbar-dark bg-white font-text text-dark position-sticky"
        style={{
          minHeight:"50px !important",
          height:"50px",
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "0",
          width: "100%",
        }}
      >
        <div className="container-fluid font-text text-dark">
          <Link
            className="navbar-brand fs-1 font-text"
            to="/"
            style={{ color: "black",marginTop:"15px" }}
          >
            <img src={logo} width={100} height={70}></img>
            
          </Link>
          <Link
            className="navbar-brand fs-1 font-text"
            to="/"
            style={{ marginTop:"5px" }}
          >
            <b><h2 className="text-warning" style={{fontWeight:"bolder"}}>KMITKanteen</h2></b>
            
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link hov text-dark fs-5 mx-3 active"
                  aria-current="page"
                  
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("User") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark fs-5 mx-3 active"
                    aria-current="page"
                    to="/myorder"
                  >
         
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("User") ? (
              <form className="d-flex">
                <Link className="btn btn-warning text-white mx-1 " to="/login">
                  Login
                </Link>
                <Link className="btn btn-warning text-white mx-1" to="/signup">
                  Signup
                </Link>
              </form>
            ) : (
              <div>
                <div
                  className="btn text-dark btn-warning btn-color mx-2 "
                  onClick={loadCart}
                >
                  {/* <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge> */}
                  <span class="translate-middle badge rounded-pill bg-dark">
                    {items.length}
                  </span>
                  Cart
                </div>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ""
                )}

                <button
                  onClick={handleLogout}
                  className="btn text-dark btn-warning"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
