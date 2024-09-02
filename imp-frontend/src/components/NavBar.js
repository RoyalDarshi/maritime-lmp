import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logOutBtnClickHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav>
      <label className="logo">Maritime</label>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {role === "admin" && (
          <li>
            <Link to="/create-course">Create Course</Link>
          </li>
        )}
        {role === "student" && (
          <li>
            <Link to="/mycourse">My Course</Link>
          </li>
        )}
        <li>
          <div>
            <input className="search-input" aria-label="Search courses" />
            <button className="search-btn">Search</button>
          </div>
        </li>
        <li>
          <button className="logout-btn" onClick={logOutBtnClickHandler}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
