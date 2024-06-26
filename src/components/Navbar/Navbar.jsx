import React from "react";
import { NavLink } from "react-router-dom";
// componentai
import User from "../User/User";
import AdminUser from "../AdminUser/AdminUser";
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
        <li>
          <NavLink to="/admin"> Admin</NavLink>
        </li>
      </ul>
      <User />
      <AdminUser />
    </nav>
  );
}
export default Navbar;
