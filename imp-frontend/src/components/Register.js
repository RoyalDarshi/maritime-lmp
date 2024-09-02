import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../index.css"
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  const inputChangeHandler = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "role") {
      setRole(event.target.value);
    }
  };
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (
        name.trim().length === 0 ||
        email.trim().length === 0 ||
        password.trim().length === 0
      ) {
        return alert("all fields are mendatory");
      }
      const data = { name, email, password, role };

      const resData = await axios.post(
        "http://localhost:5000/api/users/register",
        data
      );

      if (resData.status === 200) {
        localStorage.setItem("userId", resData.data.token);
        localStorage.setItem("role", resData.data.role);
        alert(resData.data.msg);
        navigate("/home")
      }
    } catch (error) {
      if (error?.response?.data?.err) {
        alert(error?.response?.data?.err);
      }
      console.error(error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={formSubmitHandler}>
        <h1>Register Form</h1>
        <div>
          <label>Name</label>
          <input
            name="name"
            onChange={inputChangeHandler}
            type="text"
            value={name}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            onChange={inputChangeHandler}
            type="email"
            value={email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            onChange={inputChangeHandler}
            type="password"
            value={password}
          />
        </div>
        <div>
          <label>Role</label>
          <select
            defaultValue={"student"}
            name="role"
            onChange={inputChangeHandler}
          >
            <option value={"admin"}>Admin</option>
            <option value={"student"}>Student</option>
          </select>
        </div>
        <button>Register</button>
        <button type="button">
          <Link to={"/"}>Login</Link>
        </button>
      </form>
    </div>
  );
};

export default Register;
