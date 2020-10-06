import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">Blog Website</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add-blog">Add blog</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
