import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (token) {
      navigate("/home");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputChangeHandler = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (email.trim().length === 0 || password.trim().length === 0) {
        return alert("all fields are mendatory");
      }
      const data = { email, password };
      const resData = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      );

      if (resData.status === 200) {
        localStorage.setItem("userId", resData.data.token);
        localStorage.setItem("role", resData.data.user.role);
        console.log(resData.data);
        
        alert(resData.data.msg);
        navigate("/home");
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
        <h1>Login Form</h1>
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
        <button>Login</button>
        <button type="button">
          <Link to="/register">Register</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
