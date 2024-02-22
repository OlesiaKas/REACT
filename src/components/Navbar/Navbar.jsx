import React from "react";
import { NavLink } from "react-router-dom";
// componentai
import User from "../User/User";
import "./navbar.scss";
function Navbar() {
  return (
    <nav className="nav-container">
      <h1>My Shop</h1>
      <ul>
        <li>
          <NavLink to="/"> All items</NavLink>
        </li>
        <li>
          <NavLink to="/my-cart"> My Cart</NavLink>
        </li>
        <li>
          <NavLink to="/favorites"> Favorites</NavLink>
        </li>
      </ul>
      <User />
    </nav>
  );
}
export default Navbar;
